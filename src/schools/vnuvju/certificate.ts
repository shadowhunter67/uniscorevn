import { JLPT_LEVELS, isAtLeastLevel, type ApplicantProfile, type JlptLevel } from '../../core/applicantProfile';
import type { SubjectId } from '../../core/subjects';

/**
 * VJU 2026 — Phụ lục I "Bảng quy đổi điểm chứng chỉ ngoại ngữ sang thang điểm 10"
 * (`sources.ts:vnuvju-notice-2026`): điểm xét Phương thức 100 gồm điểm quy đổi chứng chỉ ngoại ngữ và điểm
 * 02 môn còn lại trong tổ hợp.
 *  - IELTS 5,5 -> 8,0; 6,0 -> 8,5; 6,5 -> 9,0; 7,0 -> 9,5; 7,5-9,0 -> 10
 *  - TOEFL iBT 72-78 -> 8,0; 79-87 -> 8,5; 88-95 -> 9,0; 96-101 -> 9,5; 102-120 -> 10
 * Chứng chỉ phải đủ 4 kỹ năng, còn hạn trong 02 năm tính đến thời điểm xét tuyển, không chấp nhận thi
 * online — hồ sơ không lưu các điều kiện này. Mô hình lấy điểm cao hơn giữa điểm thi môn Tiếng Anh và điểm
 * quy đổi (thí sinh tự chọn đăng ký có hoặc không dùng chứng chỉ). Vstep và JLPT không dùng: Vstep không
 * có trong hồ sơ; JLPT chỉ thay môn Tiếng Nhật mà hệ thống chưa mô hình hoá.
 */
function ieltsToScore10(score: number): number | undefined {
  if (score >= 7.5) return 10;
  if (score >= 7) return 9.5;
  if (score >= 6.5) return 9;
  if (score >= 6) return 8.5;
  if (score >= 5.5) return 8;
  return undefined;
}

function toeflToScore10(score: number): number | undefined {
  if (score >= 102) return 10;
  if (score >= 96) return 9.5;
  if (score >= 88) return 9;
  if (score >= 79) return 8.5;
  if (score >= 72) return 8;
  return undefined;
}

export function convertVnuvjuEnglishCertificate(certificates: ApplicantProfile['certificates']): number | undefined {
  const candidates: number[] = [];
  if (certificates?.ielts !== undefined) {
    const converted = ieltsToScore10(certificates.ielts);
    if (converted !== undefined) candidates.push(converted);
  }
  if (certificates?.toeflIbt !== undefined) {
    const converted = toeflToScore10(certificates.toeflIbt);
    if (converted !== undefined) candidates.push(converted);
  }
  return candidates.length > 0 ? Math.max(...candidates) : undefined;
}

export function applyVnuvjuEnglishCertificate(
  scores: Partial<Record<SubjectId, number>>,
  certificates: ApplicantProfile['certificates']
): { scores: Partial<Record<SubjectId, number>>; converted?: number; used: boolean } {
  const converted = convertVnuvjuEnglishCertificate(certificates);
  if (converted === undefined) return { scores, used: false };
  const exam = scores.english;
  if (exam !== undefined && exam >= converted) return { scores, converted, used: false };
  return { scores: { ...scores, english: converted }, converted, used: true };
}

/** JLPT -> điểm môn Tiếng Nhật thang 10 (Phụ lục I): N3 = 9,0; N2 = 9,5; N1 = 10. N4/N5 không quy đổi. */
export function convertVnuvjuJlpt(level: JlptLevel | undefined): number | undefined {
  if (isAtLeastLevel(JLPT_LEVELS, level, 'N1')) return 10;
  if (isAtLeastLevel(JLPT_LEVELS, level, 'N2')) return 9.5;
  if (isAtLeastLevel(JLPT_LEVELS, level, 'N3')) return 9;
  return undefined;
}

export interface VnuvjuCertificateResult {
  scores: Partial<Record<SubjectId, number>>;
  english?: { converted: number; used: boolean };
  japanese?: { converted: number; used: boolean };
}

/** Áp quy đổi chứng chỉ cho môn Tiếng Anh (IELTS/TOEFL iBT) và Tiếng Nhật (JLPT): lấy điểm cao hơn. */
export function applyVnuvjuLanguageCertificates(
  scores: Partial<Record<SubjectId, number>>,
  certificates: ApplicantProfile['certificates']
): VnuvjuCertificateResult {
  const englishApplied = applyVnuvjuEnglishCertificate(scores, certificates);
  const result: VnuvjuCertificateResult = { scores: englishApplied.scores };
  if (englishApplied.converted !== undefined) result.english = { converted: englishApplied.converted, used: englishApplied.used };

  const japaneseConverted = convertVnuvjuJlpt(certificates?.jlpt);
  if (japaneseConverted !== undefined) {
    const exam = result.scores.japanese;
    const used = exam === undefined || exam < japaneseConverted;
    if (used) result.scores = { ...result.scores, japanese: japaneseConverted };
    result.japanese = { converted: japaneseConverted, used };
  }
  return result;
}
