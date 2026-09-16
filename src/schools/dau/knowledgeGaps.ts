import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const dauKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'dau-aptitude-combined-not-modeled',
    label: 'Phương thức "Kết hợp kết quả thi TN THPT và điểm thi năng khiếu" (cùng ngưỡng 15/30) chưa model — cần điểm thi năng khiếu riêng, chưa có trong ApplicantProfile.',
    status: 'incomplete',
    sourceId: 'dau-threshold-notice-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
  {
    id: 'dau-other-methods-not-modeled',
    label: 'DAU còn phương thức học bạ và học bạ kết hợp năng khiếu (ngưỡng 19/30) chưa chuẩn hoá — chỉ phương thức thi TN THPT thuần có nhánh exact.',
    status: 'official-but-unparsed',
    sourceId: 'dau-threshold-notice-2026',
    scoreAffecting: true,
    knownData: ['Học bạ: ≥19/30', 'Học bạ kết hợp năng khiếu: ≥19/30'],
    impact: 'UniscoreVN chỉ kiểm tra/tính được cho phương thức thi TN THPT thuần.',
  },
  {
    id: 'dau-real-cutoff-higher-than-floor',
    label: 'Điểm chuẩn TRÚNG TUYỂN thật đã công bố (16,5-18/30 theo ngành) CAO HƠN điểm sàn 15/30 model ở đây — "đủ điều kiện xét tuyển" theo UniscoreVN chỉ có nghĩa đạt sàn, KHÔNG đảm bảo trúng tuyển thật. Chưa có bảng điểm chuẩn đầy đủ theo từng ngành để model chính xác hơn.',
    status: 'incomplete',
    sourceId: 'dau-threshold-notice-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
];
