import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateMkuThptExamAdmission } from './evaluate';

const a00Context = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const };
const marketing = { fieldCode: '7340115' as const };
const luat = { fieldCode: '7380101' as const };

describe('MKU exact THPT admission calculator 2026 (33/42 ngành, khối sức khỏe chưa mô hình hoá)', () => {
  it('requires a selected field before computing the score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateMkuThptExamAdmission(profile, { subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'mku-field' }));
  });

  it('rejects an unmodeled field code (health cluster not modeled)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateMkuThptExamAdmission(profile, { fieldCode: '7720101', subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'mku-field' }));
  });

  it('marks ineligible below the flat 15/30 threshold', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateMkuThptExamAdmission(profile, { ...marketing, subjectContext: a00Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(12);
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('marks eligible at exactly the flat 15/30 threshold', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateMkuThptExamAdmission(profile, { ...marketing, subjectContext: a00Context });

    expect(result.score?.value).toBe(15);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('applies the Luật cluster threshold (20/30), higher than the flat 15/30 group', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 7, chemistry: 7 } } };

    const result = evaluateMkuThptExamAdmission(profile, { ...luat, subjectContext: a00Context });

    expect(result.score?.value).toBe(20);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('rejects a subject combination not in the field official combination list (X10 excluded — conflicts with existing X10 mapping)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, chemistry: 8, informatics: 8 } } };
    const x10Context = { combinationId: 'X10', subjects: ['math', 'chemistry', 'informatics'] as const };

    const result = evaluateMkuThptExamAdmission(profile, { ...marketing, subjectContext: x10Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'mku-subject-combination' }));
  });

  it('accepts the Kế toán cluster extra combinations (X05, X26)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, informatics: 6, english: 7 } } };
    const x26Context = { combinationId: 'X26', subjects: ['math', 'informatics', 'english'] as const };

    const result = evaluateMkuThptExamAdmission(profile, { fieldCode: '7340301', subjectContext: x26Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(20);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8 } } };

    const result = evaluateMkuThptExamAdmission(profile, { ...marketing, subjectContext: a00Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'mku-thpt-chemistry' }));
  });

  it('applies standard priority points and threshold reduction near the top of the scale', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 8, physics: 8, chemistry: 8.5 } },
      priority: { region: 'KV1' },
    };

    const result = evaluateMkuThptExamAdmission(profile, { ...marketing, subjectContext: a00Context });

    // raw = 24.5 >= 22.5 -> reduced priority = [(30-24.5)/7.5] * 0.75 = 0.55
    expect(result.explanation.find((step) => step.id === 'mku-exact-priority')?.output).toBe(0.55);
    expect(result.score?.value).toBe(25.05);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('does not mutate ApplicantProfile', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };
    const frozen = structuredClone(profile);
    evaluateMkuThptExamAdmission(profile, { ...marketing, subjectContext: a00Context });
    expect(profile).toEqual(frozen);
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };
    const context = { ...marketing, subjectContext: a00Context };

    expect(evaluateSchool(profile, 'mku', { context }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['mku'], { mku: context })[0].status).toBe('calculated');
  });
});
