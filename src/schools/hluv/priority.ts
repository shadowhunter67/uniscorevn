import { round2 } from '../../core/round2';

/**
 * HLUV 2025 — nguồn tổng hợp (`sources.ts:hluv-combination-2025`) trích công thức tự công bố "Điểm
 * xét tuyển = Tổng điểm 3 môn trong tổ hợp xét tuyển + Điểm ưu tiên" — xác nhận CÓ cộng điểm ưu
 * tiên vào điểm xét (so với điểm trúng tuyển công bố ở `thresholds.ts`). Mức điểm ưu tiên cụ thể
 * theo KV/ĐT KHÔNG được trường công bố riêng — dùng khung quốc gia hiện hành (Điều 7 Thông tư
 * 06/2025/TT-BGDĐT) làm judgment call cho GIÁ TRỊ bảng, cùng tiền lệ `schools/hump`, `schools/hat`.
 */
export const HLUV_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const HLUV_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const HLUV_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const HLUV_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupHluvStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? HLUV_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? HLUV_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculateHluvEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < HLUV_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / HLUV_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
