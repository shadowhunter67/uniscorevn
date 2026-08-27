import { round2 } from '../../core/round2';

/**
 * Điểm ưu tiên khu vực/đối tượng HUB 2026. Nguồn `hub-quality-threshold-2026` (mục II) chỉ ghi
 * "điểm ưu tiên (khu vực, đối tượng, thang 30 theo quy định)" ⇒ áp Điều 7 quy chế hiện hành
 * (Thông tư 06/2026/TT-BGDĐT): KV1 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0; nhóm ưu tiên 1 (ĐT 01-04)
 * 2,0; nhóm ưu tiên 2 (ĐT 05-07) 1,0; giảm tuyến tính khi tổng điểm đạt được ≥ 22,5/30.
 * Cùng judgment call như `schools/utc` / `schools/ptit` / `schools/vinhuni`.
 */
export const HUB_PRIORITY_REGION_POINTS_30: Record<string, number> = {
  KV1: 0.75,
  'KV2-NT': 0.5,
  KV2: 0.25,
  KV3: 0,
};

export const HUB_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = {
  UT1: 2,
  UT2: 1,
};

export function lookupHubStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? (HUB_PRIORITY_REGION_POINTS_30[region] ?? 0) : 0) + (category ? (HUB_PRIORITY_CATEGORY_POINTS_30[category] ?? 0) : 0);
}

export function calculateHubEffectivePriority30(input: { academicScore30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.academicScore30);
  if (pivot < 22.5) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / 7.5) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
