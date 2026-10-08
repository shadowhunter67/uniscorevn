import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const apdKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'apd-program-threshold-table-not-imported',
    label:
      'APD 2026 công bố ngưỡng đảm bảo chất lượng đầu vào riêng theo tung co so dao tao (Trụ sở chính Hà Nội 19,0/30; Phân hiệu Bắc Ninh va Phân hiệu Đà Nẵng 16,0/30), không phân biệt theo ngành/chương trình trong phạm vi đã fetch được; chưa chọn được co so cụ thể để áp dụng dung mức.',
    status: 'official-but-unparsed',
    sourceId: 'apd-admission-2026',
    scoreAffecting: true,
    knownData: [
      'Tru so chinh (Ha Noi): >= 19,0/30 (thi TN THPT)',
      'Phan hieu Bac Ninh: >= 16,0/30 (thi TN THPT)',
      'Phan hieu Da Nang: >= 16,0/30 (thi TN THPT)',
    ],
    impact: 'Runtime chi kiểm tra được ngoai le dưới ngưỡng thấp nhất (16/30 = ineligible chac chan); tu 16/30 den 19/30 cần chọn co so dao tao để kết luận chính xác.',
  },
  {
    id: 'apd-other-methods-not-modeled',
    label:
      'APD 2026 con co phương thức xét học bạ THPT va các phương thức khác (5 phương thức tổng cong tai phan hieu theo nguồn thu cap); chi phương thức thi TN THPT được mô hình hóa.',
    status: 'official-but-unparsed',
    sourceId: 'apd-admission-2026',
  },
  {
    id: 'apd-bonus-points-value-unknown',
    label:
      'Thông báo 180/TB-HVCSPT xác nhận ngưỡng đã bao gồm điểm cộng (nếu có) nhưng không công bố bảng mức điểm cộng cụ thể cho 2026 — nhánh exact (apd-thpt-exam-exact-2026) model điểm cộng = 0 do thiếu số liệu, không phải trường không áp dụng.',
    status: 'incomplete',
    sourceId: 'apd-threshold-notice-180-2026',
    scoreAffecting: true,
    impact: 'Thí sinh có điểm cộng thực tế (nếu APD có áp dụng) sẽ được tính thấp hơn điểm xét tuyển thật.',
  },
];
