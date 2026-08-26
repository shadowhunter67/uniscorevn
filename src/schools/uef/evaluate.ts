import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { uefAdmissionMethods } from './methods';
import { uefKnowledgeGaps } from './knowledgeGaps';
import { checkUefThptExamThreshold, checkUefTranscriptEligibility, type UefAcademicRank, type UefThresholdGroup } from './eligibility';
import { calculateUefThptRawScore, calculateUefThptFinalScore } from './calculator';
import { calculateUefPriority30, lookupUefStandardPriority30 } from './priority';
import { uefFormulaEvidence, uefPriorityEvidence, uefThptExamThresholdEvidence } from './evidence';

export interface UefSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

function sumSubjectTotal(profile: ApplicantProfile, subjects: readonly SubjectId[]): { total30?: number; missingSubjects: SubjectId[] } {
  let total = 0;
  const missingSubjects: SubjectId[] = [];
  for (const subjectId of subjects) {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) missingSubjects.push(subjectId);
    else total += score;
  }
  if (missingSubjects.length > 0) return { missingSubjects };
  return { total30: Math.round(total * 100) / 100, missingSubjects };
}

export interface UefThptExamEvaluationContext {
  thresholdGroup?: UefThresholdGroup;
  subjectContext?: UefSubjectContext;
}

