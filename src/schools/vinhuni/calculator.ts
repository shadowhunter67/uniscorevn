import { round2 } from '../../core/round2';

/**
 * Công thức xét tuyển Phương thức 100 (xét kết quả thi TN THPT) của Trường Đại học Vinh 2026.
 * Nguồn: Thông báo ngưỡng bảo đảm chất lượng đầu vào 2026 (`vinhuni-quality-threshold-conversion-2026`),
 * mục I.1, trích nguyên văn:
 *
 *   Điểm xét tuyển = [Điểm thi + Điểm thưởng (nếu có)] + Điểm ưu tiên (nếu có)
 *
 * "Điểm sàn được xác định trên cơ sở điểm các môn thi/bài thi không nhân hệ số ... Điểm xét tuyển
 * được làm tròn đến hai chữ số thập phân." Điểm thi = tổng thô 3 môn tổ hợp.
 */
export function calculateVinhuniThptRawScore30(subjectScores: readonly number[]): number {
  return round2(subjectScores.reduce((sum, value) => sum + value, 0));
}

export function calculateVinhuniThptFinalScore30(input: { raw30: number; rewardBonus30?: number; effectivePriority30: number }): number {
  return round2(input.raw30 + (input.rewardBonus30 ?? 0) + input.effectivePriority30);
}
