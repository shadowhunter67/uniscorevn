import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const ntuhnKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'ntuhn-transcript-method-not-modeled',
    label: 'Phương thức xét học bạ THPT (ngưỡng 18/30) va 2 phương thức kết hợp điểm năng khiếu (dành cho Thiết kế đồ họa, Kiến trúc, Thiết kế nội thất) chưa được mô hình hóa; chi phương thức xét kết quả thi TN THPT được kiểm tra.',
    status: 'official-but-unparsed',
    sourceId: 'ntuhn-admission-score-2026',
    scoreAffecting: false,
  },
  {
    id: 'ntuhn-priority-bonus-not-modeled',
    label: 'Batch 2026-08-28: đã tim được thông báo chính thức (không chi báo chí thu cap) va model điểm ưu tiên (Điều 7 TT 06/2026, judgment call) trong nhanh exact `ntuhn-thpt-exam-exact-2026`. Phương thức eligibility rong (`ntuhn-thpt-exam-2026`) van chi cộng điểm thô 3 môn.',
    status: 'incomplete',
    sourceId: 'ntuhn-threshold-notice-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
];
