import { round2 } from '../../core/round2';

/** DPD 2026 — Điểm ưu tiên khu vực/đối tượng. Nguồn (`dpd-cutoff-2026`) nói RÕ: "Điểm trúng tuyển
 * là tổng điểm 3 môn theo tổ hợp xét tuyển... cộng điểm ưu tiên đối tượng, khu vực theo quy định
 * của Bộ Giáo dục và Đào tạo" — mức điểm cụ thể theo khung quốc gia (Điều 7 TT 06/2026/TT-BGDĐT),
 * KHÔNG phải judgment call (nguồn xác nhận có áp dụng, chỉ không in lại bảng số). */
export const DPD_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const DPD_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const DPD_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const DPD_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupDpdStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? DPD_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? DPD_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateDpdEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < DPD_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(
    0,
    round2(((30 - pivot) / DPD_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30)
  );
  return { effectivePriority30, reduced: true };
}
