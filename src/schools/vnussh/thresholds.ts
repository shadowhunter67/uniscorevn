/**
 * Trường Đại học Khoa học Xã hội và Nhân văn - ĐHQG Hà Nội (VNU-USSH) 2025 — điểm chuẩn 28/29
 * ngành đại học chính quy (loại Truyền thông đa phương tiện — không có trong bảng điểm chuẩn nhánh
 * thi TN THPT đã thu thập, có thể chỉ tuyển bằng phương thức khác), nhánh xét điểm thi TN THPT,
 * công bố 22-23/08/2025. Nguồn chính: tuyensinh247 (`sources.ts:vnussh-threshold-2025`, bảng đầy
 * đủ theo TỪNG NGÀNH x TỪNG TỔ HỢP), cross-check dải điểm cao nhất/thấp nhất với VietnamNet
 * (`vnussh-threshold-secondary-2025`).
 *
 * KHÁC VNU-UET/VNU-HUS: USSH công bố điểm chuẩn RIÊNG cho TỪNG TỔ HỢP trong cùng 1 ngành (không
 * phải 1 mức chung cho cả ngành) — vd Báo chí: C00=28,2, D01=24,7, C03=25,7 khác nhau đáng kể —
 * giống mô hình QBU. Model dữ liệu bên dưới lưu threshold theo TỪNG (ngành, tổ hợp).
 *
 * tuyensinh247 trích nguyên văn: "Điểm chuẩn dưới đây là tổng điểm các môn xét tuyển + điểm ưu
 * tiên nếu có" — xác nhận TRỰC TIẾP điểm chuẩn ĐÃ CỘNG điểm ưu tiên. Mức điểm ưu tiên cụ thể không
 * được trường công bố — dùng khung quốc gia hiện hành làm judgment call cho giá trị bảng.
 *
 * Mã ngành dùng mã xét tuyển chính thức của trường (QHX01-QHX28, theo tuyensinh247 đăng lại đề án
 * tuyển sinh) — KHÔNG suy đoán mã ngành đào tạo chuẩn quốc gia (Bộ GD&ĐT).
 *
 * Tổ hợp áp dụng CHỈ liệt kê C00/C03/C04/D01/D14/D15 (đã có trong taxonomy môn dùng chung) — loại
 * D66 (mọi ngành đều công bố thêm nhưng thành phần môn chưa xác minh đủ tin cậy), D04 (Hán Nôm/
 * Đông phương học — tiếng Trung, không có trong taxonomy), D06 (Nhật Bản học — tiếng Nhật), DD2
 * (Hàn Quốc học — tiếng Hàn) — các ngoại ngữ này chưa có SubjectId tương ứng trong app. Riêng
 * "Đông Nam Á học" và "Nhật Bản học" KHÔNG có tổ hợp C00 trong danh sách công bố gốc — modeled chỉ
 * với D01 (+D14/D15 cho Đông Nam Á học).
 */
export interface VnusshCombinationThreshold {
  combinationId: string;
  /** Điểm chuẩn 2025 (thang 30, đã gồm điểm ưu tiên). */
  threshold30: number;
}

export interface VnusshFieldThreshold {
  code: string;
  /** Tên ngành đúng nguyên văn bảng điểm chuẩn. */
  name: string;
  combinations: readonly VnusshCombinationThreshold[];
}

