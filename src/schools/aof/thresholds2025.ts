/**
 * Học viện Tài chính (AOF) 2025 — điểm chuẩn 34/34 ngành/chương trình đại học chính quy, phương
 * thức 3 (xét kết quả thi TN THPT), công bố 22/08/2025. Nguồn chính: Báo Hà Tĩnh
 * (`sources.ts:aof-threshold-2025`, bảng đầy đủ CÓ CỘT MÃ NGÀNH), cross-check TUYỆT ĐỐI qua
 * tuyensinh247 (`aof-threshold-secondary-2025`, khớp 34/34 ngành).
 *
 * KHÁC với module `eligibility.ts` (AOF 2026, phương thức 3, ngưỡng đảm bảo chất lượng đầu vào
 * công bố theo CƠ SỞ/LOẠI CHƯƠNG TRÌNH, chưa có bảng ánh xạ mã ngành) — batch này tìm được bảng
 * điểm CHUẨN TRÚNG TUYỂN (không phải ngưỡng sàn) của NĂM LIỀN KỀ 2025, công bố CHI TIẾT THEO TỪNG
 * MÃ NGÀNH/CHƯƠNG TRÌNH — đủ điều kiện mô hình hoá exact cho năm 2025 (method riêng, year: 2025,
 * KHÔNG thay thế/trộn với dải ngưỡng 2026 vì 2 năm có thể có cơ cấu điểm khác nhau).
 *
 * tuyensinh247 trích nguyên văn: "Điểm chuẩn dưới đây là tổng điểm các môn xét tuyển + điểm ưu
 * tiên nếu có" — xác nhận TRỰC TIẾP điểm chuẩn ĐÃ CỘNG điểm ưu tiên. Mức điểm ưu tiên cụ thể không
 * được trường công bố — dùng khung quốc gia hiện hành làm judgment call cho giá trị bảng.
 *
 * Mã ngành dùng mã ngành/mã chương trình của Học viện (đăng lại từ Báo Hà Tĩnh, bao gồm cả mã
 * chương trình định hướng chứng chỉ quốc tế dạng "7xxxxxxQTxx.xx"). Tổ hợp áp dụng A00/A01/D01/D07
 * — đã có sẵn trong taxonomy môn dùng chung, không cần thêm.
 */
export interface AofFieldThreshold2025 {
  code: string;
  /** Tên ngành/chương trình đúng nguyên văn bảng điểm chuẩn. */
  name: string;
  threshold30: number;
  combinationIds: readonly string[];
}

