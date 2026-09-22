/** VHU 2026 — điểm sàn/công thức (điểm sàn chính chủ, xác nhận rõ "áp dụng cho khu vực 3, không
 * hưởng ưu tiên đối tượng, chưa gồm điểm cộng") + bảng điểm chuẩn thật theo mã ngành (giaoduc.net.vn
 * đăng lại thông báo chính chủ). */
export const vhuThptExamThresholdEvidence = {
  ruleId: 'vhu-thpt-exam-threshold-2026',
  evidence: [
    {
      sourceId: 'vhu-threshold-2026',
      location:
        '"Điểm xét tuyển theo kết quả thi tốt nghiệp THPT 2026 áp dụng cho thí sinh thuộc khu vực 3, không hưởng ưu tiên theo đối tượng, chưa bao gồm điểm cộng." Ngành Luật/Luật kinh tế 20,00; Điều dưỡng 18,00 (điều kiện phụ riêng); còn lại 15,00.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-22',
    },
    {
      sourceId: 'vhu-cutoff-2026',
      location: 'Bảng điểm chuẩn đại học chính quy đợt 1 năm 2026, 43 mã ngành, cột "Theo KQ Thi TN THPT" (thang 30).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-22',
    },
  ],
};
