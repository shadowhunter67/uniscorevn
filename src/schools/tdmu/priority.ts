import { round2 } from '../../core/round2';

/**
 * TDMU 2026 — Điểm ưu tiên khu vực/đối tượng. Nguồn (`sources.ts:tdmu-quality-threshold-2026`)
 * không công bố bảng điểm ưu tiên riêng của trường (xem `knowledgeGaps.ts:tdmu-priority-bonus-table-not-found`)
 * và "ngưỡng đảm bảo chất lượng đầu vào" công bố là điểm SÀN NHẬN HỒ SƠ (so raw, không cộng ưu
 * tiên) — nhưng Điểm xét tuyển hiển thị (để tham khảo, không dùng để so ngưỡng) áp dụng Điều 7
 * Thông tư 06/2026/TT-BGDĐT (judgment call, cùng tiền lệ `schools/ctu`, `schools/tgu`): KV1 0,75 /
 * KV2-NT 0,5 / KV2 0,25 / KV3 0; nhóm ưu tiên 1 (ĐT 01-04) 2,0; nhóm ưu tiên 2 (ĐT 05-07) 1,0; công
 * thức giảm khi tổng ≥ 22,5.
 */
export const TDMU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const TDMU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const TDMU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const TDMU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupTdmuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? TDMU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? TDMU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateTdmuEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < TDMU_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / TDMU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
