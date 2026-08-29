import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateHmuThptExamExactAdmission } from './evaluate';

const b00Context = { selectedProgramId: 'y-khoa', subjectContext: { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] as const } };

describe('HMU THPT exact threshold check 2026', () => {
  it('marks a profile at or above the program threshold as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, chemistry: 8, biology: 8 } } };

    const result = evaluateHmuThptExamExactAdmission(profile, b00Context);

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(24);
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'hmu-threshold-2026' }));
  });

  it('marks a profile below the program threshold as ineligible, ignoring priority points', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, chemistry: 7, biology: 7 } }, priority: { region: 'KV1' } };

    const result = evaluateHmuThptExamExactAdmission(profile, b00Context);

    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(21);
  });

  it('requires a selected program', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, chemistry: 8, biology: 8 } } };

    const result = evaluateHmuThptExamExactAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hmu-program-code' }));
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, chemistry: 8, biology: 8 } } };

    const result = evaluateHmuThptExamExactAdmission(profile, { selectedProgramId: 'y-khoa' });

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hmu-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, chemistry: 8 } } };

    const result = evaluateHmuThptExamExactAdmission(profile, b00Context);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'hmu-thpt-biology' }));
  });

  it('rejects an unknown program id', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, chemistry: 8, biology: 8 } } };

    const result = evaluateHmuThptExamExactAdmission(profile, { ...b00Context, selectedProgramId: 'khong-ton-tai' });

    expect(result.eligibility?.status).toBe('unknown');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, chemistry: 8, biology: 8 } } };

    expect(evaluateSchool(profile, 'hmu', { context: b00Context }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['hmu'], { hmu: b00Context })[0].status).toBe('calculated');
  });
});
