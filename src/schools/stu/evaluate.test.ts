import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateStuThptExamAdmission } from './evaluate';

const a00Context = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const };
const c00Context = { combinationId: 'C00', subjects: ['literature', 'history', 'geography'] as const };
const d01Context = { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const };

describe('STU exact THPT admission calculator 2026', () => {
  it('marks a profile below the common PT02 threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateStuThptExamAdmission(profile, { fieldCode: '7480201', subjectContext: a00Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(12);
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'stu-cutoff-2026' }));
  });

  it('marks a profile at the common PT02 threshold as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateStuThptExamAdmission(profile, { fieldCode: '7480201', subjectContext: a00Context });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(15);
  });

  it('uses the higher Luat kinh te threshold', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 7, english: 6 } } };

    const result = evaluateStuThptExamAdmission(profile, { fieldCode: '7380107', subjectContext: d01Context });

    expect(result.score?.value).toBe(19);
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('rejects a tech field combination without math', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, history: 8, geography: 8 } } };

    const result = evaluateStuThptExamAdmission(profile, { fieldCode: '7480201', subjectContext: c00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'stu-subject-combination' }));
  });

  it('accepts a non-tech field combination with literature and no math', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 6, history: 5, geography: 5 } } };

    const result = evaluateStuThptExamAdmission(profile, { fieldCode: '7340101', subjectContext: c00Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(16);
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8 } } };

    const result = evaluateStuThptExamAdmission(profile, { fieldCode: '7380107', subjectContext: d01Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'stu-thpt-english' }));
  });

  it('applies standard priority points and threshold reduction near the top of the scale', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 9, physics: 9, chemistry: 8.5 } },
      priority: { region: 'KV1' },
    };

    const result = evaluateStuThptExamAdmission(profile, { fieldCode: '7480201', subjectContext: a00Context });

    expect(result.explanation.find((step) => step.id === 'stu-exact-priority')?.output).toBe(0.35);
    expect(result.score?.value).toBe(26.85);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };
    const context = { fieldCode: '7480201', subjectContext: a00Context };

    expect(evaluateSchool(profile, 'stu', { context }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['stu'], { stu: context })[0].status).toBe('calculated');
  });
});
