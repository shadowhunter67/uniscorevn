import type { ApplicantProfile } from '../../core/applicantProfile';
import { round2 } from '../../core/round2';

/**
 * VKU 2026 — Điểm cộng, Phụ lục II của PDF "Thông tin tuyển sinh năm 2026" (`sources.ts:
 * vku-admission-info-2026`). Dùng CHUNG cho cả 3 phương thức (Mục "1. Sử dụng chung cho 03 phương
 * thức tuyển sinh").
 *
 * Trần (trích nguyên văn, Mục 5.2 + Phụ lục II Mục 2.1): "Tổng điểm cộng của thí sinh không vượt
 * quá 03 điểm theo thang điểm 30".
 *
 * Bảng "Điểm khuyến khích" (Phụ lục II, nhóm cuối) — chứng chỉ quốc tế, trích nguyên văn:
 *   SAT (≥ 1200), ACT (≥ 26) hoặc A-Level (PUM range ≥ 80, Toán C)  → 1,25
 *   Chứng chỉ tiếng Anh quốc tế tương đương IELTS 5.0  → 0,5
 *   ... IELTS 5.5 → 0,75 ; IELTS 6.0 → 1,0 ; IELTS 6.5 → 1,25 ; IELTS từ 7.0 trở lên → 1,5
 *
 * CHỈ mô hình hoá 3 nguồn có trong `ApplicantProfile.certificates`: IELTS, SAT, ACT. MOS/IC3/
 * A-Level và các nhóm "Điểm thưởng"/"Điểm xét thưởng" (giải HSG/KHKT/Olympic — không có field
 * trong hồ sơ dùng chung) do caller tự cung cấp qua `achievementBonus30` nếu cần; module KHÔNG tự
 * phân loại thành tích.
 */
export function lookupVkuIeltsBonus30(ielts: number): number {
  if (ielts >= 7) return 1.5;
  if (ielts >= 6.5) return 1.25;
  if (ielts >= 6) return 1.0;
  if (ielts >= 5.5) return 0.75;
  if (ielts >= 5) return 0.5;
  return 0;
}

export function lookupVkuSatActBonus30(input: { sat?: number; act?: number }): number {
  const satBonus = input.sat !== undefined && input.sat >= 1200 ? 1.25 : 0;
  const actBonus = input.act !== undefined && input.act >= 26 ? 1.25 : 0;
  return Math.max(satBonus, actBonus);
}

/** Điểm khuyến khích chứng chỉ từ hồ sơ (IELTS / SAT / ACT). Thí sinh chỉ được hưởng mức cao nhất
 * trong nhóm chứng chỉ (không cộng dồn IELTS + SAT). */
export function calculateVkuCertificateBonus30(certificates: ApplicantProfile['certificates']): number {
  const ieltsBonus = certificates?.ielts !== undefined ? lookupVkuIeltsBonus30(certificates.ielts) : 0;
  const satActBonus = lookupVkuSatActBonus30({ sat: certificates?.sat, act: certificates?.act });
  return Math.max(ieltsBonus, satActBonus);
}

export const VKU_BONUS_CAP_30 = 3;

/** Tổng điểm cộng = điểm khuyến khích chứng chỉ + điểm thưởng/xét thưởng thành tích (caller cấp),
 * kẹp trần 3,0/30. */
export function calculateVkuBonus30(input: { certificateBonus30?: number; achievementBonus30?: number }): number {
  const total = (input.certificateBonus30 ?? 0) + (input.achievementBonus30 ?? 0);
  return round2(Math.max(0, Math.min(VKU_BONUS_CAP_30, total)));
}
