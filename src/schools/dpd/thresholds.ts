/** DPD 2026 — điểm chuẩn trúng tuyển thật theo CHƯƠNG TRÌNH ĐÀO TẠO, phương thức thi TN THPT
 * (mã 100/405), infographic chính chủ (`sources.ts:dpd-cutoff-2026`). Trường không công bố mã
 * ngành/mã xét tuyển kèm theo trong nguồn đã đọc — dùng SLUG tên chương trình làm khoá ổn định
 * (`DpdProgramSlug`) thay vì mã ngành MOET (tránh đoán mã sai, score-affecting). */
export const DPD_THPT_EXAM_THRESHOLD_30_BY_PROGRAM_SLUG: Record<string, number> = {
  cntt: 15, // Công nghệ thông tin
  'cntt-viet-nhat': 15, // Công nghệ thông tin Việt Nhật
  'tri-tue-nhan-tao': 15, // Trí tuệ nhân tạo
  'httt-quan-ly': 15, // Hệ thống thông tin quản lý
  logistics: 15, // Logistics và Quản lý chuỗi cung ứng
  'truyen-thong-da-phuong-tien': 16.5, // Truyền thông đa phương tiện
  'marketing-so': 15, // Marketing số
  'quan-he-cong-chung': 15, // Quan hệ công chúng
  'thuong-mai-dien-tu': 15.5, // Thương mại điện tử
  'kinh-doanh-so': 15, // Kinh doanh số
  'he-thong-dien': 15, // Hệ thống điện
  'tu-dong-hoa': 15, // Tự động hóa
  'cnkt-co-dien-tu': 15.5, // Công nghệ kỹ thuật Cơ điện tử
  'cnkt-o-to': 17, // Công nghệ kỹ thuật ô tô
};

export const DPD_PROGRAM_LABELS: Record<string, string> = {
  cntt: 'Công nghệ thông tin',
  'cntt-viet-nhat': 'Công nghệ thông tin Việt Nhật',
  'tri-tue-nhan-tao': 'Trí tuệ nhân tạo',
  'httt-quan-ly': 'Hệ thống thông tin quản lý',
  logistics: 'Logistics và Quản lý chuỗi cung ứng',
  'truyen-thong-da-phuong-tien': 'Truyền thông đa phương tiện',
  'marketing-so': 'Marketing số',
  'quan-he-cong-chung': 'Quan hệ công chúng',
  'thuong-mai-dien-tu': 'Thương mại điện tử',
  'kinh-doanh-so': 'Kinh doanh số',
  'he-thong-dien': 'Hệ thống điện',
  'tu-dong-hoa': 'Tự động hóa',
  'cnkt-co-dien-tu': 'Công nghệ kỹ thuật Cơ điện tử',
  'cnkt-o-to': 'Công nghệ kỹ thuật ô tô',
};

export type DpdProgramSlug = keyof typeof DPD_THPT_EXAM_THRESHOLD_30_BY_PROGRAM_SLUG;
