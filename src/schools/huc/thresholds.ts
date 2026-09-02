/**
 * Trường Đại học Văn hóa Hà Nội (HUC) 2025 — điểm chuẩn 20/21 ngành đại học chính quy (loại Sáng
 * tác văn học, mã 7220110 — không có trong bảng điểm chuẩn nhánh xét kết quả thi TN THPT thu thập
 * được, có thể tuyển bằng phương thức năng khiếu/xét hồ sơ riêng), nhánh xét điểm thi TN THPT,
 * công bố 23/07/2025 (bản đầy đủ theo ngành/tổ hợp có sau, khoảng 22-23/08/2025). Nguồn chính:
 * tuyensinh247 (`sources.ts:huc-threshold-2025`, bảng đầy đủ theo TỪNG NGÀNH x TỪNG NHÓM TỔ HỢP),
 * cross-check dải điểm với VietnamNet (`huc-threshold-secondary-2025`, dải 22,85-28,9 khớp).
 *
 * LƯU Ý: trường trước đây từng thất bại research vì trang tuyển sinh chính thức (tuyensinh.huc.
 * edu.vn) là SPA render bằng JS, không đọc được text trực tiếp. Batch này retry qua cổng Chính phủ
 * (xaydungchinhsach.chinhphu.vn — nhưng bảng số liệu đầy đủ vẫn là ẢNH) và tuyensinh247 (đăng lại
 * bảng dạng text đầy đủ) — thành công lấy được bảng chi tiết theo ngành x tổ hợp.
 *
 * KHÁC VNU-UET/VNU-HUS: HUC công bố điểm chuẩn RIÊNG cho TỪNG NHÓM TỔ HỢP trong cùng 1 ngành (3
 * nhóm phổ biến: D01 riêng; {C03,C04,D14,D15,X01,X78} chung 1 mức; {C00,X70} chung 1 mức) — giống
 * mô hình QBU/VNU-USSH. Model dữ liệu bên dưới lưu threshold theo TỪNG (ngành, tổ hợp).
 *
 * tuyensinh247 trích nguyên văn: "Điểm chuẩn dưới đây là tổng điểm các môn xét tuyển + điểm ưu
 * tiên nếu có" — xác nhận TRỰC TIẾP điểm chuẩn ĐÃ CỘNG điểm ưu tiên. Mức điểm ưu tiên cụ thể không
 * được trường công bố — dùng khung quốc gia hiện hành làm judgment call cho giá trị bảng.
 *
 * Mã ngành dùng mã ngành đào tạo của trường (7220201, 7229040A/B/C...) theo tuyensinh247 đăng lại
 * đề án tuyển sinh — một số mã có hậu tố A/B/C/D (chuyên ngành trong cùng 1 mã ngành gốc).
 *
 * Tổ hợp áp dụng CHỈ liệt kê D01/C00/C03/C04/D14/D15/X01 (đã có trong taxonomy môn dùng chung của
 * app) — loại X70/X78 (mã tổ hợp riêng của trường, thành phần môn chưa xác minh đủ tin cậy) vì mỗi
 * nhóm tổ hợp đã có ít nhất 1 mã đã verified khác thay thế (D01 độc lập, nhóm C03/C04/D14/D15/X01
 * đã đủ 4 mã hỗ trợ nếu loại X78, nhóm C00/X70 đã có C00 thay thế X70).
 */
export interface HucCombinationThreshold {
  combinationId: string;
  /** Điểm chuẩn 2025 (thang 30, đã gồm điểm ưu tiên). */
  threshold30: number;
}

export interface HucFieldThreshold {
  code: string;
  /** Tên ngành đúng nguyên văn bảng điểm chuẩn. */
  name: string;
  combinations: readonly HucCombinationThreshold[];
}

