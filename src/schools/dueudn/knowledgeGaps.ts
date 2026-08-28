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
    knownData: [
      'Cross-check thứ cấp (VNUK, tuyensinh247, không phải nguồn gốc DUE): ngưỡng nhóm ngành thường 17,00/30; chương trình tiếng Anh toàn phần/bán phần (GB/PR) 18,00/30; DUE-Elite (Cử nhân tài năng) 24,00/30.',
      'Cross-check thứ cấp ghi chú "số đã công bố ĐÃ GỒM điểm cộng (nếu có) và điểm ưu tiên khu vực, đối tượng" — khác pattern raw-only của UDA/TBDU/FPTU/HCMUE, nên KHÔNG áp dụng judgment call so tổng thô nếu chưa xác minh lại từ nguồn gốc DUE.',
    ],
    attemptedSources: [
      '2026-08-28: due.udn.vn/vi-vn/tuvantuyensinh (cổng tuyển sinh 2026 DUE) — trang điều hướng, không có ngưỡng/công thức trực tiếp.',
      '2026-08-28: due.udn.vn/vi-vn/ThongBao/ThongbaoDS/bid/456 (danh sách thông báo) — không thấy thông báo ngưỡng đảm bảo chất lượng đầu vào 2026 hay công thức điểm xét tuyển trong danh sách hiển thị.',
      '2026-08-28: tìm kiếm due.udn.vn qua site-search — không ra trang thông báo ngưỡng cụ thể; chỉ ra lại các trang cổng thông tin đã thử.',
    ],
    whyNotInferred:
      'Chưa xác minh được từ nguồn gốc DUE (due.udn.vn) liệu ngưỡng 17/18/24 có thật sự đã gồm điểm cộng+ưu tiên như cross-check nói hay không — nếu áp dụng nhầm công thức (so tổng thô thay vì ĐXT-với-ưu-tiên hoặc ngược lại) sẽ sai kết luận eligible/ineligible cho thí sinh biên. Giữ nguyên eligibility-only, không nâng lên exact.',
  },
];
