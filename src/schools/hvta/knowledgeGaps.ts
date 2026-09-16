import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const hvtaKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hvta-pre-screening-not-modeled',
    label:
      'HVTA yêu cầu thí sinh phải "Đạt sơ tuyển" tại Tòa án nhân dân nơi hộ khẩu/tạm trú hoặc tại Học viện (hồ sơ, lý lịch, sức khỏe...) TRƯỚC khi được xét theo điểm — điều kiện pass/fail ngoài phạm vi điểm số, UniscoreVN không kiểm tra được. "Đủ điều kiện xét tuyển" theo UniscoreVN chỉ có nghĩa đạt ngưỡng điểm, KHÔNG đảm bảo đã qua sơ tuyển.',
    status: 'incomplete',
    sourceId: 'hvta-admission-info-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
  {
    id: 'hvta-other-methods-not-modeled',
    label: 'HVTA còn phương thức xét học bạ (điều kiện điểm TB 3 năm ≥22,0 tổ hợp + hạnh kiểm tốt) và xét tuyển thẳng — chỉ phương thức thi TN THPT có nhánh model.',
    status: 'official-but-unparsed',
    sourceId: 'hvta-admission-info-2026',
    scoreAffecting: true,
    knownData: ['Học bạ: điểm TB 3 năm tổ hợp ≥22,0/30, điểm TB lớp 11+12 ≥8,0, hạnh kiểm 3 năm loại tốt'],
    impact: 'UniscoreVN chỉ kiểm tra được cho phương thức thi TN THPT.',
  },
  {
    id: 'hvta-bonus-not-modeled',
    label:
      'Điểm cộng ưu tiên khu vực/đối tượng và chứng chỉ tiếng Anh quốc tế (IELTS/TOEFL iBT/TOEIC, mục 5.b, trần 3,0/30) chỉ hiển thị tham khảo, KHÔNG dùng để so ngưỡng (nguồn không nói rõ ngưỡng đã gồm ưu tiên hay chưa) và chưa model chứng chỉ ngoại ngữ trong ApplicantProfile.',
    status: 'incomplete',
    sourceId: 'hvta-admission-info-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
];
