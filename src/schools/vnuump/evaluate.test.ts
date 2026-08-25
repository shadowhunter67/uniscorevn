import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateVnuumpThptExamAdmission } from './evaluate';

const b00Context = { subjectContext: { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] as const } };

describe('VNU-UMP THPT baseline eligibility 2026', () => {
  it('marks profiles below the 15/30 floor as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, chemistry: 4, biology: 4 } } };

    const result = evaluateVnuumpThptExamAdmission(profile, b00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'vnuump-admission-notice-2026' }));
  });

  it('marks profiles meeting the floor as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, chemistry: 5, biology: 5 } } };

    const result = evaluateVnuumpThptExamAdmission(profile, b00Context);

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toBeUndefined();
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, chemistry: 5, biology: 5 } } };

    const result = evaluateVnuumpThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vnuump-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, chemistry: 5 } } };

    const result = evaluateVnuumpThptExamAdmission(profile, b00Context);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'vnuump-thpt-biology' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, chemistry: 4, biology: 4 } } };

    expect(evaluateSchool(profile, 'vnuump', { context: b00Context }).status).toBe('ineligible');
    expect(evaluateSchools(profile, ['vnuump'], { vnuump: b00Context })[0].status).toBe('ineligible');
  });
});
