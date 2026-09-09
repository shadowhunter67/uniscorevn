import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { unetiAdmissionMethods } from './methods';
import {
  UNETI_COMBINATION_GROUPS,
  UNETI_ENGLISH_MAJOR_CODES,
  UNETI_ENGLISH_MAJOR_MIN_ENGLISH,
  UNETI_MINIMUM_RAW_TOTAL_30,
  UNETI_PROGRAM_BY_CODE,
  type UnetiCombination,
  type UnetiProgram,
} from './thresholds';
import { calculateUnetiEffectivePriority30, lookupUnetiStandardPriority30 } from './priority';
import { unetiEnglishMajorConditionEvidence, unetiPriorityEvidence, unetiThptExamFormulaEvidence, unetiThresholdEvidence } from './evidence';

/** Hệ số theo VỊ TRÍ môn trong tổ hợp (Thông tin tuyển sinh 2026, mục II.2.2.2). */
export const UNETI_SUBJECT_WEIGHTS: readonly [number, number, number] = [4.5, 3.5, 2];
/** Hệ số quy về thang 30 ("x 3/10"). */
export const UNETI_SCALE_FACTOR = 0.3;

export interface UnetiSubjectContext {
  combinationId?: string;
  subjects?: readonly SubjectId[];
}

export interface UnetiEvaluationContext {
  programCode?: string;
  subjectContext?: UnetiSubjectContext;
}

