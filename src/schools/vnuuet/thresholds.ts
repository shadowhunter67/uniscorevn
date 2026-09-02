/**
 * Trường Đại học Công nghệ - ĐHQG Hà Nội (VNU-UET) 2025 — điểm chuẩn 20/20 ngành đại học chính quy,
 * nhánh xét điểm thi TN THPT, công bố 22/08/2025. Nguồn chính: tuyensinh247 (`sources.ts:vnuuet-
 * threshold-2025`, bảng đầy đủ theo ngành), cross-check dải điểm với VnExpress (`vnuuet-threshold-
 * secondary-2025`, dải 22,14-28,19 khớp — chênh 0,01 so với mức thấp nhất 22,00 do làm tròn khác
 * nhau giữa 2 nguồn, không ảnh hưởng ngành nào mô hình hoá trong batch này). Cổng chính thức
 * (tuyensinh.uet.vnu.edu.vn, xaydungchinhsach.chinhphu.vn) xác nhận có thông báo nhưng bảng chỉ
 * hiển thị dạng ảnh, không đọc được bằng text extraction (cùng tình huống VNU-UED/HPMU/VNU-UEB).
 *
 * tuyensinh247 trích nguyên văn: "Điểm chuẩn dưới đây là tổng điểm các môn xét tuyển + điểm ưu
 * tiên nếu có" — xác nhận TRỰC TIẾP điểm chuẩn ĐÃ CỘNG điểm ưu tiên. Mức điểm ưu tiên cụ thể không
 * được trường công bố — dùng khung quốc gia hiện hành làm judgment call cho giá trị bảng.
 *
 * Công thức trường tự công bố (chinhphu.vn, trích nguyên văn tóm tắt): "Điểm trúng tuyển (điểm
 * chuẩn) của một ngành là như nhau giữa các tổ hợp xét tuyển" — nghĩa là 1 NGÀNH chỉ có 1 mức điểm
 * chuẩn áp dụng chung cho MỌI tổ hợp trường công bố (khác VNU-UED — mỗi ngành 1 tổ hợp riêng biệt
 * điểm khác nhau).
 *
 * Mã ngành dùng mã xét tuyển nội bộ trường (CNxx, theo trangedu.com đăng lại đề án tuyển sinh
 * trường) — KHÔNG suy đoán mã ngành đào tạo chuẩn quốc gia (Bộ GD&ĐT) vì nhiều ngành công nghệ mới
 * (Trí tuệ nhân tạo, Công nghệ hàng không vũ trụ...) chưa có mã ngành 7 số phổ biến/xác minh được.
 *
 * Tổ hợp áp dụng CHỈ liệt kê A00/A01/D01 (+ B00 cho 2 ngành khối nông nghiệp/sinh học) — trường
 * còn công bố thêm X06 (Toán,Lý,Tin) và X26 (Toán,Anh,Tin) cho MỌI ngành nhưng do điểm chuẩn giống
 * hệt nhau giữa mọi tổ hợp trong 1 ngành (xác nhận ở trên), việc bỏ qua X06/X26 KHÔNG làm sai kết
 * quả — chỉ giảm số tổ hợp thí sinh có thể chọn (thí sinh thi X06/X26 vẫn tính đúng nếu app hỗ trợ
 * thêm 2 tổ hợp này sau, chưa cần thiết cho batch này).
 */
export interface VnuuetFieldThreshold {
  code: string;
  /** Tên ngành đúng nguyên văn bảng điểm chuẩn. */
  name: string;
  threshold30: number;
  combinationIds: readonly string[];
}

export const VNUUET_FIELD_THRESHOLDS_2025 = [
  { code: 'CN1', name: 'Công nghệ thông tin', threshold30: 28.19, combinationIds: ['A00', 'A01', 'D01'] },
  { code: 'CN8', name: 'Khoa học máy tính', threshold30: 27.86, combinationIds: ['A00', 'A01', 'D01'] },
  { code: 'CN11', name: 'Kỹ thuật điều khiển và tự động hoá', threshold30: 27.9, combinationIds: ['A00', 'A01', 'D01'] },
  { code: 'CN12', name: 'Trí tuệ nhân tạo', threshold30: 27.75, combinationIds: ['A00', 'A01', 'D01'] },
  { code: 'CN20', name: 'Khoa học dữ liệu', threshold30: 27.38, combinationIds: ['A00', 'A01', 'D01'] },
  { code: 'CN2', name: 'Kỹ thuật máy tính', threshold30: 27, combinationIds: ['A00', 'A01', 'D01'] },
  { code: 'CN15', name: 'Mạng máy tính và truyền thông dữ liệu', threshold30: 26.73, combinationIds: ['A00', 'A01', 'D01'] },
  { code: 'CN6', name: 'Công nghệ kỹ thuật cơ điện tử', threshold30: 26.73, combinationIds: ['A00', 'A01', 'D01'] },
  { code: 'CN9', name: 'Công nghệ kỹ thuật điện tử - Viễn thông', threshold30: 26.63, combinationIds: ['A00', 'A01', 'D01'] },
  { code: 'CN14', name: 'Hệ thống thông tin', threshold30: 26.38, combinationIds: ['A00', 'A01', 'D01'] },
  { code: 'CN4', name: 'Cơ kỹ thuật', threshold30: 26.15, combinationIds: ['A00', 'A01', 'D01'] },
  { code: 'CN17', name: 'Kỹ thuật Robot', threshold30: 26, combinationIds: ['A00', 'A01', 'D01'] },
  { code: 'CN19', name: 'Công nghệ vật liệu', threshold30: 25.6, combinationIds: ['A00', 'A01', 'D01'] },
  { code: 'CN3', name: 'Vật lý kỹ thuật', threshold30: 25.2, combinationIds: ['A00', 'A01', 'D01'] },
  { code: 'CN13', name: 'Kỹ thuật năng lượng', threshold30: 24.87, combinationIds: ['A00', 'A01', 'D01'] },
  { code: 'CN18', name: 'Thiết kế công nghiệp và Đồ hoạ', threshold30: 24.2, combinationIds: ['A00', 'A01', 'D01'] },
  { code: 'CN7', name: 'Công nghệ hàng không vũ trụ', threshold30: 23.96, combinationIds: ['A00', 'A01', 'D01'] },
  { code: 'CN5', name: 'Công nghệ kỹ thuật xây dựng', threshold30: 22.25, combinationIds: ['A00', 'A01', 'D01'] },
  { code: 'CN21', name: 'Công nghệ sinh học', threshold30: 22.13, combinationIds: ['A00', 'A01', 'D01', 'B00'] },
  { code: 'CN10', name: 'Công nghệ nông nghiệp', threshold30: 22, combinationIds: ['A00', 'A01', 'D01', 'B00'] },
] as const satisfies readonly VnuuetFieldThreshold[];

export type VnuuetFieldCode = (typeof VNUUET_FIELD_THRESHOLDS_2025)[number]['code'];

export const VNUUET_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, VnuuetFieldThreshold> = new Map(
  VNUUET_FIELD_THRESHOLDS_2025.map((entry) => [entry.code, entry])
);
