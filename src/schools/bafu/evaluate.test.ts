import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateBafuAdmission, evaluateBafuThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('BAFU THPT threshold eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };
    const result = evaluateBafuAdmission(profile);
    expect(result.eligibility?.status).toBe('unknown');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };
    expect(evaluateSchool(profile, 'bafu', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['bafu'], { bafu: a00Context })[0].status).toBe('partial');
  });
});

describe('evaluateBafuThptExamExactAdmission (ĐXT = tổng thô + ưu tiên, ngưỡng RAW 15/30)', () => {
  const p = (scores: Record<string, number>, priority?: { region?: string; category?: string }): ApplicantProfile => ({ thpt: { scores }, ...(priority ? { priority } : {}) });

  it('chưa chọn tổ hợp -> partial', () => {
    const r = evaluateBafuThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }));
    expect(r.confidence).toBe('partial');
  });

  it('tổng raw 15, không ưu tiên -> exact-verified, ĐXT 15, eligible', () => {
    const r = evaluateBafuThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }), a00Context);
    expect(r.confidence).toBe('exact-verified');
    expect(r.score).toEqual({ value: 15, scale: 30 });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('tổng raw 14 -> ineligible dù cộng ưu tiên vẫn không đổi kết luận (so RAW)', () => {
    const r = evaluateBafuThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 4 }, { region: 'KV1' }), a00Context);
    expect(r.eligibility?.status).toBe('ineligible');
    expect(r.score).toEqual({ value: 14.75, scale: 30 });
  });

  it('giảm điểm ưu tiên khi tổng thô ≥22,5', () => {
    const r = evaluateBafuThptExamExactAdmission(p({ math: 8, physics: 8, chemistry: 7 }, { region: 'KV1' }), a00Context);
    expect(r.score?.value).toBeLessThan(23.75);
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('methodId đúng nhánh exact', () => {
    const r = evaluateBafuThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6 }), a00Context);
    expect(r.methodId).toBe('bafu-thpt-exam-exact-2026');
  });
});
