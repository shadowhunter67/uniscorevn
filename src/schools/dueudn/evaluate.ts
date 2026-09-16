import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { dueudnAdmissionMethods } from './methods';
import { DUEUDN_FIELD_THRESHOLD_BY_CODE, type DueudnFieldThreshold } from './thresholds';
import { lookupDueudnStandardPriority30, calculateDueudnEffectivePriority30 } from './priority';
import { dueudnExactFormulaEvidence, dueudnFieldThresholdEvidence } from './evidence';

export interface DueudnSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface DueudnThptExamEvaluationContext {
  fieldCode?: string;
  subjectContext?: DueudnSubjectContext;
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

const DUEUDN_METHOD = dueudnAdmissionMethods[0];

function dueudnPartial(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'dueudn',
    year: DUEUDN_METHOD.year,
    methodId: DUEUDN_METHOD.id,
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
 * DUE 2026 — nhánh xét kết quả thi TN THPT thuần, chương trình "ST - Tiêu chuẩn" (19/36 mã xét
 * tuyển). Điểm xét = tổng thô 3 môn theo tổ hợp (không hệ số) + điểm ưu tiên KV/ĐT (khung quốc gia
 * hiện hành, judgment call, `priority.ts`). So với điểm chuẩn chính thức theo MÃ đã chọn
 * (`thresholds.ts`). DUE KHÔNG công bố tổ hợp môn riêng theo mã trong bảng đọc được — chấp nhận tổ
 * hợp bất kỳ, xem `knowledgeGaps.ts`.
 */
export function evaluateDueudnThptExamAdmission(profile: ApplicantProfile, context: DueudnThptExamEvaluationContext = {}): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldCode) {
    missingRequirements.push({ kind: 'school-context', code: 'dueudn-field', label: 'Chọn mã xét tuyển DUE để tra điểm chuẩn và tính Điểm xét.' });
    return dueudnPartial({ missingRequirements, reason: 'Cần chọn mã xét tuyển DUE để áp điểm chuẩn và tính Điểm xét.' });
  }
  const entry: DueudnFieldThreshold | undefined = DUEUDN_FIELD_THRESHOLD_BY_CODE.get(context.fieldCode);
  if (!entry) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'dueudn-field',
      label: `Mã xét tuyển "${context.fieldCode}" không có trong bảng điểm chuẩn DUE 2026 đã mô hình hoá (chỉ 19/36 mã chương trình "ST - Tiêu chuẩn").`,
    });
    return dueudnPartial({ missingRequirements, reason: `Mã xét tuyển "${context.fieldCode}" không có trong bảng điểm chuẩn DUE 2026 đã mô hình hoá.` });
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'dueudn-subject-combination', label: `Chọn tổ hợp xét tuyển cho ${entry.name}.` });
    return dueudnPartial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ${entry.name}.` });
  }

  const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `dueudn-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return dueudnPartial({ missingRequirements, reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét DUE.' });
  }
  const raw30 = total30 as number;

  const standardPriority30 = lookupDueudnStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateDueudnEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + priority.effectivePriority30));

  const threshold30 = entry.threshold30;
  const eligible = finalScore >= threshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Điểm chuẩn ${entry.name} (thi TN THPT 2026): tổng 3 môn + điểm ưu tiên KV/ĐT >= ${threshold30}/30 — tổng của bạn = ${finalScore}/30.`,
    eligible ? 'Đạt/vượt điểm chuẩn đã công bố chính thức năm 2026.' : 'Chưa đạt điểm chuẩn đã công bố chính thức năm 2026.',
  ];

  explanation.push({
    id: 'dueudn-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: dueudnExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'dueudn-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT (khung quốc gia hiện hành, judgment call)'
      : 'Mức điểm ưu tiên KV/ĐT (khung quốc gia hiện hành, judgment call)',
    evidence: dueudnExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'dueudn-exact-final',
    label: 'Điểm xét (đã cộng ưu tiên)',
    output: finalScore,
    scale: 30,
    formula: 'Tổng thô 3 môn + Điểm ưu tiên',
    evidence: dueudnExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'dueudn-exact-threshold',
    label: `Điểm chuẩn — ${entry.name}`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: dueudnFieldThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'dueudn-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'dueudn',
    year: DUEUDN_METHOD.year,
    methodId: DUEUDN_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...dueudnExactFormulaEvidence.evidence, ...dueudnFieldThresholdEvidence.evidence],
  };
}
