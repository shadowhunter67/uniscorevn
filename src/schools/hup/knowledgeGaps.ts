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
    id: 'hup-bonus-priority-not-modeled',
    label:
      'Bảng cộng điểm chứng chỉ tiếng Anh quốc tế (IELTS 5.5-7.0+) và giải học sinh giỏi cấp tỉnh/quốc gia (tối đa 3 điểm) đã xác minh nhưng chưa nhập vào evaluator.',
    status: 'incomplete',
    impact: 'Runtime chưa cộng điểm khuyến khích/ưu tiên vào kết quả xét tuyển.',
    sourceId: 'hup-admission-2026',
  },
];
