import type { SourcedRule } from '../../core/evidence';

export const mkuExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (nhánh xét kết quả thi TN THPT 2026) = tổng điểm thô 3 môn theo tổ hợp (thang 30, không hệ số) + điểm ưu tiên khu vực/đối tượng. Cột "Điểm chuẩn điểm thi tốt nghiệp THPT" trong Quyết định 3018/QĐ-ĐHCL trình bày thang 30 không hệ số (song song cột Học bạ thang 30 và cột V-SAT thang điểm riêng của kỳ thi V-SAT, module này KHÔNG dùng cột V-SAT); công thức "tổng 3 môn + điểm ưu tiên" khớp với cách trình bày điểm sàn/điểm chuẩn cùng thang của cả 2 nguồn chính chủ (Quyết định 3018/QĐ-ĐHCL và Thông báo 2613/TB-ĐHCL) và với cross-check thứ cấp tuyensinh247.com dành riêng cho DCL/Đại học Cửu Long.',
  evidence: [
    {
      sourceId: 'mku-cutoff-2026',
      location: 'Quyết định số 3018/QĐ-ĐHCL (10/8/2026), phụ lục "Danh sách điểm chuẩn trúng tuyển" — cột "Điểm chuẩn điểm thi tốt nghiệp THPT".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-03',
    },
    {
      sourceId: 'mku-floor-2026',
      location: 'Thông báo số 2613/TB-ĐHCL (08/7/2026) — "điểm sàn xét tuyển mỗi ngành bằng nhau giữa các tổ hợp xét tuyển", cùng thang điểm.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-03',
    },
  ],
} satisfies SourcedRule<string>;

export const mkuFieldThresholdEvidence = {
  ruleId: 'mku-field-threshold-2026',
  evidence: [
    {
      sourceId: 'mku-cutoff-2026',
      location: 'Quyết định số 3018/QĐ-ĐHCL (10/8/2026) — bảng "Danh sách điểm chuẩn trúng tuyển của các ngành hệ Đại học chính quy năm 2026 – Đợt 1", 42 ngành, đọc trực tiếp text layer PDF.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-03',
    },
    {
      sourceId: 'mku-admission-notice-2026',
      location: 'Thông báo số 2344/TB-ĐHCL (12/6/2026), mục I "Các ngành đào tạo" — bảng mã ngành và tổ hợp môn xét tuyển, đọc bằng vision.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-03',
    },
  ],
};
