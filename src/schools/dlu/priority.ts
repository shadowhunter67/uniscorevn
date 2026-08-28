import { round2 } from '../../core/round2';

/**
 * DLU 2026 — Điểm ưu tiên khu vực/đối tượng. Thông báo 1145/TB-ĐHĐL: "đã bao gồm điểm ưu tiên khu
 * vực và đối tượng (nếu thí sinh được hưởng chính sách ưu tiên khu vực và đối tượng theo Điều 7
 * của Quy chế tuyển sinh của Bộ Giáo dục và Đào tạo)" — không in bảng KV/ĐT riêng ⇒ áp Điều 7
 * Thông tư 06/2026/TT-BGDĐT (judgment call, cùng tiền lệ `schools/ctu`): KV1 0,75 / KV2-NT 0,5 /
 * KV2 0,25 / KV3 0; nhóm ưu tiên 1 (ĐT 01-04) 2,0; nhóm ưu tiên 2 (ĐT 05-07) 1,0; công thức giảm
 * khi tổng ≥ 22,5.
 */
export const DLU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const DLU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const DLU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const DLU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupDluStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? DLU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? DLU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateDluEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < DLU_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / DLU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
