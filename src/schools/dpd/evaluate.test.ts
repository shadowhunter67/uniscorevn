import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateDpdThptExamAdmission, evaluateDpdThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('DPD THPT baseline eligibility 2026', () => {
  it('marks profiles below the common 15/30 floor as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };
    const result = evaluateDpdThptExamAdmission(profile, a00Context);
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };
    const result = evaluateDpdThptExamAdmission(profile);
    expect(result.eligibility?.status).toBe('unknown');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };
    expect(evaluateSchool(profile, 'dpd', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['dpd'], { dpd: a00Context })[0].status).toBe('partial');
  });
});

describe('evaluateDpdThptExamExactAdmission (ĐXT = tổng thô + ưu tiên, theo chương trình)', () => {
  const p = (scores: Record<string, number>, priority?: { region?: string; category?: string }): ApplicantProfile => ({ thpt: { scores }, ...(priority ? { priority } : {}) });

  it('chưa chọn chương trình -> partial', () => {
    const r = evaluateDpdThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6 }), a00Context);
    expect(r.confidence).toBe('partial');
  });

  it('chưa chọn tổ hợp -> partial', () => {
    const r = evaluateDpdThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6 }), { programSlug: 'cntt' });
    expect(r.confidence).toBe('partial');
  });

  it('Công nghệ thông tin (ngưỡng 15): tổng 18 -> eligible', () => {
    const r = evaluateDpdThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6 }), { programSlug: 'cntt', ...a00Context });
    expect(r.confidence).toBe('exact-verified');
    expect(r.score).toEqual({ value: 18, scale: 30 });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('Công nghệ thông tin: tổng 12 -> ineligible', () => {
    const r = evaluateDpdThptExamExactAdmission(p({ math: 4, physics: 4, chemistry: 4 }), { programSlug: 'cntt', ...a00Context });
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('Công nghệ kỹ thuật ô tô (ngưỡng 17): tổng 16 -> ineligible dù đạt sàn CNTT', () => {
    const r = evaluateDpdThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 6 }), { programSlug: 'cnkt-o-to', ...a00Context });
    expect(r.score).toEqual({ value: 16, scale: 30 });
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('cộng điểm ưu tiên KV1 vào Điểm xét tuyển', () => {
    const r = evaluateDpdThptExamExactAdmission(p({ math: 4, physics: 4, chemistry: 4 }, { region: 'KV1' }), { programSlug: 'cntt', ...a00Context });
    expect(r.score).toEqual({ value: 12.75, scale: 30 });
  });

  it('chương trình không có trong bảng -> partial', () => {
    const r = evaluateDpdThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6 }), { programSlug: 'not-a-program', ...a00Context });
    expect(r.confidence).toBe('partial');
  });
});
