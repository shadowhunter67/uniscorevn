import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vnuedKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vnued-priority-value-silent',
    label:
      'Nguồn xác nhận trực tiếp điểm chuẩn = "tổng điểm các môn xét tuyển + điểm ưu tiên nếu có", nhưng KHÔNG công bố mức điểm ưu tiên cụ thể theo từng khu vực/đối tượng — dùng khung điểm ưu tiên quốc gia hiện hành làm judgment call cho giá trị bảng (`priority.ts`).',
    status: 'incomplete',
    sourceId: 'vnued-threshold-2025',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải số VNU-UED tự công bố.',
  },
  {
    id: 'vnued-group-not-modeled',
    label:
      'Nhóm ngành "Khoa học giáo dục và khác" (điểm chuẩn 25,57) gộp nhiều chuyên ngành nhỏ (quản lý giáo dục, công nghệ giáo dục...) — KHÔNG xác định được MỘT mã ngành đào tạo chuẩn quốc gia cụ thể tương ứng nên CHƯA mô hình hoá (10/11 ngành còn lại đã mô hình hoá).',
    status: 'official-but-unparsed',
    sourceId: 'vnued-threshold-2025',
    scoreAffecting: false,
    impact: 'Thí sinh dự tuyển nhóm ngành "Khoa học giáo dục và khác" chưa tra được điểm chuẩn qua UniscoreVN.',
  },
  {
    id: 'vnued-primary-source-image-only',
    label:
      'Nguồn gốc chính thức (education.vnu.edu.vn) xác nhận có thông báo điểm chuẩn nhưng bảng số liệu chỉ hiển thị dạng ẢNH, không trích xuất được bằng text extraction thông thường — số liệu dùng trong runtime lấy từ tuyensinh247 (đăng lại bảng dạng text), cross-check dải điểm với VnExpress.',
    status: 'official-but-unparsed',
    sourceId: 'vnued-threshold-2025',
    scoreAffecting: false,
    impact: 'Độ tin cậy số liệu dựa trên báo đăng lại thay vì đọc trực tiếp văn bản/ảnh gốc của trường.',
  },
];
