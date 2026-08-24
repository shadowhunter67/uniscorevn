import type { ApplicantProfile } from '../../core/applicantProfile';
import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import type { ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { hduAdmissionMethods } from './methods';
import { getHduProgramGroupThreshold, type HduProgramGroupId } from './thresholds';

export interface HduThptExamEvaluationContext extends ThresholdOnlyEvaluationContext {
  programGroupId?: HduProgramGroupId;
}

const evidenceSourceId = 'hdu-admission-2026';

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

export function evaluateHduThptExamAdmission(profile: ApplicantProfile, context: HduThptExamEvaluationContext = {}): AdmissionEvaluation {
  const method = hduAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const missingRules = (method.knowledgeGaps ?? []).map((gap) => gap.label);
  const gapRequirements = (method.knowledgeGaps ?? []).map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label }));
  const reasons: string[] = [];
  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'hdu-subject-combination', label: 'Chọn tổ hợp môn xét tuyển HDU.' });
    reasons.push('Cần chọn tổ hợp môn để kiểm tra ngưỡng đầu vào HDU.');
  } else if (!context.programGroupId) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'hdu-program-group',
      label: 'Chọn ngành Luật/Luật Kinh tế HDU (ngành khác chưa công bố ngưỡng cụ thể).',
    });
    reasons.push('HDU 2026 mới công bố ngưỡng cụ thể cho ngành Luật/Luật Kinh tế; các ngành khác chưa có ngưỡng để kiểm tra.');
  } else {
    const threshold = getHduProgramGroupThreshold(context.programGroupId);
    const { total30, missingSubjects } = sumThptTotal(profile, context.subjectContext.subjects);

    if (missingSubjects.length > 0) {
      missingInputs.push('Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn cho HDU.');
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `hdu-thpt-${subjectId}`,
          label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp HDU.`,
        }))
      );
      reasons.push('Cần đủ điểm 3 môn trong tổ hợp để kiểm tra ngưỡng HDU.');
    }

    if (!threshold) {
      missingRequirements.push({ kind: 'school-context', code: 'hdu-program-group', label: 'Chọn nhóm ngành hợp lệ (hiện chỉ hỗ trợ Luật/Luật Kinh tế).' });
      reasons.push(`Nhóm ngành ${context.programGroupId} chưa có trong bảng ngưỡng HDU đã nhập.`);
    } else if (total30 !== undefined) {
      const literatureScore = profile.thpt?.scores?.literature;

      explanation.push({
        id: 'hdu-thpt-group-threshold',
        label: `Ngưỡng HDU 2026 - ${threshold.groupName}`,
        output: total30,
        scale: 30,
        formula: threshold.requiredText,
        evidence: [{ sourceId: evidenceSourceId, location: 'Ngưỡng ngành Luật/Luật Kinh tế, thông tin tuyển sinh 2026', verification: 'verified', effectiveYear: 2026 }],
      });

      if (threshold.literatureMin !== undefined && literatureScore === undefined) {
        missingInputs.push('Chưa có điểm môn Ngữ văn để kiểm tra điều kiện phụ của ngành Luật/Luật Kinh tế HDU.');
        missingRequirements.push({ kind: 'profile-input', code: 'hdu-thpt-literature', label: 'Điểm thi TN THPT môn Ngữ văn (điều kiện phụ ngành Luật/Luật Kinh tế HDU).' });
      } else if (total30 < threshold.thptMin30) {
        status = 'ineligible';
        reasons.push(`Tổng ${total30}/30 thấp hơn ngưỡng ${threshold.groupName} đã công bố (${threshold.thptMin30}/30).`);
      } else if (threshold.literatureMin !== undefined && (literatureScore as number) < threshold.literatureMin) {
        status = 'ineligible';
        reasons.push(`Tổng ${total30}/30 đạt ngưỡng chung, nhưng điểm Ngữ văn ${literatureScore}/10 dưới điều kiện phụ (>= ${threshold.literatureMin}/10) của ${threshold.groupName}.`);
      } else {
        status = 'eligible';
        reasons.push(`Tổng ${total30}/30 và điểm Ngữ văn đạt ngưỡng đã công bố cho ${threshold.groupName}: ${threshold.requiredText}`);
      }
    }
  }

  return {
    schoolId: 'hdu',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons },
    missingInputs,
    missingRules,
    missingRequirements: [...missingRequirements, ...gapRequirements],
    explanation,
    evidence: [{ sourceId: evidenceSourceId, location: 'Ngưỡng ngành Luật/Luật Kinh tế, thông tin tuyển sinh 2026', verification: 'verified', effectiveYear: 2026 }],
  } satisfies AdmissionEvaluation;
}
