import { round2 } from '../../core/round2';

/**
 * TBU 2026 — Điểm ưu tiên khu vực/đối tượng, phương thức PT1 (xét kết quả thi TN THPT). Thông báo
 * 565/TB-ĐHTB (19/3/2026, `tbu-thongbao-565-2026`) mục 3.1.1 xác nhận: "Điểm xét tuyển là tổng
 * điểm 03 môn của tổ hợp đăng ký xét tuyển và điểm ưu tiên, điểm cộng (nếu có)" — điểm ưu tiên
 * CỘNG vào tổng thô trước khi so ngưỡng. Mục 4.1 xác nhận: "Ưu tiên theo đối tượng xét tuyển và
 * khu vực xét tuyển: Thực hiện theo quy định của Bộ GD&ĐT" — áp dụng ĐÚNG khung điểm ưu tiên quốc
 * gia (Điều 7 Thông tư 08/2022/TT-BGDĐT, còn hiệu lực 2026 qua TT 06/2026 sửa đổi).
 * Mức điểm ưu tiên KV/ĐT cụ thể KHÔNG được TBU in lại thành bảng riêng (chỉ dẫn chiếu quy định Bộ)
 * — dùng mức chuẩn toàn quốc như judgment call, cùng tiền lệ `schools/hcmue`, `schools/ctump`,
 * `schools/vnua`, `schools/pntu`, `schools/uhd`, `schools/apd`: KV1 0,75 / KV2-NT 0,5 / KV2 0,25 /
 * KV3 0; nhóm ưu tiên 1 (ĐT 01-04) 2,0 / nhóm ưu tiên 2 (ĐT 05-07) 1,0; giảm tuyến tính khi tổng
 * thô (thang 30) ≥ 22,5.
 */
export const TBU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const TBU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const TBU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const TBU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupTbuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? TBU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? TBU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateTbuEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < TBU_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / TBU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
