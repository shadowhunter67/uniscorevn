import { round2 } from '../../core/round2';

/**
 * PNTU 2026 — Điểm ưu tiên khu vực/đối tượng, phương thức xét tuyển kết quả thi TN THPT (mã 100).
 * Quyết định 671/QĐ-TĐHYKPNT (14/02/2026, đính kèm "Thông tin tuyển sinh đại học năm 2026",
 * `pntu-admission-2026`) mục 5.2 tự trích nguyên văn nguyên tắc + công thức giảm dần:
 *   "Đối tượng ưu tiên và khu vực ưu tiên được xác định theo văn bản hướng dẫn của Bộ Giáo dục và
 *   Đào tạo năm 2026. Tổng điểm ưu tiên: bao gồm điểm đối tượng ưu tiên và khu vực ưu tiên được
 *   tính theo thang điểm 10 (không nhân hệ số). Tổng điểm ưu tiên đối với thí sinh có tổng điểm tổ
 *   hợp môn xét tuyển đạt từ 22,5 trở lên (khi quy đổi về điểm theo thang 10 và tổng điểm 3 môn tối
 *   đa là 30) được xác định theo công thức sau: Điểm ưu tiên = [(30 – Tổng điểm tổ hợp môn xét
 *   tuyển đạt được)/7,5] × Tổng điểm đối tượng ưu tiên và khu vực ưu tiên được quy định theo quy
 *   chế tuyển sinh của Trường."
 * Mục 6 (nguyên tắc xét tuyển) xác nhận rõ: "Tổng điểm xét tuyển: là tổng điểm các bài thi theo tổ
 * hợp môn xét tuyển theo thang điểm 30 (không có hệ số), điểm cộng và tổng điểm ưu tiên (nếu có)
 * ... được so với ngưỡng đảm bảo chất lượng đầu vào" — nghĩa là điểm ưu tiên CỘNG vào tổng thô
 * trước khi so ngưỡng (cùng cách CTUMP, khác cách hiển thị tham khảo của HCMUE/VNUA). Mục 5.2 cũng
 * xác nhận "Trường không áp dụng điểm thưởng trong tuyển sinh năm 2026" — không có điểm cộng nào
 * để model (đóng khoảng trống, không phải thiếu dữ liệu).
 * Mức điểm ưu tiên khu vực/đối tượng cụ thể KHÔNG được in lại trong quyết định (chỉ dẫn chiếu "quy
 * chế tuyển sinh của Trường") — dùng mức chuẩn toàn quốc theo Thông tư 08/2022/TT-BGDĐT (sửa đổi
 * bởi TT 06/2025) như judgment call, cùng tiền lệ `schools/hcmue`, `schools/ctump`, `schools/vnua`:
 * KV1 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0; nhóm ưu tiên 1 (ĐT 01-04) 2,0; nhóm ưu tiên 2 (ĐT
 * 05-07) 1,0.
 */
export const PNTU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const PNTU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const PNTU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const PNTU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupPntuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? PNTU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? PNTU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculatePntuEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < PNTU_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / PNTU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
