import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { ukhAdmissionMethods } from './methods';
import { UKH_FIELD_THRESHOLD_BY_CODE, type UkhFieldThreshold } from './thresholds';
import { lookupUkhStandardPriority30, calculateUkhEffectivePriority30 } from './priority';
import { ukhExactFormulaEvidence, ukhFieldThresholdEvidence } from './evidence';

export interface UkhSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

function readSubjectTotal(profile: ApplicantProfile, subjects: readonly SubjectId[]): { total30?: number; missingSubjects: SubjectId[] } {
  let total = 0;
  const missingSubjects: SubjectId[] = [];
  for (const subjectId of subjects) {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) missingSubjects.push(subjectId);
    else total += score;
  }
  if (missingSubjects.length > 0) return { missingSubjects };
  return { total30: round2(total), missingSubjects };
}

const UKH_METHOD = ukhAdmissionMethods[0];

function ukhPartial(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'ukh',
    year: UKH_METHOD.year,
    methodId: UKH_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [input.reason] },
    missingInputs: [],
    missingRules: [],
    missingRequirements: input.missingRequirements ?? [],
    explanation: [],
    evidence: [],
  };
}

/**
 * UKH 2026 — nhánh xét kết quả thi TN THPT. Điểm xét tuyển = tổng thô 3 môn theo tổ hợp (không hệ
 * số) + điểm ưu tiên KV/ĐT (Phụ lục IV chính chủ, `priority.ts`). So với điểm trúng tuyển chính thức
 * đợt 1 theo NGÀNH đã chọn — chỉ chấp nhận tổ hợp nằm trong danh sách tổ hợp CHÍNH THỨC của ngành đó
 * (`thresholds.ts`). Điểm cộng thành tích (tối đa 3,00) KHÔNG cộng vào — kết quả "chưa đạt" chỉ là
 * cận dưới cho thí sinh có thành tích, xem `knowledgeGaps.ts`.
 */
export function evaluateUkhThptExamAdmission(
  profile: ApplicantProfile,
  context: { fieldCode?: string; subjectContext?: UkhSubjectContext } = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldCode) {
    missingRequirements.push({ kind: 'school-context', code: 'ukh-field', label: 'Chọn ngành UKH để tra điểm chuẩn và tính Điểm xét tuyển.' });
    return ukhPartial({ missingRequirements, reason: 'Cần chọn ngành UKH để áp điểm chuẩn và tính Điểm xét tuyển.' });
  }
  const entry: UkhFieldThreshold | undefined = UKH_FIELD_THRESHOLD_BY_CODE.get(context.fieldCode);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'ukh-field', label: `Ngành "${context.fieldCode}" không có trong bảng điểm chuẩn UKH 2026 (chưa mô hình hoá).` });
    return ukhPartial({ missingRequirements, reason: `Ngành "${context.fieldCode}" không có trong bảng điểm chuẩn UKH 2026 (chưa mô hình hoá).` });
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'ukh-subject-combination', label: `Chọn tổ hợp xét tuyển cho ${entry.name}.` });
    return ukhPartial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ${entry.name}.` });
  }
  if (!context.subjectContext.combinationId || !entry.combinationIds.includes(context.subjectContext.combinationId)) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'ukh-subject-combination',
      label: `Tổ hợp đã chọn không nằm trong danh sách tổ hợp chính thức của ${entry.name} (${entry.combinationIds.join(', ')}).`,
    });
    return ukhPartial({ missingRequirements, reason: `Tổ hợp đã chọn không thuộc danh sách tổ hợp chính thức của ${entry.name}.` });
  }

  const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `ukh-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return ukhPartial({ missingRequirements, reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển UKH.' });
  }
  const raw30 = total30 as number;

  const standardPriority30 = lookupUkhStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateUkhEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + priority.effectivePriority30));

  const threshold30 = entry.threshold30;
  const eligible = finalScore >= threshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Điểm trúng tuyển ${entry.name} (thi TN THPT 2026, đợt 1): Điểm xét tuyển >= ${threshold30}/30 — của bạn = ${finalScore}/30.`,
    eligible
      ? 'Đạt/vượt điểm trúng tuyển đã công bố chính thức đợt 1 năm 2026.'
      : 'Chưa đạt điểm trúng tuyển đã công bố chính thức đợt 1 năm 2026 (CHƯA gồm điểm cộng thành tích nếu có — xem khoảng trống dữ liệu).',
  ];

  explanation.push({
    id: 'ukh-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: ukhExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'ukh-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT (UKH công bố chính thức, Phụ lục IV)'
      : 'Mức điểm ưu tiên KV/ĐT (UKH công bố chính thức, Phụ lục IV)',
    evidence: ukhExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'ukh-exact-final',
    label: 'Điểm xét tuyển (đã cộng ưu tiên)',
    output: finalScore,
    scale: 30,
    formula: 'Tổng thô 3 môn + Điểm ưu tiên',
    evidence: ukhExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'ukh-exact-threshold',
    label: `Điểm trúng tuyển — ${entry.name}`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: ukhFieldThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'ukh-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'ukh',
    year: UKH_METHOD.year,
    methodId: UKH_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...ukhExactFormulaEvidence.evidence, ...ukhFieldThresholdEvidence.evidence],
  };
}
