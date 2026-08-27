import type { ApplicantProfile } from '../../core/applicantProfile';
import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import type { ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { vmuAdmissionMethods } from './methods';
import { getVmuProgramGroupThreshold, type VmuProgramGroupId, VMU_PT1_BASELINE_THRESHOLD_30, VMU_OUT_OF_SCOPE_PROGRAMS } from './thresholds';
import { calculateVmuThptRawScore30, calculateVmuThptFinalScore30 } from './calculator';
import { calculateVmuPriority30, lookupVmuStandardPriority30 } from './priority';
import { vmuFormulaEvidence, vmuBaselineThresholdEvidence, vmuPriorityEvidence } from './evidence';

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

const EXACT_METHOD = vmuAdmissionMethods[1];

export interface VmuExactSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface VmuExactEvaluationContext {
  subjectContext?: VmuExactSubjectContext;
  /** Mã CTĐT VMU — chỉ dùng để loại trừ ngành có sơ tuyển năng khiếu (D127). */
  programId?: string;
}

function exactPartial(input: { missingInputs: string[]; missingRequirements: MissingRequirement[]; explanation: CalculationStep[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'vmu',
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
 * VMU 2026 — Phương thức 1 (xét thi TN THPT), tính đủ Điểm xét tuyển (thang 30):
 *   ĐXT = round2((M1 + M2 + M3) + Điểm ưu tiên)
 * Ngưỡng: chỉ có ngưỡng sàn chung 15,00/30 được công bố nguyên văn ⇒ tổng < 15 là `ineligible`,
 * tổng ≥ 15 trả `unknown` (ngưỡng theo khối ngành chưa đối chiếu nguồn 2026) kèm `score` exact.
 */
export function evaluateVmuThptExamExactAdmission(profile: ApplicantProfile, context: VmuExactEvaluationContext = {}): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (context.programId && VMU_OUT_OF_SCOPE_PROGRAMS[context.programId]) {
    missingRequirements.push({ kind: 'official-rule', code: 'vmu-program-out-of-scope', label: VMU_OUT_OF_SCOPE_PROGRAMS[context.programId] });
    return exactPartial({ missingInputs: [], missingRequirements, explanation, reason: VMU_OUT_OF_SCOPE_PROGRAMS[context.programId] });
  }

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'vmu-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển VMU.' });
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
    missingRequirements.push(...missingSubjects.map((s) => ({ kind: 'profile-input' as const, code: `vmu-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp VMU.` })));
    return exactPartial({ missingInputs: ['Chưa đủ điểm 3 môn thi TN THPT theo tổ hợp VMU.'], missingRequirements, explanation, reason: 'Cần đủ điểm 3 môn để tính điểm xét tuyển.' });
  }

  const raw30 = calculateVmuThptRawScore30(scores);
  const standardPriority30 = lookupVmuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateVmuPriority30({ thptTotal30: raw30, standardPriority30 });
  const finalScore = calculateVmuThptFinalScore30({ raw30, priority30: priority.effectivePriority30 });

  const meetsBaseline = raw30 >= VMU_PT1_BASELINE_THRESHOLD_30;
  const eligibilityStatus: 'ineligible' | 'unknown' = meetsBaseline ? 'unknown' : 'ineligible';
  const eligibilityReason = meetsBaseline
    ? `Tổng thô 3 môn ${raw30}/30 đạt ngưỡng sàn chung ${VMU_PT1_BASELINE_THRESHOLD_30}/30 của VMU. Ngưỡng theo khối ngành và điểm chuẩn trúng tuyển chưa xác minh từ nguồn chính thức 2026 nên chưa kết luận đủ điều kiện.`
    : `Tổng thô 3 môn ${raw30}/30 thấp hơn ngưỡng sàn chung ${VMU_PT1_BASELINE_THRESHOLD_30}/30 của VMU.`;

  explanation.push({ id: 'vmu-exact-baseline', label: 'Ngưỡng sàn chung PT1', output: raw30, scale: 30, formula: eligibilityReason, evidence: vmuBaselineThresholdEvidence.evidence });
  explanation.push({ id: 'vmu-exact-academic-score', label: 'Tổng điểm 3 môn tổ hợp', output: raw30, scale: 30, formula: 'M1 + M2 + M3', evidence: vmuFormulaEvidence.evidence });
  explanation.push({
    id: 'vmu-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − Tổng điểm)/7,5] × Mức điểm ưu tiên' : 'Mức điểm ưu tiên KV/ĐT (Điều 7 quy chế TT 06/2026)',
    evidence: vmuPriorityEvidence.evidence,
  });
  explanation.push({ id: 'vmu-exact-final', label: 'Điểm xét tuyển (ĐXT)', output: finalScore, scale: 30, formula: 'Tổng điểm 3 môn + Điểm ưu tiên', evidence: vmuFormulaEvidence.evidence });

  return {
    schoolId: 'vmu',
    year: EXACT_METHOD.year,
    methodId: EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligibilityStatus, reasons: [eligibilityReason] },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...vmuBaselineThresholdEvidence.evidence, ...vmuFormulaEvidence.evidence, ...vmuPriorityEvidence.evidence],
  };
}
