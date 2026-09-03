import type { SourcedRule } from '../../core/evidence';

export const dlaExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (nhánh xét kết quả thi TN THPT 2026) = tổng điểm thô 3 môn theo tổ hợp (thang 30, không hệ số) + điểm ưu tiên khu vực/đối tượng. Cột "Điểm THPT" trong ảnh điểm chuẩn CHÍNH CHỦ trình bày thang 30 không hệ số; công thức nguyên văn xác nhận qua trang cross-check tuyensinh247.com dành riêng cho DLA ("Điểm xét tuyển = Tổng điểm thi THPT của tổ hợp 3 môn + Điểm ưu tiên").',
  evidence: [
    {
      sourceId: 'dla-cutoff-2026',
      location: 'Trường Đại học Kinh tế Công nghiệp Long An — ảnh "CÔNG BỐ ĐIỂM CHUẨN TRÚNG TUYỂN ĐẠI HỌC CHÍNH QUY 2026" (trang chính thức tuyensinh.daihoclongan.edu.vn).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-03',
    },
    {
      sourceId: 'dla-formula-crosscheck-2026',
      location: 'tuyensinh247.com — "Cách tính điểm xét tuyển Đại học Kinh tế Công nghiệp Long An - DLA" (nguồn thứ cấp, cross-check công thức).',
      verification: 'cross-checked' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
  ],
} satisfies SourcedRule<string>;

export const dlaFieldThresholdEvidence = {
  ruleId: 'dla-field-threshold-2026',
  evidence: [
    {
      sourceId: 'dla-cutoff-2026',
      location: 'DLA chính thức công bố điểm chuẩn đại học năm 2026 — ảnh chụp nguyên văn, đọc bằng vision.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-03',
    },
    {
      sourceId: 'dla-combination-2026',
      location: 'Trường Đại học Kinh tế Công nghiệp Long An (DLA) công bố các phương thức tuyển sinh năm 2026 — ảnh tổ hợp môn theo ngành.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-03',
    },
  ],
};
