import type { SourcedRule } from '../../core/evidence';

export const bavThptExactFormulaEvidence = {
  value:
    'Điểm xét (phương thức xét điểm thi TN THPT 2026, PTXT4) = tổng điểm thi 3 môn theo tổ hợp xét tuyển của mã xét tuyển đã chọn, trong đó môn chính (Toán) nhân đôi, quy đổi về thang 30 (nhân 30/40) + điểm ưu tiên khu vực/đối tượng (điểm cộng chứng chỉ/thành tích KHÔNG model — xem knowledgeGaps).',
  evidence: [
    {
      sourceId: 'bav-threshold-2026',
      location: 'hvnh.edu.vn, Thông báo 3508/TB-HVNH (07/07/2026), mục 1',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-29',
    },
  ],
} satisfies SourcedRule<string>;

export const bavPerProgramThresholdEvidence = {
  ruleId: 'bav-per-program-threshold-2026',
  evidence: [
    {
      sourceId: 'bav-threshold-2026',
      location: 'Ngưỡng đảm bảo chất lượng đầu vào PTXT4 theo loại chương trình: chuẩn/CLC 21,50/30; liên kết đào tạo quốc tế 19,00/30.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-29',
    },
  ],
};

export const bavProgramCombinationEvidence = {
  ruleId: 'bav-program-combination-2026',
  evidence: [
    {
      sourceId: 'bav-admission-info-2026',
      location: 'Thông tin tuyển sinh 2026 (QĐ 2028/QĐ-HVNH), mục 4 "Số lượng tuyển sinh đại học chính quy" — bảng 45 mã xét tuyển, tổ hợp và môn chính.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-29',
    },
  ],
};
