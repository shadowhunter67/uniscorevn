/** SDU 2026 — bảng điểm chuẩn trúng tuyển thật (ảnh nhúng, đọc bằng vision qua chrome-devtools),
 * cột "Theo kết quả điểm thi tốt nghiệp THPT 2026": 18 ngành = 15,00/30, Luật = 20,00/30. */
export const saodoThptExamThresholdEvidence = {
  ruleId: 'saodo-thpt-exam-threshold-2026',
  evidence: [
    {
      sourceId: 'saodo-cutoff-notice-2026',
      location: 'Mục I (ĐIỂM CHUẨN TRÚNG TUYỂN), bảng ảnh — cột "Theo kết quả điểm thi tốt nghiệp THPT 2026": 18 mã ngành = 15,00/30, Luật (7380101) = 20,00/30.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-16',
    },
  ],
};
