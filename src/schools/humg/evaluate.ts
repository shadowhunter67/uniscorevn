import type { ApplicantProfile } from '../../core/applicantProfile';
import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import type { ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { humgAdmissionMethods } from './methods';
import { getHumgProgramThreshold } from './thresholds';
import { calculateHumgAcademicRaw30, calculateHumgFinalScore30 } from './calculator';
import { calculateHumgPriority30, lookupHumgStandardPriority30 } from './priority';
import { humgProgramThresholdEvidence, humgFormulaEvidence, humgPriorityEvidence } from './evidence';

export interface HumgThptExamEvaluationContext extends ThresholdOnlyEvaluationContext {
  programId?: string;
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
        missingRequirements.push({ kind: 'school-context', code: 'humg-program', label: 'Chọn mã xét tuyển HUMG để xác định ngưỡng.' });
        reasons.push(`Tổng ${total30}/30 đã tính được, nhưng HUMG công bố ngưỡng theo từng mã xét tuyển nên cần chọn mã ngành để kết luận.`);
      } else {
        const threshold = getHumgProgramThreshold(context.programId);
        if (!threshold) {
          missingRequirements.push({
            kind: 'official-rule',
            code: 'humg-program-not-found',
            label: `Mã xét tuyển ${context.programId} không có trong bảng ngưỡng HUMG 2026 đã xác nhận.`,
          });
          reasons.push(`Mã xét tuyển ${context.programId} không có trong bảng ngưỡng HUMG 2026.`);
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

const EXACT_METHOD = humgAdmissionMethods[1];

export interface HumgExactSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface HumgExactEvaluationContext {
  subjectContext?: HumgExactSubjectContext;
  /** Mã xét tuyển HUMG khớp `thresholds.ts` — bắt buộc để xác định ngưỡng. */
  programId?: string;
  /** Điểm cộng đã tính sẵn (mục 3, QĐ 674/QĐ-MĐC, tối đa 3,0/30). */
  bonus30?: number;
}

function exactPartial(input: { missingInputs: string[]; missingRequirements: MissingRequirement[]; explanation: CalculationStep[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'humg',
    year: EXACT_METHOD.year,
    methodId: EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [input.reason] },
    missingInputs: input.missingInputs,
    missingRules: [],
    missingRequirements: input.missingRequirements,
    explanation: input.explanation,
    evidence: [],
  };
}

/**
 * HUMG 2026 — phương thức xét kết quả thi TN THPT, tính đủ Điểm Xét (thang 30):
 *   Điểm Xét = round2(min(30, (M1 + M2 + M3) + Điểm cộng) + Điểm ưu tiên)
 * Ngưỡng theo mã xét tuyển so với tổng thô 3 môn.
 */
export function evaluateHumgThptExamExactAdmission(profile: ApplicantProfile, context: HumgExactEvaluationContext = {}): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const threshold = getHumgProgramThreshold(context.programId);
  if (!threshold) {
    missingRequirements.push({ kind: 'school-context', code: 'humg-program', label: 'Chọn mã xét tuyển HUMG để xác định ngưỡng (15-21 trên thang 30 tùy ngành).' });
    return exactPartial({ missingInputs: ['Chọn mã xét tuyển HUMG.'], missingRequirements, explanation, reason: 'Cần chọn mã xét tuyển để xác định ngưỡng đảm bảo chất lượng đầu vào.' });
  }

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'humg-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển HUMG.' });
    return exactPartial({ missingInputs: ['Chọn tổ hợp 3 môn.'], missingRequirements, explanation, reason: 'Cần chọn tổ hợp để tính điểm.' });
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
    missingRequirements.push(...missingSubjects.map((s) => ({ kind: 'profile-input' as const, code: `humg-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp HUMG.` })));
    return exactPartial({ missingInputs: ['Chưa đủ điểm 3 môn thi TN THPT theo tổ hợp HUMG.'], missingRequirements, explanation, reason: 'Cần đủ điểm 3 môn để tính điểm xét tuyển.' });
  }

  const raw30 = calculateHumgAcademicRaw30(scores);
  const eligibilityStatus: 'eligible' | 'ineligible' = raw30 >= threshold.thptMin30 ? 'eligible' : 'ineligible';
  const eligibilityReason = `Tổng thô 3 môn ${raw30}/30 ${eligibilityStatus === 'eligible' ? 'đạt' : 'dưới'} ngưỡng ${threshold.thptMin30}/30 của ngành ${threshold.programName} (mã ${threshold.programId}). Điểm chuẩn trúng tuyển thực tế có thể cao hơn.`;

  const bonus30 = Math.max(0, Math.min(3, context.bonus30 ?? 0));
  const standardPriority30 = lookupHumgStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateHumgPriority30({ thptTotal30: raw30, standardPriority30 });
  const finalScore = calculateHumgFinalScore30({ raw30, bonus30, priority30: priority.effectivePriority30 });

  explanation.push({ id: 'humg-exact-threshold', label: `Ngưỡng đầu vào - ${threshold.programName}`, output: raw30, scale: 30, formula: eligibilityReason, evidence: humgProgramThresholdEvidence.evidence });
  explanation.push({ id: 'humg-exact-academic-score', label: 'Điểm học lực (tổng thô 3 môn)', output: raw30, scale: 30, formula: 'Môn 1 + Môn 2 + Môn 3', evidence: humgFormulaEvidence.evidence });
  if (bonus30 > 0) {
    explanation.push({ id: 'humg-exact-bonus', label: 'Điểm cộng', output: bonus30, scale: 30, formula: 'Mục 3 Thông báo ngưỡng (QĐ 674/QĐ-MĐC), tối đa 3,0', evidence: humgFormulaEvidence.evidence });
  }
  explanation.push({
    id: 'humg-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − Tổng điểm đạt được theo tổ hợp)/7,5] × Mức điểm ưu tiên' : 'Mức điểm ưu tiên KV/ĐT (Điều 7 Thông tư 08/2022)',
    evidence: humgPriorityEvidence.evidence,
  });
  explanation.push({ id: 'humg-exact-final', label: 'Điểm Xét', output: finalScore, scale: 30, formula: 'Min[(Môn 1 + Môn 2 + Môn 3) + Điểm cộng, 30] + Điểm ưu tiên', evidence: humgFormulaEvidence.evidence });

  return {
    schoolId: 'humg',
    year: EXACT_METHOD.year,
    methodId: EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligibilityStatus, reasons: [eligibilityReason] },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...humgProgramThresholdEvidence.evidence, ...humgFormulaEvidence.evidence, ...humgPriorityEvidence.evidence],
  };
}
