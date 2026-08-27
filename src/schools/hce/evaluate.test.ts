import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateHceAdmission, evaluateHceKinhTeThptAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('HCE THPT baseline eligibility 2026', () => {
  it('marks profiles below the common 15/30 baseline as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateHceAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    // School-level support status is now 'verified-calculator' (HCE has an exact method for
    // Trường Đại học Kinh tế) — the generic dispatcher treats a bare threshold-only/no-score result
    // from this OTHER (broad, non-exact) method as 'partial' rather than a confident 'ineligible'.
    expect(evaluateSchool(profile, 'hce', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['hce'], { hce: a00Context })[0].status).toBe('partial');
  });
});

describe('HCE Kinh tế THPT exact calculator 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateHceKinhTeThptAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hce-kinhte-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5 } } };

    const result = evaluateHceKinhTeThptAdmission(profile, a00Context);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'hce-kinhte-thpt-chemistry' }));
  });

  it('standard group: marks totals below 15/30 as ineligible, still returns exact score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateHceKinhTeThptAdmission(profile, a00Context);

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(12);
  });

  it('standard group: marks totals at or above 15/30 as eligible with exact final score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateHceKinhTeThptAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toEqual({ value: 15, scale: 30 });
  });

  it('elevated group: uses the 17/30 threshold', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateHceKinhTeThptAdmission(profile, { ...a00Context, group: 'elevated' });

    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('adds region/category priority and optional bonus to the final score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } }, priority: { region: 'KV1', category: 'UT1' } };

    const result = evaluateHceKinhTeThptAdmission(profile, { ...a00Context, bonus30: 1.5 });

    expect(result.score).toEqual({ value: 19.25, scale: 30 });
  });

  it('caps the final score at 30', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 10, physics: 10, chemistry: 9.9 } }, priority: { region: 'KV1', category: 'UT1' } };

    const result = evaluateHceKinhTeThptAdmission(profile, { ...a00Context, bonus30: 3 });

    expect(result.score!.value).toBeLessThanOrEqual(30);
  });
});
