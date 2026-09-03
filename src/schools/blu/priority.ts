import { round2 } from '../../core/round2';

/**
 * BLU (Trường Đại học Bạc Liêu) 2026 — trang "Chính sách ưu tiên trong tuyển sinh" (`sources.ts:
 * blu-priority-2026`) công bố nguyên văn công thức "Mức điểm ưu tiên = Mức điểm ưu tiên khu vực +
 * Mức điểm ưu tiên đối tượng" kèm ví dụ minh hoạ xác nhận mức KV1 = 0,75 và mức nhóm đối tượng ưu
 * tiên 2 = 1,00 — khớp khung điểm ưu tiên quốc gia hiện hành (Thông tư 06/2025/TT-BGDĐT). Bảng đầy
 * đủ theo từng khu vực/đối tượng nằm trong ảnh minh hoạ không đọc được số liệu riêng ngoài 2 mức đã
 * xác nhận qua ví dụ — dùng khung quốc gia hiện hành cho toàn bộ bảng (cùng tiền lệ `schools/hluv`,
 * `schools/hat`, `schools/hump`).
 */
export const BLU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const BLU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const BLU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const BLU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupBluStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? BLU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? BLU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculateBluEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < BLU_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / BLU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
