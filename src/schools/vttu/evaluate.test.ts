import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateVttuThptExamAdmission } from './evaluate';

const d01Context = { combinationId: 'D01', subjects: ['literature', 'math', 'english'] as const };
const a00Context = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const };

describe('VTTU exact THPT admission calculator 2025 (theo ngành)', () => {
  it('marks a profile below the field threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 4, math: 4, english: 4 } } };

    // Kế toán (7340301) threshold = 15.00.
    const result = evaluateVttuThptExamAdmission(profile, { fieldCode: '7340301', subjectContext: d01Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(12);
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'vttu-threshold-2025' }));
  });

  it('marks a profile at the lowest field threshold as eligible (Kế toán, 15.00/30)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 5, math: 5, english: 5 } } };

    const result = evaluateVttuThptExamAdmission(profile, { fieldCode: '7340301', subjectContext: d01Context });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(15);
  });

  it('applies a different (higher) threshold for Y khoa than Kế toán', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    // Y khoa (7720101) threshold = 20.50 vs Kế toán (7340301) threshold = 15.00.
    const medResult = evaluateVttuThptExamAdmission(profile, { fieldCode: '7720101', subjectContext: a00Context });
    const acctResult = evaluateVttuThptExamAdmission(profile, {
      fieldCode: '7340301',
      subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const },
    });

    expect(medResult.eligibility?.status).toBe('ineligible');
    expect(acctResult.eligibility?.status).toBe('eligible');
    expect(medResult.score?.value).toBe(18);
    expect(acctResult.score?.value).toBe(18);
  });

  it('requires a selected field before computing the score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, math: 8, english: 8 } } };

    const result = evaluateVttuThptExamAdmission(profile, { subjectContext: d01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vttu-field' }));
  });

  it('rejects an unmodeled field code', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, math: 8, english: 8 } } };

    const result = evaluateVttuThptExamAdmission(profile, { fieldCode: '9999999', subjectContext: d01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vttu-field' }));
  });

  it('rejects a subject combination not officially published for the selected field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, biology: 8 } } };

    // Công nghệ thông tin (7480201) combinations are A00/A02/D01 — no B00.
    const b00Context = { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] as const };
    const result = evaluateVttuThptExamAdmission(profile, { fieldCode: '7480201', subjectContext: b00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vttu-subject-combination' }));
  });

  it('accepts a subject combination officially published for the selected field (B00 for Y khoa, health group)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, chemistry: 7, biology: 7.5 } } };

    const b00Context = { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] as const };
    const result = evaluateVttuThptExamAdmission(profile, { fieldCode: '7720101', subjectContext: b00Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(21.5);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, math: 8 } } };

    const result = evaluateVttuThptExamAdmission(profile, { fieldCode: '7340301', subjectContext: d01Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'vttu-thpt-english' }));
  });

  it('applies standard priority points and threshold reduction near the top of the scale', () => {
    // Y khoa (7720101) threshold = 20.50, combination D01.
    const highProfile: ApplicantProfile = {
      thpt: { scores: { literature: 9, math: 9, english: 8.5 } },
      priority: { region: 'KV1' },
    };

    const result = evaluateVttuThptExamAdmission(highProfile, { fieldCode: '7720101', subjectContext: d01Context });

    // raw = 26.5 >= 22.5 -> reduced priority = [(30-26.5)/7.5] * 0.75 = 0.35
    expect(result.explanation.find((step) => step.id === 'vttu-exact-priority')?.output).toBe(0.35);
    expect(result.score?.value).toBe(26.85);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, math: 8, english: 8 } } };
    const context = { fieldCode: '7340301', subjectContext: d01Context };

    expect(evaluateSchool(profile, 'vttu', { context }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['vttu'], { vttu: context })[0].status).toBe('calculated');
  });
});
