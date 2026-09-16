import type { SourcedRule } from '../../core/evidence';

export const hpu2ExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (nhánh xét kết quả thi TN THPT 2026) = tổng điểm thô 3 môn theo tổ hợp (thang 30, không hệ số) + điểm ưu tiên khu vực/đối tượng. Thông báo điểm chuẩn trúng tuyển 2026 (đăng lại trên Cổng Thông tin điện tử Chính phủ) trình bày điểm chuẩn thang 30 không hệ số cho phương thức xét kết quả thi TN THPT.',
  evidence: [
    {
      sourceId: 'hpu2-cutoff-2026',
      location: 'Điểm chuẩn Trường Đại học Sư phạm Hà Nội 2 năm 2026 (xaydungchinhsach.chinhphu.vn, 10/8/2026), phương thức xét kết quả thi TN THPT.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-16',
    },
  ],
} satisfies SourcedRule<string>;

export const hpu2FieldThresholdEvidence = {
  ruleId: 'hpu2-field-threshold-2026',
  evidence: [
    {
      sourceId: 'hpu2-cutoff-2026',
      location: 'Điểm chuẩn Trường Đại học Sư phạm Hà Nội 2 năm 2026 — bảng đầy đủ 25 ngành/chương trình, đối chiếu VnExpress độc lập.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-16',
    },
  ],
};
