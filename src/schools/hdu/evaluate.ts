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

import { calculateHduAcademicRaw30, calculateHduTotalBeforePriority30, calculateHduFinalScore30 } from './calculator';
import { calculateHduEffectivePriority30, lookupHduStandardPriority30 } from './priority';
import { hduLawThresholdEvidence, hduFormulaEvidence, hduPriorityEvidence } from './evidence';

const HDU_EXACT_METHOD = hduAdmissionMethods[1];
type HduExactProgramId = '7380101' | '7380107';
const HDU_EXACT_PROGRAM_NAMES: Record<HduExactProgramId, string> = {
  '7380101': 'Luật',
  '7380107': 'Luật Kinh tế',
};

export interface HduExactSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface HduExactEvaluationContext {
  subjectContext?: HduExactSubjectContext;
  /** '7380101' (Luật) hoặc '7380107' (Luật Kinh tế). Bắt buộc. */
  programId?: string;
  /** Điểm khuyến khích (B) đã quy về thang 30 — mặc định 0 (nhánh exact cho thí sinh không có). */
  encouragementBonus30?: number;
}

function hduExactPartial(input: { missingInputs: string[]; missingRequirements: MissingRequirement[]; explanation: CalculationStep[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'hdu',
    year: HDU_EXACT_METHOD.year,
    methodId: HDU_EXACT_METHOD.id,
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
 * HDU 2026 — PT1 (xét thi TN THPT), ngành Luật / Luật Kinh tế, tính đủ Điểm xét tuyển (thang 30).
 * Điều kiện: tổng thô 3 môn ≥ 18,00 VÀ Ngữ văn ≥ 6,00 (không gồm ưu tiên/điểm cộng).
 */
export function evaluateHduThptExamExactAdmission(profile: ApplicantProfile, context: HduExactEvaluationContext = {}): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const programId = context.programId as HduExactProgramId | undefined;
  if (!programId || !HDU_EXACT_PROGRAM_NAMES[programId]) {
    missingRequirements.push({ kind: 'school-context', code: 'hdu-program', label: 'Chọn ngành Luật (7380101) hoặc Luật Kinh tế (7380107) — nhánh exact HDU chỉ phủ 2 ngành này.' });
    return hduExactPartial({ missingInputs: ['Chọn ngành Luật/Luật Kinh tế HDU.'], missingRequirements, explanation, reason: 'Nhánh exact HDU chỉ phủ ngành Luật và Luật Kinh tế (các ngành khác chưa công bố ngưỡng).' });
  }
  const programName = HDU_EXACT_PROGRAM_NAMES[programId];
  const threshold = getHduProgramGroupThreshold('hdu-luat')!;

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'hdu-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển HDU.' });
    return hduExactPartial({ missingInputs: ['Chọn tổ hợp 3 môn.'], missingRequirements, explanation, reason: 'Cần chọn tổ hợp để tính điểm.' });
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
    missingRequirements.push(...missingSubjects.map((s) => ({ kind: 'profile-input' as const, code: `hdu-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp HDU.` })));
    return hduExactPartial({ missingInputs: ['Chưa đủ điểm 3 môn thi TN THPT theo tổ hợp HDU.'], missingRequirements, explanation, reason: 'Cần đủ điểm 3 môn để tính điểm xét tuyển.' });
  }

  const literatureScore = profile.thpt?.scores?.literature;
  if (literatureScore === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'hdu-thpt-literature', label: 'Điểm thi TN THPT môn Ngữ văn (điều kiện phụ ngành Luật/Luật Kinh tế HDU, ≥ 6,0).' });
    return hduExactPartial({ missingInputs: ['Chưa có điểm môn Ngữ văn.'], missingRequirements, explanation, reason: 'Ngành Luật/Luật Kinh tế yêu cầu điểm Ngữ văn ≥ 6,0 — cần điểm môn này.' });
  }

  const raw30 = calculateHduAcademicRaw30(scores);
  const encouragementBonus30 = Math.max(0, Math.min(3, context.encouragementBonus30 ?? 0));
  const totalBeforePriority30 = calculateHduTotalBeforePriority30({ raw30, encouragementBonus30 });
  const standardPriority30 = lookupHduStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateHduEffectivePriority30({ totalBeforePriority30, standardPriority30 });
  const finalScore = calculateHduFinalScore30({ totalBeforePriority30, effectivePriority30: priority.effectivePriority30 });

  const meetsTotal = raw30 >= threshold.thptMin30;
  const meetsLiterature = literatureScore >= (threshold.literatureMin ?? 6);
  const eligibilityStatus: 'eligible' | 'ineligible' = meetsTotal && meetsLiterature ? 'eligible' : 'ineligible';
  const eligibilityReason = eligibilityStatus === 'eligible'
    ? `Tổng thô 3 môn ${raw30}/30 ≥ 18,00 và Ngữ văn ${literatureScore}/10 ≥ 6,0 — đạt ngưỡng ngành ${programName}. Điểm chuẩn trúng tuyển thực tế có thể cao hơn.`
    : `Chưa đạt ngưỡng ngành ${programName}: cần tổng thô 3 môn ≥ 18,00 (hiện ${raw30}) và Ngữ văn ≥ 6,0 (hiện ${literatureScore}).`;

  explanation.push({ id: 'hdu-exact-threshold', label: `Ngưỡng đầu vào - ${programName}`, output: raw30, scale: 30, formula: eligibilityReason, evidence: hduLawThresholdEvidence.evidence });
  explanation.push({ id: 'hdu-exact-academic', label: 'Tổng điểm thi 3 môn (A)', output: raw30, scale: 30, formula: 'M1 + M2 + M3', evidence: hduFormulaEvidence.evidence });
  if (encouragementBonus30 > 0) {
    explanation.push({ id: 'hdu-exact-bonus', label: 'Điểm khuyến khích (B)', output: encouragementBonus30, scale: 30, formula: 'Mục 7.2 (giải HSG tỉnh / lớp chuyên)', evidence: hduFormulaEvidence.evidence });
  }
  explanation.push({
    id: 'hdu-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (C, đã giảm)' : 'Điểm ưu tiên (C)',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − A − B)/7,5] × (ĐUT KV + ĐUT ĐT)' : 'ĐUT KV + ĐUT ĐT (Điều 7 Thông tư 06/2026)',
    evidence: hduPriorityEvidence.evidence,
  });
  explanation.push({ id: 'hdu-exact-final', label: 'Điểm xét tuyển', output: finalScore, scale: 30, formula: 'min(30, A + B) + Điểm ưu tiên (C)', evidence: hduFormulaEvidence.evidence });

  return {
    schoolId: 'hdu',
    year: HDU_EXACT_METHOD.year,
    methodId: HDU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligibilityStatus, reasons: [eligibilityReason] },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...hduLawThresholdEvidence.evidence, ...hduFormulaEvidence.evidence, ...hduPriorityEvidence.evidence],
  };
}
