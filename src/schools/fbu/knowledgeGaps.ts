import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const fbuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'fbu-law-economics-threshold-not-modeled',
    label:
      'Ngành Luật kinh tế (mã FB08) có ngưỡng riêng theo Quyết định 99/QĐ-ĐHTNH mục 6.1.1: điểm xét tuyển tối thiểu đạt 60% điểm đánh giá tối đa của thang điểm (tức 18,0/30), cộng điều kiện điểm môn Toán riêng (≥6,0 với tổ hợp A00/A01, hoặc Toán+Văn ≥12,0 với D01/C04/X01/X02) — KHÔNG áp dụng ngưỡng 17,0/30 chung, chưa được mô hình hoá trong nhánh exact.',
    status: 'official-but-unparsed',
    sourceId: 'fbu-qd99-2026',
    scoreAffecting: true,
    impact: 'Thí sinh chọn ngành Luật kinh tế sẽ nhận kết quả dựa trên ngưỡng 17,0/30 (sai) thay vì ngưỡng riêng 18,0/30 + điều kiện môn Toán — cần chọn thủ công, chưa có switch UI.',
  },
  {
    id: 'fbu-transcript-vact-methods-not-modeled',
    label:
      'Phương thức 2 (mã 200, xét học bạ 6 học kỳ, công thức tương tự nhưng dùng điểm trung bình quy đổi) và Phương thức 3 (mã 402, xét kết quả kỳ thi đánh giá năng lực ĐHQG Hà Nội) chưa được mô hình hoá; chỉ Phương thức 1 (thi TN THPT) được kiểm tra.',
    status: 'official-but-unparsed',
    sourceId: 'fbu-qd99-2026',
    scoreAffecting: false,
  },
  {
    id: 'fbu-bonus-toefl-toeic-hsk-hsg-not-modeled',
    label:
      'Bảng điểm cộng đầy đủ (mục 2.1.1, Bảng 2.1/2.2 của Quyết định 99/QĐ-ĐHTNH) có nhánh TOEFL iBT/TOEIC/HSK (ngoài IELTS đã model) và nhánh giải học sinh giỏi cấp tỉnh/thành — KHÔNG có input field tương ứng trong ApplicantProfile, mặc định tính là 0.',
    status: 'incomplete',
    sourceId: 'fbu-qd99-2026',
    scoreAffecting: true,
    impact: 'Thí sinh có chứng chỉ TOEFL iBT/TOEIC/HSK hoặc giải HSG cấp tỉnh/thành cần tự cộng thêm điểm cộng tương ứng (xem bảng gốc) — calculator hiện chỉ áp dụng nhánh IELTS.',
  },
];
