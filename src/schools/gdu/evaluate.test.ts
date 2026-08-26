import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateGduThptExamAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('GDU THPT exact calculator 2026 (nhóm ngành ngoài Sức khỏe/Luật)', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateGduThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'gdu-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5 } } };

    const result = evaluateGduThptExamAdmission(profile, a00Context);

    expect(result.missingInputs).toHaveLength(1);
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'gdu-thpt-chemistry' }));
  });

  it('marks totals below 15/30 as ineligible, still returns exact score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateGduThptExamAdmission(profile, a00Context);

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(12);
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'gdu-quality-threshold-2026' }));
  });

  it('marks totals at or above 15/30 as eligible with exact final score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateGduThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toEqual({ value: 15, scale: 30 });
  });

  it('adds region/category priority to the final score, with diminishing-returns reduction near the cap', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } }, priority: { region: 'KV1', category: 'UT1' } };

    const result = evaluateGduThptExamAdmission(profile, a00Context);

    expect(result.score).toEqual({ value: 17.75, scale: 30 });
  });

  it('caps the final score at 30', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 10, physics: 10, chemistry: 9.9 } }, priority: { region: 'KV1', category: 'UT1' } };

    const result = evaluateGduThptExamAdmission(profile, a00Context);

    expect(result.score!.value).toBeLessThanOrEqual(30);
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    expect(evaluateSchool(profile, 'gdu', { context: a00Context }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['gdu'], { gdu: a00Context })[0].status).toBe('calculated');
  });
});
