import type { SourcedRule } from '../../core/evidence';

export const stuExactFormulaEvidence = {
  value:
    'PT02 STU 2026: Điểm xét tuyển chưa ưu tiên = điểm 3 môn thi tốt nghiệp THPT trong tổ hợp, thang 30. Module cộng điểm ưu tiên KV/ĐT theo khung quốc gia hiện hành (judgment call) roi so với điểm chuẩn PT02 chính thức.',
  evidence: [
    {
      sourceId: 'stu-admission-methods-2026',
      location: 'Homepage tuyen sinh 2026, mức "Phương thức 02: Xet tuyen Điểm thi tốt nghiệp THPT năm 2026".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-26',
    },
  ],
} satisfies SourcedRule<string>;

export const stuFieldThresholdEvidence = {
  ruleId: 'stu-field-threshold-2026',
  evidence: [
    {
      sourceId: 'stu-cutoff-2026',
      location: 'Bang "Điểm chuẩn trúng tuyển theo từng ngành", cot PT02, 20 ngành.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-26',
    },
  ],
};

export const stuSubjectRequirementEvidence = {
  ruleId: 'stu-subject-requirement-2026',
  evidence: [
    {
      sourceId: 'stu-admission-methods-2026',
      location: 'Homepage tuyen sinh 2026, PT02, mức "Điều kiện khác".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-26',
    },
  ],
};
