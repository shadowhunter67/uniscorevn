import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateDntuAdmission, evaluateDntuThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('DNTU THPT threshold eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };
    const result = evaluateDntuAdmission(profile);
    expect(result.eligibility?.status).toBe('unknown');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };
    expect(evaluateSchool(profile, 'dntu', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['dntu'], { dntu: a00Context })[0].status).toBe('partial');
  });
});

describe('evaluateDntuThptExamExactAdmission (so RAW theo nhóm ngành)', () => {
  const p = (scores: Record<string, number>, priority?: { region?: string; category?: string }): ApplicantProfile => ({ thpt: { scores }, ...(priority ? { priority } : {}) });

  it('chưa chọn nhóm ngành -> partial', () => {
    const r = evaluateDntuThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }), a00Context);
    expect(r.confidence).toBe('partial');
  });

  it('standard: raw 15 -> eligible', () => {
    const r = evaluateDntuThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }), { group: 'standard', ...a00Context });
    expect(r.confidence).toBe('exact-verified');
    expect(r.score).toEqual({ value: 15, scale: 30 });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('standard: raw 14 -> ineligible dù cộng ưu tiên (so RAW)', () => {
    const r = evaluateDntuThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 4 }, { region: 'KV1' }), { group: 'standard', ...a00Context });
    expect(r.eligibility?.status).toBe('ineligible');
    expect(r.score).toEqual({ value: 14.75, scale: 30 });
  });

  it('nursingMedtech: raw 15 chưa đạt 18 -> ineligible', () => {
    const r = evaluateDntuThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }), { group: 'nursingMedtech', ...a00Context });
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('nursingMedtech: raw 18 -> eligible', () => {
    const r = evaluateDntuThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6 }), { group: 'nursingMedtech', ...a00Context });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('methodId đúng nhánh exact', () => {
    const r = evaluateDntuThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6 }), { group: 'standard', ...a00Context });
    expect(r.methodId).toBe('dntu-thpt-exam-exact-2026');
  });
});
