import type { CompetitivenessBand } from './competitivenessConfig';

/**
 * Wording bắt buộc: "mức độ cạnh tranh tham khảo", KHÔNG BAO GIỜ dùng % hay khẳng định đậu/trượt.
 * Xem test `competitivenessLanguage.test.ts` — assert không có "chắc chắn"/"đảm bảo"/"%"/"xác suất"
 * trong bất kỳ label nào ở đây.
 */
export const COMPETITIVENESS_BAND_LABELS: Record<CompetitivenessBand, string> = {
  safer: 'Có biên an toàn hơn',
  competitive: 'Khả năng cạnh tranh tốt',
  borderline: 'Cạnh tranh / sát mức điểm chuẩn',
  hard: 'Khá khó',
  low: 'Khả năng thấp',
};

export const INSUFFICIENT_DATA_LABEL = 'Chưa đủ dữ liệu để đánh giá';

export const COMPETITIVENESS_DISCLAIMER =
  'Đây là mức độ cạnh tranh tham khảo dựa trên dữ liệu điểm chuẩn các năm trước — không phải dự đoán khả năng trúng tuyển.';
