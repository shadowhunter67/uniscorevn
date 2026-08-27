import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateUtcThptExamAdmission, evaluateUtcThptExamExactAdmission } from './evaluate';
import { calculateUtcAcademicScore30 } from './calculator';
import { getUtcProgramThreshold } from './thresholds';

const a00 = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('UTC calculator', () => {
  it('standard formula = (Toán×2 + 2 môn còn lại) × 3/4', () => {
    expect(calculateUtcAcademicScore30({ mathScore: 9, otherScore1: 8, otherScore2: 8 }, 'standard')).toBe(25.5);
  });
  it('Ngôn ngữ Anh formula = tổng thô 3 môn (không hệ số)', () => {
    expect(calculateUtcAcademicScore30({ mathScore: 7, otherScore1: 7, otherScore2: 8 }, 'english')).toBe(22);
  });
});

describe('UTC threshold table', () => {
  it('resolves published per-program thresholds for both campuses', () => {
    expect(getUtcProgramThreshold('gha-logistics')?.threshold30).toBe(21);
    expect(getUtcProgramThreshold('gsa-ngon-ngu-anh')).toMatchObject({ threshold30: 17, formulaGroup: 'english' });
    expect(getUtcProgramThreshold('nope')).toBeUndefined();
  });
});

describe('UTC exact — Tổng điểm xét tuyển (thi TN THPT)', () => {
  const cnttProfile: ApplicantProfile = { thpt: { scores: { math: 9, physics: 8, chemistry: 8 } } };

  it('needs a programId before it can compute', () => {
    const r = evaluateUtcThptExamExactAdmission(cnttProfile, a00);
    expect(r.confidence).toBe('partial');
    expect(r.missingRequirements).toContainEqual(expect.objectContaining({ code: 'utc-program' }));
  });

  it('computes an exact ĐXT and checks the ngành threshold', () => {
    const r = evaluateUtcThptExamExactAdmission(cnttProfile, { ...a00, programId: 'gha-cntt' });
    expect(r.confidence).toBe('exact-verified');
    expect(r.methodId).toBe('utc-thpt-exam-exact-2026');
    expect(r.explanation.find((s) => s.id === 'utc-academic-score')?.output).toBe(25.5);
    expect(r.eligibility?.status).toBe('eligible'); // 25.5 ≥ 20
    expect(r.score).toEqual({ value: 25.5, scale: 30 });
  });

  it('adds IELTS bonus + KV/ĐT priority with the ≥22,5 reduction', () => {
    const r = evaluateUtcThptExamExactAdmission(
      { thpt: { scores: { math: 9, physics: 8, chemistry: 8 } }, certificates: { ielts: 6 }, priority: { region: 'KV1' } },
      { ...a00, programId: 'gha-cntt' }
    );
    expect(r.explanation.find((s) => s.id === 'utc-bonus')?.output).toBe(1);
    // pivot = 25,5 + 1,0 = 26,5 ; ĐUT = (30 − 26,5)/7,5 × 0,75 = 0,35 ; ĐXT = 25,5 + 1,0 + 0,35 = 26,85
    expect(r.explanation.find((s) => s.id === 'utc-priority')?.output).toBe(0.35);
    expect(r.score).toEqual({ value: 26.85, scale: 30 });
  });

  it('uses the raw-sum formula for the Ngôn ngữ Anh group', () => {
    const r = evaluateUtcThptExamExactAdmission(
      { thpt: { scores: { math: 7, literature: 7, english: 8 } } },
      { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] }, programId: 'gha-ngon-ngu-anh' }
    );
    expect(r.explanation.find((s) => s.id === 'utc-academic-score')?.output).toBe(22);
    expect(r.eligibility?.status).toBe('eligible'); // 22 ≥ 18
    expect(r.score).toEqual({ value: 22, scale: 30 });
  });

  it('marks below-threshold as ineligible but still returns the exact score', () => {
    const r = evaluateUtcThptExamExactAdmission(
      { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } },
      { ...a00, programId: 'gha-logistics' }
    );
    expect(r.eligibility?.status).toBe('ineligible'); // 15 < 21
    expect(r.score).toEqual({ value: 15, scale: 30 });
    expect(r.confidence).toBe('exact-verified');
  });

  it('stays partial for a combination without Toán', () => {
    const r = evaluateUtcThptExamExactAdmission(
      { thpt: { scores: { literature: 8, history: 8, geography: 8 } } },
      { subjectContext: { combinationId: 'C00', subjects: ['literature', 'history', 'geography'] }, programId: 'gha-ngon-ngu-anh' }
    );
    expect(r.confidence).toBe('partial');
    expect(r.missingRequirements).toContainEqual(expect.objectContaining({ code: 'utc-combination-without-math' }));
  });

  it('stays partial when the applicant declares a provincial HSG prize', () => {
    const r = evaluateUtcThptExamExactAdmission(cnttProfile, { ...a00, programId: 'gha-cntt', hsgProvincialRank: 'nhat' });
    expect(r.confidence).toBe('partial');
    expect(r.score).toBeUndefined();
    expect(r.missingRequirements).toContainEqual(expect.objectContaining({ code: 'utc-hsg-provincial-out-of-scope' }));
  });

  it('keeps the threshold-only method available', () => {
    const r = evaluateUtcThptExamAdmission({ thpt: { scores: { math: 3, physics: 3, chemistry: 3 } } }, a00);
    expect(r.eligibility?.status).toBe('ineligible');
  });
});
