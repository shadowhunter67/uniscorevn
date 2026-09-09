import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateUnetiThptExamAdmission } from './evaluate';

describe('UNETI THPT-exam exact calculator 2026 (uneti-thpt-exam-exact-2026)', () => {
  it('requires a mã xét tuyển before computing anything', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 9, physics: 8, chemistry: 7 } } };

    const result = evaluateUnetiThptExamAdmission(profile);

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'uneti-program' }));
  });

  it('rejects a combination that is not in the program group', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, history: 8, geography: 8 } } };

    // 340101DKK (Quản trị kinh doanh, Hà Nội) is nhóm 2 — C00 only exists in nhóm 4.
    const result = evaluateUnetiThptExamAdmission(profile, { programCode: '340101DKK', subjectContext: { combinationId: 'C00' } });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'uneti-subject-combination' }));
  });

  it('applies the 4.5/3.5/2 positional weights and the x3/10 rescale', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 9, physics: 8, chemistry: 7 } } };

    // 510303DKK (CNKT điều khiển và tự động hóa, Hà Nội, nhóm 3, cutoff 24.50).
    // A00 in nhóm 3 = [Toán, Vật lý, Hóa học] -> (9*4.5 + 8*3.5 + 7*2) * 0.3 = 82.5 * 0.3 = 24.75
    const result = evaluateUnetiThptExamAdmission(profile, { programCode: '510303DKK', subjectContext: { combinationId: 'A00' } });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(24.75);
    expect(result.eligibility?.status).toBe('eligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'uneti-diemtrungtuyen-826-2026' }));
  });

  it('gives the same three scores a different total in nhóm 2 vs nhóm 4 (subject order is weighted)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 9, math: 8, physics: 7 } } };

    // C01 in nhóm 2 = [Toán, Vật lý, Ngữ văn] -> (8*4.5 + 7*3.5 + 9*2) * 0.3 = 78.5 * 0.3 = 23.55
    const group2 = evaluateUnetiThptExamAdmission(profile, { programCode: '340101DKK', subjectContext: { combinationId: 'C01' } });
    // C01 in nhóm 4 = [Ngữ văn, Toán, Vật lý] -> (9*4.5 + 8*3.5 + 7*2) * 0.3 = 82.5 * 0.3 = 24.75
    const group4 = evaluateUnetiThptExamAdmission(profile, { programCode: '810103DKK', subjectContext: { combinationId: 'C01' } });

    expect(group2.score?.value).toBe(23.55);
    expect(group4.score?.value).toBe(24.75);
    expect(group2.eligibility?.status).toBe('eligible'); // 23.55 >= 22.50
    expect(group4.eligibility?.status).toBe('eligible'); // 24.75 >= 22.80
  });

  it('enforces the Ngôn ngữ Anh condition (English subject score >= 6.00) even above the cutoff', () => {
    const below: ApplicantProfile = { thpt: { scores: { english: 5.75, math: 9, literature: 9 } } };
    const at: ApplicantProfile = { thpt: { scores: { english: 6, math: 9, literature: 9 } } };

    // D01 in nhóm 1 = [Tiếng Anh, Toán, Ngữ văn]; 220201DKK cutoff 21.50.
    const belowResult = evaluateUnetiThptExamAdmission(below, { programCode: '220201DKK', subjectContext: { combinationId: 'D01' } });
    const atResult = evaluateUnetiThptExamAdmission(at, { programCode: '220201DKK', subjectContext: { combinationId: 'D01' } });

    expect(belowResult.score?.value).toBe(22.61); // (5.75*4.5 + 9*3.5 + 9*2) * 0.3 = 22.6125
    expect(belowResult.eligibility?.status).toBe('ineligible');
    expect(atResult.score?.value).toBe(22.95); // (6*4.5 + 9*3.5 + 9*2) * 0.3
    expect(atResult.eligibility?.status).toBe('eligible');
  });

  it('reduces the priority bonus once the weighted combination score passes 22.5', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 8, physics: 8, chemistry: 8 } },
      priority: { region: 'KV1' },
    };

    // 340204DKD (Bảo hiểm, Ninh Bình, nhóm 2, cutoff 19.00). Weighted = 80 * 0.3 = 24.00 > 22.5
    // -> priority = ((30 - 24) / 7.5) * 0.75 = 0.60 -> 24.60
    const result = evaluateUnetiThptExamAdmission(profile, { programCode: '340204DKD', subjectContext: { combinationId: 'A00' } });

    expect(result.score?.value).toBe(24.6);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('keeps the full priority below the 22.5 pivot and still applies the campus-specific cutoff', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 6, physics: 6, chemistry: 6 } },
      priority: { region: 'KV1' },
    };

    // Weighted = 60 * 0.3 = 18.00 (<= 22.5) -> full 0.75 -> 18.75, below the 19.00 Ninh Bình cutoff.
    const result = evaluateUnetiThptExamAdmission(profile, { programCode: '340204DKD', subjectContext: { combinationId: 'A00' } });

    expect(result.score?.value).toBe(18.75);
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('reports the nguồn tuyển floor (raw 3-subject total >= 15/30) as a failure reason', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 10, physics: 4, chemistry: 0.5 } } };

    const result = evaluateUnetiThptExamAdmission(profile, { programCode: '340204DKD', subjectContext: { combinationId: 'A00' } });

    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.eligibility?.reasons?.some((reason) => reason.includes('nguồn tuyển'))).toBe(true);
  });

  it('reports missing per-subject THPT inputs', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8 } } };

    const result = evaluateUnetiThptExamAdmission(profile, { programCode: '480201DKK', subjectContext: { combinationId: 'A00' } });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements?.some((requirement) => requirement.code === 'uneti-thpt-physics')).toBe(true);
  });
});
