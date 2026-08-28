import type { SourcedRule } from '../../core/evidence';

export const dainamThptExamThresholdEvidence = {
  ruleId: 'dainam-thpt-exam-threshold-2026',
  evidence: [
    {
      sourceId: 'dainam-threshold-2026',
      location:
        'tuyensinh.dainam.edu.vn, bài "Trường Đại học Đại Nam công bố ngưỡng đảm bảo chất lượng đầu vào hệ đại học chính quy năm 2026"',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
};

export const dainamThptExactFormulaEvidence = {
  value:
    'Ngưỡng đảm bảo chất lượng đầu vào (phương thức thi TN THPT) = tổng điểm 3 môn thi tốt nghiệp THPT theo tổ hợp xét tuyển, thang 30, không nhân hệ số, KHÔNG bao gồm điểm cộng, điểm ưu tiên khu vực và đối tượng',
  evidence: [
    {
      sourceId: 'dainam-threshold-2026',
      location:
        'tuyensinh.dainam.edu.vn, bài "Trường Đại học Đại Nam công bố ngưỡng đảm bảo chất lượng đầu vào hệ đại học chính quy năm 2026", mục 1',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
} satisfies SourcedRule<string>;
