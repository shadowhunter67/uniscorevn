import { round2 } from '../../core/round2';

/**
 * Công thức xét tuyển theo kết quả thi TN THPT (Phương thức 5) của Học viện Công nghệ Bưu chính
 * Viễn thông (PTIT). Nguồn: "Thông báo các phương thức tuyển sinh đại học hệ chính quy năm 2026"
 * (TB493, `ptit-admission-methods-2026`), mục C.5, trích nguyên văn:
 *
 *   ĐXT = M1 + M2 + M3 + Điểm cộng (nếu có) + Điểm ƯT (nếu có)
 *
 * M1/M2/M3 = điểm 3 bài thi/môn thi thi TN THPT theo tổ hợp, không hệ số. Điểm cộng tối đa 10%
 * thang điểm (3,0/30). Thang 30, làm tròn 2 chữ số thập phân.
 */
export function calculatePtitThptRawScore30(subjectScores: readonly number[]): number {
  return round2(subjectScores.reduce((sum, value) => sum + value, 0));
}

export function calculatePtitThptFinalScore30(input: { raw30: number; bonus30?: number; effectivePriority30: number }): number {
  return round2(input.raw30 + (input.bonus30 ?? 0) + input.effectivePriority30);
}
