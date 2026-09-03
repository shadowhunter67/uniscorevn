/**
 * VTTU (Trường Đại học Võ Trường Toản, mã trường VTT) 2025 — mức điểm nhận hồ sơ xét tuyển (nhánh
 * xét kết quả thi TN THPT/THPT quốc gia, mã xét tuyển 100/101, thang 30 không hệ số) cho 9/9 ngành
 * đại học chính quy, công bố qua ảnh CHÍNH CHỦ "CÔNG BỐ MỨC ĐIỂM NHẬN HỒ SƠ XÉT TUYỂN" đính kèm bài
 * "Điểm chuẩn đảm bảo chất lượng đầu vào và quy tắc quy đổi điểm tương đương xét tuyển đại học hệ
 * chính quy năm 2025" (`sources.ts:vttu-threshold-2025`, đọc bằng vision qua chrome-devtools). Tổ hợp
 * môn theo ngành lấy từ ảnh CHÍNH CHỦ "NGÀNH / MÃ NGÀNH / TỔ HỢP XÉT TUYỂN / CHỈ TIÊU" đính kèm cùng
 * bài viết (`sources.ts:vttu-combination-2025`).
 *
 * Trường tự gọi đây là "mức điểm nhận hồ sơ xét tuyển" (ngưỡng đảm bảo chất lượng đầu vào) chứ không
 * dùng cụm "điểm chuẩn trúng tuyển" — với trường tư thục xét tuyển không cạnh tranh như VTTU, ngưỡng
 * này đồng thời là mức điểm nhận hồ sơ VÀ mức trúng tuyển trên thực tế (khớp với các nguồn thứ cấp
 * cross-check, xem `sources.ts:vttu-formula-crosscheck-2025`). Model hoá như "threshold" theo đúng
 * tiền lệ DLA (DLA cũng dùng ngưỡng công bố tương tự làm threshold "trúng tuyển").
 */
export interface VttuFieldThreshold {
  code: string;
  /** Tên ngành đúng nguyên văn thông báo. */
  name: string;
  threshold30: number;
  combinationIds: readonly string[];
}

// Khối ngành Sức khỏe (3 ngành): Toán/Hóa/Sinh (B00), Toán/Hóa/Sinh có môn khác (B03 — Toán/Sinh/Ngữ
// văn), Toán/Sinh/Anh (D08), Toán/Lý/Hóa (A00), Toán/Lý/Sinh (A02), Toán/Văn/Anh (D01).
const HEALTH_COMBINATIONS = ['B00', 'B03', 'D08', 'A00', 'A02', 'D01'] as const;
// Khối ngành Kinh tế/Công nghệ/Luật (6 ngành): Toán/Lý/Hóa (A00), Toán/Lý/Sinh (A02), Toán/Văn/Anh (D01).
const OTHER_COMBINATIONS = ['A00', 'A02', 'D01'] as const;

export const VTTU_FIELD_THRESHOLDS_2025: readonly VttuFieldThreshold[] = [
  { code: '7720101', name: 'Y khoa', threshold30: 20.5, combinationIds: HEALTH_COMBINATIONS },
  { code: '7720501', name: 'Răng - Hàm - Mặt', threshold30: 20.5, combinationIds: HEALTH_COMBINATIONS },
  { code: '7720201', name: 'Dược học', threshold30: 19.0, combinationIds: HEALTH_COMBINATIONS },
  { code: '7380101', name: 'Luật', threshold30: 18.0, combinationIds: OTHER_COMBINATIONS },
  { code: '7480201', name: 'Công nghệ thông tin', threshold30: 15.0, combinationIds: OTHER_COMBINATIONS },
  { code: '7340101', name: 'Quản trị kinh doanh', threshold30: 15.0, combinationIds: OTHER_COMBINATIONS },
  { code: '7340201', name: 'Tài chính - Ngân hàng', threshold30: 15.0, combinationIds: OTHER_COMBINATIONS },
  { code: '7340301', name: 'Kế toán', threshold30: 15.0, combinationIds: OTHER_COMBINATIONS },
  { code: '7510205', name: 'Công nghệ Kỹ thuật ô tô', threshold30: 15.0, combinationIds: OTHER_COMBINATIONS },
] as const;

export type VttuFieldCode = (typeof VTTU_FIELD_THRESHOLDS_2025)[number]['code'];

export const VTTU_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, VttuFieldThreshold> = new Map(
  VTTU_FIELD_THRESHOLDS_2025.map((entry) => [entry.code, entry])
);
