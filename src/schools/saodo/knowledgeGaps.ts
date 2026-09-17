import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const saodoKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'saodo-pedagogy-programs-not-modeled',
    label: 'Sư phạm Tiếng Trung Quốc (26,18/30) và Sư phạm công nghệ (23,50/30) có điểm chuẩn bất thường cao so với mặt bằng chung — chưa xác nhận điều kiện phụ/năng khiếu, loại khỏi phạm vi nhánh exact.',
    status: 'incomplete',
    sourceId: 'saodo-cutoff-notice-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
  {
    id: 'saodo-other-methods-not-modeled',
    label: 'SDU còn 4 phương thức khác (kết hợp học bạ+THPT 17,00-26,94; học bạ 18,00-27,71; ĐGNL ĐHQGHN 54,00-102,00; ĐGTD ĐHBK HN 38,92-62,57) chưa chuẩn hoá — chỉ phương thức thi TN THPT có nhánh exact.',
    status: 'official-but-unparsed',
    sourceId: 'saodo-cutoff-notice-2026',
    scoreAffecting: true,
    impact: 'UniscoreVN chỉ kiểm tra/tính được cho phương thức thi TN THPT.',
  },
];
