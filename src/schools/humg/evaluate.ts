import type { ApplicantProfile } from '../../core/applicantProfile';
import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import type { ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { humgAdmissionMethods } from './methods';
import { getHumgProgramThreshold, type HumgProgramId } from './thresholds';

export interface HumgThptExamEvaluationContext extends ThresholdOnlyEvaluationContext {
  programId?: HumgProgramId;
}

const evidenceSourceId = 'humg-admission-2026';

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

export function evaluateHumgThptExamAdmission(profile: ApplicantProfile, context: HumgThptExamEvaluationContext = {}): AdmissionEvaluation {
  const method = humgAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const missingRules = (method.knowledgeGaps ?? []).map((gap) => gap.label);
  const gapRequirements = (method.knowledgeGaps ?? []).map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label }));
  const reasons: string[] = [];
  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'humg-subject-combination', label: 'Chọn tổ hợp môn xét tuyển HUMG.' });
    reasons.push('Cần chọn tổ hợp môn để kiểm tra ngưỡng đầu vào HUMG.');
  } else {
    const { total30, missingSubjects } = sumThptTotal(profile, context.subjectContext.subjects);

    if (missingSubjects.length > 0) {
      missingInputs.push('Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn cho HUMG.');
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `humg-thpt-${subjectId}`,
          label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp HUMG.`,
        }))
      );
      reasons.push('Cần đủ điểm 3 môn trong tổ hợp để kiểm tra ngưỡng HUMG.');
    }

    if (total30 !== undefined) {
      if (!context.programId) {
        missingRequirements.push({ kind: 'school-context', code: 'humg-program', label: 'Chọn mã ngành HUMG (hiện chỉ hỗ trợ 7 mã ngành đã xác nhận).' });
        reasons.push(`Tổng ${total30}/30 đã tính được, nhưng HUMG công bố ngưỡng theo từng mã ngành nên cần chọn mã ngành để kết luận.`);
      } else {
        const threshold = getHumgProgramThreshold(context.programId);
        if (!threshold) {
          missingRequirements.push({
            kind: 'official-rule',
            code: 'humg-program-catalog-partially-imported',
            label: `Mã ngành ${context.programId} chưa có trong bảng ngưỡng HUMG đã xác nhận (mới nhập 7/~53 mã ngành).`,
          });
          reasons.push(`Mã ngành ${context.programId} chưa có trong bảng ngưỡng HUMG đã xác nhận.`);
        } else {
          explanation.push({
            id: 'humg-thpt-program-threshold',
            label: `Ngưỡng HUMG 2026 - ${threshold.programName} (${threshold.programId})`,
            output: total30,
            scale: 30,
            formula: `Tổng điểm 3 môn thi TN THPT phải đạt tối thiểu ${threshold.thptMin30}/30 cho ngành ${threshold.programName}.`,
            evidence: [{ sourceId: evidenceSourceId, location: 'Thông báo ngưỡng điểm xét tuyển đợt 1 hệ đại học 2026, mục 7106', verification: 'verified', effectiveYear: 2026 }],
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
    schoolId: 'humg',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons },
    missingInputs,
    missingRules,
    missingRequirements: [...missingRequirements, ...gapRequirements],
    explanation,
    evidence: [{ sourceId: evidenceSourceId, location: 'Thông báo ngưỡng điểm xét tuyển đợt 1 hệ đại học 2026, mục 7106', verification: 'verified', effectiveYear: 2026 }],
  } satisfies AdmissionEvaluation;
}
