import type { ApplicantProfile } from '../../core/applicantProfile';

/**
 * ACTVN 2026 — bảng cộng điểm ưu tiên chứng chỉ tiếng Anh quốc tế cho phương thức xét điểm thi TN THPT
 * (`sources.ts:actvn-notice-2026`, trang "Phương thức tuyển sinh đại học chính quy năm 2026", bảng HTML):
 *  - IELTS 5,5-6,0 | TOEIC 650 đến dưới 750 | TOEFL iBT 65 đến dưới 80  -> +0,5
 *  - IELTS 6,5-7,0 | TOEIC 750 đến dưới 850 | TOEFL iBT 80 đến dưới 95  -> +1
 *  - IELTS 7,5 trở lên | TOEIC 850 trở lên | TOEFL iBT 95 trở lên       -> +1,5
 * Thí sinh có nhiều chứng chỉ lấy mức cao nhất. Học viện không cộng cho TOEFL iBT Home Edition — hồ sơ
 * không phân biệt được hình thức thi nên khoản này là giới hạn dữ liệu (xem knowledgeGaps.ts).
 * Điểm cộng giải thưởng chỉ áp dụng cho phương thức ĐGNL/ĐGTD, không áp cho phương thức thi TN THPT.
 */
export const ACTVN_ENGLISH_BONUS_MAX_30 = 1.5;

function ieltsBonus(score: number): number {
  if (score >= 7.5) return 1.5;
  if (score >= 6.5) return 1;
  if (score >= 5.5) return 0.5;
  return 0;
}

function toeicBonus(score: number): number {
  if (score >= 850) return 1.5;
  if (score >= 750) return 1;
  if (score >= 650) return 0.5;
  return 0;
}

function toeflBonus(score: number): number {
  if (score >= 95) return 1.5;
  if (score >= 80) return 1;
  if (score >= 65) return 0.5;
  return 0;
}

export interface ActvnEnglishBonus {
  bonus30: number;
  source?: 'IELTS' | 'TOEIC' | 'TOEFL iBT';
}

export function calculateActvnEnglishBonus(certificates: ApplicantProfile['certificates']): ActvnEnglishBonus {
  const candidates: Array<{ source: ActvnEnglishBonus['source']; bonus: number }> = [];
  if (certificates?.ielts !== undefined) candidates.push({ source: 'IELTS', bonus: ieltsBonus(certificates.ielts) });
  if (certificates?.toeic !== undefined) candidates.push({ source: 'TOEIC', bonus: toeicBonus(certificates.toeic) });
  if (certificates?.toeflIbt !== undefined) candidates.push({ source: 'TOEFL iBT', bonus: toeflBonus(certificates.toeflIbt) });
  const best = candidates.reduce<{ source: ActvnEnglishBonus['source']; bonus: number }>(
    (a, b) => (b.bonus > a.bonus ? b : a),
    { source: undefined, bonus: 0 }
  );
  return best.bonus > 0 ? { bonus30: best.bonus, source: best.source } : { bonus30: 0 };
}
