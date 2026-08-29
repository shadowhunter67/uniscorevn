import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const cmcuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'cmcu-other-methods-not-modeled',
    label: 'CMCU còn phương thức xét học bạ THPT và kỳ thi Đánh giá năng lực CMC-TEST (bảng ngưỡng đầy đủ cả 3 cột đã đọc được) — chỉ phương thức xét điểm thi TN THPT được mô hình hoá trong batch này.',
    status: 'official-but-unparsed',
    sourceId: 'cmcu-threshold-2026',
    scoreAffecting: true,
    impact: 'UniscoreVN chỉ tính được phương thức xét kết quả thi TN THPT 2026.',
  },
  {
    id: 'cmcu-priority-silent',
    label:
      'Nguồn công bố ngưỡng điểm sàn theo từng ngành nhưng IM LẶNG hoàn toàn về điểm ưu tiên khu vực/đối tượng — dùng khung quốc gia hiện hành làm judgment call, quy đổi ×4/3 sang thang 40 (`priority.ts`), ngưỡng vẫn so với tổng thô.',
    status: 'incomplete',
    sourceId: 'cmcu-threshold-2026',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải số CMCU tự công bố.',
  },
  {
    id: 'cmcu-electronics-second-subject-not-validated',
    label:
      'Ngành Công nghệ Kỹ thuật Điện tử - Viễn thông yêu cầu môn thứ 2 phải là Vật lí hoặc Hóa học ("Toán x2 + Lý + môn bất kỳ hoặc Toán x2 + Hóa + môn bất kỳ") — UniscoreVN KHÔNG validate ràng buộc này, người dùng có thể chọn môn thứ 2 bất kỳ mà không bị cảnh báo.',
    status: 'official-but-unparsed',
    sourceId: 'cmcu-threshold-2026',
    scoreAffecting: false,
    impact: 'Người dùng có thể vô tình chọn tổ hợp không thực sự áp dụng cho ngành Điện tử-Viễn thông.',
  },
  {
    id: 'cmcu-threshold-not-final-cutoff',
    label:
      'Bảng công bố là ĐIỂM SÀN NHẬN HỒ SƠ (điều kiện đăng ký xét tuyển tối thiểu — nguồn tự phân biệt rõ với "điểm chuẩn trúng tuyển"), KHÔNG phải điểm chuẩn trúng tuyển cuối cùng — điểm chuẩn thực tế năm 2025 dao động 24-28,66/40, cao hơn nhiều so với điểm sàn.',
    status: 'official-but-unparsed',
    sourceId: 'cmcu-threshold-2026',
    scoreAffecting: false,
    impact: 'Thí sinh đạt sàn chỉ đủ điều kiện ĐĂNG KÝ, chưa chắc trúng tuyển.',
  },
];
