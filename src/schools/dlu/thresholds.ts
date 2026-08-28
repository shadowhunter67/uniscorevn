/**
 * DLU 2026 (Trường Đại học Đà Lạt) — mức điểm sàn ĐKXT phương thức thi TN THPT, theo từng mã
 * ngành. Nguồn: Thông báo 1145/TB-ĐHĐL (09/07/2026) — `sources.ts:dlu-threshold-notice-2026`,
 * đọc trực tiếp qua browser thật (curl bị chặn TLS/WAF).
 *
 * "Mức điểm nhận hồ sơ ĐKXT như trên là tổng điểm 3 môn trong Tổ hợp môn đăng ký xét tuyển, KHÔNG
 * nhân hệ số, ĐÃ BAO GỒM điểm ưu tiên khu vực và đối tượng (Điều 7 Quy chế tuyển sinh Bộ GD&ĐT).
 * Điểm sàn không phân biệt giữa các tổ hợp môn." ⇒ ngưỡng so với (tổng thô 3 môn + điểm ưu tiên),
 * bất kỳ tổ hợp nào thí sinh chọn.
 */
export interface DluProgramThreshold {
  code: string;
  programId: string;
  name: string;
  /** Điểm sàn ĐKXT phương thức thi TN THPT (đã gồm điểm ưu tiên), thang 30. */
  threshold30: number;
  /** Điều kiện phụ ngoài ngưỡng chung (nếu có). */
  specialCondition?: 'english-min-6' | 'nuclear-math-physics-min-6.5';
}

export const DLU_PROGRAM_THRESHOLDS: readonly DluProgramThreshold[] = [
  { code: '7140209', programId: 'su-pham-toan-hoc', name: 'Sư phạm Toán học', threshold30: 21.0 },
  { code: '7140211', programId: 'su-pham-vat-ly', name: 'Sư phạm Vật lý', threshold30: 20.0 },
  { code: '7140212', programId: 'su-pham-hoa-hoc', name: 'Sư phạm Hóa học', threshold30: 20.0 },
  { code: '7140213', programId: 'su-pham-sinh-hoc', name: 'Sư phạm Sinh học', threshold30: 20.0 },
  { code: '7140217', programId: 'su-pham-ngu-van', name: 'Sư phạm Ngữ văn', threshold30: 21.0 },
  { code: '7140218', programId: 'su-pham-lich-su', name: 'Sư phạm Lịch sử', threshold30: 20.0 },
  { code: '7140231', programId: 'su-pham-tieng-anh', name: 'Sư phạm Tiếng Anh', threshold30: 21.0, specialCondition: 'english-min-6' },
  { code: '7140210', programId: 'su-pham-tin-hoc', name: 'Sư phạm Tin học', threshold30: 20.0 },
  { code: '7140202', programId: 'giao-duc-tieu-hoc', name: 'Giáo dục Tiểu học', threshold30: 21.0 },
  { code: '7460101', programId: 'toan-hoc', name: 'Toán học (Toán - Tin học)', threshold30: 17.0 },
  { code: '7460108', programId: 'khoa-hoc-du-lieu', name: 'Khoa học dữ liệu', threshold30: 17.0 },
  { code: '7480201', programId: 'cong-nghe-thong-tin', name: 'Công nghệ thông tin', threshold30: 17.0 },
  { code: '7440102', programId: 'vat-ly-hoc', name: 'Vật lý học', threshold30: 17.0 },
  { code: '7510302', programId: 'cnkt-dien-tu-vien-thong', name: 'Công nghệ kỹ thuật Điện tử - Viễn thông', threshold30: 17.0 },
  { code: '7520402', programId: 'ky-thuat-hat-nhan', name: 'Kỹ thuật hạt nhân', threshold30: 18.0, specialCondition: 'nuclear-math-physics-min-6.5' },
  { code: '7510303', programId: 'cnkt-dieu-khien-tu-dong-hoa', name: 'Công nghệ kỹ thuật điều khiển và tự động hóa', threshold30: 17.0 },
  { code: '7440112', programId: 'hoa-hoc', name: 'Hóa học', threshold30: 17.0 },
  { code: '7720203', programId: 'hoa-duoc', name: 'Hóa dược', threshold30: 17.0 },
  { code: '7510406', programId: 'cnkt-moi-truong', name: 'Công nghệ kỹ thuật môi trường', threshold30: 16.5 },
  { code: '7420101', programId: 'sinh-hoc', name: 'Sinh học', threshold30: 17.0 },
  { code: '7420201', programId: 'cong-nghe-sinh-hoc', name: 'Công nghệ sinh học', threshold30: 17.0 },
  { code: '7340101', programId: 'quan-tri-kinh-doanh', name: 'Quản trị kinh doanh', threshold30: 17.0 },
  { code: '7340301', programId: 'ke-toan', name: 'Kế toán', threshold30: 17.0 },
  { code: '7340201', programId: 'tai-chinh-ngan-hang', name: 'Tài chính - Ngân hàng', threshold30: 17.0 },
  { code: '7540101', programId: 'cong-nghe-thuc-pham', name: 'Công nghệ thực phẩm', threshold30: 16.5 },
  { code: '7620109', programId: 'nong-hoc', name: 'Nông học', threshold30: 16.5 },
  { code: '7540104', programId: 'cong-nghe-sau-thu-hoach', name: 'Công nghệ sau thu hoạch', threshold30: 16.5 },
  { code: '7380101', programId: 'luat', name: 'Luật', threshold30: 20.0 },
  { code: '7380104', programId: 'luat-hinh-su-to-tung-hinh-su', name: 'Luật hình sự và tố tụng hình sự', threshold30: 20.0 },
  { code: '7810103', programId: 'qtdv-du-lich-lu-hanh', name: 'Quản trị dịch vụ du lịch và lữ hành', threshold30: 17.0 },
  { code: '7310630', programId: 'viet-nam-hoc', name: 'Việt Nam học', threshold30: 16.0 },
  { code: '7310608', programId: 'dong-phuong-hoc', name: 'Đông phương học (Hàn Quốc học, Nhật Bản học)', threshold30: 17.0 },
  { code: '7310601', programId: 'quoc-te-hoc', name: 'Quốc tế học', threshold30: 16.0 },
  { code: '7229030', programId: 'van-hoc', name: 'Văn học (Ngữ văn tổng hợp, Ngữ văn báo chí)', threshold30: 17.0 },
  { code: '7810106', programId: 'du-lich-van-hoa', name: 'Du lịch văn hóa', threshold30: 17.0 },
  { code: '7229040', programId: 'van-hoa-hoc', name: 'Văn hóa học', threshold30: 16.0 },
  { code: '7310612', programId: 'trung-quoc-hoc', name: 'Trung Quốc học', threshold30: 18.0 },
  { code: '7229010', programId: 'lich-su', name: 'Lịch sử', threshold30: 17.0 },
  { code: '7760101', programId: 'cong-tac-xa-hoi', name: 'Công tác xã hội', threshold30: 17.0 },
  { code: '7310301', programId: 'xa-hoi-hoc', name: 'Xã hội học', threshold30: 16.0 },
  { code: '7220201', programId: 'ngon-ngu-anh', name: 'Ngôn ngữ Anh', threshold30: 17.0, specialCondition: 'english-min-6' },
];

export const DLU_THRESHOLD_BY_CODE: ReadonlyMap<string, DluProgramThreshold> = new Map(
  DLU_PROGRAM_THRESHOLDS.map((entry) => [entry.code, entry])
);
