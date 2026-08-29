import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const hustKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hust-program-to-nganh-group-mapping-not-imported',
    label:
      'Ngưỡng đảm bảo chất lượng đầu vào HUST 2026 công bố theo 2 "khối nhóm ngành" (Kỹ thuật >= 20,0/30; Kinh tế, Giáo dục, Ngoại ngữ >= 19,5/30), không theo từng chương trình đào tạo. Bảng ánh xạ 68 chương trình đào tạo -> khối nhóm ngành cụ thể chưa tìm được nguồn HUST tự công bố dạng bảng (chỉ có phân loại theo trường/khoa quản lý, không phải phân loại "khối nhóm ngành" chính thức dùng cho ngưỡng).',
    status: 'official-but-unparsed',
    sourceId: 'hust-threshold-2026',
    scoreAffecting: true,
    impact:
      'Runtime chỉ loại được hồ sơ dưới 19,5/30 (chắc chắn không đạt ngưỡng nào) và xác nhận đạt trên 20,0/30 (đạt cả hai nhóm); giữa 19,5/30 và 20,0/30 cần biết ngành/chương trình cụ thể thuộc khối nào để kết luận chính xác.',
  },
  {
    id: 'hust-other-methods-not-modeled',
    label:
      'HUST còn xét tuyển tài năng (XTTN, thang 100) và điểm kỳ thi Đánh giá tư duy (TSA, thang 100) với ngưỡng riêng (XTTN >= 55; TSA >= 44,93 khối Kỹ thuật, >= 43,88 khối Kinh tế/Giáo dục/Ngoại ngữ) — chỉ phương thức thi TN THPT được mô hình hoá trong batch này.',
    status: 'official-but-unparsed',
    sourceId: 'hust-threshold-2026',
  },
  {
    id: 'hust-priority-bonus-not-modeled',
    label:
      'Trang ngưỡng đảm bảo chất lượng không đề cập điểm ưu tiên khu vực/đối tượng hay điểm cộng thành tích cho phương thức thi TN THPT; điều kiện Toán >= 7,5 riêng cho nhóm ngành công nghệ bán dẫn (theo báo chí thứ cấp, chưa xác nhận trực tiếp trên trang HUST) cũng chưa mô hình hoá.',
    status: 'incomplete',
    sourceId: 'hust-threshold-2026',
    scoreAffecting: true,
  },
];
