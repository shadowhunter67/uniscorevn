import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const pyuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'pyu-transcript-dgnl-not-modeled',
    label:
      'Phương thức xét học bạ (ngưỡng 18/30) và phương thức xét ĐGNL ĐHQG-HCM (ngưỡng 500 điểm) chưa được mô hình hoá; chỉ phương thức xét kết quả thi TN THPT được kiểm tra. Khối ngành sư phạm không được xét bằng 2 phương thức này.',
    status: 'official-but-unparsed',
    sourceId: 'pyu-admission-score-2026',
    scoreAffecting: false,
  },
  {
    id: 'pyu-priority-bonus-not-modeled',
    label: 'Điểm ưu tiên khu vực/đối tượng theo Quy chế tuyển sinh của Bộ GD&ĐT chưa được cộng vào tổng điểm trước khi so sánh với ngưỡng.',
    status: 'incomplete',
    sourceId: 'pyu-admission-score-2026',
    scoreAffecting: true,
  },
];
