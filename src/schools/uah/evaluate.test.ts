import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateUahThptExamAdmission, evaluateUahKtchsThptExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('UAH THPT baseline eligibility 2026', () => {
  it('marks profiles below the common 15/30 baseline as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateUahThptExamAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'uah-floor-score-press-2026' }));
  });

  it('keeps profiles between the baseline and the highest published group floor unresolved', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluateUahThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.eligibility?.reasons.join(' ')).toContain('15');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluateUahThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'uah-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6 } } };

    const result = evaluateUahThptExamAdmission(profile, a00Context);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'uah-thpt-chemistry' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    // School-level support status is now 'verified-calculator' (UAH has an exact method for
    // Kỹ thuật cơ sở hạ tầng) — the generic dispatcher treats a bare threshold-only/no-score result
    // from this OTHER (broad, non-exact) method as 'partial' rather than a confident 'ineligible'.
    expect(evaluateSchool(profile, 'uah', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['uah'], { uah: a00Context })[0].status).toBe('partial');
  });
});

const d01Context = { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };

describe('UAH Kỹ thuật cơ sở hạ tầng exact calculator 2026 (mã 7580210)', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6, english: 6 } } };

    const result = evaluateUahKtchsThptExactAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'uah-ktcsht-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6 } } };

    const result = evaluateUahKtchsThptExactAdmission(profile, d01Context);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'uah-ktcsht-thpt-english' }));
  });

  it('marks totals below 16/30 as ineligible, still returns exact score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };

    const result = evaluateUahKtchsThptExactAdmission(profile, d01Context);

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(15);
  });

  it('marks totals at or above 16/30 as eligible with exact final score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 5, english: 5 } } };

    const result = evaluateUahKtchsThptExactAdmission(profile, d01Context);

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toEqual({ value: 16, scale: 30 });
  });

  it('adds region/category priority to the final score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 5, english: 5 } }, priority: { region: 'KV1', category: 'UT1' } };

    const result = evaluateUahKtchsThptExactAdmission(profile, d01Context);

    expect(result.score).toEqual({ value: 18.75, scale: 30 });
  });

  it('caps the final score at 30', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 10, literature: 10, english: 9.9 } }, priority: { region: 'KV1', category: 'UT1' } };

    const result = evaluateUahKtchsThptExactAdmission(profile, d01Context);

    expect(result.score!.value).toBeLessThanOrEqual(30);
  });
});
