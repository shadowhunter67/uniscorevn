import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateHupThptExamAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('HUP THPT (PT4) threshold eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };

    const result = evaluateHupThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hup-subject-combination' }));
  });

  it('keeps profiles unresolved until a ngành is selected', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };

    const result = evaluateHupThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hup-program' }));
  });

  it('marks totals below the Dược học threshold (22.00/30) as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };

    const result = evaluateHupThptExamAdmission(profile, { ...a00Context, programId: '7720201' });

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.eligibility?.reasons.join(' ')).toContain('22/30');
  });

  it('marks totals at or above the Hoá học threshold (19.00/30) as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 6, chemistry: 6 } } };

    const result = evaluateHupThptExamAdmission(profile, { ...a00Context, programId: '7440112' });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toBeUndefined();
  });

  it('keeps unconfirmed program codes unresolved instead of guessing', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateHupThptExamAdmission(profile, { ...a00Context, programId: '9999999' as unknown as never });

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'official-rule', code: 'hup-program-not-found' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 6, chemistry: 6 } } };
    const context = { ...a00Context, programId: '7440112' as const };

    expect(evaluateSchool(profile, 'hup', { context }).status).toBe('eligible');
    expect(evaluateSchools(profile, ['hup'], { hup: context })[0].status).toBe('eligible');
  });
});
