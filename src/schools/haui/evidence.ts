import type { SourcedRule } from '../../core/evidence';

export const hauiThptExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (phương thức 3, thi TN THPT) = tổng điểm 3 môn thi tốt nghiệp THPT theo tổ hợp xét tuyển (thang 30, không nhân hệ số) + điểm ưu tiên khu vực/đối tượng (judgment call chuẩn quốc gia — nguồn im lặng về điểm ưu tiên ở mục phương thức 3). Mức điểm điều kiện đăng ký xét tuyển so với TỔNG THÔ (không cộng ưu tiên).',
  evidence: [
    {
      sourceId: 'haui-threshold-2026',
      location:
        'haui.edu.vn, "Ngưỡng đảm bảo chất lượng đầu vào và Quy tắc quy đổi điểm xét tuyển..." (06-07-2026), mục I.1',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-29',
    },
  ],
} satisfies SourcedRule<string>;

export const hauiPerMajorThresholdEvidence = {
  ruleId: 'haui-per-major-threshold-2026',
  evidence: [
    {
      sourceId: 'haui-threshold-2026',
      location: 'Bảng ngưỡng đảm bảo chất lượng đầu vào phương thức 3 theo mã xét tuyển — 72 mã, mức điểm 17,00-20,00/30.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-29',
    },
  ],
};
