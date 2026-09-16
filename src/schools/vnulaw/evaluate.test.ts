import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateVnulawThptExamAdmission } from './evaluate';

const d01Context = { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const };
const luat = { fieldCode: '7380101' as const }; // 24.52
const luatKinhTe = { fieldCode: '7380107' as const }; // 24.83

describe('VNU-Luật exact THPT admission calculator 2026 (3/3 ngành, phương thức 100)', () => {
  it('requires a selected field before computing the score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };

    const result = evaluateVnulawThptExamAdmission(profile, { subjectContext: d01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vnulaw-field' }));
  });

  it('rejects a subject combination not in the accepted list (D03 excluded)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };

    const result = evaluateVnulawThptExamAdmission(profile, { ...luat, subjectContext: { combinationId: 'D03', subjects: ['math', 'literature', 'english'] } });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vnulaw-subject-combination' }));
  });

  it('marks ineligible below the Luật 24,52/30 threshold', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, literature: 7, english: 7 } } };

    const result = evaluateVnulawThptExamAdmission(profile, { ...luat, subjectContext: d01Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(21);
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('marks eligible at or above the Luật 24,52/30 threshold with Toán/Văn floor met', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8.26, literature: 8.26, english: 8 } } };

    const result = evaluateVnulawThptExamAdmission(profile, { ...luat, subjectContext: d01Context });

    expect(result.score?.value).toBe(24.52);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('marks ineligible when total meets threshold but Toán/Văn floor is not met', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 9.52, english: 10 } } };

    const result = evaluateVnulawThptExamAdmission(profile, { ...luat, subjectContext: d01Context });

    expect(result.score?.value).toBe(24.52);
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.eligibility?.reasons.join(' ')).toContain('Toán');
  });

  it('applies the Luật Kinh tế threshold (24,83/30), higher than Luật', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8.28, literature: 8.28, english: 8.27 } } };

    const result = evaluateVnulawThptExamAdmission(profile, { ...luatKinhTe, subjectContext: d01Context });

    expect(result.score?.value).toBe(24.83);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8 } } };

    const result = evaluateVnulawThptExamAdmission(profile, { ...luat, subjectContext: d01Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'vnulaw-thpt-english' }));
  });

  it('applies the priority reduction formula near the top of the scale', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 8, literature: 8, english: 8.5 } },
      priority: { region: 'KV1' },
    };

    const result = evaluateVnulawThptExamAdmission(profile, { ...luat, subjectContext: d01Context });

    // raw = 24.5 >= 22.5 -> reduced priority = [(30-24.5)/7.5] * 0.75 = 0.55
    expect(result.explanation.find((step) => step.id === 'vnulaw-exact-priority')?.output).toBe(0.55);
    expect(result.score?.value).toBe(25.05);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('does not mutate ApplicantProfile', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, literature: 7, english: 7 } } };
    const frozen = structuredClone(profile);
    evaluateVnulawThptExamAdmission(profile, { ...luat, subjectContext: d01Context });
    expect(profile).toEqual(frozen);
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8.26, literature: 8.26, english: 8 } } };
    const context = { ...luat, subjectContext: d01Context };

    expect(evaluateSchool(profile, 'vnulaw', { context }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['vnulaw'], { vnulaw: context })[0].status).toBe('calculated');
  });
});
