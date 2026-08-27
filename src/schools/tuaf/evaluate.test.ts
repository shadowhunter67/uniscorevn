import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateTuafThptExamAdmission, evaluateTuafThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('TUAF THPT baseline eligibility 2026', () => {
  it('marks profiles below the 16/30 floor as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateTuafThptExamAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'tuaf-thpt-threshold-2026' }));
  });

  it('marks profiles at or above the uniform 16/30 floor as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 5, chemistry: 5 } } };

    const result = evaluateTuafThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.eligibility?.reasons.join(' ')).toContain('16');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluateTuafThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'tuaf-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6 } } };

    const result = evaluateTuafThptExamAdmission(profile, a00Context);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'tuaf-thpt-chemistry' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    // TUAF giờ là verified-calculator; adapter /compare vẫn dùng phương thức threshold-only nên
    // phân loại 'partial' (cùng hành vi VinhUni/HUB/HLU/DTHU).
    expect(evaluateSchool(profile, 'tuaf', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['tuaf'], { tuaf: a00Context })[0].status).toBe('partial');
  });
});

describe('evaluateTuafThptExamExactAdmission (thi TN THPT — ĐXT = tổng thô + ưu tiên)', () => {
  const p = (scores: Record<string, number>, priority?: { region?: string; category?: string }): ApplicantProfile => ({ thpt: { scores }, ...(priority ? { priority } : {}) });
  const subs = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

  it('chưa chọn tổ hợp -> partial', () => {
    const r = evaluateTuafThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6 }));
    expect(r.confidence).toBe('partial');
  });

  it('tổng 16, không ưu tiên -> exact-verified, ĐXT 16, eligible', () => {
    const r = evaluateTuafThptExamExactAdmission(p({ math: 6, physics: 5, chemistry: 5 }), subs);
    expect(r.confidence).toBe('exact-verified');
    expect(r.score).toEqual({ value: 16, scale: 30 });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('tổng 15 -> ineligible', () => {
    const r = evaluateTuafThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }), subs);
    expect(r.eligibility?.status).toBe('ineligible');
    expect(r.score).toEqual({ value: 15, scale: 30 });
  });

  it('cộng ưu tiên KV1 đẩy tổng 15 -> 15,75, eligible', () => {
    const r = evaluateTuafThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }, { region: 'KV1' }), subs);
    expect(r.score).toEqual({ value: 15.75, scale: 30 });
    expect(r.eligibility?.status).toBe('ineligible'); // 15.75 < 16
  });

  it('methodId đúng nhánh exact', () => {
    const r = evaluateTuafThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6 }), subs);
    expect(r.methodId).toBe('tuaf-thpt-exam-exact-2026');
  });
});
