import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateHluThptExamAdmission, evaluateHluThptExamExactAdmission } from './evaluate';

const d01Context = { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };

describe('HLU THPT threshold eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 7, english: 6.5 } } };

    const result = evaluateHluThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hlu-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 7 } } };

    const result = evaluateHluThptExamAdmission(profile, d01Context);

    expect(result.missingInputs).toHaveLength(1);
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'hlu-thpt-english' }));
  });

  it('marks totals below 20/30 as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6, english: 6 } } };

    const result = evaluateHluThptExamAdmission(profile, d01Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'hlu-quality-threshold-2026' }));
  });

  it('marks totals at or above 20/30 as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, literature: 7, english: 6 } } };

    const result = evaluateHluThptExamAdmission(profile, d01Context);

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toBeUndefined();
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, literature: 7, english: 6 } } };

    // HLU giờ là verified-calculator (có nhánh exact `hlu-thpt-exam-exact-2026`); adapter /compare
    // vẫn dùng phương thức threshold-only nên phân loại là 'partial' (cùng hành vi VinhUni/HUB).
    expect(evaluateSchool(profile, 'hlu', { context: d01Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['hlu'], { hlu: d01Context })[0].status).toBe('partial');
  });
});

describe('evaluateHluThptExamExactAdmission (phương thức thi TN THPT — Điểm xét tuyển quy về D01)', () => {
  const p = (scores: Record<string, number>, priority?: { region?: string; category?: string }): ApplicantProfile => ({ thpt: { scores }, ...(priority ? { priority } : {}) });

  it('chưa chọn tổ hợp -> partial + missingRequirement', () => {
    const r = evaluateHluThptExamExactAdmission(p({ math: 8, literature: 8, english: 8 }));
    expect(r.confidence).toBe('partial');
    expect(r.missingRequirements).toContainEqual(expect.objectContaining({ code: 'hlu-subject-combination' }));
  });

  it('D01, tổng 24, không ưu tiên -> exact-verified, score 24, eligible', () => {
    const r = evaluateHluThptExamExactAdmission(p({ math: 8, literature: 8, english: 8 }), { combinationId: 'D01' });
    expect(r.confidence).toBe('exact-verified');
    expect(r.score).toEqual({ value: 24, scale: 30 });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('A00 trừ độ chênh 1,48', () => {
    const r = evaluateHluThptExamExactAdmission(p({ math: 8, physics: 8, chemistry: 8 }), { combinationId: 'A00' });
    expect(r.score).toEqual({ value: 22.52, scale: 30 });
    expect(r.eligibility?.status).toBe('eligible'); // tổng thô 24 ≥ 20
  });

  it('A01 trừ độ chênh 0,26', () => {
    const r = evaluateHluThptExamExactAdmission(p({ math: 8, physics: 7, english: 7 }), { combinationId: 'A01' });
    expect(r.confidence).toBe('exact-verified');
    expect(r.score).toEqual({ value: 21.74, scale: 30 });
  });

  it('cộng ưu tiên KV1 khi tổng < 22,5', () => {
    const r = evaluateHluThptExamExactAdmission(p({ math: 7, literature: 7, english: 7 }, { region: 'KV1' }), { combinationId: 'D01' });
    expect(r.score).toEqual({ value: 21.75, scale: 30 });
  });

  it('giảm ưu tiên KV1 khi tổng ≥ 22,5', () => {
    const r = evaluateHluThptExamExactAdmission(p({ math: 8, literature: 8, english: 8 }, { region: 'KV1' }), { combinationId: 'D01' });
    // ((30-24)/7.5)*0.75 = 0.6 -> 24.6
    expect(r.score).toEqual({ value: 24.6, scale: 30 });
  });

  it('tổng thô < 20 -> ineligible', () => {
    const r = evaluateHluThptExamExactAdmission(p({ math: 6, literature: 6, english: 6 }), { combinationId: 'D01' });
    expect(r.eligibility?.status).toBe('ineligible');
    expect(r.score).toEqual({ value: 18, scale: 30 });
  });

  it('đối chiếu điểm chuẩn ngành khi có programId', () => {
    const r = evaluateHluThptExamExactAdmission(p({ math: 9, literature: 9, english: 9 }), { combinationId: 'D01', programId: 'luat' });
    expect(r.eligibility?.reasons.some((x) => x.includes('24,12') || x.includes('24.12'))).toBe(true);
  });

  it('methodId đúng nhánh exact', () => {
    const r = evaluateHluThptExamExactAdmission(p({ math: 8, literature: 8, english: 8 }), { combinationId: 'D01' });
    expect(r.methodId).toBe('hlu-thpt-exam-exact-2026');
  });
});
