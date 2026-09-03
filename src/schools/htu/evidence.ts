import type { SourcedRule } from '../../core/evidence';

export const htuExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (phương thức 1 — xét kết quả thi TN THPT 2025) = tổng thô 3 môn theo tổ hợp (thang 30, không hệ số) + điểm ưu tiên khu vực/đối tượng (khung quốc gia hiện hành, giảm dần từ 22,5/30). Nguồn chính thức "Thông tin tuyển sinh năm 2025" (ts.htu.edu.vn) mục 2.1 và mục 5 xác nhận công thức và công thức giảm điểm ưu tiên; điểm trúng tuyển chính thức (`htu-threshold-2025`) đã bao gồm điểm ưu tiên.',
  evidence: [
    {
      sourceId: 'htu-dean-2025',
      location: 'Thông tin tuyển sinh năm 2025 (Hình thức đào tạo: Chính quy), mục II.2.1 và mục II.5 — ts.htu.edu.vn.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
  ],
} satisfies SourcedRule<string>;

export const htuFieldThresholdEvidence = {
  ruleId: 'htu-field-threshold-2025',
  evidence: [
    {
      sourceId: 'htu-threshold-2025',
      location: 'Thông báo 72/TB-HĐTSCQ (22/8/2025), bảng "Điểm trúng tuyển theo các phương thức", cột "Thi TN THPT (gốc)" — ts.htu.edu.vn.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
    {
      sourceId: 'htu-dean-2025',
      location: 'Thông tin tuyển sinh năm 2025, mục II.5.d — bảng tổ hợp xét tuyển theo từng mã xét tuyển (ts.htu.edu.vn).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
  ],
};
