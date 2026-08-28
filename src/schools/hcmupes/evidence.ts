import type { SourcedRule } from '../../core/evidence';

export const hcmupesGdtcThresholdEvidence = {
  value:
    'Điểm tổ hợp (2 môn văn hóa + Năng khiếu TDTT, không nhân hệ số 2) phải đạt: KV3 >= 19,00; KV2 >= 18,75; KV2-NT >= 18,50; KV1 >= 18,25 (thang 30) — ngành Giáo dục thể chất, Phương thức 405.',
  evidence: [
    {
      sourceId: 'hcmupes-gdtc-threshold-2026',
      location: 'Thông báo 05/TB-HĐTS (13/07/2026), mục 1 (Phương thức 405)',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
} satisfies SourcedRule<string>;
