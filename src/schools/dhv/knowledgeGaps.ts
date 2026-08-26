import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const dhvKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'dhv-law-psychology-not-modeled',
    label:
      'Nhóm ngành Luật và Tâm lý học chưa có ngưỡng công bố (chờ Bộ GD&ĐT ban hành quy định riêng khối sức khỏe/luật); KHÔNG áp dụng ngưỡng 15/30 chung của các ngành còn lại cho nhóm này.',
    status: 'official-but-unparsed',
    sourceId: 'dhv-admission-score-2026',
    scoreAffecting: false,
  },
  {
    id: 'dhv-transcript-nlgn-methods-not-modeled',
    label:
      'Phương thức xét học bạ (ngưỡng 18/30, công thức Toán hoặc Ngữ văn + TB cả năm THPT x2, chưa rõ quy tắc chọn môn) và phương thức xét ĐGNL ĐHQG-HCM (ngưỡng 600/1200) chưa được mô hình hoá; chỉ phương thức xét kết quả thi TN THPT được kiểm tra.',
    status: 'official-but-unparsed',
    sourceId: 'dhv-admission-score-2026',
    scoreAffecting: false,
  },
  {
    id: 'dhv-priority-bonus-not-modeled',
    label: 'Điểm ưu tiên khu vực/đối tượng theo Quy chế tuyển sinh của Bộ GD&ĐT chưa được cộng vào tổng điểm trước khi so sánh với ngưỡng.',
    status: 'incomplete',
    sourceId: 'dhv-admission-score-2026',
    scoreAffecting: true,
  },
];
