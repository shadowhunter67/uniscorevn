import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { HUAF_TRANSCRIPT_THPT_COREQUISITE_THRESHOLD } from './eligibility';
import { huafAdmissionMethods } from './methods';
import { calculateHuafThptRawScore, calculateHuafThptFinalScore } from './calculator';
import { calculateHuafPriority30, lookupHuafStandardPriority30 } from './priority';
import { getHuafProgramThreshold } from './thresholds';
import { huafThptProgramThresholdEvidence, huafFormulaEvidence, huafPriorityEvidence } from './evidence';

export function evaluateHuafAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'huaf',
    schoolShortName: 'HUAF',
    method: huafAdmissionMethods[0],
    profile,
    context,
    threshold: HUAF_TRANSCRIPT_THPT_COREQUISITE_THRESHOLD,
    evidenceSourceId: 'huaf-official-admission-info-2026',
  });
}

const EXACT_METHOD = huafAdmissionMethods[1];

export interface HuafExactSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface HuafExactEvaluationContext {
  subjectContext?: HuafExactSubjectContext;
  /** Mã ngành DHL khớp `thresholds.ts` — bắt buộc để xác định ngưỡng (15/16/17). */
  programId?: string;
  /** Điểm cộng đã tính sẵn (Phụ lục 2, tối đa 3,0/30). */
  bonus30?: number;
}

function exactPartial(input: { missingInputs: string[]; missingRequirements: MissingRequirement[]; explanation: CalculationStep[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'huaf',
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
 * HUAF 2026 — phương thức xét kết quả thi TN THPT, tính đủ Điểm xét tuyển (thang 30):
 *   ĐXT = round2(min(30, (M1 + M2 + M3) + Điểm cộng + Điểm ưu tiên))
 * Ngưỡng theo mã ngành so với tổng thô 3 môn (không cộng điểm ưu tiên/điểm cộng — Ghi chú 1).
 */
export function evaluateHuafThptExamExactAdmission(profile: ApplicantProfile, context: HuafExactEvaluationContext = {}): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const threshold = getHuafProgramThreshold(context.programId);
  if (!threshold) {
    missingRequirements.push({ kind: 'school-context', code: 'huaf-program', label: 'Chọn ngành HUAF để xác định ngưỡng (15/16/17 trên thang 30 tùy ngành).' });
    return exactPartial({ missingInputs: ['Chọn ngành HUAF.'], missingRequirements, explanation, reason: 'Cần chọn ngành để xác định ngưỡng đảm bảo chất lượng đầu vào.' });
  }

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'huaf-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển HUAF.' });
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
    missingRequirements.push(...missingSubjects.map((s) => ({ kind: 'profile-input' as const, code: `huaf-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp HUAF.` })));
    return exactPartial({ missingInputs: ['Chưa đủ điểm 3 môn thi TN THPT theo tổ hợp HUAF.'], missingRequirements, explanation, reason: 'Cần đủ điểm 3 môn để tính điểm xét tuyển.' });
  }

  const raw30 = calculateHuafThptRawScore({ subject1Score: scores[0], subject2Score: scores[1], subject3Score: scores[2] });
  const eligibilityStatus: 'eligible' | 'ineligible' = raw30 >= threshold.thptMin30 ? 'eligible' : 'ineligible';
  const eligibilityReason = `Tổng thô 3 môn ${raw30}/30 ${eligibilityStatus === 'eligible' ? 'đạt' : 'dưới'} ngưỡng ${threshold.thptMin30}/30 của ngành ${threshold.programName} (mã ${threshold.programId}, khu vực 3, không tính điểm cộng). Điểm chuẩn trúng tuyển thực tế có thể cao hơn.`;

  const bonus30 = Math.max(0, Math.min(3, context.bonus30 ?? 0));
  const standardPriority30 = lookupHuafStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateHuafPriority30({ academicScore30: raw30 + bonus30, standardPriority30 });
  const finalScore = calculateHuafThptFinalScore({ raw30, priority30: priority.effectivePriority30, bonus30 });

  explanation.push({ id: 'huaf-exact-threshold', label: `Ngưỡng đầu vào - ${threshold.programName}`, output: raw30, scale: 30, formula: eligibilityReason, evidence: huafThptProgramThresholdEvidence.evidence });
  explanation.push({ id: 'huaf-exact-academic-score', label: 'Điểm học lực (tổng thô 3 môn)', output: raw30, scale: 30, formula: 'M1 + M2 + M3', evidence: huafFormulaEvidence.evidence });
  if (bonus30 > 0) {
    explanation.push({ id: 'huaf-exact-bonus', label: 'Điểm cộng', output: bonus30, scale: 30, formula: 'Theo Phụ lục 2 (bảng tiêu chí thành tích), tối đa 3,0', evidence: huafFormulaEvidence.evidence });
  }
  explanation.push({
    id: 'huaf-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − Tổng điểm đạt được)/7,50] × Mức điểm ưu tiên' : 'Mức điểm ưu tiên KV/ĐT theo Bảng 1',
    evidence: huafPriorityEvidence.evidence,
  });
  explanation.push({ id: 'huaf-exact-final', label: 'Điểm xét tuyển (ĐXT)', output: finalScore, scale: 30, formula: 'min(30, ĐHL + Điểm cộng + Điểm ưu tiên)', evidence: huafFormulaEvidence.evidence });

  return {
    schoolId: 'huaf',
    year: EXACT_METHOD.year,
    methodId: EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligibilityStatus, reasons: [eligibilityReason] },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...huafThptProgramThresholdEvidence.evidence, ...huafFormulaEvidence.evidence, ...huafPriorityEvidence.evidence],
  };
}
