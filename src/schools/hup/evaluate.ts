import type { ApplicantProfile } from '../../core/applicantProfile';
import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import type { ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { hupAdmissionMethods } from './methods';
import { getHupProgramThreshold, type HupProgramId } from './thresholds';

export interface HupThptExamEvaluationContext extends ThresholdOnlyEvaluationContext {
  programId?: HupProgramId;
}

const evidenceSourceId = 'hup-threshold-notice-2026';

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

export function evaluateHupThptExamAdmission(profile: ApplicantProfile, context: HupThptExamEvaluationContext = {}): AdmissionEvaluation {
  const method = hupAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const missingRules = (method.knowledgeGaps ?? []).map((gap) => gap.label);
  const gapRequirements = (method.knowledgeGaps ?? []).map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label }));
  const reasons: string[] = [];
  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'hup-subject-combination', label: 'Chọn tổ hợp môn xét tuyển HUP.' });
    reasons.push('Cần chọn tổ hợp môn để kiểm tra ngưỡng đầu vào HUP (PT4).');
  } else {
    const { total30, missingSubjects } = sumThptTotal(profile, context.subjectContext.subjects);

    if (missingSubjects.length > 0) {
      missingInputs.push('Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn cho HUP.');
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `hup-thpt-${subjectId}`,
          label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp HUP.`,
        }))
      );
      reasons.push('Cần đủ điểm 3 môn trong tổ hợp để kiểm tra ngưỡng HUP.');
    }

    if (total30 !== undefined) {
      if (!context.programId) {
        missingRequirements.push({ kind: 'school-context', code: 'hup-program', label: 'Chọn ngành HUP (Dược học, Hoá dược, Hoá học, Công nghệ sinh học).' });
        reasons.push(`Tổng ${total30}/30 đã tính được, nhưng HUP công bố ngưỡng PT4 theo từng ngành nên cần chọn ngành để kết luận.`);
      } else {
        const threshold = getHupProgramThreshold(context.programId);
        if (!threshold) {
          missingRequirements.push({
            kind: 'official-rule',
            code: 'hup-program-not-found',
            label: `Ngành ${context.programId} không có trong bảng ngưỡng PT4 HUP đã xác nhận.`,
          });
          reasons.push(`Ngành ${context.programId} không có trong bảng ngưỡng PT4 HUP đã xác nhận.`);
        } else {
          explanation.push({
            id: 'hup-thpt-program-threshold',
            label: `Ngưỡng PT4 HUP 2026 - ${threshold.programName} (${threshold.programId})`,
            output: total30,
            scale: 30,
            formula: `Tổng điểm 3 môn thi TN THPT phải đạt tối thiểu ${threshold.thptMin30}/30 cho ngành ${threshold.programName} (khu vực 3, không cộng điểm).`,
            evidence: [{ sourceId: evidenceSourceId, location: 'Thông báo Ngưỡng đầu vào và quy đổi tương đương điểm trúng tuyển 2026, mục PT4', verification: 'verified', effectiveYear: 2026 }],
          });

          if (total30 < threshold.thptMin30) {
            status = 'ineligible';
            reasons.push(`Tổng ${total30}/30 thấp hơn ngưỡng ngành ${threshold.programName} đã công bố (${threshold.thptMin30}/30).`);
          } else {
            status = 'eligible';
            reasons.push(`Tổng ${total30}/30 đạt ngưỡng ngành ${threshold.programName} đã công bố (${threshold.thptMin30}/30).`);
          }
        }
      }
    }
  }

  return {
    schoolId: 'hup',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons },
    missingInputs,
    missingRules,
    missingRequirements: [...missingRequirements, ...gapRequirements],
    explanation,
    evidence: [{ sourceId: evidenceSourceId, location: 'Thông báo Ngưỡng đầu vào và quy đổi tương đương điểm trúng tuyển 2026, mục PT4', verification: 'verified', effectiveYear: 2026 }],
  } satisfies AdmissionEvaluation;
}
