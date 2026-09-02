/**
 * Trường Đại học Giáo dục - ĐHQGHN (VNU-UED) 2025 — điểm chuẩn 10/11 ngành/nhóm ngành đại học
 * chính quy, nhánh xét điểm thi TN THPT, công bố 22-23/08/2025. Nguồn chính: tuyensinh247
 * (`sources.ts:vnued-threshold-2025`, bảng đầy đủ theo ngành + tổ hợp), cross-check dải điểm với
 * VnExpress (`vnued-threshold-secondary-2025`, dải 25,37-29,84 khớp). Cổng chính thức
 * (education.vnu.edu.vn) xác nhận có thông báo nhưng bảng chỉ hiển thị dạng ảnh, không đọc được
 * bằng text extraction (cùng tình huống HPMU/VNU-UEB).
 *
 * tuyensinh247 trích nguyên văn: "Điểm chuẩn dưới đây là tổng điểm các môn xét tuyển + điểm ưu
 * tiên nếu có" — xác nhận TRỰC TIẾP điểm chuẩn ĐÃ CỘNG điểm ưu tiên. Mức điểm ưu tiên cụ thể không
 * được trường công bố — dùng khung quốc gia hiện hành làm judgment call cho giá trị bảng.
 *
 * Mã ngành dùng bảng mã ngành đào tạo trình độ đại học chuẩn quốc gia (Bộ GD&ĐT) — KHÔNG dùng mã
 * nội bộ trường (QHSxx) để tránh suy đoán mapping không chắc chắn.
 *
 * KHÔNG mô hình hoá nhóm "Khoa học giáo dục và khác" (25,57) — đây là 1 NHÓM ngành gộp nhiều
 * chuyên ngành nhỏ (quản lý giáo dục, công nghệ giáo dục...), không xác định được MỘT mã ngành cụ
 * thể tương ứng — 10/11 ngành còn lại đều có mã ngành đào tạo chuẩn quốc gia rõ ràng.
 */
export interface VnuedFieldThreshold {
  code: string;
  /** Tên ngành đúng nguyên văn bảng điểm chuẩn. */
  name: string;
  /** Điểm chuẩn 2025 (thang 30, ĐÃ gồm điểm ưu tiên) — nhánh thi TN THPT. */
  threshold30: number;
  /** Tổ hợp môn xét tuyển áp dụng cho ngành này (mã tổ hợp quốc gia). */
  combinationIds: readonly string[];
}

export const VNUED_FIELD_THRESHOLDS_2025 = [
  { code: '7140249', name: 'Sư phạm Lịch sử - Địa lý', threshold30: 29.84, combinationIds: ['A07', 'C00'] },
  { code: '7140218', name: 'Sư phạm Lịch sử', threshold30: 28.99, combinationIds: ['A07', 'C00', 'C03', 'D09', 'D14'] },
  { code: '7140202', name: 'Giáo dục Tiểu học', threshold30: 28.6, combinationIds: ['A00', 'B00', 'C00', 'D01', 'C14'] },
  { code: '7140209', name: 'Sư phạm Toán học', threshold30: 28.57, combinationIds: ['A00', 'B00', 'B03', 'C01', 'C02', 'D01'] },
  { code: '7140217', name: 'Sư phạm Ngữ văn', threshold30: 28.45, combinationIds: ['C00', 'C03', 'C04', 'D01', 'D14', 'D15'] },
  { code: '7140211', name: 'Sư phạm Vật lí', threshold30: 28, combinationIds: ['A00', 'A01', 'A02', 'C01'] },
  { code: '7140201', name: 'Giáo dục Mầm non', threshold30: 27.8, combinationIds: ['A00', 'B00', 'C00', 'D01', 'C14'] },
  { code: '7140212', name: 'Sư phạm Hoá học', threshold30: 27.74, combinationIds: ['A00', 'B00', 'C02', 'D07'] },
  { code: '7140247', name: 'Sư phạm Khoa học Tự nhiên', threshold30: 25.58, combinationIds: ['A00', 'A02', 'B00'] },
  { code: '7140213', name: 'Sư phạm Sinh học', threshold30: 25.37, combinationIds: ['A02', 'B00', 'B03', 'B08'] },
] as const satisfies readonly VnuedFieldThreshold[];

export type VnuedFieldCode = (typeof VNUED_FIELD_THRESHOLDS_2025)[number]['code'];

export const VNUED_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, VnuedFieldThreshold> = new Map(
  VNUED_FIELD_THRESHOLDS_2025.map((entry) => [entry.code, entry])
);
