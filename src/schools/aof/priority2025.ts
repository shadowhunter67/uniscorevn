import { round2 } from '../../core/round2';

/**
 * AOF (Học viện Tài chính) 2025 — nguồn (`sources.ts:aof-threshold-secondary-2025`) xác nhận TRỰC
 * TIẾP điểm chuẩn "tổng điểm các môn xét tuyển + điểm ưu tiên nếu có" — KHÔNG cần judgment call cho
 * việc CÓ cộng ưu tiên hay không (giống VNU-UET/HUNRE/HUMP). Mức điểm ưu tiên cụ thể theo KV/ĐT
 * KHÔNG được trường công bố riêng — dùng khung quốc gia hiện hành (Điều 7 Thông tư 06/2025/
 * TT-BGDĐT) làm judgment call cho GIÁ TRỊ bảng.
 */
export const AOF_PRIORITY_REGION_POINTS_30_2025: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const AOF_PRIORITY_CATEGORY_POINTS_30_2025: Record<string, number> = { UT1: 2, UT2: 1 };
export const AOF_PRIORITY_REDUCTION_THRESHOLD_30_2025 = 22.5;
export const AOF_PRIORITY_REDUCTION_DIVISOR_30_2025 = 7.5;

export function lookupAofStandardPriority30_2025(region: string | undefined, category: string | undefined): number {
  return (region ? AOF_PRIORITY_REGION_POINTS_30_2025[region] ?? 0 : 0) + (category ? AOF_PRIORITY_CATEGORY_POINTS_30_2025[category] ?? 0 : 0);
}

export function calculateAofEffectivePriority30_2025(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < AOF_PRIORITY_REDUCTION_THRESHOLD_30_2025) {
    return { effectivePriority30: input.standardPriority30, reduced: false };
  }
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / AOF_PRIORITY_REDUCTION_DIVISOR_30_2025) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
