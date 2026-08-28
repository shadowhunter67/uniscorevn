import { round2 } from '../../core/round2';

/**
 * TDU 2026 — Điểm ưu tiên khu vực/đối tượng. Thông báo 725/TB-ĐHTĐ (`sources.ts:tdu-quality-threshold-2026`)
 * chỉ in bảng ngưỡng theo mã ngành cho Phương thức 1 (thi TN THPT), không lặp lại công thức "ĐXT =
 * ... + điểm ưu tiên" cho phương thức này ⇒ áp dụng Điều 7 Thông tư 06/2026/TT-BGDĐT (judgment
 * call, cùng tiền lệ `schools/ctu`): KV1 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0; nhóm ưu tiên 1 (ĐT
 * 01-04) 2,0; nhóm ưu tiên 2 (ĐT 05-07) 1,0; công thức giảm khi tổng ≥ 22,5.
 */
export const TDU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const TDU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const TDU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const TDU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupTduStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? TDU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? TDU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateTduEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < TDU_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / TDU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
