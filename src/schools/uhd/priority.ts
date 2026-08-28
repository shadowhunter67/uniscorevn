import { round2 } from '../../core/round2';

/**
 * UHD 2026 — Điểm ưu tiên khu vực/đối tượng, phương thức xét kết quả thi TN THPT (PT100).
 * Quyết định 289/QĐ-ĐHHD (02/04/2026, "Thông tin tuyển sinh năm 2026", `uhd-quyet-dinh-289-2026`)
 * công bố công thức (trang 4): "Điểm xét tuyển = Điểm Môn 1 + Điểm Môn 2 + Điểm Môn 3 + Điểm UT"
 * (Điểm UT = điểm ưu tiên) — CỘNG vào tổng thô trước khi so ngưỡng, không chỉ hiển thị tham khảo.
 * Mục 5.5.d xác nhận rõ: "Việc sử dụng điểm ưu tiên khu vực, đối tượng để xét tuyển đảm bảo thống
 * nhất, đồng bộ với quy định về điểm ưu tiên do Bộ Giáo dục và Đào tạo quy định" — tức là ÁP DỤNG
 * ĐÚNG khung điểm ưu tiên quốc gia (Điều 7 Thông tư 08/2022/TT-BGDĐT, còn hiệu lực 2026 qua TT
 * 06/2025 sửa đổi), bao gồm cả công thức giảm dần khi tổng điểm đạt ngưỡng cao. Mục 5.2 xác nhận
 * "Điểm cộng: Nhà trường không áp dụng" — không có điểm cộng nào để model (đóng khoảng trống, KHÔNG
 * phải thiếu dữ liệu).
 * Mức điểm ưu tiên KV/ĐT cụ thể KHÔNG được UHD in lại thành bảng riêng (chỉ dẫn chiếu quy định Bộ)
 * — dùng mức chuẩn toàn quốc như judgment call, cùng tiền lệ `schools/hcmue`, `schools/ctump`,
 * `schools/vnua`, `schools/pntu`: KV1 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0; nhóm ưu tiên 1 (ĐT
 * 01-04) 2,0 / nhóm ưu tiên 2 (ĐT 05-07) 1,0; giảm tuyến tính khi tổng thô (thang 30) ≥ 22,5.
 */
export const UHD_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const UHD_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const UHD_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const UHD_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupUhdStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? UHD_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? UHD_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateUhdEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < UHD_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / UHD_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
