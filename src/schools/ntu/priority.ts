import { round2 } from '../../core/round2';

/**
 * NTU 2026 — Điểm ưu tiên khu vực/đối tượng, thang 40. NTU không in bảng mức điểm ưu tiên trên thang 40 và
 * không nêu trong các trang đã thu thập việc điểm trúng tuyển có gồm ưu tiên hay không. Dùng khung điểm ưu
 * tiên quốc gia (Thông tư 06/2026/TT-BGDĐT, Điều 7, định nghĩa trên thang 30) như judgment call, quy đổi sang
 * thang 40 bằng hệ số 4/3 và giả định điểm trúng tuyển là điểm xét tuyển đã gồm ưu tiên (định nghĩa của Bộ),
 * cùng tiền lệ `schools/hanu` và `schools/ajc` (thang 40).
 */
export const NTU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const NTU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const NTU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const NTU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupNtuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? NTU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? NTU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

/** `rawTotal40` là tổng điểm xét tuyển thô (đã nhân hệ số, đã quy đổi 50→40) trên thang 40. Công
 * thức giảm dần theo khung quốc gia áp trên thang 30 tương đương (×30/40) trước khi so mốc 22,5,
 * điểm ưu tiên hiệu lực trả về THEO THANG 30 — nhân 4/3 để quy sang thang 40 ở `evaluate.ts`. */
export function calculateNtuEffectivePriority30(input: { rawTotal40: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const rawTotal30Equivalent = (input.rawTotal40 * 30) / 40;
  const pivot = Math.min(30, rawTotal30Equivalent);
  if (pivot < NTU_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / NTU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
