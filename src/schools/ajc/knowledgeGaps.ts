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
    id: 'ajc-bonus-not-modeled',
    label:
      'Điểm cộng (giải HSG quốc gia/cấp tỉnh, chứng chỉ SAT, tối đa 10% thang điểm — 3,0/30 hoặc 4,0/40) đã xác nhận qua đối chiếu chéo là 1 thành phần của công thức điểm xét tuyển nhưng KHÔNG có input field tương ứng trong ApplicantProfile cho các loại thành tích này, mặc định = 0.',
    status: 'incomplete',
    sourceId: 'ajc-admission-2026',
    scoreAffecting: true,
    impact: 'Thí sinh có giải HSG quốc gia/cấp tỉnh hoặc chứng chỉ SAT cần tự cộng thêm điểm cộng tương ứng — calculator hiện chỉ tính điểm ưu tiên khu vực/đối tượng.',
  },
  {
    id: 'ajc-priority-and-formula-source-quality',
    label:
      'File PDF gốc Thông báo 293/TB-HVBCTT-ĐT (đính kèm trên ajc.hcma.vn) trỏ tới host nội bộ (ajc-app:1002), không truy cập công khai được — công thức điểm xét tuyển và mức điểm ưu tiên KV/ĐT dùng trong nhánh exact dựa trên đối chiếu chéo báo chí (tuyensinh247) + khung điểm ưu tiên chuẩn toàn quốc (judgment call, không phải số AJC tự công bố riêng).',
    status: 'official-but-unparsed',
    sourceId: 'ajc-admission-2026',
    scoreAffecting: true,
  },
];
