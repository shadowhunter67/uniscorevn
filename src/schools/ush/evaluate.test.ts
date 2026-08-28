import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateUshAdmission, evaluateUshThptExamExactAdmission } from './evaluate';

describe('USH THPT + năng khiếu TDTT eligibility 2026', () => {
  it('requires a selected subject pair', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, biology: 5 } } };

    const result = evaluateUshAdmission(profile, { talentScore10: 6 });

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'ush-subject-pair' }));
  });

  it('requires a talent score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, biology: 5 } } };

    const result = evaluateUshAdmission(profile, { pairId: 'T00' });

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'ush-talent-score' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5 } } };

    const result = evaluateUshAdmission(profile, { pairId: 'T00', talentScore10: 6 });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'ush-thpt-biology' }));
  });

  it('marks ineligible when total below 15/30 even if talent score alone passes', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 3, biology: 3 } } };

    const result = evaluateUshAdmission(profile, { pairId: 'T00', talentScore10: 6 });

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'ush-admission-notice-2026' }));
  });

  it('marks ineligible when talent score below 5/10 even if total reaches 15/30', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, biology: 6 } } };

    const result = evaluateUshAdmission(profile, { pairId: 'T00', talentScore10: 4 });

    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('marks eligible when both the 15/30 total and the 5/10 talent floor are met', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, biology: 5 } } };

    const result = evaluateUshAdmission(profile, { pairId: 'T00', talentScore10: 5 });

    expect(result.eligibility?.status).toBe('eligible');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    // USH is now verified-calculator (thanks to the exact method below) — per the same
    // classifyEvaluation rule as CTUMP/PNTU/UHD/TBU/FBU, a confidence:'partial'/score:undefined
    // result from this BASE method reports generic status 'partial' once the school carries an
    // exact method; use the base method's own `eligibility.status` (asserted above).
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, biology: 5 } } };
    const context = { pairId: 'T00', talentScore10: 5 };

    expect(evaluateSchool(profile, 'ush', { context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['ush'], { ush: context })[0].status).toBe('partial');
  });
});

describe('USH THPT + năng khiếu TDTT exact eligibility 2026 (ush-thpt-plus-talent-exact-2026)', () => {
  it('checks the raw (no-priority) input threshold and reports ĐXT (with priority) as a separate reference figure', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, biology: 6 } }, priority: { region: 'KV1', category: 'UT2' } };

    const result = evaluateUshThptExamExactAdmission(profile, { pairId: 'T00', talentScore10: 5 });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(17);
    expect(result.eligibility?.status).toBe('eligible');
    expect(result.explanation.find((step) => step.id === 'ush-exact-dxt')?.output).toBe(18.75);
  });

  it('requires a subject pair and talent score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, biology: 6 } } };

    const result = evaluateUshThptExamExactAdmission(profile);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('unknown');
  });
});
