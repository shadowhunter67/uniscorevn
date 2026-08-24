import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const umtKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'umt-other-methods-not-modeled',
    label: 'UMT còn các phương thức khác (học bạ >=18/30, ĐGNL ĐHQG-HCM, V-SAT) chưa được chuẩn hoá vào runtime.',
    status: 'official-but-unparsed',
    sourceId: 'umt-threshold-2026',
    scoreAffecting: true,
    knownData: ['Học bạ THPT: từ 18/30 điểm', 'ĐGNL/V-SAT: tương đương 15/30 (quy đổi từ thang 1200)'],
    impact: 'UniscoreVN chỉ kiểm tra được ngưỡng cho phương thức xét điểm thi TN THPT.',
  },
];
