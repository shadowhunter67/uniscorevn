import { round2 } from '../../core/round2';

/**
 * VKU 2026 — Phương thức 2 (xét tuyển kết hợp). Nguồn: PDF "Thông tin tuyển sinh năm 2026 (cập
 * nhật 09/4/2026)" (`sources.ts:vku-admission-info-2026`), Mục 2.2.c, trích nguyên văn:
 *
 *   "Điểm xét tuyển = Điểm học bạ * 60% + Điểm thi TN THPT* 40% + Điểm cộng (nếu có) + Điểm ưu
 *    tiên (nếu có)"
 *   "+ Điểm học bạ: là tổng điểm 03 môn trong học bạ THPT thuộc tổ hợp xét tuyển, quy về thang
 *    điểm 30 ... Điểm của mỗi môn học bạ được tính bằng điểm trung bình kết quả học tập cả năm
 *    của 03 năm học (lớp 10, lớp 11 và lớp 12)"
 *   "+ Điểm thi TN THPT: là tổng điểm 03 môn thi tốt nghiệp THPT thuộc tổ hợp xét tuyển, quy về
 *    thang điểm 30"
 *   "Điểm xét tuyển được làm tròn đến 02 chữ số thập phân. Tổng điểm xét tuyển sau khi cộng điểm
 *    cộng và điểm ưu tiên không vượt quá 30 điểm"
 *
 * Không có hệ số môn nào — tổng thô 3 môn ở cả hai thành phần.
 */
export function calculateVkuTranscriptSubjectAverage(scores: { grade10: number; grade11: number; grade12: number }): number {
  return round2((scores.grade10 + scores.grade11 + scores.grade12) / 3);
}

export function calculateVkuTranscriptTotal30(subjectAverages: readonly number[]): number {
  return round2(subjectAverages.reduce((sum, value) => sum + value, 0));
}

export function calculateVkuThptTotal30(subjectScores: readonly number[]): number {
  return round2(subjectScores.reduce((sum, value) => sum + value, 0));
}

export function calculateVkuAcademicScore30(input: { transcriptTotal30: number; thptTotal30: number }): number {
  return round2(input.transcriptTotal30 * 0.6 + input.thptTotal30 * 0.4);
}

/** ĐXT = Điểm học lực (60/40) + Điểm cộng + Điểm ưu tiên, kẹp trần 30,00, làm tròn 2 chữ số. */
export function calculateVkuFinalScore30(input: { academicScore30: number; bonus30: number; effectivePriority30: number }): number {
  return round2(Math.min(30, input.academicScore30 + input.bonus30 + input.effectivePriority30));
}
