import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { hpu2AdmissionMethods } from './methods';
import { HPU2_FIELD_THRESHOLD_BY_CODE, type Hpu2FieldThreshold } from './thresholds';
import { lookupHpu2StandardPriority30, calculateHpu2EffectivePriority30 } from './priority';
import { hpu2ExactFormulaEvidence, hpu2FieldThresholdEvidence } from './evidence';

export interface Hpu2SubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface Hpu2ThptExamEvaluationContext {
  fieldCode?: string;
  subjectContext?: Hpu2SubjectContext;
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

const HPU2_METHOD = hpu2AdmissionMethods[0];

function hpu2Partial(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'hpu2',
    year: HPU2_METHOD.year,
    methodId: HPU2_METHOD.id,
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
 * HPU2 2026 — nhánh xét kết quả thi TN THPT (nhóm ngành 3-môn chuẩn, 25/25 ngành). Điểm xét = tổng
 * thô 3 môn theo tổ hợp (không hệ số) + điểm ưu tiên KV/ĐT (khung quốc gia hiện hành, judgment call,
 * `priority.ts`). So với điểm chuẩn chính thức theo NGÀNH đã chọn (`thresholds.ts`). HPU2 KHÔNG công
 * bố tổ hợp môn riêng theo ngành trong nguồn đã đọc được — chấp nhận tổ hợp bất kỳ, xem
 * `knowledgeGaps.ts`.
 */
export function evaluateHpu2ThptExamAdmission(profile: ApplicantProfile, context: Hpu2ThptExamEvaluationContext = {}): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldCode) {
    missingRequirements.push({ kind: 'school-context', code: 'hpu2-field', label: 'Chọn ngành HPU2 để tra điểm chuẩn và tính Điểm xét.' });
    return hpu2Partial({ missingRequirements, reason: 'Cần chọn ngành HPU2 để áp điểm chuẩn và tính Điểm xét.' });
  }
  const entry: Hpu2FieldThreshold | undefined = HPU2_FIELD_THRESHOLD_BY_CODE.get(context.fieldCode);
  if (!entry) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'hpu2-field',
      label: `Ngành "${context.fieldCode}" không có trong bảng điểm chuẩn HPU2 2026 đã mô hình hoá.`,
    });
    return hpu2Partial({ missingRequirements, reason: `Ngành "${context.fieldCode}" không có trong bảng điểm chuẩn HPU2 2026 đã mô hình hoá.` });
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'hpu2-subject-combination', label: `Chọn tổ hợp xét tuyển cho ${entry.name}.` });
    return hpu2Partial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ${entry.name}.` });
  }

  const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `hpu2-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return hpu2Partial({ missingRequirements, reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét HPU2.' });
  }
  const raw30 = total30 as number;

  const standardPriority30 = lookupHpu2StandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateHpu2EffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + priority.effectivePriority30));

  const threshold30 = entry.threshold30;
  const eligible = finalScore >= threshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Điểm chuẩn ${entry.name} (thi TN THPT 2026): tổng 3 môn + điểm ưu tiên KV/ĐT >= ${threshold30}/30 — tổng của bạn = ${finalScore}/30.`,
    eligible ? 'Đạt/vượt điểm chuẩn đã công bố chính thức năm 2026.' : 'Chưa đạt điểm chuẩn đã công bố chính thức năm 2026.',
  ];

  explanation.push({
    id: 'hpu2-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: hpu2ExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'hpu2-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT (khung quốc gia hiện hành, judgment call)'
      : 'Mức điểm ưu tiên KV/ĐT (khung quốc gia hiện hành, judgment call)',
    evidence: hpu2ExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'hpu2-exact-final',
    label: 'Điểm xét (đã cộng ưu tiên)',
    output: finalScore,
    scale: 30,
    formula: 'Tổng thô 3 môn + Điểm ưu tiên',
    evidence: hpu2ExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'hpu2-exact-threshold',
    label: `Điểm chuẩn — ${entry.name}`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: hpu2FieldThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'hpu2-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'hpu2',
    year: HPU2_METHOD.year,
    methodId: HPU2_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...hpu2ExactFormulaEvidence.evidence, ...hpu2FieldThresholdEvidence.evidence],
  };
}
