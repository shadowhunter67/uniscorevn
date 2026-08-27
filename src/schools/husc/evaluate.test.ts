import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool } from '../../evaluation/schoolEvaluation';
import { evaluateHuscAdmission, evaluateHuscThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('HUSC THPT baseline eligibility 2026', () => {
  it('marks profiles below the 15/30 baseline as ineligible (broad threshold method)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };
    const result = evaluateHuscAdmission(profile, a00Context);
    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('routes through the generic dispatcher as partial once an exact method exists', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };
    expect(evaluateSchool(profile, 'husc', { context: a00Context }).status).toBe('partial');
  });
});

describe('HUSC THPT exact calculator 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };
    const result = evaluateHuscThptExamExactAdmission(profile);
    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'husc-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5 } } };
    const result = evaluateHuscThptExamExactAdmission(profile, a00Context);
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'husc-thpt-chemistry' }));
  });

  it('drops to partial for an out-of-scope program (vi mạch bán dẫn / Kiến trúc)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 9, physics: 9, chemistry: 9 } } };
    const result = evaluateHuscThptExamExactAdmission(profile, { ...a00Context, programId: '7580101' });
    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'husc-program-out-of-scope' }));
  });

  it('marks totals below 15/30 as ineligible, still returns an exact score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };
    const result = evaluateHuscThptExamExactAdmission(profile, a00Context);
    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score).toEqual({ value: 12, scale: 30 });
  });

  it('marks totals at or above 15/30 as eligible with an exact final score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };
    const result = evaluateHuscThptExamExactAdmission(profile, a00Context);
    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toEqual({ value: 15, scale: 30 });
  });

  it('adds region/category priority and optional bonus to the final score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } }, priority: { region: 'KV1', category: 'UT1' } };
    const result = evaluateHuscThptExamExactAdmission(profile, { ...a00Context, bonus30: 1.5 });
    expect(result.score).toEqual({ value: 19.25, scale: 30 });
  });

  it('caps the final score at 30 and reduces priority near the ceiling', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 10, physics: 10, chemistry: 9.9 } }, priority: { region: 'KV1', category: 'UT1' } };
    const result = evaluateHuscThptExamExactAdmission(profile, { ...a00Context, bonus30: 3 });
    expect(result.score!.value).toBeLessThanOrEqual(30);
  });
});
