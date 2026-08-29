import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateHnmuThptExamAdmission, evaluateHnmuThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('HNMU THPT baseline eligibility 2026', () => {
  it('marks profiles below the lowest published band as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateHnmuThptExamAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'hnmu-threshold-2026' }));
  });

  it('keeps profiles between the two published bands unresolved', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluateHnmuThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('unknown');
  });

  it('marks profiles at/above the highest published band as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };

    const result = evaluateHnmuThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('eligible');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };

    const result = evaluateHnmuThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hnmu-subject-combination' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    expect(evaluateSchool(profile, 'hnmu', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['hnmu'], { hnmu: a00Context })[0].status).toBe('partial');
  });
});

describe('HNMU THPT exact per-group calculator 2026', () => {
  it('marks a profile at the "other" group threshold as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 5, chemistry: 5 } } };

    const result = evaluateHnmuThptExamExactAdmission(profile, { groupId: 'other', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(16);
  });

  it('marks a profile below the group threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5.5 } } };

    const result = evaluateHnmuThptExamExactAdmission(profile, { groupId: 'law', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } });

    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(15.5);
  });

  it('requires a selected group', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };

    const result = evaluateHnmuThptExamExactAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hnmu-group' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7 } } };

    const result = evaluateHnmuThptExamExactAdmission(profile, { groupId: 'other', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'hnmu-thpt-chemistry' }));
  });

  it('does not add priority points to the displayed score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 5, chemistry: 5 } }, priority: { region: 'KV1', category: 'UT1' } };

    const result = evaluateHnmuThptExamExactAdmission(profile, { groupId: 'other', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } });

    expect(result.score?.value).toBe(16);
  });
});
