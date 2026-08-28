import { round2 } from '../../core/round2';

/**
 * TBU 2026 — Điểm cộng (PT1, xét kết quả thi TN THPT). Thông báo 565/TB-ĐHTB mục 4.2 công bố bảng
 * điểm cộng tối đa theo thang 30 (trang 3), TỔNG điểm cộng tối đa 3,00 điểm (10% thang điểm xét
 * tuyển): giải HSG cấp tỉnh/thành (Nhất 1,00 / Nhì 0,75 / Ba 0,50) và chứng chỉ IELTS (≥7,0 → 1,50
 * / 6,5 → 1,25 / 6,0 → 1,00 / 5,5 → 0,75 / 5,0 → 0,50, còn hiệu lực đến 30/6/2026).
 *
 * UniscoreVN chỉ model được nhánh IELTS (`ApplicantProfile.certificates.ielts` đã có input field
 * sẵn) — nhánh giải HSG cấp tỉnh/thành KHÔNG có input field tương ứng trong `ApplicantProfile`,
 * để 0 (không phải trường không có, chỉ là chưa có input UI cho loại thành tích này — xem
 * `knowledgeGaps.ts`). Mục "Lưu ý" xác nhận tổng điểm xét tuyển (kể cả ưu tiên + điểm cộng) không
 * vượt quá 30 điểm.
 */
const TBU_IELTS_BONUS_30_TABLE: readonly { minScore: number; bonus30: number }[] = [
  { minScore: 7.0, bonus30: 1.5 },
  { minScore: 6.5, bonus30: 1.25 },
  { minScore: 6.0, bonus30: 1.0 },
  { minScore: 5.5, bonus30: 0.75 },
  { minScore: 5.0, bonus30: 0.5 },
];

export function lookupTbuIeltsBonus30(ielts: number | undefined): number {
  if (ielts === undefined) return 0;
  for (const row of TBU_IELTS_BONUS_30_TABLE) {
    if (ielts >= row.minScore) return row.bonus30;
  }
  return 0;
}

export function calculateTbuBonus30(input: { ielts: number | undefined }): number {
  return round2(lookupTbuIeltsBonus30(input.ielts));
}
