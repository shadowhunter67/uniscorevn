import { round2 } from '../../core/round2';

/**
 * LTVUni 2026 — Điểm ưu tiên khu vực/đối tượng, phương thức xét điểm thi TN THPT (Phương thức 100).
 * Thông báo 269/TB-ĐHLTV (09/07/2026, đọc trực tiếp từ PDF chính thức đính kèm — bản scan, đọc qua
 * vision) mục B.1.a, trang 4: "Điểm xét tuyển = Điểm môn 1 + Điểm môn 2 + Điểm môn 3 + điểm ƯT (nếu
 * có)", "Điểm ƯT là điểm ưu tiên khu vực, đối tượng (nếu có) và được tính theo quy chế tuyển sinh
 * hiện hành" — tức là CỘNG vào tổng thô trước khi so ngưỡng, áp dụng đúng khung điểm ưu tiên quốc
 * gia hiện hành (Thông tư 06/2026/TT-BGDĐT), không phải điểm tham khảo. Mức điểm ưu tiên KV/ĐT cụ
 * thể KHÔNG được LTVUni in lại thành bảng riêng — dùng mức chuẩn toàn quốc như judgment call, cùng
 * tiền lệ `schools/uhd`, `schools/hcmue`, `schools/ctump`, `schools/vnua`, `schools/pntu`: KV1 0,75
 * / KV2-NT 0,5 / KV2 0,25 / KV3 0; nhóm ưu tiên 1 (ĐT 01-04) 2,0 / nhóm ưu tiên 2 (ĐT 05-07) 1,0;
 * giảm tuyến tính khi tổng thô (thang 30) ≥ 22,5. Trang 1 xác nhận ngưỡng theo ngành (bảng A.1.b)
 * KHÔNG tính điểm cộng — LTVUni không công bố điểm cộng nào cho phương thức 100 (đóng khoảng
 * trống, không phải thiếu dữ liệu).
 */
export const LTVUNI_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const LTVUNI_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const LTVUNI_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const LTVUNI_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupLtvuniStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? LTVUNI_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? LTVUNI_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateLtvuniEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < LTVUNI_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / LTVUNI_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
