import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const qnuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'qnu-priority-value-silent',
    label:
      'Nguồn trích công thức ĐXT = Điểm môn 1 + Điểm môn 2 + Điểm môn 3 + Điểm ưu tiên (điểm chuẩn công bố là mức ĐXT tối thiểu), nhưng KHÔNG công bố mức điểm ưu tiên cụ thể theo từng khu vực/đối tượng — dùng khung điểm ưu tiên quốc gia hiện hành làm judgment call cho giá trị bảng (`priority.ts`).',
    status: 'incomplete',
    sourceId: 'qnu-threshold-2025',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải số QNU tự công bố.',
  },
  {
    id: 'qnu-weighted-majors-not-modeled',
    label:
      'Một số ngành QNU (khối Kinh tế/Kỹ thuật, vd Kinh tế, Công nghệ thông tin, Kiểm toán) dùng NHÂN HỆ SỐ môn chính rồi quy đổi về thang 30 — 2 nguồn cross-check LỆCH NHAU cho các ngành này (Kinh tế: 21,4 vs 22,15; CNTT: 21,5 vs 21,85), không đủ tin cậy để mô hình hoá. Batch này CHỈ mô hình hoá 10/52 ngành khối sư phạm/giáo dục KHÔNG có nhân hệ số, nơi 2 nguồn khớp số liệu tuyệt đối.',
    status: 'official-but-unparsed',
    sourceId: 'qnu-threshold-2025',
    scoreAffecting: true,
    impact: 'Thí sinh dự tuyển các ngành khối Kinh tế/Kỹ thuật của QNU chưa tra được điểm chuẩn qua UniscoreVN (số liệu 2 nguồn không khớp, không đủ tin cậy để công bố).',
  },
  {
    id: 'qnu-combination-subset-only',
    label:
      'Bảng điểm chuẩn gốc liệt kê nhiều tổ hợp riêng của trường (X01/X05/X17/X21/X25/X26/X70/X74...) chưa xác minh đủ tin cậy thành phần môn — chỉ mô hình hoá tổ hợp trùng với danh mục tổ hợp quốc gia chuẩn đã có trong `SubjectId`. Một số ngành có thể còn thêm lựa chọn tổ hợp khác ngoài danh sách đã mô hình hoá.',
    status: 'official-but-unparsed',
    sourceId: 'qnu-threshold-2025',
    scoreAffecting: false,
    impact: 'Thí sinh dùng tổ hợp riêng của trường (chưa xác minh) không tra được qua UniscoreVN, dù vẫn còn ít nhất 1 tổ hợp chuẩn hợp lệ cho mỗi ngành đã mô hình hoá.',
  },
  {
    id: 'qnu-primary-source-image-only',
    label:
      'Nguồn gốc chính thức (Cổng TTĐT Chính phủ) xác nhận có thông báo điểm chuẩn nhưng bảng số liệu chỉ hiển thị dạng ẢNH — không trích xuất được bằng text extraction thông thường. Số liệu dùng trong runtime lấy từ trangedu.com (đăng lại bảng dạng text), cross-check với Sforum/CellphoneS.',
    status: 'official-but-unparsed',
    sourceId: 'qnu-threshold-2025',
    scoreAffecting: false,
    impact: 'Độ tin cậy số liệu dựa trên báo đăng lại thay vì đọc trực tiếp văn bản/ảnh gốc của trường.',
  },
];
