/** HANU 2026 — điểm trúng tuyển thật theo mã ngành/CTĐT, phương thức thi TN THPT (thang 40), Quyết
 * định 3222/QĐ-ĐHHN (10/8/2026). Loại `7220101` (Tiếng Việt và Văn hóa Việt Nam — chỉ xét học bạ
 * cho người nước ngoài, không có phương thức thi TN THPT). */
export const HANU_THPT_EXAM_THRESHOLD_40_BY_PROGRAM_CODE: Record<string, number> = {
  '7220201': 34.45, // Ngôn ngữ Anh
  '7220201 TM': 31.15, // Ngôn ngữ Anh - thương mại
  '7220201 TT': 32.84, // Ngôn ngữ Anh - chương trình tiên tiến (CTTT)
  '7220202': 23.73, // Ngôn ngữ Nga
  '7220203': 25.67, // Ngôn ngữ Pháp
  '7220204': 34.2, // Ngôn ngữ Trung Quốc
  '7220204 TT': 33.15, // Ngôn ngữ Trung Quốc - CTTT
  '7220205': 27.33, // Ngôn ngữ Đức
  '7220206': 24.6, // Ngôn ngữ Tây Ban Nha
  '7220207': 23.13, // Ngôn ngữ Bồ Đào Nha
  '7220208': 23.2, // Ngôn ngữ Italia
  '7220208 TT': 22.2, // Ngôn ngữ Italia - CTTT
  '7220209': 29.07, // Ngôn ngữ Nhật
  '7220210': 32.14, // Ngôn ngữ Hàn Quốc
  '7220210 TT': 29.46, // Ngôn ngữ Hàn Quốc - CTTT
  '7310111': 26.73, // Nghiên cứu phát triển
  '7310206': 30.33, // Quan hệ quốc tế
  '7310601': 28.73, // Quốc tế học
  '7320104': 29.6, // Truyền thông đa phương tiện
  '7320109': 22.4, // Truyền thông doanh nghiệp
  '7340101': 24.13, // Quản trị kinh doanh
  '7340115': 29.13, // Marketing
  '7340201': 25.73, // Tài chính - Ngân hàng
  '7340205': 24.53, // Công nghệ tài chính
  '7340301': 23.53, // Kế toán
  '7480201': 22.0, // Công nghệ thông tin
  '7480201 TT': 22.0, // Công nghệ thông tin - CTTT
  '7810103': 27.47, // Quản trị Dịch vụ du lịch và lữ hành
  '7810103 TT': 24.47, // Quản trị Dịch vụ du lịch và lữ hành - CTTT
};

export const HANU_PROGRAM_LABELS: Record<string, string> = {
  '7220201': 'Ngôn ngữ Anh',
  '7220201 TM': 'Ngôn ngữ Anh - thương mại',
  '7220201 TT': 'Ngôn ngữ Anh - chương trình tiên tiến',
  '7220202': 'Ngôn ngữ Nga',
  '7220203': 'Ngôn ngữ Pháp',
  '7220204': 'Ngôn ngữ Trung Quốc',
  '7220204 TT': 'Ngôn ngữ Trung Quốc - CTTT',
  '7220205': 'Ngôn ngữ Đức',
  '7220206': 'Ngôn ngữ Tây Ban Nha',
  '7220207': 'Ngôn ngữ Bồ Đào Nha',
  '7220208': 'Ngôn ngữ Italia',
  '7220208 TT': 'Ngôn ngữ Italia - CTTT',
  '7220209': 'Ngôn ngữ Nhật',
  '7220210': 'Ngôn ngữ Hàn Quốc',
  '7220210 TT': 'Ngôn ngữ Hàn Quốc - CTTT',
  '7310111': 'Nghiên cứu phát triển',
  '7310206': 'Quan hệ quốc tế',
  '7310601': 'Quốc tế học',
  '7320104': 'Truyền thông đa phương tiện',
  '7320109': 'Truyền thông doanh nghiệp',
  '7340101': 'Quản trị kinh doanh',
  '7340115': 'Marketing',
  '7340201': 'Tài chính - Ngân hàng',
  '7340205': 'Công nghệ tài chính',
  '7340301': 'Kế toán',
  '7480201': 'Công nghệ thông tin',
  '7480201 TT': 'Công nghệ thông tin - CTTT',
  '7810103': 'Quản trị Dịch vụ du lịch và lữ hành',
  '7810103 TT': 'Quản trị Dịch vụ du lịch và lữ hành - CTTT',
};

/** Mã ngành có môn Ngữ văn (thay vì Toán) nhân hệ số 2, cùng với Ngoại ngữ. Tất cả mã ngành còn
 * lại trong bảng trên dùng Toán & Ngoại ngữ nhân hệ số 2 (mặc định). */
export const HANU_LITERATURE_WEIGHTED_PROGRAM_CODES = new Set(['7310111', '7310206', '7310601']);

export type HanuProgramCode = keyof typeof HANU_THPT_EXAM_THRESHOLD_40_BY_PROGRAM_CODE;