/** Phương thức thi TN THPT 2026. */
export function evaluateUefThptExamAdmission(profile: ApplicantProfile, context: UefThptExamEvaluationContext = {}): AdmissionEvaluation {
  const method = uefAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const group: UefThresholdGroup = context.thresholdGroup ?? 'standard';

  let total30: number | undefined;
  if (context.subjectContext) {
    const { total30: total, missingSubjects } = sumSubjectTotal(profile, context.subjectContext.subjects);
    total30 = total;
    if (missingSubjects.length > 0) {
      missingInputs.push('Chưa đủ điểm 3 môn THPT trong tổ hợp đã chọn.');
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `uef-thpt-${subjectId}`,
          label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp UEF.`,
        }))
      );
    }
  } else {
    missingRequirements.push({ kind: 'school-context', code: 'uef-subject-combination', label: 'Chọn tổ hợp môn xét tuyển UEF.' });
  }

  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];
  if (total30 !== undefined) {
    const result = checkUefThptExamThreshold(total30, group);
    status = result.pass ? 'eligible' : 'ineligible';
    reasons.push(result.requiredText);
    explanation.push({ id: 'uef-thpt-exam-threshold', label: 'Mức điểm nhận hồ sơ UEF 2026 (thi TN THPT)', output: total30, scale: 30, formula: result.requiredText });
  }

  return {
    schoolId: 'uef',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons: reasons.length > 0 ? reasons : ['Cần chọn tổ hợp môn và nhập đủ điểm để kiểm tra mức điểm nhận hồ sơ UEF.'] },
    missingInputs,
    missingRules: (method.knowledgeGaps ?? uefKnowledgeGaps).map((gap) => gap.label),
    missingRequirements: [...missingRequirements, ...(method.knowledgeGaps ?? uefKnowledgeGaps).map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label }))],
    explanation,
    evidence: [],
  };
}

export interface UefTranscriptEvaluationContext {
  thresholdGroup?: UefThresholdGroup;
  /** Điểm trung bình tổ hợp 3 môn của 6 học kỳ (thang 30) — chỉ dùng cho nhóm `standard`, người
   * dùng tự cung cấp (xem `uef-transcript-methodology-unpublished`). */
  transcriptTotal30?: number;
  /** Chỉ dùng cho nhóm `law`. */
  academicRank12?: UefAcademicRank;
  thptExamTotal30?: number;
  graduationScore10?: number;
}

/** Phương thức học bạ (6 học kỳ). */
export function evaluateUefTranscriptAdmission(profile: ApplicantProfile, context: UefTranscriptEvaluationContext = {}): AdmissionEvaluation {
  void profile;
  const method = uefAdmissionMethods[1];
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const group: UefThresholdGroup = context.thresholdGroup ?? 'standard';

  if (group === 'standard' && context.transcriptTotal30 === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'uef-transcript-total-score', label: 'Điểm trung bình tổ hợp 3 môn của 6 học kỳ (thang 30).' });
  }
  if (group === 'law' && context.academicRank12 === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'uef-academic-rank-12', label: 'Xếp loại học lực cả năm lớp 12 (khá/tốt-giỏi).' });
  }
  if (group === 'law' && context.thptExamTotal30 === undefined && context.graduationScore10 === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'uef-transcript-alt-score', label: 'Tổng điểm 3 môn thi TN THPT hoặc điểm xét tốt nghiệp THPT (điều kiện thay thế nhóm Luật).' });
  }

  const result = checkUefTranscriptEligibility({
    group,
    transcriptTotal30: context.transcriptTotal30,
    academicRank12: context.academicRank12,
    thptExamTotal30: context.thptExamTotal30,
    graduationScore10: context.graduationScore10,
  });

  const hasEnoughInfo =
    group === 'standard'
      ? context.transcriptTotal30 !== undefined
      : context.academicRank12 !== undefined && (context.thptExamTotal30 !== undefined || context.graduationScore10 !== undefined);
  const status: 'eligible' | 'ineligible' | 'unknown' = hasEnoughInfo ? (result.pass ? 'eligible' : 'ineligible') : 'unknown';

  explanation.push({
    id: `${method.id}-threshold`,
    label: `Mức điểm nhận hồ sơ UEF 2026 (${method.name})`,
    output: context.transcriptTotal30 ?? 0,
    scale: 30,
    formula: result.requiredText,
  });

  return {
    schoolId: 'uef',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons: [result.requiredText] },
    missingInputs: [],
    missingRules: (method.knowledgeGaps ?? uefKnowledgeGaps).map((gap) => gap.label),
    missingRequirements: [...missingRequirements, ...(method.knowledgeGaps ?? uefKnowledgeGaps).map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label }))],
    explanation,
    evidence: [],
  };
}

const STANDARD_EXACT_METHOD = uefAdmissionMethods[2];
const STANDARD_THRESHOLD_EVIDENCE = [{ sourceId: 'uef-quality-threshold-2026', location: uefThptExamThresholdEvidence.evidence[0].location, verification: 'verified' as const, effectiveYear: 2026 }];
const STANDARD_FORMULA_EVIDENCE = [{ sourceId: uefFormulaEvidence.evidence[0].sourceId, location: uefFormulaEvidence.evidence[0].location, verification: 'verified' as const, effectiveYear: 2026 }];
const STANDARD_PRIORITY_EVIDENCE = [{ sourceId: uefPriorityEvidence.evidence[0].sourceId, location: uefPriorityEvidence.evidence[0].location, verification: 'verified' as const, effectiveYear: 2026 }];

export interface UefThptExamStandardEvaluationContext {
  subjectContext?: UefSubjectContext;
}

function standardPartial(input: { missingInputs: string[]; missingRequirements: MissingRequirement[]; explanation: CalculationStep[]; eligibilityReason: string }): AdmissionEvaluation {
  return {
    schoolId: 'uef',
    year: STANDARD_EXACT_METHOD.year,
    methodId: STANDARD_EXACT_METHOD.id,
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
 * Xét kết quả thi TN THPT 2026 (UEF, nhóm ngành ngoài Luật) — thang 30. Điểm học lực = tổng thô 3
 * môn tổ hợp (không hệ số, mục 2+5.b Thông tin tuyển sinh 2026); điểm ưu tiên theo mục 7 (UEF tự
 * công bố mức khu vực/đối tượng + công thức giảm điểm ưu tiên khi tổng ≥22,5/30). Điểm xét tuyển
 * cuối = học lực + ưu tiên, kẹp trần 30.
 */
export function evaluateUefThptExamStandardAdmission(profile: ApplicantProfile, context: UefThptExamStandardEvaluationContext = {}): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'uef-standard-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển UEF.' });
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
    missingRequirements.push(...missingSubjects.map((s) => ({ kind: 'profile-input' as const, code: `uef-standard-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]}.` })));
    return standardPartial({ missingInputs: ['Chưa đủ điểm 3 môn thi TN THPT theo tổ hợp.'], missingRequirements, explanation, eligibilityReason: 'Cần đủ điểm 3 môn để kiểm tra ngưỡng.' });
  }

  const raw30 = calculateUefThptRawScore({ subject1Score: scores[0], subject2Score: scores[1], subject3Score: scores[2] });
  const threshold = checkUefThptExamThreshold(raw30, 'standard');
  explanation.push({ id: 'uef-standard-eligibility-threshold', label: 'Ngưỡng đầu vào', output: raw30, scale: 30, formula: threshold.requiredText, evidence: STANDARD_THRESHOLD_EVIDENCE });
  explanation.push({ id: 'uef-standard-academic-score', label: 'Điểm học lực (tổng thô 3 môn)', output: raw30, scale: 30, formula: 'MT1 + MT2 + MT3', evidence: STANDARD_FORMULA_EVIDENCE });

  const standardPriority30 = lookupUefStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateUefPriority30({ academicScore30: raw30, standardPriority30 });
  explanation.push({
    id: 'uef-standard-priority',
    label: priority.reduced ? 'Điểm ưu tiên đã giảm' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 – Học lực)/7,5] × Mức ưu tiên' : 'Mức điểm ưu tiên quy đổi',
    evidence: STANDARD_PRIORITY_EVIDENCE,
  });

  const finalScore = calculateUefThptFinalScore({ raw30, priority30: priority.effectivePriority30 });
  explanation.push({ id: 'uef-standard-final', label: 'Điểm xét tuyển cuối cùng', output: finalScore, scale: 30 });

  return {
    schoolId: 'uef',
    year: STANDARD_EXACT_METHOD.year,
    methodId: STANDARD_EXACT_METHOD.id,
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
