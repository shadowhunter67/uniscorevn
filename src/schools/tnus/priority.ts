import { round2 } from '../../core/round2';

/** TNUS 2026 — mức điểm ưu tiên khu vực/đối tượng theo Điều 7 Thông tư 06/2026/TT-BGDĐT (không in
 * bảng riêng trong thông báo ngưỡng TNUS, judgment call dùng mức chuẩn chung áp dụng cho thang 30,
 * cùng công thức giảm dần khi tổng điểm ≥ 22,5/30 như Điều 8 của Thông tư). */
export const TNUS_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const TNUS_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const TNUS_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const TNUS_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupTnusStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? TNUS_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? TNUS_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateTnusEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < TNUS_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(
    0,
    round2(((30 - pivot) / TNUS_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30)
  );
  return { effectivePriority30, reduced: true };
}
