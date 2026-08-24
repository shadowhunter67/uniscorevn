import type { ApplicantProfile } from '../../core/applicantProfile';
import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import type { ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { ajcAdmissionMethods } from './methods';
import { getAjcProgramGroupThreshold, type AjcProgramGroupId } from './thresholds';

export interface AjcThptExamEvaluationContext extends ThresholdOnlyEvaluationContext {
  programGroupId?: AjcProgramGroupId;
}

const evidenceSourceId = 'ajc-threshold-notice-2026';

function readSubjectScores(profile: ApplicantProfile, subjects: readonly SubjectId[]): { scores: Partial<Record<SubjectId, number>>; missingSubjects: SubjectId[] } {
  const scores: Partial<Record<SubjectId, number>> = {};
  const missingSubjects: SubjectId[] = [];
  for (const subjectId of subjects) {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) missingSubjects.push(subjectId);
    else scores[subjectId] = score;
  }
  return { scores, missingSubjects };
}

export function evaluateAjcThptExamAdmission(profile: ApplicantProfile, context: AjcThptExamEvaluationContext = {}): AdmissionEvaluation {
  const method = ajcAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const missingRules = (method.knowledgeGaps ?? []).map((gap) => gap.label);
  const gapRequirements = (method.knowledgeGaps ?? []).map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label }));
  const reasons: string[] = [];
  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'ajc-subject-combination', label: 'Chọn tổ hợp môn xét tuyển AJC.' });
    reasons.push('Cần chọn tổ hợp môn để kiểm tra ngưỡng đầu vào AJC.');
  } else if (!context.programGroupId) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'ajc-program-group',
      label: 'Chọn nhóm ngành AJC (Báo chí - Xuất bản, hoặc Lý luận/Lịch sử/Truyền thông/Quảng cáo/Quan hệ quốc tế).',
    });
    reasons.push('Cần chọn nhóm ngành để áp đúng ngưỡng (thang điểm khác nhau giữa 2 nhóm).');
  } else {
    const threshold = getAjcProgramGroupThreshold(context.programGroupId);
    if (!threshold) {
      missingRequirements.push({ kind: 'official-rule', code: 'ajc-program-group-not-found', label: `Nhóm ngành ${context.programGroupId} không có trong bảng ngưỡng AJC đã xác nhận.` });
      reasons.push(`Nhóm ngành ${context.programGroupId} không có trong bảng ngưỡng AJC đã xác nhận.`);
    } else {
      const { scores, missingSubjects } = readSubjectScores(profile, context.subjectContext.subjects);

      if (threshold.scale === 40 && !context.subjectContext.subjects.includes('literature')) {
        missingRequirements.push({
          kind: 'school-context',
          code: 'ajc-baochi-requires-literature',
          label: 'Nhóm Báo chí - Xuất bản yêu cầu tổ hợp có môn Ngữ văn (nhân hệ số 2).',
        });
        reasons.push('Nhóm Báo chí - Xuất bản chỉ áp dụng cho tổ hợp có môn Ngữ văn (Văn nhân hệ số 2, thang 40).');
      } else if (missingSubjects.length > 0) {
        missingInputs.push('Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn cho AJC.');
        missingRequirements.push(
          ...missingSubjects.map((subjectId) => ({
            kind: 'profile-input' as const,
            code: `ajc-thpt-${subjectId}`,
            label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp AJC.`,
          }))
        );
        reasons.push('Cần đủ điểm 3 môn trong tổ hợp để kiểm tra ngưỡng AJC.');
      } else {
        const rawSum = context.subjectContext.subjects.reduce((sum, subjectId) => sum + (scores[subjectId] ?? 0), 0);
        const literatureBonus = threshold.scale === 40 ? (scores.literature ?? 0) : 0;
        const total = Math.round((rawSum + literatureBonus) * 100) / 100;

        explanation.push({
          id: 'ajc-thpt-group-threshold',
          label: `Ngưỡng AJC 2026 - ${threshold.groupName}`,
          output: total,
          scale: threshold.scale,
          formula:
            threshold.scale === 40
              ? `Tổng điểm 3 môn (Ngữ văn nhân hệ số 2) phải đạt tối thiểu ${threshold.minScore}/40 cho ${threshold.groupName}.`
              : `Tổng điểm 3 môn thi TN THPT phải đạt tối thiểu ${threshold.minScore}/30 cho ${threshold.groupName}.`,
          evidence: [{ sourceId: evidenceSourceId, location: 'Thông báo 293/TB-HVBCTT-ĐT ngày 10/07/2026', verification: 'official-source-available', effectiveYear: 2026 }],
        });

        if (total < threshold.minScore) {
          status = 'ineligible';
          reasons.push(`Tổng ${total}/${threshold.scale} thấp hơn ngưỡng ${threshold.groupName} đã công bố (${threshold.minScore}/${threshold.scale}).`);
        } else {
          status = 'eligible';
          reasons.push(`Tổng ${total}/${threshold.scale} đạt ngưỡng ${threshold.groupName} đã công bố (${threshold.minScore}/${threshold.scale}).`);
        }
      }
    }
  }

  return {
    schoolId: 'ajc',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons },
    missingInputs,
    missingRules,
    missingRequirements: [...missingRequirements, ...gapRequirements],
    explanation,
    evidence: [{ sourceId: evidenceSourceId, location: 'Thông báo 293/TB-HVBCTT-ĐT ngày 10/07/2026', verification: 'official-source-available', effectiveYear: 2026 }],
  } satisfies AdmissionEvaluation;
}
