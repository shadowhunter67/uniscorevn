import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateUtmAdmission, evaluateUtmThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('UTM THPT threshold eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 5, chemistry: 5 } } };

    const result = evaluateUtmAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'utm-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 5 } } };

    const result = evaluateUtmAdmission(profile, a00Context);

    expect(result.missingInputs).toHaveLength(1);
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'utm-thpt-chemistry' }));
  });

  it('marks totals below 15/30 as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateUtmAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'utm-threshold-2026' }));
  });

  it('marks totals at or above 15/30 as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateUtmAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('eligible');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    // Adapter used for /compare is still the threshold-only branch (confidence 'partial', no
    // score); the school is now 'verified-calculator' at the capability level (exact branch
    // exists), so classifyEvaluation downgrades this route to 'partial' — same as dainam/uedudn.
    expect(evaluateSchool(profile, 'utm', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['utm'], { utm: a00Context })[0].status).toBe('partial');
  });
});

describe('UTM THPT exact admission 2026 (utm-thpt-exam-exact-2026)', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 5, chemistry: 5 } } };

    const result = evaluateUtmThptExamExactAdmission(profile);

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'utm-exact-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 5 } } };

    const result = evaluateUtmThptExamExactAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'utm-exact-thpt-chemistry' }));
  });

  it('total below 15/30 -> ineligible, exact-verified, score still computed', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateUtmThptExamExactAdmission(profile, a00Context);

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score).toEqual({ value: 12, scale: 30 });
  });

  it('total at 15/30, no priority declared -> eligible, score = raw', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateUtmThptExamExactAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toEqual({ value: 15, scale: 30 });
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'utm-threshold-2026' }));
  });

  it('adds standard national priority points when declared', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } }, priority: { region: 'KV1', category: 'UT2' } };

    const result = evaluateUtmThptExamExactAdmission(profile, a00Context);

    expect(result.score).toEqual({ value: 19.75, scale: 30 });
  });
});
