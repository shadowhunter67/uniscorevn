import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateHmtuThptExamAdmission } from './evaluate';

const b00 = { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] as const };
const c00 = { combinationId: 'C00', subjects: ['literature', 'history', 'geography'] as const };

describe('HMTU THPT-exam exact calculator 2026 (hmtu-thpt-exam-exact-2026)', () => {
  it('requires a program before computing anything', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, chemistry: 8, biology: 8 } } };

    const result = evaluateHmtuThptExamAdmission(profile);

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'hmtu-program' }));
  });

  it('rejects a mã ngành outside the five 2026 programs', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, chemistry: 8, biology: 8 } } };

    const result = evaluateHmtuThptExamAdmission(profile, { programCode: '7720201', subjectContext: b00 });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'hmtu-program' }));
  });

  it('rejects a combination outside the shared B00/A00/D07/B08/D08 list', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, history: 8, geography: 8 } } };

    const result = evaluateHmtuThptExamAdmission(profile, { programCode: '7720301', subjectContext: c00 });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'hmtu-subject-combination' }));
  });

  it('applies the doubled Toán weight and the x3/4 rescale', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, chemistry: 8, biology: 8 } } };

    // (2*8 + 8 + 8) * 3/4 = 32 * 0.75 = 24.00
    const dieuDuong = evaluateHmtuThptExamAdmission(profile, { programCode: '7720301', subjectContext: b00 });
    const yKhoa = evaluateHmtuThptExamAdmission(profile, { programCode: '7720101', subjectContext: b00 });

    expect(dieuDuong.confidence).toBe('exact-verified');
    expect(dieuDuong.score?.value).toBe(24);
    expect(dieuDuong.eligibility?.status).toBe('eligible'); // cutoff 22.50
    expect(yKhoa.score?.value).toBe(24);
    expect(yKhoa.eligibility?.status).toBe('ineligible'); // cutoff 25.00
    expect(dieuDuong.evidence).toContainEqual(expect.objectContaining({ sourceId: 'hmtu-diemtrungtuyen-706-2026' }));
  });

  it('scores the same three marks differently depending on which subject is Toán', () => {
    const mathStrong: ApplicantProfile = { thpt: { scores: { math: 9, chemistry: 7, biology: 8 } } };
    const mathWeak: ApplicantProfile = { thpt: { scores: { math: 7, chemistry: 9, biology: 8 } } };

    const strong = evaluateHmtuThptExamAdmission(mathStrong, { programCode: '7720301', subjectContext: b00 });
    const weak = evaluateHmtuThptExamAdmission(mathWeak, { programCode: '7720301', subjectContext: b00 });

    expect(strong.score?.value).toBe(24.75); // (18 + 7 + 8) * 0.75
    expect(weak.score?.value).toBe(23.25); // (14 + 9 + 8) * 0.75
  });

  it('reduces the national priority above the 22.5 pivot and can flip Y khoa to eligible', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 8, chemistry: 8, biology: 8 } },
      priority: { region: 'KV1', category: 'UT1' },
    };

    // converted 24.00 >= 22.5 -> priority = ((30 - 24) / 7.5) * 2.75 = 2.2 -> 26.20
    const result = evaluateHmtuThptExamAdmission(profile, { programCode: '7720101', subjectContext: b00 });

    expect(result.score?.value).toBe(26.2);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('caps the final score at 30', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 10, chemistry: 10, biology: 10 } },
      priority: { region: 'KV1' },
    };

    const result = evaluateHmtuThptExamAdmission(profile, { programCode: '7720101', subjectContext: b00 });

    expect(result.score?.value).toBe(30);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('reports missing per-subject THPT inputs', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8 } } };

    const result = evaluateHmtuThptExamAdmission(profile, { programCode: '7720602', subjectContext: b00 });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements?.some((requirement) => requirement.code === 'hmtu-thpt-chemistry')).toBe(true);
  });
});
