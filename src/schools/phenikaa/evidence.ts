import type { SourcedRule } from '../../core/evidence';

export const phenikaaThptExactFormulaEvidence = {
  value:
    'Điểm xét (phương thức xét kết quả thi TN THPT 2026) = tổng điểm thô 3 môn theo tổ hợp xét tuyển đã chọn, KHÔNG nhân hệ số, KHÔNG cộng điểm cộng — theo đúng câu chữ công bố ("không nhân hệ số, không tính điểm cộng"). Riêng 2 CTĐT tài năng (Khoa học máy tính, Khoa học và công nghệ bán dẫn) KHÔNG cộng điểm ưu tiên khu vực/đối tượng (loại trừ tuyệt đối, không phải judgment call); các ngành/lĩnh vực khác nguồn im lặng về điểm ưu tiên — áp judgment call chuẩn quốc gia cho hiển thị, ngưỡng so với tổng thô.',
  evidence: [
    {
      sourceId: 'phenikaa-threshold-2026',
      location: 'phenikaa-uni.edu.vn, bảng ngưỡng điểm nhận hồ sơ xét tuyển 2026 (ảnh diem-san-dot-1.jpg), cột "Điểm thi tốt nghiệp THPT 2026"',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-29',
    },
  ],
} satisfies SourcedRule<string>;

export const phenikaaFieldThresholdEvidence = {
  ruleId: 'phenikaa-field-threshold-2026',
  evidence: [
    {
      sourceId: 'phenikaa-threshold-2026',
      location: 'Bảng ngưỡng điểm nhận hồ sơ xét tuyển theo lĩnh vực/ngành, cột thi TN THPT 2026 (thang 30).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-29',
    },
  ],
};
