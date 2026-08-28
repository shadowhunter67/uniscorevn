import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateVnuaThptExamAdmission, evaluateVnuaThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('VNUA THPT baseline eligibility 2026', () => {
  it('marks profiles below the common 15/30 condition as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 4.75, chemistry: 5 } } };

    const result = evaluateVnuaThptExamAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'vnua-threshold-notice-2026' }));
  });

  it('keeps profiles above the baseline unresolved until a program group is selected', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 7, chemistry: 6.5 } } };

    const result = evaluateVnuaThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vnua-program-group' }));
  });

  it('marks profiles below a selected numeric group threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 6.5, chemistry: 6 } } };

    const result = evaluateVnuaThptExamAdmission(profile, { ...a00Context, programGroupId: 'HVN18' });

    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.eligibility?.reasons.join(' ')).toContain('20/30');
  });

  it('marks profiles meeting a selected numeric group threshold as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 6 } } };

    const result = evaluateVnuaThptExamAdmission(profile, { ...a00Context, programGroupId: 'HVN18' });

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toBeUndefined();
  });

  it('keeps ministry-governed groups unresolved', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 7, chemistry: 6.5 } } };

    const result = evaluateVnuaThptExamAdmission(profile, { ...a00Context, programGroupId: 'HVN13' });

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'official-rule', code: 'vnua-ministry-governed-group-threshold' }));
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 7, chemistry: 6.5 } } };

    const result = evaluateVnuaThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vnua-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 7 } } };

    const result = evaluateVnuaThptExamAdmission(profile, a00Context);

    expect(result.missingInputs).toHaveLength(1);
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'vnua-thpt-chemistry' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 4.75, chemistry: 5 } } };
    const context = { vnua: { ...a00Context, programGroupId: 'HVN18' as const } };

    // VNUA đã có phương thức exact → classifyEvaluation phân loại lại kết quả threshold-only này
    // thành 'partial' (cùng tiền lệ FPTU/CTUMP/UDA/TBDU/...).
    expect(evaluateSchool(profile, 'vnua', { context: { ...a00Context, programGroupId: 'HVN18' } }).status).toBe('partial');
    expect(evaluateSchools(profile, ['vnua'], context)[0].status).toBe('partial');
  });
});

describe('evaluateVnuaThptExamExactAdmission (ngưỡng đầu vào theo nhóm ngành, 19/23 nhóm)', () => {
  it('requires selecting a program group', () => {
    const evaluation = evaluateVnuaThptExamExactAdmission({ thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } });

    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vnua-program-group' }));
  });

  it('reports ministry-governed groups as out of scope, not guessed', () => {
    const evaluation = evaluateVnuaThptExamExactAdmission(
      { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } },
      { programGroupId: 'HVN13', ...a00Context }
    );

    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.eligibility?.status).toBe('unknown');
    expect(evaluation.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'official-rule', code: 'vnua-ministry-governed-group-threshold' }));
  });

  it('requires a subject combination', () => {
    const evaluation = evaluateVnuaThptExamExactAdmission({ thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } }, { programGroupId: 'HVN18' });

    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vnua-subject-combination' }));
  });

  it('compares the raw total to the threshold and shows priority as a reference ĐXT only', () => {
    const evaluation = evaluateVnuaThptExamExactAdmission(
      { thpt: { scores: { math: 6, physics: 7, chemistry: 6 } }, priority: { region: 'KV1', category: 'UT1' } },
      { programGroupId: 'HVN18', ...a00Context }
    );

    expect(evaluation.confidence).toBe('exact-verified');
    // Raw 19 < ngưỡng 20 -> ineligible dù ĐXT tham khảo (19 + 2.75 = 21.75) vượt ngưỡng.
    expect(evaluation.eligibility?.status).toBe('ineligible');
    expect(evaluation.score?.value).toBe(21.75);
  });

  it('does not mutate ApplicantProfile', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 6 } } };
    const frozen = structuredClone(profile);
    evaluateVnuaThptExamExactAdmission(profile, { programGroupId: 'HVN18', ...a00Context });
    expect(profile).toEqual(frozen);
  });
});

