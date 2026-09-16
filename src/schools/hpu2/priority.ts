import { round2 } from '../../core/round2';

/**
 * HPU2 2026 — nguồn điểm chuẩn đọc được KHÔNG kèm bảng mức điểm ưu tiên khu vực/đối tượng cụ thể của
 * trường. Dùng khung điểm ưu tiên quốc gia hiện hành (Thông tư 06/2026/TT-BGDĐT) làm judgment call
 * cho GIÁ TRỊ bảng, cùng tiền lệ DLA/BMTU/DNU/TUEBA/PVU/HTU/TUMP/NAEM/MKU/PYU/DHV.
 */
export const HPU2_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const HPU2_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const HPU2_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const HPU2_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupHpu2StandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? HPU2_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? HPU2_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculateHpu2EffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < HPU2_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / HPU2_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
