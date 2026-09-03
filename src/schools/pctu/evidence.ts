import type { SourcedRule } from '../../core/evidence';

export const pctuExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (nhánh xét điểm thi TN THPT 2025, PT2) = ĐM1 + ĐM2 + ĐM3 (điểm thô 3 môn theo tổ hợp, không nhân hệ số) + Điểm ƯT (điểm ưu tiên khu vực/đối tượng theo Quy chế tuyển sinh hiện hành). Nguồn chính thức pctu.edu.vn trích nguyên văn "Điểm xét tuyển = ĐM1 + ĐM2 + ĐM3 + Điểm ƯT". Mức điểm ưu tiên cụ thể không được trường công bố riêng — dùng khung quốc gia hiện hành làm judgment call cho giá trị bảng.',
  evidence: [
    {
      sourceId: 'pctu-admission-info-2025',
      location: 'Thông tin tuyển sinh đại học năm 2025, mục Phương thức 2 (xét điểm thi TN THPT) — pctu.edu.vn.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
  ],
} satisfies SourcedRule<string>;

export const pctuFieldThresholdEvidence = {
  ruleId: 'pctu-field-threshold-2025',
  evidence: [
    {
      sourceId: 'pctu-threshold-2025',
      location: 'Bảng "Điểm chuẩn trúng tuyển đại học 2025" theo ngành, cột Điểm thi THPT (PT2, PT4) — ảnh công bố trên pctu.edu.vn.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
  ],
};
