import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateUlsaThptExamAdmission } from './evaluate';

const c00 = { combinationId: 'C00', subjects: ['literature', 'history', 'geography'] as const };
const a01 = { combinationId: 'A01', subjects: ['math', 'physics', 'english'] as const };

describe('ULSA THPT-exam exact calculator 2026 (ulsa-thpt-exam-exact-2026)', () => {
  it('requires a program (with campus) before computing anything', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, history: 8, geography: 8 } } };

    const result = evaluateUlsaThptExamAdmission(profile);

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'ulsa-program' }));
  });

  it('rejects a program code that is not in the official 42-row table', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, history: 8, geography: 8 } } };

    const result = evaluateUlsaThptExamAdmission(profile, { programCode: '7310401A-DLK', subjectContext: c00 });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'ulsa-program' }));
  });

  it('rejects a combination outside the published list for the program', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, history: 8, geography: 8 } } };

    // 7340204A-DLX (Bảo hiểm) publishes A01, C04, D01, X25 — not C00.
    const result = evaluateUlsaThptExamAdmission(profile, { programCode: '7340204A-DLX', subjectContext: c00 });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'ulsa-subject-combination' }));
  });

  it('applies the campus-specific cutoff: the same score passes at DLX (24.78) but not at DLS (25.05)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8.3, history: 8.3, geography: 8.3 } } };

    const hanoi = evaluateUlsaThptExamAdmission(profile, { programCode: '7310401A-DLX', subjectContext: c00 });
    const hcmc = evaluateUlsaThptExamAdmission(profile, { programCode: '7310401A-DLS', subjectContext: c00 });

    expect(hanoi.confidence).toBe('exact-verified');
    expect(hanoi.score?.value).toBe(24.9);
    expect(hanoi.eligibility?.status).toBe('eligible');
    expect(hcmc.score?.value).toBe(24.9);
    expect(hcmc.eligibility?.status).toBe('ineligible');
    expect(hanoi.evidence).toContainEqual(expect.objectContaining({ sourceId: 'ulsa-diemtrungtuyen-2752-2026' }));
  });

  it('reduces the national priority bonus above the 22.5 pivot', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { literature: 8, history: 8, geography: 8 } },
      priority: { region: 'KV1', category: 'UT2' },
    };

    // raw 24.00 >= 22.5 -> priority = ((30 - 24) / 7.5) * 1.75 = 1.40 -> 25.40 >= 24.78
    const result = evaluateUlsaThptExamAdmission(profile, { programCode: '7310401A-DLX', subjectContext: c00 });

    expect(result.score?.value).toBe(25.4);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('keeps the full priority below the pivot on a low-cutoff program', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 5, physics: 5, english: 6 } },
      priority: { region: 'KV1' },
    };

    // raw 16.00 (< 22.5) -> full 0.75 -> 16.75 >= 16.50 (7340204A-DLX Bảo hiểm)
    const result = evaluateUlsaThptExamAdmission(profile, { programCode: '7340204A-DLX', subjectContext: a01 });

    expect(result.score?.value).toBe(16.75);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('reports missing per-subject THPT inputs', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8 } } };

    const result = evaluateUlsaThptExamAdmission(profile, { programCode: '7480201-DLX', subjectContext: a01 });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements?.some((requirement) => requirement.code === 'ulsa-thpt-physics')).toBe(true);
  });
});
