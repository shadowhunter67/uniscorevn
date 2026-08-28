import { round2 } from '../../core/round2';

/**
 * DTU 2026 — Điểm ưu tiên khu vực/đối tượng. Trang tuyển sinh chính thức: "Điểm ưu tiên (theo khu
 * vực và đối tượng)" là số hạng trong công thức Điểm xét tuyển, nhưng dẫn chiếu "theo quy định
 * hiện hành của Quy chế tuyển sinh đại học hệ chính quy do Bộ GDĐT ban hành" — không in bảng KV/ĐT
 * riêng ⇒ áp Điều 7 Thông tư 06/2026/TT-BGDĐT (judgment call, cùng tiền lệ `schools/ctu`).
 */
export const DTU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const DTU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const DTU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const DTU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupDtuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? DTU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? DTU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateDtuEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < DTU_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / DTU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
