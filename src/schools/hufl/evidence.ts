/** HUFL 2026 — công thức (Đề án tuyển sinh chính chủ mục III.3.1: tổng 3 môn tổ hợp không nhân
 * hệ số + điểm ưu tiên theo quy chế Bộ GD&ĐT) + bảng điểm chuẩn thật theo ngành (infographic chính
 * chủ, đợt 1). */
export const huflThptExamExactEvidence = {
  ruleId: 'hufl-thpt-exam-exact-2026',
  evidence: [
    {
      sourceId: 'hufl-admission-info-2026',
      location:
        'Mục III.3.1 "Đối với các phương thức 1 và 4": "Điểm ưu tiên: áp dụng theo quy chế tuyển sinh năm của Bộ GD&ĐT." + mục 2.1/2.2 xác nhận điểm xét tuyển PT1 là tổng 3 môn tổ hợp (không nhân hệ số).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-22',
    },
    {
      sourceId: 'hufl-cutoff-2026',
      location: 'Ảnh "ĐIỂM CHUẨN ĐẠI HỌC CHÍNH QUY (ĐỢT 1) NĂM 2026" — cột "THPT" theo mã ngành.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-22',
    },
  ],
};
