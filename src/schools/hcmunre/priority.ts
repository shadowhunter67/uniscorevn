import { round2 } from '../../core/round2';

/**
 * HCMUNRE 2026 — trang chính thức "Thông báo ngưỡng chất lượng đầu vào..." xác nhận Điểm xét tuyển
 * Phương thức 1 = tổng điểm 3 môn thi + điểm ưu tiên đối tượng, khu vực (nếu có), nhưng KHÔNG công
 * bố bảng mức điểm ưu tiên cụ thể theo từng khu vực/đối tượng — dùng khung điểm ưu tiên quốc gia
 * hiện hành (Thông tư 06/2025/TT-BGDĐT) làm judgment call cho toàn bộ bảng, cùng tiền lệ nhiều
 * trường khác trong hệ thống khi trường không tự công bố bảng riêng (`schools/blu`, `schools/hluv`).
 */
export const HCMUNRE_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const HCMUNRE_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const HCMUNRE_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const HCMUNRE_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupHcmunreStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? HCMUNRE_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? HCMUNRE_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateHcmunreEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < HCMUNRE_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(
    0,
    round2(((30 - pivot) / HCMUNRE_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30)
  );
  return { effectivePriority30, reduced: true };
}
