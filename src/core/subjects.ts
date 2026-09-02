/**
 * Danh mục môn học dùng chung — chỉ các môn thật sự xuất hiện trong tổ hợp xét tuyển ĐH VN phổ
 * biến + các môn đã cần tới trong research hiện có (HCMUT/UIT/UEL/UEH). KHÔNG map field cũ của
 * form HCMUT (`math`/`subject2`/`subject3`) sang taxonomy này trong batch này — UI giữ nguyên,
 * chỉ adapter (khi cần) mới quy đổi qua lại, tránh refactor UI lớn không cần thiết.
 */
export type SubjectId =
  | 'math'
  | 'literature'
  | 'english'
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'history'
  | 'geography'
  | 'informatics'
  | 'technology'
  | 'civic-economic-law'
  | 'other';

export interface SubjectCombination {
  id: string;
  subjects: readonly SubjectId[];
}

/**
 * Chỉ vài tổ hợp phổ biến nhất, đủ phục vụ adapter/test hiện tại — KHÔNG cố phủ toàn bộ danh
 * sách tổ hợp Bộ GD&ĐT (A00-D90...) vì chưa có consumer thật cần tới phần còn lại.
 */
export const COMMON_SUBJECT_COMBINATIONS: readonly SubjectCombination[] = [
  { id: 'A00', subjects: ['math', 'physics', 'chemistry'] },
  { id: 'A01', subjects: ['math', 'physics', 'english'] },
  { id: 'A02', subjects: ['math', 'physics', 'biology'] },
  { id: 'B00', subjects: ['math', 'chemistry', 'biology'] },
  /** B08 — thêm khi implement UMP 2026 (health-science school combo Toán/Sinh/Anh). */
  { id: 'B08', subjects: ['math', 'biology', 'english'] },
  { id: 'D01', subjects: ['math', 'literature', 'english'] },
  /** D07 — thêm khi implement UMP 2026 (health-science school combo Toán/Hóa/Anh). */
  { id: 'D07', subjects: ['math', 'chemistry', 'english'] },
  /** D10 — thêm khi implement HMU 2026 (Toán/Địa lý/Anh, dùng cho các ngành khối xã hội của HMU). */
  { id: 'D10', subjects: ['math', 'geography', 'english'] },
  /** D08 — thêm khi implement HPMU 2025 (Toán/Sinh/Anh — cùng thành phần môn với B08 nhưng mã tổ
   * hợp quốc gia khác nhau, xác nhận qua nhiều nguồn thứ cấp độc lập, không mâu thuẫn cho tổ hợp
   * này — khác lo ngại ghi ở comment C01/C02/C04 bên dưới vốn nói về HAUI). */
  { id: 'D08', subjects: ['math', 'biology', 'english'] },
  /** C01/C02/C04 — thêm khi implement HAUI 2026 (chỉ 3/21 tổ hợp HAUI dùng ánh xạ theo taxonomy
   * này; các tổ hợp còn lại — B03, C03, D04, D06, D08, D14, D15, DD2, và ký hiệu riêng của trường
   * X05/X06/X07/X25 — dùng môn ngoại ngữ Trung/Nhật/Hàn hoặc thành phần KHÔNG xác định được đáng
   * tin cậy (D08 có nhiều nguồn thứ cấp mâu thuẫn nhau về môn thứ 3), chưa mô hình hoá, xem
   * `schools/haui/knowledgeGaps.ts`). */
  { id: 'C01', subjects: ['literature', 'math', 'physics'] },
  { id: 'C02', subjects: ['literature', 'math', 'chemistry'] },
  { id: 'C04', subjects: ['literature', 'math', 'geography'] },
  /** C00/C03/D09/D14 — thêm khi implement BAV 2026 (Học viện Ngân hàng dùng đủ 8 tổ hợp quốc gia
   * A00/A01/D01/D07/D09/D14/C00/C03 cho phương thức xét điểm thi TN THPT, xem `schools/bav`). */
  { id: 'C00', subjects: ['literature', 'history', 'geography'] },
  { id: 'C03', subjects: ['literature', 'math', 'history'] },
  { id: 'D09', subjects: ['math', 'history', 'english'] },
  { id: 'D14', subjects: ['literature', 'history', 'english'] },
  /** A09/A12/A13/A14/C14/C19/B04 — thêm khi implement HDIU 2025 (Đại học Đông Đô dùng đủ các tổ
   * hợp có môn GDKTPL/Tin học của bảng mã ngành đại học chính quy — 3 tổ hợp còn lại của HDIU
   * dùng Tiếng Trung/Nhật/Hàn không có trong `SubjectId`, chưa mô hình hoá, xem
   * `schools/hdiu/knowledgeGaps.ts`). */
  { id: 'A09', subjects: ['math', 'geography', 'civic-economic-law'] },
  { id: 'A12', subjects: ['math', 'english', 'informatics'] },
  { id: 'A13', subjects: ['math', 'literature', 'informatics'] },
  { id: 'A14', subjects: ['math', 'physics', 'informatics'] },
  { id: 'C14', subjects: ['literature', 'math', 'civic-economic-law'] },
  { id: 'C19', subjects: ['literature', 'history', 'civic-economic-law'] },
  { id: 'B04', subjects: ['math', 'biology', 'civic-economic-law'] },
  /** D84 — thêm khi implement TMU 2025 (Đại học Thương mại, tổ hợp Toán/GDKTPL/Tiếng Anh). */
  { id: 'D84', subjects: ['math', 'civic-economic-law', 'english'] },
  /** X01 — thêm khi implement VNU-UEB 2025 (Trường ĐH Kinh tế - ĐHQGHN). Thành phần môn Ngữ văn/
   * Toán/GDKTPL trùng với C14 (mã tổ hợp quốc gia khác nhau nhưng cùng 3 môn) — xác nhận qua nhiều
   * nguồn thứ cấp độc lập, xem `schools/vnueb/sources.ts`. */
  { id: 'X01', subjects: ['literature', 'math', 'civic-economic-law'] },
];

/** Nhãn tiếng Việt — dùng ở bất kỳ trường nào cần hiển thị tên môn cho người dùng chọn. */
export const SUBJECT_LABELS: Record<SubjectId, string> = {
  math: 'Toán',
  literature: 'Ngữ văn',
  english: 'Tiếng Anh',
  physics: 'Vật lý',
  chemistry: 'Hóa học',
  biology: 'Sinh học',
  history: 'Lịch sử',
  geography: 'Địa lý',
  informatics: 'Tin học',
  technology: 'Công nghệ',
  'civic-economic-law': 'Giáo dục Kinh tế và Pháp luật',
  other: 'Môn khác',
};

/** Danh sách chọn trong dropdown — loại 'math' (HCMUT luôn cố định Toán, không cho chọn lại). */
export const SELECTABLE_SUBJECT_IDS: readonly SubjectId[] = [
  'literature',
  'english',
  'physics',
  'chemistry',
  'biology',
  'history',
  'geography',
  'informatics',
  'technology',
  'civic-economic-law',
  'other',
];
