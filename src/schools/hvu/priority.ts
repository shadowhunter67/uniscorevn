import { round2 } from '../../core/round2';

/**
 * HVU 2026 — trường KHÔNG tự công bố bảng mức điểm ưu tiên khu vực/đối tượng riêng, Quyết định
 * 226/QĐ-ĐHHV mục 5.2 chỉ dẫn chiếu "Quy chế tuyển sinh hiện hành" (Thông tư 06/2026/TT-BGDĐT).
 * Dùng nguyên văn Điều 7 Thông tư 06/2026 (đã đọc trực tiếp PDF gốc, xem `sources.ts:hvu-priority-
 * national-2026`) — GIÁ TRỊ/CÔNG THỨC giống hệt Thông tư 06/2025 đã dùng cho HBU/VTTU/DLA/PVU/HTU/
 * TUMP/NAEM (Điều 7 không đổi giữa 2 năm).
 */
export const HVU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const HVU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const HVU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const HVU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupHvuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? HVU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? HVU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculateHvuEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < HVU_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / HVU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
