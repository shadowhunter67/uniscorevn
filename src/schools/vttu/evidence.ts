import type { SourcedRule } from '../../core/evidence';

export const vttuExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (nhánh xét kết quả thi TN THPT/THPT quốc gia 2025, mã xét tuyển 100/101) = tổng điểm thô 3 môn theo tổ hợp (thang 30, không hệ số) + điểm ưu tiên khu vực/đối tượng. Công thức nguyên văn của trường (mục "Quy đổi điểm phương thức xét học bạ sang điểm thi tốt nghiệp THPT") là "Điểm xét tuyển = Đ1 + Đ2 + Đ3 + ĐƯT"; với nhánh thi TN THPT trực tiếp (không quy đổi), Đ1/Đ2/Đ3 là điểm thi thô từng môn.',
  evidence: [
    {
      sourceId: 'vttu-formula-2025',
      location: 'Trường Đại học Võ Trường Toản — ảnh "HƯỚNG DẪN QUY ĐỔI TƯƠNG ĐƯƠNG GIỮA CÁC PHƯƠNG THỨC" (trang chính thức vttu.edu.vn).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
    {
      sourceId: 'vttu-formula-crosscheck-2025',
      location: 'fptshop.com.vn — "Điểm chuẩn Đại học Võ Trường Toản 2025 có cao không?" (nguồn thứ cấp, cross-check mức điểm theo khối ngành).',
      verification: 'cross-checked' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
  ],
} satisfies SourcedRule<string>;

export const vttuFieldThresholdEvidence = {
  ruleId: 'vttu-field-threshold-2025',
  evidence: [
    {
      sourceId: 'vttu-threshold-2025',
      location: 'VTTU — ảnh "CÔNG BỐ MỨC ĐIỂM NHẬN HỒ SƠ XÉT TUYỂN" 2025, đọc bằng vision.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
    {
      sourceId: 'vttu-combination-2025',
      location: 'VTTU — ảnh "NGÀNH TUYỂN SINH, HỌC PHÍ" + "PHƯƠNG THỨC TUYỂN SINH" 2025 (ngành/mã ngành/tổ hợp/chỉ tiêu).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
  ],
};
