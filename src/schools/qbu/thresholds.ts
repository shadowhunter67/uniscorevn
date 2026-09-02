/**
 * Trường Đại học Quảng Bình (QBU) 2025 — điểm chuẩn 14/15 ngành đại học chính quy (loại Giáo dục
 * Mầm non — mã tổ hợp năng khiếu M05/M06/M07/M10/M11/M13/M14 chưa xác minh thành phần môn), nhánh
 * xét điểm thi TN THPT, công bố 22/08/2025. Nguồn chính: Tuyensinh247 (`sources.ts:qbu-threshold-
 * 2025`, bảng đầy đủ theo TỪNG NGÀNH x TỪNG TỔ HỢP), cross-check TUYỆT ĐỐI qua Taro.edu.vn
 * (`qbu-threshold-secondary-2025`) cho toàn bộ 72 cặp ngành/tổ hợp, và cross-check mức thấp nhất
 * mỗi ngành qua 3 nguồn độc lập thêm (FPTShop/Sforum/Navigates, `qbu-threshold-aggregate*`).
 *
 * KHÁC với QNU/TVU: QBU công bố điểm chuẩn RIÊNG cho TỪNG TỔ HỢP trong cùng 1 ngành (không phải 1
 * mức chung cho cả ngành) — vd Giáo dục Tiểu học: A00=23,93, A01=23,25, C00=26,25, D01=23,26 khác
 * nhau đáng kể. Model dữ liệu bên dưới lưu threshold theo TỪNG (ngành, tổ hợp).
 *
 * QUAN TRỌNG — không nhân hệ số: nguồn `qbu-threshold-aggregate-2025` (FPTShop) trích nguyên văn
 * "Mức điểm trên áp dụng với thí sinh khu vực 3 và xét 3 môn thi (không nhân hệ số)" — xác nhận
 * TOÀN BỘ 15 ngành QBU (không riêng batch này) đều KHÔNG nhân hệ số môn chính, khác QNU (phải loại
 * trừ khối Kinh tế/Kỹ thuật vì nghi có nhân hệ số).
 *
 * Điểm ưu tiên: nguồn ghi "Điểm này không tính điểm cộng ưu tiên" / "chưa tính điểm cộng" — nghĩa
 * là mức công bố ứng với thí sinh khu vực 3 (điểm ưu tiên = 0), tức đã tương đương mức ĐXT tối
 * thiểu = tổng thô 3 môn + điểm ưu tiên KV/ĐT của MỖI thí sinh (mô hình ĐXT chuẩn giống QNU/TVU —
 * thí sinh KV3 không có ưu tiên nên tổng thô của họ phải đạt đúng mức này; thí sinh có ưu tiên cần
 * tổng thô thấp hơn tương ứng). Mức điểm ưu tiên cụ thể theo KV/ĐT KHÔNG được trường công bố riêng
 * — dùng khung quốc gia hiện hành làm judgment call cho giá trị bảng (`priority.ts`).
 *
 * Tổ hợp áp dụng CHỈ liệt kê phần tử ĐÃ XÁC MINH ĐỦ TIN CẬY (loại các mã tổ hợp riêng của trường
 * như X02/X04/X05/X06/X08-X12/X15/X17/X21/X22/X25-X27/X70/X71/X74/X75/X78/X79, C12/C13/C20,
 * D04/D45/D65/D66, A03 — thành phần môn không xác minh được đủ tin cậy trong lần research này) —
 * mỗi ngành đã mô hình hoá vẫn còn ít nhất 3 tổ hợp chuẩn quốc gia hợp lệ để chọn.
 */
export interface QbuCombinationThreshold {
  combinationId: string;
  /** Điểm chuẩn 2025 (thang 30, mức KV3/không ưu tiên — tương đương ĐXT tối thiểu). */
  threshold30: number;
}

export interface QbuFieldThreshold {
  code: string;
  /** Tên ngành đúng nguyên văn bảng điểm chuẩn. */
  name: string;
  combinations: readonly QbuCombinationThreshold[];
}

