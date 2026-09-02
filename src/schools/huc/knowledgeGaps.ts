import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const hucKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'huc-priority-value-silent',
    label:
      'Nguồn xác nhận trực tiếp điểm chuẩn = "tổng điểm các môn xét tuyển + điểm ưu tiên nếu có", nhưng KHÔNG công bố mức điểm ưu tiên cụ thể theo từng khu vực/đối tượng — dùng khung điểm ưu tiên quốc gia hiện hành làm judgment call cho giá trị bảng (`priority.ts`).',
    status: 'incomplete',
    sourceId: 'huc-threshold-2025',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải số HUC tự công bố.',
  },
  {
    id: 'huc-x-combos-not-modeled',
    label:
      'Trường công bố thêm 2 mã tổ hợp riêng X70 (thuộc nhóm mức cao nhất cùng C00) và X78 (thuộc nhóm mức trung bình cùng C03/C04/D14/D15/X01) cho hầu hết ngành — thành phần môn chưa xác minh đủ tin cậy nên chưa mô hình hoá. KHÔNG ảnh hưởng điểm chuẩn (mỗi nhóm đã có ít nhất 1 mã khác cùng mức thay thế: C00 thay X70, C03/C04/D14/D15/X01 thay X78) nhưng thí sinh CHỈ thi X70/X78 (không có tổ hợp nào khác) chưa tính được qua UniscoreVN.',
    status: 'official-but-unparsed',
    sourceId: 'huc-threshold-2025',
    scoreAffecting: false,
    impact: 'Thí sinh chỉ thi tổ hợp X70/X78 chưa chọn được tổ hợp trong UniscoreVN cho HUC.',
  },
  {
    id: 'huc-creative-writing-not-modeled',
    label:
      'Ngành Sáng tác văn học (mã 7220110) KHÔNG có trong bảng điểm chuẩn nhánh xét kết quả thi TN THPT thu thập được — có thể trường chỉ tuyển ngành này bằng phương thức năng khiếu/xét hồ sơ riêng, chưa xác minh được.',
    status: 'incomplete',
    sourceId: 'huc-threshold-2025',
    scoreAffecting: false,
    impact: 'Thí sinh dự tuyển Sáng tác văn học chưa tra được điểm chuẩn qua UniscoreVN.',
  },
  {
    id: 'huc-spa-official-source',
    label:
      'Trang tuyển sinh chính thức (tuyensinh.huc.edu.vn) render bằng JS (SPA) — không đọc được text trực tiếp qua công cụ fetch/curl thông thường. Cổng Chính phủ (chinhphu.vn) xác nhận có thông báo nhưng bảng chi tiết vẫn ở dạng ẢNH. Số liệu dùng trong runtime lấy từ 2 nguồn báo đăng lại dạng text (tuyensinh247 + Báo Hà Tĩnh), khớp TUYỆT ĐỐI với nhau.',
    status: 'official-but-unparsed',
    sourceId: 'huc-threshold-2025',
    scoreAffecting: false,
    impact: 'Độ tin cậy số liệu dựa trên 2 báo đăng lại độc lập khớp tuyệt đối, thay vì đọc trực tiếp trang gốc của trường.',
  },
];
