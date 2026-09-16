import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateHpuAdmission, evaluateHpuThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('HPU THPT threshold eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };
    const result = evaluateHpuAdmission(profile);
    expect(result.eligibility?.status).toBe('unknown');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };
    expect(evaluateSchool(profile, 'hpu', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['hpu'], { hpu: a00Context })[0].status).toBe('partial');
  });
});

describe('evaluateHpuThptExamExactAdmission (so RAW theo mã ngành)', () => {
  const p = (scores: Record<string, number>, priority?: { region?: string; category?: string }): ApplicantProfile => ({ thpt: { scores }, ...(priority ? { priority } : {}) });

  it('chưa chọn mã ngành -> partial', () => {
    const r = evaluateHpuThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }), a00Context);
    expect(r.confidence).toBe('partial');
  });

  it('mã ngành không hợp lệ -> partial', () => {
    const r = evaluateHpuThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }), { programCode: '9999999', ...a00Context });
    expect(r.confidence).toBe('partial');
  });

  it('CNTT (7480201, ngưỡng 16): raw 16 -> eligible', () => {
    const r = evaluateHpuThptExamExactAdmission(p({ math: 6, physics: 5, chemistry: 5 }), { programCode: '7480201', ...a00Context });
    expect(r.confidence).toBe('exact-verified');
    expect(r.score).toEqual({ value: 16, scale: 30 });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('CNTT: raw 15 -> ineligible', () => {
    const r = evaluateHpuThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }), { programCode: '7480201', ...a00Context });
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('QTKD (7340101, ngưỡng 18,5): raw 18,5 -> eligible', () => {
    const r = evaluateHpuThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6.5 }), { programCode: '7340101', ...a00Context });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('methodId đúng nhánh exact', () => {
    const r = evaluateHpuThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6 }), { programCode: '7480201', ...a00Context });
    expect(r.methodId).toBe('hpu-thpt-exam-exact-2026');
  });
});
