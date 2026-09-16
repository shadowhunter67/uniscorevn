import type { SourcedRule } from '../../core/evidence';

export const dhvExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (nhánh xét kết quả thi TN THPT 2026) = tổng điểm thô 3 môn theo tổ hợp (thang 30, không hệ số) + điểm ưu tiên khu vực/đối tượng. Ảnh "Trường Đại học Hùng Vương TP. Hồ Chí Minh công bố điểm chuẩn trúng tuyển Đại học chính quy 2026" trình bày cột "Thi TN THPT" thang 30 không hệ số, song song cột "Học tập THPT" và cột "ĐGNL ĐHQG HCM" (module này KHÔNG dùng 2 cột đó).',
  evidence: [
    {
      sourceId: 'dhv-cutoff-2026',
      location: 'Ảnh công bố điểm chuẩn 2026 (POST-TONG-CONG-BO-DIEM-CHUAN-DHV-2026), cột "Thi TN THPT".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-16',
    },
  ],
} satisfies SourcedRule<string>;

export const dhvFieldThresholdEvidence = {
  ruleId: 'dhv-field-threshold-2026',
  evidence: [
    {
      sourceId: 'dhv-cutoff-2026',
      location: 'Ảnh công bố điểm chuẩn 2026 — bảng 23 mã xét tuyển, đọc bằng vision (chrome-devtools screenshot).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-16',
    },
  ],
};
