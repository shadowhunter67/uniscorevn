/** TTU 2026 — điểm sàn ĐKXT phương thức thi TN THPT theo nhóm ngành, trích nguyên văn thông báo
 * chính thức 09/07/2026. Công thức ĐXT = tổng thô 3 môn + điểm ưu tiên là judgment call (thông
 * báo không in công thức tường minh), theo Điều 7 TT 06/2026 — cùng tiền lệ `schools/ctu`. */
export const ttuThptExamFormulaEvidence = {
  ruleId: 'ttu-thpt-exam-formula-2026',
  evidence: [
    {
      sourceId: 'ttu-floor-score-2026',
      location:
        '"Ngành Y khoa ... điểm sàn cao nhất với 22 điểm. Theo sau đó là 2 ngành thuộc Khối Sức Khỏe, Điều dưỡng và Kỹ thuật Xét nghiệm với điểm sàn là 18 điểm. Khối ngành Luật điểm sàn 20 điểm. Đối với các ngành thuộc khối kỹ thuật, công nghệ và kinh tế, ngôn ngữ, điểm nhận hồ sơ được thiết lập ở mức 15 điểm."',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
};
