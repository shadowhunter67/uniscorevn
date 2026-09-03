import { round2 } from '../../core/round2';

/**
 * HBU 2025 — công thức trường công bố "ĐXT = TĐ1 + ĐUT" trong đó "ĐUT là điểm ưu tiên khu vực và đối
 * tượng được quy định trong Quy chế tuyển sinh hiện hành của Bộ Giáo dục và Đào tạo và của Trường Đại
 * học Hòa Bình" nhưng KHÔNG công bố bảng mức điểm ưu tiên cụ thể theo từng khu vực/đối tượng riêng
 * của trường. Dùng khung điểm ưu tiên quốc gia hiện hành (Điều 7 Thông tư 06/2025/TT-BGDĐT) làm
 * judgment call cho GIÁ TRỊ bảng, cùng tiền lệ DLA/VTTU/TUEBA/PVU/HTU/TUMP/NAEM.
 */
export const HBU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const HBU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const HBU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const HBU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupHbuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? HBU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? HBU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculateHbuEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < HBU_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / HBU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
