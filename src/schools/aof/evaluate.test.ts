import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateAofThptExamAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('AOF THPT baseline eligibility 2026', () => {
  it('marks profiles below the lowest published band as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateAofThptExamAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'aof-threshold-2026' }));
  });

  it('keeps profiles between the lowest and highest published bands unresolved', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluateAofThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('unknown');
  });

  it('keeps profiles above the highest published band unresolved too (band is a range, resolved only by group)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateAofThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('unknown');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };

    const result = evaluateAofThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'aof-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6 } } };

    const result = evaluateAofThptExamAdmission(profile, a00Context);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'aof-thpt-chemistry' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    expect(evaluateSchool(profile, 'aof', { context: a00Context }).status).toBe('ineligible');
    expect(evaluateSchools(profile, ['aof'], { aof: a00Context })[0].status).toBe('ineligible');
  });
});
