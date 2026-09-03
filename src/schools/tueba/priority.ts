import { round2 } from '../../core/round2';

/**
 * TUEBA 2026 — nguồn (`sources.ts:tueba-threshold-2026`) xác nhận ngưỡng "đã bao gồm điểm ưu tiên
 * khu vực và đối tượng (nếu có)" nhưng KHÔNG công bố mức cụ thể theo từng khu vực/đối tượng — dùng
 * khung điểm ưu tiên quốc gia hiện hành (Điều 7 Thông tư 06/2026/TT-BGDĐT, cùng khung áp dụng cho
 * TUAF/PVU/HUST) làm judgment call cho GIÁ TRỊ bảng.
 */
export const TUEBA_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const TUEBA_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const TUEBA_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const TUEBA_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupTuebaStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? TUEBA_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? TUEBA_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculateTuebaEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < TUEBA_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / TUEBA_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
