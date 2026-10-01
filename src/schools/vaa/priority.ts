import { round2 } from '../../core/round2';

/**
 * VAA 2026 — Thông tin tuyển sinh chính thức (mục 2.4) công bố bảng mức điểm ưu tiên riêng cho Phương
 * thức THPT (KV1 0,75; KV2-NT 0,5; KV2 0,25; KV3 0; nhóm ĐT 1 = 2; nhóm ĐT 2 = 1) và công thức giảm
 * dần từ 22,5 điểm trở lên [(30 − điểm xét tuyển)/7,5] × mức hưởng. "Điểm xét tuyển" trong công thức đã
 * bao gồm điểm cộng; mô hình chưa tính điểm cộng nên dùng điểm tổ hợp thô làm mốc.
 */
export const VAA_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const VAA_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const VAA_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const VAA_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupVaaStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? VAA_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? VAA_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateVaaEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < VAA_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(
    0,
    round2(((30 - pivot) / VAA_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30)
  );
  return { effectivePriority30, reduced: true };
}
