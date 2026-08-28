import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateUedudnThptExamAdmission, evaluateUedudnThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('UED THPT threshold eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 7, chemistry: 6.5 } } };

    const result = evaluateUedudnThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'uedudn-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 7 } } };

    const result = evaluateUedudnThptExamAdmission(profile, a00Context);

    expect(result.missingInputs).toHaveLength(1);
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'uedudn-thpt-chemistry' }));
  });

  it('marks totals below the lowest published threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateUedudnThptExamAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'uedudn-quality-threshold-2026' }));
  });

  it('keeps totals within the published range unresolved (varies by program)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 6, chemistry: 6 } } };

    const result = evaluateUedudnThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('unknown');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    expect(evaluateSchool(profile, 'uedudn', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['uedudn'], { uedudn: a00Context })[0].status).toBe('partial');
  });
});

describe('UED THPT-exam-route exact calculator 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluateUedudnThptExamExactAdmission(profile, { group: 'tier15_5' });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'uedudn-exact-subject-combination' }));
  });

  it('computes exact eligible total for tier15_5 group at KV3', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5.5, physics: 5, chemistry: 5 } }, priority: { region: 'KV3' } };

    const result = evaluateUedudnThptExamExactAdmission(profile, { group: 'tier15_5', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toEqual({ value: 15.5, scale: 30 });
  });

  it('adds standard-scale priority points into the total before comparing to the threshold', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } }, priority: { region: 'KV1', category: 'UT2' } };

    const result = evaluateUedudnThptExamExactAdmission(profile, { group: 'tier20', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score).toEqual({ value: 19.75, scale: 30 });
  });
});
