import { round2 } from '../../core/round2';

/**
 * HIU 2026 — Điểm ưu tiên khu vực/đối tượng. Nguồn (`sources.ts:hiu-quality-threshold-2026`)
 * không công bố bảng điểm ưu tiên riêng (`hiu-priority-bonus-table-not-found`) và ngưỡng 15/30
 * (nhóm standard) là điểm sàn nhận hồ sơ — nguồn không nói đã gồm ưu tiên, nên nhánh exact so
 * TỔNG THÔ với ngưỡng (thận trọng, cùng tiền lệ CTU/TGU/TDMU/HALONGU khi nguồn im lặng). Điểm ưu
 * tiên áp dụng Điều 7 Thông tư 06/2026/TT-BGDĐT (judgment call) chỉ để tính Điểm xét tuyển hiển
 * thị tham khảo.
 */
export const HIU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const HIU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const HIU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const HIU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupHiuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? HIU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? HIU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateHiuEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < HIU_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / HIU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
