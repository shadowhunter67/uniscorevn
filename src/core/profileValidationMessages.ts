import { CERTIFICATE_RANGES, THPT_SCORE_RANGE } from './applicantProfileStorage';
import { VACT_TOTAL_RANGE } from './vactProfile';

/**
 * Thông báo lỗi form bằng tiếng người — KHÔNG dùng chung 1 câu "Giá trị không hợp lệ" cho mọi
 * field. Range dùng lại đúng hằng số đã có ở `applicantProfileStorage.ts`/`vactProfile.ts` (source-
 * of-truth duy nhất, không khai lại). Đây là validation cho UI ngay lúc gõ — khác
 * `sanitizeApplicantProfile` (âm thầm drop giá trị sai khi ghi localStorage, không hiện thông báo).
 */
export function validateScoreRange(input: { label: string; rawValue: string; min: number; max: number }): string | null {
  const trimmed = input.rawValue.trim();
  if (trimmed === '') return null;
  const value = Number(trimmed);
  if (!Number.isFinite(value)) return `${input.label} phải là một số — bạn đang nhập "${input.rawValue}".`;
  if (value < input.min || value > input.max) {
    return `${input.label} phải từ ${input.min} đến ${input.max} — bạn đang nhập ${input.rawValue}.`;
  }
  return null;
}

export function validateThptScore(subjectLabel: string, rawValue: string): string | null {
  return validateScoreRange({ label: `Điểm ${subjectLabel}`, rawValue, min: THPT_SCORE_RANGE.min, max: THPT_SCORE_RANGE.max });
}

export function validateTranscriptScore(subjectLabel: string, gradeLabel: string, rawValue: string): string | null {
  return validateScoreRange({ label: `Điểm ${subjectLabel} ${gradeLabel}`, rawValue, min: THPT_SCORE_RANGE.min, max: THPT_SCORE_RANGE.max });
}

export function validateVactTotal(rawValue: string): string | null {
  return validateScoreRange({ label: 'Tổng điểm ĐGNL', rawValue, min: VACT_TOTAL_RANGE.min, max: VACT_TOTAL_RANGE.max });
}

export function validateCertificateScore(key: keyof typeof CERTIFICATE_RANGES, label: string, rawValue: string): string | null {
  const range = CERTIFICATE_RANGES[key];
  return validateScoreRange({ label: `Điểm ${label}`, rawValue, min: range.min, max: range.max });
}
