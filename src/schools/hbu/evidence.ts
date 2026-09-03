import type { SourcedRule } from '../../core/evidence';

export const hbuExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (nhánh xét kết quả thi TN THPT 2025, thang 30, không hệ số) = tổng điểm thô 3 môn theo tổ hợp + điểm ưu tiên khu vực/đối tượng. Công thức nguyên văn của trường: "ĐXT = TĐ1 + ĐUT" (TĐ1 = tổng điểm các bài thi/môn thi của tổ hợp dùng để xét tuyển; ĐUT = điểm ưu tiên khu vực và đối tượng theo quy chế hiện hành).',
  evidence: [
    {
      sourceId: 'hbu-formula-2025',
      location: 'tuyensinh.daihochoabinh.edu.vn — "Tiêu chí, nguyên tắc xét tuyển" (trang chính thức, Phương thức 1).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-04',
    },
    {
      sourceId: 'hbu-threshold-2025',
      location: 'diemthi.tuyensinh247.com — xác nhận điểm chuẩn công bố đã cộng điểm ưu tiên (nguồn thứ cấp, cross-check).',
      verification: 'cross-checked' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-04',
    },
  ],
} satisfies SourcedRule<string>;

export const hbuFieldThresholdEvidence = {
  ruleId: 'hbu-field-threshold-2025',
  evidence: [
    {
      sourceId: 'hbu-threshold-2025',
      location: 'Tuyensinh247 — "Điểm chuẩn Trường Đại Học Hòa Bình 2025 chính xác" (nguồn thứ cấp, đăng lại thông báo chính thức).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-04',
    },
    {
      sourceId: 'hbu-threshold-secondary-2025',
      location: 'Navigates.vn — bảng theo mã ngành, cross-check độc lập khớp tuyệt đối (nguồn thứ cấp).',
      verification: 'cross-checked' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-04',
    },
    {
      sourceId: 'hbu-combination-2025',
      location: 'Trường Đại học Hòa Bình — ảnh CHÍNH CHỦ "THÔNG TIN TUYỂN SINH CÁC NGÀNH" (mã ngành/tổ hợp xét tuyển 2025, đọc bằng vision).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-04',
    },
  ],
};
