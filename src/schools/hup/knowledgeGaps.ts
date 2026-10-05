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
  {
    id: 'hup-pt4-duoc-transcript-condition-not-modeled',
    label:
      'PT4 ngành Dược học còn yêu cầu học bạ: kết quả học tập THPT từng năm của môn Toán và hai trong ba môn Vật lý, Hóa học, Sinh học không dưới 7,0 (Quyết định 352/QĐ-ĐHN, mục 6.2). Runtime chỉ kiểm ngưỡng điểm thi TN THPT.',
    status: 'incomplete',
    impact: 'Thí sinh đủ ngưỡng điểm thi nhưng học bạ dưới 7,0 vẫn có thể được báo đủ điều kiện ngành Dược học.',
    sourceId: 'hup-decision-352-2026',
  },
  {
    id: 'hup-khkt-isef-bonus-not-modeled',
    label:
      'Điểm cộng giải Cuộc thi KH-KT cấp quốc gia (Ba 0,5 / Nhì 0,75 / Nhất 1,0) và ISEF (1,5) chưa được mô hình hoá; hồ sơ dùng chung không có field này.',
    status: 'incomplete',
    impact: 'Thí sinh có giải KH-KT/ISEF bị thiếu điểm cộng.',
    sourceId: 'hup-decision-352-2026',
  },
];
