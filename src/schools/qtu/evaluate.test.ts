import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateQtuAdmission, evaluateQtuThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('QTU THPT threshold eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };
    const result = evaluateQtuAdmission(profile);
    expect(result.eligibility?.status).toBe('unknown');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };
    expect(evaluateSchool(profile, 'qtu', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['qtu'], { qtu: a00Context })[0].status).toBe('partial');
  });
});

describe('evaluateQtuThptExamExactAdmission (ĐXT = tổng thô + ưu tiên, theo nhóm ngành)', () => {
  const p = (scores: Record<string, number>, priority?: { region?: string; category?: string }): ApplicantProfile => ({ thpt: { scores }, ...(priority ? { priority } : {}) });

  it('chưa chọn nhóm ngành -> partial', () => {
    const r = evaluateQtuThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }), a00Context);
    expect(r.confidence).toBe('partial');
  });

  it('chưa chọn tổ hợp -> partial', () => {
    const r = evaluateQtuThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }), { group: 'standard' });
    expect(r.confidence).toBe('partial');
  });

  it('standard: ĐXT 15, không ưu tiên -> eligible', () => {
    const r = evaluateQtuThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }), { group: 'standard', ...a00Context });
    expect(r.confidence).toBe('exact-verified');
    expect(r.score).toEqual({ value: 15, scale: 30 });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('standard: ĐXT 14 -> ineligible', () => {
    const r = evaluateQtuThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 4 }), { group: 'standard', ...a00Context });
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('nursing: ĐXT 15 chưa đạt ngưỡng 18 -> ineligible', () => {
    const r = evaluateQtuThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }), { group: 'nursing', ...a00Context });
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('nursing: ĐXT 18 -> eligible', () => {
    const r = evaluateQtuThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6 }), { group: 'nursing', ...a00Context });
    expect(r.eligibility?.status).toBe('eligible');
    expect(r.score).toEqual({ value: 18, scale: 30 });
  });

  it('cộng ưu tiên KV1 giúp standard đạt ngưỡng', () => {
    const r = evaluateQtuThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 4 }, { region: 'KV1' }), { group: 'standard', ...a00Context });
    expect(r.score).toEqual({ value: 14.75, scale: 30 });
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('methodId đúng nhánh exact', () => {
    const r = evaluateQtuThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6 }), { group: 'standard', ...a00Context });
    expect(r.methodId).toBe('qtu-thpt-exam-exact-2026');
  });
});
