import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateHouThptExamAdmission, evaluateHouThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('HOU THPT baseline eligibility 2026', () => {
  it('marks profiles below the lowest published band as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateHouThptExamAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'hou-threshold-2026' }));
  });

  it('keeps profiles between the two published bands unresolved', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6.5 } } };

    const result = evaluateHouThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('unknown');
  });

  it('marks profiles at/above the highest published band as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };

    const result = evaluateHouThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('eligible');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };

    const result = evaluateHouThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hou-subject-combination' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    expect(evaluateSchool(profile, 'hou', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['hou'], { hou: a00Context })[0].status).toBe('partial');
  });
});

describe('HOU THPT exact per-field calculator 2026', () => {
  it('marks a profile at threshold as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6.5 } } };

    const result = evaluateHouThptExamExactAdmission(profile, { fieldId: 'computer-engineering', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(18.5);
  });

  it('marks a profile below the field threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5.5 } } };

    const result = evaluateHouThptExamExactAdmission(profile, { fieldId: 'law', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } });

    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(15.5);
  });

  it('requires a selected field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };

    const result = evaluateHouThptExamExactAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hou-field' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7 } } };

    const result = evaluateHouThptExamExactAdmission(profile, { fieldId: 'accounting', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'hou-thpt-chemistry' }));
  });

  it('rejects a field id not modeled in the threshold table', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };

    const result = evaluateHouThptExamExactAdmission(profile, { fieldId: 'graphic-design' as never, subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } });

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hou-field' }));
  });
});
