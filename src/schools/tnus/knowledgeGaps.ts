import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const tnusKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'tnus-other-methods-not-modeled',
    label: 'TNUS 2026 còn phương thức xét học bạ, xét tuyển thẳng, đánh giá đầu vào V-SAT/DGNL ĐHQG Hà Nội/DGTD ĐHBK Hà Nội; chỉ phương thức thi TN THPT (mã 100) được mô hình hoá.',
    status: 'official-but-unparsed',
    sourceId: 'tnus-methods-2026',
  },
  {
    id: 'tnus-english-teacher-track-not-modeled',
    label: 'Ngành Ngôn ngữ Anh định hướng giảng dạy (mã 7220201GV) có điều kiện thay thế riêng (điểm môn Tiếng Anh ≥ 6,5 theo THPT hoặc quy đổi IELTS ≥ 5,5) khác cấu trúc "tổng 3 môn" chung — không đưa vào bảng điểm chuẩn exact.',
    status: 'official-but-unparsed',
    sourceId: 'tnus-threshold-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
  {
    id: 'tnus-combination-scope-not-full',
    label: 'Không ràng buộc tổ hợp môn theo từng mã xét tuyển cụ thể trong nhánh exact — model theo tập tổ hợp CHUNG nằm trong taxonomy hiện có (dữ liệu tổ hợp gốc theo từng mã đã có ở trang thông tin tuyển sinh nhưng chưa wire vào UI).',
    status: 'official-but-unparsed',
    sourceId: 'tnus-nganh-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
];
