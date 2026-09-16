import { round2 } from '../../core/round2';

/**
 * VNU-Luật 2026 — CÔNG THỨC giảm điểm ưu tiên đã được CHÍNH TRƯỜNG công bố (không phải judgment
 * call): "Điểm ưu tiên = [(30 - Tổng điểm đạt được)/7,5] × Mức điểm ưu tiên", áp dụng cho thí sinh
 * đạt từ 22,5/30 (`sources.ts:vnulaw-admission-notice-2026`) — khớp đúng ngưỡng 22,5 và số chia 7,5
 * dùng chung cho mọi trường khác trong dự án. Riêng bảng MỨC điểm ưu tiên theo khu vực/đối tượng cụ
 * thể (KV1/KV2-NT/KV2, UT1/UT2) vẫn lấy theo khung quốc gia hiện hành (Thông tư 06/2026/TT-BGDĐT,
 * quy chế chung Bộ GDĐT mà trường dẫn chiếu) vì trường không tự liệt kê lại bảng mức, cùng tiền lệ
 * MKU/HBU/DHV/HPU2/PYU/TNUE/TNUFL/DUT/DUE.
 */
export const VNULAW_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const VNULAW_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const VNULAW_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const VNULAW_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupVnulawStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? VNULAW_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? VNULAW_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculateVnulawEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < VNULAW_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / VNULAW_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
