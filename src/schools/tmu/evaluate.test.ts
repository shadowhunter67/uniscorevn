import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateTmuThptExamAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('TMU THPT exact calculator 2025', () => {
  it('marks a profile below the threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateTmuThptExamAdmission(profile, a00Context);

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(15);
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'tmu-threshold-2025' }));
  });

  it('marks a profile at the threshold as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 6 } } };

    const result = evaluateTmuThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(20);
  });

  it('applies priority points before comparing to the single flat threshold', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 7 } }, priority: { region: 'KV1' } };

    const result = evaluateTmuThptExamAdmission(profile, a00Context);

    expect(result.score?.value).toBe(19.75);
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };

    const result = evaluateTmuThptExamAdmission(profile);

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'tmu-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7 } } };

    const result = evaluateTmuThptExamAdmission(profile, a00Context);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'tmu-thpt-chemistry' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    expect(evaluateSchool(profile, 'tmu', { context: a00Context }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['tmu'], { tmu: a00Context })[0].status).toBe('calculated');
  });
});
