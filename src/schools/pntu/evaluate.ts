import type { ApplicantProfile } from '../../core/applicantProfile';
import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import type { ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { pntuAdmissionMethods } from './methods';
import { getPntuProgramThreshold, type PntuProgramId } from './thresholds';

export interface PntuThptExamEvaluationContext extends ThresholdOnlyEvaluationContext {
  programId?: PntuProgramId;
}

const evidenceSourceId = 'pntu-threshold-notice-2026';

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

export function evaluatePntuThptExamAdmission(profile: ApplicantProfile, context: PntuThptExamEvaluationContext = {}): AdmissionEvaluation {
  const method = pntuAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const missingRules = (method.knowledgeGaps ?? []).map((gap) => gap.label);
  const gapRequirements = (method.knowledgeGaps ?? []).map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label }));
  const reasons: string[] = [];
  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'pntu-subject-combination', label: 'Chọn tổ hợp môn xét tuyển PNTU.' });
    reasons.push('Cần chọn tổ hợp môn để kiểm tra ngưỡng đầu vào PNTU (mã phương thức 100).');
  } else {
    const { total30, missingSubjects } = sumThptTotal(profile, context.subjectContext.subjects);

    if (missingSubjects.length > 0) {
      missingInputs.push('Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn cho PNTU.');
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `pntu-thpt-${subjectId}`,
          label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp PNTU.`,
        }))
      );
      reasons.push('Cần đủ điểm 3 môn trong tổ hợp để kiểm tra ngưỡng PNTU.');
    }

    if (total30 !== undefined) {
      if (!context.programId) {
        missingRequirements.push({
          kind: 'school-context',
          code: 'pntu-program',
          label: 'Chọn ngành PNTU (hiện chỉ hỗ trợ Y khoa, Răng - Hàm - Mặt, Tâm lý học đã xác nhận).',
        });
        reasons.push(`Tổng ${total30}/30 đã tính được, nhưng PNTU công bố ngưỡng theo từng ngành nên cần chọn ngành để kết luận.`);
      } else {
        const threshold = getPntuProgramThreshold(context.programId);
        if (!threshold) {
          missingRequirements.push({
            kind: 'official-rule',
            code: 'pntu-program-catalog-partially-imported',
            label: `Ngành ${context.programId} chưa có trong bảng ngưỡng PNTU đã xác nhận (mới nhập 3 ngành).`,
          });
          reasons.push(`Ngành ${context.programId} chưa có trong bảng ngưỡng PNTU đã xác nhận.`);
        } else {
          explanation.push({
            id: 'pntu-thpt-program-threshold',
            label: `Ngưỡng PNTU 2026 - ${threshold.programName} (${threshold.programId})`,
            output: total30,
            scale: 30,
            formula: `Tổng điểm 3 môn thi TN THPT phải đạt tối thiểu ${threshold.thptMin30}/30 cho ngành ${threshold.programName} (khu vực 3, không nhân hệ số).`,
            evidence: [{ sourceId: evidenceSourceId, location: 'Thông báo ngưỡng đảm bảo chất lượng đầu vào 2026', verification: 'official-source-available', effectiveYear: 2026 }],
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
    schoolId: 'pntu',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons },
    missingInputs,
    missingRules,
    missingRequirements: [...missingRequirements, ...gapRequirements],
    explanation,
    evidence: [{ sourceId: evidenceSourceId, location: 'Thông báo ngưỡng đảm bảo chất lượng đầu vào 2026', verification: 'official-source-available', effectiveYear: 2026 }],
  } satisfies AdmissionEvaluation;
}
