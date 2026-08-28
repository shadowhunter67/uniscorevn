import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateHcmupesAdmission } from './evaluate';

const baseCtx = { pairId: 'T00', talentScore10: 7 };

describe('HCMUPES THPT + năng khiếu TDTT eligibility 2026 (Giáo dục thể chất)', () => {
  it('requires a selected subject pair', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, biology: 6 } }, priority: { region: 'KV3' } };

    const result = evaluateHcmupesAdmission(profile, { talentScore10: 7 });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hcmupes-subject-pair' }));
  });

  it('requires a talent score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, biology: 6 } }, priority: { region: 'KV3' } };

    const result = evaluateHcmupesAdmission(profile, { pairId: 'T00' });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hcmupes-talent-score' }));
  });

  it('requires a known priority region (threshold depends on it)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, biology: 6 } } };

    const result = evaluateHcmupesAdmission(profile, baseCtx);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'hcmupes-priority-region' }));
  });

  it('marks ineligible when total below the KV3 19.00/30 threshold', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, biology: 5 } }, priority: { region: 'KV3' } };

    const result = evaluateHcmupesAdmission(profile, baseCtx);

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'hcmupes-gdtc-threshold-2026' }));
  });

  it('marks eligible when total reaches the KV3 19.00/30 threshold', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, biology: 6 } }, priority: { region: 'KV3' } };

    const result = evaluateHcmupesAdmission(profile, baseCtx);

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.confidence).toBe('exact-verified');
    expect(result.score).toEqual({ value: 19, scale: 30 });
  });

  it('applies the lower KV1 18.25/30 threshold for zone-1 applicants', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5.75, biology: 5.5 } }, priority: { region: 'KV1' } };

    const result = evaluateHcmupesAdmission(profile, baseCtx);

    expect(result.eligibility?.status).toBe('eligible');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, biology: 6 } }, priority: { region: 'KV3' } };

    expect(evaluateSchool(profile, 'hcmupes', { context: baseCtx }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['hcmupes'], { hcmupes: baseCtx })[0].status).toBe('calculated');
  });
});
