import { round2 } from '../../core/round2';

/**
 * Công thức xét tuyển Trường Đại học Hồng Đức (HDU) 2026 — Thông tin tuyển sinh trình độ đại học
 * năm 2026 (`hdu-admission-2026`), mục 7.5.b "Hướng dẫn tính điểm xét tuyển", trích nguyên văn:
 *
 *   Thành phần A = Tổng điểm thi 3 môn thuộc tổ hợp xét tuyển (thang 10 mỗi môn)
 *   Thành phần B = Điểm khuyến khích (mục 7.2)
 *   Tổng điểm thí sinh đạt được = A + B ; nếu > 30 thì quy về 30
 *   Nếu (A + B) > 22,5:  ĐƯT (C) = [(30 − A − B)/7,5] × (Điểm ưu tiên khu vực + Điểm ưu tiên đối tượng)
 *   Điểm xét tuyển = Tổng điểm thí sinh đạt được + ĐƯT (C)
 *
 * Worked example (nguồn): A = 25,25 ; B = 3 ⇒ tổng 28,25 ; C = [(30 − 28,25)/7,5] × (0,5 + 1,0) =
 * 0,35 ; ĐXT = 28,60.
 */
export function calculateHduAcademicRaw30(subjectScores: readonly number[]): number {
  return round2(subjectScores.reduce((sum, value) => sum + value, 0));
}

/** Tổng điểm thí sinh đạt được = min(30, A + B). */
export function calculateHduTotalBeforePriority30(input: { raw30: number; encouragementBonus30?: number }): number {
  return round2(Math.min(30, input.raw30 + (input.encouragementBonus30 ?? 0)));
}

export function calculateHduFinalScore30(input: { totalBeforePriority30: number; effectivePriority30: number }): number {
  return round2(input.totalBeforePriority30 + input.effectivePriority30);
}
