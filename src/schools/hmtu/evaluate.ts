import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { hmtuAdmissionMethods } from './methods';
import {
  HMTU_COMBINATION_IDS,
  HMTU_DOUBLED_SUBJECT,
  HMTU_DOUBLED_WEIGHT,
  HMTU_PROGRAM_BY_CODE,
  HMTU_SCALE_FACTOR,
  HMTU_SCORE_CAP_30,
  type HmtuProgram,
} from './thresholds';
import { calculateHmtuEffectivePriority30, lookupHmtuStandardPriority30 } from './priority';
import { hmtuPriorityEvidence, hmtuThptExamFormulaEvidence, hmtuThresholdEvidence } from './evidence';

export interface HmtuSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface HmtuEvaluationContext {
  programCode?: string;
  subjectContext?: HmtuSubjectContext;
}

function partialResult(methodId: string, year: number, reason: string, missingRequirements: MissingRequirement[] = []): AdmissionEvaluation {
  return {
    schoolId: 'hmtu',
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

function resolveProgramAndCombination(context: HmtuEvaluationContext): { program?: HmtuProgram; combinationError?: MissingRequirement } {
  if (!context.programCode) return {};
  const program = HMTU_PROGRAM_BY_CODE.get(context.programCode);
  if (!program) return {};
  if (context.subjectContext?.combinationId && !HMTU_COMBINATION_IDS.includes(context.subjectContext.combinationId)) {
    return {
      program,
      combinationError: {
        kind: 'school-context',
        code: 'hmtu-subject-combination',
        label: `Tổ hợp đã chọn không thuộc danh sách tổ hợp xét tuyển của HMTU (${HMTU_COMBINATION_IDS.join(', ')}) — trường dùng chung 1 danh sách cho cả 5 ngành.`,
      },
    };
  }
  return { program };
}

/**
 * HMTU 2026 — Phương thức 2 (xét kết quả thi TN THPT). Điểm xét tuyển =
 * (2 × Toán + môn 2 + môn 3) × 3/4 + điểm ưu tiên KV/ĐT (KK chưa modeled), trần 30. Môn Toán luôn
 * là "Điểm A" hệ số 2; 2 môn còn lại cùng hệ số 1 nên thứ tự giữa chúng không ảnh hưởng.
 */
export function evaluateHmtuThptExamAdmission(profile: ApplicantProfile, context: HmtuEvaluationContext = {}): AdmissionEvaluation {
  const method = hmtuAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.programCode) {
    missingRequirements.push({ kind: 'school-context', code: 'hmtu-program', label: 'Chọn ngành HMTU để tính Điểm xét tuyển.' });
    return partialResult(method.id, method.year, 'Cần chọn ngành HMTU để tính Điểm xét tuyển.', missingRequirements);
  }
  const { program, combinationError } = resolveProgramAndCombination(context);
  if (!program) {
    missingRequirements.push({ kind: 'school-context', code: 'hmtu-program', label: `Ngành "${context.programCode}" chưa mô hình hoá cho HMTU.` });
    return partialResult(method.id, method.year, `Ngành "${context.programCode}" chưa mô hình hoá cho HMTU.`, missingRequirements);
  }
  if (combinationError) {
    missingRequirements.push(combinationError);
    return partialResult(method.id, method.year, combinationError.label, missingRequirements);
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'hmtu-subject-combination', label: `Chọn tổ hợp xét tuyển cho ngành ${program.name}.` });
    return partialResult(method.id, method.year, `Cần chọn tổ hợp xét tuyển cho ngành ${program.name}.`, missingRequirements);
  }

  const subjects = context.subjectContext.subjects;
  if (!subjects.includes(HMTU_DOUBLED_SUBJECT)) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'hmtu-subject-combination',
      label: `Công thức HMTU nhân hệ số 2 cho môn ${SUBJECT_LABELS[HMTU_DOUBLED_SUBJECT]} — tổ hợp đã chọn không có môn này.`,
    });
    return partialResult(method.id, method.year, `Tổ hợp đã chọn không chứa môn ${SUBJECT_LABELS[HMTU_DOUBLED_SUBJECT]}.`, missingRequirements);
  }

  const missingSubjects: SubjectId[] = [];
  let weightedRaw40 = 0;
  for (const subjectId of subjects) {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) {
      missingSubjects.push(subjectId);
      continue;
    }
    weightedRaw40 += subjectId === HMTU_DOUBLED_SUBJECT ? score * HMTU_DOUBLED_WEIGHT : score;
  }
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `hmtu-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return partialResult(method.id, method.year, 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển HMTU.', missingRequirements);
  }

  const converted30 = round2(weightedRaw40 * HMTU_SCALE_FACTOR);

  const standardPriority30 = lookupHmtuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateHmtuEffectivePriority30({ converted30, standardPriority30 });
  const finalScore = round2(Math.min(HMTU_SCORE_CAP_30, converted30 + priority.effectivePriority30));

  const threshold30 = program.threshold30;
  const eligible = finalScore >= threshold30;

  const otherSubjects = subjects.filter((subjectId) => subjectId !== HMTU_DOUBLED_SUBJECT);
  const reasons: string[] = [
    `Điểm trúng tuyển HMTU 2026 (Phương thức 2 — thi TN THPT, ${program.name}, mã ngành ${program.code}): ${threshold30}/30 — Điểm xét tuyển của bạn = ${finalScore}/30 (môn Toán đã nhân hệ số 2, quy về thang 30; CHƯA gồm điểm khuyến khích nếu có).`,
    eligible
      ? 'Đạt/vượt điểm trúng tuyển đã công bố chính thức năm 2026 (Thông báo 706/TB-ĐHKTYTHD).'
      : 'Chưa đạt điểm trúng tuyển đã công bố chính thức năm 2026 (Thông báo 706/TB-ĐHKTYTHD).',
  ];

  explanation.push({
    id: 'hmtu-thpt-weighted',
    label: 'Điểm tổ hợp đã nhân hệ số, quy về thang 30',
    output: converted30,
    scale: 30,
    formula: `(2 × ${SUBJECT_LABELS[HMTU_DOUBLED_SUBJECT]} + ${otherSubjects.map((subjectId) => SUBJECT_LABELS[subjectId]).join(' + ')}) × 3/4`,
    evidence: hmtuThptExamFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'hmtu-thpt-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − điểm tổ hợp quy đổi)/7,5] × Mức điểm ưu tiên KV/ĐT' : 'Mức điểm ưu tiên KV/ĐT (Điều 7 Thông tư 06/2026/TT-BGDĐT)',
    evidence: hmtuPriorityEvidence.evidence,
  });
  explanation.push({
    id: 'hmtu-thpt-final',
    label: 'Điểm xét tuyển',
    output: finalScore,
    scale: 30,
    formula: 'Điểm xét tuyển = (2*Điểm A + Điểm B + Điểm C)*3/4 + ƯT + KK (trần 30)',
    evidence: hmtuThptExamFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'hmtu-thpt-threshold',
    label: `Điểm trúng tuyển — ${program.name} (${program.code})`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: hmtuThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'hmtu-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'hmtu',
    year: method.year,
    methodId: method.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...hmtuThptExamFormulaEvidence.evidence, ...hmtuThresholdEvidence.evidence],
  };
}
