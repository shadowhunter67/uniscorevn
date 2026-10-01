import { round2 } from '../../core/round2';

/**
 * VJU 2026 — thông tin tuyển sinh chính thức (mục 3.3.2) xác nhận công thức giảm điểm ưu tiên từ 22,5 điểm trở lên
 * [(30 − tổng điểm)/7,5] × mức ưu tiên, nhưng chỉ dẫn chiếu "mức điểm ưu tiên theo quy định của Bộ GD&ĐT" mà không
 * in bảng mức cụ thể — dùng khung điểm ưu tiên quốc gia hiện hành (Thông tư 06/2025/TT-BGDĐT) làm judgment
 * call, cùng tiền lệ nhiều trường khác trong hệ thống.
 */
export const VNUVJU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const VNUVJU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const VNUVJU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const VNUVJU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupVnuvjuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? VNUVJU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? VNUVJU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateVnuvjuEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < VNUVJU_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(
    0,
    round2(((30 - pivot) / VNUVJU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30)
  );
  return { effectivePriority30, reduced: true };
}
