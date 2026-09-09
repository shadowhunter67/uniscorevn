import { round2 } from '../../core/round2';

/**
 * HUPH 2026 — Thông tin tuyển sinh (mục 5.3.5) mô tả TRỰC TIẾP cơ chế: "Điểm ưu tiên là điểm ưu
 * tiên đối tượng, khu vực theo quy định của Bộ GDĐT, giảm dần khi [Điểm Môn 1 + Điểm Môn 2 + Điểm
 * Môn 3 + Điểm khuyến khích (nếu có)] từ 22,5 điểm trở lên theo quy chế tuyển sinh trình độ đại học
 * hiện hành" — nhưng KHÔNG in lại bảng mức. Giá trị lấy từ Điều 7 Thông tư 06/2026/TT-BGDĐT
 * (`sources.ts:huph-priority-national-2026`), judgment call cùng tiền lệ ULSA/EPU/HVU/HBU/VTTU.
 *
 * Khác các module trước ở MỐC GIẢM: HUPH quy định mốc 22,5 áp cho biểu thức ĐÃ CỘNG điểm khuyến
 * khích và ĐÃ áp trần 30 (`preP30`), không phải tổng thô 3 môn.
 */
export const HUPH_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const HUPH_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const HUPH_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const HUPH_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupHuphStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? HUPH_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? HUPH_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculateHuphEffectivePriority30(input: { prePriorityTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.prePriorityTotal30);
  if (pivot < HUPH_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / HUPH_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
