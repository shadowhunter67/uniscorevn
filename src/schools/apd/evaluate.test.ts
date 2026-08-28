import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateApdThptExamAdmission, evaluateApdThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('APD THPT baseline eligibility 2026', () => {
  it('marks profiles below the lowest published floor (16/30) as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateApdThptExamAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'apd-admission-2026' }));
  });

  it('keeps profiles between the branch floor and the main-campus floor unresolved', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluateApdThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.eligibility?.reasons.join(' ')).toContain('16');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluateApdThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'apd-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6 } } };

    const result = evaluateApdThptExamAdmission(profile, a00Context);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'apd-thpt-chemistry' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    // APD is now verified-calculator (thanks to the exact method below) — per the same
    // classifyEvaluation rule as CTUMP/PNTU/UHD, a confidence:'partial'/score:undefined result
    // from this BASE method reports generic status 'partial' (not 'ineligible') once the school
    // carries an exact method; use the base method's own `eligibility.status` (asserted above).
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    expect(evaluateSchool(profile, 'apd', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['apd'], { apd: a00Context })[0].status).toBe('partial');
  });
});

describe('APD THPT exact eligibility 2026 (apd-thpt-exam-exact-2026)', () => {
  it('adds regional/subject priority points into the total before comparing to the campus floor', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } }, priority: { region: 'KV1', category: 'UT2' } };

    const result = evaluateApdThptExamExactAdmission(profile, { ...a00Context, campusId: 'bacninh' });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(16.75);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('applies the correct floor per campus', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } }, priority: { region: 'KV3' } };

    const bacninh = evaluateApdThptExamExactAdmission(profile, { ...a00Context, campusId: 'bacninh' });
    const hanoi = evaluateApdThptExamExactAdmission(profile, { ...a00Context, campusId: 'hanoi' });

    expect(bacninh.eligibility?.status).toBe('eligible');
    expect(hanoi.eligibility?.status).toBe('ineligible');
  });

  it('requires a selected campus', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluateApdThptExamExactAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('unknown');
  });
});
