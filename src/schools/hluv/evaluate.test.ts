import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateHluvThptExamAdmission } from './evaluate';

const c01Context = { combinationId: 'C01', subjects: ['literature', 'math', 'physics'] as const };
const a00Context = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const };

describe('HLUV exact THPT admission calculator 2025 (theo ngành)', () => {
  it('marks a profile below the field threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 4, math: 4, physics: 4 } } };

    // Kế toán (7340301) threshold = 16.00.
    const result = evaluateHluvThptExamAdmission(profile, { fieldCode: '7340301', subjectContext: c01Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(12);
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'hluv-threshold-2025' }));
  });

  it('marks a profile at the lowest field threshold as eligible (Kế toán, 16.00/30)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 5.5, math: 5.5, physics: 5 } } };

    const result = evaluateHluvThptExamAdmission(profile, { fieldCode: '7340301', subjectContext: c01Context });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(16);
  });

  it('applies a different threshold for a different field with the same combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 6, math: 6, physics: 6 } } };

    // Du lịch (7810101) threshold = 18.00, Kế toán (7340301) threshold = 16.00.
    const touristResult = evaluateHluvThptExamAdmission(profile, { fieldCode: '7810101', subjectContext: c01Context });
    const accountingResult = evaluateHluvThptExamAdmission(profile, { fieldCode: '7340301', subjectContext: c01Context });

    expect(touristResult.eligibility?.status).toBe('eligible');
    expect(accountingResult.eligibility?.status).toBe('eligible');
    expect(touristResult.score?.value).toBe(18);
    expect(accountingResult.score?.value).toBe(18);
  });

  it('requires a selected field before computing the score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, math: 8, physics: 8 } } };

    const result = evaluateHluvThptExamAdmission(profile, { subjectContext: c01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hluv-field' }));
  });

  it('rejects an unmodeled field code (Giáo dục Mầm non — tổ hợp năng khiếu, not in table)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, math: 8, physics: 8 } } };

    const result = evaluateHluvThptExamAdmission(profile, { fieldCode: '7140201', subjectContext: c01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hluv-field' }));
  });

  it('rejects a subject combination not officially published for the selected field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    // Kế toán (7340301) combinations are C01/C03/C04/D01 — no A00.
    const result = evaluateHluvThptExamAdmission(profile, { fieldCode: '7340301', subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hluv-subject-combination' }));
  });

  it('accepts a subject combination officially published for the selected field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8.5 } } };

    // Sư phạm Toán học (7140209) threshold = 24.02, combinations include A00.
    const result = evaluateHluvThptExamAdmission(profile, { fieldCode: '7140209', subjectContext: a00Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(24.5);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, math: 8 } } };

    const result = evaluateHluvThptExamAdmission(profile, { fieldCode: '7340301', subjectContext: c01Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'hluv-thpt-physics' }));
  });

  it('applies standard priority points and threshold reduction near the top of the scale', () => {
    // Sư phạm Lịch sử - Địa lý (7140249) threshold = 27.07, combination X70 (literature/history/civic-economic-law).
    const x70Context = { combinationId: 'X70', subjects: ['literature', 'history', 'civic-economic-law'] as const };
    const highProfile: ApplicantProfile = {
      thpt: { scores: { literature: 8.5, history: 9, 'civic-economic-law': 9 } },
      priority: { region: 'KV1' },
    };

    const result = evaluateHluvThptExamAdmission(highProfile, { fieldCode: '7140249', subjectContext: x70Context });

    // raw = 26.5 >= 22.5 -> reduced priority = [(30-26.5)/7.5] * 0.75 = 0.35
    expect(result.explanation.find((step) => step.id === 'hluv-exact-priority')?.output).toBe(0.35);
    expect(result.score?.value).toBe(26.85);
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, math: 8, physics: 8 } } };
    const context = { fieldCode: '7340301', subjectContext: c01Context };

    expect(evaluateSchool(profile, 'hluv', { context }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['hluv'], { hluv: context })[0].status).toBe('calculated');
  });
});
