import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateHulAdmission, evaluateHulExactThptAdmission } from './evaluate';

const c00Context = { subjectContext: { combinationId: 'C00', subjects: ['literature', 'history', 'geography'] as const } };

describe('HUL THPT baseline eligibility 2026', () => {
  it('marks profiles below the 20/30 baseline as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 6, history: 6, geography: 6 } } };

    const result = evaluateHulAdmission(profile, c00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 6, history: 6, geography: 6 } } };

    // School-level support status is now 'verified-calculator' (HUL has an exact method) — the
    // generic dispatcher treats a bare threshold-only/no-score result from this OTHER (broad,
    // non-exact) method as 'partial' rather than a confident 'ineligible'.
    expect(evaluateSchool(profile, 'hul', { context: c00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['hul'], { hul: c00Context })[0].status).toBe('partial');
  });
});

describe('HUL THPT exact calculator 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 7, history: 7, geography: 7 } } };

    const result = evaluateHulExactThptAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hul-exact-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 7, history: 7 } } };

    const result = evaluateHulExactThptAdmission(profile, c00Context);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'hul-exact-thpt-geography' }));
  });

  it('marks totals below 20/30 as ineligible, still returns exact score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 6, history: 6, geography: 6 } } };

    const result = evaluateHulExactThptAdmission(profile, c00Context);

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(18);
  });

  it('marks totals at or above 20/30 as eligible with exact final score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 7, history: 7, geography: 7 } } };

    const result = evaluateHulExactThptAdmission(profile, c00Context);

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toEqual({ value: 21, scale: 30 });
  });

  it('adds region/category priority and optional bonus to the final score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 7, history: 7, geography: 7 } }, priority: { region: 'KV1', category: 'UT1' } };

    const result = evaluateHulExactThptAdmission(profile, { ...c00Context, bonus30: 1.5 });

    expect(result.score).toEqual({ value: 25.25, scale: 30 });
  });

  it('caps the final score at 30', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 10, history: 10, geography: 9.9 } }, priority: { region: 'KV1', category: 'UT1' } };

    const result = evaluateHulExactThptAdmission(profile, { ...c00Context, bonus30: 3 });

    expect(result.score!.value).toBeLessThanOrEqual(30);
  });
});
