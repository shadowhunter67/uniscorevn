import type { ApplicantProfile } from '../../core/applicantProfile';
import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import type { ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { vmuAdmissionMethods } from './methods';
import { getVmuProgramGroupThreshold, type VmuProgramGroupId } from './thresholds';

export interface VmuThptExamEvaluationContext extends ThresholdOnlyEvaluationContext {
  programGroupId?: VmuProgramGroupId;
}

const evidenceSourceId = 'vmu-admission-2026';

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

export function evaluateVmuThptExamAdmission(profile: ApplicantProfile, context: VmuThptExamEvaluationContext = {}): AdmissionEvaluation {
  const method = vmuAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const missingRules = (method.knowledgeGaps ?? []).map((gap) => gap.label);
  const gapRequirements = (method.knowledgeGaps ?? []).map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label }));
  const reasons: string[] = [];
  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'vmu-subject-combination', label: 'Chọn tổ hợp môn xét tuyển VMU.' });
    reasons.push('Cần chọn tổ hợp môn để kiểm tra ngưỡng đầu vào VMU.');
  } else {
    const { total30, missingSubjects } = sumThptTotal(profile, context.subjectContext.subjects);

    if (missingSubjects.length > 0) {
      missingInputs.push('Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn cho VMU.');
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `vmu-thpt-${subjectId}`,
          label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp VMU.`,
        }))
      );
      reasons.push('Cần đủ điểm 3 môn trong tổ hợp để kiểm tra ngưỡng VMU.');
    }

    if (total30 !== undefined) {
      if (!context.programGroupId) {
        missingRequirements.push({ kind: 'school-context', code: 'vmu-program-group', label: 'Chọn khối ngành VMU (Kỹ thuật/Công nghệ, Kinh tế/Ngôn ngữ, hoặc Luật).' });
        reasons.push(`Tổng ${total30}/30 đã tính được, nhưng VMU chia ngưỡng theo khối ngành nên cần chọn khối ngành để kết luận.`);
      } else {
        const threshold = getVmuProgramGroupThreshold(context.programGroupId);
        if (!threshold) {
          missingRequirements.push({ kind: 'school-context', code: 'vmu-program-group', label: 'Chọn khối ngành hợp lệ của VMU.' });
          reasons.push(`Khối ngành ${context.programGroupId} chưa có trong bảng ngưỡng VMU đã nhập.`);
        } else {
          explanation.push({
            id: 'vmu-thpt-group-threshold',
            label: `Ngưỡng VMU 2026 - ${threshold.groupName}`,
            output: total30,
            scale: 30,
            formula: `Tổng điểm tổ hợp D01 (hoặc quy đổi tương đương) phải đạt tối thiểu ${threshold.thptMin30}/30 cho ${threshold.groupName}.`,
            evidence: [{ sourceId: evidenceSourceId, location: 'Ngưỡng đảm bảo chất lượng đầu vào PT1 2026 theo khối ngành', verification: 'verified', effectiveYear: 2026 }],
          });

          if (total30 < threshold.thptMin30) {
            status = 'ineligible';
            reasons.push(`Tổng ${total30}/30 thấp hơn ngưỡng ${threshold.groupName} đã công bố (${threshold.thptMin30}/30).`);
          } else {
            status = 'eligible';
            reasons.push(`Tổng ${total30}/30 đạt ngưỡng ${threshold.groupName} đã công bố (${threshold.thptMin30}/30).`);
          }
        }
      }
    }
  }

  return {
    schoolId: 'vmu',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons },
    missingInputs,
    missingRules,
    missingRequirements: [...missingRequirements, ...gapRequirements],
    explanation,
    evidence: [{ sourceId: evidenceSourceId, location: 'Ngưỡng đảm bảo chất lượng đầu vào PT1 2026 theo khối ngành', verification: 'verified', effectiveYear: 2026 }],
  } satisfies AdmissionEvaluation;
}