export const VNUSSH_FIELD_THRESHOLDS_2025 = [
  {
    code: 'QHX01',
    name: 'Báo chí',
    combinations: [
      { combinationId: 'C00', threshold30: 28.2 },
      { combinationId: 'D14', threshold30: 25.2 },
      { combinationId: 'D15', threshold30: 25.2 },
      { combinationId: 'D01', threshold30: 24.7 },
      { combinationId: 'C03', threshold30: 25.7 },
      { combinationId: 'C04', threshold30: 25.7 },
    ],
  },
  {
    code: 'QHX02',
    name: 'Chính trị học',
    combinations: [
      { combinationId: 'C00', threshold30: 26.86 },
      { combinationId: 'D14', threshold30: 25.86 },
      { combinationId: 'D15', threshold30: 25.86 },
      { combinationId: 'D01', threshold30: 25.86 },
      { combinationId: 'C03', threshold30: 25.86 },
      { combinationId: 'C04', threshold30: 25.86 },
    ],
  },
  {
    code: 'QHX03',
    name: 'Công tác xã hội',
    combinations: [
      { combinationId: 'C00', threshold30: 26.99 },
      { combinationId: 'D14', threshold30: 24.99 },
      { combinationId: 'D15', threshold30: 24.99 },
      { combinationId: 'D01', threshold30: 24.49 },
      { combinationId: 'C03', threshold30: 24.99 },
      { combinationId: 'C04', threshold30: 24.99 },
    ],
  },
  {
    code: 'QHX04',
    name: 'Điện ảnh và nghệ thuật đại chúng',
    combinations: [
      { combinationId: 'C00', threshold30: 27.3 },
      { combinationId: 'D14', threshold30: 25.3 },
      { combinationId: 'D15', threshold30: 25.3 },
      { combinationId: 'D01', threshold30: 24.8 },
      { combinationId: 'C03', threshold30: 25.3 },
      { combinationId: 'C04', threshold30: 25.3 },
    ],
  },
  {
    code: 'QHX05',
    name: 'Đông Nam Á học',
    combinations: [
      { combinationId: 'D14', threshold30: 23.25 },
      { combinationId: 'D15', threshold30: 23.25 },
      { combinationId: 'D01', threshold30: 21.75 },
    ],
  },
  {
    code: 'QHX06',
    name: 'Đông phương học',
    combinations: [
      { combinationId: 'C00', threshold30: 28 },
      { combinationId: 'D14', threshold30: 25 },
      { combinationId: 'D15', threshold30: 25 },
      { combinationId: 'D01', threshold30: 24.5 },
      { combinationId: 'C03', threshold30: 25.5 },
      { combinationId: 'C04', threshold30: 25.5 },
    ],
  },
  {
    code: 'QHX07',
    name: 'Hán Nôm',
    combinations: [
      { combinationId: 'C00', threshold30: 25.76 },
      { combinationId: 'D14', threshold30: 24.76 },
      { combinationId: 'D15', threshold30: 24.76 },
      { combinationId: 'D01', threshold30: 24.26 },
      { combinationId: 'C03', threshold30: 24.76 },
      { combinationId: 'C04', threshold30: 24.76 },
    ],
  },
  {
    code: 'QHX08',
    name: 'Hàn Quốc học',
    combinations: [
      { combinationId: 'C00', threshold30: 27.83 },
      { combinationId: 'D14', threshold30: 24.83 },
      { combinationId: 'D15', threshold30: 24.83 },
      { combinationId: 'D01', threshold30: 24.33 },
      { combinationId: 'C03', threshold30: 25.33 },
      { combinationId: 'C04', threshold30: 25.33 },
    ],
  },
  {
    code: 'QHX09',
    name: 'Khoa học quản lý',
    combinations: [
      { combinationId: 'C00', threshold30: 26.68 },
      { combinationId: 'D14', threshold30: 24.68 },
      { combinationId: 'D15', threshold30: 24.68 },
      { combinationId: 'D01', threshold30: 24.18 },
      { combinationId: 'C03', threshold30: 24.68 },
      { combinationId: 'C04', threshold30: 24.68 },
    ],
  },
  {
    code: 'QHX10',
    name: 'Lịch sử',
    combinations: [
      { combinationId: 'C00', threshold30: 27.3 },
      { combinationId: 'D14', threshold30: 26.3 },
      { combinationId: 'D15', threshold30: 26.3 },
      { combinationId: 'D01', threshold30: 25.8 },
      { combinationId: 'C03', threshold30: 26.3 },
      { combinationId: 'C04', threshold30: 26.3 },
    ],
  },
  {
    code: 'QHX11',
    name: 'Lưu trữ học',
    combinations: [
      { combinationId: 'C00', threshold30: 26.04 },
      { combinationId: 'D14', threshold30: 25.04 },
      { combinationId: 'D15', threshold30: 25.04 },
      { combinationId: 'D01', threshold30: 24.54 },
      { combinationId: 'C03', threshold30: 25.04 },
      { combinationId: 'C04', threshold30: 25.04 },
    ],
  },
  {
    code: 'QHX12',
    name: 'Ngôn ngữ học',
    combinations: [
      { combinationId: 'C00', threshold30: 26.75 },
      { combinationId: 'D14', threshold30: 25.75 },
      { combinationId: 'D15', threshold30: 25.75 },
      { combinationId: 'D01', threshold30: 25.25 },
      { combinationId: 'C03', threshold30: 25.75 },
      { combinationId: 'C04', threshold30: 25.75 },
    ],
  },
  {
    code: 'QHX13',
    name: 'Nhân học',
    combinations: [
      { combinationId: 'C00', threshold30: 25.8 },
      { combinationId: 'D14', threshold30: 24.8 },
      { combinationId: 'D15', threshold30: 24.8 },
      { combinationId: 'D01', threshold30: 24.3 },
      { combinationId: 'C03', threshold30: 24.8 },
      { combinationId: 'C04', threshold30: 24.8 },
    ],
  },
  {
    code: 'QHX14',
    name: 'Nhật Bản học',
    combinations: [{ combinationId: 'D01', threshold30: 21.75 }],
  },
  {
    code: 'QHX15',
    name: 'Quan hệ công chúng',
    combinations: [
      { combinationId: 'C00', threshold30: 28.95 },
      { combinationId: 'D14', threshold30: 25.95 },
      { combinationId: 'D15', threshold30: 25.95 },
      { combinationId: 'D01', threshold30: 25.45 },
      { combinationId: 'C03', threshold30: 26.45 },
      { combinationId: 'C04', threshold30: 26.45 },
    ],
  },
  {
    code: 'QHX16',
    name: 'Quản lý thông tin',
    combinations: [
      { combinationId: 'C00', threshold30: 26.99 },
      { combinationId: 'D14', threshold30: 24.99 },
      { combinationId: 'D15', threshold30: 24.99 },
      { combinationId: 'D01', threshold30: 24.49 },
      { combinationId: 'C03', threshold30: 24.99 },
      { combinationId: 'C04', threshold30: 24.99 },
    ],
  },
  {
    code: 'QHX17',
    name: 'Quản trị dịch vụ du lịch và lữ hành',
    combinations: [
      { combinationId: 'C00', threshold30: 27.87 },
      { combinationId: 'D14', threshold30: 24.87 },
      { combinationId: 'D15', threshold30: 24.87 },
      { combinationId: 'D01', threshold30: 24.37 },
      { combinationId: 'C03', threshold30: 25.37 },
      { combinationId: 'C04', threshold30: 25.37 },
    ],
  },
  {
    code: 'QHX18',
    name: 'Quản trị khách sạn',
    combinations: [
      { combinationId: 'C00', threshold30: 27.49 },
      { combinationId: 'D14', threshold30: 24.49 },
      { combinationId: 'D15', threshold30: 24.49 },
      { combinationId: 'D01', threshold30: 23.99 },
      { combinationId: 'C03', threshold30: 24.99 },
      { combinationId: 'C04', threshold30: 24.99 },
    ],
  },
  {
    code: 'QHX19',
    name: 'Quản trị văn phòng',
    combinations: [
      { combinationId: 'C00', threshold30: 27.43 },
      { combinationId: 'D14', threshold30: 25.43 },
      { combinationId: 'D15', threshold30: 25.43 },
      { combinationId: 'D01', threshold30: 24.93 },
      { combinationId: 'C03', threshold30: 25.43 },
      { combinationId: 'C04', threshold30: 25.43 },
    ],
  },
  {
    code: 'QHX20',
    name: 'Quốc tế học',
    combinations: [
      { combinationId: 'C00', threshold30: 26.5 },
      { combinationId: 'D14', threshold30: 23.5 },
      { combinationId: 'D15', threshold30: 25.3 },
      { combinationId: 'D01', threshold30: 23 },
      { combinationId: 'C03', threshold30: 24 },
      { combinationId: 'C04', threshold30: 24 },
    ],
  },
  {
    code: 'QHX21',
    name: 'Tâm lý học',
    combinations: [
      { combinationId: 'C00', threshold30: 29 },
      { combinationId: 'D14', threshold30: 26 },
      { combinationId: 'D15', threshold30: 26 },
      { combinationId: 'D01', threshold30: 25.5 },
      { combinationId: 'C03', threshold30: 26.5 },
      { combinationId: 'C04', threshold30: 26.5 },
    ],
  },
  {
    code: 'QHX22',
    name: 'Thông tin - Thư viện',
    combinations: [
      { combinationId: 'C00', threshold30: 25.41 },
      { combinationId: 'D14', threshold30: 24.41 },
      { combinationId: 'D15', threshold30: 24.41 },
      { combinationId: 'D01', threshold30: 23.91 },
      { combinationId: 'C03', threshold30: 24.41 },
      { combinationId: 'C04', threshold30: 24.41 },
    ],
  },
  {
    code: 'QHX23',
    name: 'Tôn giáo học',
    combinations: [
      { combinationId: 'C00', threshold30: 25 },
      { combinationId: 'D14', threshold30: 24 },
      { combinationId: 'D15', threshold30: 24 },
      { combinationId: 'D01', threshold30: 23.5 },
      { combinationId: 'C03', threshold30: 24 },
      { combinationId: 'C04', threshold30: 24 },
    ],
  },
  {
    code: 'QHX24',
    name: 'Triết học',
    combinations: [
      { combinationId: 'C00', threshold30: 25.89 },
      { combinationId: 'D14', threshold30: 24.89 },
      { combinationId: 'D15', threshold30: 24.89 },
      { combinationId: 'D01', threshold30: 24.39 },
      { combinationId: 'C03', threshold30: 24.89 },
      { combinationId: 'C04', threshold30: 24.89 },
    ],
  },
  {
    code: 'QHX25',
    name: 'Văn hóa học',
    combinations: [
      { combinationId: 'C00', threshold30: 27.22 },
      { combinationId: 'D14', threshold30: 25.22 },
      { combinationId: 'D15', threshold30: 25.22 },
      { combinationId: 'D01', threshold30: 24.72 },
      { combinationId: 'C03', threshold30: 25.22 },
      { combinationId: 'C04', threshold30: 25.22 },
    ],
  },
  {
    code: 'QHX26',
    name: 'Văn học',
    combinations: [
      { combinationId: 'C00', threshold30: 27.5 },
      { combinationId: 'D14', threshold30: 25.5 },
      { combinationId: 'D15', threshold30: 25.5 },
      { combinationId: 'D01', threshold30: 25 },
      { combinationId: 'C03', threshold30: 25.5 },
      { combinationId: 'C04', threshold30: 25.5 },
    ],
  },
  {
    code: 'QHX27',
    name: 'Việt Nam học',
    combinations: [
      { combinationId: 'C00', threshold30: 26.62 },
      { combinationId: 'D14', threshold30: 24.62 },
      { combinationId: 'D15', threshold30: 24.62 },
      { combinationId: 'D01', threshold30: 24.12 },
      { combinationId: 'C03', threshold30: 24.62 },
      { combinationId: 'C04', threshold30: 24.62 },
    ],
  },
  {
    code: 'QHX28',
    name: 'Xã hội học',
    combinations: [
      { combinationId: 'C00', threshold30: 27 },
      { combinationId: 'D14', threshold30: 25 },
      { combinationId: 'D15', threshold30: 25 },
      { combinationId: 'D01', threshold30: 24.5 },
      { combinationId: 'C03', threshold30: 25 },
      { combinationId: 'C04', threshold30: 25 },
    ],
  },
] as const satisfies readonly VnusshFieldThreshold[];

export type VnusshFieldCode = (typeof VNUSSH_FIELD_THRESHOLDS_2025)[number]['code'];

export const VNUSSH_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, VnusshFieldThreshold> = new Map(
  VNUSSH_FIELD_THRESHOLDS_2025.map((entry) => [entry.code, entry])
);
