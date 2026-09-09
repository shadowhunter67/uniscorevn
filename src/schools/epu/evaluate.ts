import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { epuAdmissionMethods } from './methods';
import { EPU_PROGRAM_BY_CODE, type EpuProgram } from './thresholds';
import { lookupEpuStandardPriority30, calculateEpuEffectivePriority30 } from './priority';
import { epuThptExamFormulaEvidence, epuPriorityEvidence, epuThresholdEvidence } from './evidence';

export interface EpuSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface EpuEvaluationContext {
  programCode?: string;
  subjectContext?: EpuSubjectContext;
}

function partialResult(methodId: string, year: number, reason: string, missingRequirements: MissingRequirement[] = []): AdmissionEvaluation {
  return {
    schoolId: 'epu',
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

function resolveProgramAndCombination(context: EpuEvaluationContext): { program?: EpuProgram; combinationError?: MissingRequirement } {
  if (!context.programCode) return {};
  const program = EPU_PROGRAM_BY_CODE.get(context.programCode);
  if (!program) return {};
  if (context.subjectContext?.combinationId && !program.combinationIds.includes(context.subjectContext.combinationId)) {
    return {
      program,
      combinationError: {
        kind: 'school-context',
        code: 'epu-subject-combination',
        label: `Tổ hợp đã chọn không thuộc danh sách tổ hợp xét tuyển (nhánh thi TN THPT) đã mô hình hoá của ngành ${program.name} (${program.combinationIds.join(', ')}).`,
      },
    };
  }
  return { program };
}

/**
 * EPU 2026 — Phương thức 3 (xét kết quả thi TN THPT). Điểm xét tuyển = tổng thô 3 môn theo tổ hợp
 * (thang 30, không hệ số) + điểm ưu tiên KV/ĐT theo khung quốc gia. So với điểm trúng tuyển CHÍNH
 * THỨC theo ngành (Thông báo 3020/TB-ĐHĐL, 09/8/2026, 38/38 mã xét tuyển).
 */
export function evaluateEpuThptExamAdmission(profile: ApplicantProfile, context: EpuEvaluationContext = {}): AdmissionEvaluation {
  const method = epuAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.programCode) {
    missingRequirements.push({ kind: 'school-context', code: 'epu-program', label: 'Chọn ngành EPU (mã xét tuyển) để tính Điểm xét tuyển.' });
    return partialResult(method.id, method.year, 'Cần chọn ngành EPU để tính Điểm xét tuyển.', missingRequirements);
  }
  const { program, combinationError } = resolveProgramAndCombination(context);
  if (!program) {
    missingRequirements.push({ kind: 'school-context', code: 'epu-program', label: `Ngành "${context.programCode}" chưa mô hình hoá cho EPU.` });
    return partialResult(method.id, method.year, `Ngành "${context.programCode}" chưa mô hình hoá cho EPU.`, missingRequirements);
  }
  if (combinationError) {
    missingRequirements.push(combinationError);
    return partialResult(method.id, method.year, combinationError.label, missingRequirements);
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'epu-subject-combination', label: `Chọn tổ hợp xét tuyển cho ngành ${program.name}.` });
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
        code: `epu-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return partialResult(method.id, method.year, 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển EPU.', missingRequirements);
  }
  const raw30 = round2(total);

  const standardPriority30 = lookupEpuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateEpuEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + priority.effectivePriority30));

  const threshold30 = program.threshold30;
  const eligible = finalScore >= threshold30;

  const reasons: string[] = [
    `Điểm trúng tuyển EPU 2026 (Phương thức 3 — thi TN THPT, ${program.name}, mã ${program.code}): ${threshold30}/30 — Điểm xét tuyển của bạn = ${finalScore}/30.`,
    eligible ? 'Đạt/vượt điểm trúng tuyển đã công bố chính thức năm 2026 (Thông báo 3020/TB-ĐHĐL).' : 'Chưa đạt điểm trúng tuyển đã công bố chính thức năm 2026 (Thông báo 3020/TB-ĐHĐL).',
  ];

  explanation.push({
    id: 'epu-thpt-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: subjects.map((subjectId) => SUBJECT_LABELS[subjectId]).join(' + '),
    evidence: epuThptExamFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'epu-thpt-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT' : 'Mức điểm ưu tiên KV/ĐT (Quy chế tuyển sinh hiện hành, Điều 7 Thông tư 06/2026/TT-BGDĐT)',
    evidence: epuPriorityEvidence.evidence,
  });
  explanation.push({
    id: 'epu-thpt-final',
    label: 'Điểm xét tuyển',
    output: finalScore,
    scale: 30,
    formula: 'Tổng điểm 3 môn theo tổ hợp + Điểm ưu tiên',
    evidence: epuThptExamFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'epu-thpt-threshold',
    label: `Điểm trúng tuyển — ${program.name} (${program.code})`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: epuThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'epu-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'epu',
    year: method.year,
    methodId: method.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...epuThptExamFormulaEvidence.evidence, ...epuThresholdEvidence.evidence],
  };
}
