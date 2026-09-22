import { round2 } from '../../core/round2';

/** PDU 2026 — Điểm ưu tiên khu vực/đối tượng. Nguồn (`pdu-scheme-2026`) công bố nguyên văn công
 * thức giảm dần: "Tổng điểm ưu tiên = [(30 - Tổng điểm đạt được)/7,5] x Mức điểm ưu tiên quy định"
 * áp dụng cho thí sinh đạt tổng điểm từ 22,5 trở lên, và "Điểm ưu tiên bao gồm: điểm ưu tiên khu
 * vực + điểm ưu tiên đối tượng" — mức điểm cụ thể dẫn chiếu Phụ lục I, II Thông tư 06/2026/TT-BGDĐT
 * (khung quốc gia, KHÔNG phải judgment call — nguồn xác nhận có áp dụng, chỉ không in lại bảng số,
 * cùng tiền lệ `schools/dpd/priority.ts`, `schools/blu/priority.ts`). */
export const PDU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const PDU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const PDU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const PDU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupPduStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? PDU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? PDU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculatePduEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < PDU_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / PDU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
