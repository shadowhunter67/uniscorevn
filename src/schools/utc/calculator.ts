import { round2 } from '../../core/round2';
import type { UtcFormulaGroup } from './thresholds';

/**
 * UTC 2026 — công thức tính Tổng điểm xét tuyển, phương thức xét kết quả thi TN THPT (thang 30).
 * Nguồn: "THÔNG TIN TUYỂN SINH ĐẠI HỌC HỆ CHÍNH QUY 2026" (`sources.ts:utc-admission-info-2026`),
 * trích nguyên văn:
 *
 *   Các ngành (trừ Ngôn ngữ Anh):
 *     "(Điểm thi môn Toán x 2 + điểm thi hai môn còn lại trong tổ hợp) x 3/4 + điểm ưu tiên (nếu
 *      có) + điểm cộng (nếu có)"
 *   Ngành Ngôn ngữ Anh (KHÔNG nhân hệ số 2 cho môn Toán):
 *     "(Điểm thi môn Toán + điểm thi hai môn còn lại trong tổ hợp) + điểm ưu tiên (nếu có) + điểm
 *      cộng (nếu có)"
 *
 * Hàm dưới đây CHỈ tính phần điểm học lực (chưa cộng ưu tiên/điểm cộng).
 */
export interface UtcThptSubjectScores {
  /** Điểm môn Toán (môn nhân hệ số 2 ở nhóm 'standard'). */
  mathScore: number;
  /** Điểm 2 môn còn lại trong tổ hợp. */
  otherScore1: number;
  otherScore2: number;
}

export function calculateUtcAcademicScore30(input: UtcThptSubjectScores, group: UtcFormulaGroup): number {
  const { mathScore, otherScore1, otherScore2 } = input;
  if (group === 'english') {
    return round2(mathScore + otherScore1 + otherScore2);
  }
  return round2(((mathScore * 2 + otherScore1 + otherScore2) * 3) / 4);
}

/** Tổng điểm xét tuyển = điểm học lực + điểm ưu tiên + điểm cộng, kẹp trần 30, làm tròn 2 chữ số. */
export function calculateUtcFinalScore30(input: { academicScore30: number; bonus30: number; effectivePriority30: number }): number {
  return round2(Math.min(30, input.academicScore30 + input.bonus30 + input.effectivePriority30));
}
