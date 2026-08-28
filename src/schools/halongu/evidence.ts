/** HALONGU 2026 — công thức Điểm xét tuyển, trích nguyên văn trang chính thức "Cách tính điểm xét
 * tuyển tuyển sinh năm 2026" (xem `sources.ts:halongu-formula-2026`): "Điểm xét tuyển (ĐXT) =
 * [Điểm môn 1 (M1) + Điểm môn 2 (M2) + Điểm môn 3 (M3)] + Điểm ưu tiên (ĐƯT) (nếu có)." — với
 * phương thức thi TN THPT, M1/M2/M3 là điểm thi theo tổ hợp tương ứng (không nhân hệ số). Áp dụng
 * cùng ngưỡng nhóm ngành NGOÀI sư phạm 15,00/30 đã công bố ở `halongu-quality-threshold-2026`. */
export const halonguThptExamFormulaEvidence = {
  ruleId: 'halongu-thpt-exam-formula-2026',
  evidence: [
    {
      sourceId: 'halongu-formula-2026',
      location: 'ĐXT = [M1 + M2 + M3] + ĐƯT (nếu có) — M1/M2/M3 là điểm thi TN THPT 2026 theo tổ hợp xét tuyển tương ứng, không nhân hệ số.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
    {
      sourceId: 'halongu-quality-threshold-2026',
      location:
        'Ngưỡng đảm bảo chất lượng đầu vào PT1 (nhóm ngành NGOÀI sư phạm): "Tổng điểm 03 môn kỳ thi tốt nghiệp THPT theo tổ hợp môn xét tuyển đạt tối thiểu 15,00 điểm theo thang điểm 30 đã bao gồm điểm ưu tiên (không nhân hệ số)."',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-24',
    },
  ],
};
