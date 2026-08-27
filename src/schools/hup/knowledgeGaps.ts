import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const hupKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hup-other-methods-not-modeled',
    label:
      'HUP công bố 6 phương thức (PT1 tuyển thẳng, PT2A THPT+SAT, PT2B học bạ chuyên, PT2C GCE A-level, PT3 TSA Bách khoa, PT4 thi TN THPT); runtime chỉ mô hình hoá ngưỡng PT4.',
    status: 'incomplete',
    impact: 'Không kiểm tra được điều kiện cho PT1/PT2A/PT2B/PT2C/PT3; chỉ đánh giá được PT4.',
    sourceId: 'hup-threshold-notice-2026',
  },
  {
    id: 'hup-equivalence-conversion-not-modeled',
    label:
      'Công thức quy đổi tương đương X = a + (Y - c) * (b - a) / (d - c) giữa các phương thức đã có trong thông báo nhưng chưa được nhập vào runtime.',
    status: 'incomplete',
    impact: 'Runtime không tự quy đổi điểm PT2A/PT2B/PT2C/PT3 sang thang PT4.',
    sourceId: 'hup-threshold-notice-2026',
  },
  {
    id: 'hup-hsg-prize-bonus-not-in-shared-profile',
    label:
      'Điểm cộng giải học sinh giỏi cấp tỉnh/quốc gia (Ba 0,5 / Nhì 1,0 / Nhất 1,25 / QG khuyến khích 1,5) đã xác minh nhưng hồ sơ dùng chung không có field thành tích — nhánh exact chỉ áp dụng cho thí sinh không có giải HSG (điểm cộng IELTS đã mô hình hoá).',
    status: 'incomplete',
    impact: 'Thí sinh có giải HSG => evaluator trả partial thay vì exact.',
    sourceId: 'hup-admission-2026',
  },
];