export const QBU_FIELD_THRESHOLDS_2025 = [
  {
    code: '7140202',
    name: 'Giáo dục Tiểu học',
    combinations: [
      { combinationId: 'A00', threshold30: 23.93 },
      { combinationId: 'A01', threshold30: 23.25 },
      { combinationId: 'C00', threshold30: 26.25 },
      { combinationId: 'C01', threshold30: 24.87 },
      { combinationId: 'C04', threshold30: 24.87 },
      { combinationId: 'C14', threshold30: 25.57 },
      { combinationId: 'D01', threshold30: 23.26 },
      { combinationId: 'X01', threshold30: 25.57 },
    ],
  },
  {
    code: '7140209',
    name: 'Sư phạm Toán học',
    combinations: [
      { combinationId: 'A00', threshold30: 22.38 },
      { combinationId: 'A01', threshold30: 21.7 },
      { combinationId: 'A02', threshold30: 22.1 },
      { combinationId: 'D07', threshold30: 22.65 },
    ],
  },
  {
    code: '7140217',
    name: 'Sư phạm Ngữ văn',
    combinations: [
      { combinationId: 'C00', threshold30: 25.4 },
      { combinationId: 'D14', threshold30: 24.15 },
      { combinationId: 'D15', threshold30: 24.26 },
    ],
  },
  {
    code: '7140231',
    name: 'Sư phạm Tiếng Anh',
    combinations: [
      { combinationId: 'A01', threshold30: 19.99 },
      { combinationId: 'D01', threshold30: 20 },
      { combinationId: 'D09', threshold30: 19.52 },
      { combinationId: 'D10', threshold30: 19.63 },
      { combinationId: 'D14', threshold30: 21.74 },
      { combinationId: 'D15', threshold30: 21.85 },
    ],
  },
  {
    code: '7140247',
    name: 'Sư phạm Khoa học tự nhiên',
    combinations: [
      { combinationId: 'A00', threshold30: 20.89 },
      { combinationId: 'A01', threshold30: 20.21 },
      { combinationId: 'A02', threshold30: 20.61 },
      { combinationId: 'B00', threshold30: 19.68 },
      { combinationId: 'B08', threshold30: 19 },
      { combinationId: 'D07', threshold30: 19.28 },
    ],
  },
  {
    code: '7140249',
    name: 'Sư phạm Lịch sử - Địa lí',
    combinations: [
      { combinationId: 'A09', threshold30: 24.75 },
      { combinationId: 'C00', threshold30: 25.8 },
      { combinationId: 'C03', threshold30: 23.95 },
      { combinationId: 'C04', threshold30: 24.06 },
      { combinationId: 'C19', threshold30: 26.86 },
      { combinationId: 'D14', threshold30: 24.65 },
      { combinationId: 'D15', threshold30: 24.66 },
    ],
  },
  {
    code: '7220201',
    name: 'Ngôn ngữ Anh',
    combinations: [
      { combinationId: 'A01', threshold30: 15.47 },
      { combinationId: 'D01', threshold30: 15.48 },
      { combinationId: 'D09', threshold30: 15 },
      { combinationId: 'D10', threshold30: 15.11 },
      { combinationId: 'D14', threshold30: 17.22 },
      { combinationId: 'D15', threshold30: 17.33 },
    ],
  },
  {
    code: '7220204',
    name: 'Ngôn ngữ Trung Quốc',
    combinations: [
      { combinationId: 'D01', threshold30: 15 },
      { combinationId: 'D14', threshold30: 16.74 },
      { combinationId: 'D15', threshold30: 16.85 },
    ],
  },
  {
    code: '7340101',
    name: 'Quản trị kinh doanh',
    combinations: [
      { combinationId: 'A01', threshold30: 15.36 },
      { combinationId: 'C03', threshold30: 16.51 },
      { combinationId: 'D01', threshold30: 15.37 },
      { combinationId: 'D10', threshold30: 15 },
    ],
  },
  {
    code: '7340301',
    name: 'Kế toán',
    combinations: [
      { combinationId: 'A01', threshold30: 15.36 },
      { combinationId: 'A09', threshold30: 17.31 },
      { combinationId: 'C02', threshold30: 16.05 },
      { combinationId: 'D01', threshold30: 15.37 },
      { combinationId: 'D10', threshold30: 15 },
      { combinationId: 'X01', threshold30: 17.68 },
    ],
  },
  {
    code: '7480201',
    name: 'Công nghệ thông tin',
    combinations: [
      { combinationId: 'A00', threshold30: 16.89 },
      { combinationId: 'A01', threshold30: 16.21 },
      { combinationId: 'D01', threshold30: 16.22 },
    ],
  },
  {
    code: '7620101',
    name: 'Nông nghiệp',
    combinations: [
      { combinationId: 'B03', threshold30: 15.4 },
      { combinationId: 'C01', threshold30: 16.61 },
      { combinationId: 'C02', threshold30: 15.68 },
      { combinationId: 'C03', threshold30: 16.14 },
      { combinationId: 'D01', threshold30: 15 },
    ],
  },
  {
    code: '7810103',
    name: 'Quản trị dịch vụ du lịch và lữ hành',
    combinations: [
      { combinationId: 'C00', threshold30: 17.99 },
      { combinationId: 'C03', threshold30: 16.14 },
      { combinationId: 'C04', threshold30: 16.25 },
      { combinationId: 'D01', threshold30: 15 },
      { combinationId: 'D14', threshold30: 16.74 },
      { combinationId: 'D15', threshold30: 16.85 },
    ],
  },
  {
    code: '7850101',
    name: 'Quản lý tài nguyên và môi trường',
    combinations: [
      { combinationId: 'B03', threshold30: 15.4 },
      { combinationId: 'C01', threshold30: 16.61 },
      { combinationId: 'C02', threshold30: 15.68 },
      { combinationId: 'C03', threshold30: 16.14 },
      { combinationId: 'D01', threshold30: 15 },
    ],
  },
] as const satisfies readonly QbuFieldThreshold[];

export type QbuFieldCode = (typeof QBU_FIELD_THRESHOLDS_2025)[number]['code'];

export const QBU_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, QbuFieldThreshold> = new Map(
  QBU_FIELD_THRESHOLDS_2025.map((entry) => [entry.code, entry])
);
