/**
 * TNUFL (Trường Ngoại ngữ - Đại học Thái Nguyên) 2026 — điểm chuẩn trúng tuyển 2/5 ngành, nhánh xét
 * kết quả thi TN THPT 2026, đọc trực tiếp từ trang chính thức hệ thống Đại học Thái Nguyên (tnu.edu.vn,
 * `sources.ts:tnufl-cutoff-2026`) — số liệu đã có sẵn từ nghiên cứu trước (không cần vision, đọc text
 * prose trực tiếp).
 *
 * CHỈ mô hình hoá 2/5 ngành liên quan Tiếng Anh (Ngôn ngữ Anh, Sư phạm Tiếng Anh) — 3 ngành còn lại
 * (Ngôn ngữ Trung Quốc, Ngôn ngữ Hàn Quốc, Sư phạm Tiếng Trung Quốc) dùng điểm thi ngoại ngữ
 * Trung/Hàn làm 1 trong 3 môn tổ hợp, KHÔNG có SubjectId tương ứng trong hệ thống (chỉ có 'english'
 * là ngoại ngữ duy nhất trong danh mục môn) — không mô hình hoá, xem `knowledgeGaps.ts`.
 *
 * Tổ hợp: trang chính thức "Trường Ngoại ngữ – ĐHTN công bố phương thức xét tuyển theo kết quả thi
 * TN THPT năm 2026" liệt kê 8 tổ hợp toàn trường (D01, D04, D14, D65, D15, D45, X78, X90) — D04/D65/
 * D45/X90 dùng ngoại ngữ Trung/Hàn, không khớp SubjectId. Giữ 4 tổ hợp khớp: D01, D14, D15, X78 (đều
 * có thành phần Tiếng Anh). Không có xác nhận RIÊNG cho 2 ngành này dùng đúng tập con nào trong 4 tổ
 * hợp — chấp nhận cả 4, cùng cách xử lý DHV (trường không giới hạn tổ hợp theo ngành cụ thể).
 */
export interface TnuflFieldThreshold {
  code: string;
  name: string;
  threshold30: number;
}

export const TNUFL_FIELD_THRESHOLDS_2026: readonly TnuflFieldThreshold[] = [
  { code: '7220201', name: 'Ngôn ngữ Anh', threshold30: 18.2 },
  { code: '7140231', name: 'Sư phạm Tiếng Anh', threshold30: 25.6 },
] as const;

export const TNUFL_ACCEPTED_COMBINATION_IDS: readonly string[] = ['D01', 'D14', 'D15', 'X78'];

export type TnuflFieldCode = (typeof TNUFL_FIELD_THRESHOLDS_2026)[number]['code'];

export const TNUFL_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, TnuflFieldThreshold> = new Map(
  TNUFL_FIELD_THRESHOLDS_2026.map((entry) => [entry.code, entry])
);
