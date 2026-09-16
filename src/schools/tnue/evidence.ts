import type { SourcedRule } from '../../core/evidence';

export const tnueExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (nhánh xét kết quả thi TN THPT 2026) = tổng điểm thô 3 môn theo tổ hợp gốc đã công bố (thang 30, không hệ số) + điểm ưu tiên khu vực/đối tượng. "Thông báo điểm trúng tuyển đại học chính quy năm 2026" (tuyensinh.tnue.edu.vn, 09/8/2026) trình bày bảng HTML thật (không phải ảnh) — cột "ĐIỂM TRÚNG TUYỂN" thang 30 không hệ số.',
  evidence: [
    {
      sourceId: 'tnue-cutoff-2026',
      location: 'Thông báo điểm trúng tuyển đại học chính quy năm 2026 (tuyensinh.tnue.edu.vn), bảng "BẢNG ĐIỂM CHUẨN NĂM 2026".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-16',
    },
  ],
} satisfies SourcedRule<string>;

export const tnueFieldThresholdEvidence = {
  ruleId: 'tnue-field-threshold-2026',
  evidence: [
    {
      sourceId: 'tnue-cutoff-2026',
      location: 'Thông báo điểm trúng tuyển đại học chính quy năm 2026 — bảng đầy đủ 22 ngành, mã ngành, tổ hợp gốc, đọc text HTML trực tiếp.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-16',
    },
  ],
};
