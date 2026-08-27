import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { HUEEDU_THPT_THRESHOLD } from './eligibility';
import { hueeduAdmissionMethods } from './methods';
import { calculateHueeduThptRawScore, calculateHueeduThptFinalScore } from './calculator';
import { calculateHueeduPriority30, lookupHueeduStandardPriority30 } from './priority';
import { getHueeduExactProgramThreshold } from './thresholds';
import { hueeduExactProgramThresholdEvidence, hueeduFormulaEvidence, hueeduPriorityEvidence } from './evidence';

export function evaluateHueeduAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'hueedu',
    schoolShortName: 'HUED',
    method: hueeduAdmissionMethods[0],
    profile,
    context,
    threshold: HUEEDU_THPT_THRESHOLD,
    evidenceSourceId: 'hueedu-hueu-threshold-appendix-2026',
  });
}

const EXACT_METHOD = hueeduAdmissionMethods[1];

export interface HueeduExactSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface HueeduExactEvaluationContext {
  subjectContext?: HueeduExactSubjectContext;
  /** Mã ngành DHS trong phạm vi exact: '7310403' (Tâm lý học giáo dục) hoặc '7480104' (Hệ thống
   * thông tin). Bắt buộc. */
  programId?: string;
  /** Điểm cộng đã tính sẵn (Phụ lục 2, tối đa 3,0/30). */
  bonus30?: number;
}

function exactPartial(input: { missingInputs: string[]; missingRequirements: MissingRequirement[]; explanation: CalculationStep[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'hueedu',
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
 * HUED 2026 — phương thức xét kết quả thi TN THPT, tính đủ Điểm xét tuyển (thang 30) cho 2 ngành
 * ngoài đào tạo giáo viên: ĐXT = round2(min(30, (M1 + M2 + M3) + Điểm cộng + Điểm ưu tiên)).
 * Ngưỡng 16,00/30 so với tổng thô 3 môn (không cộng điểm ưu tiên/điểm cộng — Ghi chú 1).
 */
export function evaluateHueeduThptExamExactAdmission(profile: ApplicantProfile, context: HueeduExactEvaluationContext = {}): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const threshold = getHueeduExactProgramThreshold(context.programId);
  if (!threshold) {
    missingRequirements.push({ kind: 'school-context', code: 'hueedu-program', label: 'Chọn ngành trong phạm vi exact của HUED: Tâm lý học giáo dục (7310403) hoặc Hệ thống thông tin (7480104).' });
    return exactPartial({ missingInputs: ['Chọn ngành HUED trong phạm vi exact.'], missingRequirements, explanation, reason: 'Nhánh exact HUED chỉ phủ 2 ngành ngoài đào tạo giáo viên (Tâm lý học giáo dục, Hệ thống thông tin).' });
  }

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'hueedu-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển HUED.' });
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
    missingRequirements.push(...missingSubjects.map((s) => ({ kind: 'profile-input' as const, code: `hueedu-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp HUED.` })));
    return exactPartial({ missingInputs: ['Chưa đủ điểm 3 môn thi TN THPT theo tổ hợp HUED.'], missingRequirements, explanation, reason: 'Cần đủ điểm 3 môn để tính điểm xét tuyển.' });
  }

  const raw30 = calculateHueeduThptRawScore({ subject1Score: scores[0], subject2Score: scores[1], subject3Score: scores[2] });
  const eligibilityStatus: 'eligible' | 'ineligible' = raw30 >= threshold.thptMin30 ? 'eligible' : 'ineligible';
  const eligibilityReason = `Tổng thô 3 môn ${raw30}/30 ${eligibilityStatus === 'eligible' ? 'đạt' : 'dưới'} ngưỡng ${threshold.thptMin30}/30 của ngành ${threshold.programName} (mã ${threshold.programId}, khu vực 3, không tính điểm cộng). Điểm chuẩn trúng tuyển thực tế có thể cao hơn.`;

  const bonus30 = Math.max(0, Math.min(3, context.bonus30 ?? 0));
  const standardPriority30 = lookupHueeduStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateHueeduPriority30({ academicScore30: raw30 + bonus30, standardPriority30 });
  const finalScore = calculateHueeduThptFinalScore({ raw30, priority30: priority.effectivePriority30, bonus30 });

  explanation.push({ id: 'hueedu-exact-threshold', label: `Ngưỡng đầu vào - ${threshold.programName}`, output: raw30, scale: 30, formula: eligibilityReason, evidence: hueeduExactProgramThresholdEvidence.evidence });
  explanation.push({ id: 'hueedu-exact-academic-score', label: 'Điểm học lực (tổng thô 3 môn)', output: raw30, scale: 30, formula: 'M1 + M2 + M3', evidence: hueeduFormulaEvidence.evidence });
  if (bonus30 > 0) {
    explanation.push({ id: 'hueedu-exact-bonus', label: 'Điểm cộng', output: bonus30, scale: 30, formula: 'Theo Phụ lục 2 (bảng tiêu chí thành tích), tối đa 3,0', evidence: hueeduFormulaEvidence.evidence });
  }
  explanation.push({
    id: 'hueedu-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − Tổng điểm đạt được)/7,50] × Mức điểm ưu tiên' : 'Mức điểm ưu tiên KV/ĐT theo Bảng 1',
    evidence: hueeduPriorityEvidence.evidence,
  });
  explanation.push({ id: 'hueedu-exact-final', label: 'Điểm xét tuyển (ĐXT)', output: finalScore, scale: 30, formula: 'min(30, ĐHL + Điểm cộng + Điểm ưu tiên)', evidence: hueeduFormulaEvidence.evidence });

  return {
    schoolId: 'hueedu',
    year: EXACT_METHOD.year,
    methodId: EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligibilityStatus, reasons: [eligibilityReason] },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...hueeduExactProgramThresholdEvidence.evidence, ...hueeduFormulaEvidence.evidence, ...hueeduPriorityEvidence.evidence],
  };
}
