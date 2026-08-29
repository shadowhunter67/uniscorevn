import type { SourcedRule } from '../../core/evidence';

export const lhuThptExamThresholdEvidence = {
  ruleId: 'lhu-thpt-exam-threshold-2026',
  evidence: [
    {
      sourceId: 'lhu-threshold-2026',
      location:
        'lhu.edu.vn, bài "Trường Đại học Lạc Hồng công bố phương thức xét tuyển và chính sách học bổng \'khủng\' dành cho Tân sinh viên năm học 2026 - 2027", mục 1 và 2.1',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-30',
    },
  ],
};

export const lhuThptExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (phương thức thi TN THPT) = tổng điểm 3 môn thi tốt nghiệp THPT theo tổ hợp xét tuyển, thang 30, không nhân hệ số + điểm ưu tiên khu vực/đối tượng (judgment call chuẩn quốc gia — nguồn im lặng về điểm ưu tiên)',
  evidence: [
    {
      sourceId: 'lhu-threshold-2026',
      location:
        'lhu.edu.vn, mục 2.1 "Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026": "Điểm môn 1 + Điểm môn 2 + Điểm môn 3 ≥ 15 điểm."',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-30',
    },
  ],
} satisfies SourcedRule<string>;
