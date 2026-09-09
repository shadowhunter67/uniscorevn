import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { huphAdmissionMethods } from './methods';
import { HUPH_PRE_PRIORITY_CAP_30, HUPH_PROGRAM_BY_CODE, type HuphProgram } from './thresholds';
import { calculateHuphEffectivePriority30, lookupHuphStandardPriority30 } from './priority';
import { huphPriorityEvidence, huphThptExamFormulaEvidence, huphThresholdEvidence } from './evidence';

export interface HuphSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface HuphEvaluationContext {
  programCode?: string;
  subjectContext?: HuphSubjectContext;
}

function partialResult(methodId: string, year: number, reason: string, missingRequirements: MissingRequirement[] = []): AdmissionEvaluation {
  return {
    schoolId: 'huph',
    year,
    methodId,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  };
}

function resolveProgramAndCombination(context: HuphEvaluationContext): { program?: HuphProgram; combinationError?: MissingRequirement } {
  if (!context.programCode) return {};
  const program = HUPH_PROGRAM_BY_CODE.get(context.programCode);
  if (!program) return {};
  if (context.subjectContext?.combinationId && !program.combinationIds.includes(context.subjectContext.combinationId)) {
    return {
      program,
      combinationError: {
        kind: 'school-context',
        code: 'huph-subject-combination',
        label: `Tổ hợp đã chọn không thuộc danh sách tổ hợp xét tuyển đã công bố của ngành ${program.name} (${program.combinationIds.join(', ')}).`,
      },
    };
  }
  return { program };
}

/**
 * HUPH 2026 — xét kết quả thi TN THPT ("phương thức gốc"). Điểm xét tuyển =
 * [M1 + M2 + M3 + điểm khuyến khích] (trần 30) + điểm ưu tiên KV/ĐT. Điểm khuyến khích (chứng chỉ
 * tiếng Anh quốc tế) CHƯA modeled — xem `knowledgeGaps.ts`, nên biểu thức trong ngoặc = tổng thô 3
 * môn. Mốc giảm điểm ưu tiên (22,5) áp cho chính biểu thức trong ngoặc, đúng như văn bản mô tả.
 */
export function evaluateHuphThptExamAdmission(profile: ApplicantProfile, context: HuphEvaluationContext = {}): AdmissionEvaluation {
  const method = huphAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.programCode) {
    missingRequirements.push({ kind: 'school-context', code: 'huph-program', label: 'Chọn ngành HUPH để tính Điểm xét tuyển.' });
    return partialResult(method.id, method.year, 'Cần chọn ngành HUPH để tính Điểm xét tuyển.', missingRequirements);
  }
  const { program, combinationError } = resolveProgramAndCombination(context);
  if (!program) {
    missingRequirements.push({ kind: 'school-context', code: 'huph-program', label: `Ngành "${context.programCode}" chưa mô hình hoá cho HUPH.` });
    return partialResult(method.id, method.year, `Ngành "${context.programCode}" chưa mô hình hoá cho HUPH.`, missingRequirements);
  }
  if (combinationError) {
    missingRequirements.push(combinationError);
    return partialResult(method.id, method.year, combinationError.label, missingRequirements);
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'huph-subject-combination', label: `Chọn tổ hợp xét tuyển cho ngành ${program.name}.` });
    return partialResult(method.id, method.year, `Cần chọn tổ hợp xét tuyển cho ngành ${program.name}.`, missingRequirements);
  }

  const subjects = context.subjectContext.subjects;
  const missingSubjects: SubjectId[] = [];
  let total = 0;
  for (const subjectId of subjects) {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) missingSubjects.push(subjectId);
    else total += score;
  }
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `huph-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return partialResult(method.id, method.year, 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển HUPH.', missingRequirements);
  }

  /** [M1 + M2 + M3 + điểm khuyến khích] với trần 30 — điểm khuyến khích chưa modeled nên = tổng thô. */
  const prePriority30 = round2(Math.min(HUPH_PRE_PRIORITY_CAP_30, total));

  const standardPriority30 = lookupHuphStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateHuphEffectivePriority30({ prePriorityTotal30: prePriority30, standardPriority30 });
  const finalScore = round2(prePriority30 + priority.effectivePriority30);

  const threshold30 = program.threshold30;
  const eligible = finalScore >= threshold30;

  const reasons: string[] = [
    `Điểm trúng tuyển HUPH 2026 đợt 1 (xét kết quả thi TN THPT, ${program.name}, mã ${program.code}): ${threshold30}/30 — Điểm xét tuyển của bạn = ${finalScore}/30. Trường KHÔNG chênh lệch điểm giữa các tổ hợp trong cùng một ngành.`,
    eligible
      ? 'Đạt/vượt điểm trúng tuyển đã công bố chính thức năm 2026 (Thông báo 743/TB-ĐHYTCC).'
      : 'Chưa đạt điểm trúng tuyển đã công bố chính thức năm 2026 (Thông báo 743/TB-ĐHYTCC).',
  ];

  explanation.push({
    id: 'huph-thpt-pre-priority',
    label: 'Tổng điểm 3 môn thi (chưa gồm điểm khuyến khích, trần 30)',
    output: prePriority30,
    scale: 30,
    formula: subjects.map((subjectId) => SUBJECT_LABELS[subjectId]).join(' + '),
    evidence: huphThptExamFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'huph-thpt-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − tổng trong ngoặc)/7,5] × Mức điểm ưu tiên KV/ĐT' : 'Mức điểm ưu tiên KV/ĐT (Điều 7 Thông tư 06/2026/TT-BGDĐT)',
    evidence: huphPriorityEvidence.evidence,
  });
  explanation.push({
    id: 'huph-thpt-final',
    label: 'Điểm xét tuyển',
    output: finalScore,
    scale: 30,
    formula: 'ĐXT = [Điểm Môn 1 + Điểm Môn 2 + Điểm Môn 3 + Điểm khuyến khích (nếu có)] + Điểm ưu tiên (nếu có)',
    evidence: huphThptExamFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'huph-thpt-threshold',
    label: `Điểm trúng tuyển — ${program.name} (${program.code})`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: huphThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'huph-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'huph',
    year: method.year,
    methodId: method.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...huphThptExamFormulaEvidence.evidence, ...huphThresholdEvidence.evidence],
  };
}
