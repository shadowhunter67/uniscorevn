import type { ApplicantProfile } from '../../core/applicantProfile';
import { round2 } from '../../core/round2';

/**
 * Điểm cộng PTIT 2026 (mục D `ptit-admission-methods-2026`) — 3 nhóm, thang 30, chỉ chọn 1 mục
 * cao nhất, tổng không vượt 10% thang điểm (3,0/30):
 *  - Điểm thưởng (giải QG, không dùng tuyển thẳng): Nhất 3,00 / Nhì 2,75 / Ba 2,50
 *  - Điểm xét thưởng (giải KK QG hoặc giải tỉnh môn Toán/Lý/Hoá/Tin):
 *      KK QG hoặc Nhất 1,50 / Nhì 1,25 / Ba 1,00 / KK 0,75
 *  - Điểm khuyến khích (chứng chỉ tiếng Anh quốc tế IELTS/TOEFL):
 *      IELTS 7.0-9.0 → 1,50 ; 6.5 → 1,00 ; 6.0 → 0,75 ; 5.5 → 0,50
 *
 * Runtime CHỈ mô hình hoá bảng IELTS (`ApplicantProfile.certificates.ielts`). Điểm thưởng/xét
 * thưởng (giải học sinh giỏi) — không có field trong hồ sơ dùng chung — do caller cung cấp qua
 * `context.achievementBonus30`.
 */
export function lookupPtitIeltsBonus30(ielts: number): number {
  if (ielts >= 7) return 1.5;
  if (ielts >= 6.5) return 1.0;
  if (ielts >= 6) return 0.75;
  if (ielts >= 5.5) return 0.5;
  return 0;
}

export const PTIT_BONUS_CAP_30 = 3;

export function calculatePtitCertificateBonus30(certificates: ApplicantProfile['certificates']): number {
  return certificates?.ielts !== undefined ? lookupPtitIeltsBonus30(certificates.ielts) : 0;
}

/**
 * Trong TỪNG nhóm (điểm thưởng / xét thưởng / khuyến khích) chỉ lấy 1 thành tích cao nhất; giữa
 * các nhóm thì cộng dồn ("tổng Điểm cộng không vượt quá 10% thang điểm" = 3,0/30). Runtime cộng
 * điểm chứng chỉ IELTS + điểm thành tích (caller cung cấp), kẹp trần 3,0.
 */
export function calculatePtitBonus30(input: { certificateBonus30?: number; achievementBonus30?: number }): number {
  const total = (input.certificateBonus30 ?? 0) + (input.achievementBonus30 ?? 0);
  return round2(Math.max(0, Math.min(PTIT_BONUS_CAP_30, total)));
}
