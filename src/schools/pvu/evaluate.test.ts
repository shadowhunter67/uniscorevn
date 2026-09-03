import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluatePvuThptExamAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('PVU exact THPT calculator 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluatePvuThptExamAdmission(profile);

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'pvu-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8 } } };

    const result = evaluatePvuThptExamAdmission(profile, a00Context);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'pvu-thpt-chemistry' }));
  });

  it('marks a profile below the threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluatePvuThptExamAdmission(profile, a00Context);

    expect(result.confidence).toBe('exact-verified');
    expect(result.score).toEqual({ value: 18, scale: 30 });
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('marks a profile at the 22.5/30 threshold as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7.5, physics: 7.5, chemistry: 7.5 } } };

    const result = evaluatePvuThptExamAdmission(profile, a00Context);

    expect(result.score).toEqual({ value: 22.5, scale: 30 });
    expect(result.eligibility?.status).toBe('eligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'pvu-threshold-2026' }));
  });

  it('applies standard national priority points and threshold reduction near the top of the scale', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 8, physics: 8, chemistry: 8.5 } },
      priority: { region: 'KV1' },
    };

    const result = evaluatePvuThptExamAdmission(profile, a00Context);

    // raw = 24.5 >= 22.5 -> reduced priority = [(30-24.5)/7.5] * 0.75 = 0.55
    expect(result.explanation.find((step) => step.id === 'pvu-exact-priority')?.output).toBe(0.55);
    expect(result.score?.value).toBe(25.05);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('applies the same threshold regardless of which of the 11 combinations is used', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7.5, chemistry: 7.5, informatics: 7.5 } } };
    const x10Context = { subjectContext: { combinationId: 'X10', subjects: ['math', 'chemistry', 'informatics'] as const } };

    const result = evaluatePvuThptExamAdmission(profile, x10Context);

    expect(result.score).toEqual({ value: 22.5, scale: 30 });
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    expect(evaluateSchool(profile, 'pvu', { context: a00Context }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['pvu'], { pvu: a00Context })[0].status).toBe('calculated');
  });
});
