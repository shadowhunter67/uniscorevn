import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateDlaThptExamAdmission } from './evaluate';

const d01Context = { combinationId: 'D01', subjects: ['literature', 'math', 'english'] as const };
const c01Context = { combinationId: 'C01', subjects: ['literature', 'math', 'physics'] as const };

describe('DLA exact THPT admission calculator 2026 (theo ngành)', () => {
  it('marks a profile below the field threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 4, math: 4, english: 4 } } };

    // Kế toán (7340301) threshold = 15.00.
    const result = evaluateDlaThptExamAdmission(profile, { fieldCode: '7340301', subjectContext: d01Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(12);
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'dla-cutoff-2026' }));
  });

  it('marks a profile at the lowest field threshold as eligible (Kế toán, 15.00/30)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 5, math: 5, english: 5 } } };

    const result = evaluateDlaThptExamAdmission(profile, { fieldCode: '7340301', subjectContext: d01Context });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(15);
  });

  it('applies a different (higher) threshold for Luật Kinh tế than the other majors', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 6, math: 6, english: 6 } } };

    // Luật Kinh tế (7380107) threshold = 20.00 vs Kế toán (7340301) threshold = 15.00.
    const lawResult = evaluateDlaThptExamAdmission(profile, { fieldCode: '7380107', subjectContext: d01Context });
    const accountingResult = evaluateDlaThptExamAdmission(profile, { fieldCode: '7340301', subjectContext: d01Context });

    expect(lawResult.eligibility?.status).toBe('ineligible');
    expect(accountingResult.eligibility?.status).toBe('eligible');
    expect(lawResult.score?.value).toBe(18);
    expect(accountingResult.score?.value).toBe(18);
  });

  it('requires a selected field before computing the score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, math: 8, english: 8 } } };

    const result = evaluateDlaThptExamAdmission(profile, { subjectContext: d01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'dla-field' }));
  });

  it('rejects an unmodeled field code', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, math: 8, english: 8 } } };

    const result = evaluateDlaThptExamAdmission(profile, { fieldCode: '9999999', subjectContext: d01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'dla-field' }));
  });

  it('rejects a subject combination not officially published for the selected field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    // Ngôn ngữ Anh (7220201) combinations are D01/D09/C14/D14/D15/C00 — no A00.
    const a00Context = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const };
    const result = evaluateDlaThptExamAdmission(profile, { fieldCode: '7220201', subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'dla-subject-combination' }));
  });

  it('accepts a subject combination officially published for the selected field (C01 for Kế toán, group A)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, math: 8, physics: 9 } } };

    const result = evaluateDlaThptExamAdmission(profile, { fieldCode: '7340301', subjectContext: c01Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(25);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, math: 8 } } };

    const result = evaluateDlaThptExamAdmission(profile, { fieldCode: '7340301', subjectContext: d01Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'dla-thpt-english' }));
  });

  it('applies standard priority points and threshold reduction near the top of the scale', () => {
    // Luật Kinh tế (7380107) threshold = 20.00, combination D01.
    const highProfile: ApplicantProfile = {
      thpt: { scores: { literature: 9, math: 9, english: 8.5 } },
      priority: { region: 'KV1' },
    };

    const result = evaluateDlaThptExamAdmission(highProfile, { fieldCode: '7380107', subjectContext: d01Context });

    // raw = 26.5 >= 22.5 -> reduced priority = [(30-26.5)/7.5] * 0.75 = 0.35
    expect(result.explanation.find((step) => step.id === 'dla-exact-priority')?.output).toBe(0.35);
    expect(result.score?.value).toBe(26.85);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, math: 8, english: 8 } } };
    const context = { fieldCode: '7340301', subjectContext: d01Context };

    expect(evaluateSchool(profile, 'dla', { context }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['dla'], { dla: context })[0].status).toBe('calculated');
  });
});
