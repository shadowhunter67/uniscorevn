import { round2 } from '../../core/round2';

export const NAPA_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const NAPA_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const NAPA_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const NAPA_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupNapaStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? NAPA_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? NAPA_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateNapaEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < NAPA_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  return {
    effectivePriority30: Math.max(0, round2(((30 - pivot) / NAPA_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30)),
    reduced: true,
  };
}
