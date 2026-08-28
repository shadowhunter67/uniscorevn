/** VWA 2026 — ngưỡng điểm xét tuyển phương thức thi TN THPT theo mã xét tuyển, trích nguyên văn
 * Thông báo 96/TB-HVPNVN (07/07/2026), mục I (bảng trang 2-3). */
export const vwaThptExamFormulaEvidence = {
  ruleId: 'vwa-thpt-exam-formula-2026',
  evidence: [
    {
      sourceId: 'vwa-quality-threshold-2026',
      location:
        'Bảng "Ngưỡng điểm xét tuyển kết quả điểm thi tốt nghiệp THPT năm 2026" theo mã xét tuyển (17 mã, Hà Nội + Phân hiệu TP.HCM). Điều kiện phụ: CNTT/Thiết kế và phát triển Game — Toán thi TN THPT ≥ 6,0; Quản trị kinh doanh/Kinh tế (Chất lượng cao) — chứng chỉ tiếng Anh Bậc 3 hoặc điểm Anh ĐKXT ≥ 5,0 (ngoài phạm vi nhánh exact).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
};
