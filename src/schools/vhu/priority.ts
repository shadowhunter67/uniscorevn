import { round2 } from '../../core/round2';

/** VHU 2026 — Điểm ưu tiên, CHỈ hiển thị tham khảo. Nguồn nói RÕ điểm sàn/điểm chuẩn PTXT THPT
 * "áp dụng cho thí sinh thuộc khu vực 3, không hưởng ưu tiên theo đối tượng, chưa bao gồm điểm
 * cộng" — so RAW theo đúng định nghĩa nguồn, điểm ưu tiên chỉ hiển thị tham khảo (không cộng vào
 * so sánh ngưỡng). Điều 7 TT 06/2026/TT-BGDĐT. */
export const VHU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const VHU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const VHU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const VHU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupVhuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? VHU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? VHU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateVhuEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < VHU_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / VHU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
