import { round2 } from '../../core/round2';

/**
 * HAU 2026 — Điểm ưu tiên khu vực/đối tượng. Quyết định 406/QĐ-ĐHKT-ĐT (03/07/2026), Điều 1: "mức
 * điểm nhận hồ sơ xét tuyển là tổng điểm các môn trong tổ hợp xét tuyển, điểm ưu tiên và điểm cộng
 * (nếu có)" — không in bảng KV/ĐT riêng ⇒ áp Điều 7 Thông tư 06/2026/TT-BGDĐT (judgment call, cùng
 * tiền lệ `schools/utc`/`schools/ctu`): KV1 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0; nhóm ưu tiên 1
 * (ĐT 01-04) 2,0; nhóm ưu tiên 2 (ĐT 05-07) 1,0; công thức giảm khi tổng ≥ 22,5.
 */
export const HAU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const HAU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const HAU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const HAU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupHauStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? HAU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? HAU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateHauEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < HAU_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / HAU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
