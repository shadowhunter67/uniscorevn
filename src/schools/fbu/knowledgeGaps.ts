import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const fbuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'fbu-program-mapping-not-imported',
    label:
      'FBU 2026 chỉ có ngưỡng chung 17,0/30 (thi TN THPT) xác nhận qua phát biểu chính thức trên báo chí, chưa có bảng ngành/tổ hợp và ngưỡng học bạ/ĐGNL đầy đủ trong runtime.',
    status: 'official-but-unparsed',
    sourceId: 'fbu-quality-threshold-2026',
    scoreAffecting: false,
    knownData: [
      'Ngưỡng thi TN THPT: 17,0/30 điểm (mọi ngành, theo phát biểu Phó Hiệu trưởng)',
      'Ngưỡng học bạ: điểm trung bình 6 học kỳ theo tổ hợp >= 18,0/30 (theo tổng hợp báo chí, chưa xác nhận qua văn bản chính thức đọc được)',
      'Ngưỡng ĐGNL ĐHQG Hà Nội: >= 75/150 điểm gốc (theo tổng hợp báo chí, chưa xác nhận qua văn bản chính thức đọc được)',
    ],
    impact: 'Runtime chỉ kiểm tra được ngưỡng thi TN THPT chung; chưa phân biệt được ngành/tổ hợp cụ thể, và ngưỡng học bạ/ĐGNL chưa đưa vào evaluator.',
  },
  {
    id: 'fbu-priority-bonus-not-modeled',
    label: 'Điểm ưu tiên khu vực/đối tượng và điểm cộng khuyến khích chứng chỉ ngoại ngữ (IELTS, TOEIC, TOEFL iBT, HSK) chưa được cộng vào tổng điểm trước khi so với ngưỡng.',
    status: 'incomplete',
    sourceId: 'fbu-quality-threshold-2026',
    scoreAffecting: true,
    impact: 'Thí sinh có điểm ưu tiên hoặc chứng chỉ ngoại ngữ cần tự cộng điểm trước khi so sánh với ngưỡng 17,0/30 đã công bố.',
  },
];
