import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const dlaKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'dla-priority-table-national-judgment-call',
    label:
      'DLA KHÔNG tự công bố bảng mức điểm ưu tiên khu vực/đối tượng riêng — bài "Điểm cộng chi tiết cho thí sinh đạt 22,5 điểm trở lên" chỉ diễn giải lại công thức GIẢM DẦN của Bộ GD&ĐT (áp dụng chung toàn quốc từ 2023). Dùng khung điểm ưu tiên quốc gia hiện hành làm judgment call cho GIÁ TRỊ bảng (`priority.ts`), cùng tiền lệ DNU/TUEBA/PVU/HTU/TUMP/NAEM.',
    status: 'incomplete',
    sourceId: 'dla-priority-note-2026',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng khung quốc gia hiện hành thay vì bảng riêng của trường (trường không công bố bảng riêng).',
  },
  {
    id: 'dla-formula-secondary-crosscheck',
    label:
      'Công thức "Điểm xét tuyển = tổng 3 môn + điểm ưu tiên" không tìm thấy dưới dạng text/PDF chính chủ đọc trực tiếp được (trang tổng quan/đề án của trường không có đoạn text nêu công thức) — xác nhận qua trang chuyên đề riêng cho DLA của tuyensinh247.com (thứ cấp), khớp với cách trình bày cột điểm chuẩn thang 30 không hệ số trong ảnh chính chủ.',
    status: 'incomplete',
    sourceId: 'dla-formula-crosscheck-2026',
    scoreAffecting: false,
    impact: 'Công thức tính điểm dựa một phần vào cross-check thứ cấp thay vì trích dẫn văn bản chính chủ trực tiếp.',
  },
  {
    id: 'dla-hocba-dgnl-branch-not-modeled',
    label:
      'DLA 2026 còn 2 nhánh khác đã công bố điểm chuẩn đầy đủ theo ngành trong cùng ảnh: xét kết quả học tập THPT (học bạ, cột "Điểm Học bạ", thang 30, flat 18,0 cho 8/9 ngành) và xét kết quả thi Đánh giá năng lực ĐHQG TP.HCM (cột "Điểm ĐGNL", thang 1200, flat 510 cho 8/9 ngành, riêng Luật Kinh tế 720) — module này CHỈ mô hình hoá nhánh xét kết quả thi TN THPT.',
    status: 'incomplete',
    sourceId: 'dla-cutoff-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển bằng học bạ THPT hoặc kết quả thi ĐGNL ĐHQG-HCM chưa tính được qua UniscoreVN cho DLA (dù điểm chuẩn đã công bố).',
  },
  {
    id: 'dla-luatkt-hocba-condition-not-modeled',
    label:
      'Ngành Luật Kinh tế có điều kiện phụ riêng CHỈ áp dụng nhánh học bạ/ĐGNL ("KQHT lớp 12 đạt loại Tốt trở lên và điểm thi THPT (3 môn) tối thiểu 18 điểm HOẶC điểm xét tốt nghiệp tối thiểu 8,5, áp dụng thí sinh tốt nghiệp từ 2026") — không ảnh hưởng nhánh thi TN THPT mà module này mô hình hoá, nhưng chưa mô hình hoá điều kiện phụ này cho nhánh học bạ/ĐGNL (hiện chưa mô hình hoá 2 nhánh đó).',
    status: 'incomplete',
    sourceId: 'dla-cutoff-2026',
    scoreAffecting: false,
    impact: 'Không ảnh hưởng nhánh thi TN THPT hiện có; chỉ liên quan tới 2 nhánh chưa mô hình hoá.',
  },
  {
    id: 'dla-other-methods-not-modeled',
    label: 'DLA 2026 còn phương thức xét tuyển thẳng theo quy định hiện hành — module này CHỈ mô hình hoá nhánh xét kết quả thi TN THPT.',
    status: 'incomplete',
    sourceId: 'dla-combination-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển thẳng chưa tính được qua UniscoreVN cho DLA.',
  },
];
