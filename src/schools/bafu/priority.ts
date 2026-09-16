import { round2 } from '../../core/round2';

/** BAFU 2026 — Điểm ưu tiên khu vực/đối tượng, trích nguyên văn "ĐƯT = [(30 − tổng điểm)/7,5] ×
 * mức điểm ưu tiên" khi tổng ≥22,5/30 (`bafu-admission-info-2026`). Mức điểm ưu tiên KV/ĐT theo
 * Điều 7 TT 06/2026/TT-BGDĐT (không in bảng riêng trong thông tin tuyển sinh, judgment call). */
export const BAFU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const BAFU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const BAFU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const BAFU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupBafuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? BAFU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? BAFU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateBafuEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < BAFU_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / BAFU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
