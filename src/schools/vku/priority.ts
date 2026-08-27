import { round2 } from '../../core/round2';

/**
 * VKU 2026 — Điểm ưu tiên khu vực/đối tượng. Nguồn: PDF "Thông tin tuyển sinh năm 2026"
 * (`sources.ts:vku-admission-info-2026`), Mục 5.2.b, trích nguyên văn:
 *
 *   "Điểm ưu tiên: Theo quy định trong 'Quy chế tuyển sinh...' ban hành kèm theo Thông tư
 *    06/2026/TT-BGDĐT của Bộ trưởng Bộ GDĐT ngày 15/02/2026..."
 *   "+ Điểm ưu tiên được làm tròn đến 2 chữ số thập phân."
 *   "+ Điểm ưu tiên đối với thí sinh đạt tổng điểm từ 22,50 trở lên ... được làm tròn đến hàng
 *    phần trăm và xác định theo công thức sau:
 *    Điểm ưu tiên = [(30 - (Điểm quy đổi + Điểm cộng))/7,5] x Mức điểm ưu tiên theo quy định"
 *
 * Mức điểm ưu tiên KV/ĐT theo Thông tư 06/2026/TT-BGDĐT (thang 30): KV1 0,75 / KV2-NT 0,5 /
 * KV2 0,25 / KV3 0 ; nhóm ưu tiên 1 (đối tượng 01-04) 2,0 ; nhóm ưu tiên 2 (đối tượng 05-07) 1,0.
 */
export const VKU_PRIORITY_REGION_POINTS_30: Record<string, number> = {
  KV1: 0.75,
  'KV2-NT': 0.5,
  KV2: 0.25,
  KV3: 0,
};

export const VKU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = {
  UT1: 2,
  UT2: 1,
};

export const VKU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const VKU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupVkuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? VKU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? VKU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

/**
 * ĐUT hiệu dụng. Pivot của công thức giảm là "Điểm quy đổi + Điểm cộng" (điểm học lực 60/40 + điểm
 * cộng), KHÔNG gồm điểm ưu tiên. Nếu pivot < 22,5: giữ nguyên mức ưu tiên. Nếu ≥ 22,5:
 * ĐUT = [(30 − pivot)/7,5] × mức, làm tròn 2 chữ số, không âm.
 */
export function calculateVkuEffectivePriority30(input: { academicPlusBonus30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.academicPlusBonus30);
  if (pivot < VKU_PRIORITY_REDUCTION_THRESHOLD_30) {
    return { effectivePriority30: input.standardPriority30, reduced: false };
  }
  const effectivePriority30 = Math.max(
    0,
    round2(((30 - pivot) / VKU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30)
  );
  return { effectivePriority30, reduced: true };
}
