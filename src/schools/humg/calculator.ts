import { round2 } from '../../core/round2';

/**
 * Công thức xét tuyển theo kết quả thi TN THPT của Trường Đại học Mỏ - Địa chất (HUMG), trích
 * nguyên văn từ Thông báo ngưỡng điểm xét tuyển đợt 1 hệ đại học năm 2026 (`humg-admission-2026`,
 * mục "Ghi chú: Công thức tính điểm xét"):
 *
 *   Điểm Xét = Min[(Môn 1 + Môn 2 + Môn 3) + Điểm Cộng, 30] + Điểm ưu tiên
 *
 * Lưu ý: điểm ưu tiên được CỘNG SAU khi đã kẹp trần 30 phần (tổng 3 môn + điểm cộng) — khác các
 * trường kẹp trần toàn bộ. Làm tròn 2 chữ số thập phân, thang 30.
 */
export function calculateHumgAcademicRaw30(subjectScores: readonly number[]): number {
  return round2(subjectScores.reduce((sum, value) => sum + value, 0));
}

export function calculateHumgFinalScore30(input: { raw30: number; bonus30?: number; priority30: number }): number {
  const cappedBeforePriority = Math.min(30, input.raw30 + (input.bonus30 ?? 0));
  return round2(cappedBeforePriority + input.priority30);
}
