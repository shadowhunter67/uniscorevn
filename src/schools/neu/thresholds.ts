/** NEU 2026 — điểm chuẩn trúng tuyển thật theo mã ngành CHUẨN (không gồm chương trình tiên tiến
 * TT1/TT2, chất lượng cao CLC1-3, POHE, hay các mã tuyển sinh EP xét tuyển kết hợp riêng — những
 * mã này dùng phương thức/tổ hợp xét tuyển khác PTXT5, ngoài phạm vi), Thông báo 1890/TB-ĐHKTQD
 * (09/8/2026). `sources.ts:neu-cutoff-2026`. */
export const NEU_THPT_EXAM_THRESHOLD_30_BY_PROGRAM_CODE: Record<string, number> = {
  '7480202': 26.0, // An toàn thông tin
  '7340204': 25.35, // Bảo hiểm
  '7340116': 25.36, // Bất động sản
  '7340205': 27.52, // Công nghệ tài chính
  '7480201': 25.68, // Công nghệ thông tin
  '7480104': 27.09, // Hệ thống thông tin
  '7340405': 28.01, // Hệ thống thông tin quản lý
  '7340301': 27.3, // Kế toán
  '7480101': 26.19, // Khoa học máy tính
  '7340401': 26.3, // Khoa học quản lý
  '7340302': 28.84, // Kiểm toán
  '7620114': 24.75, // Kinh doanh nông nghiệp
  '7340120': 28.5, // Kinh doanh quốc tế
  '7340121': 27.94, // Kinh doanh thương mại
  '7310104': 27.56, // Kinh tế đầu tư
  '7310101P1': 26.64, // Kinh tế học
  '7620115': 24.59, // Kinh tế nông nghiệp
  '7310105': 26.79, // Kinh tế phát triển
  '7310106': 28.3, // Kinh tế quốc tế
  '7850102': 24.38, // Kinh tế tài nguyên thiên nhiên
  '7310101P2': 25.9, // Kinh tế và quản lý đô thị
  '7310101P3': 27.07, // Kinh tế và quản lý nguồn nhân lực
  '7510605': 28.53, // Logistics và Quản lý chuỗi cung ứng
  '7380101': 25.52, // Luật
  '7380107': 26.62, // Luật kinh tế
  '7380109': 26.38, // Luật thương mại quốc tế
  '7340115': 27.99, // Marketing
  '7220201': 26.46, // Ngôn ngữ Anh
  '7320108': 27.58, // Quan hệ công chúng
  '7340408': 25.52, // Quan hệ lao động
  '7340403': 25.37, // Quản lý công
  '7850103': 24.75, // Quản lý đất đai
  '7340409': 26.67, // Quản lý dự án
  '7850101': 24.2, // Quản lý tài nguyên và môi trường
  '7810103': 25.79, // Quản trị dịch vụ du lịch và lữ hành
  '7810201': 26.08, // Quản trị khách sạn
  '7340101': 26.85, // Quản trị kinh doanh
  '7340404': 27.25, // Quản trị nhân lực
  '7340201': 27.43, // Tài chính - Ngân hàng
  '7310107': 27.29, // Thống kê kinh tế
  '7340122': 28.62, // Thương mại điện tử
  '7310108': 27.22, // Toán kinh tế
};

export const NEU_PROGRAM_LABELS: Record<string, string> = {
  '7480202': 'An toàn thông tin',
  '7340204': 'Bảo hiểm',
  '7340116': 'Bất động sản',
  '7340205': 'Công nghệ tài chính',
  '7480201': 'Công nghệ thông tin',
  '7480104': 'Hệ thống thông tin',
  '7340405': 'Hệ thống thông tin quản lý',
  '7340301': 'Kế toán',
  '7480101': 'Khoa học máy tính',
  '7340401': 'Khoa học quản lý',
  '7340302': 'Kiểm toán',
  '7620114': 'Kinh doanh nông nghiệp',
  '7340120': 'Kinh doanh quốc tế',
  '7340121': 'Kinh doanh thương mại',
  '7310104': 'Kinh tế đầu tư',
  '7310101P1': 'Kinh tế học',
  '7620115': 'Kinh tế nông nghiệp',
  '7310105': 'Kinh tế phát triển',
  '7310106': 'Kinh tế quốc tế',
  '7850102': 'Kinh tế tài nguyên thiên nhiên',
  '7310101P2': 'Kinh tế và quản lý đô thị',
  '7310101P3': 'Kinh tế và quản lý nguồn nhân lực',
  '7510605': 'Logistics và Quản lý chuỗi cung ứng',
  '7380101': 'Luật',
  '7380107': 'Luật kinh tế',
  '7380109': 'Luật thương mại quốc tế',
  '7340115': 'Marketing',
  '7220201': 'Ngôn ngữ Anh',
  '7320108': 'Quan hệ công chúng',
  '7340408': 'Quan hệ lao động',
  '7340403': 'Quản lý công',
  '7850103': 'Quản lý đất đai',
  '7340409': 'Quản lý dự án',
  '7850101': 'Quản lý tài nguyên và môi trường',
  '7810103': 'Quản trị dịch vụ du lịch và lữ hành',
  '7810201': 'Quản trị khách sạn',
  '7340101': 'Quản trị kinh doanh',
  '7340404': 'Quản trị nhân lực',
  '7340201': 'Tài chính - Ngân hàng',
  '7310107': 'Thống kê kinh tế',
  '7340122': 'Thương mại điện tử',
  '7310108': 'Toán kinh tế',
};

export type NeuProgramCode = keyof typeof NEU_THPT_EXAM_THRESHOLD_30_BY_PROGRAM_CODE;
