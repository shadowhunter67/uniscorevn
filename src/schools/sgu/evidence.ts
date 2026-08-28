export const sguThptExamThresholdEvidence = {
  ruleId: 'sgu-thpt-exam-threshold-2026',
  evidence: [{ sourceId: 'sgu-quality-threshold-2026', location: 'Ngưỡng đầu vào/điểm sàn thi TN THPT 2026', verification: 'verified' as const, effectiveYear: 2026 }],
};

/** SGU 2026 — nhánh exact (mục 2.1.a điều kiện đạt ngưỡng + mục 4 công thức ĐXT), trích nguyên văn
 * Thông báo 1098/TB-HĐTS (`sources.ts:sgu-quality-threshold-2026`). */
export const sguThptExamExactFormulaEvidence = {
  ruleId: 'sgu-thpt-exam-exact-formula-2026',
  evidence: [
    {
      sourceId: 'sgu-quality-threshold-2026',
      location:
        'Mục 2.1.a: "Thí sinh đạt ngưỡng đầu vào khi tổng điểm thi 03 môn trong tổ hợp xét tuyển (THXT) không nhân hệ số cộng với điểm ưu tiên khu vực, đối tượng (nếu có) lớn hơn hoặc bằng ngưỡng đầu vào của ngành, chương trình đào tạo". Mục 4.5: "ĐXT = ĐTHGXT + ĐC + ĐƯT". Mục 4.4: công thức ĐƯT (giảm khi tổng ≥22,5).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
};
