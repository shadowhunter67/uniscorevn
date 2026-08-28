import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateLtvuniThptExamAdmission, evaluateLtvuniThptExamExactAdmission } from './evaluate';

const combo = { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };
const standard = { ...combo, group: 'standard' as const };
const traditionalMedicine = { ...combo, group: 'traditionalMedicine' as const };

describe('LTVUni THPT-exam eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6, english: 6 } } };

    const result = evaluateLtvuniThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'ltvuni-subject-combination' }));
  });

  it('applies the 15/30 standard floor by default', () => {
    const below: ApplicantProfile = { thpt: { scores: { math: 4, literature: 5, english: 5.5 } } };
    const at: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };

    expect(evaluateLtvuniThptExamAdmission(below, standard).eligibility?.status).toBe('ineligible');
    expect(evaluateLtvuniThptExamAdmission(at, standard).eligibility?.status).toBe('eligible');
  });

  it('applies the higher 20/30 traditionalMedicine floor', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6, english: 6.5 } } };

    const result = evaluateLtvuniThptExamAdmission(profile, traditionalMedicine);

    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'ltvuni-quality-threshold-2026' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    // LTVUni is now verified-calculator (thanks to the exact method below) — per the same
    // classifyEvaluation rule as UHD/CTUMP/PNTU, a confidence:'partial' result from this BASE
    // method reports generic status 'partial' (not 'eligible') once the school carries an exact
    // method; use the base method's own `eligibility.status` (asserted above).
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };

    expect(evaluateSchool(profile, 'ltvuni', { context: standard }).status).toBe('partial');
    expect(evaluateSchools(profile, ['ltvuni'], { ltvuni: standard })[0].status).toBe('partial');
  });
});

describe('LTVUni THPT exact eligibility 2026 (ltvuni-thpt-exam-exact-2026)', () => {
  it('adds regional/subject priority points into the total before comparing to the floor', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, literature: 4, english: 4 } }, priority: { region: 'KV1', category: 'UT2' } };

    const result = evaluateLtvuniThptExamExactAdmission(profile, standard);

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(13.75);
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('marks a KV3 profile at exactly the 15/30 standard floor as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } }, priority: { region: 'KV3' } };

    const result = evaluateLtvuniThptExamExactAdmission(profile, standard);

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(15);
  });

  it('applies the higher 20/30 traditionalMedicine floor', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, chemistry: 6, biology: 6.5 } }, priority: { region: 'KV3' } };

    const result = evaluateLtvuniThptExamExactAdmission(profile, {
      group: 'traditionalMedicine',
      subjectContext: { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] },
    });

    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };

    const result = evaluateLtvuniThptExamExactAdmission(profile);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('unknown');
  });
});
