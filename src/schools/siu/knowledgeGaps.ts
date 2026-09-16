import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const siuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'siu-law-economics-threshold-unknown',
    label: 'Ngành Luật kinh tế áp dụng ngưỡng riêng theo quy định Bộ GD&ĐT cho nhóm ngành pháp luật (số cụ thể không nêu tại nguồn) — ngoài phạm vi nhánh exact.',
    status: 'incomplete',
    sourceId: 'siu-threshold-notice-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
  {
    id: 'siu-other-methods-not-modeled',
    label: 'SIU còn 2 phương thức khác (học bạ ≥18/30, ĐGNL ĐHQG-HCM ≥600/1200) chưa chuẩn hoá — chỉ phương thức thi TN THPT có nhánh exact.',
    status: 'official-but-unparsed',
    sourceId: 'siu-threshold-notice-2026',
    scoreAffecting: true,
    knownData: ['Học bạ: ≥18/30 (trung bình 3 năm)', 'ĐGNL ĐHQG-HCM: ≥600/1200'],
    impact: 'UniscoreVN chỉ kiểm tra/tính được cho phương thức thi TN THPT.',
  },
];
