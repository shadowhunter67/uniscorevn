import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const utmKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'utm-law-threshold-not-modeled',
    label: 'Ngành Luật và Luật kinh tế tại UTM áp ngưỡng riêng theo quy định của Bộ GD&ĐT (không phải 15/30) - chưa được mô hình hoá.',
    status: 'official-but-unparsed',
    sourceId: 'utm-threshold-2026',
    scoreAffecting: true,
    impact: 'Thí sinh chọn ngành Luật/Luật kinh tế sẽ nhận kết quả không xác định thay vì áp nhầm ngưỡng 15/30.',
  },
  {
    id: 'utm-other-methods-not-modeled',
    label: 'UTM còn phương thức xét học bạ (từ 18/30) và xét điểm thi đánh giá năng lực (từ 60 điểm) chưa được chuẩn hoá vào runtime.',
    status: 'official-but-unparsed',
    sourceId: 'utm-threshold-2026',
    scoreAffecting: true,
    impact: 'UniscoreVN chỉ kiểm tra được ngưỡng cho phương thức xét điểm thi TN THPT.',
  },
  {
    id: 'utm-primary-source-direct-fetch-blocked',
    label: 'Trang utm.edu.vn chặn truy cập trực tiếp (HTTP 403) trong lượt research này; số liệu lấy từ nội dung trang đã được index qua tìm kiếm, chưa fetch trực tiếp xác minh lại.',
    status: 'official-but-unparsed',
    sourceId: 'utm-threshold-2026',
    scoreAffecting: false,
    impact: 'Cần thử fetch lại từ môi trường mạng khác để xác minh trực tiếp nội dung trang.',
  },
];
