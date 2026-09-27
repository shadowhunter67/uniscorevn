import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { hcmunreAdmissionMethods } from './methods';
import { HCMUNRE_FIELD_THRESHOLD_BY_CODE, type HcmunreFieldThreshold } from './thresholds';
import { lookupHcmunreStandardPriority30, calculateHcmunreEffectivePriority30 } from './priority';
import { hcmunreExactFormulaEvidence, hcmunreFieldThresholdEvidence } from './evidence';

export interface HcmunreSubjectContext {
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

const HCMUNRE_METHOD = hcmunreAdmissionMethods[0];

function hcmunrePartial(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'hcmunre',
    year: HCMUNRE_METHOD.year,
    methodId: HCMUNRE_METHOD.id,
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
 * HCMUNRE 2026 — Phương thức 1 (xét kết quả thi TN THPT). Điểm xét = tổng thô 3 môn theo tổ hợp
 * (không hệ số) + điểm ưu tiên KV/ĐT (khung quốc gia, trường không tự công bố bảng riêng,
 * `priority.ts`). So với điểm chuẩn chính thức đợt 1 theo NGÀNH đã chọn — chỉ chấp nhận tổ hợp nằm
 * trong danh sách tổ hợp CHÍNH THỨC của ngành đó (`thresholds.ts`).
 */
export function evaluateHcmunreThptExamAdmission(
  profile: ApplicantProfile,
  context: { fieldCode?: string; subjectContext?: HcmunreSubjectContext } = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldCode) {
    missingRequirements.push({ kind: 'school-context', code: 'hcmunre-field', label: 'Chọn ngành HCMUNRE để tra điểm chuẩn và tính Điểm xét.' });
    return hcmunrePartial({ missingRequirements, reason: 'Cần chọn ngành HCMUNRE để áp điểm chuẩn và tính Điểm xét.' });
  }
  const entry: HcmunreFieldThreshold | undefined = HCMUNRE_FIELD_THRESHOLD_BY_CODE.get(context.fieldCode);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'hcmunre-field', label: `Ngành "${context.fieldCode}" không có trong bảng điểm chuẩn HCMUNRE 2026 (chưa mô hình hoá).` });
    return hcmunrePartial({ missingRequirements, reason: `Ngành "${context.fieldCode}" không có trong bảng điểm chuẩn HCMUNRE 2026 (chưa mô hình hoá).` });
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'hcmunre-subject-combination', label: `Chọn tổ hợp xét tuyển cho ${entry.name}.` });
    return hcmunrePartial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ${entry.name}.` });
  }
  if (!context.subjectContext.combinationId || !entry.combinationIds.includes(context.subjectContext.combinationId)) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'hcmunre-subject-combination',
      label: `Tổ hợp đã chọn không nằm trong danh sách tổ hợp chính thức của ${entry.name} (${entry.combinationIds.join(', ')}).`,
    });
    return hcmunrePartial({ missingRequirements, reason: `Tổ hợp đã chọn không thuộc danh sách tổ hợp chính thức của ${entry.name}.` });
  }

  const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `hcmunre-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return hcmunrePartial({ missingRequirements, reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét HCMUNRE.' });
  }
  const raw30 = total30 as number;

  const standardPriority30 = lookupHcmunreStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateHcmunreEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + priority.effectivePriority30));

  const threshold30 = entry.threshold30;
  const eligible = finalScore >= threshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Điểm trúng tuyển ${entry.name} (Phương thức 1, thi TN THPT 2026, đợt 1): tổng 3 môn + điểm ưu tiên KV/ĐT >= ${threshold30}/30 — tổng của bạn = ${finalScore}/30.`,
    eligible ? 'Đạt/vượt điểm trúng tuyển đã công bố chính thức đợt 1 năm 2026.' : 'Chưa đạt điểm trúng tuyển đã công bố chính thức đợt 1 năm 2026.',
  ];

  explanation.push({
    id: 'hcmunre-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: hcmunreExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'hcmunre-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT (khung quốc gia hiện hành, trường không tự công bố bảng riêng)'
      : 'Mức điểm ưu tiên KV/ĐT (khung quốc gia hiện hành, trường không tự công bố bảng riêng)',
    evidence: hcmunreExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'hcmunre-exact-final',
    label: 'Điểm xét (đã cộng ưu tiên)',
    output: finalScore,
    scale: 30,
    formula: 'Tổng thô 3 môn + Điểm ưu tiên',
    evidence: hcmunreExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'hcmunre-exact-threshold',
    label: `Điểm trúng tuyển — ${entry.name}`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: hcmunreFieldThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'hcmunre-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'hcmunre',
    year: HCMUNRE_METHOD.year,
    methodId: HCMUNRE_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...hcmunreExactFormulaEvidence.evidence, ...hcmunreFieldThresholdEvidence.evidence],
  };
}
