import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { ndunAdmissionMethods } from './methods';
import { NDUN_PROGRAM_BY_CODE, NDUN_SCORE_CAP_30, type NdunProgram } from './thresholds';
import { calculateNdunEffectivePriority30, lookupNdunStandardPriority30 } from './priority';
import { ndunCombinationParityEvidence, ndunPriorityEvidence, ndunThptExamFormulaEvidence, ndunThresholdEvidence } from './evidence';

export interface NdunSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface NdunEvaluationContext {
  programCode?: string;
  subjectContext?: NdunSubjectContext;
}

function partialResult(methodId: string, year: number, reason: string, missingRequirements: MissingRequirement[] = []): AdmissionEvaluation {
  return {
    schoolId: 'ndun',
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

function resolveProgramAndCombination(context: NdunEvaluationContext): { program?: NdunProgram; combinationError?: MissingRequirement } {
  if (!context.programCode) return {};
  const program = NDUN_PROGRAM_BY_CODE.get(context.programCode);
  if (!program) return {};
  if (context.subjectContext?.combinationId && !program.combinationIds.includes(context.subjectContext.combinationId)) {
    return {
      program,
      combinationError: {
        kind: 'school-context',
        code: 'ndun-subject-combination',
        label: `Tổ hợp đã chọn không thuộc danh sách tổ hợp xét tuyển đã công bố của ngành ${program.name} (${program.combinationIds.join(', ')}).`,
      },
    };
  }
  return { program };
}

/**
 * NDUN 2026 — Phương thức 100 (xét kết quả thi TN THPT). ĐXT = (M1 + M2 + M3 + KK) + UT, trần 30;
 * KK (điểm xét thưởng/khuyến khích) CHƯA modeled nên biểu thức = tổng thô 3 môn + điểm ưu tiên.
 * Trường công bố độ chênh giữa MỌI tổ hợp = 0 nên mỗi ngành chỉ có một mức điểm chuẩn.
 *
 * Ngoài điểm chuẩn, module còn kiểm tra 2 điều kiện số được công bố rõ: nguồn tuyển (tổng thô 3
 * môn tối thiểu) và ngưỡng đảm bảo chất lượng đầu vào theo ngành (tính trên tổng thô, không tính
 * điểm cộng).
 */
export function evaluateNdunThptExamAdmission(profile: ApplicantProfile, context: NdunEvaluationContext = {}): AdmissionEvaluation {
  const method = ndunAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.programCode) {
    missingRequirements.push({ kind: 'school-context', code: 'ndun-program', label: 'Chọn ngành NDUN để tính Điểm xét tuyển.' });
    return partialResult(method.id, method.year, 'Cần chọn ngành NDUN để tính Điểm xét tuyển.', missingRequirements);
  }
  const { program, combinationError } = resolveProgramAndCombination(context);
  if (!program) {
    missingRequirements.push({ kind: 'school-context', code: 'ndun-program', label: `Ngành "${context.programCode}" chưa mô hình hoá cho NDUN.` });
    return partialResult(method.id, method.year, `Ngành "${context.programCode}" chưa mô hình hoá cho NDUN.`, missingRequirements);
  }
  if (combinationError) {
    missingRequirements.push(combinationError);
    return partialResult(method.id, method.year, combinationError.label, missingRequirements);
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'ndun-subject-combination', label: `Chọn tổ hợp xét tuyển cho ngành ${program.name}.` });
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
        code: `ndun-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return partialResult(method.id, method.year, 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển NDUN.', missingRequirements);
  }
  const raw30 = round2(total);

  const standardPriority30 = lookupNdunStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateNdunEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(NDUN_SCORE_CAP_30, raw30 + priority.effectivePriority30));

  const sourceFloorFailed = raw30 < program.sourceFloor30;
  const qualityFloorFailed = raw30 < program.qualityFloor30;
  const threshold30 = program.threshold30;
  const eligible = finalScore >= threshold30 && !sourceFloorFailed && !qualityFloorFailed;

  const reasons: string[] = [
    `Điểm chuẩn NDUN 2026 (Phương thức 100 — thi TN THPT, ${program.name}, mã ngành ${program.code}): ${threshold30}/30 (niêm yết theo nhóm HSPT-KV3) — Điểm xét tuyển của bạn = ${finalScore}/30 (CHƯA gồm điểm xét thưởng/khuyến khích nếu có). Trường công bố độ chênh giữa các tổ hợp = 0 nên mọi tổ hợp dùng chung mức điểm chuẩn này.`,
  ];
  if (sourceFloorFailed) reasons.push(`Chưa đạt nguồn tuyển: tổng thô 3 môn = ${raw30}/30, yêu cầu tối thiểu ${program.sourceFloor30}/30.`);
  if (qualityFloorFailed) reasons.push(`Chưa đạt ngưỡng đảm bảo chất lượng đầu vào ngành ${program.name}: ${program.qualityFloor30}/30 tính trên tổng thô (không tính điểm cộng) — tổng thô của bạn = ${raw30}/30.`);
  reasons.push(
    eligible
      ? 'Đạt/vượt điểm chuẩn đã công bố chính thức năm 2026 (Thông báo 2058/TB-ĐDN).'
      : 'Chưa đạt điều kiện trúng tuyển đã công bố chính thức năm 2026 (Thông báo 2058/TB-ĐDN).'
  );

  explanation.push({
    id: 'ndun-thpt-raw',
    label: 'Tổng điểm 3 môn thi (ĐPT2)',
    output: raw30,
    scale: 30,
    formula: subjects.map((subjectId) => SUBJECT_LABELS[subjectId]).join(' + '),
    evidence: ndunThptExamFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'ndun-thpt-quality-floor',
    label: `Ngưỡng đảm bảo chất lượng đầu vào — ${program.name}`,
    output: program.qualityFloor30,
    scale: 30,
    formula: 'Điểm xét tối thiểu theo ngành (không nhân hệ số, không tính điểm cộng)',
    evidence: ndunThresholdEvidence.evidence,
  });
  explanation.push({
    id: 'ndun-thpt-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT' : 'Mức điểm ưu tiên KV/ĐT (Điều 7 Thông tư 06/2026/TT-BGDĐT)',
    evidence: ndunPriorityEvidence.evidence,
  });
  explanation.push({
    id: 'ndun-thpt-final',
    label: 'Điểm xét tuyển',
    output: finalScore,
    scale: 30,
    formula: 'ĐXT = (ĐPT2 + KK) + UT, trần 30',
    evidence: ndunThptExamFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'ndun-thpt-threshold',
    label: `Điểm chuẩn — ${program.name} (${program.code})`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: [...ndunThresholdEvidence.evidence, ...ndunCombinationParityEvidence.evidence],
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'ndun-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'ndun',
    year: method.year,
    methodId: method.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...ndunThptExamFormulaEvidence.evidence, ...ndunThresholdEvidence.evidence, ...ndunCombinationParityEvidence.evidence],
  };
}
