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
  /** D00 — thêm khi implement TUMP 2025 (Trường Đại học Y - Dược, Đại học Thái Nguyên). Thành phần
   * môn (Toán, Ngữ văn, Tiếng Anh) trùng với D01, nhưng "Thông tin tuyển sinh đại học năm 2025"
   * (dnpu — thực ra tuyensinh.tump.edu.vn, xem `schools/tump/sources.ts`) liệt kê nguyên văn mã
   * "D00: Toán, Ngữ văn, Tiếng Anh" cho ngành Điều dưỡng/Hộ sinh — giữ nguyên mã trường tự công bố
   * thay vì tự ý gộp vào D01, cùng tiền lệ cặp B08/D08 trùng thành phần môn ở trên. */
  { id: 'D00', subjects: ['math', 'literature', 'english'] },
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
  /** A07/B03/D15 — thêm khi implement VNU-UED 2025 (Trường ĐH Giáo dục - ĐHQGHN, khối ngành sư
   * phạm dùng tổ hợp có Lịch sử/Địa lý/Sinh học kèm Toán/Văn/Anh). */
  { id: 'A07', subjects: ['math', 'history', 'geography'] },
  { id: 'B03', subjects: ['math', 'biology', 'literature'] },
  { id: 'D15', subjects: ['literature', 'geography', 'english'] },
  /** X02 — thêm khi implement HUST 2025 (Toán/Ngữ văn/Tin học — tổ hợp "khối văn" song song với
   * B03/C01/C02 mà HUST dùng cho gần như mọi ngành, xem `schools/hust/thresholds2025.ts`). */
  { id: 'X02', subjects: ['math', 'literature', 'informatics'] },
  /** X06/X07/X10/X11 — thêm khi implement PVU 2026 (Trường Đại học Dầu khí Việt Nam dùng đủ 11 tổ
   * hợp thi TN THPT: A00/A01/A02/B00/C01/C02/D07 đã có sẵn + 4 tổ hợp riêng có môn Tin học/Công
   * nghệ, xem `schools/pvu/sources.ts`). */
  { id: 'X06', subjects: ['math', 'physics', 'informatics'] },
  { id: 'X07', subjects: ['math', 'physics', 'technology'] },
  { id: 'X10', subjects: ['math', 'chemistry', 'informatics'] },
  { id: 'X11', subjects: ['math', 'chemistry', 'technology'] },
  /** C05/C08/D11/D12/D13/X05/X13/X14/X25/X59/X70/X74/X78 — thêm khi implement CTUET 2025 (Trường
   * Đại học Kỹ thuật - Công nghệ Cần Thơ dùng đủ các tổ hợp này trong Phụ lục "Thông tin tuyển sinh
   * năm 2025", xem `schools/ctuet/thresholds.ts`). X16 (Toán, Sinh học, CN nông nghiệp) của CTUET
   * KHÔNG có SubjectId tương ứng ("CN nông nghiệp" không nằm trong danh mục môn) — chưa mô hình hoá,
   * xem `schools/ctuet/knowledgeGaps.ts`. */
  { id: 'C05', subjects: ['literature', 'physics', 'chemistry'] },
  { id: 'C08', subjects: ['literature', 'chemistry', 'biology'] },
  { id: 'D11', subjects: ['literature', 'physics', 'english'] },
  { id: 'D12', subjects: ['literature', 'chemistry', 'english'] },
  { id: 'D13', subjects: ['literature', 'biology', 'english'] },
  { id: 'X05', subjects: ['math', 'physics', 'civic-economic-law'] },
  { id: 'X13', subjects: ['math', 'biology', 'civic-economic-law'] },
  { id: 'X14', subjects: ['math', 'biology', 'informatics'] },
  { id: 'X25', subjects: ['math', 'civic-economic-law', 'english'] },
  { id: 'X59', subjects: ['literature', 'physics', 'informatics'] },
  { id: 'X70', subjects: ['literature', 'history', 'civic-economic-law'] },
  { id: 'X74', subjects: ['literature', 'geography', 'civic-economic-law'] },
  { id: 'X78', subjects: ['literature', 'civic-economic-law', 'english'] },
  /** X21/X26/D66 — thêm khi implement HTU 2025 (Trường Đại học Hà Tĩnh dùng các tổ hợp này cho
   * ngành Kỹ thuật xây dựng/Công nghệ thông tin/Ngôn ngữ Anh, xem `schools/htu/thresholds.ts`). */
  { id: 'X21', subjects: ['math', 'geography', 'civic-economic-law'] },
  { id: 'X26', subjects: ['math', 'informatics', 'english'] },
  { id: 'D66', subjects: ['literature', 'civic-economic-law', 'english'] },
  /** X79 — thêm khi implement BLU 2026 (Trường Đại học Bạc Liêu, ngành Ngôn ngữ Anh dùng tổ hợp
   * Ngữ văn/Tin học/Tiếng Anh, xem `schools/blu/thresholds.ts`). */
  { id: 'X79', subjects: ['literature', 'informatics', 'english'] },
  /** A10/A11/C20 — thêm khi implement HBU 2025 (Trường Đại học Hòa Bình). A10 (Toán/Vật lý/GDKTPL)
   * và C20 (Ngữ văn/Địa lý/GDKTPL) trùng thành phần môn với X05/X74 đã có sẵn (mã tổ hợp quốc gia
   * khác nhau nhưng cùng 3 môn — cùng tiền lệ cặp C14/X01, D08/B08 ở trên); A11 (Toán/Hóa học/GDKTPL)
   * là tổ hợp mới, xem `schools/hbu/sources.ts`. */
  { id: 'A10', subjects: ['math', 'physics', 'civic-economic-law'] },
  { id: 'A11', subjects: ['math', 'chemistry', 'civic-economic-law'] },
  { id: 'C20', subjects: ['literature', 'geography', 'civic-economic-law'] },
  /** A06/A08/X17/X22 — thêm khi implement VHS 2026 (Trường Đại học Văn hóa TP.HCM). A08 (Toán/Lịch
   * sử/GDKTPL) và X17 (cùng 3 môn, mã tổ hợp quốc gia khác nhau) trùng thành phần môn — cùng tiền lệ
   * cặp C14/X01, D08/B08 ở trên; A06 (Toán/Hóa học/Địa lý) và X22 (Toán/Địa lý/Tin học) là tổ hợp
   * mới, xem `schools/vhs/sources.ts`. */
  { id: 'A06', subjects: ['math', 'chemistry', 'geography'] },
  { id: 'A08', subjects: ['math', 'history', 'civic-economic-law'] },
  { id: 'X17', subjects: ['math', 'history', 'civic-economic-law'] },
  { id: 'X22', subjects: ['math', 'geography', 'informatics'] },
  /** A04 — thêm khi implement VYA 2026 (Học viện Thanh thiếu niên Việt Nam, ngành Công nghệ thông
   * tin/Kinh tế dùng tổ hợp Toán/Vật lí/Địa lí, xem `schools/vya/thresholds.ts`). */
  { id: 'A04', subjects: ['math', 'physics', 'geography'] },
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
