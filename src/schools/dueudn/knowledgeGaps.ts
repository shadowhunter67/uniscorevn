import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const dueudnKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'dueudn-program-threshold-table-not-imported',
    label:
      'Bảng ngưỡng đảm bảo chất lượng đầu vào 2026 theo từng ngành/chương trình của DUE chưa được nhập đầy đủ thành dataset runtime (mới có khoảng min-max tổng hợp).',
    status: 'official-but-unparsed',
    sourceId: 'dueudn-quality-threshold-2026',
    scoreAffecting: true,
    knownData: ['Ngưỡng DUE 2026 dao động khoảng 17-24/30 theo ngành/chương trình'],
    impact: 'So sánh chỉ loại chắc chắn hồ sơ dưới 17/30; chưa kết luận đạt cho từng ngành cụ thể.',
  },
  {
    id: 'dueudn-conversion-and-bonus-appendices-not-imported',
    label: 'Phụ lục quy đổi giữa các phương thức/tổ hợp và bảng điểm cộng, điểm ưu tiên của DUE 2026 chưa được nhập.',
    status: 'official-but-unparsed',
    sourceId: 'dueudn-admission-info-2026',
    scoreAffecting: true,
    impact: 'Chưa bật scoreConversion/exactCalculator; cần đọc phụ lục chính thức hoặc file đính kèm dạng ảnh/PDF quét.',
  },
];
