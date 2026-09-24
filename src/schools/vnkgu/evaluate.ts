import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { vnkguAdmissionMethods } from './methods';
import { VNKGU_FIELD_THRESHOLD_BY_CODE, type VnkguFieldThreshold } from './thresholds';
import { lookupVnkguStandardPriority30, calculateVnkguEffectivePriority30 } from './priority';
import { vnkguExactFormulaEvidence, vnkguFieldThresholdEvidence } from './evidence';

export interface VnkguSubjectContext {
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

const VNKGU_METHOD = vnkguAdmissionMethods[0];

function vnkguPartial(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'vnkgu',
    year: VNKGU_METHOD.year,
    methodId: VNKGU_METHOD.id,
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
 * VNKGU 2026 — Phương thức 2 (thi TN THPT). Điểm xét tuyển = tổng thô 3 môn theo tổ hợp (không hệ
 * số) + điểm ưu tiên KV/ĐT (bảng chính chủ đầy đủ, `priority.ts`). So với điểm trúng tuyển chính
 * thức theo NGÀNH đã chọn — chỉ chấp nhận tổ hợp nằm trong danh sách tổ hợp CHÍNH THỨC của ngành đó
 * (`thresholds.ts`). Điểm cộng thành tích (tối đa 3,00) KHÔNG cộng vào — kết quả "chưa đạt" chỉ là
 * cận dưới cho thí sinh có thành tích, xem `knowledgeGaps.ts`.
 */
export function evaluateVnkguThptExamAdmission(
  profile: ApplicantProfile,
  context: { fieldCode?: string; subjectContext?: VnkguSubjectContext } = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldCode) {
    missingRequirements.push({ kind: 'school-context', code: 'vnkgu-field', label: 'Chọn ngành VNKGU để tra điểm chuẩn và tính Điểm xét tuyển.' });
    return vnkguPartial({ missingRequirements, reason: 'Cần chọn ngành VNKGU để áp điểm chuẩn và tính Điểm xét tuyển.' });
  }
  const entry: VnkguFieldThreshold | undefined = VNKGU_FIELD_THRESHOLD_BY_CODE.get(context.fieldCode);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'vnkgu-field', label: `Ngành "${context.fieldCode}" không có trong bảng điểm chuẩn VNKGU 2026 (chưa mô hình hoá).` });
    return vnkguPartial({ missingRequirements, reason: `Ngành "${context.fieldCode}" không có trong bảng điểm chuẩn VNKGU 2026 (chưa mô hình hoá).` });
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'vnkgu-subject-combination', label: `Chọn tổ hợp xét tuyển cho ${entry.name}.` });
    return vnkguPartial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ${entry.name}.` });
  }
  if (!context.subjectContext.combinationId || !entry.combinationIds.includes(context.subjectContext.combinationId)) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'vnkgu-subject-combination',
      label: `Tổ hợp đã chọn không nằm trong danh sách tổ hợp chính thức của ${entry.name} (${entry.combinationIds.join(', ')}).`,
    });
    return vnkguPartial({ missingRequirements, reason: `Tổ hợp đã chọn không thuộc danh sách tổ hợp chính thức của ${entry.name}.` });
  }

  const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `vnkgu-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return vnkguPartial({ missingRequirements, reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển VNKGU.' });
  }
  const raw30 = total30 as number;

  const standardPriority30 = lookupVnkguStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateVnkguEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + priority.effectivePriority30));

  const threshold30 = entry.threshold30;
  const eligible = finalScore >= threshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Điểm trúng tuyển ${entry.name} (thi TN THPT 2026): Điểm xét tuyển >= ${threshold30}/30 — của bạn = ${finalScore}/30.`,
    eligible
      ? 'Đạt/vượt điểm trúng tuyển đã công bố chính thức năm 2026.'
      : 'Chưa đạt điểm trúng tuyển đã công bố chính thức năm 2026 (CHƯA gồm điểm cộng thành tích nếu có — xem khoảng trống dữ liệu).',
  ];

  explanation.push({
    id: 'vnkgu-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: vnkguExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'vnkgu-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT (VNKGU công bố chính thức, đầy đủ bảng số)'
      : 'Mức điểm ưu tiên KV/ĐT (VNKGU công bố chính thức, đầy đủ bảng số)',
    evidence: vnkguExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'vnkgu-exact-final',
    label: 'Điểm xét tuyển (đã cộng ưu tiên)',
    output: finalScore,
    scale: 30,
    formula: 'Tổng thô 3 môn + Điểm ưu tiên',
    evidence: vnkguExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'vnkgu-exact-threshold',
    label: `Điểm trúng tuyển — ${entry.name}`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: vnkguFieldThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'vnkgu-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'vnkgu',
    year: VNKGU_METHOD.year,
    methodId: VNKGU_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...vnkguExactFormulaEvidence.evidence, ...vnkguFieldThresholdEvidence.evidence],
  };
}
