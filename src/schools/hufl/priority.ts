import { round2 } from '../../core/round2';

/** HUFL 2026 — Điểm ưu tiên khu vực/đối tượng. Nguồn (`hufl-admission-info-2026`, mục III.3.1) nói
 * RÕ: với Phương thức 1 (thi TN THPT), "Điểm ưu tiên: áp dụng theo quy chế tuyển sinh năm của Bộ
 * GD&ĐT" — mức điểm cụ thể theo khung quốc gia (Điều 7 TT 06/2026/TT-BGDĐT), KHÔNG phải judgment
 * call (nguồn xác nhận có áp dụng, chỉ không in lại bảng số) — cùng khung/tiền lệ đã dùng ở
 * `schools/dpd/priority.ts`. */
export const HUFL_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const HUFL_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const HUFL_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const HUFL_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupHuflStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? HUFL_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? HUFL_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateHuflEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < HUFL_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(
    0,
    round2(((30 - pivot) / HUFL_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30)
  );
  return { effectivePriority30, reduced: true };
}
