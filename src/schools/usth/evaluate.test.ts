import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateUsthThptExamAdmission, evaluateUsthThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('USTH THPT threshold eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };
    const result = evaluateUsthThptExamAdmission(profile);
    expect(result.eligibility?.status).toBe('unknown');
  });

  it('marks profiles below the common 19/30 baseline as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };
    const result = evaluateUsthThptExamAdmission(profile, a00Context);
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };
    expect(evaluateSchool(profile, 'usth', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['usth'], { usth: a00Context })[0].status).toBe('partial');
  });
});

describe('evaluateUsthThptExamExactAdmission (ĐXT = tổng thô + ưu tiên, theo mã ngành)', () => {
  const p = (scores: Record<string, number>, priority?: { region?: string; category?: string }): ApplicantProfile => ({ thpt: { scores }, ...(priority ? { priority } : {}) });

  it('chưa chọn mã ngành -> partial', () => {
    const r = evaluateUsthThptExamExactAdmission(p({ math: 7, physics: 7, chemistry: 7 }), a00Context);
    expect(r.confidence).toBe('partial');
  });

  it('chưa chọn tổ hợp -> partial', () => {
    const r = evaluateUsthThptExamExactAdmission(p({ math: 7, physics: 7, chemistry: 7 }), { programCode: '7440112' });
    expect(r.confidence).toBe('partial');
  });

  it('Hóa học (7440112, ngưỡng 19,00): tổng 21 -> eligible', () => {
    const r = evaluateUsthThptExamExactAdmission(p({ math: 7, physics: 7, chemistry: 7 }), { programCode: '7440112', ...a00Context });
    expect(r.confidence).toBe('exact-verified');
    expect(r.score).toEqual({ value: 21, scale: 30 });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('Hóa học: tổng 15 -> ineligible', () => {
    const r = evaluateUsthThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }), { programCode: '7440112', ...a00Context });
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('cộng điểm ưu tiên KV1 vào Điểm xét tuyển, có thể đổi kết quả đạt/không đạt', () => {
    const r = evaluateUsthThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6.1 }, { region: 'KV1' }), { programCode: '7440112', ...a00Context });
    expect(r.score).toEqual({ value: 18.85, scale: 30 });
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('Công nghệ vi mạch bán dẫn (7520401, ngưỡng 23,00): tổng 22 -> ineligible', () => {
    const r = evaluateUsthThptExamExactAdmission(p({ math: 8, physics: 7, chemistry: 7 }), { programCode: '7520401', ...a00Context });
    expect(r.score).toEqual({ value: 22, scale: 30 });
    expect(r.eligibility?.status).toBe('ineligible');
  });
});
