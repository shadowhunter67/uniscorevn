import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluatePxuThptExamAdmission, evaluatePxuTranscriptAdmission } from './evaluate';

const cnttContext = {
  programCode: 'cntt',
  subjectContext: { combinationId: 'A01', subjects: ['math', 'physics', 'english'] as const },
};

describe('PXU THPT-exam exact eligibility 2026 (pxu-thpt-exam-exact-2026)', () => {
  it('requires a selected program before computing anything', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, english: 6 } } };

    const result = evaluatePxuThptExamAdmission(profile);

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'pxu-program' }));
  });

  it('rejects a subject combination not in the modeled list for the chosen program', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6, history: 6 } } };

    const result = evaluatePxuThptExamAdmission(profile, {
      programCode: 'cntt',
      subjectContext: { combinationId: 'C03', subjects: ['math', 'literature', 'history'] as const },
    });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'pxu-subject-combination' }));
  });

  it('marks a profile exactly at the flat 15/30 cutoff as eligible, adding priority points into the total', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 5, physics: 4.5, english: 4.75 } },
      priority: { region: 'KV1', category: 'UT2' },
    };

    const result = evaluatePxuThptExamAdmission(profile, cnttContext);

    expect(result.confidence).toBe('exact-verified');
    // raw = 14.25, priority KV1(0.75)+UT2(1)=1.75 (below 22.5 reduction pivot) -> total 16.0
    expect(result.score?.value).toBe(16);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('marks a profile below the 15/30 cutoff as ineligible with no priority', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, english: 4 } } };

    const result = evaluatePxuThptExamAdmission(profile, cnttContext);

    expect(result.score?.value).toBe(12);
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'pxu-diemtrungtuyen-2026' }));
  });
});

describe('PXU transcript exact eligibility 2026 (pxu-transcript-exact-2026)', () => {
  it('averages grade10/11/12 per subject and compares against the flat 18/30 cutoff', () => {
    const profile: ApplicantProfile = {
      transcript: {
        grade10: { math: 6, physics: 6, english: 6 },
        grade11: { math: 6, physics: 6, english: 6 },
        grade12: { math: 6, physics: 6, english: 6 },
      },
    };

    const result = evaluatePxuTranscriptAdmission(profile, cnttContext);

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(18);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('reports missing transcript inputs per subject', () => {
    const profile: ApplicantProfile = { transcript: { grade10: { math: 7 }, grade11: { math: 7 } } };

    const result = evaluatePxuTranscriptAdmission(profile, cnttContext);

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements?.some((r) => r.code === 'pxu-transcript-math')).toBe(true);
  });
});
