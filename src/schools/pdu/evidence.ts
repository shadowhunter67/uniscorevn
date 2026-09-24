export const pduExactFormulaEvidence = {
  ruleId: 'pdu-thpt-exam-exact-2026',
  evidence: [
    {
      sourceId: 'pdu-scheme-2026',
      location:
        '"Công thức tính tổng điểm xét tuyển: Tổng điểm xét tuyển = M1 + M2 + M3 + Tổng điểm ưu tiên" (Thông tin tuyển sinh năm 2026, Quyết định 131/QĐ-ĐHPVĐ, mục 6.c) + bảng tổ hợp môn theo mã ngành (mục 4).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-22',
    },
  ],
};

export const pduFieldThresholdEvidence = {
  ruleId: 'pdu-field-threshold-2026',
  evidence: [
    {
      sourceId: 'pdu-cutoff-2026',
      location: 'Thông báo điểm trúng tuyển đợt 1, Kỳ tuyển sinh năm 2026 (Số 997/TB-ĐHPVĐ, 10/8/2026) — cột "Kết quả thi tốt nghiệp THPT 2026", theo mã ngành.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-22',
    },
  ],
};
