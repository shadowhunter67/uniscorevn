import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const tvuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'tvu-priority-value-silent',
    label:
      'Nguồn xác nhận trực tiếp điểm chuẩn = "tổng điểm các môn xét tuyển + điểm ưu tiên nếu có", nhưng KHÔNG công bố mức điểm ưu tiên cụ thể theo từng khu vực/đối tượng — dùng khung điểm ưu tiên quốc gia hiện hành làm judgment call cho giá trị bảng (`priority.ts`).',
    status: 'incomplete',
    sourceId: 'tvu-threshold-2025',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải số TVU tự công bố.',
  },
  {
    id: 'tvu-other-majors-not-modeled',
    label:
      'Trường công bố điểm chuẩn 47+ ngành đại học chính quy 2025 — batch này CHỈ mô hình hoá 5 ngành khối sức khỏe (Y khoa, Răng-Hàm-Mặt, Dược học, Điều dưỡng, Kỹ thuật xét nghiệm y học), dùng tổ hợp A00/B00/B08 (đã có sẵn). 42 ngành còn lại dùng nhiều tổ hợp riêng của trường (D04/D06/D14/D15/D84/X01/X03/X06/X23/X25/X26/X27/X58/X70/X78/X79/X91...) chưa xác minh đủ tin cậy để thêm vào `SubjectId` — CHƯA mô hình hoá.',
    status: 'official-but-unparsed',
    sourceId: 'tvu-threshold-2025',
    scoreAffecting: false,
    impact: 'Thí sinh dự tuyển 42 ngành ngoài khối sức khỏe của TVU chưa tra được điểm chuẩn qua UniscoreVN.',
  },
  {
    id: 'tvu-primary-source-image-only',
    label:
      'Nguồn gốc chính thức (tvu.edu.vn / cce.tvu.edu.vn) xác nhận có thông báo điểm chuẩn nhưng bảng số liệu chỉ đăng lại dạng ẢNH (từ VTC News) — không trích xuất được bằng text extraction thông thường. Số liệu dùng trong runtime lấy từ FPTShop (đăng lại bảng dạng text), cross-check khối Y Dược với Sforum/CellphoneS.',
    status: 'official-but-unparsed',
    sourceId: 'tvu-threshold-2025',
    scoreAffecting: false,
    impact: 'Độ tin cậy số liệu dựa trên báo đăng lại thay vì đọc trực tiếp văn bản/ảnh gốc của trường.',
  },
];
