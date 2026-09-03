import type { SourcedRule } from '../../core/evidence';

export const tuebaExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (phương thức xét kết quả thi TN THPT 2026) = tổng thô điểm bài thi/môn thi theo tổ hợp xét tuyển (thang 30, không nêu hệ số) + Điểm ưu tiên khu vực/đối tượng. Nguồn chính thức tuyensinh.tueba.edu.vn trích nguyên văn: "Ngưỡng điểm nhận hồ sơ xét tuyển bao gồm điểm bài thi/môn thi theo từng tổ hợp xét tuyển theo thang điểm 30 đã bao gồm điểm ưu tiên khu vực và đối tượng (nếu có)". Mức điểm ưu tiên cụ thể không được trường công bố riêng — dùng khung quốc gia hiện hành làm judgment call cho giá trị bảng.',
  evidence: [
    {
      sourceId: 'tueba-threshold-2026',
      location:
        'Thông báo Ngưỡng đảm bảo chất lượng đầu vào và Quy đổi điểm trúng tuyển giữa các Phương thức xét tuyển Đại học Chính quy năm 2026, mục ngưỡng phương thức thi TN THPT — tuyensinh.tueba.edu.vn.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-03',
    },
  ],
} satisfies SourcedRule<string>;

export const tuebaFieldThresholdEvidence = {
  ruleId: 'tueba-field-threshold-2026',
  evidence: [
    {
      sourceId: 'tueba-threshold-2026',
      location: 'Bảng "Ngưỡng đảm bảo chất lượng đầu vào hệ đại học chính quy năm 2026" theo mã ngành — tuyensinh.tueba.edu.vn.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-03',
    },
  ],
};
