import { round2 } from '../../core/round2';

/**
 * HUST (Đại học Bách khoa Hà Nội) 2025 — công thức chính thức (`sources.ts:hust-formula-official-
 * 2025`) chỉ nêu "+ Điểm ưu tiên" trong công thức Điểm xét (ĐX), có footnote dẫn Thông tư 08/2022 +
 * 06/2025/TT-BGDĐT (khung điểm ưu tiên khu vực/đối tượng quốc gia + quy tắc giảm dần từ 22,5 điểm)
 * nhưng KHÔNG tự công bố mức điểm ưu tiên KV/ĐT cụ thể — dùng khung quốc gia hiện hành làm judgment
 * call cho GIÁ TRỊ bảng (cùng tiền lệ AOF/HUC). Ngưỡng/hệ số giảm dần áp trên TỔNG THÔ 3 môn (thang
 * 30, CHƯA nhân hệ số môn chính) theo đúng cách Thông tư 08 định nghĩa "tổng điểm 3 môn thi THPT",
 * độc lập với công thức trọng số riêng của HUST.
 */
export const HUST_PRIORITY_REGION_POINTS_30_2025: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const HUST_PRIORITY_CATEGORY_POINTS_30_2025: Record<string, number> = { UT1: 2, UT2: 1 };
export const HUST_PRIORITY_REDUCTION_THRESHOLD_30_2025 = 22.5;
export const HUST_PRIORITY_REDUCTION_DIVISOR_30_2025 = 7.5;

export function lookupHustStandardPriority30_2025(region: string | undefined, category: string | undefined): number {
  return (region ? HUST_PRIORITY_REGION_POINTS_30_2025[region] ?? 0 : 0) + (category ? HUST_PRIORITY_CATEGORY_POINTS_30_2025[category] ?? 0 : 0);
}

export function calculateHustEffectivePriority30_2025(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < HUST_PRIORITY_REDUCTION_THRESHOLD_30_2025) {
    return { effectivePriority30: input.standardPriority30, reduced: false };
  }
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / HUST_PRIORITY_REDUCTION_DIVISOR_30_2025) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
