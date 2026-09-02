import { round2 } from '../../core/round2';

/**
 * TMU 2025 — nguồn (`sources.ts:tmu-threshold-2025`) xác nhận TRỰC TIẾP điểm ưu tiên khu vực/đối
 * tượng ĐƯỢC CỘNG vào tổng điểm trước khi so với ngưỡng đảm bảo chất lượng đầu vào ("phải đạt từ
 * 20 điểm trở lên ... đã bao gồm điểm ưu tiên đối tượng, ưu tiên khu vực"), nhưng KHÔNG công bố
 * mức điểm ưu tiên cụ thể cho từng khu vực/đối tượng — dùng khung quốc gia hiện hành (Điều 7 Thông
 * tư 06/2025/TT-BGDĐT, judgment call cho GIÁ TRỊ bảng, không phải cho việc CÓ áp dụng điểm ưu tiên
 * hay không) — cùng tiền lệ `schools/hou`, `schools/hdiu`, `schools/phenikaa`, `schools/haui`.
 */
export const TMU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const TMU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const TMU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const TMU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupTmuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? TMU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? TMU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculateTmuEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < TMU_PRIORITY_REDUCTION_THRESHOLD_30) {
    return { effectivePriority30: input.standardPriority30, reduced: false };
  }
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / TMU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
