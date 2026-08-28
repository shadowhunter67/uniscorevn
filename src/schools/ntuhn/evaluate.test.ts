import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateNtuhnThptExamAdmission, evaluateNtuhnThptExamExactAdmission } from './evaluate';

const d01Context = { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };

describe('NTU-HN THPT threshold eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };

    const result = evaluateNtuhnThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'ntuhn-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5 } } };

    const result = evaluateNtuhnThptExamAdmission(profile, d01Context);

    expect(result.missingInputs).toHaveLength(1);
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'ntuhn-thpt-english' }));
  });

  it('marks totals below 15/30 as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, literature: 4, english: 4 } } };

    const result = evaluateNtuhnThptExamAdmission(profile, d01Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'ntuhn-threshold-notice-2026' }));
  });

  it('marks totals at or above 15/30 as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };

    const result = evaluateNtuhnThptExamAdmission(profile, d01Context);

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toBeUndefined();
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };

    // NTU-HN giờ là verified-calculator; adapter /compare vẫn dùng phương thức threshold-only nên
    // phân loại 'partial' (cùng hành vi VinhUni/HUB/HLU/DTHU/TUAF/TTN/HAU).
    expect(evaluateSchool(profile, 'ntuhn', { context: d01Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['ntuhn'], { ntuhn: d01Context })[0].status).toBe('partial');
  });
});

describe('evaluateNtuhnThptExamExactAdmission (thi TN THPT — ĐXT = tổng thô + ưu tiên)', () => {
  const p = (scores: Record<string, number>, priority?: { region?: string; category?: string }): ApplicantProfile => ({ thpt: { scores }, ...(priority ? { priority } : {}) });
  const subs = { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };

  it('chưa chọn tổ hợp -> partial', () => {
    const r = evaluateNtuhnThptExamExactAdmission(p({ math: 5, literature: 5, english: 5 }));
    expect(r.confidence).toBe('partial');
  });

  it('tổng 15, không ưu tiên -> exact-verified, ĐXT 15, eligible', () => {
    const r = evaluateNtuhnThptExamExactAdmission(p({ math: 5, literature: 5, english: 5 }), subs);
    expect(r.confidence).toBe('exact-verified');
    expect(r.score).toEqual({ value: 15, scale: 30 });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('tổng 14 -> ineligible', () => {
    const r = evaluateNtuhnThptExamExactAdmission(p({ math: 5, literature: 5, english: 4 }), subs);
    expect(r.eligibility?.status).toBe('ineligible');
    expect(r.score).toEqual({ value: 14, scale: 30 });
  });

  it('cộng ưu tiên KV1 đẩy 14 -> 14,75, vẫn ineligible', () => {
    const r = evaluateNtuhnThptExamExactAdmission(p({ math: 5, literature: 5, english: 4 }, { region: 'KV1' }), subs);
    expect(r.score).toEqual({ value: 14.75, scale: 30 });
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('methodId đúng nhánh exact', () => {
    const r = evaluateNtuhnThptExamExactAdmission(p({ math: 6, literature: 6, english: 6 }), subs);
    expect(r.methodId).toBe('ntuhn-thpt-exam-exact-2026');
  });
});
