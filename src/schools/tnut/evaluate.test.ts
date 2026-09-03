import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateTnutThptExamAdmission } from './evaluate';

const a00Context = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const };
const c01Context = { combinationId: 'C01', subjects: ['literature', 'math', 'physics'] as const };
const x05Context = { combinationId: 'X05', subjects: ['math', 'physics', 'civic-economic-law'] as const };

describe('TNUT exact THPT admission calculator 2025 (theo mã xét tuyển)', () => {
  it('marks a profile below the field threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateTnutThptExamAdmission(profile, { fieldCode: 'KTM', subjectContext: a00Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(12);
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'tnut-threshold-2025' }));
  });

  it('marks a profile at the lowest field threshold as eligible (Kỹ thuật môi trường, KTM, 15.00/30)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateTnutThptExamAdmission(profile, { fieldCode: 'KTM', subjectContext: a00Context });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(15);
  });

  it('applies a different threshold for a different field with the same combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 7 } } };

    // Kỹ thuật cơ khí (KTC) threshold = 20.25, CBM (Kỹ thuật điện tử - viễn thông chuyên ngành bán dẫn) threshold = 24.5.
    const ktcResult = evaluateTnutThptExamAdmission(profile, { fieldCode: 'KTC', subjectContext: a00Context });
    const cbmResult = evaluateTnutThptExamAdmission(profile, { fieldCode: 'CBM', subjectContext: a00Context });

    expect(ktcResult.eligibility?.status).toBe('eligible');
    expect(cbmResult.eligibility?.status).toBe('ineligible');
  });

  it('requires a selected field before computing the score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateTnutThptExamAdmission(profile, { subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'tnut-field' }));
  });

  it('rejects an unmodeled field code', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateTnutThptExamAdmission(profile, { fieldCode: 'ZZZZ', subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'tnut-field' }));
  });

  it('rejects a subject combination not officially published for the selected field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    // CBM combinations are A00/A01/C01 only — X05 is not among them.
    const result = evaluateTnutThptExamAdmission(profile, { fieldCode: 'CBM', subjectContext: x05Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'tnut-subject-combination' }));
  });

  it('accepts a subject combination officially published for the selected field (CBM + C01)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, math: 8, physics: 8.5 } } };

    const result = evaluateTnutThptExamAdmission(profile, { fieldCode: 'CBM', subjectContext: c01Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(24.5);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('accepts the X05 combination for Kinh tế công nghiệp (KCN)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 5, 'civic-economic-law': 5 } } };

    const result = evaluateTnutThptExamAdmission(profile, { fieldCode: 'KCN', subjectContext: x05Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(16);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8 } } };

    const result = evaluateTnutThptExamAdmission(profile, { fieldCode: 'KTM', subjectContext: a00Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'tnut-thpt-chemistry' }));
  });

  it('applies standard priority points and threshold reduction near the top of the scale', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 8, physics: 8, chemistry: 8.5 } },
      priority: { region: 'KV1' },
    };

    const result = evaluateTnutThptExamAdmission(profile, { fieldCode: 'KCT', subjectContext: a00Context });

    // raw = 24.5 >= 22.5 -> reduced priority = [(30-24.5)/7.5] * 0.75 = 0.55
    expect(result.explanation.find((step) => step.id === 'tnut-exact-priority')?.output).toBe(0.55);
    expect(result.score?.value).toBe(25.05);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };
    const context = { fieldCode: 'KTM', subjectContext: a00Context };

    expect(evaluateSchool(profile, 'tnut', { context }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['tnut'], { tnut: context })[0].status).toBe('calculated');
  });
});
