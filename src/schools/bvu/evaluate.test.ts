import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateBvuTranscriptAdmission, evaluateBvuThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('BVU transcript baseline eligibility 2026', () => {
  it('marks profiles below the common 18/30 baseline as ineligible', () => {
    const profile: ApplicantProfile = { transcript: { grade12: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateBvuTranscriptAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'bvu-diem-trung-tuyen-2026' }));
  });

  it('keeps profiles between the baseline and the highest published group floor unresolved', () => {
    const profile: ApplicantProfile = { transcript: { grade12: { math: 7, physics: 7, chemistry: 7 } } };

    const result = evaluateBvuTranscriptAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.eligibility?.reasons.join(' ')).toContain('18');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { transcript: { grade12: { math: 7, physics: 7, chemistry: 7 } } };

    const result = evaluateBvuTranscriptAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'bvu-subject-combination' }));
  });

  it('reports missing grade-12 transcript subject scores', () => {
    const profile: ApplicantProfile = { transcript: { grade12: { math: 7, physics: 7 } } };

    const result = evaluateBvuTranscriptAdmission(profile, a00Context);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'bvu-transcript-chemistry' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    // BVU is now verified-calculator (thanks to the exact THPT-exam method below) — per the same
    // classifyEvaluation rule as CTUMP/PNTU/UHD/APD/TBU, a confidence:'partial'/score:undefined
    // result from this BASE (transcript) method reports generic status 'partial' once the school
    // carries an exact method; use the base method's own `eligibility.status` (asserted above).
    const profile: ApplicantProfile = { transcript: { grade12: { math: 4, physics: 4, chemistry: 4 } } };

    expect(evaluateSchool(profile, 'bvu', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['bvu'], { bvu: a00Context })[0].status).toBe('partial');
  });
});

describe('BVU THPT-exam exact eligibility 2026 (bvu-thpt-exam-exact-2026)', () => {
  it('does NOT add priority points (school explicitly excludes them for this method)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } }, priority: { region: 'KV1', category: 'UT1' } };

    const result = evaluateBvuThptExamExactAdmission(profile, a00Context);

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(15);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('applies the correct floor per program group', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const standard = evaluateBvuThptExamExactAdmission(profile, { ...a00Context, group: 'standard' });
    const pharmacy = evaluateBvuThptExamExactAdmission(profile, { ...a00Context, group: 'pharmacy' });

    expect(standard.eligibility?.status).toBe('eligible');
    expect(pharmacy.eligibility?.status).toBe('ineligible');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluateBvuThptExamExactAdmission(profile);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('unknown');
  });
});
