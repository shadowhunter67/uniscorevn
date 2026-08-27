import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { VINHUNI_THPT_THRESHOLD } from './eligibility';
import { vinhuniAdmissionMethods } from './methods';
import { getVinhuniProgramThreshold } from './thresholds';
import { calculateVinhuniThptRawScore30, calculateVinhuniThptFinalScore30 } from './calculator';
import { calculateVinhuniEffectivePriority30, lookupVinhuniStandardPriority30 } from './priority';
import { vinhuniProgramThresholdEvidence, vinhuniFormulaEvidence, vinhuniPriorityEvidence } from './evidence';

export function evaluateVinhuniThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'vinhuni',
    schoolShortName: 'VinhUni',
    method: vinhuniAdmissionMethods[0],
    profile,
    context,
    threshold: VINHUNI_THPT_THRESHOLD,
    evidenceSourceId: 'vinhuni-quality-threshold-conversion-2026',
  });
}

const EXACT_METHOD = vinhuniAdmissionMethods[1];

export interface VinhuniExactSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface VinhuniExactEvaluationContext {
  subjectContext?: VinhuniExactSubjectContext;
  /** Mã ngành xét tuyển khớp `thresholds.ts`. Bắt buộc. */
  programId?: string;
  /** Điểm thưởng đã quy về thang 30 — không có field trong hồ sơ dùng chung; mặc định 0. */
  rewardBonus30?: number;
}

function exactPartial(input: { missingInputs: string[]; missingRequirements: MissingRequirement[]; explanation: CalculationStep[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'vinhuni',
    year: EXACT_METHOD.year,
    methodId: EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [input.reason] },
    missingInputs: input.missingInputs,
    missingRules: [],
    missingRequirements: input.missingRequirements,
    explanation: input.explanation,
    evidence: [],
  };
}

/**
 * VinhUni 2026 — Phương thức 100 (xét thi TN THPT), tính đủ Điểm xét tuyển (thang 30):
 *   ĐXT = round2((M1 + M2 + M3) + Điểm thưởng + Điểm ưu tiên)
 * Điều kiện: (tổng thô 3 môn + điểm ưu tiên) ≥ ngưỡng của mã ngành, không môn nào ≤ 1,0, và
 * điều kiện phụ theo môn (nếu ngành có).
 */
