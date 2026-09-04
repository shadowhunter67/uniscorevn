import type { SourcedRule } from '../../core/evidence';

export const vyaFormulaEvidence = {
  value:
    'Điểm xét tuyển VYA 2026 (thang 30, không hệ số) = tổng 3 môn theo tổ hợp (thi TN THPT cho mã 100, hoặc trung bình 3 năm lớp 10/11/12 cho mã 200) + Điểm cộng (nếu có) + Điểm ưu tiên khu vực/đối tượng (Điều 7, Quy chế tuyển sinh của Học viện, tự trích nguyên văn khung quốc gia hiện hành — KHÔNG chỉ dẫn chiếu suông).',
  evidence: [
    {
      sourceId: 'vya-thong-tin-tuyen-sinh-2026',
      location: 'Quyết định 218/QĐ-HVTTNVN, mục 2 "Mô tả phương thức tuyển sinh" (Phương thức 2 và 3).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-04',
    },
    {
      sourceId: 'vya-quy-che-tuyen-sinh-2026',
      location: 'Quyết định 261/QĐ-HVTTNVN, Điều 7 — mức điểm ưu tiên KV/ĐT và công thức giảm khi tổng điểm >= 22,50/30.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-04',
    },
  ],
} satisfies SourcedRule<string>;

export const vyaBonusEvidence = {
  ruleId: 'vya-bonus-2026',
  evidence: [
    {
      sourceId: 'vya-thong-tin-tuyen-sinh-2026',
      location: 'Quyết định 218/QĐ-HVTTNVN, mục 5.2.2 — bảng Điểm khuyến khích theo chứng chỉ IELTS, mục 5.2 — trần 3,0/30 tổng điểm cộng.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-04',
    },
  ],
};

export const vyaFieldThresholdEvidence = {
  ruleId: 'vya-field-threshold-2026',
  evidence: [
    {
      sourceId: 'vya-cutoff-2026',
      location: 'Thông báo 162/TB-HVTTNVN (19/8/2026) — mục 1, bảng "Tại Hà Nội".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-04',
    },
    {
      sourceId: 'vya-thong-tin-tuyen-sinh-2026',
      location: 'Quyết định 218/QĐ-HVTTNVN, mục 4.1/4.2 — mã ngành và tổ hợp xét tuyển.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-04',
    },
  ],
};
