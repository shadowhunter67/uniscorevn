import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { pxuAdmissionMethods } from './methods';
import { PXU_PROGRAM_BY_CODE, PXU_THPT_EXAM_THRESHOLD_30, PXU_TRANSCRIPT_THRESHOLD_30, type PxuProgram } from './thresholds';
import { lookupPxuStandardPriority30, calculatePxuEffectivePriority30 } from './priority';
import { pxuThptExamFormulaEvidence, pxuTranscriptFormulaEvidence, pxuThresholdEvidence } from './evidence';

export interface PxuSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface PxuEvaluationContext {
  programCode?: string;
  subjectContext?: PxuSubjectContext;
}

function resolveProgramAndCombination(context: PxuEvaluationContext): { program?: PxuProgram; combinationError?: MissingRequirement } {
  if (!context.programCode) return {};
  const program = PXU_PROGRAM_BY_CODE.get(context.programCode);
  if (!program) return {};
  if (context.subjectContext?.combinationId && !program.combinationIds.includes(context.subjectContext.combinationId)) {
    return {
      program,
      combinationError: {
        kind: 'school-context',
        code: 'pxu-subject-combination',
        label: `Tổ hợp đã chọn không thuộc danh sách tổ hợp đã mô hình hoá của ${program.name} (${program.combinationIds.join(', ')}). Một số tổ hợp có môn Tiếng Trung Quốc chưa hỗ trợ, xem knowledgeGaps.`,
      },
    };
  }
  return { program };
}

