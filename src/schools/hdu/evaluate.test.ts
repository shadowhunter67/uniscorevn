import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool } from '../../evaluation/schoolEvaluation';
import { evaluateHduThptExamAdmission, evaluateHduThptExamExactAdmission } from './evaluate';

const d01 = { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };
const c03 = { subjectContext: { combinationId: 'C03', subjects: ['literature', 'math', 'history'] as const } };

describe('HDU threshold-only method 2026', () => {
  it('needs a program group and stays partial', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6, english: 6 } } };
    const result = evaluateHduThptExamAdmission(profile, d01);
    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'hdu-program-group' }));
  });

  it('routes through the generic dispatcher as partial once an exact method exists', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, literature: 4, english: 4 } } };
    expect(evaluateSchool(profile, 'hdu', { context: d01 }).status).toBe('partial');
  });
});

describe('HDU THPT exact calculator 2026 (Luật / Luật Kinh tế)', () => {
  it('requires an in-scope program', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6, english: 6 } } };
    const result = evaluateHduThptExamExactAdmission(profile, d01);
    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'hdu-program' }));
  });

  it('requires the Ngữ văn score for the extra condition', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, history: 7 } } };
    const result = evaluateHduThptExamExactAdmission(profile, { ...c03, programId: '7380101' });
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'hdu-thpt-literature' }));
  });

  it('total 18 + Ngữ văn 6 clears the Luật threshold with an exact final score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6, english: 6 } } };
    const result = evaluateHduThptExamExactAdmission(profile, { ...d01, programId: '7380101' });
    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toEqual({ value: 18, scale: 30 });
  });

  it('Ngữ văn below 6 fails the extra condition even when the total is high', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, literature: 5.5, english: 7 } } };
    const result = evaluateHduThptExamExactAdmission(profile, { ...d01, programId: '7380107' });
    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('total below 18 is ineligible, still returns an exact score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };
    const result = evaluateHduThptExamExactAdmission(profile, { ...d01, programId: '7380101' });
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score).toEqual({ value: 15, scale: 30 });
  });

  it('adds full priority below the 22.5 pivot', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6, english: 6 } }, priority: { region: 'KV1' } };
    const result = evaluateHduThptExamExactAdmission(profile, { ...d01, programId: '7380101' });
    expect(result.score).toEqual({ value: 18.75, scale: 30 });
  });

  it('reduces priority above the 22.5 pivot per the published formula', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, math: 8, history: 8 } }, priority: { region: 'KV2-NT' } };
    const result = evaluateHduThptExamExactAdmission(profile, { ...c03, programId: '7380101' });
    // A+B = 24 > 22.5 -> C = (30-24)/7.5 * 0.5 = 0.4 ; final 24 + 0.4 = 24.4
    expect(result.score).toEqual({ value: 24.4, scale: 30 });
  });
});
