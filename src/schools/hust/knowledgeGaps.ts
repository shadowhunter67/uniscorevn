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
  {
    id: 'hust-2025-foreign-language-combos-not-modeled',
    label:
      'Bảng điểm chuẩn 2025 (`thresholds2025.ts`) còn dùng D04 (Toán/Văn/Trung), D26 (Toán/Lý/Đức), D28 (Toán/Lý/Nhật), D29 (Toán/Lý/Pháp) và K01 (tổ hợp trọng số 4 môn riêng: Toán x3 + Văn x1 + Lý/Hóa/Sinh/Tin x2, thang 1/2) cho một số chương trình liên kết quốc tế — CHƯA mô hình hoá vì `SubjectId` dùng chung của app chỉ có "english" cho môn ngoại ngữ (không có Trung/Đức/Nhật/Pháp) và K01 có cấu trúc trọng số 4-môn không khớp mô hình combinationId cố định 3-môn hiện tại.',
    status: 'official-but-unparsed',
    sourceId: 'hust-threshold-2025',
    scoreAffecting: false,
    impact:
      'Thí sinh CHỈ thi các tổ hợp D04/D26/D28/D29/K01 (không có tổ hợp nào khác trong danh sách công bố cho chương trình đó) chưa tính được qua UniscoreVN — nhưng MỌI chương trình bị ảnh hưởng vẫn còn ít nhất 1 nhóm tổ hợp khác (A00/A01/B00/D01/D07 hoặc B03/C01/C02/X02) đã mô hình hoá đầy đủ.',
  },
  {
    id: 'hust-2025-priority-value-silent',
    label:
      'Công thức chính thức 2025 (`hust-formula-official-2025`) chỉ ghi "+ Điểm ưu tiên" và dẫn Thông tư 08/2022 + 06/2025/TT-BGDĐT — KHÔNG tự công bố mức điểm ưu tiên KV/ĐT cụ thể dùng cho HUST. Dùng khung điểm ưu tiên quốc gia hiện hành làm judgment call cho GIÁ TRỊ bảng (`priority2025.ts`), áp dụng quy tắc giảm dần trên TỔNG THÔ 3 môn (chưa nhân hệ số môn chính), đúng theo cách Thông tư 08 định nghĩa.',
    status: 'incomplete',
    sourceId: 'hust-formula-official-2025',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải số HUST tự công bố riêng.',
  },
];
