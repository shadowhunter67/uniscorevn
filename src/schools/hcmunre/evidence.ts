import type { SourcedRule } from '../../core/evidence';

export const hcmunreExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (Phương thức 1, xét kết quả thi TN THPT 2026) = tổng điểm thô 3 môn theo tổ hợp (thang 30, không hệ số) + điểm ưu tiên đối tượng, khu vực (nếu có). Nguồn chính thức trang "Thông báo ngưỡng chất lượng đầu vào..." công bố nguyên văn định nghĩa Điểm xét tuyển Phương thức 1.',
  evidence: [
    {
      sourceId: 'hcmunre-floor-formula-2026',
      location: 'Trường Đại học Tài nguyên và Môi trường TP. Hồ Chí Minh — Thông báo ngưỡng chất lượng đầu vào đối với các phương thức xét tuyển đại học hệ chính quy năm 2026 (tuyensinh.hcmunre.edu.vn).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-27',
    },
  ],
} satisfies SourcedRule<string>;

export const hcmunreFieldThresholdEvidence = {
  ruleId: 'hcmunre-field-threshold-2026',
  evidence: [
    {
      sourceId: 'hcmunre-cutoff-decision-2026',
      location: 'Quyết định về điểm trúng tuyển đại học chính quy đợt 1 năm 2026 — Trường Đại học Tài nguyên và Môi trường TP. Hồ Chí Minh (tuyensinh.hcmunre.edu.vn, đăng 10/08/2026).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-27',
    },
    {
      sourceId: 'hcmunre-cutoff-pt1-2026',
      location: 'File đính kèm PT1.pdf — Điểm chuẩn xét tuyển theo Phương thức 1 căn cứ kết quả điểm thi tốt nghiệp THPT năm 2026 (thang điểm 30), đọc trực tiếp bằng vision từ PDF gốc.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-27',
    },
  ],
};
