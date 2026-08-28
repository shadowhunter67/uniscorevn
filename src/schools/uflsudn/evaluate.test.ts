import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateUflsudnThptExamAdmission, evaluateUflsudnTeacherTrainingExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('UFLS THPT threshold eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 7, chemistry: 6.5 } } };

    const result = evaluateUflsudnThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'uflsudn-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 7 } } };

    const result = evaluateUflsudnThptExamAdmission(profile, a00Context);

    expect(result.missingInputs).toHaveLength(1);
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'uflsudn-thpt-chemistry' }));
  });

  it('marks totals below the lowest published threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateUflsudnThptExamAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'uflsudn-quality-threshold-2026' }));
  });

  it('keeps totals within the published range unresolved (varies by program)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 6, chemistry: 6 } } };

    const result = evaluateUflsudnThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('unknown');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    // UFLS is now verified-calculator (thanks to the exact method below) — per the same
    // classifyEvaluation rule as UHD/LTVUni/FPFU, a confidence:'partial'/score:undefined result
    // from this BASE method reports generic status 'partial' (not 'ineligible') once the school
    // carries an exact method; use the base method's own `eligibility.status` (asserted above).
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    expect(evaluateSchool(profile, 'uflsudn', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['uflsudn'], { uflsudn: a00Context })[0].status).toBe('partial');
  });
});

describe('UFLS THPT exact eligibility 2026 (uflsudn-teacher-training-exact-2026)', () => {
  it('adds regional/subject priority points into the total before comparing to the floor', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } }, priority: { region: 'KV1', category: 'UT2' } };

    const result = evaluateUflsudnTeacherTrainingExactAdmission(profile, {
      subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] },
    });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(16.75);
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('marks a KV3 profile at exactly the 20/30 floor as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, literature: 7, english: 6 } }, priority: { region: 'KV3' } };

    const result = evaluateUflsudnTeacherTrainingExactAdmission(profile, {
      subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] },
    });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(20);
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, literature: 7, english: 6 } } };

    const result = evaluateUflsudnTeacherTrainingExactAdmission(profile);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('unknown');
  });
});
