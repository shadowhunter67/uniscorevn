/** DLU 2026 — điểm sàn ĐKXT theo mã ngành, trích nguyên văn Thông báo 1145/TB-ĐHĐL (09/07/2026):
 * "Mức điểm nhận hồ sơ ĐKXT như trên là tổng điểm 3 môn trong Tổ hợp môn đăng ký xét tuyển, không
 * nhân hệ số, đã bao gồm điểm ưu tiên khu vực và đối tượng ... Điểm sàn trên không phân biệt giữa
 * các tổ hợp môn, không phân biệt giữa thí sinh học theo chương trình giáo dục phổ thông 2006 và
 * 2018." */
export const dluThptExamFormulaEvidence = {
  ruleId: 'dlu-thpt-exam-formula-2026',
  evidence: [
    {
      sourceId: 'dlu-threshold-notice-2026',
      location:
        'Ghi chú cuối bảng điểm sàn — "Mức điểm nhận hồ sơ ĐKXT như trên là tổng điểm 3 môn trong Tổ hợp môn đăng ký xét tuyển, không nhân hệ số, đã bao gồm điểm ưu tiên khu vực và đối tượng (Điều 7 Quy chế tuyển sinh của Bộ GD&ĐT). Điểm sàn không phân biệt giữa các tổ hợp môn." Bảng 41 mã ngành, thang 30. Ngôn ngữ Anh/Sư phạm Tiếng Anh: điểm thi Tiếng Anh ≥ 6,0. Kỹ thuật hạt nhân: điểm thi Toán và Vật lý mỗi môn ≥ 6,5.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
};
