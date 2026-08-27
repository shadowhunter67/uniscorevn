import type { ApplicantProfile } from '../../core/applicantProfile';
import { round2 } from '../../core/round2';

/**
 * HUP 2026 — Điểm cộng khuyến khích (ĐKK). Nguồn: "Thông tin tuyển sinh đại học năm 2026"
 * (`sources.ts:hup-admission-2026`), trích nguyên văn bảng điểm cộng (thang 30):
 *
 *   IELTS 5.5 → 0,25 ; 6.0 → 0,50 ; 6.5 → 0,75 ; 7.0 → 1,00 ; 7.5 → 1,25 ; ≥ 8.0 → 1,50
 *   Giải HSG cấp tỉnh/thành phố: Ba 0,5 / Nhì 1,0 / Nhất 1,25 ; cấp quốc gia (Khuyến khích) 1,5
 *   "Mỗi thí sinh được cộng tối đa 03 (ba) điểm cộng khuyến khích vào tổng điểm xét tuyển."
 *
 * CHỈ mô hình hoá IELTS (`ApplicantProfile.certificates.ielts`). Giải HSG — không có field trong
 * hồ sơ dùng chung — do caller cung cấp; khai giá trị này => ngoài phạm vi exact (xem `evaluate.ts`).
 */
export function lookupHupIeltsBonus30(ielts: number): number {
  if (ielts >= 8) return 1.5;
  if (ielts >= 7.5) return 1.25;
  if (ielts >= 7) return 1.0;
  if (ielts >= 6.5) return 0.75;
  if (ielts >= 6) return 0.5;
  if (ielts >= 5.5) return 0.25;
  return 0;
}

export const HUP_HSG_BONUS_30 = {
  provincialThird: 0.5,
  provincialSecond: 1.0,
  provincialFirst: 1.25,
  nationalEncouragement: 1.5,
} as const;

export const HUP_BONUS_CAP_30 = 3;

export function calculateHupCertificateBonus30(certificates: ApplicantProfile['certificates']): number {
  return certificates?.ielts !== undefined ? lookupHupIeltsBonus30(certificates.ielts) : 0;
}

export function calculateHupBonus30(input: { certificateBonus30?: number; hsgBonus30?: number }): number {
  const total = (input.certificateBonus30 ?? 0) + (input.hsgBonus30 ?? 0);
  return round2(Math.max(0, Math.min(HUP_BONUS_CAP_30, total)));
}
