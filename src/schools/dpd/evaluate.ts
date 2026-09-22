import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { DPD_THPT_THRESHOLD } from './eligibility';
import { dpdAdmissionMethods } from './methods';
import { DPD_THPT_EXAM_THRESHOLD_30_BY_PROGRAM_SLUG, DPD_PROGRAM_LABELS } from './thresholds';
import { calculateDpdEffectivePriority30, lookupDpdStandardPriority30 } from './priority';
import { dpdThptExamExactEvidence } from './evidence';

export function evaluateDpdThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'dpd',
    schoolShortName: 'DPD',
    method: dpdAdmissionMethods[0],
    profile,
    context,
    threshold: DPD_THPT_THRESHOLD,
    evidenceSourceId: 'dpd-cutoff-2026',
  });
}

const DPD_EXACT_METHOD = dpdAdmissionMethods[1];

export interface DpdThptExamExactEvaluationContext {
  programSlug?: string;
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** DPD 2026 (thi TN THPT, mã 100/405): ĐXT = round2(tổng thô 3 môn + điểm ưu tiên). Đủ điều kiện
 * ⟺ ĐXT ≥ điểm chuẩn của chương trình đã chọn. Nguồn: `sources.ts:dpd-cutoff-2026`. */
export function evaluateDpdThptExamExactAdmission(
  profile: ApplicantProfile,
  context: DpdThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string): AdmissionEvaluation => ({
    schoolId: 'dpd',
    year: DPD_EXACT_METHOD.year,
    methodId: DPD_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  const threshold = context.programSlug !== undefined ? DPD_THPT_EXAM_THRESHOLD_30_BY_PROGRAM_SLUG[context.programSlug] : undefined;
  if (context.programSlug === undefined || threshold === undefined) {
    missingRequirements.push({ kind: 'school-context', code: 'dpd-program-slug', label: 'Chọn chương trình đào tạo DPD.' });
    return partial('Cần chọn chương trình đào tạo DPD để áp điểm chuẩn.');
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'dpd-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển DPD.' });
    return partial('Cần chọn tổ hợp 3 môn để tính Điểm xét tuyển DPD.');
  }

  let total = 0;
  const missing: SubjectId[] = [];
  for (const s of context.subjectContext.subjects) {
    const v = profile.thpt?.scores?.[s];
    if (v === undefined) missing.push(s);
    else total += v;
  }
  if (missing.length > 0) {
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `dpd-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp DPD.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển DPD.');
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupDpdStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateDpdEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const programLabel = DPD_PROGRAM_LABELS[context.programSlug] ?? context.programSlug;
  const eligible = dxt30 >= threshold;

  const reasons = [
    `Điểm chuẩn DPD 2026 (thi TN THPT, ${programLabel}): Điểm xét tuyển ≥ ${threshold}/30.`,
    `Điểm xét tuyển = tổng thô 3 môn + điểm ưu tiên = ${raw30} + ${priority.effectivePriority30} = ${dxt30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} điểm chuẩn.`,
  ];

  explanation.push({ id: 'dpd-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: dpdThptExamExactEvidence.evidence });
  explanation.push({ id: 'dpd-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: dpdThptExamExactEvidence.evidence });
  explanation.push({ id: 'dpd-exact-dxt', label: 'Điểm xét tuyển', output: dxt30, scale: 30, formula: 'round2(Điểm môn 1 + Điểm môn 2 + Điểm môn 3 + Điểm ưu tiên)', evidence: dpdThptExamExactEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'dpd-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'dpd',
    year: DPD_EXACT_METHOD.year,
    methodId: DPD_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...dpdThptExamExactEvidence.evidence],
  };
}
