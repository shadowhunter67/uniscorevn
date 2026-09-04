import { round2 } from '../../core/round2';

/**
 * VHS 2026 — trường TỰ CÔNG BỐ bảng mức điểm ưu tiên khu vực/đối tượng của riêng mình (Thông báo
 * 34/TB-ĐHVHHCM, 04/02/2026, mục 7.1 "Chính sách ưu tiên theo đối tượng và ưu tiên theo khu vực") —
 * KHÔNG phải judgment call khung quốc gia thay thế như đa số trường khác trong campaign (giá trị
 * trùng khớp Điều 7 Thông tư 08/2022/TT-BGDĐT mà văn bản trích dẫn làm căn cứ, nhưng trường tự liệt
 * kê lại nguyên văn bảng mức + công thức giảm trong chính thông báo của mình).
 */
export const VHS_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const VHS_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const VHS_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const VHS_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupVhsStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? VHS_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? VHS_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculateVhsEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < VHS_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / VHS_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
