import type { SourcedRule } from '../../core/evidence';

export const tbuThptExactFormulaEvidence = {
  value: 'Điểm xét tuyển = Tổng điểm 3 môn của tổ hợp đăng ký xét tuyển + Điểm ưu tiên (nếu có) + Điểm cộng (nếu có), tối đa 30 điểm',
  evidence: [
    {
      sourceId: 'tbu-thongbao-565-2026',
      location: 'Thông báo 565/TB-ĐHTB, mục 3.1.1 (công thức PT1), mục 4.1 (ưu tiên đối tượng/khu vực theo Bộ GD&ĐT), mục 4.2 (bảng điểm cộng)',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
} satisfies SourcedRule<string>;
