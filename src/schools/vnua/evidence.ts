import type { SourcedRule } from '../../core/evidence';

export const vnuaGroupThresholdEvidence = {
  value: { groups: 19, image: 'tb1.jpg' },
  evidence: [
    {
      sourceId: 'vnua-threshold-notice-2026',
      location: 'Bảng ngưỡng đầu vào 23 nhóm ngành (tb1.jpg) — 19 nhóm có ngưỡng số, 2 nhóm (HVN13, HVN19) theo quy định Bộ GD&ĐT',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-22',
    },
  ],
} satisfies SourcedRule<{ groups: number; image: string }>;

export const vnuaPriorityFormulaEvidence = {
  value:
    'Mức chênh lệch điểm trúng tuyển giữa các nhóm đối tượng là 1,0 điểm và giữa các khu vực kế tiếp là 0,25 điểm; Điểm ưu tiên = [(30 - Tổng điểm)/7,5] x Mức điểm ưu tiên quy định (áp dụng khi tổng điểm ≥ 22,5/30)',
  evidence: [
    {
      sourceId: 'vnua-admission-notice-2026',
      location: 'Thông báo tuyển sinh đại học hệ chính quy 2026, mục điểm ưu tiên khu vực/đối tượng',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-22',
    },
  ],
} satisfies SourcedRule<string>;
