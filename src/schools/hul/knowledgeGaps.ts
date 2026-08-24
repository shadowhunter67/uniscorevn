import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const hulKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hul-transcript-method-not-modeled',
    label: 'HUL phương thức xét học bạ (Phương thức 2) có công thức và điều kiện riêng nhưng chưa được chuẩn hóa vào runtime.',
    status: 'official-but-unparsed',
    sourceId: 'hul-admission-methods-2026',
    scoreAffecting: true,
    impact: 'UniscoreVN chỉ kiểm tra ngưỡng cho phương thức xét điểm thi TN THPT, chưa kiểm tra được ngưỡng/điểm xét tuyển bằng học bạ.',
  },
  {
    id: 'hul-bonus-priority-not-modeled',
    label: 'HUL công bố điểm cộng tối đa không vượt quá 10% điểm tối đa (3/30) và điểm ưu tiên khu vực/đối tượng, nhưng chưa được model hóa.',
    status: 'incomplete',
    sourceId: 'hul-admission-methods-2026',
    scoreAffecting: true,
    impact: 'Eligibility checks compare raw available scores to the published minimum threshold without adding bonus/priority adjustments.',
  },
];
