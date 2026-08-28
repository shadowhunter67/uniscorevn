import type { SourcedRule } from '../../core/evidence';

export const ushThresholdEvidence = {
  value: 'Ngưỡng đầu vào PT1 (mã 405): Tổng điểm 2 môn văn hóa + điểm thi năng khiếu TDTT (không nhân hệ số) ≥ 15,00/30, đồng thời điểm năng khiếu TDTT ≥ 5,00/10',
  evidence: [
    {
      sourceId: 'ush-quyetdinh-58-2026',
      location: 'Quyết định 58/QĐ-TDTTHCM, mục 3.2.b (ngưỡng đầu vào Huấn luyện thể thao/Quản lý TDTT/Y sinh học TDTT)',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
} satisfies SourcedRule<string>;

export const ushDxtFormulaEvidence = {
  value: 'ĐXT = ĐVH1 + ĐVH2 + ĐNK + Điểm ưu tiên + Điểm cộng (nếu có)',
  evidence: [
    {
      sourceId: 'ush-quyetdinh-58-2026',
      location: 'Quyết định 58/QĐ-TDTTHCM, mục 2.1 (công thức ĐXT) và mục 7.1/9 (áp dụng + công thức giảm dần điểm ưu tiên)',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
} satisfies SourcedRule<string>;
