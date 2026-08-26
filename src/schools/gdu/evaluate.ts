import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { gduAdmissionMethods } from './methods';
import { GDU_THPT_THRESHOLD } from './eligibility';
import { calculateGduThptRawScore, calculateGduThptFinalScore } from './calculator';
import { calculateGduPriority30, lookupGduStandardPriority30 } from './priority';
import { gduThptExamThresholdEvidence, gduFormulaEvidence, gduPriorityEvidence } from './evidence';

const METHOD_ID = gduAdmissionMethods[0].id;
const YEAR = gduAdmissionMethods[0].year;

export interface GduSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface GduEvaluationContext {
  subjectContext?: GduSubjectContext;
}

function partial(input: { missingInputs: string[]; missingRequirements: MissingRequirement[]; explanation: CalculationStep[]; eligibilityReason: string }): AdmissionEvaluation {
  return {
    schoolId: 'gdu',
    year: YEAR,
    methodId: METHOD_ID,
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
 * Xét kết quả thi TN THPT 2026 (GDU, nhóm ngành ngoài Sức khỏe/Luật) — thang 30. Điểm học lực =
 * tổng thô 3 môn tổ hợp (không hệ số, mục 5.1 Đề án tuyển sinh 2026); điểm ưu tiên theo mục 7 (Điều
 * 7 Quy chế Bộ GDĐT, GDU tự công bố mức khu vực + công thức giảm điểm ưu tiên khi tổng ≥22,5/30).
 * Điểm xét tuyển cuối = học lực + ưu tiên, kẹp trần 30.
 */
export function evaluateGduThptExamAdmission(profile: ApplicantProfile, context: GduEvaluationContext = {}): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'gdu-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển GDU.' });
    return partial({ missingInputs: ['Chọn tổ hợp 3 môn.'], missingRequirements, explanation, eligibilityReason: 'Cần chọn tổ hợp để kiểm tra ngưỡng đầu vào.' });
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
    missingRequirements.push(...missingSubjects.map((s) => ({ kind: 'profile-input' as const, code: `gdu-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]}.` })));
    return partial({ missingInputs: ['Chưa đủ điểm 3 môn thi TN THPT theo tổ hợp.'], missingRequirements, explanation, eligibilityReason: 'Cần đủ điểm 3 môn để kiểm tra ngưỡng.' });
  }

  const raw30 = calculateGduThptRawScore({ subject1Score: scores[0], subject2Score: scores[1], subject3Score: scores[2] });
  const threshold = { pass: raw30 >= GDU_THPT_THRESHOLD.min30, requiredText: GDU_THPT_THRESHOLD.requiredText };
  explanation.push({ id: 'gdu-eligibility-threshold', label: 'Ngưỡng đầu vào', output: raw30, scale: 30, formula: threshold.requiredText, evidence: gduThptExamThresholdEvidence.evidence });
  explanation.push({ id: 'gdu-academic-score', label: 'Điểm học lực (tổng thô 3 môn)', output: raw30, scale: 30, formula: 'MT1 + MT2 + MT3', evidence: gduFormulaEvidence.evidence });

  const standardPriority30 = lookupGduStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateGduPriority30({ academicScore30: raw30, standardPriority30 });
  explanation.push({
    id: 'gdu-priority',
    label: priority.reduced ? 'Điểm ưu tiên đã giảm' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 – Học lực)/7,5] × Mức ưu tiên' : 'Mức điểm ưu tiên quy đổi',
    evidence: gduPriorityEvidence.evidence,
  });

  const finalScore = calculateGduThptFinalScore({ raw30, priority30: priority.effectivePriority30 });
  explanation.push({ id: 'gdu-final', label: 'Điểm xét tuyển cuối cùng', output: finalScore, scale: 30 });

  return {
    schoolId: 'gdu',
    year: YEAR,
    methodId: METHOD_ID,
    confidence: 'exact-verified',
    eligibility: { status: threshold.pass ? 'eligible' : 'ineligible', reasons: [threshold.requiredText] },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...gduThptExamThresholdEvidence.evidence, ...gduFormulaEvidence.evidence, ...gduPriorityEvidence.evidence],
  };
}
