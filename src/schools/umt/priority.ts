import { round2 } from '../../core/round2';

/**
 * UMT 2026 — Điểm ưu tiên khu vực/đối tượng. Thông báo 57/2026/TB-UMT mục 1: "Điểm ngưỡng ĐBCLĐV
 * = Điểm quy đổi thang 30 + Điểm cộng (nếu có) + Điểm ưu tiên (nếu có)" — KHÔNG in bảng KV/ĐT
 * riêng ⇒ áp Điều 7 Thông tư 06/2026/TT-BGDĐT (judgment call, cùng tiền lệ `schools/ctu`).
 */
export const UMT_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const UMT_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const UMT_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const UMT_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupUmtStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? UMT_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? UMT_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateUmtEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < UMT_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / UMT_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
