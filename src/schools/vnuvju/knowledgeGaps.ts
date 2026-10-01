import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vnuvjuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vnuvju-japanese-combinations-not-modeled',
    label:
      'Các tổ hợp có môn Tiếng Nhật (D06, D28, D23, D33, D18, D43, D53, D63, X98) không có SubjectId tương ứng trong hệ thống UniscoreVN — thí sinh dùng các tổ hợp còn lại của từng chương trình (xem thresholds.ts) vẫn tính bình thường.',
    status: 'incomplete',
    sourceId: 'vnuvju-notice-2026',
    scoreAffecting: false,
    impact: 'Thí sinh thi tổ hợp có Tiếng Nhật chưa tính được qua UniscoreVN cho VJU.',
  },
  {
    id: 'vnuvju-foreign-language-conversion-not-modeled',
    label:
      'VJU cho phép dùng chứng chỉ ngoại ngữ (IELTS/TOEFL/Vstep/JLPT) quy đổi thay điểm môn ngoại ngữ trong tổ hợp (Phụ lục I) — chưa mô hình hoá, mô hình chỉ tính trên điểm thi TN THPT thô.',
    status: 'incomplete',
    sourceId: 'vnuvju-notice-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét bằng chứng chỉ ngoại ngữ quy đổi chưa tính được qua UniscoreVN.',
  },
  {
    id: 'vnuvju-language-entry-condition-not-checked',
    label:
      'Các chương trình chất lượng cao có điều kiện ngoại ngữ đầu vào (Phụ lục II: chứng chỉ ngoại ngữ tối thiểu hoặc điểm thi TN THPT môn ngoại ngữ tối thiểu; riêng Kỹ thuật Xây dựng không áp dụng) — UniscoreVN KHÔNG kiểm tra điều kiện này, chỉ so điểm xét với điểm trúng tuyển.',
    status: 'incomplete',
    sourceId: 'vnuvju-notice-2026',
    scoreAffecting: false,
    impact: 'Kết quả "đạt điểm trúng tuyển" chưa bao gồm việc thí sinh đã đủ điều kiện ngoại ngữ đầu vào của chương trình.',
  },
  {
    id: 'vnuvju-bonus-points-not-modeled',
    label:
      'Điểm trúng tuyển ĐHQGHN công bố "đã bao gồm điểm ưu tiên khu vực, đối tượng và khuyến khích (nếu có)" — điểm thưởng/khuyến khích (giải HSG, chứng chỉ quốc tế...) chưa mô hình hoá; điểm ưu tiên dùng khung quốc gia hiện hành làm judgment call.',
    status: 'incomplete',
    sourceId: 'vnuvju-notice-2026',
    scoreAffecting: true,
    impact: 'Thí sinh có điểm thưởng/khuyến khích sẽ thấy Điểm xét thấp hơn thực tế.',
  },
];
