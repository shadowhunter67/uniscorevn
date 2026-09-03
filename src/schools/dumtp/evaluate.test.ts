import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateDumtpThptExamAdmission } from './evaluate';

const a00Context = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const };
const b08Context = { combinationId: 'B08', subjects: ['math', 'biology', 'english'] as const };
const d01Context = { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const };

describe('DUMTP exact THPT admission calculator 2025 (theo ngành/chuyên ngành)', () => {
  it('marks a profile below the field threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateDumtpThptExamAdmission(profile, { fieldCode: '7720701', subjectContext: a00Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(12);
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'dumtp-threshold-2025' }));
  });

  it('marks a profile at the lowest field threshold as eligible (Y tế công cộng, 15.00/30)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateDumtpThptExamAdmission(profile, { fieldCode: '7720701', subjectContext: a00Context });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(15);
  });

  it('applies a different threshold for a different field with the same combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    // Y tế công cộng threshold = 15.00, Y khoa threshold = 22.85.
    const publicHealthResult = evaluateDumtpThptExamAdmission(profile, { fieldCode: '7720701', subjectContext: a00Context });
    const medicineResult = evaluateDumtpThptExamAdmission(profile, { fieldCode: '7720101', subjectContext: a00Context });

    expect(publicHealthResult.eligibility?.status).toBe('eligible');
    expect(medicineResult.eligibility?.status).toBe('ineligible');
  });

  it('requires a selected field before computing the score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateDumtpThptExamAdmission(profile, { subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'dumtp-field' }));
  });

  it('rejects an unmodeled field code', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateDumtpThptExamAdmission(profile, { fieldCode: 'ZZZZ', subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'dumtp-field' }));
  });

  it('rejects a subject combination not among the 4 official combinations (uniform across all fields)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };

    // D01 is not one of DUMTP's 4 combinations (A00/B00/B08/D07).
    const result = evaluateDumtpThptExamAdmission(profile, { fieldCode: '7720101', subjectContext: d01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'dumtp-subject-combination' }));
  });

  it('accepts the B08 combination (Toán-Sinh-Anh) for any field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, biology: 7, english: 7 } } };

    const result = evaluateDumtpThptExamAdmission(profile, { fieldCode: '7720301A', subjectContext: b08Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(21);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8 } } };

    const result = evaluateDumtpThptExamAdmission(profile, { fieldCode: '7720701', subjectContext: a00Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'dumtp-thpt-chemistry' }));
  });

  it('applies standard priority points and threshold reduction near the top of the scale', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 8, physics: 8, chemistry: 8.5 } },
      priority: { region: 'KV1' },
    };

    const result = evaluateDumtpThptExamAdmission(profile, { fieldCode: '7720701', subjectContext: a00Context });

    // raw = 24.5 >= 22.5 -> reduced priority = [(30-24.5)/7.5] * 0.75 = 0.55
    expect(result.explanation.find((step) => step.id === 'dumtp-exact-priority')?.output).toBe(0.55);
    expect(result.score?.value).toBe(25.05);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };
    const context = { fieldCode: '7720701', subjectContext: a00Context };

    expect(evaluateSchool(profile, 'dumtp', { context }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['dumtp'], { dumtp: context })[0].status).toBe('calculated');
  });
});
