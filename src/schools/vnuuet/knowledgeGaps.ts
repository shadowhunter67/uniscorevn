import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vnuuetKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vnuuet-priority-value-silent',
    label:
      'Nguồn xác nhận trực tiếp điểm chuẩn = "tổng điểm các môn xét tuyển + điểm ưu tiên nếu có", nhưng KHÔNG công bố mức điểm ưu tiên cụ thể theo từng khu vực/đối tượng — dùng khung điểm ưu tiên quốc gia hiện hành làm judgment call cho giá trị bảng (`priority.ts`).',
    status: 'incomplete',
    sourceId: 'vnuuet-threshold-2025',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải số VNU-UET tự công bố.',
  },
  {
    id: 'vnuuet-x-combos-not-modeled',
    label:
      'Trường công bố thêm tổ hợp X06 (Toán, Vật lý, Tin học) và X26 (Toán, Tiếng Anh, Tin học) cho MỌI ngành, nhưng taxonomy môn dùng chung của app hiện chưa cần thêm 2 tổ hợp này (chỉ modeled A00/A01/D01 + B00) — KHÔNG ảnh hưởng điểm chuẩn (giống nhau giữa mọi tổ hợp trong 1 ngành, xác nhận qua chinhphu.vn) nhưng thí sinh chỉ thi X06/X26 (không có tổ hợp nào khác) chưa tính được qua UniscoreVN.',
    status: 'official-but-unparsed',
    sourceId: 'vnuuet-threshold-2025',
    scoreAffecting: false,
    impact: 'Thí sinh chỉ thi tổ hợp X06/X26 chưa chọn được tổ hợp trong UniscoreVN cho VNU-UET.',
  },
  {
    id: 'vnuuet-internal-code',
    label:
      'Mã ngành dùng mã xét tuyển nội bộ trường (CN1-CN21, theo trangedu.com đăng lại đề án tuyển sinh) — KHÔNG phải mã ngành đào tạo chuẩn quốc gia (Bộ GD&ĐT) vì nhiều ngành công nghệ mới chưa có mã 7 số phổ biến/xác minh được.',
    status: 'official-but-unparsed',
    sourceId: 'vnuuet-code-mapping-2025',
    scoreAffecting: false,
    impact: 'Mã ngành hiển thị là mã nội bộ trường, không dùng để tra cứu chéo với mã ngành Bộ GD&ĐT.',
  },
  {
    id: 'vnuuet-primary-source-image-only',
    label:
      'Nguồn gốc chính thức (tuyensinh.uet.vnu.edu.vn, xaydungchinhsach.chinhphu.vn) xác nhận có thông báo điểm chuẩn nhưng bảng số liệu chỉ hiển thị dạng ẢNH, không trích xuất được bằng text extraction thông thường — số liệu dùng trong runtime lấy từ tuyensinh247 (đăng lại bảng dạng text), cross-check dải điểm với VnExpress.',
    status: 'official-but-unparsed',
    sourceId: 'vnuuet-threshold-2025',
    scoreAffecting: false,
    impact: 'Độ tin cậy số liệu dựa trên báo đăng lại thay vì đọc trực tiếp văn bản/ảnh gốc của trường.',
  },
];
