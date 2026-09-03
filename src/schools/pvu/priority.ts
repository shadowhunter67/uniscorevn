import { round2 } from '../../core/round2';

/**
 * PVU 2026 — điểm ưu tiên khu vực/đối tượng KHÔNG được trường công bố mức riêng (nguồn chỉ nói
 * "đã cộng điểm ưu tiên khu vực và đối tượng" trong điểm chuẩn). Dùng khung điểm ưu tiên quốc gia
 * hiện hành (Điều 7 Thông tư 06/2026/TT-BGDĐT, cùng khung áp dụng cho TUAF/PCTU/HUST) làm judgment
 * call cho GIÁ TRỊ bảng: KV1 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0; nhóm ưu tiên 1 (ĐT 01-04) 2,0;
 * nhóm ưu tiên 2 (ĐT 05-07) 1,0; giảm dần khi tổng điểm ≥ 22,5/30.
 */
export const PVU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const PVU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const PVU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const PVU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupPvuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? PVU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? PVU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculatePvuEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < PVU_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / PVU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
