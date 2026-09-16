import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateThuvAdmission, evaluateThuvThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('THUV THPT threshold eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 5, chemistry: 5 } } };

    const result = evaluateThuvAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'thuv-subject-combination' }));
  });

  it('marks totals below 18/30 as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateThuvAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'thuv-cutoff-notice-2026' }));
  });

  it('marks totals at or above 18/30 as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluateThuvAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('eligible');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    expect(evaluateSchool(profile, 'thuv', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['thuv'], { thuv: a00Context })[0].status).toBe('partial');
  });
});

describe('evaluateThuvThptExamExactAdmission (PT2 — ĐXT = tổng thô + ưu tiên, không JLPT)', () => {
  const p = (scores: Record<string, number>, priority?: { region?: string; category?: string }): ApplicantProfile => ({ thpt: { scores }, ...(priority ? { priority } : {}) });
  const subs = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

  it('chưa chọn tổ hợp -> partial', () => {
    const r = evaluateThuvThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6 }));
    expect(r.confidence).toBe('partial');
  });

  it('tổ hợp ngoài phạm vi model (D33) -> partial', () => {
    const r = evaluateThuvThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6 }), {
      subjectContext: { combinationId: 'D33', subjects: ['math', 'biology', 'other'] as const },
    });
    expect(r.confidence).toBe('partial');
    expect(r.missingRequirements).toContainEqual(expect.objectContaining({ code: 'thuv-combination-out-of-scope' }));
  });

  it('tổng 18, không ưu tiên -> exact-verified, ĐXT 18, eligible', () => {
    const r = evaluateThuvThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6 }), subs);
    expect(r.confidence).toBe('exact-verified');
    expect(r.score).toEqual({ value: 18, scale: 30 });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('tổng 17 -> ineligible', () => {
    const r = evaluateThuvThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 5 }), subs);
    expect(r.eligibility?.status).toBe('ineligible');
    expect(r.score).toEqual({ value: 17, scale: 30 });
  });

  it('cộng ưu tiên KV1 đủ đạt 18', () => {
    const r = evaluateThuvThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 5 }, { region: 'KV1' }), subs);
    expect(r.score).toEqual({ value: 17.75, scale: 30 });
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('methodId đúng nhánh exact', () => {
    const r = evaluateThuvThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6 }), subs);
    expect(r.methodId).toBe('thuv-thpt-exam-exact-2026');
  });
});
