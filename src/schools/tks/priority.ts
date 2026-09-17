import { round2 } from '../../core/round2';

/** TKS 2026 — Điểm ưu tiên khu vực/đối tượng theo Điều 7 TT 06/2026/TT-BGDĐT (không in bảng riêng
 * trong 2 văn bản đã đọc, judgment call). Điểm chuẩn công bố "đã bao gồm điểm ưu tiên" → ĐXT quy
 * đổi (đã cộng ưu tiên) mới là con số so với điểm chuẩn. */
export const TKS_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const TKS_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const TKS_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const TKS_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupTksStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? TKS_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? TKS_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateTksEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < TKS_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / TKS_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
