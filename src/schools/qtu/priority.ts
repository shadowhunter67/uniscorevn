import { round2 } from '../../core/round2';

/** QTU 2026 — Điểm ưu tiên, trích nguyên văn mục 5 đề án tuyển sinh: "Điểm ưu tiên = [(30 − Tổng
 * điểm đạt được)/7,5] × Tổng điểm ưu tiên được xác định thông thường" khi tổng ≥22,5/30. Mức điểm
 * ưu tiên KV/ĐT theo Điều 7 TT 06/2026/TT-BGDĐT (không in bảng riêng, judgment call). */
export const QTU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const QTU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const QTU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const QTU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupQtuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? QTU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? QTU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateQtuEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < QTU_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / QTU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
