import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { ntuAdmissionMethods } from './methods';
import { NTU_COMBO_LABELS, NTU_COMBO_SLOTS, NTU_UNMODELED_COMBO_CODES } from './combos';
import { NTU_PROGRAM_THRESHOLD_BY_CODE, type NtuProgramThreshold } from './thresholds';
import { calculateNtuEffectivePriority30, lookupNtuStandardPriority30 } from './priority';
import { ntuExactFormulaEvidence, ntuProgramThresholdEvidence } from './evidence';

const NTU_METHOD = ntuAdmissionMethods[0];

interface ComboResult {
  comboCode: string;
  raw40: number;
  threshold40: number;
}

function ntuPartial(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'ntu',
    year: NTU_METHOD.year,
    methodId: NTU_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [input.reason] },
    missingInputs: [],
    missingRules: [],
    missingRequirements: input.missingRequirements ?? [],
    explanation: [],
    evidence: [],
  };
}

function computeCombo(comboCode: string, profile: ApplicantProfile): number | undefined {
  const slots = NTU_COMBO_SLOTS[comboCode];
  if (!slots) return undefined;
  let total = 0;
  for (const slot of slots) {
    const score = profile.thpt?.scores?.[slot.subject];
    if (score === undefined) return undefined;
    total += score * slot.weight;
  }
  return round2(total);
}

export interface NtuEvaluationContext {
  programCode?: string;
}

/**
 * NTU 2026 — xét điểm thi TN THPT, thang 40. Mỗi chương trình có điểm trúng tuyển riêng cho từng mã tổ hợp
 * (đã quy đổi tương đương giữa các tổ hợp), nên mô hình tính MỌI tổ hợp mà thí sinh đủ điểm môn, cộng ưu tiên
 * (khung quốc gia x4/3, judgment call) rồi chọn tổ hợp có độ chênh (điểm xét − điểm trúng tuyển) tốt nhất. Đạt
 * khi có ít nhất 1 tổ hợp đạt điểm trúng tuyển của chính nó.
 */
export function evaluateNtuThptExamAdmission(profile: ApplicantProfile, context: NtuEvaluationContext = {}): AdmissionEvaluation {
  const missingRequirements: MissingRequirement[] = [];

  if (!context.programCode) {
    missingRequirements.push({ kind: 'school-context', code: 'ntu-program', label: 'Chọn chương trình NTU để tra điểm trúng tuyển và tính Điểm xét.' });
    return ntuPartial({ missingRequirements, reason: 'Cần chọn chương trình NTU để áp điểm trúng tuyển và tính Điểm xét.' });
  }
  const entry: NtuProgramThreshold | undefined = NTU_PROGRAM_THRESHOLD_BY_CODE.get(context.programCode);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'ntu-program', label: `Mã chương trình "${context.programCode}" không có trong bảng điểm trúng tuyển NTU 2026.` });
    return ntuPartial({ missingRequirements, reason: `Mã chương trình "${context.programCode}" không có trong bảng điểm trúng tuyển NTU 2026.` });
  }

  const comboCodes = Object.keys(entry.cutoffs40).filter((code) => !NTU_UNMODELED_COMBO_CODES.includes(code) && NTU_COMBO_SLOTS[code]);
  const computed: ComboResult[] = [];
  for (const comboCode of comboCodes) {
    const raw40 = computeCombo(comboCode, profile);
    if (raw40 !== undefined) computed.push({ comboCode, raw40, threshold40: entry.cutoffs40[comboCode] });
  }

  if (computed.length === 0) {
    const sample = comboCodes.slice(0, 3).map((code) => `${code} (${NTU_COMBO_LABELS[code]})`).join('; ');
    missingRequirements.push({
      kind: 'profile-input',
      code: 'ntu-thpt-scores',
      label: `Điểm thi TN THPT đủ cho ít nhất một tổ hợp của ${entry.name}, ví dụ: ${sample}.`,
    });
    return ntuPartial({ missingRequirements, reason: `Cần đủ điểm thi TN THPT theo ít nhất một tổ hợp của ${entry.name} để tính Điểm xét NTU.` });
  }

  const standardPriority30 = lookupNtuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const scored = computed.map((result) => {
    const priority = calculateNtuEffectivePriority30({ rawTotal40: result.raw40, standardPriority30 });
    const priorityAdd40 = round2((priority.effectivePriority30 * 4) / 3);
    const final40 = round2(Math.min(40, result.raw40 + priorityAdd40));
    return { ...result, priority, priorityAdd40, final40, margin: round2(final40 - result.threshold40) };
  });
  const best = scored.reduce((a, b) => (b.margin > a.margin ? b : a));

  const eligible = best.margin >= 0;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';
  const comboLabel = NTU_COMBO_LABELS[best.comboCode];

  const reasons: string[] = [
    `Điểm trúng tuyển ${entry.name} (thi TN THPT 2026, tổ hợp ${best.comboCode}): >= ${best.threshold40}/40 — Điểm xét của bạn = ${best.final40}/40.`,
    eligible ? 'Đạt/vượt điểm trúng tuyển đã công bố chính thức năm 2026.' : 'Chưa đạt điểm trúng tuyển đã công bố chính thức năm 2026 ở tổ hợp tốt nhất của bạn.',
    scored.length > 1 ? `Đã xét ${scored.length} tổ hợp bạn đủ điểm, chọn tổ hợp có chênh lệch tốt nhất so với điểm trúng tuyển của chính tổ hợp đó.` : 'Chỉ có 1 tổ hợp đủ điểm môn để tính.',
    'Chưa kiểm tra điều kiện tiếng Anh của chương trình và chưa tính điểm cộng (xem phần giới hạn dữ liệu).',
  ];

  const slots = NTU_COMBO_SLOTS[best.comboCode];
  const formula = slots.map((slot) => `${SUBJECT_LABELS[slot.subject]}${slot.weight === 2 ? ' x 2' : ''}`).join(' + ');
  const explanation: CalculationStep[] = [
    {
      id: 'ntu-exact-raw',
      label: `Điểm tổ hợp ${best.comboCode} (${comboLabel}), thang 40`,
      output: best.raw40,
      scale: 40,
      formula,
      evidence: ntuExactFormulaEvidence.evidence,
    },
    {
      id: 'ntu-exact-priority',
      label: best.priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
      output: best.priorityAdd40,
      scale: 40,
      formula: best.priority.reduced
        ? '[(30 − tổng thô thang 30 tương đương)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026) × 4/3'
        : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026) × 4/3',
      evidence: ntuExactFormulaEvidence.evidence,
    },
    {
      id: 'ntu-exact-final',
      label: 'Điểm xét tuyển (đã cộng ưu tiên), thang 40',
      output: best.final40,
      scale: 40,
      formula: 'Điểm tổ hợp + Điểm ưu tiên',
      evidence: ntuExactFormulaEvidence.evidence,
    },
    {
      id: 'ntu-exact-threshold',
      label: `Điểm trúng tuyển — ${entry.name} — tổ hợp ${best.comboCode}`,
      output: best.threshold40,
      scale: 40,
      formula: reasons[0],
      evidence: ntuProgramThresholdEvidence.evidence,
    },
  ];

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'ntu-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'ntu',
    year: NTU_METHOD.year,
    methodId: NTU_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: best.final40, scale: 40 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...ntuExactFormulaEvidence.evidence, ...ntuProgramThresholdEvidence.evidence],
  };
}
