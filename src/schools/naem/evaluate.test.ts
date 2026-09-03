import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateNaemThptExamAdmission } from './evaluate';

const a00Context = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const };
const d01Context = { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const };

describe('NAEM exact THPT admission calculator 2025 (theo ngành)', () => {
  it('marks a profile below the field threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateNaemThptExamAdmission(profile, { fieldCode: '7480201', subjectContext: a00Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(12);
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'naem-threshold-2025' }));
  });

  it('marks a profile at the lowest field threshold as eligible (Công nghệ thông tin, 15.00/30)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateNaemThptExamAdmission(profile, { fieldCode: '7480201', subjectContext: a00Context });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(15);
  });

  it('applies a different threshold for a different field with the same combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    // Quản lý giáo dục (7140114) threshold = 24.68, Công nghệ thông tin (7480201) threshold = 15.00.
    const qlgdResult = evaluateNaemThptExamAdmission(profile, { fieldCode: '7140114', subjectContext: a00Context });
    const cnttResult = evaluateNaemThptExamAdmission(profile, { fieldCode: '7480201', subjectContext: a00Context });

    expect(qlgdResult.eligibility?.status).toBe('ineligible');
    expect(cnttResult.eligibility?.status).toBe('eligible');
  });

  it('requires a selected field before computing the score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateNaemThptExamAdmission(profile, { subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'naem-field' }));
  });

  it('rejects an unmodeled field code', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateNaemThptExamAdmission(profile, { fieldCode: '9999999', subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'naem-field' }));
  });

  it('rejects a subject combination not officially published for the selected field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    // Kinh tế (7310101) combinations are A00/A01/D01/D10/X25/X26 — no C00, so use a B00 profile against a C00-only field.
    const b00Context = { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] as const };
    const result = evaluateNaemThptExamAdmission(profile, { fieldCode: '7310101', subjectContext: b00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'naem-subject-combination' }));
  });

  it('accepts a subject combination officially published for the selected field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 9, literature: 9, english: 8.51 } } };

    const result = evaluateNaemThptExamAdmission(profile, { fieldCode: '7220201', subjectContext: d01Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(26.51);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8 } } };

    const result = evaluateNaemThptExamAdmission(profile, { fieldCode: '7480201', subjectContext: a00Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'naem-thpt-chemistry' }));
  });

  it('applies standard priority points and threshold reduction near the top of the scale', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 8, physics: 8, chemistry: 8.5 } },
      priority: { region: 'KV1' },
    };

    const result = evaluateNaemThptExamAdmission(profile, { fieldCode: '7480201', subjectContext: a00Context });

    // raw = 24.5 >= 22.5 -> reduced priority = [(30-24.5)/7.5] * 0.75 = 0.55
    expect(result.explanation.find((step) => step.id === 'naem-exact-priority')?.output).toBe(0.55);
    expect(result.score?.value).toBe(25.05);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('handles the Kinh tế threshold published with 4 decimal digits (21.4625)', () => {
    const eligibleProfile: ApplicantProfile = { thpt: { scores: { math: 7.16, physics: 7.16, english: 7.15 } } };
    const a01Context = { combinationId: 'A01', subjects: ['math', 'physics', 'english'] as const };

    const eligible = evaluateNaemThptExamAdmission(eligibleProfile, { fieldCode: '7310101', subjectContext: a01Context });
    expect(eligible.score?.value).toBe(21.47);
    expect(eligible.eligibility?.status).toBe('eligible');

    const ineligibleProfile: ApplicantProfile = { thpt: { scores: { math: 7.15, physics: 7.15, english: 7.15 } } };
    const ineligible = evaluateNaemThptExamAdmission(ineligibleProfile, { fieldCode: '7310101', subjectContext: a01Context });
    expect(ineligible.eligibility?.status).toBe('ineligible');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };
    const context = { fieldCode: '7480201', subjectContext: a00Context };

    expect(evaluateSchool(profile, 'naem', { context }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['naem'], { naem: context })[0].status).toBe('calculated');
  });
});
