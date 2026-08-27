import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool } from '../../evaluation/schoolEvaluation';
import { evaluateVmuThptExamAdmission, evaluateVmuThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('VMU PT1 threshold-only method 2026', () => {
  it('stays partial and asks for a program group', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };
    const result = evaluateVmuThptExamAdmission(profile, a00Context);
    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'vmu-program-group' }));
  });

  it('routes through the generic dispatcher as partial once an exact method exists', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };
    expect(evaluateSchool(profile, 'vmu', { context: a00Context }).status).toBe('partial');
  });
});

describe('VMU PT1 exact calculator 2026', () => {
  it('requires a subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };
    const result = evaluateVmuThptExamExactAdmission(profile);
    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'vmu-subject-combination' }));
  });

  it('drops to partial for D127 (Vẽ mỹ thuật pre-screening)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };
    const result = evaluateVmuThptExamExactAdmission(profile, { ...a00Context, programId: 'D127' });
    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'vmu-program-out-of-scope' }));
  });

  it('total below 15 is ineligible, still returns an exact score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };
    const result = evaluateVmuThptExamExactAdmission(profile, a00Context);
    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score).toEqual({ value: 12, scale: 30 });
  });

  it('total at/above the 15/30 floor: exact score, eligibility unknown (per-group threshold unverified)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };
    const result = evaluateVmuThptExamExactAdmission(profile, a00Context);
    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('unknown');
    expect(result.score).toEqual({ value: 18, scale: 30 });
  });

  it('adds standard priority to the raw total', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } }, priority: { region: 'KV1', category: 'UT1' } };
    const result = evaluateVmuThptExamExactAdmission(profile, a00Context);
    // raw 18 (<22.5, no reduction) + 2.75 = 20.75
    expect(result.score).toEqual({ value: 20.75, scale: 30 });
  });
});
