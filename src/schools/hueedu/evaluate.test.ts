import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool } from '../../evaluation/schoolEvaluation';
import { evaluateHueeduAdmission, evaluateHueeduThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('HUED THPT baseline threshold 2026', () => {
  it('marks totals below the lowest published band as ineligible (broad method)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };
    const result = evaluateHueeduAdmission(profile, a00Context);
    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('routes through the generic dispatcher as partial once an exact method exists', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };
    expect(evaluateSchool(profile, 'hueedu', { context: a00Context }).status).toBe('partial');
  });
});

describe('HUED THPT exact calculator 2026 (non-teacher programs)', () => {
  it('requires an in-scope program', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };
    const result = evaluateHueeduThptExamExactAdmission(profile, a00Context);
    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'hueedu-program' }));
  });

  it('drops to partial for a teacher-training program (out of exact scope)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };
    const result = evaluateHueeduThptExamExactAdmission(profile, { ...a00Context, programId: '7140209' });
    expect(result.confidence).toBe('partial');
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6 } } };
    const result = evaluateHueeduThptExamExactAdmission(profile, { ...a00Context, programId: '7310403' });
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'hueedu-thpt-chemistry' }));
  });

  it('total 18 clears the 16/30 threshold with an exact final score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };
    const result = evaluateHueeduThptExamExactAdmission(profile, { ...a00Context, programId: '7480104' });
    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toEqual({ value: 18, scale: 30 });
  });

  it('total 15 is below the 16/30 threshold, still returns an exact score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };
    const result = evaluateHueeduThptExamExactAdmission(profile, { ...a00Context, programId: '7310403' });
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score).toEqual({ value: 15, scale: 30 });
  });

  it('adds region/category priority and optional bonus to the final score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } }, priority: { region: 'KV1', category: 'UT1' } };
    const result = evaluateHueeduThptExamExactAdmission(profile, { ...a00Context, programId: '7310403', bonus30: 1.5 });
    expect(result.score).toEqual({ value: 22.25, scale: 30 });
  });
});
