/**
 * Config thuần túy (KHÔNG import React) cho competitiveness engine — tách khỏi UI để test độc
 * lập và để không lẫn business rule vào JSX. Ngưỡng dùng MARGIN CHUẨN HÓA (tỉ lệ trên thang điểm),
 * KHÔNG dùng điểm thô /30 — một trường tính theo thang 100/1200 vẫn so sánh công bằng được.
 *
 * Neo theo đề bài gốc (thang 30): >=+1.50 "biên an toàn hơn", +0.50..+1.49 "cạnh tranh tốt",
 * -0.49..+0.49 "sát mức", -1.49..-0.50 "khá khó", <-1.50 "khả năng thấp" — quy đổi sang tỉ lệ
 * bằng cách chia 30.
 */
export const SAFER_MARGIN_RATIO = 1.5 / 30;
export const COMPETITIVE_MARGIN_RATIO = 0.5 / 30;

export type CompetitivenessBand = 'safer' | 'competitive' | 'borderline' | 'hard' | 'low';

export function bandFromNormalizedMargin(normalizedMargin: number): CompetitivenessBand {
  if (normalizedMargin >= SAFER_MARGIN_RATIO) return 'safer';
  if (normalizedMargin >= COMPETITIVE_MARGIN_RATIO) return 'competitive';
  if (normalizedMargin > -COMPETITIVE_MARGIN_RATIO) return 'borderline';
  if (normalizedMargin > -SAFER_MARGIN_RATIO) return 'hard';
  return 'low';
}

/** Số năm lịch sử tối thiểu để confidence có thể đạt "Cao". */
export const MIN_HISTORY_YEARS_FOR_HIGH_CONFIDENCE = 2;

/** Điểm chuẩn cũ hơn ngưỡng này (so với năm hiện tại) không còn tính là "fresh" cho confidence cao. */
export const MAX_CUTOFF_AGE_YEARS_FOR_HIGH_CONFIDENCE = 1;

/** Biến động (chênh lệch tuyệt đối giữa 2 năm gần nhất, theo margin chuẩn hóa) vượt ngưỡng này ⇒
 * hạ confidence xuống tối đa "Trung bình" dù đủ năm/đủ nguồn. */
export const HIGH_VOLATILITY_NORMALIZED_THRESHOLD = 2 * COMPETITIVE_MARGIN_RATIO;
