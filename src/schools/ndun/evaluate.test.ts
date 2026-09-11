import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateNdunThptExamAdmission } from './evaluate';

const b00 = { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] as const };
const c20 = { combinationId: 'C20', subjects: ['literature', 'geography', 'civic-economic-law'] as const };

describe('NDUN THPT-exam exact calculator 2026 (ndun-thpt-exam-exact-2026)', () => {
  it('requires a program before computing anything', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, chemistry: 7, biology: 7 } } };

    const result = evaluateNdunThptExamAdmission(profile);

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'ndun-program' }));
  });

  it('rejects a mã ngành outside the three 2026 programs', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, chemistry: 7, biology: 7 } } };

    const result = evaluateNdunThptExamAdmission(profile, { programCode: '7720101', subjectContext: b00 });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'ndun-program' }));
  });

  it('accepts C20 only for Dinh dưỡng — Điều dưỡng does not publish it', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 6, geography: 6, 'civic-economic-law': 6 } } };

    const dinhDuong = evaluateNdunThptExamAdmission(profile, { programCode: '7720401', subjectContext: c20 });
    const dieuDuong = evaluateNdunThptExamAdmission(profile, { programCode: '7720301', subjectContext: c20 });

    expect(dinhDuong.confidence).toBe('exact-verified');
    expect(dinhDuong.score?.value).toBe(18);
    expect(dinhDuong.eligibility?.status).toBe('eligible'); // cutoff 16.25
    expect(dieuDuong.confidence).toBe('partial');
    expect(dieuDuong.missingRequirements).toContainEqual(expect.objectContaining({ code: 'ndun-subject-combination' }));
  });

  it('compares against the per-program cutoff and adds the full priority below the pivot', () => {
    const plain: ApplicantProfile = { thpt: { scores: { math: 7, chemistry: 7, biology: 7 } } };
    const withPriority: ApplicantProfile = {
      thpt: { scores: { math: 7, chemistry: 7, biology: 7 } },
      priority: { region: 'KV1' },
    };

    // Điều dưỡng cutoff 21.10; raw 21.00 -> ineligible, 21.00 + 0.75 = 21.75 -> eligible
    const a = evaluateNdunThptExamAdmission(plain, { programCode: '7720301', subjectContext: b00 });
    const b = evaluateNdunThptExamAdmission(withPriority, { programCode: '7720301', subjectContext: b00 });

    expect(a.score?.value).toBe(21);
    expect(a.eligibility?.status).toBe('ineligible');
    expect(b.score?.value).toBe(21.75);
    expect(b.eligibility?.status).toBe('eligible');
    expect(b.evidence).toContainEqual(expect.objectContaining({ sourceId: 'ndun-diemchuan-2058-2026' }));
  });

  it('blocks a candidate who clears the cutoff only because of priority but misses the quality floor', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 6, chemistry: 6, biology: 5.5 } },
      priority: { region: 'KV3', category: 'UT1' },
    };

    // Hộ sinh: raw 17.50 (< ngưỡng 18.00) but 17.50 + 2.00 = 19.50 >= cutoff 18.30
    const result = evaluateNdunThptExamAdmission(profile, { programCode: '7720302', subjectContext: b00 });

    expect(result.score?.value).toBe(19.5);
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.eligibility?.reasons?.some((reason) => reason.includes('ngưỡng đảm bảo chất lượng'))).toBe(true);
  });

  it('reduces the national priority above the 22.5 pivot', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 8, chemistry: 8, biology: 8 } },
      priority: { region: 'KV1' },
    };

    // raw 24.00 >= 22.5 -> priority = ((30 - 24) / 7.5) * 0.75 = 0.60 -> 24.60
    const result = evaluateNdunThptExamAdmission(profile, { programCode: '7720301', subjectContext: b00 });

    expect(result.score?.value).toBe(24.6);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('reports missing per-subject THPT inputs', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8 } } };

    const result = evaluateNdunThptExamAdmission(profile, { programCode: '7720401', subjectContext: b00 });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements?.some((requirement) => requirement.code === 'ndun-thpt-biology')).toBe(true);
  });
});
