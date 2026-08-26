import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const nluKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'nlu-per-program-band-not-resolved',
    label:
      'Ngưỡng thi TN THPT dao động 16-18/30 tuỳ ngành (bảng đầy đủ theo ngành nằm trong ảnh đính kèm, chưa trích được text) — tổng điểm trong khoảng 16-18 CHƯA XÁC ĐỊNH được đủ điều kiện hay không nếu chưa biết ngành cụ thể thuộc nhóm nào.',
    status: 'official-but-unparsed',
    sourceId: 'nlu-floor-score-2026',
    scoreAffecting: false,
  },
  {
    id: 'nlu-pedagogy-excluded',
    label: 'Ngành Giáo dục mầm non/Sư phạm kỹ thuật nông nghiệp theo quy định riêng của Bộ GD&ĐT, KHÔNG nằm trong băng điểm 16-18/30 này.',
    status: 'official-but-unparsed',
    sourceId: 'nlu-floor-score-2026',
    scoreAffecting: false,
  },
  {
    id: 'nlu-transcript-dgnl-not-modeled',
    label: 'Phương thức xét học bạ (18-20/30) và ĐGNL ĐHQG-HCM (601-650/1200) chưa được mô hình hoá; chỉ phương thức xét kết quả thi TN THPT được kiểm tra.',
    status: 'official-but-unparsed',
    sourceId: 'nlu-floor-score-2026',
    scoreAffecting: false,
  },
  {
    id: 'nlu-priority-bonus-not-modeled',
    label: 'Điểm ưu tiên khu vực/đối tượng theo Quy chế tuyển sinh của Bộ GD&ĐT chưa được cộng vào tổng điểm trước khi so sánh với ngưỡng.',
    status: 'incomplete',
    sourceId: 'nlu-floor-score-2026',
    scoreAffecting: true,
  },
];
