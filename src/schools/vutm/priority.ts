import { round2 } from '../../core/round2';

/**
 * VUTM 2026 — Thông báo 3036/TB-HVYDCT chỉ ghi "cộng với điểm cộng, điểm ưu tiên đối tượng, khu
 * vực theo quy định hiện hành", không in bảng mức. Dùng Điều 7 Thông tư 06/2026/TT-BGDĐT
 * (`sources.ts:vutm-priority-national-2026`) — judgment call cùng tiền lệ HUPH/ULSA/EPU/HVU.
 */
export const VUTM_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const VUTM_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const VUTM_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const VUTM_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupVutmStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? VUTM_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? VUTM_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculateVutmEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < VUTM_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / VUTM_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