export const HUC_FIELD_THRESHOLDS_2025 = [
  {
    code: '7220201',
    name: 'Ngôn ngữ Anh',
    combinations: [
      { combinationId: 'D01', threshold30: 24.91 },
      { combinationId: 'D14', threshold30: 25.41 },
      { combinationId: 'D15', threshold30: 25.41 },
    ],
  },
  {
    code: '7229040A',
    name: 'Nghiên cứu văn hóa',
    combinations: [
      { combinationId: 'D01', threshold30: 24.73 },
      { combinationId: 'C03', threshold30: 25.23 },
      { combinationId: 'C04', threshold30: 25.23 },
      { combinationId: 'D14', threshold30: 25.23 },
      { combinationId: 'D15', threshold30: 25.23 },
      { combinationId: 'X01', threshold30: 25.23 },
      { combinationId: 'C00', threshold30: 26.73 },
    ],
  },
  {
    code: '7229040B',
    name: 'Văn hóa truyền thông',
    combinations: [
      { combinationId: 'D01', threshold30: 25.36 },
      { combinationId: 'C03', threshold30: 25.86 },
      { combinationId: 'C04', threshold30: 25.86 },
      { combinationId: 'D14', threshold30: 25.86 },
      { combinationId: 'D15', threshold30: 25.86 },
      { combinationId: 'X01', threshold30: 25.86 },
      { combinationId: 'C00', threshold30: 27.36 },
    ],
  },
  {
    code: '7229040C',
    name: 'Văn hóa đối ngoại',
    combinations: [
      { combinationId: 'D01', threshold30: 25 },
      { combinationId: 'C03', threshold30: 25.5 },
      { combinationId: 'C04', threshold30: 25.5 },
      { combinationId: 'D14', threshold30: 25.5 },
      { combinationId: 'D15', threshold30: 25.5 },
      { combinationId: 'X01', threshold30: 25.5 },
      { combinationId: 'C00', threshold30: 27 },
    ],
  },
  {
    code: '7229042A',
    name: 'Phát triển công nghiệp văn hóa',
    combinations: [
      { combinationId: 'D01', threshold30: 22.83 },
      { combinationId: 'C03', threshold30: 23.33 },
      { combinationId: 'C04', threshold30: 23.33 },
      { combinationId: 'D14', threshold30: 23.33 },
      { combinationId: 'D15', threshold30: 23.33 },
      { combinationId: 'X01', threshold30: 23.33 },
      { combinationId: 'C00', threshold30: 24.83 },
    ],
  },
  {
    code: '7229042B',
    name: 'Quản lý di sản văn hóa',
    combinations: [
      { combinationId: 'D01', threshold30: 23.94 },
      { combinationId: 'C03', threshold30: 24.44 },
      { combinationId: 'C04', threshold30: 24.44 },
      { combinationId: 'D14', threshold30: 24.44 },
      { combinationId: 'D15', threshold30: 24.44 },
      { combinationId: 'X01', threshold30: 24.44 },
      { combinationId: 'C00', threshold30: 25.94 },
    ],
  },
  {
    code: '7229042C',
    name: 'Tổ chức hoạt động nghệ thuật',
    combinations: [
      { combinationId: 'D01', threshold30: 25.21 },
      { combinationId: 'C03', threshold30: 25.71 },
      { combinationId: 'C04', threshold30: 25.71 },
      { combinationId: 'D14', threshold30: 25.71 },
      { combinationId: 'D15', threshold30: 25.71 },
      { combinationId: 'X01', threshold30: 25.71 },
      { combinationId: 'C00', threshold30: 27.21 },
    ],
  },
  {
    code: '7229042D',
    name: 'Tổ chức sự kiện văn hóa',
    combinations: [
      { combinationId: 'D01', threshold30: 25.55 },
      { combinationId: 'C03', threshold30: 26.05 },
      { combinationId: 'C04', threshold30: 26.05 },
      { combinationId: 'D14', threshold30: 26.05 },
      { combinationId: 'D15', threshold30: 26.05 },
      { combinationId: 'X01', threshold30: 26.05 },
      { combinationId: 'C00', threshold30: 27.55 },
    ],
  },
  {
    code: '7320101',
    name: 'Báo chí',
    combinations: [
      { combinationId: 'D01', threshold30: 25.27 },
      { combinationId: 'C03', threshold30: 25.77 },
      { combinationId: 'C04', threshold30: 25.77 },
      { combinationId: 'D14', threshold30: 25.77 },
      { combinationId: 'D15', threshold30: 25.77 },
      { combinationId: 'X01', threshold30: 25.77 },
      { combinationId: 'C00', threshold30: 27.27 },
    ],
  },
  {
    code: '7320201A',
    name: 'Quản trị thư viện',
    combinations: [
      { combinationId: 'D01', threshold30: 23.5 },
      { combinationId: 'C03', threshold30: 24 },
      { combinationId: 'C04', threshold30: 24 },
      { combinationId: 'D14', threshold30: 24 },
      { combinationId: 'D15', threshold30: 24 },
      { combinationId: 'X01', threshold30: 24 },
      { combinationId: 'C00', threshold30: 25.5 },
    ],
  },
  {
    code: '7320201B',
    name: 'Thư viện và thiết bị trường học',
    combinations: [
      { combinationId: 'D01', threshold30: 23.34 },
      { combinationId: 'C03', threshold30: 23.84 },
      { combinationId: 'C04', threshold30: 23.84 },
      { combinationId: 'D14', threshold30: 23.84 },
      { combinationId: 'D15', threshold30: 23.84 },
      { combinationId: 'X01', threshold30: 23.84 },
      { combinationId: 'C00', threshold30: 25.34 },
    ],
  },
  {
    code: '7320205',
    name: 'Quản lý thông tin',
    combinations: [
      { combinationId: 'D01', threshold30: 24.27 },
      { combinationId: 'C03', threshold30: 24.77 },
      { combinationId: 'C04', threshold30: 24.77 },
      { combinationId: 'D14', threshold30: 24.77 },
      { combinationId: 'D15', threshold30: 24.77 },
      { combinationId: 'X01', threshold30: 24.77 },
      { combinationId: 'C00', threshold30: 26.27 },
    ],
  },
  {
    code: '7320305',
    name: 'Bảo tàng học',
    combinations: [
      { combinationId: 'D01', threshold30: 23.2 },
      { combinationId: 'C03', threshold30: 23.7 },
      { combinationId: 'C04', threshold30: 23.7 },
      { combinationId: 'D14', threshold30: 23.7 },
      { combinationId: 'D15', threshold30: 23.7 },
      { combinationId: 'X01', threshold30: 23.7 },
      { combinationId: 'C00', threshold30: 25.2 },
    ],
  },
  {
    code: '7320402',
    name: 'Kinh doanh xuất bản phẩm',
    combinations: [
      { combinationId: 'D01', threshold30: 23.76 },
      { combinationId: 'C03', threshold30: 24.26 },
      { combinationId: 'C04', threshold30: 24.26 },
      { combinationId: 'D14', threshold30: 24.26 },
      { combinationId: 'D15', threshold30: 24.26 },
      { combinationId: 'X01', threshold30: 24.26 },
      { combinationId: 'C00', threshold30: 25.76 },
    ],
  },
  {
    code: '7380101',
    name: 'Luật',
    combinations: [
      { combinationId: 'D01', threshold30: 24.81 },
      { combinationId: 'C03', threshold30: 25.31 },
      { combinationId: 'C04', threshold30: 25.31 },
      { combinationId: 'D14', threshold30: 25.31 },
      { combinationId: 'D15', threshold30: 25.31 },
      { combinationId: 'X01', threshold30: 25.31 },
      { combinationId: 'C00', threshold30: 26.81 },
    ],
  },
  {
    code: '7810101A',
    name: 'Văn hóa du lịch',
    combinations: [
      { combinationId: 'D01', threshold30: 24.83 },
      { combinationId: 'C03', threshold30: 25.33 },
      { combinationId: 'C04', threshold30: 25.33 },
      { combinationId: 'D14', threshold30: 25.33 },
      { combinationId: 'D15', threshold30: 25.33 },
      { combinationId: 'X01', threshold30: 25.33 },
      { combinationId: 'C00', threshold30: 26.83 },
    ],
  },
  {
    code: '7810101B',
    name: 'Lữ hành, hướng dẫn du lịch',
    combinations: [
      { combinationId: 'D01', threshold30: 25.2 },
      { combinationId: 'C03', threshold30: 25.7 },
      { combinationId: 'C04', threshold30: 25.7 },
      { combinationId: 'D14', threshold30: 25.7 },
      { combinationId: 'D15', threshold30: 25.7 },
      { combinationId: 'X01', threshold30: 25.7 },
      { combinationId: 'C00', threshold30: 27.2 },
    ],
  },
  {
    code: '7810101C',
    name: 'Hướng dẫn du lịch quốc tế',
    combinations: [
      { combinationId: 'D01', threshold30: 22.8 },
      { combinationId: 'D14', threshold30: 23.3 },
      { combinationId: 'D15', threshold30: 23.3 },
    ],
  },
  {
    code: '7810103A',
    name: 'Quản trị kinh doanh du lịch',
    combinations: [
      { combinationId: 'D01', threshold30: 25.05 },
      { combinationId: 'C03', threshold30: 25.55 },
      { combinationId: 'C04', threshold30: 25.55 },
      { combinationId: 'D14', threshold30: 25.55 },
      { combinationId: 'D15', threshold30: 25.55 },
      { combinationId: 'X01', threshold30: 25.55 },
      { combinationId: 'C00', threshold30: 27.05 },
    ],
  },
  {
    code: '7810103B',
    name: 'Quản trị du lịch cộng đồng',
    combinations: [
      { combinationId: 'D01', threshold30: 24.62 },
      { combinationId: 'C03', threshold30: 25.12 },
      { combinationId: 'C04', threshold30: 25.12 },
      { combinationId: 'D14', threshold30: 25.12 },
      { combinationId: 'D15', threshold30: 25.12 },
      { combinationId: 'X01', threshold30: 25.12 },
      { combinationId: 'C00', threshold30: 26.62 },
    ],
  },
] as const satisfies readonly HucFieldThreshold[];

export type HucFieldCode = (typeof HUC_FIELD_THRESHOLDS_2025)[number]['code'];

export const HUC_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, HucFieldThreshold> = new Map(
  HUC_FIELD_THRESHOLDS_2025.map((entry) => [entry.code, entry])
);
