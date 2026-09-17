import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateVuiAdmission, evaluateVuiThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('VUI THPT threshold eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };
    const result = evaluateVuiAdmission(profile);
    expect(result.eligibility?.status).toBe('unknown');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };
    expect(evaluateSchool(profile, 'vui', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['vui'], { vui: a00Context })[0].status).toBe('partial');
  });
});

describe('evaluateVuiThptExamExactAdmission (so RAW 15/30)', () => {
  const p = (scores: Record<string, number>, priority?: { region?: string; category?: string }): ApplicantProfile => ({ thpt: { scores }, ...(priority ? { priority } : {}) });

  it('chưa chọn tổ hợp -> partial', () => {
    const r = evaluateVuiThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }));
    expect(r.confidence).toBe('partial');
  });

  it('raw 15, không ưu tiên -> exact-verified, eligible', () => {
    const r = evaluateVuiThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }), a00Context);
    expect(r.confidence).toBe('exact-verified');
    expect(r.score).toEqual({ value: 15, scale: 30 });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('raw 14 -> ineligible dù cộng ưu tiên (so RAW)', () => {
    const r = evaluateVuiThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 4 }, { region: 'KV1' }), a00Context);
    expect(r.eligibility?.status).toBe('ineligible');
    expect(r.score).toEqual({ value: 14.75, scale: 30 });
  });

  it('methodId đúng nhánh exact', () => {
    const r = evaluateVuiThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6 }), a00Context);
    expect(r.methodId).toBe('vui-thpt-exam-exact-2026');
  });
});