function partialResult(methodId: string, year: number, reason: string, missingRequirements: MissingRequirement[] = []): AdmissionEvaluation {
  return {
    schoolId: 'uneti',
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

function findCombination(program: UnetiProgram, combinationId: string | undefined): UnetiCombination | undefined {
  if (!combinationId) return undefined;
  return UNETI_COMBINATION_GROUPS[program.group].find((combination) => combination.id === combinationId);
}

/**
 * UNETI 2026 — Phương thức 2 (xét kết quả thi TN THPT). ĐXT = (M1×4,5 + M2×3,5 + M3×2) × 3/10 +
 * điểm ưu tiên KV/ĐT (KK chưa modeled), trần 30. Thứ tự M1/M2/M3 lấy từ bảng tổ hợp CÓ THỨ TỰ của
 * chính trường (`thresholds.ts:UNETI_COMBINATION_GROUPS`), KHÔNG lấy từ danh mục tổ hợp dùng chung.
 */
export function evaluateUnetiThptExamAdmission(profile: ApplicantProfile, context: UnetiEvaluationContext = {}): AdmissionEvaluation {
  const method = unetiAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.programCode) {
    missingRequirements.push({ kind: 'school-context', code: 'uneti-program', label: 'Chọn mã xét tuyển UNETI (kèm cơ sở Hà Nội/Ninh Bình) để tính Điểm xét tuyển.' });
    return partialResult(method.id, method.year, 'Cần chọn mã xét tuyển UNETI để tính Điểm xét tuyển.', missingRequirements);
  }
  const program = UNETI_PROGRAM_BY_CODE.get(context.programCode);
  if (!program) {
    missingRequirements.push({ kind: 'school-context', code: 'uneti-program', label: `Mã xét tuyển "${context.programCode}" chưa mô hình hoá cho UNETI.` });
    return partialResult(method.id, method.year, `Mã xét tuyển "${context.programCode}" chưa mô hình hoá cho UNETI.`, missingRequirements);
  }

  const combination = findCombination(program, context.subjectContext?.combinationId);
  if (!combination) {
    const available = UNETI_COMBINATION_GROUPS[program.group].map((entry) => entry.id).join(', ');
    missingRequirements.push({
      kind: 'school-context',
      code: 'uneti-subject-combination',
      label: `Chọn tổ hợp xét tuyển thuộc ${program.group.replace('group', 'nhóm ')} của ngành ${program.name} (${available}).`,
    });
    return partialResult(method.id, method.year, `Cần chọn tổ hợp xét tuyển thuộc ${program.group.replace('group', 'nhóm ')} cho ${program.name}.`, missingRequirements);
  }

  const missingSubjects: SubjectId[] = [];
  const scores: number[] = [];
  for (const subjectId of combination.subjects) {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) missingSubjects.push(subjectId);
    else scores.push(score);
  }
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `uneti-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp ${combination.id}.`,
      }))
    );
    return partialResult(method.id, method.year, 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển UNETI.', missingRequirements);
  }

  const rawSum30 = round2(scores[0] + scores[1] + scores[2]);
  const weighted30 = round2((scores[0] * UNETI_SUBJECT_WEIGHTS[0] + scores[1] * UNETI_SUBJECT_WEIGHTS[1] + scores[2] * UNETI_SUBJECT_WEIGHTS[2]) * UNETI_SCALE_FACTOR);

  const standardPriority30 = lookupUnetiStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateUnetiEffectivePriority30({ weightedTotal30: weighted30, standardPriority30 });
  const finalScore = round2(Math.min(30, weighted30 + priority.effectivePriority30));

  const englishIndex = combination.subjects.indexOf('english');
  const englishScore = englishIndex >= 0 ? scores[englishIndex] : undefined;
  const englishMajor = UNETI_ENGLISH_MAJOR_CODES.includes(program.code);
  const englishConditionFailed = englishMajor && (englishScore === undefined || englishScore < UNETI_ENGLISH_MAJOR_MIN_ENGLISH);
  const sourceFloorFailed = rawSum30 < UNETI_MINIMUM_RAW_TOTAL_30;

  const threshold30 = program.threshold30;
  const eligible = finalScore >= threshold30 && !englishConditionFailed && !sourceFloorFailed;

  const campusLabel = program.campus === 'hanoi' ? 'cơ sở Hà Nội' : 'cơ sở Ninh Bình';
  const reasons: string[] = [
    `Điểm trúng tuyển UNETI 2026 (Phương thức 2 — thi TN THPT, ${program.name}, mã ${program.code}, ${campusLabel}): ${threshold30}/30 — Điểm xét tuyển của bạn = ${finalScore}/30 (tổ hợp ${combination.id}, đã nhân hệ số 4,5/3,5/2 theo thứ tự môn).`,
  ];
  if (sourceFloorFailed) reasons.push(`Chưa đạt nguồn tuyển: tổng thô 3 môn = ${rawSum30}/30, yêu cầu tối thiểu ${UNETI_MINIMUM_RAW_TOTAL_30}/30.`);
  if (englishConditionFailed) reasons.push(`Ngành Ngôn ngữ Anh yêu cầu điểm môn Tiếng Anh trong tổ hợp >= ${UNETI_ENGLISH_MAJOR_MIN_ENGLISH},00 — điểm của bạn = ${englishScore ?? 'chưa nhập'}.`);
  reasons.push(eligible ? 'Đạt/vượt điểm trúng tuyển đã công bố chính thức năm 2026 (Thông báo 826/TB-ĐHKTKTCN).' : 'Chưa đạt điều kiện trúng tuyển đã công bố chính thức năm 2026 (Thông báo 826/TB-ĐHKTKTCN).');

  explanation.push({
    id: 'uneti-thpt-raw-sum',
    label: 'Tổng thô 3 môn (kiểm tra nguồn tuyển >= 15/30)',
    output: rawSum30,
    scale: 30,
    formula: combination.subjects.map((subjectId) => SUBJECT_LABELS[subjectId]).join(' + '),
    evidence: unetiThptExamFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'uneti-thpt-weighted',
    label: `Điểm tổ hợp có hệ số (tổ hợp ${combination.id})`,
    output: weighted30,
    scale: 30,
    formula: `(${SUBJECT_LABELS[combination.subjects[0]]} × 4,5 + ${SUBJECT_LABELS[combination.subjects[1]]} × 3,5 + ${SUBJECT_LABELS[combination.subjects[2]]} × 2) × 3/10`,
    evidence: unetiThptExamFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'uneti-thpt-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − điểm tổ hợp)/7,5] × Mức điểm ưu tiên KV/ĐT' : 'Mức điểm ưu tiên KV/ĐT (Quy chế tuyển sinh Bộ GD&ĐT)',
    evidence: unetiPriorityEvidence.evidence,
  });
  explanation.push({
    id: 'uneti-thpt-final',
    label: 'Điểm xét tuyển',
    output: finalScore,
    scale: 30,
    formula: 'ĐXT = (M1 × 4,5 + M2 × 3,5 + M3 × 2) × 3/10 + Điểm ưu tiên (trần 30)',
    evidence: unetiThptExamFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'uneti-thpt-threshold',
    label: `Điểm trúng tuyển — ${program.name} (${program.code}, ${campusLabel})`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: unetiThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'uneti-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'uneti',
    year: method.year,
    methodId: method.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...unetiThptExamFormulaEvidence.evidence, ...unetiThresholdEvidence.evidence, ...(englishMajor ? unetiEnglishMajorConditionEvidence.evidence : [])],
  };
}
