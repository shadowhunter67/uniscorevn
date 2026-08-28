import { round2 } from '../../core/round2';

/**
 * CTUMP 2026 — Điểm ưu tiên khu vực/đối tượng, phương thức xét kết quả thi TN THPT (mục II.1,
 * Thông báo 197/TB-ĐHYDCT). Nguồn TỰ TRÍCH công thức giảm dần điểm ưu tiên nguyên văn:
 * "Điểm ưu tiên = [(30 – Tổng điểm)/7,50] × Mức điểm ưu tiên quy định", áp dụng khi tổng điểm
 * đạt được (thang 30) ≥ 22,5 — khớp công thức quốc gia Điều 7 TT 06/2026. CTUMP KHÔNG in lại bảng
 * mức điểm ưu tiên khu vực/đối tượng cụ thể trong Thông báo 197 — áp dụng mức chuẩn toàn quốc
 * (judgment call, cùng tiền lệ `schools/hcmue`, `schools/tbdu`, `schools/ctu`, `schools/huce`):
 * KV1 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0; nhóm ưu tiên 1 (ĐT 01-04) 2,0; nhóm ưu tiên 2 (ĐT
 * 05-07) 1,0.
 *
 * QUAN TRỌNG — khác HCMUE: Thông báo 197/TB-ĐHYDCT nói rõ mức điểm tối thiểu xét tuyển đợt 1
 * (ngưỡng 4 nhóm ngành) ĐÃ BAO GỒM điểm ưu tiên khu vực/đối tượng, nên ở CTUMP điểm ưu tiên hiệu
 * lực được CỘNG VÀO tổng điểm thô trước khi so ngưỡng (không chỉ hiển thị tham khảo như HCMUE).
 */
export const CTUMP_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const CTUMP_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const CTUMP_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const CTUMP_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupCtumpStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? CTUMP_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? CTUMP_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateCtumpEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < CTUMP_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / CTUMP_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
