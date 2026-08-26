import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateDhvThptExamAdmission } from './evaluate';

const d01Context = { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };

describe('DHV THPT threshold eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };

    const result = evaluateDhvThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'dhv-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5 } } };

    const result = evaluateDhvThptExamAdmission(profile, d01Context);

    expect(result.missingInputs).toHaveLength(1);
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'dhv-thpt-english' }));
  });

  it('marks totals below 15/30 as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, literature: 4, english: 4 } } };

    const result = evaluateDhvThptExamAdmission(profile, d01Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'dhv-admission-score-2026' }));
  });

  it('marks totals at or above 15/30 as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };

    const result = evaluateDhvThptExamAdmission(profile, d01Context);

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toBeUndefined();
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };

    expect(evaluateSchool(profile, 'dhv', { context: d01Context }).status).toBe('eligible');
    expect(evaluateSchools(profile, ['dhv'], { dhv: d01Context })[0].status).toBe('eligible');
  });
});
