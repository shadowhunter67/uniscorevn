import { round2 } from '../../core/round2';

/**
 * DThU 2026 — Điểm ưu tiên khu vực/đối tượng cho phương thức xét kết quả thi TN THPT (PT100).
 * TRÍCH NGUYÊN VĂN Thông báo điểm sàn 09/07/2026 (`sources.ts:dthu-quality-threshold-2026`,
 * mục 1.3 + Lưu ý): áp dụng Điều 7 Thông tư 06/2026/TT-BGDĐT — KV1 0,75 / KV2-NT 0,5 / KV2 0,25 /
 * KV3 0; nhóm ưu tiên 1 (ĐT 01-04) 2,0; nhóm ưu tiên 2 (ĐT 05-07) 1,0; công thức giảm khi tổng
 * ≥ 22,5: "Điểm ưu tiên = [(30 – Tổng điểm đạt được)/7,5] × Mức điểm ưu tiên quy định tại khoản
 * 1, 2 Điều 7 của Thông tư 06/2026/TT-BGDĐT".
 */
export const DTHU_PRIORITY_REGION_POINTS_30: Record<string, number> = {
  KV1: 0.75,
  'KV2-NT': 0.5,
  KV2: 0.25,
  KV3: 0,
};

export const DTHU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = {
  UT1: 2,
  UT2: 1,
};

export const DTHU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const DTHU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupDthuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? DTHU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? DTHU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateDthuEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < DTHU_PRIORITY_REDUCTION_THRESHOLD_30) {
    return { effectivePriority30: input.standardPriority30, reduced: false };
  }
  const effectivePriority30 = Math.max(
    0,
    round2(((30 - pivot) / DTHU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30)
  );
  return { effectivePriority30, reduced: true };
}
