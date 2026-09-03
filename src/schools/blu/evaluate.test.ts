import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateBluThptExamAdmission } from './evaluate';

const c01Context = { combinationId: 'C01', subjects: ['literature', 'math', 'physics'] as const };
const a00Context = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const };

describe('BLU exact THPT admission calculator 2026 (theo ngành)', () => {
  it('marks a profile below the field threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 4, math: 4, physics: 4 } } };

    // Kế toán (7340301) threshold = 15.00.
    const result = evaluateBluThptExamAdmission(profile, { fieldCode: '7340301', subjectContext: c01Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(12);
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'blu-cutoff-2026' }));
  });

  it('marks a profile at the lowest field threshold as eligible (Kế toán, 15.00/30)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 5, math: 5, physics: 5 } } };

    const result = evaluateBluThptExamAdmission(profile, { fieldCode: '7340301', subjectContext: c01Context });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(15);
  });

  it('applies a different threshold for a different field with the same combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, math: 8, physics: 8 } } };

    // Sư phạm Toán học (7140209) threshold = 24.66 vs Kế toán (7340301) threshold = 15.00.
    const mathTeacherResult = evaluateBluThptExamAdmission(profile, { fieldCode: '7140209', subjectContext: c01Context });
    const accountingResult = evaluateBluThptExamAdmission(profile, { fieldCode: '7340301', subjectContext: c01Context });

    expect(mathTeacherResult.eligibility?.status).toBe('ineligible');
    expect(accountingResult.eligibility?.status).toBe('eligible');
    expect(mathTeacherResult.score?.value).toBe(24);
    expect(accountingResult.score?.value).toBe(24);
  });

  it('requires a selected field before computing the score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, math: 8, physics: 8 } } };

    const result = evaluateBluThptExamAdmission(profile, { subjectContext: c01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'blu-field' }));
  });

  it('rejects an unmodeled field code (Giáo dục Mầm non — cao đẳng, tổ hợp năng khiếu, not in table)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, math: 8, physics: 8 } } };

    const result = evaluateBluThptExamAdmission(profile, { fieldCode: '51140201', subjectContext: c01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'blu-field' }));
  });

  it('rejects a subject combination not officially published for the selected field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    // Tiếng Việt và Văn hóa Việt Nam (7220101) combinations are B03/C00/C01/C02/C03/C04/D01 — no A00.
    const result = evaluateBluThptExamAdmission(profile, { fieldCode: '7220101', subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'blu-subject-combination' }));
  });

  it('accepts a subject combination officially published for the selected field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 9 } } };

    // Sư phạm Toán học (7140209) threshold = 24.66, combinations include A00.
    const result = evaluateBluThptExamAdmission(profile, { fieldCode: '7140209', subjectContext: a00Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(25);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, math: 8 } } };

    const result = evaluateBluThptExamAdmission(profile, { fieldCode: '7340301', subjectContext: c01Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'blu-thpt-physics' }));
  });

  it('applies standard priority points and threshold reduction near the top of the scale', () => {
    // Sư phạm Toán học (7140209) threshold = 24.66, combination A00.
    const highProfile: ApplicantProfile = {
      thpt: { scores: { math: 9, physics: 9, chemistry: 8.5 } },
      priority: { region: 'KV1' },
    };

    const result = evaluateBluThptExamAdmission(highProfile, { fieldCode: '7140209', subjectContext: a00Context });

    // raw = 26.5 >= 22.5 -> reduced priority = [(30-26.5)/7.5] * 0.75 = 0.35
    expect(result.explanation.find((step) => step.id === 'blu-exact-priority')?.output).toBe(0.35);
    expect(result.score?.value).toBe(26.85);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, math: 8, physics: 8 } } };
    const context = { fieldCode: '7340301', subjectContext: c01Context };

    expect(evaluateSchool(profile, 'blu', { context }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['blu'], { blu: context })[0].status).toBe('calculated');
  });
});
