import { round2 } from '../../core/round2';

/**
 * Công thức xét THPT UEF 2026 (nhóm ngành ngoài Luật) — Thông tin tuyển sinh 2026 (PDF chính thức,
 * đọc trực tiếp qua Google Drive, liên kết từ `uef-quality-threshold-2026`): mục "2. Mô tả phương
 * thức tuyển sinh" không nêu hệ số môn nào cho phương thức 100 (thi TN THPT), và mục "5.b Điểm cộng:
 * không" xác nhận không có điểm cộng thành tích — điểm học lực là tổng thô 3 môn theo tổ hợp.
 */
export interface UefThreeSubjectInput {
  subject1Score: number;
  subject2Score: number;
  subject3Score: number;
}

export function calculateUefThptRawScore(input: UefThreeSubjectInput): number {
  return round2(input.subject1Score + input.subject2Score + input.subject3Score);
}

/** Điểm xét tuyển cuối = điểm học lực (raw) + điểm ưu tiên, kẹp trần 30 (thang điểm chung mọi
 * phương thức của UEF, mục 7 "Chính sách ưu tiên" dùng chung thang 30 cho phương thức 100/200). */
export function calculateUefThptFinalScore(input: { raw30: number; priority30: number }): number {
  return round2(Math.min(30, input.raw30 + input.priority30));
}
