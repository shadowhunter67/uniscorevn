import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateTumpThptExamAdmission } from './evaluate';

const a00Context = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const };
const a01Context = { combinationId: 'A01', subjects: ['math', 'physics', 'english'] as const };
const d00Context = { combinationId: 'D00', subjects: ['math', 'literature', 'english'] as const };

describe('TUMP exact THPT admission calculator 2025 (theo ngành)', () => {
  it('marks a profile below the field threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateTumpThptExamAdmission(profile, { fieldCode: '7720110', subjectContext: a00Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(12);
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'tump-threshold-2025' }));
  });

  it('marks a profile at the lowest field threshold as eligible (Y học dự phòng, 18.30/30)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6.1, physics: 6.1, chemistry: 6.1 } } };

    const result = evaluateTumpThptExamAdmission(profile, { fieldCode: '7720110', subjectContext: a00Context });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(18.3);
  });

  it('applies a different threshold for a different field with the same combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 9, physics: 9, chemistry: 8 } } };

    // Y khoa (7720101) threshold = 25.85, Răng - Hàm - Mặt (7720501) threshold = 26.15.
    const ykhoaResult = evaluateTumpThptExamAdmission(profile, { fieldCode: '7720101', subjectContext: a00Context });
    const rhmResult = evaluateTumpThptExamAdmission(profile, { fieldCode: '7720501', subjectContext: a00Context });

    expect(ykhoaResult.eligibility?.status).toBe('eligible');
    expect(rhmResult.eligibility?.status).toBe('ineligible');
  });

  it('requires a selected field before computing the score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateTumpThptExamAdmission(profile, { subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'tump-field' }));
  });

  it('rejects an unmodeled field code', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateTumpThptExamAdmission(profile, { fieldCode: '9999999', subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'tump-field' }));
  });

  it('rejects a subject combination not officially published for the selected field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    // Y khoa (7720101) combinations are A00/A02/B00/D07/D08 — A01 is not among them.
    const result = evaluateTumpThptExamAdmission(profile, { fieldCode: '7720101', subjectContext: a01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'tump-subject-combination' }));
  });

  it('accepts the D00 (Toán, Ngữ văn, Tiếng Anh) combination officially published for Điều dưỡng', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, literature: 7, english: 6 } } };

    const result = evaluateTumpThptExamAdmission(profile, { fieldCode: '7720301', subjectContext: d00Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(20);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8 } } };

    const result = evaluateTumpThptExamAdmission(profile, { fieldCode: '7720110', subjectContext: a00Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'tump-thpt-chemistry' }));
  });

  it('applies standard priority points and threshold reduction near the top of the scale', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 8, physics: 8, chemistry: 8.5 } },
      priority: { region: 'KV1' },
    };

    const result = evaluateTumpThptExamAdmission(profile, { fieldCode: '7720601', subjectContext: a00Context });

    // raw = 24.5 >= 22.5 -> reduced priority = [(30-24.5)/7.5] * 0.75 = 0.55
    expect(result.explanation.find((step) => step.id === 'tump-exact-priority')?.output).toBe(0.55);
    expect(result.score?.value).toBe(25.05);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('applies the IELTS bonus tier from the school-specific table', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 6, physics: 6, chemistry: 6 } },
      certificates: { ielts: 7.5 },
    };

    const result = evaluateTumpThptExamAdmission(profile, { fieldCode: '7720110', subjectContext: a00Context });

    // raw = 18 < 25 -> no reduction, bonus = 2.75 (IELTS 7.0-8.0 tier)
    expect(result.explanation.find((step) => step.id === 'tump-exact-bonus')?.output).toBe(2.75);
    expect(result.score?.value).toBe(20.75);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('reduces the bonus near the top of the scale (>= 25/30)', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 9, physics: 9, chemistry: 8 } },
      certificates: { ielts: 9 },
    };

    const result = evaluateTumpThptExamAdmission(profile, { fieldCode: '7720501', subjectContext: a00Context });

    // raw = 26 >= 25 -> reduced bonus = [(30-26)/5] * 3 = 2.4
    expect(result.explanation.find((step) => step.id === 'tump-exact-bonus')?.output).toBe(2.4);
    expect(result.score?.value).toBe(28.4);
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };
    const context = { fieldCode: '7720110', subjectContext: a00Context };

    expect(evaluateSchool(profile, 'tump', { context }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['tump'], { tump: context })[0].status).toBe('calculated');
  });
});
