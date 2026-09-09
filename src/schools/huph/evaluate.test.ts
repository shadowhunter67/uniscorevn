import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateHuphThptExamAdmission } from './evaluate';

const a00 = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const };
const c00 = { combinationId: 'C00', subjects: ['literature', 'history', 'geography'] as const };

describe('HUPH THPT-exam exact calculator 2026 (huph-thpt-exam-exact-2026)', () => {
  it('requires a program before computing anything', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateHuphThptExamAdmission(profile);

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'huph-program' }));
  });

  it('rejects a mã ngành that is not one of the six 2026 programs', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateHuphThptExamAdmission(profile, { programCode: '7720101', subjectContext: a00 });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'huph-program' }));
  });

  it('rejects a combination outside the published list for the program', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, history: 8, geography: 8 } } };

    // 7460108 (Khoa học dữ liệu) publishes A00, A01, B00, D01, D07, X26 — not C00.
    const result = evaluateHuphThptExamAdmission(profile, { programCode: '7460108', subjectContext: c00 });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'huph-subject-combination' }));
  });

  it('compares the raw 3-subject total against the per-program cutoff', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, history: 8, geography: 8 } } };

    // 7760101 Công tác xã hội cutoff = 22.90; raw 24.00.
    const result = evaluateHuphThptExamAdmission(profile, { programCode: '7760101', subjectContext: c00 });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(24);
    expect(result.eligibility?.status).toBe('eligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'huph-diemtrungtuyen-743-2026' }));
  });

  it('keeps the full priority below the 22.5 pivot and can flip the lowest cutoff (18.80)', () => {
    const withRegionOnly: ApplicantProfile = {
      thpt: { scores: { math: 6, physics: 6, chemistry: 6 } },
      priority: { region: 'KV1' },
    };
    const withRegionAndCategory: ApplicantProfile = {
      thpt: { scores: { math: 6, physics: 6, chemistry: 6 } },
      priority: { region: 'KV1', category: 'UT2' },
    };

    const a = evaluateHuphThptExamAdmission(withRegionOnly, { programCode: '7460108', subjectContext: a00 });
    const b = evaluateHuphThptExamAdmission(withRegionAndCategory, { programCode: '7460108', subjectContext: a00 });

    expect(a.score?.value).toBe(18.75); // 18.00 + 0.75, still below 18.80
    expect(a.eligibility?.status).toBe('ineligible');
    expect(b.score?.value).toBe(19.75); // 18.00 + 0.75 + 1.00
    expect(b.eligibility?.status).toBe('eligible');
  });

  it('reduces the priority once the bracketed total reaches 22.5', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { literature: 8, history: 8, geography: 8 } },
      priority: { region: 'KV1' },
    };

    // bracket 24.00 >= 22.5 -> priority = ((30 - 24) / 7.5) * 0.75 = 0.60 -> 24.60
    const result = evaluateHuphThptExamAdmission(profile, { programCode: '7760101', subjectContext: c00 });

    expect(result.score?.value).toBe(24.6);
  });

  it('caps the bracketed total at 30, leaving no priority to add', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { literature: 10, history: 10, geography: 10 } },
      priority: { region: 'KV1', category: 'UT1' },
    };

    const result = evaluateHuphThptExamAdmission(profile, { programCode: '7760101', subjectContext: c00 });

    expect(result.score?.value).toBe(30);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('reports missing per-subject THPT inputs', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8 } } };

    const result = evaluateHuphThptExamAdmission(profile, { programCode: '7720601', subjectContext: a00 });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements?.some((requirement) => requirement.code === 'huph-thpt-physics')).toBe(true);
  });
});
