import type { SourcedRule } from '../../core/evidence';

export const stuExactFormulaEvidence = {
  value:
    'PT02 STU 2026: Diem xet tuyen chua uu tien = diem 3 mon thi tot nghiep THPT trong to hop, thang 30. Module cong diem uu tien KV/DT theo khung quoc gia hien hanh (judgment call) roi so voi diem chuan PT02 chinh thuc.',
  evidence: [
    {
      sourceId: 'stu-admission-methods-2026',
      location: 'Homepage tuyen sinh 2026, muc "Phuong thuc 02: Xet tuyen Diem thi tot nghiep THPT nam 2026".',
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
      location: 'Bang "Diem chuan trung tuyen theo tung nganh", cot PT02, 20 nganh.',
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
      location: 'Homepage tuyen sinh 2026, PT02, muc "Dieu kien khac".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-26',
    },
  ],
};
