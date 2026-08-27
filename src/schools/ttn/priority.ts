import { round2 } from '../../core/round2';

/**
 * TTN 2026 — Điểm ưu tiên khu vực/đối tượng. Thông báo mức điểm nhận hồ sơ 2026 (mục 3.1): "Thí
 * sinh ở các khu vực khác được tính điểm ưu tiên xét tuyển theo quy định của quy chế tuyển sinh
 * khi xác định ngưỡng đảm bảo chất lượng đầu vào" — áp Điều 7 Thông tư 06/2026/TT-BGDĐT: KV1 0,75
 * / KV2-NT 0,5 / KV2 0,25 / KV3 0; nhóm ưu tiên 1 (ĐT 01-04) 2,0; nhóm ưu tiên 2 (ĐT 05-07) 1,0;
 * công thức giảm khi tổng ≥ 22,5: Điểm ưu tiên = [(30 − Tổng điểm đạt được)/7,5] × Mức ưu tiên.
 */
export const TTN_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const TTN_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const TTN_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const TTN_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupTtnStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? TTN_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? TTN_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateTtnEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < TTN_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / TTN_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
