import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateQbuThptExamAdmission, evaluateQbuThptExamExactAdmission } from './evaluate';

const d01Context = { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };

describe('QBU baseline THPT calculator 2025 (dải điểm chuẩn, không chọn ngành)', () => {
  it('marks a profile below the lowest published threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 2, literature: 2, english: 2 } } };

    const result = evaluateQbuThptExamAdmission(profile, d01Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('marks a profile above the highest published threshold as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 10, literature: 10, english: 10 } } };

    const result = evaluateQbuThptExamAdmission(profile, d01Context);

    expect(result.eligibility?.status).toBe('eligible');
  });

  it('marks a profile in the middle of the range as unknown (needs a chosen field)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, literature: 7, english: 7 } } };

    const result = evaluateQbuThptExamAdmission(profile, d01Context);

    expect(result.eligibility?.status).toBe('unknown');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, literature: 7, english: 7 } } };

    const result = evaluateQbuThptExamAdmission(profile);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'qbu-subject-combination' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters (baseline method)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 2, literature: 2, english: 2 } } };

    expect(evaluateSchool(profile, 'qbu', { context: d01Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['qbu'], { qbu: d01Context })[0].status).toBe('partial');
  });
});

describe('QBU exact THPT calculator 2025 (theo ngành và tổ hợp)', () => {
  it('marks a profile below the field/combination threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 3, literature: 3, english: 3 } } };

    const result = evaluateQbuThptExamExactAdmission(profile, { fieldCode: '7220201', ...d01Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(9);
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'qbu-threshold-2025' }));
  });

  it('marks a profile at the field/combination threshold as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5.16, literature: 5.16, english: 5.16 } } };

    const result = evaluateQbuThptExamExactAdmission(profile, { fieldCode: '7220201', ...d01Context });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(15.48);
  });

  it('requires a selected field before computing the exact score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };

    const result = evaluateQbuThptExamExactAdmission(profile, d01Context);

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'qbu-field' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8 } } };

    const result = evaluateQbuThptExamExactAdmission(profile, { fieldCode: '7220201', ...d01Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'qbu-thpt-english' }));
  });

  it('rejects an unmodeled field code', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };

    const result = evaluateQbuThptExamExactAdmission(profile, { fieldCode: '9999999', ...d01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'qbu-field' }));
  });

  it('rejects a subject combination not published for the chosen field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    // Ngôn ngữ Anh (7220201) không nhận A00 (chỉ A01/D01/D09/D10/D14/D15) — A00 không thuộc danh sách.
    const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };
    const result = evaluateQbuThptExamExactAdmission(profile, { fieldCode: '7220201', ...a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'qbu-subject-combination-not-in-list' }));
  });

  it('applies a different threshold for the same field with a different combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 5.9, geography: 5.9, english: 5.9 } } };

    // Ngôn ngữ Anh D15 threshold = 17.33, higher than D09's 15.00.
    const d15Context = { subjectContext: { combinationId: 'D15', subjects: ['literature', 'geography', 'english'] as const } };
    const result = evaluateQbuThptExamExactAdmission(profile, { fieldCode: '7220201', ...d15Context });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.explanation.find((step) => step.id === 'qbu-exact-threshold')?.output).toBe(17.33);
  });
});
