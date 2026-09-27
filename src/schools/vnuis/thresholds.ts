/**
 * VNU-IS (Trường Quốc tế - Đại học Quốc gia Hà Nội, mã trường QHQ) 2026 — điểm chuẩn trúng tuyển
 * 14/14 chương trình đào tạo đại học chính quy, nhánh Phương thức xét kết quả thi TN THPT 2026
 * (mã phương thức trong thông báo trường: "Xét kết quả thi tốt nghiệp THPT năm 2026"), thang 30.
 * Nguồn điểm chuẩn: thông báo tổng hợp CHÍNH THỨC của ĐHQGHN (`sources.ts:vnuis-cutoff-vnu-2026`),
 * mục 10 "Trường Quốc tế", ghi rõ "đã bao gồm điểm cộng, điểm ưu tiên khu vực, đối tượng (nếu có)".
 * Tổ hợp xét tuyển theo từng chương trình lấy từ thông báo chi tiết của chính Trường Quốc tế
 * (`vnuis-notice-2026`, mục "Bảng 4: Tổ hợp xét tuyển vào Trường Quốc tế năm 2026").
 *
 * 4 chương trình (QHQ04/QHQ08/QHQ10/QHQ12) có điều kiện phụ: nếu dùng tổ hợp D01 thì môn Toán phải
 * đạt tối thiểu 6,0/10 — mô hình hoá qua field `d01MathFloor10`.
 */
export interface VnuisFieldThreshold {
  /** Mã xét tuyển chính thức của Trường Quốc tế (QHQ01-QHQ14). */
  code: string;
  /** Tên chương trình đúng nguyên văn thông báo. */
  name: string;
  threshold30: number;
  combinationIds: readonly string[];
  /** Nếu có: điểm sàn môn Toán (thang 10) bắt buộc khi thí sinh chọn tổ hợp D01. */
  d01MathFloor10?: number;
}

export const VNUIS_FIELD_THRESHOLDS_2026: readonly VnuisFieldThreshold[] = [
  { code: 'QHQ01', name: 'Kinh doanh quốc tế', threshold30: 20.5, combinationIds: ['A00', 'A01', 'D01', 'D07', 'C01', 'C02'] },
  { code: 'QHQ02', name: 'Kế toán, Phân tích và Kiểm toán', threshold30: 20, combinationIds: ['A00', 'A01', 'D01', 'D07', 'C01', 'C02'] },
  { code: 'QHQ03', name: 'Hệ thống thông tin quản lý', threshold30: 19, combinationIds: ['A00', 'A01', 'D01', 'C01', 'C02', 'X26'] },
  { code: 'QHQ04', name: 'Tin học và Kỹ thuật máy tính', threshold30: 19, combinationIds: ['A00', 'A01', 'D01', 'D07', 'C01', 'X02', 'X26'], d01MathFloor10: 6 },
  { code: 'QHQ05', name: 'Phân tích dữ liệu kinh doanh', threshold30: 20, combinationIds: ['A00', 'A01', 'D01', 'C01', 'C02', 'X26'] },
  { code: 'QHQ06', name: 'Marketing', threshold30: 19, combinationIds: ['A00', 'A01', 'D01', 'D09', 'C01', 'C02'] },
  { code: 'QHQ07', name: 'Quản lý', threshold30: 19, combinationIds: ['A00', 'A01', 'D01', 'D09', 'C01', 'C02'] },
  { code: 'QHQ08', name: 'Tự động hóa và Tin học', threshold30: 19, combinationIds: ['A00', 'A01', 'D01', 'D07', 'C01', 'X02', 'X26'], d01MathFloor10: 6 },
  { code: 'QHQ09', name: 'Ngôn ngữ Anh', threshold30: 21.25, combinationIds: ['A01', 'D01', 'D07', 'D08', 'D09', 'D10'] },
  { code: 'QHQ10', name: 'Công nghệ thông tin ứng dụng', threshold30: 19, combinationIds: ['A00', 'A01', 'D01', 'D07', 'C01', 'X02', 'X26'], d01MathFloor10: 6 },
  { code: 'QHQ11', name: 'Công nghệ tài chính và Kinh doanh số', threshold30: 19.25, combinationIds: ['A00', 'A01', 'D01', 'C01', 'C02', 'X26'] },
  { code: 'QHQ12', name: 'Kỹ thuật hệ thống công nghiệp và Logistics', threshold30: 19.5, combinationIds: ['A00', 'A01', 'D01', 'D07', 'C01', 'X02', 'X26'], d01MathFloor10: 6 },
  { code: 'QHQ13', name: 'Kinh doanh số', threshold30: 21, combinationIds: ['A00', 'A01', 'D01', 'D07', 'C01', 'C02'] },
  { code: 'QHQ14', name: 'Truyền thông số', threshold30: 21, combinationIds: ['A00', 'A01', 'D01', 'D07', 'C01', 'C02'] },
];

export const VNUIS_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, VnuisFieldThreshold> = new Map(
  VNUIS_FIELD_THRESHOLDS_2026.map((entry) => [entry.code, entry])
);
