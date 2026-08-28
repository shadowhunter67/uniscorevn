/** NLU 2026 — ngưỡng đảm bảo chất lượng đầu vào theo mã xét tuyển, phương thức THPT, trích
 * nguyên văn trang chính thức ts.hcmuaf.edu.vn: "áp dụng cho thí sinh thuộc khu vực 3, không
 * hưởng ưu tiên theo đối tượng". Bảng ảnh 56 mã xét tuyển (53 mã có cột THPT), đọc bằng vision. */
export const nluThptExamFormulaEvidence = {
  ruleId: 'nlu-thpt-exam-formula-2026',
  evidence: [
    {
      sourceId: 'nlu-threshold-2026',
      location:
        'Bảng "NGƯỠNG ĐẢM BẢO CHẤT LƯỢNG ĐẦU VÀO (ĐIỂM SÀN)" — cột THPT theo từng mã xét tuyển (đa số 16/30, nhóm cạnh tranh cao — Ngôn ngữ Anh, CNTT, CNKT hóa học, Công nghệ thực phẩm, Thú y — 18/30), "áp dụng cho thí sinh thuộc khu vực 3, không hưởng ưu tiên theo đối tượng".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
};
