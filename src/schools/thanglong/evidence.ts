import type { SourcedRule } from '../../core/evidence';

export const thanglongExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (phương thức 1, xét kết quả thi TN THPT 2025) = tổng điểm thô 3 môn theo tổ hợp (thang 30, không hệ số) + điểm ưu tiên khu vực/đối tượng. Điểm trúng tuyển công bố theo NGÀNH áp dụng cho tổ hợp gốc của nhóm ngành đó (`combos.ts`); nếu thí sinh dùng tổ hợp khác trong cùng nhóm, điểm trúng tuyển hiệu lực = điểm trúng tuyển tổ hợp gốc + mức chênh lệch tổ hợp (Thông báo 25072301/TB-ĐHTL). Mức điểm ưu tiên cụ thể theo KV/ĐT không được trường công bố riêng — dùng khung quốc gia hiện hành làm judgment call cho giá trị bảng.',
  evidence: [
    {
      sourceId: 'thanglong-combo-delta-2025',
      location: 'Thông báo số 25072301/TB-ĐHTL (23/7/2025), mục 1 "Mức điểm chênh lệch giữa các tổ hợp xét tuyển".',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
  ],
} satisfies SourcedRule<string>;

export const thanglongFieldThresholdEvidence = {
  ruleId: 'thanglong-field-threshold-2025',
  evidence: [
    {
      sourceId: 'thanglong-threshold-2025',
      location: 'Thông báo số 25082205/TB-ĐHTL (22/8/2025) — PDF gốc, chữ ký + con dấu Hội đồng tuyển sinh, đọc bằng vision.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
    {
      sourceId: 'thanglong-combo-delta-2025',
      location: 'Thông báo số 25072301/TB-ĐHTL (23/7/2025) — bảng nhóm ngành theo tổ hợp gốc + mức chênh lệch, dùng để quy đổi điểm trúng tuyển sang tổ hợp khác.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
  ],
};
