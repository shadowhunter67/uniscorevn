import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateHpmuThptExamAdmission, evaluateHpmuThptExamExactAdmission } from './evaluate';

const b00Context = { subjectContext: { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] as const } };

describe('HPMU baseline THPT calculator 2025 (dải điểm chuẩn, không chọn ngành)', () => {
  it('marks a profile below the lowest published threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, chemistry: 4, biology: 4 } } };

    const result = evaluateHpmuThptExamAdmission(profile, b00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('marks a profile above the highest published threshold as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 9, chemistry: 9, biology: 9 } } };

    const result = evaluateHpmuThptExamAdmission(profile, b00Context);

    expect(result.eligibility?.status).toBe('eligible');
  });

  it('marks a profile in the middle of the range as unknown (needs a chosen field)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, chemistry: 7, biology: 7 } } };

    const result = evaluateHpmuThptExamAdmission(profile, b00Context);

    expect(result.eligibility?.status).toBe('unknown');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, chemistry: 7, biology: 7 } } };

    const result = evaluateHpmuThptExamAdmission(profile);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hpmu-subject-combination' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters (baseline method)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, chemistry: 4, biology: 4 } } };

    expect(evaluateSchool(profile, 'hpmu', { context: b00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['hpmu'], { hpmu: b00Context })[0].status).toBe('partial');
  });
});

describe('HPMU exact THPT calculator 2025 (theo ngành)', () => {
  it('marks a profile below the field threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, chemistry: 5, biology: 5 } } };

    const result = evaluateHpmuThptExamExactAdmission(profile, { fieldCode: '7720101', ...b00Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(15);
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'hpmu-threshold-2025' }));
  });

  it('marks a profile at the field threshold as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6.5, chemistry: 6.5, biology: 6.35 } } };

    const result = evaluateHpmuThptExamExactAdmission(profile, { fieldCode: '7720110', ...b00Context });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(19.35);
  });

  it('requires a selected field before computing the exact score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, chemistry: 7, biology: 7 } } };

    const result = evaluateHpmuThptExamExactAdmission(profile, b00Context);

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hpmu-field' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, chemistry: 7 } } };

    const result = evaluateHpmuThptExamExactAdmission(profile, { fieldCode: '7720110', ...b00Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'hpmu-thpt-biology' }));
  });

  it('rejects an unmodeled field code', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, chemistry: 7, biology: 7 } } };

    const result = evaluateHpmuThptExamExactAdmission(profile, { fieldCode: '9999999', ...b00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hpmu-field' }));
  });
});
