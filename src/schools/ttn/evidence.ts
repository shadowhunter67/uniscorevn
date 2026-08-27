/** TTN 2026 — công thức Điểm xét tuyển phương thức thi TN THPT (100). Thông báo mức điểm nhận hồ
 * sơ KHÔNG in công thức "Điểm xét tuyển = ..." tường minh; công thức tổng thô 3 môn + điểm ưu
 * tiên là judgment call theo quy chế tuyển sinh hiện hành (Điều 7 TT 06/2026), cùng tiền lệ
 * `schools/ctu`. Bảng ngưỡng theo mã xét tuyển thì trích nguyên văn. */
export const ttnThptExamFormulaEvidence = {
  ruleId: 'ttn-thpt-exam-formula-2026',
  evidence: [
    {
      sourceId: 'ttn-threshold-notice-2026',
      location:
        'Mục 3.1 — ngưỡng phương thức 100 theo nhóm mã xét tuyển (KV3, tổng thô 3 môn, không điểm cộng): Giáo viên 20, Y khoa 22, Điều dưỡng / Kỹ thuật xét nghiệm y học 18, còn lại 15. "Thí sinh ở các khu vực khác được tính điểm ưu tiên xét tuyển theo quy định của quy chế tuyển sinh khi xác định ngưỡng". Bảng mục 1.2 liệt kê 37 mã xét tuyển.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-27',
    },
  ],
};
