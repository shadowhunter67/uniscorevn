import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateHpu2ThptExamAdmission } from './evaluate';

const a00Context = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const };
const cntt = { fieldCode: '7480201' as const };
const spToan = { fieldCode: '7140209' as const };

describe('HPU2 exact THPT admission calculator 2026 (25/25 ngành nhóm 3-môn chuẩn)', () => {
  it('requires a selected field before computing the score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateHpu2ThptExamAdmission(profile, { subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hpu2-field' }));
  });

  it('rejects an unmodeled field code', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateHpu2ThptExamAdmission(profile, { fieldCode: '9999999', subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hpu2-field' }));
  });

  it('marks ineligible below the Công nghệ thông tin 21,56/30 threshold', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluateHpu2ThptExamAdmission(profile, { ...cntt, subjectContext: a00Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(18);
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('marks eligible at or above the Công nghệ thông tin 21,56/30 threshold', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7.5, physics: 7, chemistry: 7.06 } } };

    const result = evaluateHpu2ThptExamAdmission(profile, { ...cntt, subjectContext: a00Context });

    expect(result.score?.value).toBe(21.56);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('applies the Sư phạm Toán học threshold (27,51/30), higher than the CNTT tier', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 9.2, physics: 9.2, chemistry: 9.11 } } };

    const result = evaluateHpu2ThptExamAdmission(profile, { ...spToan, subjectContext: a00Context });

    expect(result.score?.value).toBe(27.51);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('accepts any subject combination (HPU2 does not restrict combos per field)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };
    const d01Context = { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const };

    const result = evaluateHpu2ThptExamAdmission(profile, { ...cntt, subjectContext: d01Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8 } } };

    const result = evaluateHpu2ThptExamAdmission(profile, { ...cntt, subjectContext: a00Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'hpu2-thpt-chemistry' }));
  });

  it('applies standard priority points and threshold reduction near the top of the scale', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 8, physics: 8, chemistry: 8.5 } },
      priority: { region: 'KV1' },
    };

    const result = evaluateHpu2ThptExamAdmission(profile, { ...cntt, subjectContext: a00Context });

    // raw = 24.5 >= 22.5 -> reduced priority = [(30-24.5)/7.5] * 0.75 = 0.55
    expect(result.explanation.find((step) => step.id === 'hpu2-exact-priority')?.output).toBe(0.55);
    expect(result.score?.value).toBe(25.05);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('does not mutate ApplicantProfile', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };
    const frozen = structuredClone(profile);
    evaluateHpu2ThptExamAdmission(profile, { ...cntt, subjectContext: a00Context });
    expect(profile).toEqual(frozen);
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };
    const context = { ...cntt, subjectContext: a00Context };

    expect(evaluateSchool(profile, 'hpu2', { context }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['hpu2'], { hpu2: context })[0].status).toBe('calculated');
  });
});
