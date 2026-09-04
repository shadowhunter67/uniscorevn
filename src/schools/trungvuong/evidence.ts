import type { SourcedRule } from '../../core/evidence';

export const trungvuongExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (Phương thức 2 — xét kết quả thi TN THPT 2025) = ĐXT = TN1 + TN2 + TN3 + Điểm ưu tiên (nếu có), trong đó TN1/TN2/TN3 là kết quả điểm thi TN THPT 2025 của 3 môn thuộc tổ hợp xét tuyển (thang 30, không hệ số). Nguồn chính thức Thông báo 387/TB-ĐHTV (09/06/2025) mục 3.2. Mục 7 "Chính sách ưu tiên" chỉ dẫn chiếu quy chế tuyển sinh của Bộ Giáo dục và Đào tạo — không tự công bố mức điểm riêng.',
  evidence: [
    {
      sourceId: 'trungvuong-thongbao-387-2025',
      location: 'Thông báo 387/TB-ĐHTV, mục 3.2 "Phương thức 2" và mục 7 "Chính sách ưu tiên".',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-04',
    },
  ],
} satisfies SourcedRule<string>;

export const trungvuongFieldThresholdEvidence = {
  ruleId: 'trungvuong-field-threshold-2025',
  evidence: [
    {
      sourceId: 'trungvuong-thongbao-387-2025',
      location: 'Thông báo 387/TB-ĐHTV, mục 1.2 "Ngành đào tạo, tổ hợp xét tuyển, chỉ tiêu tuyển sinh" và "Bảng mã tổ hợp các môn xét tuyển".',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-04',
    },
    {
      sourceId: 'trungvuong-diemchuan-2025-crosscheck',
      location: 'Điểm chuẩn trúng tuyển đợt 1 năm 2025 theo ngành, đối chiếu 3 nguồn độc lập khớp tuyệt đối.',
      verification: 'cross-checked' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-04',
    },
  ],
};
