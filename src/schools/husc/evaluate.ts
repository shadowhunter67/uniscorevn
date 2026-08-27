import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { HUSC_THPT_THRESHOLD } from './eligibility';
import { huscAdmissionMethods } from './methods';
import { calculateHuscThptRawScore, calculateHuscThptFinalScore } from './calculator';
import { calculateHuscPriority30, lookupHuscStandardPriority30 } from './priority';
import { getHuscExactThreshold } from './thresholds';
import { huscExactProgramThresholdEvidence, huscFormulaEvidence, huscPriorityEvidence } from './evidence';

export function evaluateHuscAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'husc',
    schoolShortName: 'HUSC',
    method: huscAdmissionMethods[0],
    profile,
    context,
    threshold: HUSC_THPT_THRESHOLD,
    evidenceSourceId: 'husc-threshold-2026',
  });
}

const EXACT_METHOD = huscAdmissionMethods[1];

export interface HuscExactSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface HuscExactEvaluationContext {
  subjectContext?: HuscExactSubjectContext;
  /** Mã ngành DHT. Bỏ trống = một mã ngành ngưỡng 15,00/30 điển hình; truyền mã có điều kiện phụ
   * (7440102SC / 7510302IC / 7580101) ⇒ evaluator hạ về partial. */
  programId?: string;
  /** Điểm cộng đã tính sẵn (Phụ lục 2, tối đa 3,0/30) — module này không tự phân loại thành tích,
   * chỉ cộng giá trị caller cung cấp. */
  bonus30?: number;
}

function exactPartial(input: { missingInputs: string[]; missingRequirements: MissingRequirement[]; explanation: CalculationStep[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'husc',
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
 * HUSC 2026 — phương thức xét kết quả thi TN THPT, tính đủ Điểm xét tuyển (thang 30):
 *   ĐXT = round2(min(30, (M1 + M2 + M3) + Điểm cộng + Điểm ưu tiên))
 * Ngưỡng đảm bảo chất lượng đầu vào (15,00/30) so với tổng thô 3 môn (không cộng điểm ưu tiên/điểm
 * cộng — Ghi chú 1 Phụ lục 1).
 */
export function evaluateHuscThptExamExactAdmission(profile: ApplicantProfile, context: HuscExactEvaluationContext = {}): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const threshold = getHuscExactThreshold(context.programId);
  if (!threshold.inScope) {
    missingRequirements.push({ kind: 'official-rule', code: 'husc-program-out-of-scope', label: threshold.outOfScopeReason ?? 'Ngành ngoài phạm vi tính exact của HUSC.' });
    return exactPartial({ missingInputs: [], missingRequirements, explanation, reason: threshold.outOfScopeReason ?? 'Ngành có điều kiện phụ ngoài phạm vi tính exact.' });
  }

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'husc-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển HUSC.' });
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
    missingRequirements.push(...missingSubjects.map((s) => ({ kind: 'profile-input' as const, code: `husc-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp HUSC.` })));
    return exactPartial({ missingInputs: ['Chưa đủ điểm 3 môn thi TN THPT theo tổ hợp HUSC.'], missingRequirements, explanation, reason: 'Cần đủ điểm 3 môn để tính điểm xét tuyển.' });
  }

  const raw30 = calculateHuscThptRawScore({ subject1Score: scores[0], subject2Score: scores[1], subject3Score: scores[2] });
  const eligibilityStatus: 'eligible' | 'ineligible' = raw30 >= threshold.thresholdMin30 ? 'eligible' : 'ineligible';
  const eligibilityReason = `Tổng thô 3 môn ${raw30}/30 ${eligibilityStatus === 'eligible' ? 'đạt' : 'dưới'} ngưỡng đảm bảo chất lượng đầu vào ${threshold.thresholdMin30}/30 (mã ngành DHT xét điểm thi TN THPT, khu vực 3, không tính điểm cộng). Điểm chuẩn trúng tuyển thực tế có thể cao hơn.`;

  const bonus30 = Math.max(0, Math.min(3, context.bonus30 ?? 0));
  const standardPriority30 = lookupHuscStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateHuscPriority30({ academicScore30: raw30 + bonus30, standardPriority30 });
  const finalScore = calculateHuscThptFinalScore({ raw30, priority30: priority.effectivePriority30, bonus30 });

  explanation.push({ id: 'husc-exact-threshold', label: 'Ngưỡng đảm bảo chất lượng đầu vào', output: raw30, scale: 30, formula: eligibilityReason, evidence: huscExactProgramThresholdEvidence.evidence });
  explanation.push({ id: 'husc-exact-academic-score', label: 'Điểm học lực (tổng thô 3 môn)', output: raw30, scale: 30, formula: 'M1 + M2 + M3', evidence: huscFormulaEvidence.evidence });
  if (bonus30 > 0) {
    explanation.push({ id: 'husc-exact-bonus', label: 'Điểm cộng', output: bonus30, scale: 30, formula: 'Theo Phụ lục 2 (bảng tiêu chí thành tích), tối đa 3,0', evidence: huscFormulaEvidence.evidence });
  }
  explanation.push({
    id: 'husc-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − Tổng điểm đạt được)/7,50] × Mức điểm ưu tiên' : 'Mức điểm ưu tiên KV/ĐT theo Bảng 1',
    evidence: huscPriorityEvidence.evidence,
  });
  explanation.push({ id: 'husc-exact-final', label: 'Điểm xét tuyển (ĐXT)', output: finalScore, scale: 30, formula: 'min(30, ĐHL + Điểm cộng + Điểm ưu tiên)', evidence: huscFormulaEvidence.evidence });

  return {
    schoolId: 'husc',
    year: EXACT_METHOD.year,
    methodId: EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligibilityStatus, reasons: [eligibilityReason] },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...huscExactProgramThresholdEvidence.evidence, ...huscFormulaEvidence.evidence, ...huscPriorityEvidence.evidence],
  };
}
