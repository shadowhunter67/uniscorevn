import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateDtuThptExamAdmission, evaluateDtuThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('DTU THPT baseline eligibility 2026', () => {
  it('marks profiles below the common 15/30 baseline as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateDtuThptExamAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'dtu-admission-info-2026' }));
  });

  it('keeps profiles between the baseline and the highest published group floor unresolved', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluateDtuThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.eligibility?.reasons.join(' ')).toContain('15');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluateDtuThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'dtu-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6 } } };

    const result = evaluateDtuThptExamAdmission(profile, a00Context);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'dtu-thpt-chemistry' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    // DTU giờ là verified-calculator; adapter /compare vẫn dùng phương thức threshold-only nên
    // phân loại 'partial' (cùng hành vi các trường verified-calculator khác).
    expect(evaluateSchool(profile, 'dtu', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['dtu'], { dtu: a00Context })[0].status).toBe('partial');
  });
});

describe('evaluateDtuThptExamExactAdmission (ngành chung, không điểm cộng — ĐXT = tổng thô + ưu tiên)', () => {
  const p = (scores: Record<string, number>, priority?: { region?: string; category?: string }): ApplicantProfile => ({ thpt: { scores }, ...(priority ? { priority } : {}) });
  const subs = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

  it('chưa xác nhận ngành chung -> partial', () => {
    const r = evaluateDtuThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6 }), { ...subs });
    expect(r.confidence).toBe('partial');
    expect(r.missingRequirements?.some((x) => x.code === 'dtu-general-program-confirm')).toBe(true);
  });

  it('tổng 15, không ưu tiên -> exact-verified, ĐXT 15, eligible', () => {
    const r = evaluateDtuThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }), { ...subs, isGeneralProgram: true });
    expect(r.confidence).toBe('exact-verified');
    expect(r.score).toEqual({ value: 15, scale: 30 });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('tổng 14 -> ineligible', () => {
    const r = evaluateDtuThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 4 }), { ...subs, isGeneralProgram: true });
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('cộng ưu tiên KV1', () => {
    const r = evaluateDtuThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 4 }, { region: 'KV1' }), { ...subs, isGeneralProgram: true });
    expect(r.score).toEqual({ value: 14.75, scale: 30 });
  });

  it('methodId đúng nhánh exact', () => {
    const r = evaluateDtuThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6 }), { ...subs, isGeneralProgram: true });
    expect(r.methodId).toBe('dtu-thpt-exam-exact-2026');
  });
});
