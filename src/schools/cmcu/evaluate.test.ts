import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateCmcuThptExamAdmission, evaluateCmcuThptExamExactAdmission } from './evaluate';

const mathCombo = { mainSubjectId: 'math' as const, otherSubjectIds: ['physics', 'chemistry'] as const };

describe('CMCU THPT baseline eligibility 2026', () => {
  it('marks profiles below the lowest published band as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 3, physics: 3, chemistry: 3 } } };

    const result = evaluateCmcuThptExamAdmission(profile, mathCombo);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'cmcu-threshold-2026' }));
  });

  it('keeps profiles between the two published bands unresolved', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5.5 } } };

    const result = evaluateCmcuThptExamAdmission(profile, mathCombo);

    expect(result.eligibility?.status).toBe('unknown');
  });

  it('marks profiles at/above the highest published band as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 5, chemistry: 5 } } };

    const result = evaluateCmcuThptExamAdmission(profile, mathCombo);

    expect(result.eligibility?.status).toBe('eligible');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };

    const result = evaluateCmcuThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'cmcu-subject-combination' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 3, physics: 3, chemistry: 3 } } };

    expect(evaluateSchool(profile, 'cmcu', { context: mathCombo }).status).toBe('partial');
    expect(evaluateSchools(profile, ['cmcu'], { cmcu: mathCombo })[0].status).toBe('partial');
  });
});

describe('CMCU THPT exact per-field calculator 2026', () => {
  it('marks a field profile at threshold as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 5, chemistry: 5 } } };

    const result = evaluateCmcuThptExamExactAdmission(profile, { fieldId: 'other', ...mathCombo });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(22);
  });

  it('marks a profile below the field threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 4, english: 4 } } };

    const result = evaluateCmcuThptExamExactAdmission(profile, { fieldId: 'other', mainSubjectId: 'math', otherSubjectIds: ['literature', 'english'] });

    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(18);
  });

  it('requires a selected field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };

    const result = evaluateCmcuThptExamExactAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'cmcu-field' }));
  });

  it('rejects a main subject not allowed for the field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 7, math: 7, english: 7 } } };

    const result = evaluateCmcuThptExamExactAdmission(profile, { fieldId: 'ai', mainSubjectId: 'literature', otherSubjectIds: ['math', 'english'] });

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'cmcu-main-subject-not-allowed' }));
  });

  it('allows literature as the main subject for multimedia-communication', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 6, math: 5, english: 5 } } };

    const result = evaluateCmcuThptExamExactAdmission(profile, { fieldId: 'multimedia-communication', mainSubjectId: 'literature', otherSubjectIds: ['math', 'english'] });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.explanation.find((step) => step.id === 'cmcu-exact-raw')?.output).toBe(22);
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7 } } };

    const result = evaluateCmcuThptExamExactAdmission(profile, { fieldId: 'other', ...mathCombo });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'cmcu-thpt-physics' }));
  });
});
