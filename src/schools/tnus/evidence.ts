/** TNUS 2026 — công thức (ngưỡng PDF, ghi chú trang 3) + bảng điểm chuẩn thật theo mã xét tuyển
 * (infographic chính chủ, `sources.ts`). */
export const tnusThptExamExactEvidence = {
  ruleId: 'tnus-thpt-exam-exact-2026',
  evidence: [
    {
      sourceId: 'tnus-threshold-2026',
      location: 'Trang 3, ghi chú: công thức "tổng điểm 3 môn thi + điểm cộng (nếu có) + điểm ưu tiên", thang 30.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-22',
    },
    {
      sourceId: 'tnus-cutoff-image-2026',
      location: 'Bảng điểm chuẩn 40 ngành/chương trình, phương thức thi TN THPT 2026.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-22',
    },
  ],
};
