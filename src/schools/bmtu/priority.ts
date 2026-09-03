import { round2 } from '../../core/round2';

/**
 * BMTU 2026 — Điểm ưu tiên (ƯT), phương thức thi TN THPT (mục 2.1 đề án): "Điểm ưu tiên (ƯT) =
 * Điểm ƯT Đối tượng + Điểm ƯT Khu vực xác định theo quy định của Quy chế tuyển sinh hiện hành."
 * Trường KHÔNG tự công bố bảng mức điểm ưu tiên khu vực/đối tượng cụ thể — dùng khung điểm ưu tiên
 * quốc gia hiện hành làm judgment call cho GIÁ TRỊ bảng (cùng tiền lệ DUMTP/CTUMP/TNUT/HTU/TUMP).
 * Công thức giảm dần cho thí sinh đạt tổng điểm cao (từ 22,5/30 trở lên) theo Điều 7 Thông tư
 * 06/2026/TT-BGDĐT (chính đề án BMTU dẫn chiếu văn bản này ở phần căn cứ ban hành) — cùng công thức
 * quốc gia mà DUMTP/CTUMP đã dùng.
 */
export const BMTU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const BMTU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const BMTU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const BMTU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupBmtuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? BMTU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? BMTU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculateBmtuEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < BMTU_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / BMTU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
