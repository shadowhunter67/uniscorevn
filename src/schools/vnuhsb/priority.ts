import { round2 } from '../../core/round2';

/**
 * VNU-HSB 2026 — trang chính thức xác nhận Điểm xét tuyển Phương thức 100 = tổng thô + điểm ưu tiên
 * khu vực/đối tượng (nếu có), nhưng không công bố bảng mức điểm ưu tiên cụ thể trong thông báo đã
 * thu thập — dùng khung điểm ưu tiên quốc gia hiện hành (Thông tư 06/2025/TT-BGDĐT) làm judgment
 * call, cùng tiền lệ nhiều trường khác trong hệ thống.
 */
export const VNUHSB_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const VNUHSB_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const VNUHSB_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const VNUHSB_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupVnuhsbStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? VNUHSB_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? VNUHSB_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateVnuhsbEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < VNUHSB_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(
    0,
    round2(((30 - pivot) / VNUHSB_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30)
  );
  return { effectivePriority30, reduced: true };
}
