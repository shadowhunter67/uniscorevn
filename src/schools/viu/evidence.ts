/** VIU 2026 — điểm sàn xét tuyển Mã 100 (thi TN THPT), Thông báo 234/TB-ĐHVH ngày 01/7/2026:
 * bảng "Điểm sàn xét tuyển" cột "Điểm thi tốt nghiệp THPT năm 2026" = 15,0/30 đồng nhất 21 ngành. */
export const viuThptExamThresholdEvidence = {
  ruleId: 'viu-thpt-exam-threshold-2026',
  evidence: [
    {
      sourceId: 'viu-threshold-notice-2026',
      location: 'Mục 1 (Điểm sàn xét tuyển), bảng ảnh — cột "Điểm thi tốt nghiệp THPT năm 2026 (Mã 100)" = 15,0/30 đồng nhất cả 21 ngành.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-17',
    },
  ],
};
