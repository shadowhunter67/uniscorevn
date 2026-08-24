import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vkuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vku-program-threshold-table-not-imported',
    label:
      'Bảng ngưỡng đảm bảo chất lượng đầu vào 2026 theo từng ngành/chương trình của VKU chưa được nhập đầy đủ thành dataset runtime (mới có khoảng min-max tổng hợp).',
    status: 'official-but-unparsed',
    sourceId: 'vku-quality-threshold-2026',
    scoreAffecting: true,
    knownData: ['Ngưỡng VKU 2026 dao động khoảng 17-21/30 theo ngành/chương trình'],
    impact: 'So sánh chỉ loại chắc chắn hồ sơ dưới 17/30; chưa kết luận đạt cho từng ngành cụ thể.',
  },
  {
    id: 'vku-conversion-and-bonus-appendices-not-imported',
    label: 'Phụ lục quy đổi giữa các phương thức/tổ hợp và bảng điểm cộng, điểm ưu tiên của VKU 2026 chưa được nhập.',
    status: 'official-but-unparsed',
    sourceId: 'vku-admission-info-2026',
    scoreAffecting: true,
    impact: 'Chưa bật scoreConversion/exactCalculator; cần đọc phụ lục chính thức hoặc file đính kèm dạng ảnh/PDF quét.',
  },
  {
    id: 'vku-combined-formula-not-executed',
    label:
      'VKU công bố công thức thực thi được cho phương thức xét tuyển kết hợp (học bạ 60% + thi TN THPT 40% + điểm cộng + điểm ưu tiên), nhưng công thức điểm ưu tiên và phụ lục điểm cộng/thành tích chưa được chuẩn hoá vào runtime trong đợt research này.',
    status: 'official-but-unparsed',
    sourceId: 'vku-admission-info-2026',
    scoreAffecting: true,
    impact:
      'Runtime hiện chỉ kiểm tra ngưỡng đầu vào (eligibility-only); chưa bật scoreConversion/exactCalculator cho VKU.',
  },
];
