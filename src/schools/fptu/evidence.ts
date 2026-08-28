export const fptuThptExamThresholdEvidence = {
  ruleId: 'fptu-thpt-exam-threshold-2026',
  evidence: [
    { sourceId: 'fptu-quality-threshold-2026', location: 'Điểm sàn xét tuyển Trường Đại học FPT 2026', verification: 'verified' as const, effectiveYear: 2026 },
  ],
};

/** FPTU 2026 — Điểm sàn/ngưỡng đảm bảo chất lượng đầu vào (điều kiện tổ hợp thô), trích nguyên văn
 * trang chính thức (`sources.ts:fptu-quality-threshold-2026`): tổng điểm 3 môn thi TN THPT trong
 * tổ hợp Axx/Cxx phải đạt tối thiểu 15,0/30, "Đây là điều kiện tổ hợp thô, KHÔNG phải điểm xét
 * tuyển cuối cùng (ĐXT)" — nguồn tự phân biệt rõ điều kiện sàn (raw) với ĐXT (công thức kết hợp
 * học bạ còn mơ hồ, xem `knowledgeGaps.ts:fptu-final-admission-score-formula-ambiguous`), nên
 * KHÔNG cần judgment call cho phần so ngưỡng sàn: so trực tiếp tổng thô, áp dụng mọi ngành/cơ sở. */
export const fptuThptExamExactThresholdEvidence = {
  ruleId: 'fptu-thpt-exam-exact-threshold-2026',
  evidence: [
    {
      sourceId: 'fptu-quality-threshold-2026',
      location:
        'Điểm sàn xét tuyển 2026: tổng điểm 3 môn thi TN THPT (tổ hợp Axx/Cxx) tối thiểu 15,0/30 — "Đây là điều kiện tổ hợp thô, KHÔNG phải điểm xét tuyển cuối cùng (ĐXT)".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
};
