import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vnulawKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vnulaw-priority-table-national-standard',
    label:
      'VNU-Luật tự công bố CÔNG THỨC giảm điểm ưu tiên (dẫn chiếu quy chế chung Bộ GDĐT) nhưng không tự liệt kê lại bảng MỨC điểm theo khu vực/đối tượng — dùng khung điểm ưu tiên quốc gia hiện hành cho bảng mức, cùng tiền lệ MKU/HBU/DHV/HPU2/PYU/TNUE/TNUFL/DUT/DUE.',
    status: 'incomplete',
    sourceId: 'vnulaw-admission-notice-2026',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng khung quốc gia hiện hành cho bảng mức; công thức giảm dần đã được chính trường xác nhận.',
  },
  {
    id: 'vnulaw-other-methods-not-modeled',
    label:
      'VNU-Luật còn 3 phương thức khác: xét tuyển thẳng/ưu tiên theo quy chế Bộ GDĐT (mã 301), xét kết quả thi Đánh giá năng lực HSA của ĐHQGHN (mã 401), và xét tuyển dự bị đại học (mã 500); chỉ phương thức thi TN THPT (mã 100) được mô hình hoá.',
    status: 'official-but-unparsed',
    sourceId: 'vnulaw-admission-notice-2026',
  },
  {
    id: 'vnulaw-certificate-combined-not-modeled',
    label:
      'Phương thức 100 cho phép quy đổi chứng chỉ tiếng Anh quốc tế (IELTS >=5.5, TOEFL iBT >=72) thay điểm thi TN THPT môn Tiếng Anh; runtime chỉ tính trên điểm thi THPT thô, chưa hỗ trợ quy đổi chứng chỉ.',
    status: 'official-but-unparsed',
    sourceId: 'vnulaw-admission-notice-2026',
  },
  {
    id: 'vnulaw-clc-selection-not-modeled',
    label:
      'Chương trình chất lượng cao ngành Luật được chọn SAU nhập học từ chính thí sinh trúng tuyển ngành Luật chuẩn (không phải 1 ngành xét tuyển độc lập); runtime hiện chỉ coi 3 ngành (Luật, Luật Kinh tế, Luật Thương mại quốc tế) là độc lập, chưa mô hình hoá bước chọn CLC.',
    status: 'incomplete',
    sourceId: 'vnulaw-admission-notice-2026',
  },
];
