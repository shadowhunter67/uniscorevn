import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { checkUshThreshold, USH_SUBJECT_PAIRS } from './eligibility';
import { ushAdmissionMethods } from './methods';
import { ushKnowledgeGaps } from './knowledgeGaps';

export interface UshEvaluationContext {
  pairId?: string;
  talentScore10?: number;
}

export function evaluateUshAdmission(profile: ApplicantProfile, context: UshEvaluationContext = {}): AdmissionEvaluation {
  const method = ushAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const gapExtras = {
    missingRules: ushKnowledgeGaps.map((gap) => gap.label),
    missingRequirements: ushKnowledgeGaps.map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label })),
  };

  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];

  const pair = USH_SUBJECT_PAIRS.find((candidate) => candidate.id === context.pairId);
  if (!pair) {
    missingRequirements.push({ kind: 'school-context', code: 'ush-subject-pair', label: 'Chọn tổ hợp môn xét tuyển USH (T00/T01/T04/T06).' });
  }
  if (context.talentScore10 === undefined) {
    missingRequirements.push({ kind: 'school-context', code: 'ush-talent-score', label: 'Nhập điểm thi năng khiếu TDTT (thang 10) USH.' });
  }

  if (pair) {
    const [subjectA, subjectB] = pair.subjects;
    const scoreA = profile.thpt?.scores?.[subjectA];
    const scoreB = profile.thpt?.scores?.[subjectB];
    const missingSubjects: SubjectId[] = [];
    if (scoreA === undefined) missingSubjects.push(subjectA);
    if (scoreB === undefined) missingSubjects.push(subjectB);
    if (missingSubjects.length > 0) {
      missingInputs.push('Chưa đủ điểm 2 môn văn hóa trong tổ hợp đã chọn.');
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `ush-thpt-${subjectId}`,
          label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp USH.`,
        }))
      );
    }

    if (scoreA !== undefined && scoreB !== undefined && context.talentScore10 !== undefined) {
      const culturalTotal = Math.round((scoreA + scoreB) * 100) / 100;
      const result = checkUshThreshold(culturalTotal, context.talentScore10);
      reasons.push(result.requiredText);
      explanation.push({
        id: 'ush-total-threshold',
        label: 'Ngưỡng đầu vào USH 2026 (thi TN THPT + năng khiếu TDTT)',
        output: culturalTotal + context.talentScore10,
        scale: 30,
        formula: result.requiredText,
        evidence: [{ sourceId: 'ush-admission-notice-2026', location: 'Thông báo 10/TB-TDTTHCM, mục 7.2', verification: 'verified', effectiveYear: 2026 }],
      });
      status = result.pass ? 'eligible' : 'ineligible';
    }
  }

  return {
    schoolId: 'ush',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons: reasons.length > 0 ? reasons : ['Cần chọn tổ hợp môn, nhập điểm 2 môn văn hóa và điểm năng khiếu TDTT để kiểm tra ngưỡng USH.'] },
    missingInputs,
    missingRules: gapExtras.missingRules,
    missingRequirements: [...missingRequirements, ...gapExtras.missingRequirements],
    explanation,
    evidence: [{ sourceId: 'ush-admission-notice-2026', location: 'Thông báo 10/TB-TDTTHCM, mục 7.2', verification: 'verified', effectiveYear: 2026 }],
  };
}
