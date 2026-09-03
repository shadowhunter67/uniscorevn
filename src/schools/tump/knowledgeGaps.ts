import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const tumpKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'tump-priority-value-silent',
    label:
      'Mục 4.3 "Điểm ưu tiên" của Thông tin tuyển sinh 2025 chỉ dẫn chiếu quy chế tuyển sinh hiện hành của Bộ GD&ĐT (Văn bản hợp nhất 02/VBHN-BGDĐT ngày 02/4/2025), KHÔNG tự công bố mức điểm ưu tiên cụ thể theo khu vực/đối tượng — dùng khung điểm ưu tiên quốc gia hiện hành làm judgment call cho giá trị bảng (`priority.ts`), cùng tiền lệ TUEBA/PVU/HUST/DNU.',
    status: 'incomplete',
    sourceId: 'tump-thongtin-2025',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải số TUMP tự công bố riêng (trường không công bố số riêng).',
  },
  {
    id: 'tump-bonus-hsg-not-modeled',
    label:
      'Bảng điểm cộng mục 4.2 còn giải HSG cấp Quốc gia (Nhất/Nhì/Ba/Khuyến khích: 3,00/2,75/2,50/2,25), giải HSG cấp tỉnh/thành phố (Nhất/Nhì/Ba: 1,50/1,25/1,00), và "học lực giỏi cả 3 năm THPT" (1,00) — `ApplicantProfile` không có field tương ứng cho các thành tích này, module CHỈ mô hình hoá bậc IELTS (`bonus.ts`).',
    status: 'incomplete',
    sourceId: 'tump-thongtin-2025',
    scoreAffecting: true,
    impact: 'Thí sinh có giải HSG hoặc học lực giỏi 3 năm nhưng không có IELTS sẽ không được cộng điểm cộng khi tính qua UniscoreVN (Điểm xét tuyển sẽ thấp hơn thực tế).',
  },
  {
    id: 'tump-bonus-numbering-gap',
    label: 'Bảng điểm cộng gốc (mục 4.2) đánh số TT 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12 — thiếu dòng số 4 (không xuất hiện trên trang tài liệu gốc, có thể do lỗi đánh số của trường khi chỉnh sửa văn bản) — module chỉ dùng đúng các dòng đã thấy, không suy đoán nội dung dòng bị thiếu.',
    status: 'incomplete',
    sourceId: 'tump-thongtin-2025',
    scoreAffecting: false,
    impact: 'Nếu dòng số 4 bị thiếu tương ứng một bậc điểm cộng khác (vd. IELTS 6.0-6.5), thí sinh liên quan có thể không được cộng đúng mức — chưa xác minh được nội dung dòng này.',
  },
  {
    id: 'tump-english-ielts-substitution-not-modeled',
    label:
      'Mục II.1.1.5 quy định: đối với môn Tiếng Anh trong tổ hợp, thí sinh được lấy điểm cao nhất giữa điểm thi TN THPT môn Tiếng Anh và điểm quy đổi chứng chỉ IELTS (bảng quy đổi mục 2.2, thang 10) TRƯỚC KHI cộng tổng 3 môn — đây là cơ chế THAY THẾ điểm môn, khác với điểm cộng (mục 4.2). Module này KHÔNG áp dụng phần thay thế điểm môn Tiếng Anh này (chỉ dùng điểm thi TN THPT thực tế).',
    status: 'incomplete',
    sourceId: 'tump-thongtin-2025',
    scoreAffecting: true,
    impact: 'Thí sinh có IELTS cao hơn điểm thi TN THPT môn Tiếng Anh (quy đổi ra thang 10) trong tổ hợp có Tiếng Anh (A01/D00/D07/D08) sẽ bị tính Điểm xét tuyển thấp hơn điểm thực tế được trường công nhận.',
  },
  {
    id: 'tump-other-methods-not-modeled',
    label: 'TUMP 2025 còn phương thức xét học bạ (mã 200), xét tuyển bằng kết quả HSA của ĐHQG Hà Nội (mã 402), xét tuyển bằng kết quả V-SAT (mã 417), xét tuyển thẳng (mã 301), và xét tuyển học sinh dự bị đại học (mã 500) — module này CHỈ mô hình hoá phương thức xét kết quả thi TN THPT (mã 100).',
    status: 'incomplete',
    sourceId: 'tump-thongtin-2025',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển bằng các phương thức khác chưa tính được qua UniscoreVN cho TUMP.',
  },
];
