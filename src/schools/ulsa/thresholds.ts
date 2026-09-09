/**
 * ULSA (Trường Đại học Lao động - Xã hội) 2026 — Phương thức 100 (xét kết quả thi TN THPT 2026).
 *
 * Nguồn điểm trúng tuyển + tổ hợp: `sources.ts:ulsa-diemtrungtuyen-2752-2026` (Thông báo số
 * 2752/TB-HĐTSĐH2026 ngày 11/8/2026, PDF gốc có chữ ký/con dấu, đọc bằng vision). Cột điểm được
 * gán nhãn nguyên văn "Điểm chuẩn Thi TN THPT (PT 100, PT gốc, thang 30)".
 *
 * Trường có 2 địa điểm đào tạo với mã tuyển sinh riêng và ĐIỂM CHUẨN RIÊNG: Trụ sở chính Hà Nội
 * (DLX, 28 chương trình) và Cơ sở II TP. Hồ Chí Minh (DLS, 14 chương trình). `code` dưới đây gộp
 * mã ngành + mã cơ sở để không đụng độ (vd. `7220201-DLX` và `7220201-DLS`).
 *
 * Tổ hợp môn được đối chiếu chéo với ảnh bảng "Chương trình đào tạo, ngành đào tạo, mã xét tuyển,
 * tổ hợp môn xét tuyển và chỉ tiêu tuyển sinh" trên cổng tuyển sinh chính chủ
 * (`sources.ts:ulsa-thongtin-tuyensinh-2026`), vốn ghi tổ hợp theo TÊN MÔN kèm mã — hai nguồn khớp
 * tuyệt đối.
 */
export type UlsaCampus = 'DLX' | 'DLS';

export interface UlsaProgram {
  /** ID nội bộ = `<mã ngành>-<mã cơ sở>`. */
  code: string;
  /** Mã ngành nguyên văn Thông báo 2752 (có hậu tố A/B/C khi 1 mã ngành có nhiều chương trình). */
  maNganh: string;
  name: string;
  campus: UlsaCampus;
  combinationIds: readonly string[];
  /** Điểm trúng tuyển 2026 phương thức 100, thang 30. */
  threshold30: number;
}

const ECON_LABOR = ['A01', 'D01', 'D09', 'X25'] as const;
const PSYCHOLOGY = ['C00', 'D01', 'D14', 'X74'] as const;
const BUSINESS = ['A01', 'D01', 'X05', 'X25'] as const;
const FINANCE = ['A01', 'C01', 'D01', 'X25'] as const;
const INSURANCE = ['A01', 'C04', 'D01', 'X25'] as const;
const INSURANCE_FINANCE = ['A01', 'D01', 'X21', 'X25'] as const;
const ACCOUNTING = ['A01', 'C03', 'D01', 'X25'] as const;
const HR = ['A01', 'D01', 'D09', 'X25'] as const;
const MIS = ['A01', 'D01', 'D07', 'X25'] as const;
const LAW = ['A01', 'D01', 'X01', 'X25'] as const;
const IT = ['A01', 'D01', 'X06', 'X25'] as const;
const SOCIAL_WORK = ['C00', 'D01', 'D14', 'X70'] as const;
const TOURISM = ['A01', 'D01', 'X17', 'X25'] as const;
const ENGLISH_MAJOR = ['A01', 'D01', 'D09', 'D15'] as const;

