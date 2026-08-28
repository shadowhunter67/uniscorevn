import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { TTU_THPT_THRESHOLD } from './eligibility';
import { ttuAdmissionMethods } from './methods';
import { TTU_THPT_EXAM_THRESHOLD_30, TTU_THRESHOLD_GROUP_LABELS, type TtuThresholdGroup } from './thresholds';
import { calculateTtuEffectivePriority30, lookupTtuStandardPriority30 } from './priority';
import { ttuThptExamFormulaEvidence } from './evidence';

export function evaluateTtuThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'ttu',
    schoolShortName: 'TTU',
    method: ttuAdmissionMethods[0],
    profile,
    context,
    threshold: TTU_THPT_THRESHOLD,
    evidenceSourceId: 'ttu-floor-score-2026',
  });
}

const TTU_EXACT_METHOD = ttuAdmissionMethods[1];

export interface TtuThptExamExactEvaluationContext {
  group?: TtuThresholdGroup;
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** TTU 2026 — phương thức thi TN THPT (trừ Y khoa): ĐXT = round2(tổng thô 3 môn + điểm ưu tiên).
 * Đủ điều kiện xét tuyển ⟺ ĐXT ≥ ngưỡng nhóm ngành. */
export function evaluateTtuThptExamExactAdmission(
  profile: ApplicantProfile,
  context: TtuThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'ttu',
    year: TTU_EXACT_METHOD.year,
    methodId: TTU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (context.group === undefined) {
    missingRequirements.push({ kind: 'school-context', code: 'ttu-program-group', label: 'Chọn nhóm ngành TTU (khối kỹ thuật/kinh tế/ngôn ngữ, Điều dưỡng-KTXN, hoặc Luật).' });
    return partial('Cần chọn nhóm ngành TTU để áp ngưỡng.');
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'ttu-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển TTU.' });
    return partial('Cần chọn tổ hợp 3 môn để tính Điểm xét tuyển TTU.');
  }

  let total = 0;
  const missing: SubjectId[] = [];
  for (const s of context.subjectContext.subjects) {
    const v = profile.thpt?.scores?.[s];
    if (v === undefined) missing.push(s);
    else total += v;
  }
  if (missing.length > 0) {
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `ttu-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp TTU.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển TTU.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupTtuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateTtuEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const threshold = TTU_THPT_EXAM_THRESHOLD_30[context.group];
  const pass = dxt30 >= threshold;

  const reasons = [
    `Điểm sàn TTU 2026 (${TTU_THRESHOLD_GROUP_LABELS[context.group]}): ${threshold}/30.`,
    `Điểm xét tuyển = tổng thô 3 môn + điểm ưu tiên = ${raw30} + ${priority.effectivePriority30} = ${dxt30}/30 → ${pass ? 'đạt ngưỡng, đủ điều kiện xét tuyển' : 'chưa đạt ngưỡng'}.`,
  ];

  explanation.push({ id: 'ttu-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: ttuThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'ttu-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: ttuThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'ttu-exact-dxt', label: 'Điểm xét tuyển', output: dxt30, scale: 30, formula: 'round2(tổng thô 3 môn + điểm ưu tiên)', evidence: ttuThptExamFormulaEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'ttu-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'ttu',
    year: TTU_EXACT_METHOD.year,
    methodId: TTU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: pass ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...ttuThptExamFormulaEvidence.evidence],
  };
}
