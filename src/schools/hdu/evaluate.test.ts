import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateHduThptExamAdmission } from './evaluate';

const d01Context = { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };

describe('HDU THPT threshold eligibility 2026 (Luật/Luật Kinh tế)', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, literature: 7, english: 7 } } };

    const result = evaluateHduThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hdu-subject-combination' }));
  });

  it('keeps profiles unresolved until the Luật/Luật Kinh tế program group is selected', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, literature: 7, english: 7 } } };

    const result = evaluateHduThptExamAdmission(profile, d01Context);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hdu-program-group' }));
  });

  it('marks totals below 18/30 as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 6, english: 5 } } };

    const result = evaluateHduThptExamAdmission(profile, { ...d01Context, programGroupId: 'hdu-luat' });

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.eligibility?.reasons.join(' ')).toContain('18/30');
  });

  it('marks totals at or above 18/30 with literature below 6.0 as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 5, english: 6 } } };

    const result = evaluateHduThptExamAdmission(profile, { ...d01Context, programGroupId: 'hdu-luat' });

    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.eligibility?.reasons.join(' ')).toContain('Ngữ văn');
  });

  it('marks totals at or above 18/30 with literature at or above 6.0 as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, literature: 6, english: 6 } } };

    const result = evaluateHduThptExamAdmission(profile, { ...d01Context, programGroupId: 'hdu-luat' });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toBeUndefined();
  });

  it('reports missing literature score as a profile input', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: undefined as unknown as number, english: 6 } } };

    const result = evaluateHduThptExamAdmission(profile, { ...d01Context, programGroupId: 'hdu-luat' });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'hdu-thpt-literature' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, literature: 6, english: 6 } } };
    const context = { ...d01Context, programGroupId: 'hdu-luat' as const };

    expect(evaluateSchool(profile, 'hdu', { context }).status).toBe('eligible');
    expect(evaluateSchools(profile, ['hdu'], { hdu: context })[0].status).toBe('eligible');
  });
});
