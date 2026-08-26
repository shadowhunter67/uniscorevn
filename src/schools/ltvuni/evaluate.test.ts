import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateLtvuniThptExamAdmission } from './evaluate';

const combo = { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };
const standard = { ...combo, group: 'standard' as const };
const traditionalMedicine = { ...combo, group: 'traditionalMedicine' as const };

describe('LTVUni THPT-exam eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6, english: 6 } } };

    const result = evaluateLtvuniThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'ltvuni-subject-combination' }));
  });

  it('applies the 15/30 standard floor by default', () => {
    const below: ApplicantProfile = { thpt: { scores: { math: 4, literature: 5, english: 5.5 } } };
    const at: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };

    expect(evaluateLtvuniThptExamAdmission(below, standard).eligibility?.status).toBe('ineligible');
    expect(evaluateLtvuniThptExamAdmission(at, standard).eligibility?.status).toBe('eligible');
  });

  it('applies the higher 20/30 traditionalMedicine floor', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6, english: 6.5 } } };

    const result = evaluateLtvuniThptExamAdmission(profile, traditionalMedicine);

    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'ltvuni-quality-threshold-2026' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };

    expect(evaluateSchool(profile, 'ltvuni', { context: standard }).status).toBe('eligible');
    expect(evaluateSchools(profile, ['ltvuni'], { ltvuni: standard })[0].status).toBe('eligible');
  });
});
