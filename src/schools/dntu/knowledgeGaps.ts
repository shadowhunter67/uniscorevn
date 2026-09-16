import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const dntuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'dntu-other-methods-not-modeled',
    label: 'DNTU còn 2 phương thức khác (học bạ ≥18/30 hoặc ≥19,5 cho Điều dưỡng/Xét nghiệm y học, ĐGNL ĐHQG TP.HCM ≥500 hoặc ≥600 khối Sức khỏe) chưa chuẩn hoá — chỉ phương thức thi TN THPT có nhánh exact.',
    status: 'official-but-unparsed',
    sourceId: 'dntu-cutoff-notice-2026',
    scoreAffecting: true,
    knownData: ['Học bạ: ≥18/30 (Điều dưỡng/Xét nghiệm y học ≥19,5, học lực Khá trở lên)', 'ĐGNL ĐHQG TP.HCM: ≥500 (khối Sức khỏe ≥600)'],
    impact: 'UniscoreVN chỉ kiểm tra/tính được cho phương thức thi TN THPT.',
  },
  {
    id: 'dntu-formula-secondary-crosscheck',
    label:
      'Công thức ĐXT ("Điểm trúng tuyển = Môn 1 + Môn 2 + Môn 3 + Điểm cộng nếu có") không tìm lại được nguyên văn trên trang công bố điểm chuẩn chính thức (chỉ có bảng ngưỡng) — trích từ tổng hợp thứ cấp cross-check nhiều báo đăng lại cùng thông báo, khớp với số liệu ngưỡng đã xác nhận trên trang chính. Điểm ưu tiên chỉ hiển thị tham khảo, không dùng so ngưỡng.',
    status: 'provisional',
    sourceId: 'dntu-cutoff-notice-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
];
