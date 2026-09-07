import type { ResultConfidence } from '../core/admissionEvaluation';

export type EvaluationDisplayStatus = 'exact' | 'partial' | 'unavailable';

export function getEvaluationDisplayStatus(confidence: ResultConfidence): EvaluationDisplayStatus {
  if (confidence === 'exact-verified' || confidence === 'exact-cross-checked') return 'exact';
  if (confidence === 'partial') return 'partial';
  return 'unavailable';
}

/**
 * Nhãn hiển thị. CHỈ là chuỗi hiển thị — enum/key/logic phân loại (`getEvaluationDisplayStatus`)
 * không đổi.
 *
 * 'exact' trước đây hiển thị "Tính được chính xác". Trạng thái này thực chất nghĩa là "đủ dữ liệu
 * để áp dụng ĐẦY ĐỦ công thức hiện có của trường" (`exact-verified`/`exact-cross-checked`), chứ
 * không hứa hẹn kết quả tuyển sinh thật sẽ đúng như vậy — "chính xác" dễ bị đọc thành lời cam kết.
 * Nay dùng "Tính đầy đủ" + câu giải thích ở `evaluationDisplayHelp`.
 */
export function evaluationDisplayLabel(status: EvaluationDisplayStatus): string {
  switch (status) {
    case 'exact':
      return 'Tính đầy đủ';
    case 'partial':
      return 'Tính được một phần';
    case 'unavailable':
      return 'Chưa đủ dữ liệu để tính';
  }
}

/** Câu giải thích ngắn đi kèm nhãn (tooltip/helper) — nói rõ nhãn nói về DỮ LIỆU ĐẦU VÀO và công
 * thức, không phải về khả năng trúng tuyển. */
export function evaluationDisplayHelp(status: EvaluationDisplayStatus): string {
  switch (status) {
    case 'exact':
      return 'Đủ dữ liệu để áp dụng đầy đủ công thức hiện có của trường.';
    case 'partial':
      return 'Áp dụng được một phần công thức — còn thiếu dữ liệu hoặc quy định chưa công bố.';
    case 'unavailable':
      return 'Chưa đủ dữ liệu để tính điểm xét tuyển cho nguyện vọng này.';
  }
}

export function evaluationSortWeight(status: EvaluationDisplayStatus): number {
  switch (status) {
    case 'exact':
      return 0;
    case 'partial':
      return 1;
    case 'unavailable':
      return 2;
  }
}
