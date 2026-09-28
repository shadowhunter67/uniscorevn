import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vnuhsbKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vnuhsb-priority-table-not-published',
    label:
      'Trang chính thức xác nhận Điểm xét = tổng thô + điểm ưu tiên (nếu có), nhưng không công bố bảng mức điểm ưu tiên cụ thể theo khu vực/đối tượng trong thông báo đã thu thập — dùng khung điểm ưu tiên quốc gia hiện hành (Thông tư 06/2025/TT-BGDĐT) làm judgment call.',
    status: 'incomplete',
    sourceId: 'vnuhsb-notice-2026',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải bảng riêng của trường.',
  },
  {
    id: 'vnuhsb-x27-x28-combination-not-modeled',
    label:
      'Tổ hợp X27 (Toán, Công nghệ công nghiệp, Tiếng Anh) và X28 (Toán, Công nghệ nông nghiệp, Tiếng Anh) không có SubjectId tương ứng trong hệ thống UniscoreVN — thí sinh dùng 8/10 tổ hợp còn lại (A01/D01/D07/D08/D09/D10/X25/X26) vẫn tính bình thường.',
    status: 'incomplete',
    sourceId: 'vnuhsb-notice-2026',
    scoreAffecting: false,
    impact: 'Thí sinh thi tổ hợp X27/X28 chưa tính được qua UniscoreVN cho VNU-HSB.',
  },
  {
    id: 'vnuhsb-bbns-not-modeled',
    label:
      'Chương trình thứ 7 (BBNS — Kinh doanh, chuyên ngành kép Marketing và Phân tích kinh doanh) có thông báo tuyển sinh riêng, không nằm trong bảng điểm chuẩn tổng hợp của ĐHQGHN đã thu thập — chưa mô hình hoá vì chưa có điểm chuẩn xác nhận.',
    status: 'incomplete',
    sourceId: 'vnuhsb-notice-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển chương trình BBNS chưa tính được qua UniscoreVN cho VNU-HSB.',
  },
];
