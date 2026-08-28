import { round2 } from '../../core/round2';

/**
 * HUCE 2026 — priority points. The official threshold notice (PDF 227/TB-HDTSDH,
 * `huce-threshold-conversion-2026`) does not publish HUCE's own priority-point table, so this
 * applies Dieu 7 Thong tu 06/2026/TT-BGDDT as a documented judgment call (same precedent as
 * `schools/ctu`, `schools/tgu`, ...): KV1 0.75 / KV2-NT 0.5 / KV2 0.25 / KV3 0; priority group 1
 * (DT 01-04) 2.0; priority group 2 (DT 05-07) 1.0; reduction formula once the total reaches 22.5.
 */
export const HUCE_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const HUCE_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const HUCE_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const HUCE_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupHuceStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? HUCE_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? HUCE_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateHuceEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < HUCE_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / HUCE_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
