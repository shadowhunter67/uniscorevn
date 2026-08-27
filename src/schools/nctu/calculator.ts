import { round2 } from '../../core/round2';

/**
 * Công thức xét THPT NCTU 2026 (nhóm ngành ngoài Sức khỏe/Luật) — Thông báo ngưỡng đảm bảo chất
 * lượng đầu vào 2026 (`nctu-threshold-notice-2026`) không nêu hệ số môn nào; bài hướng dẫn chính
 * sách ưu tiên tự đăng trên tuyensinh.nctu.edu.vn (`nctu-priority-guide-2026`) xác nhận trực tiếp:
 * "Công thức trên áp dụng cho tổng điểm 3 môn (thuộc tổ hợp xét tuyển)... không nhân hệ số" — điểm
 * học lực là tổng thô 3 môn, làm tròn 2 chữ số thập phân.
 */
export interface NctuThreeSubjectInput {
  subject1Score: number;
  subject2Score: number;
  subject3Score: number;
}

export function calculateNctuThptRawScore(input: NctuThreeSubjectInput): number {
  return round2(input.subject1Score + input.subject2Score + input.subject3Score);
}

/** Điểm xét tuyển cuối = điểm học lực (raw) + điểm ưu tiên, kẹp trần 30 (thang điểm chung Điều 7). */
export function calculateNctuThptFinalScore(input: { raw30: number; priority30: number }): number {
  return round2(Math.min(30, input.raw30 + input.priority30));
}
