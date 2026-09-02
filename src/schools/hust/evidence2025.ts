import type { SourcedRule } from '../../core/evidence';

export const hustExactFormulaEvidence2025 = {
  value:
    'Điểm xét (ĐX, nhánh xét kết quả thi TN THPT 2025) — công thức chính thức ts.hust.edu.vn: (a) Tổ hợp KHÔNG có môn chính: ĐX = (Môn 1 + Môn 2 + Môn 3) + Điểm ưu tiên (thang 30). (b) Tổ hợp CÓ môn chính: ĐX = [(Môn 1 + Môn 2 + Môn 3 + Môn chính) x 3/4] + Điểm ưu tiên (thang 30). Điểm chuẩn công bố theo chương trình/tổ hợp đã ở thang ĐX này. Mức điểm ưu tiên cụ thể theo KV/ĐT không được trang nêu — dùng khung quốc gia hiện hành làm judgment call cho giá trị bảng.',
  evidence: [
    {
      sourceId: 'hust-formula-official-2025',
      location: 'Trang "Điểm chuẩn cao nhất ĐH Bách khoa Hà Nội 2025..." (ts.hust.edu.vn) — mục công thức Điểm xét (a)/(b)/(c)/(d)/(e) và footnote điểm ưu tiên.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
  ],
} satisfies SourcedRule<string>;

export const hustFieldThresholdEvidence2025 = {
  ruleId: 'hust-field-threshold-2025',
  evidence: [
    {
      sourceId: 'hust-threshold-2025',
      location: 'Điểm chuẩn theo chương trình đào tạo x nhóm tổ hợp — nhánh thi TN THPT 2025 (thang 30, Điểm xét, đã gồm ưu tiên).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
    {
      sourceId: 'hust-threshold-secondary-2025',
      location: 'Cross-check độc lập qua báo chí (vnexpress/nhandan/chinhphu.vn) — khớp đúng 3 mức cao nhất (29,39 IT-E10; 29,19 IT1; 28,48 EE2) và mức thấp nhất (19,00 TROY-BA).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
  ],
};
