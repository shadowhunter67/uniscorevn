/**
 * BMTU (Trường Đại học Y Dược Buôn Ma Thuột, mã trường BMU) 2026 — phương thức 1 (xét kết quả thi
 * TN THPT 2026, mục 2.1 Đề án/Thông tin tuyển sinh 2026, Quyết định 396/QĐ-YDBMT). Chỉ mô hình hoá
 * 2/7 ngành (Y khoa, Dược học) — 2 ngành CÓ đủ cả 3 mảnh bằng chứng đồng nhất: (a) 5 tổ hợp môn map
 * được vào `COMMON_SUBJECT_COMBINATIONS` hiện có (A00/A01/B00/B08/D07, đọc từ mục 4.2 đề án — các
 * nhánh tổ hợp còn lại dùng Tin học/Công nghệ, chưa có combo tương ứng, bỏ qua — non-blocking); (b)
 * điểm chuẩn 2026 chính thức theo TỪNG ngành (`bmtu-threshold-2026`, Báo Thanh Niên đưa tin thông
 * báo điểm chuẩn 10/8/2026 của trường); (c) điều kiện phụ (môn Sinh/Hóa lớp 12 >= 6,5) đọc trực
 * tiếp từ mục 4.2 đề án. 5 ngành còn lại (Y học cổ truyền, Y học dự phòng, Kỹ thuật xét nghiệm y
 * học, Điều dưỡng, Y tế công cộng) CHƯA model — điểm chuẩn 2026 của các ngành này được Thanh Niên
 * gộp theo nhóm (không tách rõ từng ngành trong bản tin đã đọc), rủi ro gán nhầm ngành cụ thể vào
 * đúng mức điểm nếu trường có sai khác nhỏ giữa các ngành cùng nhóm.
 */
export interface BmtuFieldThreshold {
  code: string;
  name: string;
  /** Điểm chuẩn (trúng tuyển) 2026, thang 30 — nguồn `sources.ts:bmtu-threshold-2026`. */
  threshold30: number;
  /** Điều kiện phụ: môn học THPT phải đạt >= `gateMinGrade12` (thang 10) trong học bạ, tối thiểu
   * năm lớp 12 — đề án mục 4.2 (bảng "Phương thức tuyển sinh/tổ hợp xét tuyển"). */
  gateSubject: 'biology' | 'chemistry';
  gateMinGrade12: number;
}

/** 5 tổ hợp môn của BMTU map được vào `COMMON_SUBJECT_COMBINATIONS` (mục 4.2 đề án — mỗi ngành có
 * 3 "nhóm tổ hợp" với môn thứ 3 linh hoạt trong {Hóa, Lý, Tin học, Công nghệ, Tiếng Anh}; chỉ nhánh
 * dùng Tiếng Anh hoặc trùng đúng 3 môn với 1 trong 6 tổ hợp quốc gia hiện có trong hệ thống mới
 * model được — Tin học/Công nghệ CHƯA có combo tương ứng, xem `knowledgeGaps.ts`). */
export const BMTU_COMBINATION_IDS = ['A00', 'A01', 'B00', 'B08', 'D07'] as const;

export const BMTU_FIELD_THRESHOLDS_2026: readonly BmtuFieldThreshold[] = [
  { code: '7720101', name: 'Y khoa', threshold30: 22, gateSubject: 'biology', gateMinGrade12: 6.5 },
  { code: '7720201', name: 'Dược học', threshold30: 20, gateSubject: 'chemistry', gateMinGrade12: 6.5 },
] as const;

export type BmtuFieldCode = (typeof BMTU_FIELD_THRESHOLDS_2026)[number]['code'];

export const BMTU_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, BmtuFieldThreshold> = new Map(
  BMTU_FIELD_THRESHOLDS_2026.map((entry) => [entry.code, entry])
);
