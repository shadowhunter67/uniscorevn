import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { HUL_THPT_THRESHOLD } from './eligibility';
import { calculateHulThptRawScore, calculateHulThptFinalScore } from './calculator';
import { calculateHulPriority30, lookupHulStandardPriority30 } from './priority';
import { hulThptThresholdEvidence, hulFormulaEvidence, hulPriorityEvidence } from './evidence';
import { hulAdmissionMethods } from './methods';

export function evaluateHulAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'hul',
    schoolShortName: 'HUL',
    method: hulAdmissionMethods[0],
    profile,
    context,
    threshold: HUL_THPT_THRESHOLD,
    evidenceSourceId: 'hul-threshold-2026',
  });
}

const EXACT_METHOD = hulAdmissionMethods[1];

export interface HulExactSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface HulExactEvaluationContext {
  subjectContext?: HulExactSubjectContext;
  /** Điểm cộng đã tính sẵn (Phụ lục 2, TC1-TC12, tối đa 3,0/30) — bỏ trống nếu không có thành
   * tích. Module này KHÔNG tự phân loại thành tích, chỉ cộng giá trị caller cung cấp. */
  bonus30?: number;
}

function exactPartial(input: { missingInputs: string[]; missingRequirements: MissingRequirement[]; explanation: CalculationStep[]; eligibilityReason: string }): AdmissionEvaluation {
  return {
    schoolId: 'hul',
    year: EXACT_METHOD.year,
    methodId: EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [input.eligibilityReason] },
    missingInputs: input.missingInputs,
    missingRules: [],
    missingRequirements: input.missingRequirements,
    explanation: input.explanation,
    evidence: [],
  };
}

/**
 * Xét kết quả thi TN THPT 2026 (HUL, ngành Luật/Luật Kinh tế) — thang 30. Điểm học lực = tổng thô
 * 3 môn tổ hợp (không hệ số); điểm ưu tiên theo Bảng 1 (Đại học Huế tự công bố, công thức giảm điểm
 * ưu tiên khi tổng ≥22,5/30); điểm cộng (nếu có, tối đa 3,0) do caller tự cung cấp. Điểm xét tuyển
 * cuối = học lực + điểm cộng + ưu tiên, kẹp trần 30.
 */
export function evaluateHulExactThptAdmission(profile: ApplicantProfile, context: HulExactEvaluationContext = {}): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'hul-exact-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển HUL.' });
    return exactPartial({ missingInputs: ['Chọn tổ hợp 3 môn.'], missingRequirements, explanation, eligibilityReason: 'Cần chọn tổ hợp để kiểm tra ngưỡng đầu vào.' });
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
    missingRequirements.push(...missingSubjects.map((s) => ({ kind: 'profile-input' as const, code: `hul-exact-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]}.` })));
    return exactPartial({ missingInputs: ['Chưa đủ điểm 3 môn thi TN THPT theo tổ hợp.'], missingRequirements, explanation, eligibilityReason: 'Cần đủ điểm 3 môn để kiểm tra ngưỡng.' });
  }

  const raw30 = calculateHulThptRawScore({ subject1Score: scores[0], subject2Score: scores[1], subject3Score: scores[2] });
  const threshold = { pass: raw30 >= HUL_THPT_THRESHOLD.min30, requiredText: HUL_THPT_THRESHOLD.requiredText };
  explanation.push({ id: 'hul-exact-eligibility-threshold', label: 'Ngưỡng đầu vào', output: raw30, scale: 30, formula: threshold.requiredText, evidence: hulThptThresholdEvidence.evidence });
  explanation.push({ id: 'hul-exact-academic-score', label: 'Điểm học lực (tổng thô 3 môn)', output: raw30, scale: 30, formula: 'MT1 + MT2 + MT3', evidence: hulFormulaEvidence.evidence });

  const bonus30 = Math.max(0, Math.min(3, context.bonus30 ?? 0));
  if (bonus30 > 0) {
    explanation.push({ id: 'hul-exact-bonus', label: 'Điểm cộng', output: bonus30, scale: 30, formula: 'Theo Phụ lục 2 (TC1-TC12), tối đa 3,0', evidence: hulFormulaEvidence.evidence });
  }

  const standardPriority30 = lookupHulStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateHulPriority30({ academicScore30: raw30, standardPriority30 });
  explanation.push({
    id: 'hul-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên đã giảm' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 – Học lực)/7,5] × Mức ưu tiên' : 'Mức điểm ưu tiên quy đổi',
    evidence: hulPriorityEvidence.evidence,
  });

  const finalScore = calculateHulThptFinalScore({ raw30, priority30: priority.effectivePriority30, bonus30 });
  explanation.push({ id: 'hul-exact-final', label: 'Điểm xét tuyển cuối cùng', output: finalScore, scale: 30 });

  return {
    schoolId: 'hul',
    year: EXACT_METHOD.year,
    methodId: EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: threshold.pass ? 'eligible' : 'ineligible', reasons: [threshold.requiredText] },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...hulThptThresholdEvidence.evidence, ...hulFormulaEvidence.evidence, ...hulPriorityEvidence.evidence],
  };
}
