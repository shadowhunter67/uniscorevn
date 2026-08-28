import { round2 } from '../../core/round2';

/**
 * FBU 2026 — Điểm cộng (Phương thức 1, mã 100, xét kết quả thi TN THPT). Quyết định 99/QĐ-ĐHTNH
 * (`fbu-qd99-2026`) mục 2.1.1 công bố 2 nhánh điểm cộng, TỔNG điểm cộng tối đa 3,00 điểm (thang
 * 30, ghi rõ "Trường hợp thí sinh có nhiều đầu điểm cộng, thì tổng các điểm cộng chỉ được tính tối
 * đa 3.0 điểm"):
 * - ĐKK (Bảng 2.1): chứng chỉ ngoại ngữ quốc tế Tiếng Anh (IELTS/TOEFL iBT/TOEIC) hoặc Tiếng
 *   Trung (HSK) quy đổi điểm khuyến khích, khi nộp chứng chỉ về Trường.
 * - ĐXT (Bảng 2.2): giải học sinh giỏi cấp tỉnh/thành (Nhất 1,50 / Nhì 1,25 / Ba 1,00), môn đoạt
 *   giải phải thuộc tổ hợp đăng ký.
 *
 * UniscoreVN chỉ model được nhánh ĐKK-IELTS (`ApplicantProfile.certificates.ielts` đã có input
 * field sẵn) — nhánh TOEFL iBT/TOEIC/HSK và nhánh ĐXT (giải HSG cấp tỉnh/thành) KHÔNG có input
 * field tương ứng trong `ApplicantProfile`, để 0 (không phải trường không có, chỉ là chưa có input
 * UI cho các loại thành tích này — xem `knowledgeGaps.ts`).
 */
const FBU_IELTS_BONUS_30_TABLE: readonly { minScore: number; bonus30: number }[] = [
  { minScore: 6.0, bonus30: 1.5 },
  { minScore: 5.5, bonus30: 1.25 },
  { minScore: 5.0, bonus30: 1.0 },
  { minScore: 4.5, bonus30: 0.75 },
  { minScore: 4.0, bonus30: 0.5 },
];

export function lookupFbuIeltsBonus30(ielts: number | undefined): number {
  if (ielts === undefined) return 0;
  for (const row of FBU_IELTS_BONUS_30_TABLE) {
    if (ielts >= row.minScore) return row.bonus30;
  }
  return 0;
}

export const FBU_MAX_TOTAL_BONUS_30 = 3;

export function calculateFbuBonus30(input: { ielts: number | undefined }): number {
  return round2(Math.min(FBU_MAX_TOTAL_BONUS_30, lookupFbuIeltsBonus30(input.ielts)));
}
