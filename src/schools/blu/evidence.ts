import type { SourcedRule } from '../../core/evidence';

export const bluExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (nhánh xét kết quả thi TN THPT 2026, mã phương thức 100/405) = tổng điểm thô 3 môn theo tổ hợp (thang 30, không hệ số) + điểm ưu tiên khu vực/đối tượng. Nguồn chính thức trang "Chính sách ưu tiên trong tuyển sinh" công bố nguyên văn công thức điểm ưu tiên = mức khu vực + mức đối tượng, cộng dồn vào tổng điểm.',
  evidence: [
    {
      sourceId: 'blu-priority-2026',
      location: 'Trường Đại học Bạc Liêu — Chính sách ưu tiên trong tuyển sinh năm 2026 (trang chính thức tuyensinh.blu.edu.vn).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-03',
    },
  ],
} satisfies SourcedRule<string>;

export const bluFieldThresholdEvidence = {
  ruleId: 'blu-field-threshold-2026',
  evidence: [
    {
      sourceId: 'blu-cutoff-2026',
      location: 'Thông báo công bố điểm chuẩn trúng tuyển đợt 1 năm 2026 (Quyết định số 426/QĐ-ĐHBL, 10/8/2026) — ảnh chụp nguyên văn, đọc bằng vision.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-03',
    },
    {
      sourceId: 'blu-combination-2026',
      location: 'Trang chính thức "Ngành, tổ hợp và số lượng tuyển sinh năm 2026" — tổ hợp môn theo từng ngành.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-03',
    },
  ],
};
