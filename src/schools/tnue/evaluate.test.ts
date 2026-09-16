import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateTnueThptExamAdmission } from './evaluate';

const spToan = { fieldCode: '7140209' as const }; // A00: math/physics/chemistry
const sinhHocUngDung = { fieldCode: '7420203' as const }; // B00: math/chemistry/biology
const spNguVan = { fieldCode: '7140217' as const }; // C00: literature/history/geography

describe('TNUE exact THPT admission calculator 2026 (19/22 ngành, tổ hợp gốc cố định)', () => {
  it('requires a selected field before computing the score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateTnueThptExamAdmission(profile);

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'tnue-field' }));
  });

  it('rejects an unmodeled field code (aptitude-based program not modeled)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateTnueThptExamAdmission(profile, { fieldCode: '7140206' });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'tnue-field' }));
  });

  it('marks ineligible below the Sinh học ứng dụng 17,35/30 threshold', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, chemistry: 5, biology: 5 } } };

    const result = evaluateTnueThptExamAdmission(profile, sinhHocUngDung);

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(15);
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('marks eligible at or above the Sinh học ứng dụng 17,35/30 threshold', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, chemistry: 6, biology: 5.35 } } };

    const result = evaluateTnueThptExamAdmission(profile, sinhHocUngDung);

    expect(result.score?.value).toBe(17.35);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('applies the Sư phạm Toán học threshold (27,13/30), higher than Sinh học ứng dụng', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 9.13, physics: 9, chemistry: 9 } } };

    const result = evaluateTnueThptExamAdmission(profile, spToan);

    expect(result.score?.value).toBe(27.13);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('computes the raw total from the fixed combination for the chosen field (C00)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 9, history: 9, geography: 8.63 } } };

    const result = evaluateTnueThptExamAdmission(profile, spNguVan);

    expect(result.explanation.find((step) => step.id === 'tnue-exact-raw')?.output).toBe(26.63);
  });

  it('reports missing THPT subject scores for the fixed combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8 } } };

    const result = evaluateTnueThptExamAdmission(profile, spToan);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'tnue-thpt-chemistry' }));
  });

  it('applies standard priority points and threshold reduction near the top of the scale', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 8, physics: 8, chemistry: 8.5 } },
      priority: { region: 'KV1' },
    };

    const result = evaluateTnueThptExamAdmission(profile, spToan);

    // raw = 24.5 >= 22.5 -> reduced priority = [(30-24.5)/7.5] * 0.75 = 0.55
    expect(result.explanation.find((step) => step.id === 'tnue-exact-priority')?.output).toBe(0.55);
    expect(result.score?.value).toBe(25.05);
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('does not mutate ApplicantProfile', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };
    const frozen = structuredClone(profile);
    evaluateTnueThptExamAdmission(profile, spToan);
    expect(profile).toEqual(frozen);
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 9.13, physics: 9, chemistry: 9 } } };

    expect(evaluateSchool(profile, 'tnue', { context: spToan }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['tnue'], { tnue: spToan })[0].status).toBe('calculated');
  });
});
