import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { checkHauThptExamThreshold, type HauProgramGroup } from './eligibility';
import { hauAdmissionMethods } from './methods';
import { hauKnowledgeGaps } from './knowledgeGaps';

export interface HauSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface HauThptExamEvaluationContext {
  group?: HauProgramGroup;
  subjectContext?: HauSubjectContext;
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

export function evaluateHauThptExamAdmission(profile: ApplicantProfile, context: HauThptExamEvaluationContext = {}): AdmissionEvaluation {
  const method = hauAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const group: HauProgramGroup = context.group ?? 'infrastructureEngineering';
  const gapExtras = {
    missingRules: hauKnowledgeGaps.map((gap) => gap.label),
    missingRequirements: hauKnowledgeGaps.map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label })),
  };

  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'hau-subject-combination', label: 'Chọn tổ hợp môn xét tuyển HAU.' });
  } else {
    const { total30, missingSubjects } = sumThptTotal(profile, context.subjectContext.subjects);
    if (missingSubjects.length > 0) {
      missingInputs.push('Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.');
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `hau-thpt-${subjectId}`,
          label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp HAU.`,
        }))
      );
    }
    if (total30 !== undefined) {
      const result = checkHauThptExamThreshold(total30, group);
      reasons.push(result.requiredText);
      explanation.push({
        id: 'hau-thpt-exam-threshold',
        label: 'Ngưỡng đầu vào HAU 2026 (thi TN THPT)',
        output: total30,
        scale: 30,
        formula: result.requiredText,
        evidence: [{ sourceId: 'hau-quality-threshold-2026', location: 'Quyết định 406/QĐ-ĐHKT-ĐT, Phụ lục', verification: 'verified', effectiveYear: 2026 }],
      });
      status = result.pass ? 'eligible' : 'ineligible';
    }
  }

  return {
    schoolId: 'hau',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons: reasons.length > 0 ? reasons : ['Cần chọn tổ hợp môn và nhập đủ điểm để kiểm tra ngưỡng HAU.'] },
    missingInputs,
    missingRules: gapExtras.missingRules,
    missingRequirements: [...missingRequirements, ...gapExtras.missingRequirements],
    explanation,
    evidence: [{ sourceId: 'hau-quality-threshold-2026', location: 'Quyết định 406/QĐ-ĐHKT-ĐT, Phụ lục', verification: 'verified', effectiveYear: 2026 }],
  };
}
