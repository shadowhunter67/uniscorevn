import type { SubjectId } from '../../core/subjects';

/**
 * HMTU (Trường Đại học Kỹ thuật Y tế Hải Dương, mã trường DKY — trực thuộc Bộ Y tế) 2026,
 * Phương thức 2 (xét kết quả điểm thi tốt nghiệp THPT năm 2026).
 *
 * ĐẶC THÙ: công thức NHÂN ĐÔI môn Toán rồi quy về thang 30
 * (`sources.ts:hmtu-thongtin-tuyensinh-2026`, mục II.2.2):
 *
 *     Điểm xét tuyển = (2 × Điểm A + Điểm B + Điểm C) × 3/4 + ƯT + KK      (trần 30)
 *
 * trong đó Điểm A LUÔN là môn Toán học, còn Điểm B/Điểm C là 2 môn còn lại của tổ hợp (cùng hệ số
 * 1 nên thứ tự giữa B và C không ảnh hưởng kết quả). Tối đa: (2×10 + 10 + 10) × 0,75 = 30.
 *
 * Tổ hợp xét tuyển dùng CHUNG cho cả 5 ngành (mục II.2.2) — trường nêu rõ điểm xét tuyển "không
 * phụ thuộc vào tổ hợp môn xét tuyển", nên mỗi ngành chỉ có một mức điểm trúng tuyển.
 *
 * Điểm trúng tuyển: `sources.ts:hmtu-diemtrungtuyen-706-2026` (Thông báo 706/TB-ĐHKTYTHD,
 * 10/8/2026), cột "THPT".
 */

/** Môn được nhân hệ số 2 trong công thức (Điểm A). */
export const HMTU_DOUBLED_SUBJECT: SubjectId = 'math';
export const HMTU_DOUBLED_WEIGHT = 2;
export const HMTU_SCALE_FACTOR = 3 / 4;
export const HMTU_SCORE_CAP_30 = 30;

/**
 * Tổ hợp xét tuyển của Phương thức 2, dùng chung cho cả 5 ngành. B08 và D08 được nguồn ghi gộp
 * ("Khối B08/D08: Toán học, Sinh học, Tiếng Anh") — cả 2 mã đều đã có trong `core/subjects.ts` với
 * đúng 3 môn đó nên liệt kê cả hai.
 */
export const HMTU_COMBINATION_IDS: readonly string[] = ['B00', 'A00', 'D07', 'B08', 'D08'];

export interface HmtuProgram {
  /** Mã ngành / mã xét tuyển (Thông tin tuyển sinh mục II.4 và Thông báo 706). */
  code: string;
  name: string;
  /** Điểm trúng tuyển 2026 theo phương thức THPT, thang 30. */
  threshold30: number;
}

export const HMTU_PROGRAMS: readonly HmtuProgram[] = [
  { code: '7720101', name: 'Y khoa', threshold30: 25.0 },
  { code: '7720301', name: 'Điều dưỡng', threshold30: 22.5 },
  { code: '7720601', name: 'Kỹ thuật Xét nghiệm y học', threshold30: 23.0 },
  { code: '7720602', name: 'Kỹ thuật Hình ảnh y học', threshold30: 23.2 },
  { code: '7720603', name: 'Kỹ thuật Phục hồi chức năng', threshold30: 24.0 },
] as const;

export const HMTU_PROGRAM_BY_CODE: ReadonlyMap<string, HmtuProgram> = new Map(HMTU_PROGRAMS.map((program) => [program.code, program]));
