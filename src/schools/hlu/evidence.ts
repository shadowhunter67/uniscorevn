export const hluThptExamThresholdEvidence = {
  ruleId: 'hlu-thpt-exam-threshold-2026',
  evidence: [
    { sourceId: 'hlu-quality-threshold-2026', location: 'Thông báo 1010/TB-ĐHLHN 08/07/2026', verification: 'verified' as const, effectiveYear: 2026 },
  ],
};

/** Công thức Điểm xét tuyển phương thức thi TN THPT — trích Quy chế HLU (Điều 6-7) + Thông báo
 * 1029 (độ chênh tổ hợp). ĐXT (quy về tổ hợp gốc D01, thang 30) = round2(tổng thô 3 môn − độ chênh
 * tổ hợp + điểm ưu tiên), tối đa 30. Không có điểm cộng cho lĩnh vực pháp luật (TB 1010). */
export const hluThptExamFormulaEvidence = {
  ruleId: 'hlu-thpt-exam-formula-2026',
  evidence: [
    {
      sourceId: 'hlu-quyche-2026',
      location:
        'Điều 6 khoản 2 (điểm cộng ≤ 3,0/thang 30; điểm xét gồm điểm cộng + điểm ưu tiên không vượt 30) và Điều 7 (mức điểm ưu tiên KV/ĐT + công thức giảm ≥ 22,5). Lĩnh vực pháp luật: "không tính điểm cộng" (Thông báo 1010).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-27',
    },
    {
      sourceId: 'hlu-combo-delta-2026',
      location: 'Thông báo 1029 mục 1 — độ chênh điểm so với tổ hợp gốc D01: A00 +1,48; A01 +0,26; C00/D02-D06 = 0.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-27',
    },
  ],
};

/** Điểm trúng tuyển 2026 theo tổ hợp gốc D01 (đã gồm điểm cộng/ưu tiên) — Quyết định 1623. */
export const hluCutoffEvidence = {
  ruleId: 'hlu-cutoff-2026',
  evidence: [
    {
      sourceId: 'hlu-cutoff-2026',
      location: 'Bảng điểm trúng tuyển K51 theo tổ hợp gốc D01: Luật 24,12 · Luật Kinh tế 25,95 · Luật TMQT 24,22 · Ngôn ngữ Anh 23,09 · Luật (Đắk Lắk) 20,00.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-27',
    },
  ],
};
