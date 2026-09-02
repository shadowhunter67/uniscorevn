import type { SourcedRule } from '../../core/evidence';

export const tmuExactFormulaEvidence = {
  value:
    'Điểm xét (Phương thức 100 — xét kết quả thi TN THPT 2025) = tổng điểm thô 3 môn theo tổ hợp xét tuyển (thang 10/môn) + điểm ưu tiên khu vực/đối tượng — nguồn xác nhận TRỰC TIẾP ngưỡng đảm bảo chất lượng đầu vào (20/30) đã bao gồm điểm ưu tiên. Mức điểm ưu tiên cụ thể không được trường công bố — dùng khung quốc gia hiện hành làm judgment call cho giá trị bảng. Không có chênh lệch điểm giữa các tổ hợp xét tuyển (nguyên văn).',
  evidence: [
    {
      sourceId: 'tmu-threshold-2025',
      location: 'Thông báo điểm sàn TMU 2025 (đăng lại trên Cổng TTĐT Chính phủ).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
  ],
} satisfies SourcedRule<string>;

export const tmuThresholdEvidence = {
  ruleId: 'tmu-threshold-2025',
  evidence: [
    {
      sourceId: 'tmu-threshold-2025',
      location: 'Ngưỡng đảm bảo chất lượng đầu vào (điểm sàn) — 20/30, áp dụng cho toàn bộ ngành/tổ hợp.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
  ],
};
