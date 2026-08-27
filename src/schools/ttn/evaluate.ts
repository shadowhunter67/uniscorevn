import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { TTN_THPT_THRESHOLD } from './eligibility';
import { ttnAdmissionMethods } from './methods';
import { TTN_THPT_EXAM_THRESHOLD_30, TTN_THRESHOLD_GROUP_LABELS, type TtnThresholdGroup } from './thresholds';
import { calculateTtnEffectivePriority30, lookupTtnStandardPriority30 } from './priority';
import { ttnThptExamFormulaEvidence } from './evidence';

export function evaluateTtnThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'ttn',
    schoolShortName: 'TTN',
    method: ttnAdmissionMethods[0],
    profile,
    context,
    threshold: TTN_THPT_THRESHOLD,
    evidenceSourceId: 'ttn-threshold-notice-2026',
  });
}

const TTN_EXACT_METHOD = ttnAdmissionMethods[1];

export interface TtnThptExamExactEvaluationContext {
  /** Nhóm ngưỡng: 'medicine' (22) | 'teacher' (20) | 'nursingMedtech' (18) | 'standard' (15). */
  group?: TtnThresholdGroup;
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** TTN 2026 — phương thức 100: ĐXT = round2(tổng thô 3 môn + điểm ưu tiên). Đủ điều kiện xét
 * tuyển ⟺ ĐXT ≥ ngưỡng nhóm mã xét tuyển. */
export function evaluateTtnThptExamExactAdmission(
  profile: ApplicantProfile,
  context: TtnThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'ttn',
    year: TTN_EXACT_METHOD.year,
    methodId: TTN_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (context.group === undefined) {
    missingRequirements.push({ kind: 'school-context', code: 'ttn-program-group', label: 'Chọn nhóm ngành TTN (Y khoa / sư phạm / Điều dưỡng-KTXN / ngành khác).' });
    return partial('Cần chọn nhóm ngành TTN để áp ngưỡng.');
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'ttn-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển TTN.' });
    return partial('Cần chọn tổ hợp 3 môn để tính Điểm xét tuyển TTN.');
  }

  let total = 0;
  const missing: SubjectId[] = [];
  for (const s of context.subjectContext.subjects) {
    const v = profile.thpt?.scores?.[s];
    if (v === undefined) missing.push(s);
    else total += v;
  }
  if (missing.length > 0) {
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `ttn-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp TTN.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển TTN.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupTtnStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateTtnEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const threshold = TTN_THPT_EXAM_THRESHOLD_30[context.group];
  const pass = dxt30 >= threshold;

  const reasons = [
    `Ngưỡng đảm bảo chất lượng đầu vào TTN 2026 (${TTN_THRESHOLD_GROUP_LABELS[context.group]}): ${threshold}/30.`,
    `Điểm xét tuyển = tổng thô 3 môn + điểm ưu tiên = ${raw30} + ${priority.effectivePriority30} = ${dxt30}/30 → ${pass ? 'đạt ngưỡng, đủ điều kiện xét tuyển' : 'chưa đạt ngưỡng'}. (Điểm chuẩn trúng tuyển từng ngành công bố riêng, cao hơn ngưỡng.)`,
  ];

  explanation.push({ id: 'ttn-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: ttnThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'ttn-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: ttnThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'ttn-exact-dxt', label: 'Điểm xét tuyển', output: dxt30, scale: 30, formula: 'round2(tổng thô 3 môn + điểm ưu tiên)', evidence: ttnThptExamFormulaEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'ttn-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'ttn',
    year: TTN_EXACT_METHOD.year,
    methodId: TTN_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: pass ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...ttnThptExamFormulaEvidence.evidence],
  };
}
