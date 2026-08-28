export const uflsudnThptExamThresholdEvidence = {
  ruleId: 'uflsudn-thpt-exam-threshold-2026',
  evidence: [{ sourceId: 'uflsudn-quality-threshold-2026', location: 'Ngưỡng đầu vào/điểm sàn thi TN THPT 2026', verification: 'cross-checked' as const, effectiveYear: 2026 }],
};

/**
 * UFLS 2026 — 4 ngành đào tạo giáo viên ngoại ngữ (Sư phạm tiếng Anh 7140231, Pháp 7140233,
 * Trung Quốc 7140234, Hàn Quốc 7140237). Ảnh "Ngưỡng đầu vào xét tuyển đại học chính quy năm
 * 2026" trên trang chính thức tuyensinh.ufl.udn.vn (đọc trực tiếp qua vision) xác nhận ngưỡng
 * 20/30 = tổng điểm 3 môn thi TN THPT CỘNG điểm ưu tiên khu vực/đối tượng (không cộng điểm cộng
 * ở bước so ngưỡng này).
 */
export const uflsudnTeacherTrainingThresholdEvidence = {
  value: 'Ngưỡng đầu vào (4 ngành Sư phạm ngoại ngữ) = Tổng điểm 3 môn thi TN THPT + điểm ưu tiên khu vực, đối tượng ≥ 20,00/30',
  evidence: [
    {
      sourceId: 'uflsudn-teacher-training-threshold-2026',
      location: 'Ảnh "Ngưỡng đầu vào xét tuyển đại học chính quy năm 2026", trang tuyensinh.ufl.udn.vn',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
};

/**
 * UFLS 2026 — công thức điểm ưu tiên (Thông tin tuyển sinh năm 2026, bản FINAL 02/6/2026, PDF
 * chính thức đọc trực tiếp qua pdftotext) mục 5.2: dẫn chiếu Thông tư 06/2026/TT-BGDĐT + công
 * thức giảm dần khi tổng điểm quy đổi ≥ 22,50/30.
 */
export const uflsudnPriorityFormulaEvidence = {
  value: 'Điểm ưu tiên: theo Quy chế tuyển sinh (Thông tư 06/2026/TT-BGDĐT), giảm dần khi tổng điểm ≥ 22,50/30',
  evidence: [
    {
      sourceId: 'uflsudn-admission-info-2026',
      location: 'Thông tin tuyển sinh năm 2026 (bản FINAL), mục 5.2',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
};
