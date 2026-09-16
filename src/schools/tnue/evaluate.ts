import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import { SUBJECT_LABELS, COMMON_SUBJECT_COMBINATIONS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { tnueAdmissionMethods } from './methods';
import { TNUE_FIELD_THRESHOLD_BY_CODE, type TnueFieldThreshold } from './thresholds';
import { lookupTnueStandardPriority30, calculateTnueEffectivePriority30 } from './priority';
import { tnueExactFormulaEvidence, tnueFieldThresholdEvidence } from './evidence';

export interface TnueThptExamEvaluationContext {
  fieldCode?: string;
}

const TNUE_METHOD = tnueAdmissionMethods[0];

function tnuePartial(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'tnue',
    year: TNUE_METHOD.year,
    methodId: TNUE_METHOD.id,
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
 * TNUE 2026 — nhánh xét kết quả thi TN THPT (19/22 ngành, loại 3 ngành tổ hợp năng khiếu). Điểm xét
 * = tổng thô 3 môn theo TỔ HỢP GỐC DUY NHẤT đã công bố cho ngành (không hệ số) + điểm ưu tiên KV/ĐT
 * (khung quốc gia hiện hành, judgment call, `priority.ts`). So với điểm chuẩn chính thức theo NGÀNH
 * đã chọn (`thresholds.ts`). Chỉ cần chọn ngành — tổ hợp đã được xác định sẵn theo ngành, không cho
 * chọn tổ hợp khác (trường chỉ công bố 1 tổ hợp/ngành).
 */
export function evaluateTnueThptExamAdmission(profile: ApplicantProfile, context: TnueThptExamEvaluationContext = {}): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldCode) {
    missingRequirements.push({ kind: 'school-context', code: 'tnue-field', label: 'Chọn ngành TNUE để tra điểm chuẩn và tính Điểm xét.' });
    return tnuePartial({ missingRequirements, reason: 'Cần chọn ngành TNUE để áp điểm chuẩn và tính Điểm xét.' });
  }
  const entry: TnueFieldThreshold | undefined = TNUE_FIELD_THRESHOLD_BY_CODE.get(context.fieldCode);
  if (!entry) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'tnue-field',
      label: `Ngành "${context.fieldCode}" không có trong bảng điểm chuẩn TNUE 2026 đã mô hình hoá (19/22 ngành, 3 ngành tổ hợp năng khiếu chưa mô hình hoá).`,
    });
    return tnuePartial({
      missingRequirements,
      reason: `Ngành "${context.fieldCode}" không có trong bảng điểm chuẩn TNUE 2026 đã mô hình hoá.`,
    });
  }
  const combination = COMMON_SUBJECT_COMBINATIONS.find((c) => c.id === entry.combinationId);
  if (!combination) {
    return tnuePartial({ reason: `Tổ hợp "${entry.combinationId}" của ${entry.name} chưa có trong hệ thống.` });
  }

  let raw = 0;
  const missingSubjects = combination.subjects.filter((subjectId) => profile.thpt?.scores?.[subjectId] === undefined);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `tnue-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} (tổ hợp ${entry.combinationId} — ${entry.name}).`,
      }))
    );
    return tnuePartial({ missingRequirements, reason: `Cần đủ điểm 3 môn tổ hợp ${entry.combinationId} để tính Điểm xét ${entry.name}.` });
  }
  for (const subjectId of combination.subjects) raw += profile.thpt!.scores![subjectId]!;
  const raw30 = round2(raw);

  const standardPriority30 = lookupTnueStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateTnueEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + priority.effectivePriority30));

  const threshold30 = entry.threshold30;
  const eligible = finalScore >= threshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Điểm chuẩn ${entry.name} (tổ hợp ${entry.combinationId}, thi TN THPT 2026): tổng 3 môn + điểm ưu tiên KV/ĐT >= ${threshold30}/30 — tổng của bạn = ${finalScore}/30.`,
    eligible ? 'Đạt/vượt điểm chuẩn đã công bố chính thức năm 2026.' : 'Chưa đạt điểm chuẩn đã công bố chính thức năm 2026.',
  ];

  explanation.push({
    id: 'tnue-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: combination.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: tnueExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'tnue-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT (khung quốc gia hiện hành, judgment call)'
      : 'Mức điểm ưu tiên KV/ĐT (khung quốc gia hiện hành, judgment call)',
    evidence: tnueExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'tnue-exact-final',
    label: 'Điểm xét (đã cộng ưu tiên)',
    output: finalScore,
    scale: 30,
    formula: 'Tổng thô 3 môn + Điểm ưu tiên',
    evidence: tnueExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'tnue-exact-threshold',
    label: `Điểm chuẩn — ${entry.name}`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: tnueFieldThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'tnue-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'tnue',
    year: TNUE_METHOD.year,
    methodId: TNUE_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...tnueExactFormulaEvidence.evidence, ...tnueFieldThresholdEvidence.evidence],
  };
}
