import { round2 } from '../../core/round2';

/**
 * HLU 2026 — Điểm ưu tiên khu vực/đối tượng, TRÍCH NGUYÊN VĂN Điều 7 Quy chế tuyển sinh trình độ
 * đại học của Trường Đại học Luật Hà Nội (QĐ 633/QĐ-ĐHLHN, 26/03/2026 —
 * `sources.ts:hlu-quyche-2026`):
 * - Khoản 1: KV1 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0 điểm.
 * - Khoản 2: nhóm ưu tiên 1 (đối tượng 01-04) 2,0 điểm; nhóm ưu tiên 2 (đối tượng 05-07) 1,0
 *   điểm; thí sinh nhiều diện chỉ tính một mức cao nhất.
 * - Khoản 4: "Điểm ưu tiên đối với thí sinh đạt tổng điểm từ 22,5 trở lên (khi quy đổi về điểm
 *   theo thang 10 và tổng điểm 3 môn tối đa là 30) được xác định theo công thức:
 *   Điểm ưu tiên = [(30 − Tổng điểm đạt được)/7,5] × Mức điểm ưu tiên quy định tại khoản 1, 2".
 */
export const HLU_PRIORITY_REGION_POINTS_30: Record<string, number> = {
  KV1: 0.75,
  'KV2-NT': 0.5,
  KV2: 0.25,
  KV3: 0,
};

export const HLU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = {
  UT1: 2,
  UT2: 1,
};

export const HLU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const HLU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupHluStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? HLU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? HLU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateHluEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < HLU_PRIORITY_REDUCTION_THRESHOLD_30) {
    return { effectivePriority30: input.standardPriority30, reduced: false };
  }
  const effectivePriority30 = Math.max(
    0,
    round2(((30 - pivot) / HLU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30)
  );
  return { effectivePriority30, reduced: true };
}