export function evaluateVinhuniThptExamExactAdmission(profile: ApplicantProfile, context: VinhuniExactEvaluationContext = {}): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const threshold = getVinhuniProgramThreshold(context.programId);
  if (!threshold) {
    missingRequirements.push({ kind: 'school-context', code: 'vinhuni-program', label: 'Chọn mã ngành xét tuyển Trường Đại học Vinh (Phương thức 100).' });
    return exactPartial({ missingInputs: ['Chọn mã ngành VinhUni.'], missingRequirements, explanation, reason: 'Cần chọn mã ngành để xác định ngưỡng đảm bảo chất lượng đầu vào.' });
  }

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'vinhuni-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển VinhUni.' });
    return exactPartial({ missingInputs: ['Chọn tổ hợp 3 môn.'], missingRequirements, explanation, reason: 'Cần chọn tổ hợp để tính điểm.' });
  }

  const { subjects } = context.subjectContext;
  const scores: number[] = [];
  const missingSubjects: SubjectId[] = [];
  for (const subjectId of subjects) {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) missingSubjects.push(subjectId);
    else scores.push(score);
  }
  if (missingSubjects.length > 0) {
    missingRequirements.push(...missingSubjects.map((s) => ({ kind: 'profile-input' as const, code: `vinhuni-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp VinhUni.` })));
    return exactPartial({ missingInputs: ['Chưa đủ điểm 3 môn thi TN THPT theo tổ hợp VinhUni.'], missingRequirements, explanation, reason: 'Cần đủ điểm 3 môn để tính điểm xét tuyển.' });
  }

  if (threshold.condition) {
    const condScore = profile.thpt?.scores?.[threshold.condition.subject];
    if (condScore === undefined) {
      missingRequirements.push({ kind: 'profile-input', code: `vinhuni-thpt-${threshold.condition.subject}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[threshold.condition.subject]} (điều kiện phụ ngành ${threshold.programName}, ≥ ${threshold.condition.min}).` });
      return exactPartial({ missingInputs: [`Chưa có điểm môn ${SUBJECT_LABELS[threshold.condition.subject]}.`], missingRequirements, explanation, reason: `Ngành ${threshold.programName} yêu cầu môn ${SUBJECT_LABELS[threshold.condition.subject]} ≥ ${threshold.condition.min}.` });
    }
  }

  const raw30 = calculateVinhuniThptRawScore30(scores);
  const rewardBonus30 = Math.max(0, Math.min(3, context.rewardBonus30 ?? 0));
  const standardPriority30 = lookupVinhuniStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateVinhuniEffectivePriority30({ rawPlusReward30: raw30 + rewardBonus30, standardPriority30 });
  const finalScore = calculateVinhuniThptFinalScore30({ raw30, rewardBonus30, effectivePriority30: priority.effectivePriority30 });

  const scoreForThreshold = round2(raw30 + priority.effectivePriority30);
  const noLowSubject = scores.every((value) => value > 1);
  const conditionOk =
    !threshold.condition || (profile.thpt?.scores?.[threshold.condition.subject] ?? 0) >= threshold.condition.min;
  const eligibilityStatus: 'eligible' | 'ineligible' =
    scoreForThreshold >= threshold.thptMin30 && noLowSubject && conditionOk ? 'eligible' : 'ineligible';

  const reasons: string[] = [];
  if (!noLowSubject) reasons.push('Có môn thi ≤ 1,0 điểm — không đủ điều kiện đăng ký xét tuyển.');
  if (!conditionOk && threshold.condition) reasons.push(`Môn ${SUBJECT_LABELS[threshold.condition.subject]} chưa đạt tối thiểu ${threshold.condition.min}.`);
  reasons.push(
    `Điểm xét tuyển (chưa cộng điểm thưởng) ${scoreForThreshold}/30 ${scoreForThreshold >= threshold.thptMin30 ? 'đạt' : 'dưới'} ngưỡng ${threshold.thptMin30}/30 của ngành ${threshold.programName} (mã ${threshold.programId}). Điểm chuẩn trúng tuyển thực tế có thể cao hơn.`
  );

  explanation.push({ id: 'vinhuni-exact-threshold', label: `Ngưỡng đầu vào - ${threshold.programName}`, output: scoreForThreshold, scale: 30, formula: reasons[reasons.length - 1], evidence: vinhuniProgramThresholdEvidence.evidence });
  explanation.push({ id: 'vinhuni-exact-academic', label: 'Điểm thi (tổng thô 3 môn)', output: raw30, scale: 30, formula: 'M1 + M2 + M3', evidence: vinhuniFormulaEvidence.evidence });
  if (rewardBonus30 > 0) {
    explanation.push({ id: 'vinhuni-exact-reward', label: 'Điểm thưởng', output: rewardBonus30, scale: 30, formula: 'Điểm thưởng theo quy định (caller cung cấp)', evidence: vinhuniFormulaEvidence.evidence });
  }
  explanation.push({
    id: 'vinhuni-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − Tổng điểm đạt được)/7,5] × Mức điểm ưu tiên' : 'Mức điểm ưu tiên KV/ĐT (Điều 7 Thông tư 06/2026)',
    evidence: vinhuniPriorityEvidence.evidence,
  });
  explanation.push({ id: 'vinhuni-exact-final', label: 'Điểm xét tuyển', output: finalScore, scale: 30, formula: '[Điểm thi + Điểm thưởng] + Điểm ưu tiên', evidence: vinhuniFormulaEvidence.evidence });

  return {
    schoolId: 'vinhuni',
    year: EXACT_METHOD.year,
    methodId: EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligibilityStatus, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...vinhuniProgramThresholdEvidence.evidence, ...vinhuniFormulaEvidence.evidence, ...vinhuniPriorityEvidence.evidence],
  };
}
