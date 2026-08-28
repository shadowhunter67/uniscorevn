import type { SourcedRule } from '../../core/evidence';

export const bvuThptExactFormulaEvidence = {
  value: 'Điểm 3 môn thi tốt nghiệp theo tổ hợp xét tuyển đạt từ ngưỡng theo nhóm ngành, không cộng điểm ưu tiên khu vực, đối tượng',
  evidence: [
    {
      sourceId: 'bvu-diem-trung-tuyen-2026',
      location: 'Bài đăng công bố điểm trúng tuyển 10/08/2026, bảng ngưỡng theo nhóm ngành',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
} satisfies SourcedRule<string>;
