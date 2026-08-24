import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluatePntuThptExamAdmission } from './evaluate';

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
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, chemistry: 5, biology: 5 } } };
    const context = { ...b00Context, programId: '7310401' as const };

    expect(evaluateSchool(profile, 'pntu', { context }).status).toBe('eligible');
    expect(evaluateSchools(profile, ['pntu'], { pntu: context })[0].status).toBe('eligible');
  });
});
