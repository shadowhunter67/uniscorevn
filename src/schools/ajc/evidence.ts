import type { SourcedRule } from '../../core/evidence';

export const ajcExactFormulaEvidence = {
  value:
    'Nhóm hệ số (thang 40): Điểm xét tuyển = Tổng điểm 3 môn (đã nhân hệ số) + [(Điểm cộng + Điểm ưu tiên)×4/3]. Nhóm không hệ số (thang 30): Điểm xét tuyển = Tổng điểm 3 môn + Điểm cộng + Điểm ưu tiên.',
  evidence: [
    {
      sourceId: 'ajc-admission-2026',
      location: 'Đối chiếu chéo công thức điểm xét tuyển AJC 2026 (tuyensinh247, khớp trích dẫn "Điểm cộng + Điểm ưu tiên" đã ghi trong knowledgeGaps từ nguồn AJC gốc)',
      verification: 'cross-checked' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
} satisfies SourcedRule<string>;
