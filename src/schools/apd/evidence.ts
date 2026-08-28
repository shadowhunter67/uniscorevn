import type { SourcedRule } from '../../core/evidence';

export const apdThptExactFormulaEvidence = {
  value: 'Mức điểm ngưỡng đảm bảo chất lượng của tất cả các phương thức xét tuyển bao gồm cả điểm cộng, điểm ưu tiên đối tượng, khu vực (nếu có)',
  evidence: [
    {
      sourceId: 'apd-threshold-notice-180-2026',
      location: 'Thông báo 180/TB-HVCSPT (02/07/2026), mục lưu ý ngưỡng đảm bảo chất lượng đầu vào',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
} satisfies SourcedRule<string>;
