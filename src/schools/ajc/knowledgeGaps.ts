import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const ajcKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'ajc-program-mapping-not-imported',
    label:
      'Thông báo 293/TB-HVBCTT-ĐT chỉ công bố ngưỡng theo 2 nhóm ngành lớn (Báo chí-Xuất bản; Lý luận-Lịch sử-Truyền thông-Quảng cáo-Quan hệ quốc tế); bảng phân bổ chi tiết ~30 chuyên ngành cụ thể vào từng nhóm chưa được nhập vào runtime.',
    status: 'incomplete',
    sourceId: 'ajc-threshold-notice-2026',
    impact: 'Người dùng phải tự xác định ngành mình đăng ký thuộc nhóm nào; runtime không tra cứu ngành → nhóm.',
  },
  {
    id: 'ajc-prerequisite-conditions-not-modeled',
    label:
      'Điều kiện tiên quyết (điểm trung bình học bạ Toán và Văn mỗi năm THPT >= 6,5; hạnh kiểm/đánh giá rèn luyện lớp 10-12 xếp loại Khá trở lên) chưa được kiểm tra trong runtime.',
    status: 'incomplete',
    sourceId: 'ajc-admission-2026',
    impact: 'Runtime chỉ kiểm tra ngưỡng điểm thi, không xác minh điều kiện học bạ/hạnh kiểm.',
  },
  {
    id: 'ajc-bonus-formula-not-modeled',
    label:
      'Công thức điểm xét tuyển đầy đủ (Tổng điểm 3 môn nhân hệ số theo tổ hợp + {[Điểm cộng + Điểm ưu tiên]*4/3}) đã xác minh nhưng điểm cộng/ưu tiên chưa được nhập vào runtime.',
    status: 'incomplete',
    sourceId: 'ajc-admission-2026',
    impact: 'Runtime chỉ so ngưỡng thô, chưa cộng điểm khuyến khích/ưu tiên vào kết quả.',
  },
];
