import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateVhuAdmission, evaluateVhuThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('VHU THPT baseline eligibility 2026', () => {
  it('marks profiles below the common 15/30 baseline as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };
    const result = evaluateVhuAdmission(profile, a00Context);
    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('keeps profiles between the 15/30 baseline and the highest published floor (20) unresolved', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };
    expect(evaluateVhuAdmission(profile, a00Context).eligibility?.status).toBe('unknown');
  });

  it('stays unknown even above the highest published floor (band threshold, needs a program pick)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };
    expect(evaluateVhuAdmission(profile, a00Context).eligibility?.status).toBe('unknown');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };
    expect(evaluateVhuAdmission(profile).eligibility?.status).toBe('unknown');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };
    expect(evaluateSchool(profile, 'vhu', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['vhu'], { vhu: a00Context })[0].status).toBe('partial');
  });
});

describe('evaluateVhuThptExamExactAdmission (so tổng thô theo mã ngành)', () => {
  const p = (scores: Record<string, number>, priority?: { region?: string; category?: string }): ApplicantProfile => ({ thpt: { scores }, ...(priority ? { priority } : {}) });

  it('chưa chọn mã ngành -> partial', () => {
    const r = evaluateVhuThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }), a00Context);
    expect(r.confidence).toBe('partial');
  });

  it('chưa chọn tổ hợp -> partial', () => {
    const r = evaluateVhuThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }), { programCode: '7480201' });
    expect(r.confidence).toBe('partial');
  });

  it('Công nghệ thông tin (7480201, ngưỡng 15): tổng 18 -> eligible', () => {
    const r = evaluateVhuThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6 }), { programCode: '7480201', ...a00Context });
    expect(r.confidence).toBe('exact-verified');
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('Luật (7380101, ngưỡng 20): tổng 18 -> ineligible dù đạt sàn CNTT', () => {
    const r = evaluateVhuThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6 }), { programCode: '7380101', ...a00Context });
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('điểm ưu tiên chỉ hiển thị tham khảo, không cộng vào so sánh ngưỡng', () => {
    const r = evaluateVhuThptExamExactAdmission(p({ math: 4, physics: 4, chemistry: 4 }, { region: 'KV1' }), { programCode: '7480201', ...a00Context });
    expect(r.eligibility?.status).toBe('ineligible');
    expect(r.score).toEqual({ value: 12.75, scale: 30 });
  });

  it('mã ngành không có trong bảng -> partial', () => {
    const r = evaluateVhuThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6 }), { programCode: 'not-a-code', ...a00Context });
    expect(r.confidence).toBe('partial');
  });
});
