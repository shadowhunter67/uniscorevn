/** SIU 2026 — ngưỡng đầu vào phương thức thi TN THPT, trích nguyên văn: "thí sinh phải có tổng
 * điểm 03 môn theo tổ hợp xét tuyển đạt tối thiểu 15 điểm (theo thang điểm 30)... áp dụng thống
 * nhất đối với tất cả ngành... NGOẠI TRỪ ngành Luật kinh tế". */
export const siuThptExamThresholdEvidence = {
  ruleId: 'siu-thpt-exam-threshold-2026',
  evidence: [
    {
      sourceId: 'siu-threshold-notice-2026',
      location: '"tổng điểm 03 môn theo tổ hợp xét tuyển đạt tối thiểu 15 điểm (theo thang điểm 30)... áp dụng thống nhất đối với tất cả ngành và chuyên ngành đào tạo của SIU, ngoại trừ ngành Luật kinh tế".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-16',
    },
  ],
};
