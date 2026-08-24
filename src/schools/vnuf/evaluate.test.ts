import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateVnufThptExamAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('VNUF THPT baseline eligibility 2026', () => {
  it('marks profiles below the common 15/30 baseline as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateVnufThptExamAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'vnuf-admission-scheme-2026' }));
  });

  it('marks profiles at or above the common 15/30 baseline as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateVnufThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('eligible');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateVnufThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vnuf-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5 } } };

    const result = evaluateVnufThptExamAdmission(profile, a00Context);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'vnuf-thpt-chemistry' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    expect(evaluateSchool(profile, 'vnuf', { context: a00Context }).status).toBe('ineligible');
    expect(evaluateSchools(profile, ['vnuf'], { vnuf: a00Context })[0].status).toBe('ineligible');
  });
});
