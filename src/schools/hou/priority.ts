import { round2 } from '../../core/round2';

/**
 * HOU 2026 — nguồn (`sources.ts:hou-threshold-2026`) xác nhận TRỰC TIẾP điểm ưu tiên khu vực/đối
 * tượng ĐƯỢC CỘNG vào tổng điểm trước khi so với ngưỡng bảo đảm chất lượng đầu vào ("tổng điểm các
 * môn thi/bài thi trong tổ hợp xét tuyển CỘNG điểm ưu tiên khu vực, ưu tiên đối tượng"), nhưng
 * KHÔNG công bố mức điểm ưu tiên cụ thể cho từng khu vực/đối tượng — dùng khung quốc gia hiện hành
 * (Điều 7 Thông tư 06/2026/TT-BGDĐT, judgment call cho GIÁ TRỊ bảng, không phải cho việc CÓ áp
 * dụng điểm ưu tiên hay không) — cùng tiền lệ `schools/phenikaa`, `schools/haui`, `schools/ctu`.
 */
export const HOU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const HOU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const HOU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const HOU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupHouStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? HOU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? HOU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateHouEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < HOU_PRIORITY_REDUCTION_THRESHOLD_30) {
    return { effectivePriority30: input.standardPriority30, reduced: false };
  }
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / HOU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
