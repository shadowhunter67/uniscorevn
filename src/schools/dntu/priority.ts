import { round2 } from '../../core/round2';

/** DNTU 2026 — Điểm ưu tiên, CHỈ hiển thị tham khảo (nguồn không nói rõ điểm chuẩn đã gồm ưu tiên
 * hay chưa, judgment call giữ RAW, tiền lệ TBDU/BAFU khi im lặng). Điều 7 TT 06/2026/TT-BGDĐT. */
export const DNTU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const DNTU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const DNTU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const DNTU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupDntuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? DNTU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? DNTU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateDntuEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < DNTU_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / DNTU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
