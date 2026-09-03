import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluatePctuThptExamExactAdmission } from './evaluate';

const a00Context = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const };

describe('PCTU exact THPT calculator 2025 (theo ngành)', () => {
  it('marks a profile below the field threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluatePctuThptExamExactAdmission(profile, { fieldCode: '7720101', subjectContext: a00Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(12);
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'pctu-threshold-2025' }));
  });

  it('marks a profile at the field threshold as eligible (Quản trị bệnh viện, 15/30)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluatePctuThptExamExactAdmission(profile, { fieldCode: '7340101', subjectContext: a00Context });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(15);
  });

  it('applies a different threshold for a different field with the same combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };

    // Y khoa (7720101) threshold = 21,5, Điều dưỡng đa khoa (7720301A) threshold = 17.
    const yKhoaResult = evaluatePctuThptExamExactAdmission(profile, { fieldCode: '7720101', subjectContext: a00Context });
    const dieuDuongResult = evaluatePctuThptExamExactAdmission(profile, { fieldCode: '7720301A', subjectContext: a00Context });

    expect(yKhoaResult.eligibility?.status).toBe('ineligible');
    expect(dieuDuongResult.eligibility?.status).toBe('eligible');
  });

  it('requires a selected field before computing the exact score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluatePctuThptExamExactAdmission(profile, { subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'pctu-field' }));
  });

  it('rejects an unmodeled field code', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluatePctuThptExamExactAdmission(profile, { fieldCode: '9999999', subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'pctu-field' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8 } } };

    const result = evaluatePctuThptExamExactAdmission(profile, { fieldCode: '7720101', subjectContext: a00Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'pctu-thpt-chemistry' }));
  });

  it('rejects a subject combination not published for the chosen field (Quản trị bệnh viện has no B00)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, chemistry: 8, biology: 8 } } };
    const b00Context = { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] as const };

    const result = evaluatePctuThptExamExactAdmission(profile, { fieldCode: '7340101', subjectContext: b00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'pctu-subject-combination-not-in-list' }));
  });

  it('applies standard national priority points and threshold reduction near the top of the scale', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 8, physics: 8, chemistry: 8.5 } },
      priority: { region: 'KV1' },
    };

    const result = evaluatePctuThptExamExactAdmission(profile, { fieldCode: '7720101', subjectContext: a00Context });

    // raw = 24.5 >= 22.5 -> reduced priority = [(30-24.5)/7.5] * 0.75 = 0.55
    expect(result.explanation.find((step) => step.id === 'pctu-exact-priority')?.output).toBe(0.55);
    expect(result.score?.value).toBe(25.05);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };
    const context = { fieldCode: '7340101', subjectContext: a00Context };

    expect(evaluateSchool(profile, 'pctu', { context }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['pctu'], { pctu: context })[0].status).toBe('calculated');
  });
});
