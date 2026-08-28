import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateAjcThptExamAdmission, evaluateAjcThptExamExactAdmission } from './evaluate';

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
    // AJC is now verified-calculator (thanks to the exact method below) — per the same
    // classifyEvaluation rule as CTUMP/PNTU/UHD/TBU/FBU/USH/VNU-UMP, a confidence:'partial'/
    // score:undefined result from this BASE method reports generic status 'partial' once the
    // school carries an exact method; use the base method's own `eligibility.status` (asserted above).
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };
    const context = { ...a00Context, programGroupId: 'lyluan-lichsu-truyenthong' as const };

    expect(evaluateSchool(profile, 'ajc', { context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['ajc'], { ajc: context })[0].status).toBe('partial');
  });
});

describe('AJC THPT exact eligibility 2026 (ajc-thpt-exam-exact-2026)', () => {
  it('adds priority points into the total before comparing to the 18/30 floor (standard group)', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 6, physics: 6, chemistry: 6 } },
      priority: { region: 'KV1', category: 'UT2' },
    };

    const result = evaluateAjcThptExamExactAdmission(profile, { ...a00Context, programGroupId: 'lyluan-lichsu-truyenthong' });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(19.75);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('applies the 4/3 priority multiplier for the báo chí group (scale 40)', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 9, literature: 9, english: 9 } },
      priority: { region: 'KV1', category: 'UT1' },
    };

    const result = evaluateAjcThptExamExactAdmission(profile, { ...d01Context, programGroupId: 'baochi-xuatban' });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(37.47);
    expect(result.score?.scale).toBe(40);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('requires a subject combination and program group', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };

    const result = evaluateAjcThptExamExactAdmission(profile);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('unknown');
  });
});
