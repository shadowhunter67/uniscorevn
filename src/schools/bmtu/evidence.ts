import type { SourcedRule } from '../../core/evidence';

export const bmtuExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (phương thức 1 — xét kết quả thi TN THPT 2026) = ĐM1 + ĐM2 + ĐM3 (tổng thô 3 môn theo tổ hợp, thang 30, không hệ số) + Điểm ưu tiên (ƯT Đối tượng + ƯT Khu vực). Nguồn: Đề án/Thông tin tuyển sinh 2026 (Quyết định 396/QĐ-YDBMT), mục 2.1.a.',
  evidence: [
    {
      sourceId: 'bmtu-dean-2026',
      location: 'Đề án/Thông tin tuyển sinh đại học chính quy năm 2026, mục 2.1.a — bmu.edu.vn.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-03',
    },
  ],
} satisfies SourcedRule<string>;

export const bmtuFieldThresholdEvidence = {
  ruleId: 'bmtu-field-threshold-2026',
  evidence: [
    {
      sourceId: 'bmtu-threshold-2026',
      location: 'Điểm chuẩn 2026 công bố 10/8/2026 (phương thức thi TN THPT), theo Báo Thanh Niên đưa tin thông báo chính thức của trường.',
      verification: 'cross-checked' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-03',
    },
    {
      sourceId: 'bmtu-dean-2026',
      location: 'Đề án/Thông tin tuyển sinh 2026, mục 4.2 — bảng tổ hợp xét tuyển và điều kiện phụ theo ngành — bmu.edu.vn.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-03',
    },
  ],
};

export const bmtuHsgBonusEvidence = {
  value: 'Giải HSG quốc gia (Nhất/Nhì/Ba): +3,0 ; Khuyến khích: +1,5. Giải HSG cấp tỉnh/thành: Nhất +1,5 ; Nhì +1,0 ; Ba +0,5.',
  evidence: [
    {
      sourceId: 'bmtu-dean-2026',
      location: 'Đề án/Thông tin tuyển sinh 2026, mục 7 "Chính sách ưu tiên" — bmu.edu.vn.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-03',
    },
  ],
} satisfies SourcedRule<string>;
