/** TGU 2026 — điều kiện Phương thức 1 (thi TN THPT), trích nguyên văn Đề án tuyển sinh (mục
 * 3.1.1): "Đối với các ngành khác: ĐXT phải từ 15,0 điểm trở lên ... trong đó điểm môn Toán hoặc
 * Ngữ văn trong tổ hợp xét tuyển phải có điểm từ 1/3 của điểm xét tuyển". */
export const tguThptExamFormulaEvidence = {
  ruleId: 'tgu-thpt-exam-formula-2026',
  evidence: [
    {
      sourceId: 'tgu-admission-scheme-2026',
      location:
        'Mục 3.1.1 — "Đối với các ngành khác: ĐXT phải từ 15,00 điểm trở lên và phải có tổng điểm 3 môn thi TN THPT trong tổ hợp xét tuyển ... đạt từ 15,0 điểm trở lên, trong đó điểm môn Toán hoặc Ngữ văn trong tổ hợp xét tuyển phải có điểm từ 1/3 của điểm xét tuyển".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
};
