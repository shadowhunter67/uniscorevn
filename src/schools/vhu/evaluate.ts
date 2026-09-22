import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { VHU_THPT_THRESHOLD } from './eligibility';
import { vhuAdmissionMethods } from './methods';
import { VHU_THPT_EXAM_THRESHOLD_30_BY_PROGRAM_CODE, VHU_PROGRAM_LABELS } from './thresholds';
import { calculateVhuEffectivePriority30, lookupVhuStandardPriority30 } from './priority';
import { vhuThptExamThresholdEvidence } from './evidence';

export function evaluateVhuAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'vhu',
    schoolShortName: 'VHU',
    method: vhuAdmissionMethods[0],
    profile,
    context,
    threshold: VHU_THPT_THRESHOLD,
    evidenceSourceId: 'vhu-cutoff-2026',
  });
}

const VHU_EXACT_METHOD = vhuAdmissionMethods[1];

export interface VhuThptExamExactEvaluationContext {
  programCode?: string;
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** VHU 2026 (thi TN THPT): đủ điều kiện ⟺ TỔNG THÔ ≥ điểm chuẩn của mã ngành đã chọn (nguồn xác
 * nhận điểm chuẩn không gồm ưu tiên/điểm cộng). Điểm ưu tiên chỉ hiển thị tham khảo. */
export function evaluateVhuThptExamExactAdmission(
  profile: ApplicantProfile,
  context: VhuThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string): AdmissionEvaluation => ({
    schoolId: 'vhu',
    year: VHU_EXACT_METHOD.year,
    methodId: VHU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  const threshold = context.programCode !== undefined ? VHU_THPT_EXAM_THRESHOLD_30_BY_PROGRAM_CODE[context.programCode] : undefined;
  if (context.programCode === undefined || threshold === undefined) {
    missingRequirements.push({ kind: 'school-context', code: 'vhu-program-code', label: 'Chọn mã ngành VHU.' });
    return partial('Cần chọn mã ngành VHU để áp điểm chuẩn.');
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'vhu-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển VHU.' });
    return partial('Cần chọn tổ hợp 3 môn để tính điểm xét VHU.');
  }

  let total = 0;
  const missing: SubjectId[] = [];
  for (const s of context.subjectContext.subjects) {
    const v = profile.thpt?.scores?.[s];
    if (v === undefined) missing.push(s);
    else total += v;
  }
  if (missing.length > 0) {
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `vhu-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp VHU.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính điểm xét VHU.');
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupVhuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateVhuEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const eligible = raw30 >= threshold;
  const programLabel = VHU_PROGRAM_LABELS[context.programCode] ?? context.programCode;

  const reasons = [
    `Điểm chuẩn VHU 2026 (thi TN THPT, ${programLabel} — mã ${context.programCode}): tổng thô 3 môn ≥ ${threshold}/30.`,
    `Tổng thô 3 môn = ${raw30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} điểm chuẩn. Điểm xét tham khảo (thô + ưu tiên) = ${dxt30}/30.`,
  ];

  explanation.push({ id: 'vhu-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: vhuThptExamThresholdEvidence.evidence });
  explanation.push({ id: 'vhu-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm, tham khảo)' : 'Điểm ưu tiên (tham khảo)', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: vhuThptExamThresholdEvidence.evidence });
  explanation.push({ id: 'vhu-exact-dxt', label: 'Điểm xét tham khảo (không dùng để so điểm chuẩn)', output: dxt30, scale: 30, formula: 'round2(tổng thô 3 môn + điểm ưu tiên)', evidence: vhuThptExamThresholdEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'vhu-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tham khảo đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'vhu',
    year: VHU_EXACT_METHOD.year,
    methodId: VHU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...vhuThptExamThresholdEvidence.evidence],
  };
}
