import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateVmuThptExamAdmission } from './evaluate';

const d01Context = { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };

describe('VMU THPT threshold eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, literature: 7, english: 7 } } };

    const result = evaluateVmuThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vmu-subject-combination' }));
  });

  it('keeps profiles unresolved until a khối ngành is selected', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, literature: 7, english: 7 } } };

    const result = evaluateVmuThptExamAdmission(profile, d01Context);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vmu-program-group' }));
  });

  it('marks totals below the Kỹ thuật/Công nghệ threshold (17/30) as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };

    const result = evaluateVmuThptExamAdmission(profile, { ...d01Context, programGroupId: 'vmu-engineering' });

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.eligibility?.reasons.join(' ')).toContain('17/30');
  });

  it('marks totals at or above the Kỹ thuật/Công nghệ threshold as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6, english: 5 } } };

    const result = evaluateVmuThptExamAdmission(profile, { ...d01Context, programGroupId: 'vmu-engineering' });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toBeUndefined();
  });

  it('applies the higher Luật threshold (20/30) for the law group', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6, english: 6 } } };

    const result = evaluateVmuThptExamAdmission(profile, { ...d01Context, programGroupId: 'vmu-law' });

    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.eligibility?.reasons.join(' ')).toContain('20/30');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6, english: 5 } } };
    const context = { ...d01Context, programGroupId: 'vmu-engineering' as const };

    expect(evaluateSchool(profile, 'vmu', { context }).status).toBe('eligible');
    expect(evaluateSchools(profile, ['vmu'], { vmu: context })[0].status).toBe('eligible');
  });
});
