import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateDhvThptExamAdmission } from './evaluate';

const d01Context = { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const };
const cntt = { fieldCode: '7480201' as const };
const luat = { fieldCode: '7380101' as const };

describe('DHV exact THPT admission calculator 2026 (23/23 mã xét tuyển)', () => {
  it('requires a selected field before computing the score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };

    const result = evaluateDhvThptExamAdmission(profile, { subjectContext: d01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'dhv-field' }));
  });

  it('rejects an unmodeled field code', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };

    const result = evaluateDhvThptExamAdmission(profile, { fieldCode: '9999999', subjectContext: d01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'dhv-field' }));
  });

  it('marks ineligible below the Công nghệ Thông tin 15,00/30 threshold', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, literature: 4, english: 4 } } };

    const result = evaluateDhvThptExamAdmission(profile, { ...cntt, subjectContext: d01Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(12);
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('marks eligible at exactly the Công nghệ Thông tin 15,00/30 threshold', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };

    const result = evaluateDhvThptExamAdmission(profile, { ...cntt, subjectContext: d01Context });

    expect(result.score?.value).toBe(15);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('applies the Luật threshold (20/30), higher than the CNTT tier', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 7, english: 7 } } };

    const result = evaluateDhvThptExamAdmission(profile, { ...luat, subjectContext: d01Context });

    expect(result.score?.value).toBe(20);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('accepts any subject combination (DHV does not restrict combos per field)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };
    const a00Context = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const };

    const result = evaluateDhvThptExamAdmission(profile, { ...cntt, subjectContext: a00Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8 } } };

    const result = evaluateDhvThptExamAdmission(profile, { ...cntt, subjectContext: d01Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'dhv-thpt-english' }));
  });

  it('applies standard priority points and threshold reduction near the top of the scale', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 8, literature: 8, english: 8.5 } },
      priority: { region: 'KV1' },
    };

    const result = evaluateDhvThptExamAdmission(profile, { ...cntt, subjectContext: d01Context });

    // raw = 24.5 >= 22.5 -> reduced priority = [(30-24.5)/7.5] * 0.75 = 0.55
    expect(result.explanation.find((step) => step.id === 'dhv-exact-priority')?.output).toBe(0.55);
    expect(result.score?.value).toBe(25.05);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('does not mutate ApplicantProfile', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, literature: 7, english: 7 } } };
    const frozen = structuredClone(profile);
    evaluateDhvThptExamAdmission(profile, { ...cntt, subjectContext: d01Context });
    expect(profile).toEqual(frozen);
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };
    const context = { ...cntt, subjectContext: d01Context };

    expect(evaluateSchool(profile, 'dhv', { context }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['dhv'], { dhv: context })[0].status).toBe('calculated');
  });
});
