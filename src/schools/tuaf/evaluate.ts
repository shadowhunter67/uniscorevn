import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { TUAF_THPT_THRESHOLD } from './eligibility';
import { tuafAdmissionMethods } from './methods';
import { calculateTuafEffectivePriority30, lookupTuafStandardPriority30 } from './priority';
import { tuafThptExamFormulaEvidence } from './evidence';

export function evaluateTuafThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'tuaf',
    schoolShortName: 'TUAF',
    method: tuafAdmissionMethods[0],
    profile,
    context,
    threshold: TUAF_THPT_THRESHOLD,
    evidenceSourceId: 'tuaf-thpt-threshold-2026',
  });
}

const TUAF_EXACT_METHOD = tuafAdmissionMethods[1];
const TUAF_THPT_EXAM_THRESHOLD_30 = 16;

export interface TuafThptExamExactEvaluationContext {
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** TUAF 2026 — phương thức thi TN THPT: ĐXT = round2(tổng thô 3 môn + điểm ưu tiên). ĐXT ≥ 16/30
 * (đồng nhất mọi ngành đợt 1) ⇒ đủ điều kiện xét tuyển. */
export function evaluateTuafThptExamExactAdmission(
  profile: ApplicantProfile,
  context: TuafThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'tuaf',
    year: TUAF_EXACT_METHOD.year,
    methodId: TUAF_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'tuaf-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển TUAF.' });
    return partial('Cần chọn tổ hợp 3 môn để tính Điểm xét tuyển TUAF.');
  }

  let total = 0;
  const missing: SubjectId[] = [];
  for (const s of context.subjectContext.subjects) {
    const v = profile.thpt?.scores?.[s];
    if (v === undefined) missing.push(s);
    else total += v;
  }
  if (missing.length > 0) {
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `tuaf-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp TUAF.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển TUAF.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupTuafStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateTuafEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const pass = dxt30 >= TUAF_THPT_EXAM_THRESHOLD_30;

  const reasons = [
    `Ngưỡng điểm xét tuyển TUAF 2026 (đợt 1, đồng nhất mọi ngành): Điểm xét tuyển ≥ ${TUAF_THPT_EXAM_THRESHOLD_30}/30.`,
    `Điểm xét tuyển = tổng thô 3 môn + điểm ưu tiên = ${raw30} + ${priority.effectivePriority30} = ${dxt30}/30 → ${pass ? 'đạt ngưỡng, đủ điều kiện xét tuyển' : 'chưa đạt ngưỡng'}. (Điểm chuẩn trúng tuyển từng ngành công bố riêng.)`,
  ];

  explanation.push({ id: 'tuaf-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: tuafThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'tuaf-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: tuafThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'tuaf-exact-dxt', label: 'Điểm xét tuyển', output: dxt30, scale: 30, formula: 'round2(Điểm môn 1 + Điểm môn 2 + Điểm môn 3 + điểm ƯT)', evidence: tuafThptExamFormulaEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'tuaf-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'tuaf',
    year: TUAF_EXACT_METHOD.year,
    methodId: TUAF_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: pass ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...tuafThptExamFormulaEvidence.evidence],
  };
}
