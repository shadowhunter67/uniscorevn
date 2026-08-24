import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateAjcThptExamAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };
const d01Context = { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };

describe('AJC THPT threshold eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };

    const result = evaluateAjcThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'ajc-subject-combination' }));
  });

  it('keeps profiles unresolved until a program group is selected', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };

    const result = evaluateAjcThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'ajc-program-group' }));
  });

  it('marks totals below the other-groups threshold (18/30) as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateAjcThptExamAdmission(profile, { ...a00Context, programGroupId: 'lyluan-lichsu-truyenthong' });

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.eligibility?.reasons.join(' ')).toContain('18/30');
  });

  it('marks totals at or above the other-groups threshold (18/30) as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };

    const result = evaluateAjcThptExamAdmission(profile, { ...a00Context, programGroupId: 'lyluan-lichsu-truyenthong' });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toBeUndefined();
  });

  it('rejects the báo chí group when literature is not in the selected combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateAjcThptExamAdmission(profile, { ...a00Context, programGroupId: 'baochi-xuatban' });

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'ajc-baochi-requires-literature' }));
  });

  it('doubles literature for the báo chí group (scale 40) and marks below-threshold totals ineligible', () => {
    // math 5 + literature 5*2 + english 5 = 20/40, below 25/40
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };

    const result = evaluateAjcThptExamAdmission(profile, { ...d01Context, programGroupId: 'baochi-xuatban' });

    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.eligibility?.reasons.join(' ')).toContain('20/40');
  });

  it('doubles literature for the báo chí group (scale 40) and marks at-threshold totals eligible', () => {
    // math 7 + literature 8*2 + english 7 = 30/40, above 25/40
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, literature: 8, english: 7 } } };

    const result = evaluateAjcThptExamAdmission(profile, { ...d01Context, programGroupId: 'baochi-xuatban' });

    expect(result.eligibility?.status).toBe('eligible');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };
    const context = { ...a00Context, programGroupId: 'lyluan-lichsu-truyenthong' as const };

    expect(evaluateSchool(profile, 'ajc', { context }).status).toBe('eligible');
    expect(evaluateSchools(profile, ['ajc'], { ajc: context })[0].status).toBe('eligible');
  });
});
