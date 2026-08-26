import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { checkLtvuniThptExamThreshold, type LtvuniProgramGroup } from './eligibility';
import { ltvuniAdmissionMethods } from './methods';
import { ltvuniKnowledgeGaps } from './knowledgeGaps';

export interface LtvuniSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface LtvuniThptExamEvaluationContext {
  group?: LtvuniProgramGroup;
  subjectContext?: LtvuniSubjectContext;
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

export function evaluateLtvuniThptExamAdmission(profile: ApplicantProfile, context: LtvuniThptExamEvaluationContext = {}): AdmissionEvaluation {
  const method = ltvuniAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const group: LtvuniProgramGroup = context.group ?? 'standard';
  const gapExtras = {
    missingRules: ltvuniKnowledgeGaps.map((gap) => gap.label),
    missingRequirements: ltvuniKnowledgeGaps.map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label })),
  };

  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'ltvuni-subject-combination', label: 'Chọn tổ hợp môn xét tuyển LTVUni.' });
  } else {
    const { total30, missingSubjects } = sumThptTotal(profile, context.subjectContext.subjects);
    if (missingSubjects.length > 0) {
      missingInputs.push('Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.');
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `ltvuni-thpt-${subjectId}`,
          label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp LTVUni.`,
        }))
      );
    }
    if (total30 !== undefined) {
      const result = checkLtvuniThptExamThreshold(total30, group);
      reasons.push(result.requiredText);
      explanation.push({
        id: 'ltvuni-thpt-exam-threshold',
        label: 'Ngưỡng đầu vào LTVUni 2026 (thi TN THPT)',
        output: total30,
        scale: 30,
        formula: result.requiredText,
        evidence: [{ sourceId: 'ltvuni-quality-threshold-2026', location: 'Thông báo 269/TB-ĐHLTV', verification: 'verified', effectiveYear: 2026 }],
      });
      status = result.pass ? 'eligible' : 'ineligible';
    }
  }

  return {
    schoolId: 'ltvuni',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons: reasons.length > 0 ? reasons : ['Cần chọn tổ hợp môn và nhập đủ điểm để kiểm tra ngưỡng LTVUni.'] },
    missingInputs,
    missingRules: gapExtras.missingRules,
    missingRequirements: [...missingRequirements, ...gapExtras.missingRequirements],
    explanation,
    evidence: [{ sourceId: 'ltvuni-quality-threshold-2026', location: 'Thông báo 269/TB-ĐHLTV', verification: 'verified', effectiveYear: 2026 }],
  };
}
