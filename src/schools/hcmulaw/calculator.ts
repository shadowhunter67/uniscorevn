/**
 * Phương thức 5 (mã 100, xét kết quả thi TN THPT 2026) — "điểm tổ hợp môn" = tổng thô 3 môn theo
 * tổ hợp, KHÔNG nhân hệ số môn nào ("trong đó phải có môn Toán hoặc Ngữ văn với trọng số tính điểm
 * xét (không nhân hệ số) trong tổ hợp xét tuyển là 1/3" — 3 môn đều trọng số bằng nhau 1/3, tức
 * tổng thô), verbatim từ `sources.ts:hcmulaw-method-notice-2026` mục II.
 */
export interface HcmulawThreeSubjectInput {
  subject1Score: number;
  subject2Score: number;
  subject3Score: number;
}

function round2(raw: number): number {
  return Math.round((raw + Number.EPSILON) * 100) / 100;
}

export function calculateHcmulawSubjectGroupScore(input: HcmulawThreeSubjectInput): number {
  return round2(input.subject1Score + input.subject2Score + input.subject3Score);
}

/** ĐXT (Phương thức 5, thang 30) = điểm tổ hợp môn + điểm cộng (Phương thức 5 KHÔNG có điểm cộng —
 * xem `evaluate.ts`) + điểm ưu tiên, kẹp trần 30. */
export function calculateHcmulawThpt5FinalScore(input: { subjectGroupScore30: number; priority30: number }): number {
  return round2(Math.min(30, input.subjectGroupScore30 + input.priority30));
}

/** Phương thức 4 (V-SAT) — "điểm tổ hợp môn" = tổng 3 điểm môn ĐÃ quy đổi sang thang thi TN THPT
 * (mỗi môn thang 10 qua `conversionTable.ts:convertHcmulawVsatSubjectScore`, quy đổi RIÊNG TỪNG
 * MÔN — khác Phương thức 5 dùng thẳng điểm thô). */
export function calculateHcmulawVsat4SubjectGroupScore(input: { subject1Converted10: number; subject2Converted10: number; subject3Converted10: number }): number {
  return round2(input.subject1Converted10 + input.subject2Converted10 + input.subject3Converted10);
}

/** ĐXT (Phương thức 4, thang 30) = điểm tổ hợp môn (đã quy đổi) + điểm ưu tiên — cùng cấu trúc PT5
 * (mục "công thức ĐXT = điểm tổ hợp + điểm cộng (nếu có) + điểm ưu tiên (nếu có)" áp dụng chung mọi
 * phương thức, `hcmulaw-method-notice-2026`), kẹp trần 30. */
export function calculateHcmulawVsat4FinalScore(input: { subjectGroupScore30: number; priority30: number }): number {
  return round2(Math.min(30, input.subjectGroupScore30 + input.priority30));
}

/**
 * Phương thức 3 (mã 200, học bạ trường ưu tiên ĐHQG-HCM) — "điểm tổ hợp môn" = điểm học bạ 6 học kỳ
 * ĐÃ quy đổi tương đương thi TN THPT qua `conversionTable.ts:convertHcmulawTranscriptCombinationScore`
 * (y = x - k). ĐXT = y + điểm ưu tiên, kẹp trần 30 — nguồn KHÔNG mô tả thành phần "điểm khuyến
 * khích" nào cho Phương thức 3 (khác Phương thức 2, vốn có bảng quy đổi chứng chỉ ngoại ngữ/SAT).
 */
export function calculateHcmulawPriorityHighschool3FinalScore(input: { subjectGroupScore30: number; priority30: number }): number {
  return round2(Math.min(30, input.subjectGroupScore30 + input.priority30));
}

/**
 * Phương thức 2 (mã 410, kết hợp học bạ + chứng chỉ ngoại ngữ quốc tế/SAT) — cùng dạng ĐXT chung
 * ("điểm tổ hợp môn + điểm cộng (nếu có) + điểm ưu tiên (nếu có)"), khác Phương thức 3 ở chỗ điểm
 * cộng KHÁC 0: đây là "điểm khuyến khích" quy đổi từ chứng chỉ (`bonus.ts`, tối đa 1,50).
 * "Điểm tổ hợp môn" vẫn là y = x - k như Phương thức 3. Kẹp trần 30.
 */
export function calculateHcmulawCombined2FinalScore(input: { subjectGroupScore30: number; bonus30: number; priority30: number }): number {
  return round2(Math.min(30, input.subjectGroupScore30 + input.bonus30 + input.priority30));
}
