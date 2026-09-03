import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateHcaThptExamAdmission } from './evaluate';

const c00Context = { combinationId: 'C00', subjects: ['literature', 'history', 'geography'] as const };
const luat = { majorCode: '7380101' as const };
const ctxh = { majorCode: '7760101' as const };

describe('HCA exact THPT admission calculator 2025 (5/5 ngành)', () => {
  it('requires a selected major before computing the score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, history: 8, geography: 8 } } };

    const result = evaluateHcaThptExamAdmission(profile, { subjectContext: c00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hca-major' }));
  });

  it('rejects an unmodeled major code', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, history: 8, geography: 8 } } };

    const result = evaluateHcaThptExamAdmission(profile, { majorCode: '9999999', subjectContext: c00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hca-major' }));
  });

  it('marks ineligible below the Luật threshold (24/30)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 6, history: 6, geography: 6 } } };

    const result = evaluateHcaThptExamAdmission(profile, { ...luat, subjectContext: c00Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(18);
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('marks eligible at exactly the Luật threshold', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, history: 8, geography: 8 } } };

    const result = evaluateHcaThptExamAdmission(profile, { ...luat, subjectContext: c00Context });

    expect(result.score?.value).toBe(24);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('applies the Công tác xã hội threshold (22.5/30) with the D14 combination', () => {
    const d14Context = { combinationId: 'D14', subjects: ['literature', 'history', 'english'] as const };
    const profile: ApplicantProfile = { thpt: { scores: { literature: 7.5, history: 7.5, english: 7.5 } } };

    const result = evaluateHcaThptExamAdmission(profile, { ...ctxh, subjectContext: d14Context });

    expect(result.score?.value).toBe(22.5);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('rejects a subject combination not among the ngành-specific 2025 combinations', () => {
    // A00 is not one of Công tác xã hội's 2025 combinations (A01/C00/C03/C04/C14/D01/D14).
    const a00Context = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const };
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateHcaThptExamAdmission(profile, { ...ctxh, subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hca-subject-combination' }));
  });

  it('adds điểm cộng khuyến khích when a bonus group is supplied', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 6, history: 6, geography: 6 } } };

    const result = evaluateHcaThptExamAdmission(profile, { ...luat, subjectContext: c00Context, bonusGroup1: 'national-encouragement' });

    expect(result.explanation.find((s) => s.id === 'hca-exact-bonus')?.output).toBe(1.5);
    expect(result.score?.value).toBe(19.5);
  });

  it('caps combined bonus at 3.0/30 across both groups', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 6, history: 6, geography: 6 } } };

    const result = evaluateHcaThptExamAdmission(profile, {
      ...luat,
      subjectContext: c00Context,
      bonusGroup1: 'national-encouragement',
      bonusGroup2: 'level-6',
    });

    expect(result.explanation.find((s) => s.id === 'hca-exact-bonus')?.output).toBe(3.0);
  });

  it('applies standard priority points and threshold reduction near the top of the scale', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { literature: 8, history: 8, geography: 8.5 } },
      priority: { region: 'KV1' },
    };

    const result = evaluateHcaThptExamAdmission(profile, { ...luat, subjectContext: c00Context });

    // raw = 24.5 >= 22.5 -> reduced priority = [(30-24.5)/7.5] * 0.75 = 0.55
    expect(result.explanation.find((step) => step.id === 'hca-exact-priority')?.output).toBe(0.55);
    expect(result.score?.value).toBe(25.05);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, history: 8 } } };

    const result = evaluateHcaThptExamAdmission(profile, { ...luat, subjectContext: c00Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'hca-thpt-geography' }));
  });

  it('does not mutate ApplicantProfile', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 7, history: 7, geography: 7 } } };
    const frozen = structuredClone(profile);
    evaluateHcaThptExamAdmission(profile, { ...luat, subjectContext: c00Context });
    expect(profile).toEqual(frozen);
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, history: 8, geography: 8 } } };
    const context = { ...luat, subjectContext: c00Context };

    expect(evaluateSchool(profile, 'hca', { context }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['hca'], { hca: context })[0].status).toBe('calculated');
  });
});
