import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vnkguKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vnkgu-achievement-bonus-not-modeled',
    label:
      'VNKGU 2026 có "Điểm cộng" (điểm thưởng/điểm xét thưởng/điểm khuyến khích) tối đa 3,00 điểm (10% thang 30) cộng vào tổng điểm 3 môn cho thí sinh có thành tích phù hợp (giải học sinh giỏi quốc gia/quốc tế, chứng chỉ ngoại ngữ...) — KHÔNG mô hình hoá. Kết quả tính hiện tại (tổng thô + ưu tiên) là CẬN DƯỚI cho thí sinh có thành tích.',
    status: 'official-but-unparsed',
    sourceId: 'vnkgu-priority-2026',
    scoreAffecting: true,
    impact: 'Thí sinh có thành tích/chứng chỉ ngoại ngữ đủ điều kiện cộng điểm có thể bị đánh giá "chưa đạt" sai (điểm thật cao hơn điểm hệ thống tính).',
  },
  {
    id: 'vnkgu-combination-source-date-mismatch',
    label:
      'Trang "Chỉ tiêu tuyển sinh theo từng phương thức và tổ hợp môn xét tuyển" hiển thị ngày đăng 19/07/2022, nhưng nội dung bảng tổ hợp môn đã đối chiếu KHỚP với Đề án tuyển sinh 2026 chính thức (PDF, đọc bằng vision) — trường không cập nhật ngày đăng khi giữ nguyên nội dung cho các năm sau.',
    status: 'verified',
    sourceId: 'vnkgu-combination-2026',
    scoreAffecting: false,
  },
  {
    id: 'vnkgu-other-methods-not-modeled',
    label:
      'VNKGU 2026 còn Phương thức 1 (xét tuyển thẳng), Phương thức 3 (học bạ), Phương thức 4 (ĐGNL ĐHQG-HCM), Phương thức 5 (V-SAT) — module này CHỈ mô hình hoá Phương thức 2 (thi TN THPT).',
    status: 'official-but-unparsed',
    sourceId: 'vnkgu-scheme-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển bằng học bạ, ĐGNL, V-SAT, hoặc diện tuyển thẳng chưa tính được qua UniscoreVN cho VNKGU.',
  },
];
