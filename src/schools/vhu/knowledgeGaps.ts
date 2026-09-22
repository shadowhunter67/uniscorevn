import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vhuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vhu-talent-programs-out-of-scope',
    label:
      '4 mã ngành năng khiếu (Thanh nhạc 7210205, Piano 7210208, Đạo diễn điện ảnh - truyền hình 7210235, Công nghệ điện ảnh - truyền hình 7210302) dùng tổ hợp/kỳ thi năng khiếu riêng — không có SubjectId tương ứng trong taxonomy hiện có.',
    status: 'official-but-unparsed',
    sourceId: 'vhu-cutoff-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
  {
    id: 'vhu-other-methods-not-modeled',
    label: 'VHU 2026 còn phương thức xét học bạ, xét kết hợp thi tuyển năng khiếu, và ĐGNL ĐHQG TP.HCM; chỉ phương thức thi TN THPT được mô hình hoá.',
    status: 'official-but-unparsed',
    sourceId: 'vhu-threshold-2026',
  },
];
