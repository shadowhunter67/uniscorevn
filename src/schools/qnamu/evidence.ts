import type { SourcedRule } from '../../core/evidence';

export const qnamuExactFormulaEvidence = {
  value:
    'Điểm xét (nhánh xét kết quả thi TN THPT 2025) = tổng điểm thô 3 môn theo tổ hợp xét tuyển đã chọn (thang 10/môn, không nhân hệ số) + điểm ưu tiên khu vực/đối tượng (quy đổi giảm dần khi tổng >= 22,5). Nguồn trích nguyên văn: "Điểm trúng tuyển là tổng điểm 3 môn theo tổ hợp xét tuyển (không nhân hệ số) và điểm ưu tiên" — điểm chuẩn công bố ĐÃ bao hàm điểm ưu tiên. Mức điểm ưu tiên CƠ BẢN theo KV/ĐT không được trường công bố — dùng khung quốc gia hiện hành làm judgment call cho giá trị bảng.',
  evidence: [
    {
      sourceId: 'qnamu-threshold-2025',
      location: 'Bảng điểm chuẩn theo ngành x tổ hợp, Trường Đại học Quảng Nam 2025 (Trangedu.com, cross-check Sforum/CellphoneS, công thức xác nhận qua Vietjack.com).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
  ],
} satisfies SourcedRule<string>;

export const qnamuFieldThresholdEvidence = {
  ruleId: 'qnamu-field-threshold-2025',
  evidence: [
    {
      sourceId: 'qnamu-threshold-2025',
      location: 'Điểm chuẩn theo ngành x tổ hợp — nhánh thi TN THPT (thang 30, đã gồm ưu tiên).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
    {
      sourceId: 'qnamu-threshold-secondary-2025',
      location: 'Cross-check độc lập — khớp số liệu tuyệt đối cho toàn bộ 29 cặp ngành/tổ hợp đã mô hình hoá.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
  ],
};
