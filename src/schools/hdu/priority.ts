import { round2 } from '../../core/round2';

/**
 * Điểm ưu tiên khu vực/đối tượng HDU 2026 — mục 7.1 "Điểm ưu tiên khu vực, đối tượng: Thực hiện
 * theo quy định của Bộ GDĐT" (`hdu-admission-2026`). Áp Điều 7 quy chế hiện hành (Thông tư
 * 06/2026/TT-BGDĐT): KV1 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0; nhóm ưu tiên 1 (ĐT 01-04) 2,0;
 * nhóm ưu tiên 2 (ĐT 05-07) 1,0. Worked example của HDU dùng KV2-NT = 0,5 và ĐT06 = 1,0 → khớp.
 *
 * Công thức giảm (mục 7.5.b): khi (A + B) > 22,5 thì ĐƯT = [(30 − A − B)/7,5] × Mức điểm ưu tiên.
 */
export const HDU_PRIORITY_REGION_POINTS_30: Record<string, number> = {
  KV1: 0.75,
  'KV2-NT': 0.5,
  KV2: 0.25,
  KV3: 0,
};

export const HDU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = {
  UT1: 2,
  UT2: 1,
};

export function lookupHduStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? (HDU_PRIORITY_REGION_POINTS_30[region] ?? 0) : 0) + (category ? (HDU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0) : 0);
}

/** Pivot = tổng điểm thí sinh đạt được (A + B, đã kẹp trần 30). Giảm khi pivot > 22,5. */
export function calculateHduEffectivePriority30(input: { totalBeforePriority30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.totalBeforePriority30);
  if (pivot <= 22.5) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / 7.5) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
