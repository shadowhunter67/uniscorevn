import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const qnamuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'qnamu-priority-value-silent',
    label:
      'Nguồn xác nhận trực tiếp công thức giảm dần điểm ưu tiên (ngưỡng 22,5, số chia 7,5 — khớp khung quốc gia), nhưng KHÔNG công bố mức điểm ưu tiên CƠ BẢN cụ thể theo từng khu vực/đối tượng — dùng khung điểm ưu tiên quốc gia hiện hành làm judgment call cho giá trị bảng (`priority.ts`).',
    status: 'incomplete',
    sourceId: 'qnamu-formula-2025',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải số QNamU tự công bố.',
  },
  {
    id: 'qnamu-floor-only-majors-not-modeled',
    label:
      'Ngôn ngữ Anh, Việt Nam học, Quản trị kinh doanh, Công nghệ thông tin, Bảo vệ thực vật hiển thị điểm chuẩn "14" giống nhau ở cả 2 nguồn cross-check hoặc để trống — xác nhận qua Vietjack.com đây là MỨC NHẬN HỒ SƠ (điểm sàn 14-19 tùy ngành), KHÔNG PHẢI điểm trúng tuyển chính thức — CHƯA mô hình hoá do không đủ tin cậy.',
    status: 'official-but-unparsed',
    sourceId: 'qnamu-threshold-2025',
    scoreAffecting: true,
    impact: 'Thí sinh dự tuyển 5 ngành này chưa tra được điểm chuẩn qua UniscoreVN.',
  },
  {
    id: 'qnamu-nangkhieu-major-not-modeled',
    label:
      'Ngành Giáo dục Mầm non dùng các mã tổ hợp năng khiếu riêng của trường (M00/M01/M02/M03) — thành phần môn (bài thi năng khiếu) không xác minh được đủ tin cậy trong lần research này, CHƯA mô hình hoá.',
    status: 'official-but-unparsed',
    sourceId: 'qnamu-threshold-2025',
    scoreAffecting: true,
    impact: 'Thí sinh dự tuyển Giáo dục Mầm non chưa tra được điểm chuẩn qua UniscoreVN.',
  },
  {
    id: 'qnamu-combination-subset-only',
    label:
      'Bảng điểm chuẩn gốc liệt kê thêm các tổ hợp riêng của trường (D11/D13/X02/X17/X21/X25/X70/X74) chưa xác minh đủ tin cậy thành phần môn — chỉ mô hình hoá tổ hợp trùng với danh mục tổ hợp quốc gia chuẩn đã có trong `SubjectId`. Mỗi ngành đã mô hình hoá vẫn còn ít nhất 2 tổ hợp chuẩn quốc gia hợp lệ.',
    status: 'official-but-unparsed',
    sourceId: 'qnamu-threshold-2025',
    scoreAffecting: false,
    impact: 'Thí sinh dùng tổ hợp riêng của trường (chưa xác minh) không tra được qua UniscoreVN, dù vẫn còn nhiều tổ hợp chuẩn hợp lệ cho mỗi ngành đã mô hình hoá.',
  },
  {
    id: 'qnamu-primary-source-secondary-only',
    label:
      'Không tìm được cổng thông tin chính thức (qnamuni.edu.vn/Cổng TTĐT Chính phủ) đăng bảng số liệu dạng text đọc được trong lần research này — số liệu dùng trong runtime lấy từ 3 báo/trang tổng hợp tuyển sinh độc lập (Trangedu.com, Sforum/CellphoneS, Vietjack.com) đều khớp tuyệt đối với nhau.',
    status: 'official-but-unparsed',
    sourceId: 'qnamu-threshold-2025',
    scoreAffecting: false,
    impact: 'Độ tin cậy số liệu dựa trên 3 nguồn thứ cấp khớp tuyệt đối thay vì đọc trực tiếp văn bản gốc của trường.',
  },
];