export const AOF_FIELD_THRESHOLDS_2025 = [
  { code: '7340302', name: 'Kiểm toán', threshold30: 26.6, combinationIds: ['A00', 'A01', 'D01', 'D07'] },
  { code: '73402012', name: 'Tài chính - Ngân hàng 2', threshold30: 26.31, combinationIds: ['A00', 'A01', 'D01', 'D07'] },
  { code: '7340115', name: 'Marketing', threshold30: 26.23, combinationIds: ['A00', 'A01', 'D01', 'D07'] },
  { code: '73402011', name: 'Tài chính - Ngân hàng 1', threshold30: 25.47, combinationIds: ['A00', 'A01', 'D01', 'D07'] },
  { code: '7310104', name: 'Kinh tế đầu tư', threshold30: 25.56, combinationIds: ['A00', 'A01', 'D01', 'D07'] },
  { code: '7460108', name: 'Khoa học dữ liệu trong tài chính', threshold30: 25.52, combinationIds: ['A00', 'A01', 'D01', 'D07'] },
  { code: '73402013', name: 'Tài chính - Ngân hàng 3', threshold30: 25.4, combinationIds: ['A00', 'A01', 'D01', 'D07'] },
  { code: '7310101', name: 'Kinh tế và quản lý nguồn lực tài chính', threshold30: 25.43, combinationIds: ['A00', 'A01', 'D01', 'D07'] },
  { code: '7340301', name: 'Kế toán doanh nghiệp; Kế toán công', threshold30: 25.01, combinationIds: ['A00', 'A01', 'D01', 'D07'] },
  { code: '7340405', name: 'Tin học tài chính kế toán', threshold30: 25.07, combinationIds: ['A00', 'A01', 'D01', 'D07'] },
  { code: '7380101', name: 'Luật kinh doanh', threshold30: 25.12, combinationIds: ['A00', 'A01', 'D01', 'D07'] },
  { code: '7340101', name: 'Quản trị doanh nghiệp; Quản trị kinh doanh du lịch', threshold30: 24.98, combinationIds: ['A00', 'A01', 'D01', 'D07'] },
  { code: '7480201', name: 'Trí tuệ nhân tạo trong tài chính kế toán', threshold30: 24.97, combinationIds: ['A00', 'A01', 'D01', 'D07'] },
  { code: '7310102', name: 'Kinh tế chính trị - tài chính', threshold30: 24.92, combinationIds: ['A00', 'A01', 'D01', 'D07'] },
  { code: '7340120QT15.01', name: 'Kinh doanh quốc tế (Theo định hướng ICAEW CFAB)', threshold30: 24.89, combinationIds: ['A01', 'D01', 'D07'] },
  { code: '7310108', name: 'Toán tài chính', threshold30: 24.57, combinationIds: ['A00', 'A01', 'D01', 'D07'] },
  { code: '7220201', name: 'Tiếng Anh tài chính kế toán', threshold30: 24.1, combinationIds: ['A01', 'D01', 'D07'] },
  { code: '7340115QT11.02', name: 'Digital Marketing (Theo định hướng ICDL)', threshold30: 23.44, combinationIds: ['A01', 'D01', 'D07'] },
  { code: '7310104QT12.01', name: 'Kinh tế đầu tư (Theo định hướng ACCA)', threshold30: 22.82, combinationIds: ['A01', 'D01', 'D07'] },
  { code: '7340204', name: 'Tài chính bảo hiểm', threshold30: 22.56, combinationIds: ['A00', 'A01', 'D01', 'D07'] },
  { code: '7340403', name: 'Quản lý tài chính công', threshold30: 22.55, combinationIds: ['A00', 'A01', 'D01', 'D07'] },
  { code: '7340101QT03.01', name: 'Quản trị doanh nghiệp (Theo định hướng ICAEW CFAB)', threshold30: 22.58, combinationIds: ['A01', 'D01', 'D07'] },
  { code: '7340116', name: 'Thẩm định giá và kinh doanh bất động sản', threshold30: 21.51, combinationIds: ['A00', 'A01', 'D01', 'D07'] },
  { code: '7340301QT02.01', name: 'Kế toán doanh nghiệp (Theo định hướng ACCA)', threshold30: 21.5, combinationIds: ['A01', 'D01', 'D07'] },
  { code: '7340301QT02.03', name: 'Kế toán công (Theo định hướng ACCA)', threshold30: 21.5, combinationIds: ['A01', 'D01', 'D07'] },
  { code: '7340302QT10.01', name: 'Kiểm toán (Theo định hướng ICAEW CFAB)', threshold30: 21.5, combinationIds: ['A01', 'D01', 'D07'] },
  { code: '7340201QT01.06', name: 'Hải quan và Logistics (Theo định hướng FIATA)', threshold30: 21.3, combinationIds: ['A01', 'D01', 'D07'] },
  { code: '7340116QT09.01', name: 'Thẩm định giá và kinh doanh bất động sản (Theo định hướng ACCA)', threshold30: 21, combinationIds: ['A01', 'D01', 'D07'] },
  { code: '7340201QT01.01', name: 'Thuế và Quản trị thuế (Theo định hướng ACCA)', threshold30: 21, combinationIds: ['A01', 'D01', 'D07'] },
  { code: '7340201QT01.09', name: 'Phân tích tài chính (Theo định hướng ICAEW CFAB)', threshold30: 21, combinationIds: ['A01', 'D01', 'D07'] },
  { code: '7340201QT01.11', name: 'Tài chính doanh nghiệp (Theo định hướng ACCA)', threshold30: 21, combinationIds: ['A01', 'D01', 'D07'] },
  { code: '7340201QT01.15', name: 'Ngân hàng (Theo định hướng ICAEW CFAB)', threshold30: 21, combinationIds: ['A01', 'D01', 'D07'] },
  { code: '7340201QT01.19', name: 'Đầu tư tài chính (Theo định hướng ICAEW CFAB)', threshold30: 21, combinationIds: ['A01', 'D01', 'D07'] },
  { code: '7340301QT02.02', name: 'Kế toán quản trị và Kiểm soát quản lý (Theo định hướng CMA)', threshold30: 21, combinationIds: ['A01', 'D01', 'D07'] },
] as const satisfies readonly AofFieldThreshold2025[];

export type AofFieldCode2025 = (typeof AOF_FIELD_THRESHOLDS_2025)[number]['code'];

export const AOF_FIELD_THRESHOLD_BY_CODE_2025: ReadonlyMap<string, AofFieldThreshold2025> = new Map(
  AOF_FIELD_THRESHOLDS_2025.map((entry) => [entry.code, entry])
);
