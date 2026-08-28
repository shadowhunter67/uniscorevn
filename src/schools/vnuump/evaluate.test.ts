import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateVnuumpThptExamAdmission, evaluateVnuumpThptExamExactAdmission } from './evaluate';

const b00Context = { subjectContext: { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] as const } };

describe('VNU-UMP THPT baseline eligibility 2026', () => {
  it('marks profiles below the 15/30 floor as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, chemistry: 4, biology: 4 } } };

    const result = evaluateVnuumpThptExamAdmission(profile, b00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'vnuump-admission-notice-2026' }));
  });

  it('marks profiles meeting the floor as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, chemistry: 5, biology: 5 } } };

    const result = evaluateVnuumpThptExamAdmission(profile, b00Context);

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toBeUndefined();
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, chemistry: 5, biology: 5 } } };

    const result = evaluateVnuumpThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vnuump-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, chemistry: 5 } } };

    const result = evaluateVnuumpThptExamAdmission(profile, b00Context);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'vnuump-thpt-biology' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    // VNU-UMP is now verified-calculator (thanks to the exact method below) — per the same
    // classifyEvaluation rule as CTUMP/PNTU/UHD/TBU/FBU/USH, a confidence:'partial'/score:undefined
    // result from this BASE method reports generic status 'partial' once the school carries an
    // exact method (regardless of the base method's own eligible/ineligible verdict — use the
    // base method's own `eligibility.status` instead, asserted above).
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, chemistry: 4, biology: 4 } } };

    expect(evaluateSchool(profile, 'vnuump', { context: b00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['vnuump'], { vnuump: b00Context })[0].status).toBe('partial');
  });
});

describe('VNU-UMP THPT exact eligibility 2026 (vnuump-thpt-exam-exact-2026)', () => {
  it('adds priority points into the total before comparing to the per-program floor', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 7, chemistry: 6, biology: 6 } },
      priority: { region: 'KV1', category: 'UT2' },
    };

    const result = evaluateVnuumpThptExamExactAdmission(profile, { programId: 'ky-thuat-xet-nghiem', subjectContext: b00Context.subjectContext });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(20.75);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('requires a selected program', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, chemistry: 6, biology: 6 } } };

    const result = evaluateVnuumpThptExamExactAdmission(profile, { subjectContext: b00Context.subjectContext });

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('unknown');
  });
});
