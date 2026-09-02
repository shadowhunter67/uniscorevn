import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const qbuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'qbu-priority-value-silent',
    label:
      'Nguồn xác nhận điểm chuẩn công bố ứng với thí sinh khu vực 3 (điểm ưu tiên = 0, "Điểm này không tính điểm cộng ưu tiên") — tương đương mức ĐXT tối thiểu, nhưng KHÔNG công bố mức điểm ưu tiên cụ thể theo từng khu vực/đối tượng — dùng khung điểm ưu tiên quốc gia hiện hành làm judgment call cho giá trị bảng (`priority.ts`).',
    status: 'incomplete',
    sourceId: 'qbu-threshold-2025',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải số QBU tự công bố.',
  },
  {
    id: 'qbu-nangkhieu-major-not-modeled',
    label:
      'Ngành Giáo dục Mầm non dùng các mã tổ hợp năng khiếu riêng của trường (M05/M06/M07/M10/M11/M13/M14) — thành phần môn (bài thi năng khiếu) không xác minh được đủ tin cậy trong lần research này, CHƯA mô hình hoá.',
    status: 'official-but-unparsed',
    sourceId: 'qbu-threshold-2025',
    scoreAffecting: true,
    impact: 'Thí sinh dự tuyển Giáo dục Mầm non chưa tra được điểm chuẩn qua UniscoreVN.',
  },
  {
    id: 'qbu-combination-subset-only',
    label:
      'Bảng điểm chuẩn gốc liệt kê nhiều tổ hợp riêng của trường (X02/X04/X05/X06/X08-X12/X15/X17/X21/X22/X25-X27/X70/X71/X74/X75/X78/X79, C12/C13/C20, D04/D45/D65/D66, A03) chưa xác minh đủ tin cậy thành phần môn — chỉ mô hình hoá tổ hợp trùng với danh mục tổ hợp quốc gia chuẩn đã có trong `SubjectId`. Mỗi ngành đã mô hình hoá vẫn còn ít nhất 3 tổ hợp chuẩn quốc gia hợp lệ.',
    status: 'official-but-unparsed',
    sourceId: 'qbu-threshold-2025',
    scoreAffecting: false,
    impact: 'Thí sinh dùng tổ hợp riêng của trường (chưa xác minh) không tra được qua UniscoreVN, dù vẫn còn nhiều tổ hợp chuẩn hợp lệ cho mỗi ngành đã mô hình hoá.',
  },
  {
    id: 'qbu-primary-source-secondary-only',
    label:
      'Không tìm được cổng thông tin chính thức (dqb.edu.vn/Cổng TTĐT Chính phủ) đăng bảng số liệu dạng text đọc được trong lần research này — số liệu dùng trong runtime lấy từ 5 báo/trang tổng hợp tuyển sinh độc lập (Tuyensinh247, Taro.edu.vn, FPTShop, Sforum, Navigates) đều khớp tuyệt đối với nhau.',
    status: 'official-but-unparsed',
    sourceId: 'qbu-threshold-2025',
    scoreAffecting: false,
    impact: 'Độ tin cậy số liệu dựa trên 5 nguồn thứ cấp khớp tuyệt đối thay vì đọc trực tiếp văn bản gốc của trường.',
  },
];
