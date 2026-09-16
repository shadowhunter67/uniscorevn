import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { dhvAdmissionMethods } from './methods';
import { DHV_FIELD_THRESHOLD_BY_CODE, type DhvFieldThreshold } from './thresholds';
import { lookupDhvStandardPriority30, calculateDhvEffectivePriority30 } from './priority';
import { dhvExactFormulaEvidence, dhvFieldThresholdEvidence } from './evidence';

export interface DhvSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface DhvThptExamEvaluationContext {
  fieldCode?: string;
  subjectContext?: DhvSubjectContext;
}

function readSubjectTotal(profile: ApplicantProfile, subjects: readonly SubjectId[]): { total30?: number; missingSubjects: SubjectId[] } {
  let total = 0;
  const missingSubjects: SubjectId[] = [];
  for (const subjectId of subjects) {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) missingSubjects.push(subjectId);
    else total += score;
  }
  if (missingSubjects.length > 0) return { missingSubjects };
  return { total30: round2(total), missingSubjects };
}

const DHV_METHOD = dhvAdmissionMethods[0];

function dhvPartial(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'dhv',
    year: DHV_METHOD.year,
    methodId: DHV_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [input.reason] },
    missingInputs: [],
    missingRules: [],
    missingRequirements: input.missingRequirements ?? [],
    explanation: [],
    evidence: [],
  };
}

/**
 * DHV 2026 — nhánh xét kết quả thi TN THPT. Điểm xét = tổng thô 3 môn theo tổ hợp (không hệ số) +
 * điểm ưu tiên KV/ĐT (khung quốc gia hiện hành, judgment call, `priority.ts`). So với điểm chuẩn
 * chính thức theo MÃ XÉT TUYỂN đã chọn (`thresholds.ts`, đủ 23/23 mã). DHV KHÔNG công bố tổ hợp môn
 * riêng theo mã xét tuyển trong nguồn đã đọc được — chấp nhận bất kỳ tổ hợp 3 môn nào người dùng chọn
 * (giống mô hình cũ, xem `knowledgeGaps.ts`).
 */
export function evaluateDhvThptExamAdmission(profile: ApplicantProfile, context: DhvThptExamEvaluationContext = {}): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldCode) {
    missingRequirements.push({ kind: 'school-context', code: 'dhv-field', label: 'Chọn mã xét tuyển DHV để tra điểm chuẩn và tính Điểm xét.' });
    return dhvPartial({ missingRequirements, reason: 'Cần chọn mã xét tuyển DHV để áp điểm chuẩn và tính Điểm xét.' });
  }
  const entry: DhvFieldThreshold | undefined = DHV_FIELD_THRESHOLD_BY_CODE.get(context.fieldCode);
  if (!entry) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'dhv-field',
      label: `Mã xét tuyển "${context.fieldCode}" không có trong bảng điểm chuẩn DHV 2026 đã mô hình hoá.`,
    });
    return dhvPartial({ missingRequirements, reason: `Mã xét tuyển "${context.fieldCode}" không có trong bảng điểm chuẩn DHV 2026 đã mô hình hoá.` });
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'dhv-subject-combination', label: `Chọn tổ hợp xét tuyển cho ${entry.name}.` });
    return dhvPartial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ${entry.name}.` });
  }

  const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `dhv-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return dhvPartial({ missingRequirements, reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét DHV.' });
  }
  const raw30 = total30 as number;

  const standardPriority30 = lookupDhvStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateDhvEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + priority.effectivePriority30));

  const threshold30 = entry.threshold30;
  const eligible = finalScore >= threshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Điểm chuẩn ${entry.name} (thi TN THPT 2026): tổng 3 môn + điểm ưu tiên KV/ĐT >= ${threshold30}/30 — tổng của bạn = ${finalScore}/30.`,
    eligible ? 'Đạt/vượt điểm chuẩn đã công bố chính thức năm 2026.' : 'Chưa đạt điểm chuẩn đã công bố chính thức năm 2026.',
  ];

  explanation.push({
    id: 'dhv-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: dhvExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'dhv-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT (khung quốc gia hiện hành, judgment call)'
      : 'Mức điểm ưu tiên KV/ĐT (khung quốc gia hiện hành, judgment call)',
    evidence: dhvExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'dhv-exact-final',
    label: 'Điểm xét (đã cộng ưu tiên)',
    output: finalScore,
    scale: 30,
    formula: 'Tổng thô 3 môn + Điểm ưu tiên',
    evidence: dhvExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'dhv-exact-threshold',
    label: `Điểm chuẩn — ${entry.name}`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: dhvFieldThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'dhv-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'dhv',
    year: DHV_METHOD.year,
    methodId: DHV_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...dhvExactFormulaEvidence.evidence, ...dhvFieldThresholdEvidence.evidence],
  };
}
