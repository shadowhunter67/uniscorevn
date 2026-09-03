import { round2 } from '../../core/round2';

/**
 * TUMP 2025 — Điểm cộng (mục 4.2 của `sources.ts:tump-thongtin-2025`), bảng gốc (thang 30):
 *
 *   Chứng chỉ IELTS 8.5-9.0 → 3,00 ; 7.0-8.0 → 2,75 ; 5.5-6.5 → 2,50
 *   Giải Nhất/Nhì/Ba/KK HSG Quốc gia → 3,00/2,75/2,50/2,25
 *   Giải Nhất/Nhì/Ba HSG cấp tỉnh/thành phố trực thuộc Trung ương → 1,50/1,25/1,00
 *   Kết quả học tập cả 3 năm THPT mức tốt (học lực giỏi trở lên) → 1,00
 *   "Thí sinh có nhiều thành tích học tập chỉ được tính một mức điểm cộng cao nhất."
 *
 * CHỈ mô hình hoá bậc IELTS (`ApplicantProfile.certificates.ielts`) — giải HSG quốc gia/cấp tỉnh
 * và "học lực giỏi cả 3 năm" không có field tương ứng trong `ApplicantProfile` dùng chung, xem
 * `knowledgeGaps.ts`. Mục 4.2 còn công thức giảm điểm cộng khi tổng điểm đạt được từ 25/30 trở
 * lên: "Điểm cộng = [(30 − Tổng điểm đạt được)/5] × (Mức điểm cộng)".
 */
export function lookupTumpIeltsBonus30(ielts: number): number {
  if (ielts >= 8.5) return 3;
  if (ielts >= 7) return 2.75;
  if (ielts >= 5.5) return 2.5;
  return 0;
}

export const TUMP_BONUS_REDUCTION_THRESHOLD_30 = 25;
export const TUMP_BONUS_REDUCTION_DIVISOR_30 = 5;

export function calculateTumpStandardBonus30(certificates: { ielts?: number } | undefined): number {
  return certificates?.ielts !== undefined ? lookupTumpIeltsBonus30(certificates.ielts) : 0;
}

export function calculateTumpEffectiveBonus30(input: { rawTotal30: number; standardBonus30: number }): {
  effectiveBonus30: number;
  reduced: boolean;
} {
  if (input.standardBonus30 <= 0) return { effectiveBonus30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < TUMP_BONUS_REDUCTION_THRESHOLD_30) return { effectiveBonus30: input.standardBonus30, reduced: false };
  const effectiveBonus30 = Math.max(0, round2(((30 - pivot) / TUMP_BONUS_REDUCTION_DIVISOR_30) * input.standardBonus30));
  return { effectiveBonus30, reduced: true };
}
