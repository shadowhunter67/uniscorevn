import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { BDU_THPT_THRESHOLD } from './eligibility';
import { bduAdmissionMethods } from './methods';
import { calculateBduEffectivePriority30, lookupBduStandardPriority30 } from './priority';
import { bduThptExamExactThresholdEvidence } from './evidence';

export function evaluateBduThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'bdu',
    schoolShortName: 'BDU',
    method: bduAdmissionMethods[0],
    profile,
    context,
    threshold: BDU_THPT_THRESHOLD,
    evidenceSourceId: 'bdu-admission-2026',
  });
}

const BDU_EXACT_METHOD = bduAdmissionMethods[1];
export type BduExactThresholdGroup = 'standard' | 'lawOrPharmacy';
const BDU_EXACT_THRESHOLD_30: Record<BduExactThresholdGroup, number> = { standard: 15, lawOrPharmacy: 20 };

export interface BduThptExamExactEvaluationContext {
  thresholdGroup: BduExactThresholdGroup;
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** BDU 2026 — phương thức thi TN THPT. Nhóm `lawOrPharmacy`: so ĐXT (thô + ưu tiên) với ngưỡng 20
 * (nguồn nói rõ "được cộng điểm ưu tiên"). Nhóm `standard`: so TỔNG THÔ với ngưỡng 15 (nguồn im
 * lặng). ĐXT luôn hiển thị tham khảo. */
export function evaluateBduThptExamExactAdmission(profile: ApplicantProfile, context: BduThptExamExactEvaluationContext): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'bdu',
    year: BDU_EXACT_METHOD.year,
    methodId: BDU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'bdu-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển BDU.' });
    return partial('Cần chọn tổ hợp 3 môn để tính điểm xét BDU.');
  }
  const subjects = context.subjectContext.subjects;

  let total = 0;
  const missing: SubjectId[] = [];
  for (const s of subjects) {
    const v = profile.thpt?.scores?.[s];
    if (v === undefined) missing.push(s);
    else total += v;
  }
  if (missing.length > 0) {
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `bdu-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp BDU.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính điểm xét BDU.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const threshold = BDU_EXACT_THRESHOLD_30[context.thresholdGroup];
  const standardPriority30 = lookupBduStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateBduEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const comparisonValue = context.thresholdGroup === 'lawOrPharmacy' ? dxt30 : raw30;
  const eligible = comparisonValue >= threshold;

  const groupLabel = context.thresholdGroup === 'lawOrPharmacy' ? 'Luật, Luật kinh tế, Dược học' : 'đa số ngành';
  const comparisonLabel = context.thresholdGroup === 'lawOrPharmacy' ? 'Điểm xét (đã gồm ưu tiên)' : 'Tổng điểm thô (chưa gồm ưu tiên)';
  const reasons = [
    `Ngưỡng BDU 2026 (thi TN THPT, ${groupLabel}): ${comparisonLabel} ≥ ${threshold}/30.`,
    `Điểm xét = tổng thô 3 môn + điểm ưu tiên = ${raw30} + ${priority.effectivePriority30} = ${dxt30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} ngưỡng (so với ${comparisonLabel.toLowerCase()} = ${comparisonValue}).`,
  ];

  explanation.push({ id: 'bdu-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: bduThptExamExactThresholdEvidence.evidence });
  explanation.push({ id: 'bdu-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: bduThptExamExactThresholdEvidence.evidence });
  explanation.push({ id: 'bdu-exact-dxt', label: 'Điểm xét', output: dxt30, scale: 30, formula: 'tổng thô 3 môn + điểm ưu tiên', evidence: bduThptExamExactThresholdEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'bdu-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'bdu',
    year: BDU_EXACT_METHOD.year,
    methodId: BDU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...bduThptExamExactThresholdEvidence.evidence],
  };
}
