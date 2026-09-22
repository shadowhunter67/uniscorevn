import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateTnusThptExamAdmission, evaluateTnusThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };
const d01Context = { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };

describe('TNUS THPT baseline eligibility 2026', () => {
  it('marks profiles below the common 16.35/30 baseline as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateTnusThptExamAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'tnus-cutoff-2026' }));
  });

  it('keeps profiles between the baseline and the highest published major floor unresolved', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };

    const result = evaluateTnusThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.eligibility?.reasons.join(' ')).toContain('16,35');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };

    const result = evaluateTnusThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'tnus-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7 } } };

    const result = evaluateTnusThptExamAdmission(profile, a00Context);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'tnus-thpt-chemistry' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    expect(evaluateSchool(profile, 'tnus', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['tnus'], { tnus: a00Context })[0].status).toBe('partial');
  });
});

describe('evaluateTnusThptExamExactAdmission (ĐXT = tổng thô + ưu tiên, theo mã xét tuyển)', () => {
  const p = (scores: Record<string, number>, priority?: { region?: string; category?: string }): ApplicantProfile => ({ thpt: { scores }, ...(priority ? { priority } : {}) });

  it('chưa chọn mã xét tuyển -> partial', () => {
    const r = evaluateTnusThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }), a00Context);
    expect(r.confidence).toBe('partial');
  });

  it('chưa chọn tổ hợp -> partial', () => {
    const r = evaluateTnusThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }), { programCode: '7480201' });
    expect(r.confidence).toBe('partial');
  });

  it('Công nghệ thông tin (7480201, ngưỡng 17,13): tổng 18 -> eligible', () => {
    const r = evaluateTnusThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6 }), { programCode: '7480201', ...a00Context });
    expect(r.confidence).toBe('exact-verified');
    expect(r.score).toEqual({ value: 18, scale: 30 });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('Công nghệ thông tin: tổng 15 -> ineligible', () => {
    const r = evaluateTnusThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }), { programCode: '7480201', ...a00Context });
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('cộng điểm ưu tiên KV1 vào Điểm xét tuyển', () => {
    const r = evaluateTnusThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6 }, { region: 'KV1' }), { programCode: '7480201', ...a00Context });
    expect(r.score).toEqual({ value: 18.75, scale: 30 });
  });

  it('Luật (7380101, ngưỡng 20): đủ tổng nhưng Toán+Văn đều dưới 6 trong tổ hợp -> ineligible (điều kiện phụ)', () => {
    const r = evaluateTnusThptExamExactAdmission(p({ math: 5, literature: 5, english: 10 }), { programCode: '7380101', ...d01Context });
    expect(r.score).toEqual({ value: 20, scale: 30 });
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('Luật: tổng đủ và Toán ≥ 6 trong tổ hợp -> eligible', () => {
    const r = evaluateTnusThptExamExactAdmission(p({ math: 6, literature: 4, english: 10 }), { programCode: '7380101', ...d01Context });
    expect(r.score).toEqual({ value: 20, scale: 30 });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('Công nghệ bán dẫn (7440102TD, ngưỡng 22,5): Toán dưới 7,5 -> ineligible dù đủ tổng', () => {
    const r = evaluateTnusThptExamExactAdmission(p({ math: 7, physics: 8, chemistry: 7.5 }), { programCode: '7440102TD', ...a00Context });
    expect(r.score).toEqual({ value: 22.5, scale: 30 });
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('Công nghệ bán dẫn: Toán ≥ 7,5 và đủ tổng -> eligible', () => {
    const r = evaluateTnusThptExamExactAdmission(p({ math: 7.5, physics: 8, chemistry: 7 }), { programCode: '7440102TD', ...a00Context });
    expect(r.score).toEqual({ value: 22.5, scale: 30 });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('routes through generic evaluateSchool adapter for the baseline method (exact method uses its own context shape)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };
    expect(evaluateSchool(profile, 'tnus', { context: a00Context }).status).toBe('partial');
  });
});
