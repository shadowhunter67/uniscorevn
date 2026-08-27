import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateDthuThptExamAdmission, evaluateDthuThptExamExactAdmission } from './evaluate';

const combo = { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };
const standard = { ...combo, group: 'standard' as const };
const teacher = { ...combo, group: 'teacherTraining' as const };
const law = { ...combo, group: 'law' as const };

describe('DTHU THPT-exam eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6, english: 6 } } };

    const result = evaluateDthuThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'dthu-subject-combination' }));
  });

  it('applies the 15/30 standard floor by default', () => {
    const below: ApplicantProfile = { thpt: { scores: { math: 4, literature: 5, english: 5.5 } } };
    const at: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };

    expect(evaluateDthuThptExamAdmission(below, standard).eligibility?.status).toBe('ineligible');
    expect(evaluateDthuThptExamAdmission(at, standard).eligibility?.status).toBe('eligible');
  });

  it('applies the 20/30 teacherTraining floor', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6, english: 7 } } };

    const result = evaluateDthuThptExamAdmission(profile, teacher);

    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'dthu-quality-threshold-2026' }));
  });

  it('applies the 20/30 law floor', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, literature: 7, english: 6 } } };

    expect(evaluateDthuThptExamAdmission(profile, law).eligibility?.status).toBe('eligible');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };

    // DTHU giờ là verified-calculator; adapter /compare vẫn dùng phương thức threshold-only nên
    // phân loại 'partial' (cùng hành vi VinhUni/HUB/HLU).
    expect(evaluateSchool(profile, 'dthu', { context: standard }).status).toBe('partial');
    expect(evaluateSchools(profile, ['dthu'], { dthu: standard })[0].status).toBe('partial');
  });
});

describe('evaluateDthuThptExamExactAdmission (Phương thức 100 — NĐV = tổng thô + ưu tiên)', () => {
  const p = (scores: Record<string, number>, priority?: { region?: string; category?: string }): ApplicantProfile => ({ thpt: { scores }, ...(priority ? { priority } : {}) });
  const subs = { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };

  it('chưa chọn nhóm -> partial', () => {
    const r = evaluateDthuThptExamExactAdmission(p({ math: 5, literature: 5, english: 5 }), { ...subs });
    expect(r.confidence).toBe('partial');
    expect(r.missingRequirements?.some((x) => x.code === 'dthu-program-group')).toBe(true);
  });

  it('standard, tổng 15, không ưu tiên -> exact-verified, NĐV 15, eligible', () => {
    const r = evaluateDthuThptExamExactAdmission(p({ math: 5, literature: 5, english: 5 }), { ...subs, group: 'standard' });
    expect(r.confidence).toBe('exact-verified');
    expect(r.score).toEqual({ value: 15, scale: 30 });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('standard, tổng 14 -> ineligible', () => {
    const r = evaluateDthuThptExamExactAdmission(p({ math: 5, literature: 5, english: 4 }), { ...subs, group: 'standard' });
    expect(r.eligibility?.status).toBe('ineligible');
    expect(r.score).toEqual({ value: 14, scale: 30 });
  });

  it('teacherTraining ngưỡng 20: tổng 21 -> eligible', () => {
    const r = evaluateDthuThptExamExactAdmission(p({ math: 7, literature: 7, english: 7 }), { ...subs, group: 'teacherTraining' });
    expect(r.eligibility?.status).toBe('eligible');
    expect(r.score).toEqual({ value: 21, scale: 30 });
  });

  it('cộng ưu tiên KV1 khi tổng < 22,5', () => {
    const r = evaluateDthuThptExamExactAdmission(p({ math: 6, literature: 6, english: 6 }, { region: 'KV1' }), { ...subs, group: 'standard' });
    expect(r.score).toEqual({ value: 18.75, scale: 30 });
  });

  it('giảm ưu tiên KV1 khi tổng ≥ 22,5', () => {
    const r = evaluateDthuThptExamExactAdmission(p({ math: 8, literature: 8, english: 8 }, { region: 'KV1' }), { ...subs, group: 'standard' });
    expect(r.score).toEqual({ value: 24.6, scale: 30 });
  });

  it('methodId đúng nhánh exact', () => {
    const r = evaluateDthuThptExamExactAdmission(p({ math: 7, literature: 7, english: 7 }), { ...subs, group: 'standard' });
    expect(r.methodId).toBe('dthu-thpt-exam-exact-2026');
  });
});
