import { round2 } from '../../core/round2';

/** UKH 2026 — Điểm ưu tiên khu vực/đối tượng, Phụ lục IV của "Thông tin tuyển sinh năm 2026 (cập
 * nhật)" (`ukh-scheme-2026`) công bố ĐẦY ĐỦ bảng số (không phải judgment call/khung quốc gia thay
 * thế): Khu vực 1 = 0,75; Khu vực 2 nông thôn = 0,50; Khu vực 2 = 0,25; Khu vực 3 = 0,00; Đối tượng
 * Nhóm 1 = 2,00; Nhóm 2 = 1,00 — khớp đúng khung quốc gia hiện hành (TT 06/2026/TT-BGDĐT). Công thức
 * giảm dần cho thí sinh đạt tổng điểm từ 22,5/30 trở lên áp dụng theo quy định chung của Bộ (không
 * được UKH tự in lại trong tài liệu đã đọc, nhưng là quy tắc bắt buộc toàn ngành, cùng tiền lệ
 * `schools/dpd/priority.ts`, `schools/pdu/priority.ts`). */
export const UKH_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const UKH_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const UKH_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const UKH_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupUkhStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? UKH_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? UKH_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculateUkhEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < UKH_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / UKH_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
