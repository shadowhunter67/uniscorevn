import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateTtnThptExamAdmission, evaluateTtnThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('TTN THPT baseline eligibility 2026', () => {
  it('marks profiles below the common 15/30 baseline as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateTtnThptExamAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'ttn-threshold-notice-2026' }));
  });

  it('keeps profiles between the baseline and the highest published program floor unresolved', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluateTtnThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.eligibility?.reasons.join(' ')).toContain('15');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluateTtnThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'ttn-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6 } } };

    const result = evaluateTtnThptExamAdmission(profile, a00Context);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'ttn-thpt-chemistry' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    // TTN giờ là verified-calculator; adapter /compare vẫn dùng phương thức threshold-only nên
    // phân loại 'partial' (cùng hành vi VinhUni/HUB/HLU/DTHU/TUAF).
    expect(evaluateSchool(profile, 'ttn', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['ttn'], { ttn: a00Context })[0].status).toBe('partial');
  });
});

describe('evaluateTtnThptExamExactAdmission (Phương thức 100 — ĐXT theo nhóm ngưỡng)', () => {
  const p = (scores: Record<string, number>, priority?: { region?: string; category?: string }): ApplicantProfile => ({ thpt: { scores }, ...(priority ? { priority } : {}) });
  const subs = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

  it('chưa chọn nhóm -> partial', () => {
    const r = evaluateTtnThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }), { ...subs });
    expect(r.confidence).toBe('partial');
    expect(r.missingRequirements?.some((x) => x.code === 'ttn-program-group')).toBe(true);
  });

  it('standard (ngưỡng 15), tổng 15 -> exact-verified, ĐXT 15, eligible', () => {
    const r = evaluateTtnThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }), { ...subs, group: 'standard' });
    expect(r.confidence).toBe('exact-verified');
    expect(r.score).toEqual({ value: 15, scale: 30 });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('medicine (ngưỡng 22), tổng 21 -> ineligible', () => {
    const r = evaluateTtnThptExamExactAdmission(p({ math: 7, physics: 7, chemistry: 7 }), { ...subs, group: 'medicine' });
    expect(r.eligibility?.status).toBe('ineligible');
    expect(r.score).toEqual({ value: 21, scale: 30 });
  });

  it('teacher (ngưỡng 20), tổng 20 -> eligible', () => {
    const r = evaluateTtnThptExamExactAdmission(p({ math: 7, physics: 7, chemistry: 6 }), { ...subs, group: 'teacher' });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('cộng ưu tiên KV1', () => {
    const r = evaluateTtnThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }, { region: 'KV1' }), { ...subs, group: 'standard' });
    expect(r.score).toEqual({ value: 15.75, scale: 30 });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('methodId đúng nhánh exact', () => {
    const r = evaluateTtnThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6 }), { ...subs, group: 'standard' });
    expect(r.methodId).toBe('ttn-thpt-exam-exact-2026');
  });
});
