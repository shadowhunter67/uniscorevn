/** PVU 2026 — công thức Điểm xét tuyển phương thức xét kết quả thi TN THPT (PT1, mã 100). */
export const pvuThptExamFormulaEvidence = {
  ruleId: 'pvu-thpt-exam-formula-2026',
  evidence: [
    {
      sourceId: 'pvu-admission-info-2026',
      location:
        'Thông tin Tuyển sinh Đại học Chính quy năm 2026, Phương thức 1 (mã 100) — pvu.edu.vn: "Điều kiện xét tuyển là thí sinh có tổng điểm ba môn thi tốt nghiệp THPT tương ứng tổ hợp xét tuyển đạt tối thiểu 15 theo thang điểm 30" — xác nhận Điểm xét tuyển = tổng thô 3 môn (không hệ số) + điểm ưu tiên khu vực/đối tượng (Điều 7 Thông tư 06/2026/TT-BGDĐT, judgment call giá trị bảng — trường không công bố mức riêng).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-03',
    },
  ],
};

export const pvuThresholdEvidence = {
  ruleId: 'pvu-threshold-2026',
  evidence: [
    {
      sourceId: 'pvu-threshold-2026',
      location:
        'Thông báo điểm chuẩn trúng tuyển đợt 1 trình độ đại học hệ chính quy và hệ liên kết năm 2026 — pvu.edu.vn, mục Phương thức 1: điểm chuẩn hệ chính quy trong nước 22,50/30, áp dụng chung mọi ngành/tổ hợp, đã cộng điểm ưu tiên.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-03',
    },
  ],
};
