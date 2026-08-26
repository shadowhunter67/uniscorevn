import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateCtumpThptExamAdmission } from './evaluate';

const combo = { subjectContext: { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] as const } };
const tier22 = { ...combo, group: 'tier22' as const };
const tier15 = { ...combo, group: 'tier15' as const };

describe('CTUMP THPT-exam eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, chemistry: 6, biology: 6 } } };

    const result = evaluateCtumpThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'ctump-subject-combination' }));
  });

  it('applies the 15/30 lowest-tier floor by default', () => {
    const below: ApplicantProfile = { thpt: { scores: { math: 4, chemistry: 5, biology: 5.5 } } };
    const at: ApplicantProfile = { thpt: { scores: { math: 5, chemistry: 5, biology: 5 } } };

    expect(evaluateCtumpThptExamAdmission(below, tier15).eligibility?.status).toBe('ineligible');
    expect(evaluateCtumpThptExamAdmission(at, tier15).eligibility?.status).toBe('eligible');
  });

  it('applies the highest 22/30 tier22 floor (Y khoa/Răng hàm mặt)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, chemistry: 7, biology: 7 } } };

    const result = evaluateCtumpThptExamAdmission(profile, tier22);

    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'ctump-quality-threshold-2026' }));
  });

  it('marks eligible at exactly the 22/30 floor', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, chemistry: 7, biology: 7 } } };

    expect(evaluateCtumpThptExamAdmission(profile, tier22).eligibility?.status).toBe('eligible');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, chemistry: 5, biology: 5 } } };

    expect(evaluateSchool(profile, 'ctump', { context: tier15 }).status).toBe('eligible');
    expect(evaluateSchools(profile, ['ctump'], { ctump: tier15 })[0].status).toBe('eligible');
  });
});
