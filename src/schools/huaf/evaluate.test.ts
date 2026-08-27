import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool } from '../../evaluation/schoolEvaluation';
import { evaluateHuafAdmission, evaluateHuafThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('HUAF transcript co-requisite threshold 2026', () => {
  it('marks THPT totals below the 15/30 co-requisite as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };
    const result = evaluateHuafAdmission(profile, a00Context);
    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('routes through the generic dispatcher as partial once an exact method exists', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };
    expect(evaluateSchool(profile, 'huaf', { context: a00Context }).status).toBe('partial');
  });
});

describe('HUAF THPT exact calculator 2026', () => {
  it('requires a selected program to resolve the per-major threshold', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };
    const result = evaluateHuafThptExamExactAdmission(profile, a00Context);
    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'huaf-program' }));
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };
    const result = evaluateHuafThptExamExactAdmission(profile, { programId: '7340116' });
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'huaf-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5 } } };
    const result = evaluateHuafThptExamExactAdmission(profile, { ...a00Context, programId: '7340116' });
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'huaf-thpt-chemistry' }));
  });

  it('15/30 program: total 15 is eligible with an exact final score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };
    const result = evaluateHuafThptExamExactAdmission(profile, { ...a00Context, programId: '7340116' });
    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toEqual({ value: 15, scale: 30 });
  });

  it('17/30 program (Thú y): total 15 is ineligible, still returns exact score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };
    const result = evaluateHuafThptExamExactAdmission(profile, { ...a00Context, programId: '7640101' });
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score).toEqual({ value: 15, scale: 30 });
  });

  it('adds region/category priority and optional bonus to the final score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } }, priority: { region: 'KV1', category: 'UT1' } };
    const result = evaluateHuafThptExamExactAdmission(profile, { ...a00Context, programId: '7340116', bonus30: 1.5 });
    expect(result.score).toEqual({ value: 19.25, scale: 30 });
  });
});
