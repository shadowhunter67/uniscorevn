import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluatePntuThptExamAdmission, evaluatePntuThptExamExactAdmission } from './evaluate';

const b00Context = { subjectContext: { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] as const } };

describe('PNTU THPT threshold eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, chemistry: 7, biology: 7 } } };

    const result = evaluatePntuThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'pntu-subject-combination' }));
  });

  it('keeps profiles unresolved until a ngành is selected', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, chemistry: 7, biology: 7 } } };

    const result = evaluatePntuThptExamAdmission(profile, b00Context);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'pntu-program' }));
  });

  it('marks totals below the Y khoa threshold (22.5/30) as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, chemistry: 7, biology: 7 } } };

    const result = evaluatePntuThptExamAdmission(profile, { ...b00Context, programId: '7720101' });

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.eligibility?.reasons.join(' ')).toContain('22.5/30');
  });

  it('marks totals at or above the Tâm lý học threshold (15.5/30) as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, chemistry: 5, biology: 5 } } };

    const result = evaluatePntuThptExamAdmission(profile, { ...b00Context, programId: '7310401' });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toBeUndefined();
  });

  it('keeps unconfirmed program codes unresolved instead of guessing', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, chemistry: 8, biology: 8 } } };

    const result = evaluatePntuThptExamAdmission(profile, { ...b00Context, programId: '9999999' as unknown as never });

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'official-rule', code: 'pntu-program-catalog-partially-imported' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    // PNTU is now verified-calculator (thanks to the exact method below) — per the same
    // classifyEvaluation rule as CTUMP/VNUA, a confidence:'partial'/score:undefined result from
    // this BASE method reports generic status 'partial' (not 'eligible') once the school carries
    // an exact method; use the base method's own `eligibility.status` (asserted above) for that.
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, chemistry: 5, biology: 5 } } };
    const context = { ...b00Context, programId: '7310401' as const };

    expect(evaluateSchool(profile, 'pntu', { context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['pntu'], { pntu: context })[0].status).toBe('partial');
  });
});

describe('PNTU exact calculator (pntu-thpt-exam-exact-2026)', () => {
  it('requires a chosen program', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, chemistry: 8, biology: 8 } } };

    const result = evaluatePntuThptExamExactAdmission(profile);

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'pntu-exact-program' }));
  });

  it('rejects a combination not listed for the chosen program', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, english: 8 } } };

    const result = evaluatePntuThptExamExactAdmission(profile, { programId: '7720101', combinationId: 'A01' });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'pntu-exact-combination' }));
  });

  it('adds priority points to the raw total before comparing to the threshold (no reduction below 22.5)', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 5, chemistry: 5, biology: 5 } },
      priority: { region: 'KV1', category: 'UT2' },
    };

    const result = evaluatePntuThptExamExactAdmission(profile, { programId: '7310401', combinationId: 'B00' });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toEqual({ value: 16.75, scale: 30 });
    expect(result.explanation.find((s) => s.id === 'pntu-exact-raw')?.output).toBe(15);
  });

  it('applies the priority reduction formula once the raw total reaches 22.5', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 9, chemistry: 8, biology: 8 } },
      priority: { region: 'KV1', category: 'UT1' },
    };

    const result = evaluatePntuThptExamExactAdmission(profile, { programId: '7720101', combinationId: 'B00' });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toEqual({ value: 26.83, scale: 30 });
  });

  it('marks a below-threshold total as ineligible even with no priority points', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 4, chemistry: 4, biology: 4 } },
      priority: { region: 'KV3' },
    };

    const result = evaluatePntuThptExamExactAdmission(profile, { programId: '7720701', combinationId: 'B00' });

    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score).toEqual({ value: 12, scale: 30 });
  });

  it('flags missing priority context while still computing with priority = 0', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, chemistry: 6, biology: 6 } } };

    const result = evaluatePntuThptExamExactAdmission(profile, { programId: '7720301', combinationId: 'B00' });

    expect(result.confidence).toBe('exact-verified');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'pntu-priority-region-category' }));
  });
});
