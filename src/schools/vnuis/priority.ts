import { round2 } from '../../core/round2';

/**
 * VNU-IS 2026 — mục 4.2 "Điểm ưu tiên đối tượng / khu vực" công bố nguyên văn ĐẦY ĐỦ bảng mức điểm
 * ưu tiên (không phải judgment call): "Khu vực 1 (KV1): cộng 0,75 điểm; Khu vực 2 nông thôn (KV2-
 * NT): cộng 0,5 điểm; Khu vực 2 (KV2): cộng 0,25 điểm; Khu vực 3 (KV3): không có điểm ưu tiên." và
 * "Nhóm đối tượng UT1 (đối tượng 01 đến 03): cộng 2,0 điểm; Nhóm đối tượng UT2 (đối tượng 04 đến
 * 06): cộng 1,0 điểm." (khớp khung quốc gia hiện hành), kèm công thức giảm dần từ 22,5/30: "Điểm ưu
 * tiên = [(30 – Tổng điểm đạt được) / 7,5] x Mức điểm ưu tiên theo quy định".
 */
export const VNUIS_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const VNUIS_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const VNUIS_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const VNUIS_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupVnuisStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? VNUIS_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? VNUIS_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateVnuisEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < VNUIS_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(
    0,
    round2(((30 - pivot) / VNUIS_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30)
  );
  return { effectivePriority30, reduced: true };
}
