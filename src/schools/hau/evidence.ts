/** HAU 2026 — mức điểm nhận hồ sơ (= ngưỡng ĐBCL), trích nguyên văn Quyết định 406/QĐ-ĐHKT-ĐT
 * Điều 1: "mức điểm nhận hồ sơ xét tuyển là tổng điểm các môn trong tổ hợp xét tuyển, điểm ưu
 * tiên và điểm cộng (nếu có)". Không in bảng ưu tiên KV/ĐT riêng — nhánh exact dùng Điều 7 TT
 * 06/2026 (judgment call) và scope thí sinh KHÔNG có điểm cộng thành tích. */
export const hauThptExamFormulaEvidence = {
  ruleId: 'hau-thpt-exam-formula-2026',
  evidence: [
    {
      sourceId: 'hau-quality-threshold-2026',
      location:
        'Điều 1 — "Trong đó, mức điểm nhận hồ sơ xét tuyển là tổng điểm các môn trong tổ hợp xét tuyển, điểm ưu tiên và điểm cộng (nếu có)". Phụ lục — 9 mã ngành tổ hợp văn hóa chuẩn: nhóm hạ tầng/giao thông/cấp thoát nước 15,0; nhóm xây dựng/kinh tế/CNTT 18,0.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
};
