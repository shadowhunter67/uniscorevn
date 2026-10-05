import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateHupThptExamAdmission, evaluateHupThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('HUP THPT (PT4) threshold eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };

    const result = evaluateHupThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hup-subject-combination' }));
  });

  it('keeps profiles unresolved until a ngành is selected', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };

    const result = evaluateHupThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hup-program' }));
  });

  it('marks totals below the Dược học threshold (22.00/30) as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };

    const result = evaluateHupThptExamAdmission(profile, { ...a00Context, programId: '7720201' });

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.eligibility?.reasons.join(' ')).toContain('22/30');
  });

  it('marks totals at or above the Hoá học threshold (19.00/30) as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 6, chemistry: 6 } } };

    const result = evaluateHupThptExamAdmission(profile, { ...a00Context, programId: '7440112' });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toBeUndefined();
  });

  it('keeps unconfirmed program codes unresolved instead of guessing', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateHupThptExamAdmission(profile, { ...a00Context, programId: '9999999' as unknown as never });

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'official-rule', code: 'hup-program-not-found' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 6, chemistry: 6 } } };
    const context = { ...a00Context, programId: '7440112' as const };

    // HUP is now a verified-calculator (PT4 exact path); the /compare adapter still drives the
    // threshold-only route, which the generic classifier reports as 'partial' when it returns no score.
    expect(evaluateSchool(profile, 'hup', { context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['hup'], { hup: context })[0].status).toBe('partial');
  });
});

describe('HUP PT4 exact — Điểm xét tuyển', () => {
  it('needs a programId before it can compute', () => {
    const r = evaluateHupThptExamExactAdmission({ thpt: { scores: { math: 8, physics: 7, chemistry: 7 } } }, a00Context);
    expect(r.confidence).toBe('partial');
    expect(r.missingRequirements).toContainEqual(expect.objectContaining({ code: 'hup-program' }));
  });

  it('computes an exact ĐXT = tổng 3 môn and checks the ngành threshold', () => {
    const r = evaluateHupThptExamExactAdmission(
      { thpt: { scores: { math: 7, physics: 6, chemistry: 7 } } },
      { ...a00Context, programId: '7440112' }
    );
    expect(r.confidence).toBe('exact-verified');
    expect(r.methodId).toBe('hup-thpt-exam-exact-2026');
    expect(r.explanation.find((s) => s.id === 'hup-academic-score')?.output).toBe(20);
    expect(r.eligibility?.status).toBe('eligible'); // 20 ≥ 19
    expect(r.score).toEqual({ value: 20, scale: 30 });
  });

  it('adds IELTS bonus + KV/ĐT priority with the ≥22,5 reduction', () => {
    const r = evaluateHupThptExamExactAdmission(
      { thpt: { scores: { math: 8, physics: 7, chemistry: 7 } }, certificates: { ielts: 7 }, priority: { region: 'KV1' } },
      { ...a00Context, programId: '7440112' }
    );
    expect(r.explanation.find((s) => s.id === 'hup-bonus')?.output).toBe(1);
    // pivot = 22 + 1,0 = 23 ; ĐUT = (30 − 23)/7,5 × 0,75 = 0,7 ; ĐXT = 22 + 1,0 + 0,7 = 23,7
    expect(r.explanation.find((s) => s.id === 'hup-priority')?.output).toBe(0.7);
    expect(r.score).toEqual({ value: 23.7, scale: 30 });
  });

  it('marks below the Dược học threshold as ineligible but still returns the exact score', () => {
    const r = evaluateHupThptExamExactAdmission(
      { thpt: { scores: { math: 8, physics: 7, chemistry: 6 } } },
      { ...a00Context, programId: '7720201' }
    );
    expect(r.eligibility?.status).toBe('ineligible'); // 21 < 22
    expect(r.score).toEqual({ value: 21, scale: 30 });
    expect(r.confidence).toBe('exact-verified');
  });

  it('stays partial when the applicant declares an HSG prize', () => {
    const r = evaluateHupThptExamExactAdmission(
      { thpt: { scores: { math: 8, physics: 7, chemistry: 7 } } },
      { ...a00Context, programId: '7440112', hsgPrize: 'provincial-first' }
    );
    expect(r.confidence).toBe('partial');
    expect(r.score).toBeUndefined();
    expect(r.missingRequirements).toContainEqual(expect.objectContaining({ code: 'hup-hsg-prize-out-of-scope' }));
  });
});

describe('HUP PT4 Dược học — điều kiện học bạ >= 7,0', () => {
  const thpt = { scores: { math: 8, physics: 7.5, chemistry: 7.5 } }; // 23 >= 22
  const year = { math: 8, physics: 7.5, chemistry: 7, biology: 6 };
  const duoc = { ...a00Context, programId: '7720201' as const };

  it('đủ điều kiện khi cả 3 năm Toán và 2/3 môn khoa học >= 7,0', () => {
    const r = evaluateHupThptExamAdmission({ thpt, transcript: { grade10: year, grade11: year, grade12: year } }, duoc);
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('không đủ điều kiện khi một năm có Toán < 7,0', () => {
    const r = evaluateHupThptExamAdmission({ thpt, transcript: { grade10: year, grade11: { ...year, math: 6.9 }, grade12: year } }, duoc);
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('không đủ điều kiện khi chỉ 1/3 môn Lý/Hoá/Sinh >= 7,0', () => {
    const weak = { math: 8, physics: 7, chemistry: 6, biology: 6 };
    const r = evaluateHupThptExamAdmission({ thpt, transcript: { grade10: year, grade11: year, grade12: weak } }, duoc);
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('báo thiếu học bạ (unknown), không coi là đạt', () => {
    const r = evaluateHupThptExamAdmission({ thpt }, duoc);
    expect(r.eligibility?.status).toBe('unknown');
    expect(r.missingRequirements).toContainEqual(expect.objectContaining({ code: 'hup-duoc-transcript' }));
  });

  it('exact evaluator: thiếu học bạ => partial nhưng vẫn trả điểm', () => {
    const r = evaluateHupThptExamExactAdmission({ thpt }, duoc);
    expect(r.confidence).toBe('partial');
    expect(r.eligibility?.status).toBe('unknown');
    expect(r.score?.scale).toBe(30);
  });

  it('ngành khác Dược học không bị ảnh hưởng', () => {
    const r = evaluateHupThptExamAdmission({ thpt: { scores: { math: 7, physics: 6.5, chemistry: 6.5 } } }, { ...a00Context, programId: '7440112' });
    expect(r.eligibility?.status).toBe('eligible'); // 20 >= 19
  });
});
