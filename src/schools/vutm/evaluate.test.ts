import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateVutmThptExamAdmission } from './evaluate';

const b00 = { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] as const };
const a00 = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const };

describe('VUTM THPT-exam exact calculator 2026 (vutm-thpt-exam-exact-2026)', () => {
  it('requires a program before computing anything', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, chemistry: 8, biology: 8 } } };

    const result = evaluateVutmThptExamAdmission(profile);

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'vutm-program' }));
  });

  it('rejects a mã ngành outside the three 2026 programs', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, chemistry: 8, biology: 8 } } };

    const result = evaluateVutmThptExamAdmission(profile, { programCode: '7720301', subjectContext: b00 });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'vutm-program' }));
  });

  it('rejects A00 for Y khoa (published combinations are B00/B03/A02/D08/X14)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 9, physics: 9, chemistry: 9 } } };

    const result = evaluateVutmThptExamAdmission(profile, { programCode: '7720101', subjectContext: a00 });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'vutm-subject-combination' }));
  });

  it('accepts A00 for Dược học and compares against its 22.00 cutoff', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7.5, physics: 7.5, chemistry: 7 } } };

    const result = evaluateVutmThptExamAdmission(profile, { programCode: '7720201', subjectContext: a00 });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(22);
    expect(result.eligibility?.status).toBe('eligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'vutm-diemchuan-3036-2026' }));
  });

  it('marks a 24.00 total as ineligible for Y khoa (24.50) but eligible for Y học cổ truyền (22.30)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, chemistry: 8, biology: 8 } } };

    const yKhoa = evaluateVutmThptExamAdmission(profile, { programCode: '7720101', subjectContext: b00 });
    const yhct = evaluateVutmThptExamAdmission(profile, { programCode: '7720115', subjectContext: b00 });

    expect(yKhoa.score?.value).toBe(24);
    expect(yKhoa.eligibility?.status).toBe('ineligible');
    expect(yhct.eligibility?.status).toBe('eligible');
  });

  it('reduces the national priority above the 22.5 pivot and flips Y khoa to eligible', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 8, chemistry: 8, biology: 8 } },
      priority: { region: 'KV1' },
    };

    // raw 24.00 >= 22.5 -> priority = ((30 - 24) / 7.5) * 0.75 = 0.60 -> 24.60 >= 24.50
    const result = evaluateVutmThptExamAdmission(profile, { programCode: '7720101', subjectContext: b00 });

    expect(result.score?.value).toBe(24.6);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('reports missing per-subject THPT inputs', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8 } } };

    const result = evaluateVutmThptExamAdmission(profile, { programCode: '7720115', subjectContext: b00 });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements?.some((requirement) => requirement.code === 'vutm-thpt-biology')).toBe(true);
  });
});
