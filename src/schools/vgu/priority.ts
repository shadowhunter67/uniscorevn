import { round2 } from '../../core/round2';

/**
 * VGU 2026 — PT5: tổng điểm 3 môn "bao gồm cả điểm ưu tiên theo quy định của Bộ Giáo dục và Đào tạo"
 * (trang /nhaphoc, mục Điều kiện xét trúng tuyển a). VGU không tự công bố lại bảng mức ⇒ áp mức và công
 * thức giảm dần chuẩn của Quy chế hiện hành (Điều 7 Thông tư 06/2026/TT-BGDĐT), cùng bảng với DAV/HVTA.
 */
export const VGU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const VGU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const VGU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const VGU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupVguStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? VGU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? VGU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateVguEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < VGU_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / VGU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
