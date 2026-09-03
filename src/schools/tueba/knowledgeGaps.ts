import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const tuebaKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'tueba-priority-value-silent',
    label:
      'Nguồn xác nhận ngưỡng "đã bao gồm điểm ưu tiên khu vực và đối tượng" nhưng KHÔNG công bố mức điểm ưu tiên cụ thể theo từng khu vực/đối tượng — dùng khung điểm ưu tiên quốc gia hiện hành (Điều 7 Thông tư 06/2026/TT-BGDĐT) làm judgment call cho giá trị bảng (`priority.ts`).',
    status: 'incomplete',
    sourceId: 'tueba-threshold-2026',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải số TUEBA tự công bố riêng.',
  },
  {
    id: 'tueba-floor-not-final-cutoff',
    label:
      'Bảng nguồn là NGƯỠNG ĐẢM BẢO CHẤT LƯỢNG ĐẦU VÀO (điểm sàn/điều kiện nhận hồ sơ) năm 2026, KHÔNG phải điểm chuẩn trúng tuyển cuối cùng theo ngành (trường công bố riêng sau khi có kết quả xét tuyển, chưa thu thập được ở batch này).',
    status: 'official-but-unparsed',
    sourceId: 'tueba-threshold-2026',
    scoreAffecting: false,
    impact: '"Đủ điều kiện" theo UniscoreVN nghĩa là đạt điểm sàn nộp hồ sơ, KHÔNG đảm bảo trúng tuyển thực tế (điểm chuẩn có thể cao hơn điểm sàn).',
  },
  {
    id: 'tueba-combination-per-major-not-verified',
    label:
      'Nguồn không liệt kê đầy đủ tổ hợp xét tuyển áp dụng cho TỪNG mã ngành (chỉ có ví dụ Luật kinh tế: C01/C03/C04/D01/X01/X02/A00/A01/C00) — module này áp ngưỡng theo ngành cho BẤT KỲ tổ hợp nào người dùng chọn, chưa kiểm tra tổ hợp đó có thực sự được ngành đó công bố hay không.',
    status: 'official-but-unparsed',
    sourceId: 'tueba-threshold-2026',
    scoreAffecting: false,
    impact: 'Kết quả có thể "đủ điều kiện" dù tổ hợp đã chọn không thuộc danh sách tổ hợp thực tế của ngành (điểm số vẫn tính đúng, chỉ rủi ro ở khâu tổ hợp-ngành).',
  },
  {
    id: 'tueba-other-methods-not-modeled',
    label:
      'TUEBA 2026 còn phương thức xét học bạ, V-SAT-TNU, ĐGNL (ĐHQG Hà Nội/ĐHSP Hà Nội), xét tuyển thẳng — module này CHỈ mô hình hoá phương thức xét kết quả thi TN THPT.',
    status: 'incomplete',
    sourceId: 'tueba-threshold-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển bằng các phương thức khác chưa tính được qua UniscoreVN cho TUEBA.',
  },
];
