import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vnuisKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vnuis-achievement-bonus-not-modeled',
    label:
      'Điểm cộng thành tích (mục 4.1, tối đa 5% thang điểm xét tuyển ~1,5/30, cho chứng chỉ/giải thưởng/hoạt động) KHÔNG mô hình hoá — chỉ tính Tổng thô 3 môn + Điểm ưu tiên KV/ĐT.',
    status: 'incomplete',
    sourceId: 'vnuis-notice-2026',
    scoreAffecting: true,
    impact: 'Thí sinh có điểm cộng thành tích sẽ có Điểm xét thật cao hơn kết quả UniscoreVN hiển thị — kết quả "chưa đạt" là cận dưới, không phải kết luận cuối cùng cho nhóm này.',
  },
  {
    id: 'vnuis-other-methods-not-modeled',
    label:
      'VNU-IS 2026 còn 2 phương thức khác đã công bố điểm chuẩn đầy đủ (quy đổi tương đương): xét chứng chỉ tiếng Anh quốc tế kết hợp thi TN THPT, và xét kết quả thi Đánh giá năng lực HSA — module này CHỈ mô hình hoá nhánh xét kết quả thi TN THPT thuần.',
    status: 'incomplete',
    sourceId: 'vnuis-notice-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển bằng CCTA+THPT hoặc kết quả HSA chưa tính được qua UniscoreVN cho VNU-IS (dù điểm chuẩn đã công bố, đã quy đổi tương đương thang 30 chung).',
  },
];
