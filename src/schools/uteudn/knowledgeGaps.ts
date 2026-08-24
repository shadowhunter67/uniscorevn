import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const uteudnKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'uteudn-program-threshold-table-not-imported',
    label:
      'Bảng ngưỡng đảm bảo chất lượng đầu vào 2026 theo từng ngành/chương trình của UTE chưa được nhập đầy đủ thành dataset runtime (mới có khoảng min-max tổng hợp).',
    status: 'official-but-unparsed',
    sourceId: 'uteudn-quality-threshold-2026',
    scoreAffecting: true,
    knownData: ['Ngưỡng UTE 2026 dao động khoảng 15-20/30 theo ngành/chương trình'],
    impact: 'So sánh chỉ loại chắc chắn hồ sơ dưới 15/30; chưa kết luận đạt cho từng ngành cụ thể.',
  },
  {
    id: 'uteudn-conversion-and-bonus-appendices-not-imported',
    label: 'Phụ lục quy đổi giữa các phương thức/tổ hợp và bảng điểm cộng, điểm ưu tiên của UTE 2026 chưa được nhập.',
    status: 'official-but-unparsed',
    sourceId: 'uteudn-admission-info-2026',
    scoreAffecting: true,
    impact: 'Chưa bật scoreConversion/exactCalculator; cần đọc phụ lục chính thức hoặc file đính kèm dạng ảnh/PDF quét.',
  },
];
