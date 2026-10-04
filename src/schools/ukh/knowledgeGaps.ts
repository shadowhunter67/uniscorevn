import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const ukhKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'ukh-achievement-bonus-not-modeled',
    label:
      'UKH 2026 có "Điểm cộng" (điểm thưởng/điểm xét thưởng/điểm khuyến khích) tối đa 3,00 điểm cộng vào tổng điểm 3 môn cho thí sinh có thành tích phù hợp (giải học sinh giỏi quốc gia/quốc tế, thi tay nghề ASEAN/quốc tế, chứng chỉ ngoại ngữ...) — KHÔNG mô hình hoá (cần phân loại thành tích thủ công, không phải input chuẩn hoá). Kết quả tính hiện tại (tổng thô + ưu tiên) là CẬN DƯỚI cho thí sinh có thành tích — nếu báo "chưa đạt", thí sinh có thành tích phù hợp vẫn có thể đủ điều kiện trên thực tế.',
    status: 'official-but-unparsed',
    sourceId: 'ukh-scheme-2026',
    scoreAffecting: true,
    impact: 'Thí sinh có thành tích/chứng chỉ ngoại ngữ đủ điều kiện cộng điểm có thể bị đánh giá "chưa đạt" sai (điểm thật cao hơn điểm hệ thống tính).',
  },
  {
    id: 'ukh-hocba-dgnl-branch-not-modeled',
    label:
      'UKH 2026 còn 2 nhánh khác đã công bố điểm chuẩn đầy đủ theo ngành: xét kết quả học tập cấp THPT (học bạ, thang 30) và sử dụng kết quả thi ĐGNL ĐHQG-HCM (thang 1200) — module này CHỈ mô hình hoá nhánh xét kết quả thi TN THPT.',
    status: 'official-but-unparsed',
    sourceId: 'ukh-cutoff-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển bằng học bạ THPT hoặc kết quả thi ĐGNL ĐHQG-HCM chưa tính được qua UniscoreVN cho UKH (dù điểm chuẩn đã công bố).',
  },
];
