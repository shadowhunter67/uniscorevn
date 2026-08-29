import { round2 } from '../../core/round2';

/**
 * LHU 2026 — Điểm ưu tiên khu vực/đối tượng cho phương thức xét điểm thi tốt nghiệp THPT.
 *
 * Thông báo tuyển sinh LHU (`sources.ts:lhu-threshold-2026`) chỉ công bố "Điểm môn 1 + Điểm môn 2
 * + Điểm môn 3 ≥ 15 điểm" — KHÔNG nhắc tới điểm ưu tiên khu vực/đối tượng theo hướng nào (không
 * loại trừ trực tiếp, cũng không xác nhận cộng vào). Áp đúng Quy chế tuyển sinh đại học hiện hành
 * (Điều 7 Thông tư 06/2026/TT-BGDĐT): KV1 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0 ; nhóm ưu tiên 1 2,0
 * ; nhóm ưu tiên 2 1,0 ; giảm tuyến tính khi tổng điểm (thang 30, chưa ưu tiên) đạt ≥ 22,5: ĐUT =
 * [(30 − tổng)/7,5] × Mức ưu tiên. Cùng judgment call đã áp dụng ở `schools/utm`, `schools/ctu`,
 * `schools/utc`, `schools/ptit`, `schools/hub`.
 */
export const LHU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const LHU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const LHU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const LHU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupLhuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? LHU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? LHU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateLhuEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < LHU_PRIORITY_REDUCTION_THRESHOLD_30) {
    return { effectivePriority30: input.standardPriority30, reduced: false };
  }
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / LHU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
