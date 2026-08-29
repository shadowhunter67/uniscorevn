import type { SourcedRule } from '../../core/evidence';

export const cmcuThptExactFormulaEvidence = {
  value:
    'Điểm sàn nhận hồ sơ xét tuyển (phương thức thi TN THPT) = môn chính (nhân hệ số 2) + 2 môn bất kỳ, thang 40. Môn chính là Toán cho 8/9 lĩnh vực/ngành, riêng Truyền thông Đa phương tiện cho phép chọn Toán hoặc Ngữ văn. Điểm ưu tiên khu vực/đối tượng: nguồn im lặng — dùng judgment call chuẩn quốc gia, quy đổi ×4/3 sang thang 40.',
  evidence: [
    {
      sourceId: 'cmcu-threshold-2026',
      location:
        'cmcu.edu.vn, bảng "Điểm sàn theo các phương thức xét tuyển năm 2026 của Trường Đại học CMC" (ảnh Thong-bao-diem-san-nop-ho-so-xet-tuyen-Truong-Dai-hoc-CMC-2026.webp), cột "Điểm sàn 2026 đối với Điểm thi tốt nghiệp THPT (thang điểm 40)"',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-30',
    },
  ],
} satisfies SourcedRule<string>;

export const cmcuFieldThresholdEvidence = {
  ruleId: 'cmcu-field-threshold-2026',
  evidence: [
    {
      sourceId: 'cmcu-threshold-2026',
      location: 'Bảng điểm sàn theo lĩnh vực/ngành, cột thi TN THPT 2026 (thang 40).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-30',
    },
  ],
};
