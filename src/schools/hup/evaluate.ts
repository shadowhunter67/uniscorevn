import type { ApplicantProfile } from '../../core/applicantProfile';
import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import type { ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { hupAdmissionMethods } from './methods';
import { getHupProgramThreshold, type HupProgramId } from './thresholds';
import { calculateHupAcademicScore30, calculateHupFinalScore30 } from './calculator';
import { calculateHupCertificateBonus30, calculateHupBonus30 } from './bonus';
import { calculateHupEffectivePriority30, lookupHupStandardPriority30 } from './priority';
import { hupFormulaEvidence, hupBonusEvidence, hupPriorityEvidence, hupThptExamThresholdEvidence } from './evidence';

export interface HupThptExamEvaluationContext extends ThresholdOnlyEvaluationContext {
  programId?: HupProgramId;
}

const evidenceSourceId = 'hup-threshold-notice-2026';

const EXACT_METHOD = hupAdmissionMethods[1];

export interface HupExactEvaluationContext extends ThresholdOnlyEvaluationContext {
  programId?: HupProgramId;
  /** Giải HSG cấp tỉnh/quốc gia — không có field trong hồ sơ dùng chung; khai giá trị => ngoài
   * phạm vi exact (giữ partial). */
  hsgPrize?: 'provincial-third' | 'provincial-second' | 'provincial-first' | 'national-encouragement';
}

function hupExactPartial(input: { missingInputs: string[]; missingRequirements: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'hup',
    year: EXACT_METHOD.year,
    methodId: EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [input.reason] },
    missingInputs: input.missingInputs,
    missingRules: [],
    missingRequirements: input.missingRequirements,
    explanation: [],
    evidence: [],
  };
}

/**
 * HUP 2026 — Phương thức 4 (xét thi TN THPT), tính đủ Điểm xét tuyển:
 *   ĐXT = round2(min(30, [M1 + M2 + M3] + ĐKK + ĐƯT))
 * Ngưỡng đảm bảo chất lượng đầu vào so với tổng thô 3 môn (không cộng ưu tiên — đúng điều kiện
 * đặc biệt ngành Dược học, và an toàn cho các ngành còn lại).
 */
export function evaluateHupThptExamExactAdmission(profile: ApplicantProfile, context: HupExactEvaluationContext = {}): AdmissionEvaluation {
  const missingRequirements: MissingRequirement[] = [];

  const threshold = getHupProgramThreshold(context.programId);
  if (!threshold) {
    missingRequirements.push({ kind: 'school-context', code: 'hup-program', label: 'Chọn ngành HUP (Dược học, Hoá dược, Hoá học, Công nghệ sinh học).' });
    return hupExactPartial({ missingInputs: ['Chọn ngành HUP.'], missingRequirements, reason: 'Cần chọn ngành để xác định ngưỡng PT4.' });
  }

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'hup-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển HUP.' });
    return hupExactPartial({ missingInputs: ['Chọn tổ hợp 3 môn.'], missingRequirements, reason: 'Cần chọn tổ hợp để tính điểm.' });
  }

  if (context.hsgPrize) {
    missingRequirements.push({ kind: 'official-rule', code: 'hup-hsg-prize-out-of-scope', label: 'Thí sinh có giải HSG cấp tỉnh/quốc gia — ngoài phạm vi tính exact (chỉ mô hình hoá điểm cộng IELTS).' });
    return hupExactPartial({ missingInputs: [], missingRequirements, reason: 'Thí sinh khai giải HSG — UniscoreVN chỉ mô hình hoá điểm cộng IELTS.' });
  }

  const { subjects } = context.subjectContext;
  const scores: number[] = [];
  const missingSubjects: SubjectId[] = [];
  for (const subjectId of subjects) {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) missingSubjects.push(subjectId);
    else scores.push(score);
  }
  if (missingSubjects.length > 0) {
    missingRequirements.push(...missingSubjects.map((s) => ({ kind: 'profile-input' as const, code: `hup-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp HUP.` })));
    return hupExactPartial({ missingInputs: ['Chưa đủ điểm 3 môn thi TN THPT theo tổ hợp HUP.'], missingRequirements, reason: 'Cần đủ điểm 3 môn để tính điểm xét tuyển.' });
  }

  const academicScore30 = calculateHupAcademicScore30(scores);
  const eligibilityStatus: 'eligible' | 'ineligible' = academicScore30 >= threshold.thptMin30 ? 'eligible' : 'ineligible';
  const eligibilityReason = `Tổng 3 môn ${academicScore30}/30 ${eligibilityStatus === 'eligible' ? 'đạt' : 'dưới'} ngưỡng PT4 ${threshold.thptMin30}/30 của ngành ${threshold.programName} (khu vực 3, không cộng điểm). Điểm chuẩn trúng tuyển có thể cao hơn.`;

  const certificateBonus30 = calculateHupCertificateBonus30(profile.certificates);
  const bonus30 = calculateHupBonus30({ certificateBonus30 });
  const standardPriority30 = lookupHupStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateHupEffectivePriority30({ academicPlusBonus30: academicScore30 + bonus30, standardPriority30 });
  const finalScore = calculateHupFinalScore30({ academicScore30, bonus30, effectivePriority30: priority.effectivePriority30 });

  const explanation: CalculationStep[] = [
    { id: 'hup-academic-score', label: 'Điểm học lực (tổng 3 môn)', output: academicScore30, scale: 30, formula: 'M1 + M2 + M3', evidence: hupFormulaEvidence.evidence },
    { id: 'hup-eligibility-threshold', label: `Ngưỡng PT4 - ${threshold.programName}`, output: academicScore30, scale: 30, formula: eligibilityReason, evidence: hupThptExamThresholdEvidence.evidence },
  ];
  if (bonus30 > 0) explanation.push({ id: 'hup-bonus', label: 'Điểm cộng khuyến khích (IELTS)', output: bonus30, scale: 30, formula: 'Bảng ĐKK — IELTS 5.5-8.0+, trần 3,0', evidence: hupBonusEvidence.evidence });
  explanation.push({
    id: 'hup-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − (ĐHL + ĐKK))/7,5] × Mức ưu tiên' : 'Mức điểm ưu tiên KV/ĐT theo quy chế hiện hành',
    evidence: hupPriorityEvidence.evidence,
  });
  explanation.push({ id: 'hup-final', label: 'Điểm xét tuyển (ĐXT)', output: finalScore, scale: 30, formula: 'min(30, ĐHL + ĐKK + ĐƯT)', evidence: hupFormulaEvidence.evidence });

  return {
    schoolId: 'hup',
    year: EXACT_METHOD.year,
    methodId: EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligibilityStatus, reasons: [eligibilityReason] },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...hupFormulaEvidence.evidence, ...hupBonusEvidence.evidence, ...hupPriorityEvidence.evidence, ...hupThptExamThresholdEvidence.evidence],
  };
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
