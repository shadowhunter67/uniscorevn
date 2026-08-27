import { round2 } from '../../core/round2';

/**
 * Công thức xét tuyển Phương thức 1 (PT1 — xét kết quả thi TN THPT) của Trường Đại học Hàng hải
 * Việt Nam. Nguồn: Thông báo tuyển sinh đại học hệ chính quy năm 2026 số 1329/TB-ĐHHHVN ngày
 * 04/6/2026 (`vmu-admission-2026`), mục 2.2.1, trích nguyên văn:
 *
 *   Điểm xét tuyển (ĐXT) = Tổng điểm các môn thi trong tổ hợp xét tuyển + điểm ưu tiên (nếu có)
 *
 * Tổng thô 3 môn, không hệ số, không có điểm cộng/thưởng trong PT1. Thang 30, làm tròn 2 chữ số
 * thập phân.
 */
export function calculateVmuThptRawScore30(subjectScores: readonly number[]): number {
  return round2(subjectScores.reduce((sum, value) => sum + value, 0));
}

export function calculateVmuThptFinalScore30(input: { raw30: number; priority30: number }): number {
  return round2(input.raw30 + input.priority30);
}
