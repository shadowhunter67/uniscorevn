import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateDutThptExamAdmission } from './evaluate';

const a00Context = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const };
const moiTruong = { fieldCode: '7520320' as const }; // Kỹ thuật môi trường, 18.25
const cntt = { fieldCode: '7480201' as const }; // Công nghệ thông tin, 23.00

describe('DUT exact THPT admission calculator 2026 (49/49 ngành/chuyên ngành)', () => {
  it('requires a selected field before computing the score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateDutThptExamAdmission(profile, { subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'dut-field' }));
  });

  it('rejects an unmodeled field code', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateDutThptExamAdmission(profile, { fieldCode: '9999999', subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'dut-field' }));
  });

  it('marks ineligible below the Kỹ thuật môi trường 18,25/30 threshold', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateDutThptExamAdmission(profile, { ...moiTruong, subjectContext: a00Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(15);
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('marks eligible at or above the Kỹ thuật môi trường 18,25/30 threshold', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6.25, physics: 6, chemistry: 6 } } };

    const result = evaluateDutThptExamAdmission(profile, { ...moiTruong, subjectContext: a00Context });

    expect(result.score?.value).toBe(18.25);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('applies the Công nghệ thông tin threshold (23,00/30), higher than Kỹ thuật môi trường', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 7.5, chemistry: 7.5 } } };

    const result = evaluateDutThptExamAdmission(profile, { ...cntt, subjectContext: a00Context });

    expect(result.score?.value).toBe(23);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('accepts any subject combination (DUT does not restrict combos per field)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };
    const d01Context = { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const };

    const result = evaluateDutThptExamAdmission(profile, { ...cntt, subjectContext: d01Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8 } } };

    const result = evaluateDutThptExamAdmission(profile, { ...cntt, subjectContext: a00Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'dut-thpt-chemistry' }));
  });

  it('applies standard priority points and threshold reduction near the top of the scale', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 8, physics: 8, chemistry: 8.5 } },
      priority: { region: 'KV1' },
    };

    const result = evaluateDutThptExamAdmission(profile, { ...cntt, subjectContext: a00Context });

    // raw = 24.5 >= 22.5 -> reduced priority = [(30-24.5)/7.5] * 0.75 = 0.55
    expect(result.explanation.find((step) => step.id === 'dut-exact-priority')?.output).toBe(0.55);
    expect(result.score?.value).toBe(25.05);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('does not mutate ApplicantProfile', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };
    const frozen = structuredClone(profile);
    evaluateDutThptExamAdmission(profile, { ...cntt, subjectContext: a00Context });
    expect(profile).toEqual(frozen);
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };
    const context = { ...cntt, subjectContext: a00Context };

    expect(evaluateSchool(profile, 'dut', { context }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['dut'], { dut: context })[0].status).toBe('calculated');
  });
});
