import type { CutoffComparison } from '../../core/cutoffComparison';

/**
 * Câu chênh lệch bằng TIẾNG NGƯỜI, đặt TRƯỚC số kỹ thuật.
 *
 * Trước đây UI chỉ hiện "Chênh lệch so với điểm chuẩn: +3.81/100" — đúng nhưng bắt người đọc tự
 * dịch dấu +/- và thang điểm thành ý nghĩa. Nay: "Bạn đang cao hơn điểm chuẩn 2026 khoảng 3.8
 * điểm", còn "+3.81 / 100" vẫn giữ nguyên ở lớp số liệu bên dưới (KHÔNG bỏ số gốc).
 *
 * Ràng buộc ngôn ngữ giống `competitivenessLanguage.ts`: tuyệt đối không "%", "xác suất",
 * "chắc chắn", "đảm bảo", không suy ra đậu/trượt — chỉ mô tả khoảng cách số học đã có.
 * Xem `marginLanguage.test.ts`.
 */

/** Dưới ngưỡng này coi như ngang mức — chênh 0.02 điểm mà nói "cao hơn" là gây hiểu nhầm. */
const LEVEL_EPSILON = 0.05;

export function describeReferenceLabel(referenceType: CutoffComparison['referenceType'], year?: number): string {
  const suffix = year === undefined ? '' : ` ${year}`;
  if (referenceType === 'historical') return `mức tham khảo${suffix}`;
  return `điểm chuẩn${suffix}`;
}

/**
 * @param rawMargin điểm của thí sinh trừ mốc đối chiếu, cùng thang điểm.
 */
export function describeMarginSentence(
  rawMargin: number,
  referenceType: CutoffComparison['referenceType'],
  year?: number
): string {
  const reference = describeReferenceLabel(referenceType, year);
  if (Math.abs(rawMargin) < LEVEL_EPSILON) return `Bạn đang ngang ${reference}.`;
  const direction = rawMargin > 0 ? 'cao hơn' : 'thấp hơn';
  const amount = Math.abs(rawMargin).toFixed(1).replace(/\.0$/, '');
  return `Bạn đang ${direction} ${reference} khoảng ${amount} điểm.`;
}

/** Dạng rất ngắn cho ô bảng so sánh ("+3.8 điểm" / "-1.2 điểm" / "ngang mức"). */
export function formatMarginShort(rawMargin: number): string {
  if (Math.abs(rawMargin) < LEVEL_EPSILON) return 'ngang mức';
  const amount = Math.abs(rawMargin).toFixed(1).replace(/\.0$/, '');
  return `${rawMargin > 0 ? '+' : '−'}${amount} điểm`;
}
