import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { NLU_THPT_THRESHOLD } from './eligibility';
import { nluAdmissionMethods } from './methods';
import { NLU_THRESHOLD_BY_CODE } from './thresholds';
import { calculateNluEffectivePriority30, lookupNluStandardPriority30 } from './priority';
import { nluThptExamFormulaEvidence } from './evidence';

export function evaluateNluThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'nlu',
    schoolShortName: 'NLU',
    method: nluAdmissionMethods[0],
    profile,
    context,
    threshold: NLU_THPT_THRESHOLD,
    evidenceSourceId: 'nlu-threshold-2026',
  });
}

const NLU_EXACT_METHOD = nluAdmissionMethods[1];

export interface NluThptExamExactEvaluationContext {
  programCode?: string;
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** NLU 2026 — phương thức thi TN THPT: ĐXT = round2(tổng thô 3 môn + điểm ưu tiên). Đủ điều kiện
 * xét tuyển ⟺ tổng thô ≥ ngưỡng theo mã xét tuyển (KV3, không phân biệt tổ hợp). */
export function evaluateNluThptExamExactAdmission(
  profile: ApplicantProfile,
  context: NluThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'nlu',
    year: NLU_EXACT_METHOD.year,
    methodId: NLU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.programCode) {
    missingRequirements.push({ kind: 'school-context', code: 'nlu-program-code', label: 'Chọn mã xét tuyển NLU để áp ngưỡng.' });
    return partial('Cần chọn mã xét tuyển NLU để tính Điểm xét tuyển.');
  }
  const entry = NLU_THRESHOLD_BY_CODE.get(context.programCode);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'nlu-program-code', label: `Mã xét tuyển "${context.programCode}" không có trong bảng ngưỡng NLU 2026.` });
    return partial(`Mã xét tuyển "${context.programCode}" không có trong bảng ngưỡng NLU 2026.`);
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'nlu-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển NLU.' });
    return partial('Cần chọn tổ hợp 3 môn để tính Điểm xét tuyển NLU.');
  }

  let total = 0;
  const missing: SubjectId[] = [];
  for (const s of context.subjectContext.subjects) {
    const v = profile.thpt?.scores?.[s];
    if (v === undefined) missing.push(s);
    else total += v;
  }
  if (missing.length > 0) {
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `nlu-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp NLU.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển NLU.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupNluStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateNluEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const thresholdPass = raw30 >= entry.threshold30;

  const reasons = [
    `Ngưỡng ĐBCL ngành ${entry.name} (${entry.code}), KV3: tổng thô 3 môn ≥ ${entry.threshold30}/30 — tổng của bạn ${raw30}/30 → ${thresholdPass ? 'đạt' : 'chưa đạt'}.`,
    `Điểm xét tuyển = tổng thô + điểm ưu tiên = ${raw30} + ${priority.effectivePriority30} = ${dxt30}/30. Ngưỡng ĐKXT so với tổng THÔ; điểm chuẩn trúng tuyển thực tế cao hơn và có cộng điểm ưu tiên.`,
  ];

  explanation.push({ id: 'nlu-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: nluThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'nlu-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: nluThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'nlu-exact-dxt', label: 'Điểm xét tuyển', output: dxt30, scale: 30, formula: 'round2(tổng thô 3 môn + điểm ưu tiên)', evidence: nluThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'nlu-exact-threshold', label: `Ngưỡng ĐBCL — ${entry.name}`, output: entry.threshold30, scale: 30, formula: reasons[0], evidence: nluThptExamFormulaEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'nlu-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'nlu',
    year: NLU_EXACT_METHOD.year,
    methodId: NLU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: thresholdPass ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...nluThptExamFormulaEvidence.evidence],
  };
}
