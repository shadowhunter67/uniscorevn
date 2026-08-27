import type { ApplicantProfile } from '../../core/applicantProfile';
import { round2 } from '../../core/round2';

/**
 * UTC 2026 — Điểm cộng theo đề án tuyển sinh của Trường ĐH GTVT. Nguồn: "THÔNG TIN TUYỂN SINH ĐẠI
 * HỌC HỆ CHÍNH QUY 2026" (`sources.ts:utc-admission-info-2026`), trích nguyên văn bảng điểm cộng
 * (thang 30):
 *
 *   Giải nhất HSG tỉnh/thành phố  → 1,00
 *   Giải nhì HSG tỉnh/thành phố   → 0,75
 *   Giải ba HSG tỉnh/thành phố    → 0,50
 *   IELTS 7.0 trở lên → 1,50 ; IELTS 6.5 → 1,25 ; IELTS 6.0 → 1,00 ; IELTS 5.5 → 0,75 ; IELTS 5.0 → 0,50
 *
 * Trần (nguyên văn): "Tổng điểm xét tuyển (kể cả điểm ưu tiên theo đối tượng, khu vực và điểm
 * cộng) không vượt quá 30 điểm" — không nêu trần riêng cho điểm cộng, nên kẹp theo trần chung của
 * ĐXT ở `calculator.ts`.
 *
 * CHỈ mô hình hoá IELTS (`ApplicantProfile.certificates.ielts`). Giải HSG cấp tỉnh — không có
 * field trong hồ sơ dùng chung — do caller cung cấp qua `hsgProvincialRank` nếu cần; thí sinh khai
 * giá trị này => ngoài phạm vi exact (xem `evaluate.ts`).
 */
export function lookupUtcIeltsBonus30(ielts: number): number {
  if (ielts >= 7) return 1.5;
  if (ielts >= 6.5) return 1.25;
  if (ielts >= 6) return 1.0;
  if (ielts >= 5.5) return 0.75;
  if (ielts >= 5) return 0.5;
  return 0;
}

export const UTC_HSG_PROVINCIAL_BONUS_30: Record<'nhat' | 'nhi' | 'ba', number> = {
  nhat: 1.0,
  nhi: 0.75,
  ba: 0.5,
};

/** Điểm cộng từ hồ sơ (chỉ IELTS). Thí sinh chỉ hưởng 1 mức cộng cao nhất (không cộng dồn IELTS +
 * giải HSG) — theo thông lệ điểm cộng của trường. */
export function calculateUtcCertificateBonus30(certificates: ApplicantProfile['certificates']): number {
  return certificates?.ielts !== undefined ? lookupUtcIeltsBonus30(certificates.ielts) : 0;
}

export function calculateUtcBonus30(input: { certificateBonus30?: number; hsgProvincialBonus30?: number }): number {
  return round2(Math.max(0, input.certificateBonus30 ?? 0, input.hsgProvincialBonus30 ?? 0));
}
