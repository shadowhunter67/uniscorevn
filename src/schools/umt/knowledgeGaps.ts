import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const umtKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'umt-other-methods-not-modeled',
    label: 'UMT còn các phương thức khác (học bạ PT02 >=18/30, ĐGNL ĐHQG-HCM PT03, V-SAT PT04, PT05) chưa được chuẩn hoá vào runtime — chỉ PT01 (thi TN THPT) có nhánh exact.',
    status: 'official-but-unparsed',
    sourceId: 'umt-threshold-notice-2026',
    scoreAffecting: true,
    knownData: ['Học bạ THPT (PT02): từ 18/30 điểm', 'ĐGNL ĐHQG-HCM (PT03): 15/30 quy đổi (600/1200)', 'V-SAT (PT04): 15/30 quy đổi (225/450)'],
    impact: 'UniscoreVN chỉ kiểm tra/tính được cho phương thức PT01 (thi TN THPT).',
  },
  {
    id: 'umt-priority-bonus-not-modeled',
    label: 'Batch 2026-08-28: điểm ưu tiên khu vực/đối tượng (Điều 7 TT 06/2026, judgment call) đã model trong nhánh exact `umt-thpt-exam-exact-2026` — scope thí sinh KHÔNG có điểm cộng thành tích (bảng điểm cộng UMT chưa tìm được nguồn riêng).',
    status: 'incomplete',
    sourceId: 'umt-threshold-notice-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
];
