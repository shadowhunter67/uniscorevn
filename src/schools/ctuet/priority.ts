import { round2 } from '../../core/round2';

/**
 * CTUET 2025 — Phụ lục II (khu vực) và Phụ lục III (đối tượng chính sách ưu tiên) của Quy chế tuyển
 * sinh (`sources.ts:ctuet-quyche-2025`, Quyết định 396/QĐ-ĐHKTCN) CHÍNH CHỦ công bố mức điểm cộng
 * ưu tiên cụ thể (không phải judgment call thay cho im lặng như TUEBA/PVU). Điều 7.5 công thức giảm
 * dần cho thí sinh đạt tổng điểm từ 22,5/30 trở lên — khớp công thức quốc gia hiện hành.
 */
export const CTUET_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const CTUET_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const CTUET_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const CTUET_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupCtuetPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? CTUET_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? CTUET_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculateCtuetEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < CTUET_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / CTUET_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
