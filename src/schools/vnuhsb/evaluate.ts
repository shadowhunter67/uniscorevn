import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { vnuhsbAdmissionMethods } from './methods';
import { VNUHSB_FIELD_THRESHOLD_BY_CODE, type VnuhsbFieldThreshold } from './thresholds';
import { lookupVnuhsbStandardPriority30, calculateVnuhsbEffectivePriority30 } from './priority';
import { vnuhsbExactFormulaEvidence, vnuhsbFieldThresholdEvidence } from './evidence';

export interface VnuhsbSubjectContext {
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

const VNUHSB_METHOD = vnuhsbAdmissionMethods[0];

function vnuhsbPartial(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'vnuhsb',
    year: VNUHSB_METHOD.year,
    methodId: VNUHSB_METHOD.id,
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
 * VNU-HSB 2026 — Phương thức 100 (xét kết quả thi TN THPT). Điểm xét = tổng thô 3 môn theo tổ hợp
 * (không hệ số) + điểm ưu tiên KV/ĐT (khung quốc gia, trường không tự công bố bảng riêng,
 * `priority.ts`). So với điểm chuẩn chính thức theo CHƯƠNG TRÌNH đã chọn — chỉ chấp nhận tổ hợp nằm
 * trong danh sách tổ hợp CHÍNH THỨC (`thresholds.ts`).
 */
export function evaluateVnuhsbThptExamAdmission(
  profile: ApplicantProfile,
  context: { fieldCode?: string; subjectContext?: VnuhsbSubjectContext } = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldCode) {
    missingRequirements.push({ kind: 'school-context', code: 'vnuhsb-field', label: 'Chọn chương trình VNU-HSB để tra điểm chuẩn và tính Điểm xét.' });
    return vnuhsbPartial({ missingRequirements, reason: 'Cần chọn chương trình VNU-HSB để áp điểm chuẩn và tính Điểm xét.' });
  }
  const entry: VnuhsbFieldThreshold | undefined = VNUHSB_FIELD_THRESHOLD_BY_CODE.get(context.fieldCode);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'vnuhsb-field', label: `Chương trình "${context.fieldCode}" không có trong bảng điểm chuẩn VNU-HSB 2026 (chưa mô hình hoá).` });
    return vnuhsbPartial({ missingRequirements, reason: `Chương trình "${context.fieldCode}" không có trong bảng điểm chuẩn VNU-HSB 2026 (chưa mô hình hoá).` });
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'vnuhsb-subject-combination', label: `Chọn tổ hợp xét tuyển cho ${entry.name}.` });
    return vnuhsbPartial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ${entry.name}.` });
  }
  if (!context.subjectContext.combinationId || !entry.combinationIds.includes(context.subjectContext.combinationId)) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'vnuhsb-subject-combination',
      label: `Tổ hợp đã chọn không nằm trong danh sách tổ hợp chính thức của ${entry.name} (${entry.combinationIds.join(', ')}).`,
    });
    return vnuhsbPartial({ missingRequirements, reason: `Tổ hợp đã chọn không thuộc danh sách tổ hợp chính thức của ${entry.name}.` });
  }

  const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `vnuhsb-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return vnuhsbPartial({ missingRequirements, reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét VNU-HSB.' });
  }
  const raw30 = total30 as number;

  const standardPriority30 = lookupVnuhsbStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateVnuhsbEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + priority.effectivePriority30));

  const threshold30 = entry.threshold30;
  const eligible = finalScore >= threshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Điểm trúng tuyển ${entry.name} (Phương thức 100, thi TN THPT 2026): tổng 3 môn + điểm ưu tiên KV/ĐT >= ${threshold30}/30 — tổng của bạn = ${finalScore}/30.`,
    eligible ? 'Đạt/vượt điểm trúng tuyển đã công bố chính thức năm 2026.' : 'Chưa đạt điểm trúng tuyển đã công bố chính thức năm 2026.',
  ];

  explanation.push({
    id: 'vnuhsb-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: vnuhsbExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'vnuhsb-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT (khung quốc gia hiện hành, trường không tự công bố bảng riêng)'
      : 'Mức điểm ưu tiên KV/ĐT (khung quốc gia hiện hành, trường không tự công bố bảng riêng)',
    evidence: vnuhsbExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'vnuhsb-exact-final',
    label: 'Điểm xét (đã cộng ưu tiên)',
    output: finalScore,
    scale: 30,
    formula: 'Tổng thô 3 môn + Điểm ưu tiên',
    evidence: vnuhsbExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'vnuhsb-exact-threshold',
    label: `Điểm trúng tuyển — ${entry.name}`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: vnuhsbFieldThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'vnuhsb-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'vnuhsb',
    year: VNUHSB_METHOD.year,
    methodId: VNUHSB_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...vnuhsbExactFormulaEvidence.evidence, ...vnuhsbFieldThresholdEvidence.evidence],
  };
}
