import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { UMT_THPT_THRESHOLD } from './eligibility';
import { umtAdmissionMethods } from './methods';
import { calculateUmtEffectivePriority30, lookupUmtStandardPriority30 } from './priority';
import { umtThptExamFormulaEvidence } from './evidence';

export function evaluateUmtAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'umt',
    schoolShortName: 'UMT',
    method: umtAdmissionMethods[0],
    profile,
    context,
    threshold: UMT_THPT_THRESHOLD,
    evidenceSourceId: 'umt-threshold-notice-2026',
  });
}

const UMT_EXACT_METHOD = umtAdmissionMethods[1];
const UMT_THPT_EXAM_THRESHOLD_30 = 15;

export interface UmtThptExamExactEvaluationContext {
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** UMT 2026 — thí sinh không điểm cộng: ĐXT = round2(tổng thô 3 môn + điểm ưu tiên). ĐXT ≥ 15/30
 * (đồng nhất 10 ngành) ⇒ đủ điều kiện xét tuyển. */
export function evaluateUmtThptExamExactAdmission(
  profile: ApplicantProfile,
  context: UmtThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'umt',
    year: UMT_EXACT_METHOD.year,
    methodId: UMT_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'umt-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển UMT.' });
    return partial('Cần chọn tổ hợp 3 môn để tính Điểm xét tuyển UMT.');
  }

  let total = 0;
  const missing: SubjectId[] = [];
  for (const s of context.subjectContext.subjects) {
    const v = profile.thpt?.scores?.[s];
    if (v === undefined) missing.push(s);
    else total += v;
  }
  if (missing.length > 0) {
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `umt-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp UMT.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển UMT.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupUmtStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateUmtEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const pass = dxt30 >= UMT_THPT_EXAM_THRESHOLD_30;

  const reasons = [
    `Điểm ngưỡng ĐBCLĐV UMT 2026 (PT01, đồng nhất 10 ngành): Điểm xét tuyển ≥ ${UMT_THPT_EXAM_THRESHOLD_30}/30.`,
    `Điểm xét tuyển (không điểm cộng) = tổng thô 3 môn + điểm ưu tiên = ${raw30} + ${priority.effectivePriority30} = ${dxt30}/30 → ${pass ? 'đạt ngưỡng, đủ điều kiện xét tuyển' : 'chưa đạt ngưỡng'}.`,
  ];

  explanation.push({ id: 'umt-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: umtThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'umt-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: umtThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'umt-exact-dxt', label: 'Điểm xét tuyển', output: dxt30, scale: 30, formula: 'round2(tổng thô 3 môn + điểm ưu tiên)', evidence: umtThptExamFormulaEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'umt-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'umt',
    year: UMT_EXACT_METHOD.year,
    methodId: UMT_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: pass ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...umtThptExamFormulaEvidence.evidence],
  };
}
