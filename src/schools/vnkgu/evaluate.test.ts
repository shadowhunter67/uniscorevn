import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateVnkguThptExamAdmission } from './evaluate';

const d01Context = { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const };
const a00Context = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const };

describe('VNKGU exact THPT admission calculator 2026 (theo ngành)', () => {
  it('marks a profile below the field threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, literature: 4, english: 4 } } };

    // Kế toán (7340301) threshold = 15.00, combinations include D01.
    const result = evaluateVnkguThptExamAdmission(profile, { fieldCode: '7340301', subjectContext: d01Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(12);
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'vnkgu-cutoff-2026' }));
  });

  it('marks a profile at the lowest field threshold as eligible (Kế toán, 15.00/30)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };

    const result = evaluateVnkguThptExamAdmission(profile, { fieldCode: '7340301', subjectContext: d01Context });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(15);
  });

  it('applies a different threshold for a different field with the same combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, literature: 7, english: 7 } } };

    // Giáo dục Tiểu học (7140202) threshold = 26.70 vs Kế toán (7340301) threshold = 15.00.
    const tieuHocResult = evaluateVnkguThptExamAdmission(profile, { fieldCode: '7140202', subjectContext: d01Context });
    const ketoanResult = evaluateVnkguThptExamAdmission(profile, { fieldCode: '7340301', subjectContext: d01Context });

    expect(tieuHocResult.eligibility?.status).toBe('ineligible');
    expect(ketoanResult.eligibility?.status).toBe('eligible');
    expect(tieuHocResult.score?.value).toBe(21);
    expect(ketoanResult.score?.value).toBe(21);
  });

  it('requires a selected field before computing the score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };

    const result = evaluateVnkguThptExamAdmission(profile, { subjectContext: d01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vnkgu-field' }));
  });

  it('rejects an unmodeled field code', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };

    const result = evaluateVnkguThptExamAdmission(profile, { fieldCode: 'not-a-field', subjectContext: d01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vnkgu-field' }));
  });

  it('rejects a subject combination not officially published for the selected field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    // Sư phạm Tiếng Anh (7140231) combinations are D01/D11/D12/D13/D14/D15/D66/X78 — no A00.
    const result = evaluateVnkguThptExamAdmission(profile, { fieldCode: '7140231', subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vnkgu-subject-combination' }));
  });

  it('accepts a subject combination officially published for the selected field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 9 } } };

    // Công nghệ thông tin (7480201) threshold = 15.00, combinations include A00.
    const result = evaluateVnkguThptExamAdmission(profile, { fieldCode: '7480201', subjectContext: a00Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(25);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8 } } };

    const result = evaluateVnkguThptExamAdmission(profile, { fieldCode: '7340301', subjectContext: d01Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'vnkgu-thpt-english' }));
  });

  it('applies standard priority points and threshold reduction near the top of the scale', () => {
    // Sư phạm Toán học (7140209) threshold = 28.55, combination A00.
    const highProfile: ApplicantProfile = {
      thpt: { scores: { math: 9, physics: 9, chemistry: 8.5 } },
      priority: { region: 'KV1' },
    };

    const result = evaluateVnkguThptExamAdmission(highProfile, { fieldCode: '7140209', subjectContext: a00Context });

    // raw = 26.5 >= 22.5 -> reduced priority = [(30-26.5)/7.5] * 0.75 = 0.35
    expect(result.explanation.find((step) => step.id === 'vnkgu-exact-priority')?.output).toBe(0.35);
    expect(result.score?.value).toBe(26.85);
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };
    const context = { fieldCode: '7340301', subjectContext: d01Context };

    expect(evaluateSchool(profile, 'vnkgu', { context }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['vnkgu'], { vnkgu: context })[0].status).toBe('calculated');
  });
});
