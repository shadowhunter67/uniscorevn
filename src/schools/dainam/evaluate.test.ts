import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateDainamThptExamAdmission, evaluateDainamThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('Dai Nam THPT exam threshold eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 7, chemistry: 6.5 } } };

    const result = evaluateDainamThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'dainam-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 7 } } };

    const result = evaluateDainamThptExamAdmission(profile, a00Context);

    expect(result.missingInputs).toHaveLength(1);
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'dainam-thpt-chemistry' }));
  });

  it('marks totals below 15/30 as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateDainamThptExamAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'dainam-threshold-2026' }));
  });

  it('marks totals at or above 15/30 as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 5, chemistry: 4 } } };

    const result = evaluateDainamThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toBeUndefined();
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 5, chemistry: 4 } } };

    // Adapter used for /compare is still the threshold-only branch (confidence 'partial', no
    // score); the school is now 'verified-calculator' at the capability level (exact branch
    // exists), so classifyEvaluation downgrades this route to 'partial' — same as uedudn/thanhdo.
    expect(evaluateSchool(profile, 'dainam', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['dainam'], { dainam: a00Context })[0].status).toBe('partial');
  });
});

describe('Dai Nam THPT exam exact calculator 2026 (dainam-thpt-exam-exact-2026)', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 7, chemistry: 6.5 } } };

    const result = evaluateDainamThptExamExactAdmission(profile);

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'dainam-exact-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 7 } } };

    const result = evaluateDainamThptExamExactAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'dainam-exact-thpt-chemistry' }));
  });

  it('does NOT add priority points to the total used against the threshold', () => {
    const profileNoPriority: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };
    const profileWithPriority: ApplicantProfile = {
      thpt: { scores: { math: 5, physics: 5, chemistry: 5 } },
      priority: { region: 'KV1', category: 'UT1' },
    };

    const withoutPriority = evaluateDainamThptExamExactAdmission(profileNoPriority, a00Context);
    const withPriority = evaluateDainamThptExamExactAdmission(profileWithPriority, a00Context);

    expect(withoutPriority.score?.value).toBe(15);
    expect(withPriority.score?.value).toBe(15);
    expect(withPriority.eligibility?.status).toBe('eligible');
  });

  it('marks totals below 15/30 as ineligible with exact-verified confidence', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 5, chemistry: 5.4 } } };

    const result = evaluateDainamThptExamExactAdmission(profile, a00Context);

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(14.4);
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'dainam-threshold-2026' }));
  });
});
