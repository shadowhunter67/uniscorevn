import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateVnulawThptExamAdmission } from './evaluate';

const d01Context = { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };

describe('VNU-Luat THPT baseline eligibility 2026', () => {
  it('marks profiles below the 18/30 total threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };

    const result = evaluateVnulawThptExamAdmission(profile, d01Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.eligibility?.reasons.join(' ')).toContain('18/30');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'vnulaw-admission-notice-2026' }));
  });

  it('marks profiles above the total threshold but below the Toan/Ngu van 6/10 floor as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 9 } } };

    const result = evaluateVnulawThptExamAdmission(profile, d01Context);

    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.eligibility?.reasons.join(' ')).toContain('6/10');
  });

  it('marks profiles meeting both conditions as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, literature: 6, english: 6 } } };

    const result = evaluateVnulawThptExamAdmission(profile, d01Context);

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toBeUndefined();
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 7, english: 6.5 } } };

    const result = evaluateVnulawThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vnulaw-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 7 } } };

    const result = evaluateVnulawThptExamAdmission(profile, d01Context);

    expect(result.missingInputs).toHaveLength(1);
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'vnulaw-thpt-english' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };

    expect(evaluateSchool(profile, 'vnulaw', { context: d01Context }).status).toBe('ineligible');
    expect(evaluateSchools(profile, ['vnulaw'], { vnulaw: d01Context })[0].status).toBe('ineligible');
  });
});
