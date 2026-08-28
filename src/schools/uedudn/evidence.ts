import type { SourcedRule } from '../../core/evidence';

export const uedudnThptExactFormulaEvidence = {
  value: 'Ngưỡng đầu vào = tổng điểm 3 môn thi TN THPT theo tổ hợp xét tuyển + điểm ưu tiên khu vực, đối tượng',
  evidence: [
    {
      sourceId: 'uedudn-admission-info-2026',
      location: 'tuyensinh.ued.udn.vn, ảnh "ĐIỂM NGƯỠNG ĐẦU VÀO... NĂM 2026 THEO ĐIỂM THI THPT", mục GHI CHÚ',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
} satisfies SourcedRule<string>;
