export const vnkguExactFormulaEvidence = {
  ruleId: 'vnkgu-thpt-exam-exact-2026',
  evidence: [
    {
      sourceId: 'vnkgu-scheme-2026',
      location:
        'Đề án tuyển sinh 2026, trang 8, mục "2. Phương thức 2": "Công thức tính điểm xét tuyển: Điểm xét tuyển = [(Điểm thi môn 1 + Điểm thi môn 2 + Điểm thi môn 3) + Điểm cộng (nếu có)] + Điểm ưu tiên (nếu có)".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-22',
    },
    {
      sourceId: 'vnkgu-tieuchi-2026',
      location: 'Mục "5.4.2. Tiêu chí xét tuyển": "Điểm chuẩn trúng tuyển của ngành" = "điểm xét tuyển của thí sinh cuối cùng trong danh sách trúng tuyển".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-22',
    },
  ],
};

export const vnkguFieldThresholdEvidence = {
  ruleId: 'vnkgu-field-threshold-2026',
  evidence: [
    {
      sourceId: 'vnkgu-cutoff-2026',
      location: 'Thông báo công bố Điểm trúng tuyển Đại học chính quy năm 2026 (Số 04/TB-HĐTS, 10/8/2026) — cột "Kết quả thi tốt nghiệp THPT (thang điểm 30)", theo mã xét tuyển.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-22',
    },
  ],
};
