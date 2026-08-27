import { round2 } from '../../core/round2';

/**
 * HUP 2026 — Phương thức 4 (xét kết quả thi TN THPT). Nguồn: "Thông tin tuyển sinh đại học năm
 * 2026" (`sources.ts:hup-admission-2026`), trích nguyên văn:
 *
 *   "ĐXT = M1 + M2 + M3 + ĐKK (nếu có) + ĐƯT quy đổi (nếu có)"
 *
 * M1/M2/M3 = điểm 3 môn thi TN THPT thuộc tổ hợp, không hệ số. Thang 30, kẹp trần 30.
 */
export function calculateHupAcademicScore30(subjectScores: readonly number[]): number {
  return round2(subjectScores.reduce((sum, value) => sum + value, 0));
}

export function calculateHupFinalScore30(input: { academicScore30: number; bonus30: number; effectivePriority30: number }): number {
  return round2(Math.min(30, input.academicScore30 + input.bonus30 + input.effectivePriority30));
}
