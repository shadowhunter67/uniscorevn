import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const humpKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hump-priority-value-silent',
    label:
      'Nguồn xác nhận trực tiếp điểm chuẩn = "tổng điểm các môn xét tuyển + điểm ưu tiên nếu có", nhưng KHÔNG công bố mức điểm ưu tiên cụ thể theo từng khu vực/đối tượng — dùng khung điểm ưu tiên quốc gia hiện hành làm judgment call cho giá trị bảng (`priority.ts`).',
    status: 'incomplete',
    sourceId: 'hump-threshold-2025',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải số HUMP tự công bố.',
  },
  {
    id: 'hump-official-source-not-fetched',
    label:
      'Nguồn gốc chính thức của trường (huemed-univ.edu.vn) chưa fetch trực tiếp được trong batch này — số liệu dùng trong runtime lấy từ 2 nguồn báo đăng lại dạng text (tuyensinh247 + Báo Hà Tĩnh), khớp nhau cho 10/11 ngành (thiếu riêng Y khoa trong bảng cross-check).',
    status: 'official-but-unparsed',
    sourceId: 'hump-threshold-2025',
    scoreAffecting: false,
    impact: 'Độ tin cậy số liệu dựa trên 2 báo đăng lại khớp nhau thay vì đọc trực tiếp thông báo gốc của trường.',
  },
];
