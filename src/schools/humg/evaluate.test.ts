import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateHumgThptExamAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('HUMG THPT threshold eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };

    const result = evaluateHumgThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'humg-subject-combination' }));
  });

  it('keeps profiles unresolved until a mã ngành is selected', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };

    const result = evaluateHumgThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'humg-program' }));
  });

  it('marks totals below the Kỹ thuật cơ khí threshold (18/30) as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateHumgThptExamAdmission(profile, { ...a00Context, programId: '7520103' });

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.eligibility?.reasons.join(' ')).toContain('18/30');
  });

  it('marks totals at or above the Công nghệ thông tin threshold (19/30) as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 6, chemistry: 6 } } };

    const result = evaluateHumgThptExamAdmission(profile, { ...a00Context, programId: '7480201' });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toBeUndefined();
  });

  it('keeps unconfirmed program codes unresolved instead of guessing', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateHumgThptExamAdmission(profile, { ...a00Context, programId: '9999999' as unknown as never });

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'official-rule', code: 'humg-program-catalog-partially-imported' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 6, chemistry: 6 } } };
    const context = { ...a00Context, programId: '7480201' as const };

    expect(evaluateSchool(profile, 'humg', { context }).status).toBe('eligible');
    expect(evaluateSchools(profile, ['humg'], { humg: context })[0].status).toBe('eligible');
  });
});
