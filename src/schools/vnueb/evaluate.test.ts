import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateVnuebThptExamAdmission, evaluateVnuebThptExamExactAdmission } from './evaluate';

const a01Context = { subjectContext: { combinationId: 'A01', subjects: ['math', 'physics', 'english'] as const } };

describe('VNU-UEB baseline THPT calculator 2025 (dải điểm chuẩn, không chọn ngành)', () => {
  it('marks a profile below the lowest published threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, english: 4 } } };

    const result = evaluateVnuebThptExamAdmission(profile, a01Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('marks a profile above the highest published threshold as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 9, physics: 9, english: 9 } } };

    const result = evaluateVnuebThptExamAdmission(profile, a01Context);

    expect(result.eligibility?.status).toBe('eligible');
  });

  it('marks a profile in the middle of the range as unknown (needs a chosen field)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, english: 8.2 } } };

    const result = evaluateVnuebThptExamAdmission(profile, a01Context);

    expect(result.eligibility?.status).toBe('unknown');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, english: 8 } } };

    const result = evaluateVnuebThptExamAdmission(profile);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vnueb-subject-combination' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters (baseline method)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, english: 4 } } };

    expect(evaluateSchool(profile, 'vnueb', { context: a01Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['vnueb'], { vnueb: a01Context })[0].status).toBe('partial');
  });
});

describe('VNU-UEB exact THPT calculator 2025 (theo ngành)', () => {
  it('marks a profile below the field threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, english: 5 } } };

    const result = evaluateVnuebThptExamExactAdmission(profile, { fieldCode: '7310106', ...a01Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(15);
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'vnueb-threshold-2025' }));
  });

  it('marks a profile at the field threshold as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8.25, physics: 8, english: 7.95 } } };

    const result = evaluateVnuebThptExamExactAdmission(profile, { fieldCode: '7310105', ...a01Context });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(24.2);
  });

  it('requires a selected field before computing the exact score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, english: 8 } } };

    const result = evaluateVnuebThptExamExactAdmission(profile, a01Context);

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vnueb-field' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8 } } };

    const result = evaluateVnuebThptExamExactAdmission(profile, { fieldCode: '7310105', ...a01Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'vnueb-thpt-english' }));
  });

  it('rejects an unmodeled field code', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, english: 8 } } };

    const result = evaluateVnuebThptExamExactAdmission(profile, { fieldCode: '9999999', ...a01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vnueb-field' }));
  });
});
