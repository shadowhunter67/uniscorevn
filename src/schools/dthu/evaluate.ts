import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { checkDthuThptExamThreshold, type DthuProgramGroup } from './eligibility';
import { dthuAdmissionMethods } from './methods';
import { dthuKnowledgeGaps } from './knowledgeGaps';

export interface DthuSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface DthuThptExamEvaluationContext {
  group?: DthuProgramGroup;
  subjectContext?: DthuSubjectContext;
}

function sumThptTotal(profile: ApplicantProfile, subjects: readonly SubjectId[]): { total30?: number; missingSubjects: SubjectId[] } {
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

export function evaluateDthuThptExamAdmission(profile: ApplicantProfile, context: DthuThptExamEvaluationContext = {}): AdmissionEvaluation {
  const method = dthuAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const group: DthuProgramGroup = context.group ?? 'standard';
  const gapExtras = {
    missingRules: dthuKnowledgeGaps.map((gap) => gap.label),
    missingRequirements: dthuKnowledgeGaps.map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label })),
  };

  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'dthu-subject-combination', label: 'Chọn tổ hợp môn xét tuyển DTHU.' });
  } else {
    const { total30, missingSubjects } = sumThptTotal(profile, context.subjectContext.subjects);
    if (missingSubjects.length > 0) {
      missingInputs.push('Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.');
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `dthu-thpt-${subjectId}`,
          label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp DTHU.`,
        }))
      );
    }
    if (total30 !== undefined) {
      const result = checkDthuThptExamThreshold(total30, group);
      reasons.push(result.requiredText);
      explanation.push({
        id: 'dthu-thpt-exam-threshold',
        label: 'Ngưỡng đầu vào DTHU 2026 (thi TN THPT)',
        output: total30,
        scale: 30,
        formula: result.requiredText,
        evidence: [{ sourceId: 'dthu-quality-threshold-2026', location: 'Phụ lục I, Thông báo ngày 09/07/2026', verification: 'verified', effectiveYear: 2026 }],
      });
      status = result.pass ? 'eligible' : 'ineligible';
    }
  }

  return {
    schoolId: 'dthu',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons: reasons.length > 0 ? reasons : ['Cần chọn tổ hợp môn và nhập đủ điểm để kiểm tra ngưỡng DTHU.'] },
    missingInputs,
    missingRules: gapExtras.missingRules,
    missingRequirements: [...missingRequirements, ...gapExtras.missingRequirements],
    explanation,
    evidence: [{ sourceId: 'dthu-quality-threshold-2026', location: 'Phụ lục I, Thông báo ngày 09/07/2026', verification: 'verified', effectiveYear: 2026 }],
  };
}
