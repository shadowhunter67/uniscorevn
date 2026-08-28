import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateUmtAdmission, evaluateUmtThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('UMT THPT threshold eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 5, chemistry: 5 } } };

    const result = evaluateUmtAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'umt-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 5 } } };

    const result = evaluateUmtAdmission(profile, a00Context);

    expect(result.missingInputs).toHaveLength(1);
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'umt-thpt-chemistry' }));
  });

  it('marks totals below 15/30 as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateUmtAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'umt-threshold-notice-2026' }));
  });

  it('marks totals at or above 15/30 as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateUmtAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('eligible');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    // UMT giờ là verified-calculator; adapter /compare vẫn dùng phương thức threshold-only nên
    // phân loại 'partial' (cùng hành vi VinhUni/HUB/HLU/DTHU/TUAF/TTN/HAU/NTU-HN).
    expect(evaluateSchool(profile, 'umt', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['umt'], { umt: a00Context })[0].status).toBe('partial');
  });
});

describe('evaluateUmtThptExamExactAdmission (PT01 — ĐXT = tổng thô + ưu tiên, không điểm cộng)', () => {
  const p = (scores: Record<string, number>, priority?: { region?: string; category?: string }): ApplicantProfile => ({ thpt: { scores }, ...(priority ? { priority } : {}) });
  const subs = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

  it('chưa chọn tổ hợp -> partial', () => {
    const r = evaluateUmtThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }));
    expect(r.confidence).toBe('partial');
  });

  it('tổng 15, không ưu tiên -> exact-verified, ĐXT 15, eligible', () => {
    const r = evaluateUmtThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }), subs);
    expect(r.confidence).toBe('exact-verified');
    expect(r.score).toEqual({ value: 15, scale: 30 });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('tổng 14 -> ineligible', () => {
    const r = evaluateUmtThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 4 }), subs);
    expect(r.eligibility?.status).toBe('ineligible');
    expect(r.score).toEqual({ value: 14, scale: 30 });
  });

  it('cộng ưu tiên KV1', () => {
    const r = evaluateUmtThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 4 }, { region: 'KV1' }), subs);
    expect(r.score).toEqual({ value: 14.75, scale: 30 });
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('methodId đúng nhánh exact', () => {
    const r = evaluateUmtThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6 }), subs);
    expect(r.methodId).toBe('umt-thpt-exam-exact-2026');
  });
});
