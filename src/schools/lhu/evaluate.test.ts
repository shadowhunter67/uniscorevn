import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateLhuAdmission, evaluateLhuThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('LHU THPT threshold eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 5, chemistry: 5 } } };

    const result = evaluateLhuAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'lhu-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 5 } } };

    const result = evaluateLhuAdmission(profile, a00Context);

    expect(result.missingInputs).toHaveLength(1);
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'lhu-thpt-chemistry' }));
  });

  it('marks totals below 15/30 as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateLhuAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'lhu-threshold-2026' }));
  });

  it('marks totals at or above 15/30 as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateLhuAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('eligible');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    expect(evaluateSchool(profile, 'lhu', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['lhu'], { lhu: a00Context })[0].status).toBe('partial');
  });
});

describe('LHU THPT exact admission 2026 (lhu-thpt-exam-exact-2026)', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 5, chemistry: 5 } } };

    const result = evaluateLhuThptExamExactAdmission(profile);

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'lhu-exact-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 5 } } };

    const result = evaluateLhuThptExamExactAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'lhu-exact-thpt-chemistry' }));
  });

  it('total below 15/30 -> ineligible, exact-verified, score still computed', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateLhuThptExamExactAdmission(profile, a00Context);

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score).toEqual({ value: 12, scale: 30 });
  });

  it('total at 15/30, no priority declared -> eligible, score = raw', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateLhuThptExamExactAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toEqual({ value: 15, scale: 30 });
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'lhu-threshold-2026' }));
  });

  it('adds standard national priority points when declared', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } }, priority: { region: 'KV1', category: 'UT2' } };

    const result = evaluateLhuThptExamExactAdmission(profile, a00Context);

    expect(result.score).toEqual({ value: 19.75, scale: 30 });
  });
});
