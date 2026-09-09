/**
 * VUTM (Học viện Y Dược học cổ truyền Việt Nam, mã trường HYD, Hà Nội — trực thuộc Bộ Y tế) 2026,
 * phương thức xét kết quả thi tốt nghiệp THPT năm 2026.
 *
 * Nguồn duy nhất cần thiết: `sources.ts:vutm-diemchuan-3036-2026` (Thông báo số 3036/TB-HVYDCT
 * ngày 10/8/2026, PDF gốc có chữ ký Giám đốc + con dấu, đọc bằng vision) — bảng "I. Điểm chuẩn"
 * tự chứa Tên ngành / Mã ngành / Tổ hợp xét tuyển / Điểm chuẩn, và công thức tính Điểm xét tuyển
 * ngay bên dưới bảng.
 *
 * Điểm chuẩn KHÔNG phân biệt theo tổ hợp — mỗi ngành một mức dùng chung cho mọi tổ hợp đã liệt kê.
 */
export interface VutmProgram {
  /** Mã ngành nguyên văn Thông báo 3036/TB-HVYDCT. */
  code: string;
  name: string;
  /**
   * Tổ hợp xét tuyển ĐÃ mô hình hoá — tập con của danh sách chính thức. D35 (ngành Y học cổ
   * truyền) BỊ LOẠI vì `core/subjects.ts` chưa có mã tổ hợp này và văn bản không chú giải thành
   * phần 3 môn (xem `knowledgeGaps.ts:vutm-d35-combination-not-modeled`).
   */
  combinationIds: readonly string[];
  /** Điểm chuẩn 2026 phương thức xét kết quả thi TN THPT, thang 30. */
  threshold30: number;
}

export const VUTM_PROGRAMS: readonly VutmProgram[] = [
  { code: '7720101', name: 'Y khoa', combinationIds: ['B00', 'B03', 'A02', 'D08', 'X14'], threshold30: 24.5 },
  { code: '7720115', name: 'Y học cổ truyền', combinationIds: ['B00', 'B03', 'A02', 'D08', 'X14'], threshold30: 22.3 },
  { code: '7720201', name: 'Dược học', combinationIds: ['A00', 'B00', 'D07', 'C02', 'X10'], threshold30: 22.0 },
] as const;

export const VUTM_PROGRAM_BY_CODE: ReadonlyMap<string, VutmProgram> = new Map(VUTM_PROGRAMS.map((program) => [program.code, program]));
