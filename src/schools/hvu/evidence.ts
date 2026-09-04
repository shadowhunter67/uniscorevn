import type { SourcedRule } from '../../core/evidence';

export const hvuExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (nhánh TS01 — xét kết quả thi TN THPT 2026, thang 30, không hệ số) = tổng điểm thô 3 môn theo tổ hợp + điểm ưu tiên khu vực/đối tượng (khung quốc gia hiện hành, Điều 7 Thông tư 06/2026/TT-BGDĐT — trường không tự công bố bảng riêng). Trường KHÔNG tính điểm cộng (điểm thưởng/xét thưởng/khuyến khích) cho thành tích đặc biệt hay chứng chỉ ngoại ngữ (Quyết định 226/QĐ-ĐHHV, mục 5.2).',
  evidence: [
    {
      sourceId: 'hvu-admission-scheme-2026',
      location: 'Quyết định 226/QĐ-ĐHHV (09/3/2026) — mục 5.2 "Điểm ưu tiên, điểm cộng" (trang 11).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-04',
    },
    {
      sourceId: 'hvu-priority-national-2026',
      location: 'Thông tư 06/2026/TT-BGDĐT, Điều 7 — mức điểm ưu tiên KV/ĐT và công thức giảm khi tổng điểm ≥ 22,50/30.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-04',
    },
  ],
} satisfies SourcedRule<string>;

export const hvuFieldThresholdEvidence = {
  ruleId: 'hvu-field-threshold-2026',
  evidence: [
    {
      sourceId: 'hvu-threshold-2026',
      location: 'Báo Phú Thọ — "Trường Đại học Hùng Vương công bố điểm trúng tuyển đợt 1 năm 2026" (tường thuật thông báo chính thức của Hội đồng tuyển sinh, 09/08/2026).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-04',
    },
    {
      sourceId: 'hvu-threshold-secondary-2026',
      location: 'Giáo dục & Thời đại — cross-check độc lập, khớp tuyệt đối 7/7 mức điểm mô hình hoá.',
      verification: 'cross-checked' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-04',
    },
    {
      sourceId: 'hvu-admission-scheme-2026',
      location: 'Quyết định 226/QĐ-ĐHHV — mục 4 (trang 5-10), bảng Mã ngành / Tổ hợp xét tuyển.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-04',
    },
  ],
};