export const ULSA_PROGRAMS: readonly UlsaProgram[] = [
  // ----- Trụ sở chính Hà Nội (DLX) — 28 chương trình -----
  { code: '7220201-DLX', maNganh: '7220201', name: 'Ngôn ngữ Anh', campus: 'DLX', combinationIds: ENGLISH_MAJOR, threshold30: 23.54 },
  { code: '7310101A-DLX', maNganh: '7310101A', name: 'Kinh tế lao động', campus: 'DLX', combinationIds: ECON_LABOR, threshold30: 17.0 },
  { code: '7310101B-DLX', maNganh: '7310101B', name: 'Kinh tế số', campus: 'DLX', combinationIds: ECON_LABOR, threshold30: 21.53 },
  { code: '7310401A-DLX', maNganh: '7310401A', name: 'Tâm lý học', campus: 'DLX', combinationIds: PSYCHOLOGY, threshold30: 24.78 },
  { code: '7310401B-DLX', maNganh: '7310401B', name: 'Tâm lý học học đường', campus: 'DLX', combinationIds: PSYCHOLOGY, threshold30: 22.98 },
  { code: '7340101A-DLX', maNganh: '7340101A', name: 'Quản trị kinh doanh', campus: 'DLX', combinationIds: BUSINESS, threshold30: 21.69 },
  { code: '7340101B-DLX', maNganh: '7340101B', name: 'Marketing và truyền thông', campus: 'DLX', combinationIds: BUSINESS, threshold30: 23.33 },
  { code: '7340101C-DLX', maNganh: '7340101C', name: 'Logistics và quản trị chuỗi cung ứng', campus: 'DLX', combinationIds: BUSINESS, threshold30: 23.22 },
  { code: '7340201A-DLX', maNganh: '7340201A', name: 'Tài chính - Ngân hàng', campus: 'DLX', combinationIds: FINANCE, threshold30: 21.02 },
  { code: '7340201B-DLX', maNganh: '7340201B', name: 'Công nghệ tài chính', campus: 'DLX', combinationIds: FINANCE, threshold30: 17.5 },
  { code: '7340204A-DLX', maNganh: '7340204A', name: 'Bảo hiểm', campus: 'DLX', combinationIds: INSURANCE, threshold30: 16.5 },
  { code: '7340204B-DLX', maNganh: '7340204B', name: 'Tài chính và quản trị rủi ro', campus: 'DLX', combinationIds: INSURANCE, threshold30: 16.5 },
  { code: '7340204C-DLX', maNganh: '7340204C', name: 'Đầu tư tài chính', campus: 'DLX', combinationIds: INSURANCE, threshold30: 16.5 },
  { code: '7340207-DLX', maNganh: '7340207', name: 'Bảo hiểm - Tài chính', campus: 'DLX', combinationIds: INSURANCE_FINANCE, threshold30: 16.5 },
  { code: '7340301A-DLX', maNganh: '7340301A', name: 'Kế toán', campus: 'DLX', combinationIds: ACCOUNTING, threshold30: 21.69 },
  { code: '7340301B-DLX', maNganh: '7340301B', name: 'Phân tích dữ liệu trong kế toán', campus: 'DLX', combinationIds: ACCOUNTING, threshold30: 16.5 },
  { code: '7340301C-DLX', maNganh: '7340301C', name: 'Kế toán quản trị định hướng CMA', campus: 'DLX', combinationIds: ACCOUNTING, threshold30: 16.5 },
  { code: '7340302-DLX', maNganh: '7340302', name: 'Kiểm toán', campus: 'DLX', combinationIds: BUSINESS, threshold30: 20.02 },
  { code: '7340404A-DLX', maNganh: '7340404A', name: 'Quản trị nhân lực', campus: 'DLX', combinationIds: HR, threshold30: 23.42 },
  { code: '7340404B-DLX', maNganh: '7340404B', name: 'Quản trị nhân lực số', campus: 'DLX', combinationIds: HR, threshold30: 21.34 },
  { code: '7340404C-DLX', maNganh: '7340404C', name: 'Quản trị nhân lực và văn phòng', campus: 'DLX', combinationIds: HR, threshold30: 22.77 },
  { code: '7340405-DLX', maNganh: '7340405', name: 'Hệ thống thông tin quản lý', campus: 'DLX', combinationIds: MIS, threshold30: 18.85 },
  { code: '7380107-DLX', maNganh: '7380107', name: 'Luật kinh tế', campus: 'DLX', combinationIds: LAW, threshold30: 23.02 },
  { code: '7480201-DLX', maNganh: '7480201', name: 'Công nghệ thông tin', campus: 'DLX', combinationIds: IT, threshold30: 20.09 },
  { code: '7760101A-DLX', maNganh: '7760101A', name: 'Công tác xã hội', campus: 'DLX', combinationIds: SOCIAL_WORK, threshold30: 24.32 },
  { code: '7760101B-DLX', maNganh: '7760101B', name: 'Dịch vụ chăm sóc xã hội với người cao tuổi', campus: 'DLX', combinationIds: SOCIAL_WORK, threshold30: 19.0 },
  { code: '7810103A-DLX', maNganh: '7810103A', name: 'Quản trị dịch vụ du lịch và Lữ hành', campus: 'DLX', combinationIds: TOURISM, threshold30: 23.34 },
  { code: '7810103B-DLX', maNganh: '7810103B', name: 'Quản trị khách sạn', campus: 'DLX', combinationIds: TOURISM, threshold30: 22.41 },

  // ----- Cơ sở II TP. Hồ Chí Minh (DLS) — 14 chương trình -----
  { code: '7220201-DLS', maNganh: '7220201', name: 'Ngôn ngữ Anh', campus: 'DLS', combinationIds: ENGLISH_MAJOR, threshold30: 23.0 },
  { code: '7310101A-DLS', maNganh: '7310101A', name: 'Kinh tế lao động', campus: 'DLS', combinationIds: ECON_LABOR, threshold30: 18.5 },
  { code: '7310401A-DLS', maNganh: '7310401A', name: 'Tâm lý học', campus: 'DLS', combinationIds: PSYCHOLOGY, threshold30: 25.05 },
  { code: '7340101A-DLS', maNganh: '7340101A', name: 'Quản trị kinh doanh', campus: 'DLS', combinationIds: BUSINESS, threshold30: 21.0 },
  { code: '7340101B-DLS', maNganh: '7340101B', name: 'Marketing và truyền thông', campus: 'DLS', combinationIds: BUSINESS, threshold30: 22.5 },
  { code: '7340101C-DLS', maNganh: '7340101C', name: 'Logistics và quản trị chuỗi cung ứng', campus: 'DLS', combinationIds: BUSINESS, threshold30: 22.0 },
  { code: '7340201A-DLS', maNganh: '7340201A', name: 'Tài chính - Ngân hàng', campus: 'DLS', combinationIds: FINANCE, threshold30: 21.25 },
  { code: '7340207-DLS', maNganh: '7340207', name: 'Bảo hiểm - Tài chính', campus: 'DLS', combinationIds: INSURANCE_FINANCE, threshold30: 16.0 },
  { code: '7340301A-DLS', maNganh: '7340301A', name: 'Kế toán', campus: 'DLS', combinationIds: ACCOUNTING, threshold30: 22.0 },
  { code: '7340302-DLS', maNganh: '7340302', name: 'Kiểm toán', campus: 'DLS', combinationIds: BUSINESS, threshold30: 18.0 },
  { code: '7340404A-DLS', maNganh: '7340404A', name: 'Quản trị nhân lực', campus: 'DLS', combinationIds: HR, threshold30: 23.0 },
  { code: '7340405-DLS', maNganh: '7340405', name: 'Hệ thống thông tin quản lý', campus: 'DLS', combinationIds: MIS, threshold30: 17.8 },
  { code: '7380107-DLS', maNganh: '7380107', name: 'Luật kinh tế', campus: 'DLS', combinationIds: LAW, threshold30: 20.0 },
  { code: '7760101A-DLS', maNganh: '7760101A', name: 'Công tác xã hội', campus: 'DLS', combinationIds: SOCIAL_WORK, threshold30: 24.1 },
] as const;

export const ULSA_PROGRAM_BY_CODE: ReadonlyMap<string, UlsaProgram> = new Map(ULSA_PROGRAMS.map((program) => [program.code, program]));

export const ULSA_CAMPUS_LABELS: Record<UlsaCampus, string> = {
  DLX: 'Trụ sở chính Hà Nội (DLX)',
  DLS: 'Cơ sở II TP. Hồ Chí Minh (DLS)',
};
