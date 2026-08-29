import type { SourcedRule } from '../../core/evidence';

export const utmThptExamThresholdEvidence = {
  ruleId: 'utm-thpt-exam-threshold-2026',
  evidence: [
    {
      sourceId: 'utm-threshold-2026',
      location:
        'utm.edu.vn, bài "Trường Đại học Công nghệ và Quản lý Hữu Nghị công bố ngưỡng đảm bảo chất lượng đầu vào đại học chính quy năm 2026" (06-07-2026), mục 1',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-29',
    },
  ],
};

export const utmThptExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (phương thức thi TN THPT) = tổng điểm 3 môn thi tốt nghiệp THPT theo tổ hợp xét tuyển, thang 30, không nhân hệ số + điểm ưu tiên khu vực/đối tượng (judgment call chuẩn quốc gia — nguồn im lặng về điểm ưu tiên)',
  evidence: [
    {
      sourceId: 'utm-threshold-2026',
      location:
        'utm.edu.vn, bài "Trường Đại học Công nghệ và Quản lý Hữu Nghị công bố ngưỡng đảm bảo chất lượng đầu vào đại học chính quy năm 2026", mục 1: "Đối với phương thức sử dụng kết quả thi tốt nghiệp THPT năm 2026 - Các ngành đào tạo: từ 15 điểm."',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-29',
    },
  ],
} satisfies SourcedRule<string>;
