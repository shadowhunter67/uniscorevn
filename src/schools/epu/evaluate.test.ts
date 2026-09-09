import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateEpuThptExamAdmission } from './evaluate';

const a00 = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const };
const c00 = { combinationId: 'C00', subjects: ['literature', 'history', 'geography'] as const };

describe('EPU THPT-exam exact calculator 2026 (epu-thpt-exam-exact-2026)', () => {
  it('requires a selected program before computing anything', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateEpuThptExamAdmission(profile);

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'epu-program' }));
  });

  it('rejects a mã xét tuyển that is not in the official 38-row table', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateEpuThptExamAdmission(profile, { programCode: '7999999', subjectContext: a00 });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'epu-program' }));
  });

  it('rejects C00 for an engineering program whose THPT-exam combinations are A00/A01/D01/D07', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, history: 8, geography: 8 } } };

    const result = evaluateEpuThptExamAdmission(profile, { programCode: '7510303', subjectContext: c00 });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'epu-subject-combination' }));
  });

  it('accepts C00 for Luật kinh tế (7380107), whose published list includes it', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 7, history: 7, geography: 7 } } };

    const result = evaluateEpuThptExamAdmission(profile, { programCode: '7380107', subjectContext: c00 });

    expect(result.confidence).toBe('exact-verified');
    // raw 21.00 (below the 22.5 priority-reduction pivot, no priority entered) vs cutoff 20.50
    expect(result.score?.value).toBe(21);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('marks a 24.50 raw total as ineligible for the highest cutoff (7510303 = 24.60/30)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8.5, physics: 8, chemistry: 8 } } };

    const result = evaluateEpuThptExamAdmission(profile, { programCode: '7510303', subjectContext: a00 });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(24.5);
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'epu-diemtrungtuyen-3020-2026' }));
  });

  it('applies the reduced national priority formula above 22.5 and flips the same profile to eligible', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 8.5, physics: 8, chemistry: 8 } },
      priority: { region: 'KV1' },
    };

    const result = evaluateEpuThptExamAdmission(profile, { programCode: '7510303', subjectContext: a00 });

    // raw 24.5 >= 22.5 -> priority = ((30 - 24.5) / 7.5) * 0.75 = 0.55 -> 25.05 >= 24.60
    expect(result.score?.value).toBe(25.05);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('applies the full (unreduced) priority below the 22.5 pivot on the lowest cutoff (7340120 = 16.00/30)', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 5, physics: 5, chemistry: 5 } },
      priority: { region: 'KV1', category: 'UT2' },
    };

    const result = evaluateEpuThptExamAdmission(profile, { programCode: '7340120', subjectContext: a00 });

    // raw 15.00 + KV1 (0.75) + UT2 (1.00) = 16.75 >= 16.00
    expect(result.score?.value).toBe(16.75);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('reports missing per-subject THPT inputs', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8 } } };

    const result = evaluateEpuThptExamAdmission(profile, { programCode: '7480201', subjectContext: a00 });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements?.some((requirement) => requirement.code === 'epu-thpt-physics')).toBe(true);
    expect(result.missingRequirements?.some((requirement) => requirement.code === 'epu-thpt-chemistry')).toBe(true);
  });
});
