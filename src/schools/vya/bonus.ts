import type { ApplicantProfile } from '../../core/applicantProfile';
import { round2 } from '../../core/round2';

/**
 * Điểm cộng VYA 2026 (Quyết định 218/QĐ-HVTTNVN, mục 5.2, `sources.ts:vya-thong-tin-tuyen-sinh-
 * 2026`) — 2 nhóm, thang 30, tổng không vượt 10% thang điểm xét tuyển (3,0/30):
 *  - 5.2.1 Điểm thưởng (thí sinh đủ điều kiện xét tuyển thẳng nhưng không dùng quyền): 3,00 điểm
 *    cố định — KHÔNG mô hình hoá (không có field điều kiện xét tuyển thẳng trong hồ sơ dùng
 *    chung; caller có thể cung cấp qua `achievementBonus30`, cùng tiền lệ PTIT).
 *  - 5.2.2 Điểm khuyến khích (chứng chỉ tiếng Anh quốc tế IELTS): 7.0+ → 1,50 ; 6.5 → 1,25 ;
 *    6.0 → 1,00 ; 5.5 → 0,75 ; 5.0 → 0,50 — mô hình hoá qua `ApplicantProfile.certificates.ielts`.
 * "Trường hợp thí sinh có nhiều đầu điểm cộng, thì tổng các điểm cộng chỉ được tính tối đa 3,0
 * điểm" — cap dùng chung cho cả 2 nhóm, cùng công thức PTIT.
 */
export function lookupVyaIeltsBonus30(ielts: number): number {
  if (ielts >= 7) return 1.5;
  if (ielts >= 6.5) return 1.25;
  if (ielts >= 6) return 1;
  if (ielts >= 5.5) return 0.75;
  if (ielts >= 5) return 0.5;
  return 0;
}

export const VYA_BONUS_CAP_30 = 3;

export function calculateVyaCertificateBonus30(certificates: ApplicantProfile['certificates']): number {
  return certificates?.ielts !== undefined ? lookupVyaIeltsBonus30(certificates.ielts) : 0;
}

export function calculateVyaBonus30(input: { certificateBonus30?: number; achievementBonus30?: number }): number {
  const total = (input.certificateBonus30 ?? 0) + (input.achievementBonus30 ?? 0);
  return round2(Math.max(0, Math.min(VYA_BONUS_CAP_30, total)));
}
