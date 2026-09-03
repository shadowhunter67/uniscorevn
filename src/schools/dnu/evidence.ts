import type { SourcedRule } from '../../core/evidence';

export const dnuExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (phương thức xét kết quả thi TN THPT 2025, mã phương thức 100) = tổng thô 3 môn theo tổ hợp (thang 30, không hệ số) + Điểm ưu tiên khu vực/đối tượng + điểm cộng (không có bảng cụ thể, mặc định 0). Nguồn chính thức "Thông tin tuyển sinh năm 2025" (dnpu.edu.vn) mục II.3 xác nhận điểm chuẩn theo ngành áp dụng như nhau cho mọi tổ hợp và phương thức tuyển sinh ("Độ chênh lệch điểm xét tuyển giữa các tổ hợp: = 0. Độ lệch điểm giữa phương thức tuyển sinh: = 0"). Mục II.7 chỉ dẫn chiếu khung điểm ưu tiên quốc gia hiện hành (Thông tư 08/2022/TT-BGDĐT, sửa đổi bởi Thông tư 06/2025/TT-BGDĐT) — không tự công bố mức điểm riêng.',
  evidence: [
    {
      sourceId: 'dnu-thongtin-2025',
      location: 'Thông tin tuyển sinh năm 2025, mục II.3 (Quy tắc quy đổi tương đương) và mục II.7 (Chính sách ưu tiên) — dnpu.edu.vn.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
  ],
} satisfies SourcedRule<string>;

export const dnuFieldThresholdEvidence = {
  ruleId: 'dnu-field-threshold-2025',
  evidence: [
    {
      sourceId: 'dnu-threshold-2025',
      location: 'Quyết định 1408/QĐ-HĐTS (22/8/2025), phụ lục "Danh sách điểm chuẩn trúng tuyển đại học, cao đẳng chính quy năm 2025" — dnpu.edu.vn.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
    {
      sourceId: 'dnu-thongtin-2025',
      location: 'Thông tin tuyển sinh năm 2025, mục 4 (Chỉ tiêu tuyển sinh) và bảng "Danh sách mã xét tuyển theo đợt tuyển" / "Danh sách tổ hợp môn" — dnpu.edu.vn.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
  ],
};
