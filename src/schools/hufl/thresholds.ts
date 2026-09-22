/** HUFL 2026 — điểm chuẩn trúng tuyển thật theo MÃ NGÀNH, phương thức 1 (thi TN THPT, đợt 1),
 * ảnh infographic chính chủ (`sources.ts:hufl-cutoff-2026`). Thang điểm 30. */
export const HUFL_THPT_EXAM_THRESHOLD_30_BY_PROGRAM_CODE: Record<string, number> = {
  '7140231': 27.77, // Sư phạm Tiếng Anh
  '7140233': 23.7, // Sư phạm Tiếng Pháp
  '7140234': 27.7, // Sư phạm Tiếng Trung Quốc
  '7220201': 20.5, // Ngôn ngữ Anh
  '7220202': 15, // Ngôn ngữ Nga
  '7220203': 15, // Ngôn ngữ Pháp
  '7220204': 23.5, // Ngôn ngữ Trung Quốc
  '7220209': 15.5, // Ngôn ngữ Nhật
  '7220210': 20.5, // Ngôn ngữ Hàn Quốc
  '7310601': 15, // Quốc tế học
  '7310630': 15, // Việt Nam học
  '7310640': 15, // Hoa Kỳ học
  '7320107': 15, // Truyền thông quốc tế
};

export const HUFL_PROGRAM_LABELS: Record<string, string> = {
  '7140231': 'Sư phạm Tiếng Anh',
  '7140233': 'Sư phạm Tiếng Pháp',
  '7140234': 'Sư phạm Tiếng Trung Quốc',
  '7220201': 'Ngôn ngữ Anh',
  '7220202': 'Ngôn ngữ Nga',
  '7220203': 'Ngôn ngữ Pháp',
  '7220204': 'Ngôn ngữ Trung Quốc',
  '7220209': 'Ngôn ngữ Nhật',
  '7220210': 'Ngôn ngữ Hàn Quốc',
  '7310601': 'Quốc tế học',
  '7310630': 'Việt Nam học',
  '7310640': 'Hoa Kỳ học',
  '7320107': 'Truyền thông quốc tế',
};

export type HuflProgramCode = keyof typeof HUFL_THPT_EXAM_THRESHOLD_30_BY_PROGRAM_CODE;

/**
 * Tổ hợp môn KHẢ DỤNG mô hình hoá được cho từng ngành (nguồn `sources.ts:hufl-admission-info-2026`,
 * mục V, ảnh chụp chỉ tiêu). Mỗi ngành thật ra có 3-6 tổ hợp chính thức, nhưng nhiều tổ hợp dùng môn
 * ngoại ngữ Pháp/Trung/Nhật/Nga/Hàn làm MỘT MÔN THI — `SubjectId` (`core/subjects.ts`) chưa có các
 * môn này (chỉ có `english`) nên KHÔNG mô hình hoá được, tương tự tiền lệ HAUI/HDIU/HANU. Danh sách
 * dưới đây CHỈ liệt kê các tổ hợp dùng toàn môn đã có trong `SubjectId` (Toán/Văn/Anh/Sử/Địa/GDCD-
 * GDKTPL) — KHÔNG suy luận thêm ngoài đúng những gì ảnh chụp liệt kê cho từng ngành.
 */
export const HUFL_MODELED_COMBINATIONS_BY_PROGRAM_CODE: Record<string, readonly string[]> = {
  '7140231': ['D01', 'D14', 'D15'],
  '7140233': ['D01', 'D15'],
  '7140234': ['D01', 'D15'],
  '7220201': ['D01', 'D14', 'D15'],
  '7220202': ['D01', 'D14', 'D15'],
  '7220203': ['D01', 'D14', 'D15'],
  '7220204': ['D01', 'D15'],
  '7220209': ['D01', 'D15'],
  '7220210': ['D01', 'D14', 'D15'],
  '7310601': ['D01', 'D14', 'D15', 'X78'],
  '7310630': ['D01', 'D14', 'D15', 'C00', 'X78'],
  '7310640': ['D01', 'D14', 'D15', 'X78'],
  '7320107': ['D01', 'D14', 'D15', 'X78'],
};
