import { round2 } from '../../core/round2';

/**
 * HCMUE 2026 — Điểm ưu tiên khu vực/đối tượng. Trang công thức chính thức (`sources.ts:hcmue-methods-2026`)
 * công bố ĐXT = M1 + M2 + M3 + ĐƯT (điểm ưu tiên đối tượng, khu vực) nhưng KHÔNG in bảng số điểm
 * ưu tiên riêng của trường. Áp dụng đúng Quy chế tuyển sinh đại học hiện hành (Điều 7 Thông tư
 * 08/2022/TT-BGDĐT còn hiệu lực 2026, giữ nguyên ở Thông tư 06/2026) như judgment call — cùng
 * tiền lệ `schools/ctu`, `schools/tbdu`, `schools/huce`, `schools/tgu`: KV1 0,75 / KV2-NT 0,5 /
 * KV2 0,25 / KV3 0; nhóm ưu tiên 1 (ĐT 01-04) 2,0; nhóm ưu tiên 2 (ĐT 05-07) 1,0; điểm ưu tiên
 * giảm tuyến tính khi tổng điểm (thang 30, chưa ưu tiên) đạt ≥ 22,5: ĐƯT = [(30 − tổng)/7,5] ×
 * Mức ưu tiên.
 */
export const HCMUE_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const HCMUE_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const HCMUE_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const HCMUE_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupHcmueStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? HCMUE_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? HCMUE_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateHcmueEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < HCMUE_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / HCMUE_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
