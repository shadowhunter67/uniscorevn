/** TNUS 2026 — điểm chuẩn trúng tuyển thật theo mã xét tuyển, phương thức thi TN THPT
 * (`sources.ts:tnus-cutoff-image-2026`, đối chiếu ngưỡng tại `tnus-threshold-2026`). Loại
 * `7220201GV` (Ngôn ngữ Anh định hướng giảng dạy) — có điều kiện thay thế IELTS/học bạ riêng,
 * xem `knowledgeGaps.ts`. */
export const TNUS_THPT_EXAM_THRESHOLD_30_BY_PROGRAM_CODE: Record<string, number> = {
  '7310612': 19.13, // Trung Quốc học
  '7310614': 18.32, // Hàn Quốc học
  '7310630': 18.5, // Việt Nam học
  '7220204': 21.75, // Ngôn ngữ Trung Quốc
  '7220201': 17.87, // Ngôn ngữ Anh
  '7220201AT': 18.25, // Song ngữ Anh - Trung
  '7220201AH': 18.47, // Song ngữ Anh - Hàn
  '7340401': 17.75, // Quản lý nhân lực (Khoa học quản lý)
  '7310110': 17.2, // Quản lý kinh tế
  '7320101': 18.2, // Báo chí
  '7320108': 18.6, // Quan hệ công chúng
  '7380101': 20.0, // Luật
  '7380107': 20.0, // Luật kinh tế
  '7810101': 17.0, // Du lịch
  '7810103': 17.85, // Quản trị dịch vụ du lịch và lữ hành
  '7810301': 16.35, // Quản lý thể dục thể thao
  '7320201': 17.95, // Thông tin - Thư viện
  '7220112': 18.0, // Văn hóa các dân tộc thiểu số Việt Nam
  '7760101': 17.72, // Công tác xã hội
  '7850101': 17.0, // Quản lý tài nguyên và môi trường
  '7440301': 17.0, // Khoa học môi trường
  '7420201': 18.7, // Công nghệ sinh học
  '7720203': 18.98, // Hóa dược
  '7720203TD': 17.38, // Chăm sóc sắc đẹp từ dược liệu
  '7510401': 18.73, // Công nghệ kỹ thuật hóa học
  '7440102TD': 22.5, // Công nghệ bán dẫn — kèm điều kiện Toán ≥ 7,5 (xem evaluate.ts)
  '7460108': 19.22, // Khoa học dữ liệu
  '7480201': 17.13, // Công nghệ thông tin
  '7460117': 17.97, // Toán tin
  '7460101TA': 20.42, // Toán học (định hướng giảng dạy bằng tiếng Anh)
  '7460101TV': 20.0, // Toán học (định hướng giảng dạy bằng tiếng Việt)
  '7460117GV': 20.0, // Toán tin (định hướng giảng dạy)
  '7440102': 20.0, // Vật lý (định hướng giảng dạy)
  '7440112': 20.39, // Hóa học (định hướng giảng dạy)
  '7440112ST': 20.25, // Khoa học Tự nhiên tích hợp STEM
  '7420101': 20.43, // Sinh học (định hướng giảng dạy)
  '7310501': 20.0, // Địa lý học (định hướng giảng dạy)
  '7229010': 21.0, // Lịch sử (Lịch sử - Địa lý và Kinh tế pháp luật)
  '7229030': 21.0, // Văn học (định hướng giảng dạy)
};

export const TNUS_PROGRAM_LABELS: Record<string, string> = {
  '7310612': 'Trung Quốc học',
  '7310614': 'Hàn Quốc học',
  '7310630': 'Việt Nam học',
  '7220204': 'Ngôn ngữ Trung Quốc',
  '7220201': 'Ngôn ngữ Anh',
  '7220201AT': 'Ngôn ngữ Anh (Song ngữ Anh - Trung)',
  '7220201AH': 'Ngôn ngữ Anh (Song ngữ Anh - Hàn)',
  '7340401': 'Khoa học quản lý (Quản lý nhân lực)',
  '7310110': 'Quản lý kinh tế',
  '7320101': 'Báo chí',
  '7320108': 'Quan hệ công chúng',
  '7380101': 'Luật',
  '7380107': 'Luật kinh tế',
  '7810101': 'Du lịch',
  '7810103': 'Quản trị dịch vụ du lịch và lữ hành',
  '7810301': 'Quản lý thể dục thể thao',
  '7320201': 'Thông tin - Thư viện',
  '7220112': 'Văn hóa các dân tộc thiểu số Việt Nam',
  '7760101': 'Công tác xã hội',
  '7850101': 'Quản lý tài nguyên và môi trường',
  '7440301': 'Khoa học môi trường',
  '7420201': 'Công nghệ sinh học',
  '7720203': 'Hóa dược',
  '7720203TD': 'Hóa dược (Chăm sóc sắc đẹp từ dược liệu)',
  '7510401': 'Công nghệ kỹ thuật hóa học',
  '7440102TD': 'Công nghệ bán dẫn',
  '7460108': 'Khoa học dữ liệu',
  '7480201': 'Công nghệ thông tin',
  '7460117': 'Toán tin',
  '7460101TA': 'Toán học (định hướng giảng dạy bằng tiếng Anh)',
  '7460101TV': 'Toán học (định hướng giảng dạy bằng tiếng Việt)',
  '7460117GV': 'Toán tin (định hướng giảng dạy)',
  '7440102': 'Vật lý (định hướng giảng dạy)',
  '7440112': 'Hóa học (định hướng giảng dạy)',
  '7440112ST': 'Khoa học Tự nhiên tích hợp STEM',
  '7420101': 'Sinh học (định hướng giảng dạy)',
  '7310501': 'Địa lý học (định hướng giảng dạy)',
  '7229010': 'Lịch sử (Lịch sử - Địa lý và Kinh tế pháp luật)',
  '7229030': 'Văn học (định hướng giảng dạy)',
};

/** Mã xét tuyển có điều kiện phụ ngoài tổng điểm — xem `evaluate.ts`. */
export const TNUS_LAW_PROGRAM_CODES = new Set(['7380101', '7380107']);
export const TNUS_SEMICONDUCTOR_PROGRAM_CODE = '7440102TD';

export type TnusProgramCode = keyof typeof TNUS_THPT_EXAM_THRESHOLD_30_BY_PROGRAM_CODE;
