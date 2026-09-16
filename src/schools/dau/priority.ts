import { round2 } from '../../core/round2';

/** DAU 2026 — Điểm ưu tiên khu vực/đối tượng, dùng để tính điểm xét tham khảo (nguồn ghi RÕ ngưỡng
 * 15/30 "KHÔNG BAO GỒM điểm ưu tiên" → so RAW). Điều 7 TT 06/2026/TT-BGDĐT (không in bảng riêng,
 * judgment call). */
export const DAU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const DAU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const DAU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const DAU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupDauStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? DAU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? DAU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateDauEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < DAU_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / DAU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
