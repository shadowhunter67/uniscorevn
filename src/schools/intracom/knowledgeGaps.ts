import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const intracomKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'intracom-other-methods-not-modeled',
    label: 'Intracom University còn phương thức xét tuyển thẳng, học bạ, ĐGNL chưa chuẩn hoá — chỉ phương thức thi TN THPT có nhánh exact.',
    status: 'incomplete',
    sourceId: 'intracom-threshold-notice-2026',
    scoreAffecting: true,
    impact: 'UniscoreVN chỉ kiểm tra/tính được cho phương thức thi TN THPT.',
  },
  {
    id: 'intracom-combination-scope-not-full',
    label: 'Không có bảng tổ hợp môn theo từng ngành trên nguồn — model theo tập tổ hợp CHUNG nằm trong taxonomy hiện có, không ràng buộc theo ngành cụ thể.',
    status: 'official-but-unparsed',
    sourceId: 'intracom-threshold-notice-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
];
