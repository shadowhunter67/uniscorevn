import type { SourcedRule } from '../../core/evidence';

export const pyuExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (nhánh xét kết quả thi TN THPT 2026) = tổng điểm thô 3 môn theo tổ hợp (thang 30, không hệ số) + điểm ưu tiên khu vực/đối tượng. Bảng "Thông báo điểm trúng tuyển Đại học hệ chính quy năm 2026 (đợt 1)" (Quyết định số 497/QĐ-ĐHPY) trình bày cột "Điểm thi tốt nghiệp THPT" thang 30 không hệ số, song song cột "Điểm học bạ THPT" và cột "Điểm thi ĐGNL ĐHQG TP.HCM" (module này KHÔNG dùng 2 cột đó).',
  evidence: [
    {
      sourceId: 'pyu-cutoff-2026',
      location: 'Thông báo điểm trúng tuyển Đại học hệ chính quy năm 2026 (đợt 1), Quyết định số 497/QĐ-ĐHPY (10/8/2026) — cột "Điểm thi tốt nghiệp THPT".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-16',
    },
  ],
} satisfies SourcedRule<string>;

export const pyuFieldThresholdEvidence = {
  ruleId: 'pyu-field-threshold-2026',
  evidence: [
    {
      sourceId: 'pyu-cutoff-2026',
      location: 'Thông báo điểm trúng tuyển Đại học hệ chính quy năm 2026 (đợt 1) — bảng 11 ngành, mã ngành, tổ hợp môn xét tuyển, đọc bằng vision (chrome-devtools screenshot).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-16',
    },
  ],
};
