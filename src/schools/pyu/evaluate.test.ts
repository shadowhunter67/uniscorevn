import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluatePyuThptExamAdmission } from './evaluate';

const d01Context = { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const };
const tieuHoc = { fieldCode: '7140202' as const };
const cntt = { fieldCode: '7480201' as const };
const spToan = { fieldCode: '7140209' as const };

describe('PYU exact THPT admission calculator 2026 (10/11 ngành, Giáo dục Mầm non chưa mô hình hoá)', () => {
  it('requires a selected field before computing the score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };

    const result = evaluatePyuThptExamAdmission(profile, { subjectContext: d01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'pyu-field' }));
  });

  it('rejects an unmodeled field code (Giáo dục Mầm non not modeled)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };

    const result = evaluatePyuThptExamAdmission(profile, { fieldCode: '7140201', subjectContext: d01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'pyu-field' }));
  });

  it('marks ineligible below the Công nghệ thông tin 15,00/30 threshold', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };
    const a00Context = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const };

    const result = evaluatePyuThptExamAdmission(profile, { ...cntt, subjectContext: a00Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(12);
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('marks eligible at exactly the Công nghệ thông tin 15,00/30 threshold', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, english: 5 } } };
    const a01Context = { combinationId: 'A01', subjects: ['math', 'physics', 'english'] as const };

    const result = evaluatePyuThptExamAdmission(profile, { ...cntt, subjectContext: a01Context });

    expect(result.score?.value).toBe(15);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('applies the Sư phạm Toán học threshold (24,49/30), higher than the CNTT tier', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8.5, physics: 8, english: 8 } } };
    const a01Context = { combinationId: 'A01', subjects: ['math', 'physics', 'english'] as const };

    const result = evaluatePyuThptExamAdmission(profile, { ...spToan, subjectContext: a01Context });

    expect(result.score?.value).toBeCloseTo(24.5, 5);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('rejects a subject combination not in the field official combination list', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };
    const a00Context = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const };

    const result = evaluatePyuThptExamAdmission(profile, { ...tieuHoc, subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'pyu-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8 } } };

    const result = evaluatePyuThptExamAdmission(profile, { ...tieuHoc, subjectContext: d01Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'pyu-thpt-english' }));
  });

  it('applies standard priority points and threshold reduction near the top of the scale', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 8, literature: 8, english: 8.5 } },
      priority: { region: 'KV1' },
    };

    const result = evaluatePyuThptExamAdmission(profile, { ...tieuHoc, subjectContext: d01Context });

    // raw = 24.5 >= 22.5 -> reduced priority = [(30-24.5)/7.5] * 0.75 = 0.55
    expect(result.explanation.find((step) => step.id === 'pyu-exact-priority')?.output).toBe(0.55);
    expect(result.score?.value).toBe(25.05);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('does not mutate ApplicantProfile', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, literature: 7, english: 7 } } };
    const frozen = structuredClone(profile);
    evaluatePyuThptExamAdmission(profile, { ...tieuHoc, subjectContext: d01Context });
    expect(profile).toEqual(frozen);
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };
    const context = { ...tieuHoc, subjectContext: d01Context };

    expect(evaluateSchool(profile, 'pyu', { context }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['pyu'], { pyu: context })[0].status).toBe('calculated');
  });
});
