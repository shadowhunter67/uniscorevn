import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { hatAdmissionMethods } from './methods';
import { HAT_FIELD_THRESHOLD_BY_CODE, type HatFieldThreshold } from './thresholds';
import { lookupHatStandardPriority30, calculateHatEffectivePriority30 } from './priority';
import { hatExactFormulaEvidence, hatFieldThresholdEvidence } from './evidence';

export interface HatSubjectContext {
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

const HAT_METHOD = hatAdmissionMethods[0];

function hatPartial(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'hat',
    year: HAT_METHOD.year,
    methodId: HAT_METHOD.id,
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
 * HAT 2025 — nhánh xét kết quả thi TN THPT. Điểm xét = tổng thô 3 môn theo tổ hợp (không hệ số) +
 * điểm ưu tiên KV/ĐT (khung quốc gia, `priority.ts`). So với điểm chuẩn chính thức theo NGÀNH đã
 * chọn — chỉ chấp nhận tổ hợp nằm trong danh sách tổ hợp CHÍNH THỨC của ngành đó (`thresholds.ts`).
 * Không có điều kiện phụ hay bảng điểm cộng riêng được công bố.
 */
export function evaluateHatThptExamAdmission(
  profile: ApplicantProfile,
  context: { fieldCode?: string; subjectContext?: HatSubjectContext } = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldCode) {
    missingRequirements.push({ kind: 'school-context', code: 'hat-field', label: 'Chọn ngành HAT để tra điểm chuẩn và tính Điểm xét.' });
    return hatPartial({ missingRequirements, reason: 'Cần chọn ngành HAT để áp điểm chuẩn và tính Điểm xét.' });
  }
  const entry: HatFieldThreshold | undefined = HAT_FIELD_THRESHOLD_BY_CODE.get(context.fieldCode);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'hat-field', label: `Ngành "${context.fieldCode}" không có trong bảng điểm chuẩn HAT 2025 (chưa mô hình hoá).` });
    return hatPartial({ missingRequirements, reason: `Ngành "${context.fieldCode}" không có trong bảng điểm chuẩn HAT 2025 (chưa mô hình hoá).` });
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'hat-subject-combination', label: `Chọn tổ hợp xét tuyển cho ${entry.name}.` });
    return hatPartial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ${entry.name}.` });
  }
  if (!context.subjectContext.combinationId || !entry.combinationIds.includes(context.subjectContext.combinationId)) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'hat-subject-combination',
      label: `Tổ hợp đã chọn không nằm trong danh sách tổ hợp chính thức của ${entry.name} (${entry.combinationIds.join(', ')}).`,
    });
    return hatPartial({ missingRequirements, reason: `Tổ hợp đã chọn không thuộc danh sách tổ hợp chính thức của ${entry.name}.` });
  }

  const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `hat-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return hatPartial({ missingRequirements, reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét HAT.' });
  }
  const raw30 = total30 as number;

  const standardPriority30 = lookupHatStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateHatEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + priority.effectivePriority30));

  const threshold30 = entry.threshold30;
  const eligible = finalScore >= threshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Điểm chuẩn ${entry.name} (thi TN THPT 2025): tổng 3 môn + điểm ưu tiên KV/ĐT >= ${threshold30}/30 — tổng của bạn = ${finalScore}/30.`,
    eligible ? 'Đạt/vượt điểm chuẩn đã công bố chính thức năm 2025.' : 'Chưa đạt điểm chuẩn đã công bố chính thức năm 2025.',
  ];

  explanation.push({
    id: 'hat-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: hatExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'hat-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT (khung quốc gia hiện hành)'
      : 'Mức điểm ưu tiên KV/ĐT (khung quốc gia hiện hành)',
    evidence: hatExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'hat-exact-final',
    label: 'Điểm xét (đã cộng ưu tiên)',
    output: finalScore,
    scale: 30,
    formula: 'Tổng thô 3 môn + Điểm ưu tiên',
    evidence: hatExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'hat-exact-threshold',
    label: `Điểm chuẩn — ${entry.name}`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: hatFieldThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'hat-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'hat',
    year: HAT_METHOD.year,
    methodId: HAT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...hatExactFormulaEvidence.evidence, ...hatFieldThresholdEvidence.evidence],
  };
}
