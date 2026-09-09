import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { vutmAdmissionMethods } from './methods';
import { VUTM_PROGRAM_BY_CODE, type VutmProgram } from './thresholds';
import { lookupVutmStandardPriority30, calculateVutmEffectivePriority30 } from './priority';
import { vutmThptExamFormulaEvidence, vutmPriorityEvidence, vutmThresholdEvidence } from './evidence';

export interface VutmSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface VutmEvaluationContext {
  programCode?: string;
  subjectContext?: VutmSubjectContext;
}

function partialResult(methodId: string, year: number, reason: string, missingRequirements: MissingRequirement[] = []): AdmissionEvaluation {
  return {
    schoolId: 'vutm',
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

function resolveProgramAndCombination(context: VutmEvaluationContext): { program?: VutmProgram; combinationError?: MissingRequirement } {
  if (!context.programCode) return {};
  const program = VUTM_PROGRAM_BY_CODE.get(context.programCode);
  if (!program) return {};
  if (context.subjectContext?.combinationId && !program.combinationIds.includes(context.subjectContext.combinationId)) {
    return {
      program,
      combinationError: {
        kind: 'school-context',
        code: 'vutm-subject-combination',
        label: `Tổ hợp đã chọn không thuộc danh sách tổ hợp xét tuyển đã mô hình hoá của ngành ${program.name} (${program.combinationIds.join(', ')}).`,
      },
    };
  }
  return { program };
}

/**
 * VUTM 2026 — xét kết quả thi TN THPT. Điểm xét tuyển = tổng điểm 3 môn theo tổ hợp (thang 10/môn,
 * tổng 30, không hệ số) + điểm cộng (CHƯA modeled, xem `knowledgeGaps.ts`) + điểm ưu tiên KV/ĐT
 * theo khung quốc gia, làm tròn 2 chữ số thập phân. So với điểm chuẩn CHÍNH THỨC theo ngành
 * (Thông báo 3036/TB-HVYDCT, 10/8/2026, 3/3 ngành).
 */
export function evaluateVutmThptExamAdmission(profile: ApplicantProfile, context: VutmEvaluationContext = {}): AdmissionEvaluation {
  const method = vutmAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.programCode) {
    missingRequirements.push({ kind: 'school-context', code: 'vutm-program', label: 'Chọn ngành VUTM (mã ngành) để tính Điểm xét tuyển.' });
    return partialResult(method.id, method.year, 'Cần chọn ngành VUTM để tính Điểm xét tuyển.', missingRequirements);
  }
  const { program, combinationError } = resolveProgramAndCombination(context);
  if (!program) {
    missingRequirements.push({ kind: 'school-context', code: 'vutm-program', label: `Ngành "${context.programCode}" chưa mô hình hoá cho VUTM.` });
    return partialResult(method.id, method.year, `Ngành "${context.programCode}" chưa mô hình hoá cho VUTM.`, missingRequirements);
  }
  if (combinationError) {
    missingRequirements.push(combinationError);
    return partialResult(method.id, method.year, combinationError.label, missingRequirements);
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'vutm-subject-combination', label: `Chọn tổ hợp xét tuyển cho ngành ${program.name}.` });
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
        code: `vutm-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return partialResult(method.id, method.year, 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển VUTM.', missingRequirements);
  }
  const raw30 = round2(total);

  const standardPriority30 = lookupVutmStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateVutmEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + priority.effectivePriority30));

  const threshold30 = program.threshold30;
  const eligible = finalScore >= threshold30;

  const reasons: string[] = [
    `Điểm chuẩn VUTM 2026 (xét kết quả thi TN THPT, ${program.name}, mã ngành ${program.code}): ${threshold30}/30 — Điểm xét tuyển của bạn = ${finalScore}/30 (CHƯA gồm điểm cộng nếu có, xem knowledgeGaps).`,
    eligible
      ? 'Đạt/vượt điểm chuẩn đã công bố chính thức năm 2026 (Thông báo 3036/TB-HVYDCT).'
      : 'Chưa đạt điểm chuẩn đã công bố chính thức năm 2026 (Thông báo 3036/TB-HVYDCT).',
  ];

  explanation.push({
    id: 'vutm-thpt-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: subjects.map((subjectId) => SUBJECT_LABELS[subjectId]).join(' + '),
    evidence: vutmThptExamFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'vutm-thpt-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT' : 'Mức điểm ưu tiên KV/ĐT (Quy chế tuyển sinh hiện hành, Điều 7 Thông tư 06/2026/TT-BGDĐT)',
    evidence: vutmPriorityEvidence.evidence,
  });
  explanation.push({
    id: 'vutm-thpt-final',
    label: 'Điểm xét tuyển',
    output: finalScore,
    scale: 30,
    formula: 'Tổng điểm 3 môn theo tổ hợp + Điểm cộng (chưa modeled) + Điểm ưu tiên',
    evidence: vutmThptExamFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'vutm-thpt-threshold',
    label: `Điểm chuẩn — ${program.name} (${program.code})`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: vutmThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'vutm-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'vutm',
    year: method.year,
    methodId: method.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...vutmThptExamFormulaEvidence.evidence, ...vutmThresholdEvidence.evidence],
  };
}
