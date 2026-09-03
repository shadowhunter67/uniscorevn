import { round2 } from '../../core/round2';

/**
 * DLA 2026 — trường KHÔNG tự công bố bảng mức điểm ưu tiên riêng theo khu vực/đối tượng; bài "Điểm
 * cộng chi tiết cho thí sinh đạt 22,5 điểm trở lên" (`sources.ts:dla-priority-note-2026`) chỉ diễn
 * giải lại quy định giảm dần điểm ưu tiên của Bộ GD&ĐT (áp dụng từ 2023, Thông tư 06/2025/TT-BGDĐT
 * hiện hành). Dùng khung điểm ưu tiên quốc gia hiện hành làm judgment call cho GIÁ TRỊ bảng, cùng
 * tiền lệ DNU/TUEBA/PVU/HTU/TUMP/NAEM.
 */
export const DLA_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const DLA_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const DLA_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const DLA_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupDlaStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? DLA_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? DLA_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculateDlaEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < DLA_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / DLA_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
