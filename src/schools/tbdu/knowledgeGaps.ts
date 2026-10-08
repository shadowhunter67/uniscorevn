import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const tbduKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'tbdu-law-group-conditions-not-modeled',
    label:
      'Nhánh exact (tbdu-thpt-exam-exact-2026, nhóm ngành thường) đã model ngưỡng 15/30. Ngành Luật/Luật kinh tế áp dụng 1 trong 3 điều kiện riêng, không theo ngưỡng chung — ngoài phạm vi nhánh exact.',
    status: 'official-but-unparsed',
    sourceId: 'tbdu-admission-info-2026',
    scoreAffecting: false,
    knownData: [
      'Đa số ngành: tổng 3 môn thi TN THPT >= 15,0/30',
      'Luật, Luật kinh tế: (a) tổng điểm thi TN THPT (đã gồm ưu tiên) >= 20,0/30; HOAC (b) học lực lớp 12 loại Tốt VA tổng điểm thi >= 18,0/30; HOAC (c) điểm xét tốt nghiệp THPT >= 8,5/10',
    ],
    impact: 'method-out-of-scope',
  },
  {
    id: 'tbdu-transcript-aptitude-not-modeled',
    label: 'TBDU 2026 con co phương thức học bạ va học bạ kết hợp danh gia năng lực; chi phương thức thi TN THPT được mô hình hóa.',
    status: 'official-but-unparsed',
    sourceId: 'tbdu-admission-info-2026',
  },
];
