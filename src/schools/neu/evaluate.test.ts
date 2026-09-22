import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { findNeuVactEquivalenceBand } from './equivalence';
import { evaluateNeuEquivalence, evaluateNeuThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('NEU 2026 equivalence bands', () => {
  it('finds the official V-ACT to THPT band', () => {
    expect(findNeuVactEquivalenceBand(900)?.thpt).toEqual([26, 28]);
    expect(findNeuVactEquivalenceBand(700)?.thpt).toEqual([22, 24]);
    expect(findNeuVactEquivalenceBand(699)).toBeUndefined();
  });

  it('evaluates shared V-ACT profile as partial band lookup', () => {
    const profile: ApplicantProfile = { exams: { vact: { total: 1004, totalSource: 'user-total-input' } } };
    const result = evaluateNeuEquivalence(profile);
    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('eligible');
    expect(result.explanation[0].formula).toContain('THPT 28-30');
    expect(result.score).toBeUndefined();
  });
});

describe('evaluateNeuThptExamExactAdmission (PTXT5, ĐXT = tổng thô hệ số 1 + ưu tiên)', () => {
  const p = (scores: Record<string, number>, priority?: { region?: string; category?: string }): ApplicantProfile => ({ thpt: { scores }, ...(priority ? { priority } : {}) });

  it('chưa chọn mã ngành -> partial', () => {
    const r = evaluateNeuThptExamExactAdmission(p({ math: 8, physics: 8, chemistry: 8 }), a00Context);
    expect(r.confidence).toBe('partial');
  });

  it('chưa chọn tổ hợp -> partial', () => {
    const r = evaluateNeuThptExamExactAdmission(p({ math: 8, physics: 8, chemistry: 8 }), { programCode: '7480201' });
    expect(r.confidence).toBe('partial');
  });

  it('Công nghệ thông tin (7480201, ngưỡng 25,68): tổng 24 -> ineligible', () => {
    const r = evaluateNeuThptExamExactAdmission(p({ math: 8, physics: 8, chemistry: 8 }), { programCode: '7480201', ...a00Context });
    expect(r.confidence).toBe('exact-verified');
    expect(r.score).toEqual({ value: 24, scale: 30 });
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('Công nghệ thông tin: tổng 26 -> eligible', () => {
    const r = evaluateNeuThptExamExactAdmission(p({ math: 9, physics: 9, chemistry: 8 }), { programCode: '7480201', ...a00Context });
    expect(r.score).toEqual({ value: 26, scale: 30 });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('cộng điểm ưu tiên KV1 vào Điểm xét tuyển (đã giảm vì tổng thô 24 >= 22,5)', () => {
    const r = evaluateNeuThptExamExactAdmission(p({ math: 8, physics: 8, chemistry: 8 }, { region: 'KV1' }), { programCode: '7480201', ...a00Context });
    // effectivePriority30 = round2(((30-24)/7.5)*0.75) = 0.6 -> dxt = 24.6
    expect(r.score).toEqual({ value: 24.6, scale: 30 });
  });

  it('mã ngành ngoài phạm vi (vd EP19) -> partial', () => {
    const r = evaluateNeuThptExamExactAdmission(p({ math: 8, physics: 8, chemistry: 8 }), { programCode: 'EP19', ...a00Context });
    expect(r.confidence).toBe('partial');
  });
});

