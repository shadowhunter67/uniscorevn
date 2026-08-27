import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { NCTU_THPT_THRESHOLD, NCTU_STANDARD_THPT_THRESHOLD } from './eligibility';
import { calculateNctuThptRawScore, calculateNctuThptFinalScore } from './calculator';
import { calculateNctuPriority30, lookupNctuStandardPriority30 } from './priority';
import { nctuAdmissionMethods } from './methods';

export function evaluateNctuThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'nctu',
    schoolShortName: 'NCTU',
    method: nctuAdmissionMethods[0],
    profile,
    context,
    threshold: NCTU_THPT_THRESHOLD,
    evidenceSourceId: 'nctu-threshold-notice-2026',
  });
}

const STANDARD_METHOD = nctuAdmissionMethods[1];
const STANDARD_THRESHOLD_EVIDENCE = [{ sourceId: 'nctu-threshold-notice-2026', location: 'Ngưỡng chung 15/30, thi TN THPT, nhóm ngành ngoài Sức khỏe/Luật', verification: 'verified' as const, effectiveYear: 2026 }];
const STANDARD_FORMULA_EVIDENCE = [{ sourceId: 'nctu-priority-guide-2026', location: '"Công thức trên áp dụng cho tổng điểm 3 môn... không nhân hệ số"', verification: 'verified' as const, effectiveYear: 2026 }];
const STANDARD_PRIORITY_EVIDENCE = [{ sourceId: 'nctu-priority-guide-2026', location: 'Bảng điểm ưu tiên khu vực/đối tượng + công thức giảm điểm ưu tiên khi tổng ≥22,50/30', verification: 'verified' as const, effectiveYear: 2026 }];

export interface NctuSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface NctuThptExamStandardEvaluationContext {
  subjectContext?: NctuSubjectContext;
}

function standardPartial(input: { missingInputs: string[]; missingRequirements: MissingRequirement[]; explanation: CalculationStep[]; eligibilityReason: string }): AdmissionEvaluation {
  return {
    schoolId: 'nctu',
    year: STANDARD_METHOD.year,
    methodId: STANDARD_METHOD.id,
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
 * Xét kết quả thi TN THPT 2026 (NCTU, nhóm ngành ngoài Sức khỏe/Luật) — thang 30. Điểm học lực =
 * tổng thô 3 môn tổ hợp (không hệ số); điểm ưu tiên theo Điều 7 (bảng đầy đủ + công thức giảm điểm
 * ưu tiên khi tổng ≥22,5/30, tự đăng trên tuyensinh.nctu.edu.vn). Điểm xét tuyển cuối = học lực +
 * ưu tiên, kẹp trần 30.
 */
export function evaluateNctuThptExamStandardAdmission(profile: ApplicantProfile, context: NctuThptExamStandardEvaluationContext = {}): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'nctu-standard-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển NCTU.' });
    return standardPartial({ missingInputs: ['Chọn tổ hợp 3 môn.'], missingRequirements, explanation, eligibilityReason: 'Cần chọn tổ hợp để kiểm tra ngưỡng đầu vào.' });
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
    missingRequirements.push(...missingSubjects.map((s) => ({ kind: 'profile-input' as const, code: `nctu-standard-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]}.` })));
    return standardPartial({ missingInputs: ['Chưa đủ điểm 3 môn thi TN THPT theo tổ hợp.'], missingRequirements, explanation, eligibilityReason: 'Cần đủ điểm 3 môn để kiểm tra ngưỡng.' });
  }

  const raw30 = calculateNctuThptRawScore({ subject1Score: scores[0], subject2Score: scores[1], subject3Score: scores[2] });
  const threshold = { pass: raw30 >= NCTU_STANDARD_THPT_THRESHOLD.min30, requiredText: NCTU_STANDARD_THPT_THRESHOLD.requiredText };
  explanation.push({ id: 'nctu-standard-eligibility-threshold', label: 'Ngưỡng đầu vào', output: raw30, scale: 30, formula: threshold.requiredText, evidence: STANDARD_THRESHOLD_EVIDENCE });
  explanation.push({ id: 'nctu-standard-academic-score', label: 'Điểm học lực (tổng thô 3 môn)', output: raw30, scale: 30, formula: 'MT1 + MT2 + MT3', evidence: STANDARD_FORMULA_EVIDENCE });

  const standardPriority30 = lookupNctuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateNctuPriority30({ academicScore30: raw30, standardPriority30 });
  explanation.push({
    id: 'nctu-standard-priority',
    label: priority.reduced ? 'Điểm ưu tiên đã giảm' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 – Học lực)/7,5] × Mức ưu tiên' : 'Mức điểm ưu tiên quy đổi',
    evidence: STANDARD_PRIORITY_EVIDENCE,
  });

  const finalScore = calculateNctuThptFinalScore({ raw30, priority30: priority.effectivePriority30 });
  explanation.push({ id: 'nctu-standard-final', label: 'Điểm xét tuyển cuối cùng', output: finalScore, scale: 30 });

  return {
    schoolId: 'nctu',
    year: STANDARD_METHOD.year,
    methodId: STANDARD_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: threshold.pass ? 'eligible' : 'ineligible', reasons: [threshold.requiredText] },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...STANDARD_THRESHOLD_EVIDENCE, ...STANDARD_FORMULA_EVIDENCE, ...STANDARD_PRIORITY_EVIDENCE],
  };
}