function partialResult(methodId: string, year: number, reason: string, missingRequirements: MissingRequirement[] = []): AdmissionEvaluation {
  return {
    schoolId: 'pxu',
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

/**
 * PXU 2026 — Phương thức 1 (thi TN THPT). Điểm xét tuyển = tổng thô 3 môn (T1+T2+T3, thang 30) +
 * điểm ưu tiên KV/ĐT (điểm cộng theo thành tích/chứng chỉ CHƯA modeled, xem knowledgeGaps.ts). So
 * với điểm trúng tuyển chính thức 15,00/30 (đồng nhất 9/9 ngành, công bố 16/8/2026).
 */
export function evaluatePxuThptExamAdmission(profile: ApplicantProfile, context: PxuEvaluationContext = {}): AdmissionEvaluation {
  const method = pxuAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.programCode) {
    missingRequirements.push({ kind: 'school-context', code: 'pxu-program', label: 'Chọn ngành PXU để tính Điểm xét tuyển.' });
    return partialResult(method.id, method.year, 'Cần chọn ngành PXU để tính Điểm xét tuyển.', missingRequirements);
  }
  const { program, combinationError } = resolveProgramAndCombination(context);
  if (!program) {
    missingRequirements.push({ kind: 'school-context', code: 'pxu-program', label: `Ngành "${context.programCode}" chưa mô hình hoá cho PXU.` });
    return partialResult(method.id, method.year, `Ngành "${context.programCode}" chưa mô hình hoá cho PXU.`, missingRequirements);
  }
  if (combinationError) {
    missingRequirements.push(combinationError);
    return partialResult(method.id, method.year, combinationError.label, missingRequirements);
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'pxu-subject-combination', label: `Chọn tổ hợp xét tuyển cho ${program.name}.` });
    return partialResult(method.id, method.year, `Cần chọn tổ hợp xét tuyển cho ${program.name}.`, missingRequirements);
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
        code: `pxu-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return partialResult(method.id, method.year, 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển PXU.', missingRequirements);
  }
  const raw30 = round2(total);

  const standardPriority30 = lookupPxuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculatePxuEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + priority.effectivePriority30));

  const threshold30 = PXU_THPT_EXAM_THRESHOLD_30;
  const eligible = finalScore >= threshold30;

  const reasons: string[] = [
    `Điểm trúng tuyển PXU 2026 (Phương thức 1 — thi TN THPT, ${program.name}): tổng 3 môn + điểm ưu tiên KV/ĐT >= ${threshold30}/30 — tổng của bạn = ${finalScore}/30 (CHƯA gồm điểm cộng thành tích/chứng chỉ nếu có, xem knowledgeGaps).`,
    eligible ? 'Đạt/vượt điểm trúng tuyển đã công bố chính thức năm 2026.' : 'Chưa đạt điểm trúng tuyển đã công bố chính thức năm 2026.',
  ];

  explanation.push({
    id: 'pxu-thpt-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: pxuThptExamFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'pxu-thpt-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT' : 'Mức điểm ưu tiên KV/ĐT (Số 041/TB-PXU, mục 5.3)',
    evidence: pxuThptExamFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'pxu-thpt-final',
    label: 'Điểm xét tuyển',
    output: finalScore,
    scale: 30,
    formula: '(T1 + T2 + T3) + Điểm ưu tiên',
    evidence: pxuThptExamFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'pxu-thpt-threshold',
    label: `Điểm trúng tuyển — ${program.name}`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: pxuThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'pxu-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'pxu',
    year: method.year,
    methodId: method.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...pxuThptExamFormulaEvidence.evidence, ...pxuThresholdEvidence.evidence],
  };
}

/**
 * PXU 2026 — Phương thức 2 (học bạ THPT). Điểm xét tuyển = (H1+H2+H3), mỗi Hi = TB cả năm lớp
 * 10/11/12 của 1 môn (thang 10) + điểm ưu tiên KV/ĐT. So với điểm trúng tuyển chính thức 18,00/30
 * (đồng nhất 9/9 ngành, công bố 16/8/2026 — KHÔNG dùng ngưỡng đầu vào 16,00 công bố hồi tháng 3).
 */
export function evaluatePxuTranscriptAdmission(profile: ApplicantProfile, context: PxuEvaluationContext = {}): AdmissionEvaluation {
  const method = pxuAdmissionMethods[1];
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.programCode) {
    missingRequirements.push({ kind: 'school-context', code: 'pxu-program', label: 'Chọn ngành PXU để tính Điểm xét tuyển.' });
    return partialResult(method.id, method.year, 'Cần chọn ngành PXU để tính Điểm xét tuyển.', missingRequirements);
  }
  const { program, combinationError } = resolveProgramAndCombination(context);
  if (!program) {
    missingRequirements.push({ kind: 'school-context', code: 'pxu-program', label: `Ngành "${context.programCode}" chưa mô hình hoá cho PXU.` });
    return partialResult(method.id, method.year, `Ngành "${context.programCode}" chưa mô hình hoá cho PXU.`, missingRequirements);
  }
  if (combinationError) {
    missingRequirements.push(combinationError);
    return partialResult(method.id, method.year, combinationError.label, missingRequirements);
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'pxu-subject-combination', label: `Chọn tổ hợp xét tuyển cho ${program.name}.` });
    return partialResult(method.id, method.year, `Cần chọn tổ hợp xét tuyển cho ${program.name}.`, missingRequirements);
  }

  const subjects = context.subjectContext.subjects;
  const missingSubjects: SubjectId[] = [];
  let total = 0;
  for (const subjectId of subjects) {
    const g10 = profile.transcript?.grade10?.[subjectId];
    const g11 = profile.transcript?.grade11?.[subjectId];
    const g12 = profile.transcript?.grade12?.[subjectId];
    if (g10 === undefined || g11 === undefined || g12 === undefined) {
      missingSubjects.push(subjectId);
      continue;
    }
    total += (g10 + g11 + g12) / 3;
  }
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `pxu-transcript-${subjectId}`,
        label: `Điểm trung bình cả năm lớp 10, 11, 12 môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return partialResult(method.id, method.year, 'Cần đủ điểm trung bình 3 năm của 3 môn để tính Điểm xét tuyển học bạ PXU.', missingRequirements);
  }
  const raw30 = round2(total);

  const standardPriority30 = lookupPxuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculatePxuEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + priority.effectivePriority30));

  const threshold30 = PXU_TRANSCRIPT_THRESHOLD_30;
  const eligible = finalScore >= threshold30;

  const reasons: string[] = [
    `Điểm trúng tuyển PXU 2026 (Phương thức 2 — học bạ THPT, ${program.name}): (H1+H2+H3) + điểm ưu tiên KV/ĐT >= ${threshold30}/30 — tổng của bạn = ${finalScore}/30 (CHƯA gồm điểm cộng thành tích/chứng chỉ nếu có, xem knowledgeGaps).`,
    eligible ? 'Đạt/vượt điểm trúng tuyển đã công bố chính thức năm 2026.' : 'Chưa đạt điểm trúng tuyển đã công bố chính thức năm 2026.',
  ];

  explanation.push({
    id: 'pxu-transcript-raw',
    label: 'Tổng điểm TB 3 năm của 3 môn (H1+H2+H3)',
    output: raw30,
    scale: 30,
    formula: subjects.map((s) => `TB(lớp10,11,12 ${SUBJECT_LABELS[s]})`).join(' + '),
    evidence: pxuTranscriptFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'pxu-transcript-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT' : 'Mức điểm ưu tiên KV/ĐT (Số 041/TB-PXU, mục 5.3)',
    evidence: pxuTranscriptFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'pxu-transcript-final',
    label: 'Điểm xét tuyển',
    output: finalScore,
    scale: 30,
    formula: '(H1 + H2 + H3) + Điểm ưu tiên',
    evidence: pxuTranscriptFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'pxu-transcript-threshold',
    label: `Điểm trúng tuyển — ${program.name}`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: pxuThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'pxu-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'pxu',
    year: method.year,
    methodId: method.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...pxuTranscriptFormulaEvidence.evidence, ...pxuThresholdEvidence.evidence],
  };
}
