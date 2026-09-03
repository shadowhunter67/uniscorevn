import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const pvuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'pvu-priority-value-silent',
    label:
      'Nguồn xác nhận điểm chuẩn "đã cộng điểm ưu tiên khu vực và đối tượng" nhưng KHÔNG công bố mức điểm ưu tiên cụ thể theo từng khu vực/đối tượng — dùng khung điểm ưu tiên quốc gia hiện hành (Điều 7 Thông tư 06/2026/TT-BGDĐT) làm judgment call cho giá trị bảng (`priority.ts`).',
    status: 'incomplete',
    sourceId: 'pvu-admission-info-2026',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải số PVU tự công bố riêng.',
  },
  {
    id: 'pvu-other-methods-not-modeled',
    label:
      'PVU 2026 có 5 phương thức xét tuyển (PT1 thi TN THPT, PT2 học bạ, PT3 ĐGNL ĐHQG HCM/HN, PT4 ĐGTD ĐHBK Hà Nội, PT5 xét thẳng/ưu tiên xét tuyển) — module này CHỈ mô hình hoá PT1 (thi TN THPT thuần).',
    status: 'incomplete',
    sourceId: 'pvu-admission-info-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển bằng PT2/PT3/PT4/PT5 chưa tính được qua UniscoreVN cho PVU.',
  },
  {
    id: 'pvu-linked-program-not-modeled',
    label: 'Hệ liên kết quốc tế (điểm chuẩn PT1 = 19,00/30, khác hệ chính quy trong nước 22,50/30) KHÔNG mô hình hoá — module chỉ tính cho hệ chính quy trong nước.',
    status: 'official-but-unparsed',
    sourceId: 'pvu-threshold-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét hệ liên kết quốc tế sẽ thấy sai ngưỡng nếu áp nhầm mức 22,50.',
  },
];
