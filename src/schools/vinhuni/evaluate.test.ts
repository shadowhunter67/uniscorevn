import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool } from '../../evaluation/schoolEvaluation';
import { evaluateVinhuniThptExamAdmission, evaluateVinhuniThptExamExactAdmission } from './evaluate';

const a00 = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };
const c00 = { subjectContext: { combinationId: 'C00', subjects: ['literature', 'history', 'geography'] as const } };

describe('VinhUni PT100 threshold-only method 2026', () => {
  it('routes through the generic dispatcher as partial once an exact method exists', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };
    expect(evaluateVinhuniThptExamAdmission(profile, a00).confidence).toBe('partial');
    expect(evaluateSchool(profile, 'vinhuni', { context: a00 }).status).toBe('partial');
  });
});

describe('VinhUni PT100 exact calculator 2026', () => {
  it('requires a program to resolve the per-major threshold', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };
    const result = evaluateVinhuniThptExamExactAdmission(profile, a00);
    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'vinhuni-program' }));
  });

  it('15/30 program: total 15 is eligible with an exact final score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };
    const result = evaluateVinhuniThptExamExactAdmission(profile, { ...a00, programId: '7620105' });
    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toEqual({ value: 15, scale: 30 });
  });

  it('19.5/30 program (CNTT): total 15 is ineligible, still returns an exact score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };
    const result = evaluateVinhuniThptExamExactAdmission(profile, { ...a00, programId: '7480201' });
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score).toEqual({ value: 15, scale: 30 });
  });

  it('a subject score of 1.0 or below fails the registration condition', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 10, physics: 10, chemistry: 1 } } };
    const result = evaluateVinhuniThptExamExactAdmission(profile, { ...a00, programId: '7620105' });
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.eligibility?.reasons.some((r) => r.includes('≤ 1,0'))).toBe(true);
  });

  it('Luật: enforces the Ngữ văn ≥ 6 extra condition', () => {
    const ok: ApplicantProfile = { thpt: { scores: { literature: 7, history: 7, geography: 7 } } };
    expect(evaluateVinhuniThptExamExactAdmission(ok, { ...c00, programId: '7380101' }).eligibility?.status).toBe('eligible');

    const badLit: ApplicantProfile = { thpt: { scores: { literature: 5.5, history: 8, geography: 8 } } };
    expect(evaluateVinhuniThptExamExactAdmission(badLit, { ...c00, programId: '7380101' }).eligibility?.status).toBe('ineligible');
  });

  it('adds standard priority (with the ≥22.5 reduction) to the score', () => {
    const below: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } }, priority: { region: 'KV1' } };
    expect(evaluateVinhuniThptExamExactAdmission(below, { ...a00, programId: '7620105' }).score).toEqual({ value: 15.75, scale: 30 });

    const above: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } }, priority: { region: 'KV1' } };
    // raw 24 >= 22.5 -> priority = (30-24)/7.5 * 0.75 = 0.6 ; final 24 + 0.6 = 24.6
    expect(evaluateVinhuniThptExamExactAdmission(above, { ...a00, programId: '7620105' }).score).toEqual({ value: 24.6, scale: 30 });
  });
});
