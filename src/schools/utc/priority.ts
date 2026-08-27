import { round2 } from '../../core/round2';

/**
 * UTC 2026 — Điểm ưu tiên khu vực/đối tượng. Nguồn: "THÔNG TIN TUYỂN SINH ĐẠI HỌC HỆ CHÍNH QUY
 * 2026" (`sources.ts:utc-admission-info-2026`) — "điểm ưu tiên, điểm cộng được tính theo quy chế
 * tuyển sinh hiện hành" / "Theo quy định của Bộ GD&ĐT".
 *
 * Trang UTC KHÔNG in bảng KV/ĐT và công thức giảm — dùng đúng Quy chế tuyển sinh đại học hiện hành
 * (Điều 7 Thông tư 08/2022/TT-BGDĐT còn hiệu lực 2026): KV1 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0 ;
 * nhóm ưu tiên 1 (ĐT 01-04) 2,0 ; nhóm ưu tiên 2 (ĐT 05-07) 1,0 ; và ĐUT giảm khi tổng ≥ 22,5:
 * ĐUT = [(30 − (ĐHL + ĐC))/7,5] × Mức điểm ưu tiên. (Cùng công thức được in nguyên văn trên trang
 * tuyển sinh của các trường khác trong hệ ĐHQGHN — xem `schools/vnulaw`.)
 */
export const UTC_PRIORITY_REGION_POINTS_30: Record<string, number> = {
  KV1: 0.75,
  'KV2-NT': 0.5,
  KV2: 0.25,
  KV3: 0,
};

export const UTC_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = {
  UT1: 2,
  UT2: 1,
};

export const UTC_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const UTC_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupUtcStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? UTC_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? UTC_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateUtcEffectivePriority30(input: { academicPlusBonus30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.academicPlusBonus30);
  if (pivot < UTC_PRIORITY_REDUCTION_THRESHOLD_30) {
    return { effectivePriority30: input.standardPriority30, reduced: false };
  }
  const effectivePriority30 = Math.max(
    0,
    round2(((30 - pivot) / UTC_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30)
  );
  return { effectivePriority30, reduced: true };
}
