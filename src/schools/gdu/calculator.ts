import { round2 } from '../../core/round2';

/**
 * Công thức xét THPT GDU 2026 (nhóm ngành ngoài Sức khỏe/Luật) — Đề án tuyển sinh 2026 (Số
 * 01/2026/DA-GDU, 18/03/2026, mục 4-5): "Điểm xét tuyển theo thang điểm 30" và "GDU không tổ chức sơ
 * tuyển, không áp dụng thêm tiêu chí phụ ngoài quy định của Bộ GDĐT" — không nêu hệ số môn nào, nên
 * điểm học lực là tổng thô 3 môn theo tổ hợp, làm tròn 2 chữ số thập phân (xem
 * `evidence.ts:gduFormulaEvidence`).
 */
export interface GduThreeSubjectInput {
  subject1Score: number;
  subject2Score: number;
  subject3Score: number;
}

export function calculateGduThptRawScore(input: GduThreeSubjectInput): number {
  return round2(input.subject1Score + input.subject2Score + input.subject3Score);
}

/** Điểm xét tuyển cuối = điểm học lực (raw) + điểm ưu tiên, kẹp trần 30 (mục 4 Đề án: "Điểm xét
 * tuyển theo thang điểm 30"). GDU không công bố bảng điểm cộng thành tích riêng ngoài chính sách xét
 * tuyển thẳng (mục 5.2) nên không có thành phần điểm cộng chung ở đây. */
export function calculateGduThptFinalScore(input: { raw30: number; priority30: number }): number {
  return round2(Math.min(30, input.raw30 + input.priority30));
}
