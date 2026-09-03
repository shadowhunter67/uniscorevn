import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateTuebaThptExamAdmission } from './evaluate';

const a00Context = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const };

describe('TUEBA exact THPT floor calculator 2026 (theo ngành)', () => {
  it('marks a profile below the field threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateTuebaThptExamAdmission(profile, { fieldCode: '7310104', subjectContext: a00Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(12);
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'tueba-threshold-2026' }));
  });

  it('marks a profile at the lowest field threshold as eligible (Kinh tế đầu tư, 17.0/30)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 5 } } };

    const result = evaluateTuebaThptExamAdmission(profile, { fieldCode: '7310104', subjectContext: a00Context });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(17);
  });

  it('applies a different threshold for a different field with the same combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6.5 } } };

    // Luật kinh tế (7380107) threshold = 20.0, Kế toán (7340301) threshold = 17.5.
    const lawResult = evaluateTuebaThptExamAdmission(profile, { fieldCode: '7380107', subjectContext: a00Context });
    const accountingResult = evaluateTuebaThptExamAdmission(profile, { fieldCode: '7340301', subjectContext: a00Context });

    expect(lawResult.eligibility?.status).toBe('ineligible');
    expect(accountingResult.eligibility?.status).toBe('eligible');
  });

  it('requires a selected field before computing the score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateTuebaThptExamAdmission(profile, { subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'tueba-field' }));
  });

  it('rejects an unmodeled field code', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateTuebaThptExamAdmission(profile, { fieldCode: '9999999', subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'tueba-field' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8 } } };

    const result = evaluateTuebaThptExamAdmission(profile, { fieldCode: '7340301', subjectContext: a00Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'tueba-thpt-chemistry' }));
  });

  it('applies standard national priority points and threshold reduction near the top of the scale', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 8, physics: 8, chemistry: 8.5 } },
      priority: { region: 'KV1' },
    };

    const result = evaluateTuebaThptExamAdmission(profile, { fieldCode: '7380107', subjectContext: a00Context });

    // raw = 24.5 >= 22.5 -> reduced priority = [(30-24.5)/7.5] * 0.75 = 0.55
    expect(result.explanation.find((step) => step.id === 'tueba-exact-priority')?.output).toBe(0.55);
    expect(result.score?.value).toBe(25.05);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };
    const context = { fieldCode: '7340301', subjectContext: a00Context };

    expect(evaluateSchool(profile, 'tueba', { context }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['tueba'], { tueba: context })[0].status).toBe('calculated');
  });
});
