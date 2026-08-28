import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const uedudnKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'uedudn-program-threshold-table-not-imported',
    label:
      'Bảng ngưỡng đảm bảo chất lượng đầu vào 2026 theo từng ngành/chương trình của UED chưa được nhập đầy đủ thành dataset runtime (mới có khoảng min-max tổng hợp).',
    status: 'official-but-unparsed',
    sourceId: 'uedudn-quality-threshold-2026',
    scoreAffecting: true,
    knownData: ['Ngưỡng UED 2026 dao động khoảng 15.5-20/30 theo ngành/chương trình'],
    impact: 'So sánh chỉ loại chắc chắn hồ sơ dưới 15.5/30; chưa kết luận đạt cho từng ngành cụ thể.',
  },
  {
    id: 'uedudn-conversion-and-bonus-appendices-not-imported',
    label: 'Phụ lục quy đổi giữa các phương thức/tổ hợp và bảng điểm cộng, điểm ưu tiên của UED 2026 chưa được nhập.',
    status: 'official-but-unparsed',
    sourceId: 'uedudn-admission-info-2026',
    scoreAffecting: true,
    impact: 'Chưa bật scoreConversion/exactCalculator; cần đọc phụ lục chính thức hoặc file đính kèm dạng ảnh/PDF quét.',
  },
  {
    id: 'uedudn-aptitude-majors-not-modeled',
    label:
      '4 ngành dùng công thức riêng theo ảnh chính thức (Giáo dục Thể chất, Sư phạm Mỹ thuật, Giáo dục Mầm non, Sư phạm Âm nhạc): ngưỡng = 1 môn thi TN THPT (Toán hoặc Văn) + 1/3 điểm ưu tiên, kèm điều kiện điểm năng khiếu >= 5đ (hoặc >=6,33-6,67 tuỳ ngành) — KHÁC công thức chuẩn 3 môn, KHÔNG mô hình hoá trong calculator exact.',
    status: 'official-but-unparsed',
    sourceId: 'uedudn-admission-info-2026',
    scoreAffecting: false,
    impact: 'Calculator exact chỉ phủ 33/37 ngành dùng công thức chuẩn (3 mức ngưỡng: 15,5/17,0/20,0); 4 ngành năng khiếu cần nhập điểm năng khiếu riêng, chưa có UI/luồng nhập cho việc này.',
  },
  {
    id: 'uedudn-subject-combination-to-major-not-mapped',
    label: 'Ảnh chính thức không kèm bảng tổ hợp môn xét tuyển cụ thể cho từng ngành (chỉ có mã ngành + tên ngành + ngưỡng) — thí sinh phải tự chọn tổ hợp và tự chọn đúng nhóm ngưỡng khi dùng calculator exact.',
    status: 'incomplete',
    sourceId: 'uedudn-admission-info-2026',
    scoreAffecting: false,
    impact: 'Calculator exact tính đúng công thức + ngưỡng theo nhóm ngành đã chọn, nhưng không tự xác thực tổ hợp môn có hợp lệ với ngành đó hay không.',
  },
];
