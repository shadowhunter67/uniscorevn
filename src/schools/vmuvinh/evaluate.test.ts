import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateVmuVinhThptExamAdmission } from './evaluate';

const b00 = { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] as const };
const d07 = { combinationId: 'D07', subjects: ['math', 'chemistry', 'english'] as const };

describe('VMU-Vinh THPT-exam exact calculator 2026 (vmuvinh-thpt-exam-exact-2026)', () => {
  it('requires a program before computing anything', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, chemistry: 8, biology: 8 } } };

    const result = evaluateVmuVinhThptExamAdmission(profile);

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'vmuvinh-program' }));
  });

  it('rejects the liên thông programme code (THPT-exam column is "–" for it)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, chemistry: 8, biology: 8 } } };

    const result = evaluateVmuVinhThptExamAdmission(profile, { programCode: 'LT7720301', subjectContext: b00 });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'vmuvinh-program' }));
  });

  it('rejects D07 for Y khoa, which only publishes A00 and B00', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 9, chemistry: 9, english: 9 } } };

    const result = evaluateVmuVinhThptExamAdmission(profile, { programCode: '7720101', subjectContext: d07 });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'vmuvinh-subject-combination' }));
  });

  it('accepts D07 for Dược học and compares against its 20.00 cutoff', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, chemistry: 7, english: 6 } } };

    const result = evaluateVmuVinhThptExamAdmission(profile, { programCode: '7720201', subjectContext: d07 });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(20);
    expect(result.eligibility?.status).toBe('eligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'vmuvinh-diemtrungtuyen-809-2026' }));
  });

  it('applies the per-programme cutoff: 23.00 clears Dược học but not Y khoa (23.50)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, chemistry: 8, biology: 7 } } };

    const duoc = evaluateVmuVinhThptExamAdmission(profile, { programCode: '7720201', subjectContext: b00 });
    const yKhoa = evaluateVmuVinhThptExamAdmission(profile, { programCode: '7720101', subjectContext: b00 });

    expect(duoc.score?.value).toBe(23);
    expect(duoc.eligibility?.status).toBe('eligible');
    expect(yKhoa.eligibility?.status).toBe('ineligible');
  });

  it('reduces the national priority above the 22.5 pivot and flips Y khoa to eligible', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 8, chemistry: 8, biology: 7 } },
      priority: { region: 'KV1' },
    };

    // raw 23.00 >= 22.5 -> priority = ((30 - 23) / 7.5) * 0.75 = 0.7 -> 23.70 >= 23.50
    const result = evaluateVmuVinhThptExamAdmission(profile, { programCode: '7720101', subjectContext: b00 });

    expect(result.score?.value).toBe(23.7);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('reports missing per-subject THPT inputs', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8 } } };

    const result = evaluateVmuVinhThptExamAdmission(profile, { programCode: '7720301', subjectContext: b00 });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements?.some((requirement) => requirement.code === 'vmuvinh-thpt-biology')).toBe(true);
  });
});
