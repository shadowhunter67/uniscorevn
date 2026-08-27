import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool } from '../../evaluation/schoolEvaluation';
import { evaluateHumgThptExamAdmission, evaluateHumgThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('HUMG THPT threshold-only method 2026', () => {
  it('needs a program to conclude and stays partial', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };
    const result = evaluateHumgThptExamAdmission(profile, a00Context);
    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'humg-program' }));
  });

  it('routes through the generic dispatcher as partial once an exact method exists', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };
    expect(evaluateSchool(profile, 'humg', { context: a00Context }).status).toBe('partial');
  });
});

describe('HUMG THPT exact calculator 2026', () => {
  it('requires a selected program to resolve the per-major threshold', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };
    const result = evaluateHumgThptExamExactAdmission(profile, a00Context);
    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'humg-program' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5 } } };
    const result = evaluateHumgThptExamExactAdmission(profile, { ...a00Context, programId: '7520121' });
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'humg-thpt-chemistry' }));
  });

  it('15/30 program: total 15 is eligible with an exact final score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };
    const result = evaluateHumgThptExamExactAdmission(profile, { ...a00Context, programId: '7520121' });
    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toEqual({ value: 15, scale: 30 });
  });

  it('19/30 program (CNTT): total 15 is ineligible, still returns exact score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };
    const result = evaluateHumgThptExamExactAdmission(profile, { ...a00Context, programId: '7480201' });
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score).toEqual({ value: 15, scale: 30 });
  });

  it('adds bonus inside the 30 cap, then priority on top (per the published formula)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } }, priority: { region: 'KV1', category: 'UT1' } };
    const result = evaluateHumgThptExamExactAdmission(profile, { ...a00Context, programId: '7520121', bonus30: 1 });
    // min(30, 15 + 1) + 2.75 = 18.75
    expect(result.score).toEqual({ value: 18.75, scale: 30 });
  });

  it('reduces priority when the 3-subject total is at/above 22.5', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } }, priority: { region: 'KV1' } };
    const result = evaluateHumgThptExamExactAdmission(profile, { ...a00Context, programId: '7520121' });
    // raw 24 >= 22.5 -> priority = (30-24)/7.5 * 0.75 = 0.6 ; final min(30,24) + 0.6 = 24.6
    expect(result.score).toEqual({ value: 24.6, scale: 30 });
  });
});
