import { round2 } from '../../core/round2';

/**
 * TNUE 2026 — nguồn điểm chuẩn đọc được KHÔNG kèm bảng mức điểm ưu tiên khu vực/đối tượng cụ thể của
 * trường (chỉ ghi "Tiêu chí phụ" cho một số ngành, không liên quan điểm ưu tiên KV/ĐT). Dùng khung
 * điểm ưu tiên quốc gia hiện hành (Thông tư 06/2026/TT-BGDĐT) làm judgment call cho GIÁ TRỊ bảng,
 * cùng tiền lệ DLA/BMTU/DNU/TUEBA/PVU/HTU/TUMP/NAEM/MKU/PYU/DHV/HPU2.
 */
export const TNUE_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const TNUE_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const TNUE_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const TNUE_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupTnueStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? TNUE_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? TNUE_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculateTnueEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < TNUE_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / TNUE_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
