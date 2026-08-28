import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateTtuThptExamAdmission, evaluateTtuThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('TTU THPT baseline eligibility 2026', () => {
  it('marks profiles below the common 15/30 baseline as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateTtuThptExamAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'ttu-floor-score-2026' }));
  });

  it('keeps profiles between the baseline and the highest published group floor unresolved', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluateTtuThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.eligibility?.reasons.join(' ')).toContain('15');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluateTtuThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'ttu-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6 } } };

    const result = evaluateTtuThptExamAdmission(profile, a00Context);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'ttu-thpt-chemistry' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    // TTU giờ là verified-calculator; adapter /compare vẫn dùng phương thức threshold-only nên
    // phân loại 'partial' (cùng hành vi các trường verified-calculator khác).
    expect(evaluateSchool(profile, 'ttu', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['ttu'], { ttu: a00Context })[0].status).toBe('partial');
  });
});

describe('evaluateTtuThptExamExactAdmission (Phương thức thi TN THPT — ĐXT theo nhóm ngành)', () => {
  const p = (scores: Record<string, number>, priority?: { region?: string; category?: string }): ApplicantProfile => ({ thpt: { scores }, ...(priority ? { priority } : {}) });
  const subs = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

  it('chưa chọn nhóm -> partial', () => {
    const r = evaluateTtuThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }), { ...subs });
    expect(r.confidence).toBe('partial');
    expect(r.missingRequirements?.some((x) => x.code === 'ttu-program-group')).toBe(true);
  });

  it('standard (ngưỡng 15), tổng 15 -> exact-verified, eligible', () => {
    const r = evaluateTtuThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }), { ...subs, group: 'standard' });
    expect(r.confidence).toBe('exact-verified');
    expect(r.score).toEqual({ value: 15, scale: 30 });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('law (ngưỡng 20), tổng 19 -> ineligible', () => {
    const r = evaluateTtuThptExamExactAdmission(p({ math: 7, physics: 6, chemistry: 6 }), { ...subs, group: 'law' });
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('nursingMedtech (ngưỡng 18), tổng 18 -> eligible', () => {
    const r = evaluateTtuThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6 }), { ...subs, group: 'nursingMedtech' });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('methodId đúng nhánh exact', () => {
    const r = evaluateTtuThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6 }), { ...subs, group: 'standard' });
    expect(r.methodId).toBe('ttu-thpt-exam-exact-2026');
  });
});
