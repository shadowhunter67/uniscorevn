import { round2 } from '../../core/round2';

/** Intracom University 2026 — Điểm ưu tiên, CHỈ hiển thị tham khảo (nguồn không nói rõ ngưỡng đã
 * gồm ưu tiên hay chưa, judgment call giữ RAW, tiền lệ TBDU/BAFU khi im lặng). Điều 7 TT
 * 06/2026/TT-BGDĐT. */
export const INTRACOM_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const INTRACOM_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const INTRACOM_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const INTRACOM_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupIntracomStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? INTRACOM_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? INTRACOM_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateIntracomEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < INTRACOM_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / INTRACOM_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
