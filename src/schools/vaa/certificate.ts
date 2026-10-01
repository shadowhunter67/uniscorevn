import { HSK_LEVELS, TOPIK_LEVELS, isAtLeastLevel, type ApplicantProfile } from '../../core/applicantProfile';
import type { SubjectId } from '../../core/subjects';

/**
 * VAA 2026 — Bảng quy đổi chứng chỉ Tiếng Anh quốc tế sang điểm môn Tiếng Anh (mục 2.5 Thông tin tuyển
 * sinh, `sources.ts:vaa-notice-2026`), áp dụng cho PT thi THPT và học bạ, tất cả các ngành; quy tắc
 * "điểm nào cao hơn sẽ giữ lại và đưa vào xét tuyển":
 *  - IELTS 7,0+ -> 10; 6,5 -> 9,5; 6,0 -> 9,0; 5,5 -> 8,5; 5,0 -> 8,0; 4,5 -> 7,5
 *  - TOEFL iBT 85+ -> 10; 79-84 -> 9,5; 65-78 -> 9,0; 59-64 -> 8,5; 46-58 -> 8,0
 * TOEIC (bảng 4 kỹ năng L&R/S/W) KHÔNG dùng: hồ sơ chỉ có 1 điểm TOEIC tổng nên không đối chiếu được
 * điều kiện từng kỹ năng. Điều kiện hiệu lực chứng chỉ (cấp không quá 02 năm đến 31/08/2026) không kiểm
 * tra được vì hồ sơ không lưu ngày cấp. TOPIK/HSK xem `convertVaaKoreanChineseCertificate`.
 */
function ieltsToEnglish(score: number): number | undefined {
  if (score >= 7) return 10;
  if (score >= 6.5) return 9.5;
  if (score >= 6) return 9;
  if (score >= 5.5) return 8.5;
  if (score >= 5) return 8;
  if (score >= 4.5) return 7.5;
  return undefined;
}

function toeflToEnglish(score: number): number | undefined {
  if (score >= 85) return 10;
  if (score >= 79) return 9.5;
  if (score >= 65) return 9;
  if (score >= 59) return 8.5;
  if (score >= 46) return 8;
  return undefined;
}

export function convertVaaEnglishCertificate(certificates: ApplicantProfile['certificates']): number | undefined {
  const candidates: number[] = [];
  if (certificates?.ielts !== undefined) {
    const converted = ieltsToEnglish(certificates.ielts);
    if (converted !== undefined) candidates.push(converted);
  }
  if (certificates?.toeflIbt !== undefined) {
    const converted = toeflToEnglish(certificates.toeflIbt);
    if (converted !== undefined) candidates.push(converted);
  }
  return candidates.length > 0 ? Math.max(...candidates) : undefined;
}

/** Điểm thi THPT với môn Tiếng Anh thay bằng điểm quy đổi chứng chỉ khi điểm quy đổi cao hơn (hoặc thiếu điểm thi). */
export function applyVaaEnglishCertificate(
  scores: Partial<Record<SubjectId, number>>,
  certificates: ApplicantProfile['certificates']
): { scores: Partial<Record<SubjectId, number>>; converted?: number; used: boolean } {
  const converted = convertVaaEnglishCertificate(certificates);
  if (converted === undefined) return { scores, used: false };
  const exam = scores.english;
  if (exam !== undefined && exam >= converted) return { scores, converted, used: false };
  return { scores: { ...scores, english: converted }, converted, used: true };
}

/**
 * VAA 2026 — mục 2.5, bảng quy đổi TOPIK/HSK sang điểm môn Ngoại ngữ: Topik 4 / HSK 4 -> 10; Topik 3 / HSK 3 -> 8.
 * Chỉ dùng cho ngành Ngôn ngữ Hàn Quốc (TOPIK) và Ngôn ngữ Trung Quốc (HSK). Bảng chỉ in cấp 3 và 4; cấp cao hơn 4
 * được coi là 10 (tương đương trở lên), cấp dưới 3 không quy đổi.
 */
function levelToScore(atLeast4: boolean, atLeast3: boolean): number | undefined {
  if (atLeast4) return 10;
  if (atLeast3) return 8;
  return undefined;
}

export function convertVaaKoreanChineseCertificate(
  language: 'korean' | 'chinese',
  certificates: ApplicantProfile['certificates']
): number | undefined {
  if (language === 'korean') {
    return levelToScore(isAtLeastLevel(TOPIK_LEVELS, certificates?.topik, 'TOPIK4'), isAtLeastLevel(TOPIK_LEVELS, certificates?.topik, 'TOPIK3'));
  }
  return levelToScore(isAtLeastLevel(HSK_LEVELS, certificates?.hsk, 'HSK4'), isAtLeastLevel(HSK_LEVELS, certificates?.hsk, 'HSK3'));
}

/** Thêm điểm quy đổi TOPIK/HSK cho môn Tiếng Hàn/Tiếng Trung (lấy điểm cao hơn điểm thi hoặc khi chưa có điểm thi). */
export function applyVaaKoreanChineseCertificate(
  scores: Partial<Record<SubjectId, number>>,
  language: 'korean' | 'chinese',
  certificates: ApplicantProfile['certificates']
): { scores: Partial<Record<SubjectId, number>>; converted?: number; used: boolean } {
  const converted = convertVaaKoreanChineseCertificate(language, certificates);
  if (converted === undefined) return { scores, used: false };
  const exam = scores[language];
  if (exam !== undefined && exam >= converted) return { scores, converted, used: false };
  return { scores: { ...scores, [language]: converted }, converted, used: true };
}
