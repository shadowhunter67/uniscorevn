import type { SourcedRule } from '../../core/evidence';

export const actvnExactFormulaEvidence = {
  value:
    'Điểm xét (xét kết quả thi TN THPT 2026) = tổng điểm thô 3 môn theo tổ hợp (hệ số 1, thang 30, không chênh lệch giữa các tổ hợp) + điểm ưu tiên khu vực/đối tượng (nếu có) + điểm cộng chứng chỉ tiếng Anh (nếu có). Nguồn chính thức công bố nguyên văn: "các môn trong tổ hợp là hệ số 1" và "không có chênh lệch điểm xét tuyển giữa các tổ hợp xét tuyển".',
  evidence: [
    {
      sourceId: 'actvn-notice-2026',
      location: 'Học viện Kỹ thuật Mật mã — Thông báo tuyển sinh đại học chính quy năm 2026 và trang Phương thức tuyển sinh 2026 (tuyensinh.actvn.edu.vn), mục xét kết quả thi tốt nghiệp THPT.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-10-01',
    },
  ],
} satisfies SourcedRule<string>;

export const actvnFieldThresholdEvidence = {
  ruleId: 'actvn-field-threshold-2026',
  evidence: [
    {
      sourceId: 'actvn-cutoff-2026',
      location: 'Học viện Kỹ thuật Mật mã — Quyết định 44/QĐ-HĐTS ngày 13/08/2026, Phụ lục điểm chuẩn trúng tuyển đại học chính quy hệ đào tạo phục vụ lĩnh vực kinh tế - xã hội năm 2026.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-10-01',
    },
    {
      sourceId: 'actvn-notice-2026',
      location: 'Học viện Kỹ thuật Mật mã — Thông báo tuyển sinh đại học chính quy năm 2026, bảng ngành/mã xét tuyển/tổ hợp.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-10-01',
    },
  ],
};
