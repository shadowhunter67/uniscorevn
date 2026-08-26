import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateTbuThptExamAdmission } from './evaluate';

const combo = { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };
const law = { ...combo, group: 'law' as const };
const standard = { ...combo, group: 'standard' as const };

describe('TBU THPT-exam eligibility 2026 (ngưỡng nhận hồ sơ)', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6, english: 6 } } };

    const result = evaluateTbuThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'tbu-subject-combination' }));
  });

  it('applies the 15/30 standard floor by default', () => {
    const below: ApplicantProfile = { thpt: { scores: { math: 4, literature: 5, english: 5.5 } } };
    const at: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };

    expect(evaluateTbuThptExamAdmission(below, standard).eligibility?.status).toBe('ineligible');
    expect(evaluateTbuThptExamAdmission(at, standard).eligibility?.status).toBe('eligible');
  });

  it('applies the higher 18/30 law floor', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };

    const result = evaluateTbuThptExamAdmission(profile, law);

    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'tbu-quality-threshold-2026' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };

    expect(evaluateSchool(profile, 'tbu', { context: standard }).status).toBe('eligible');
    expect(evaluateSchools(profile, ['tbu'], { tbu: standard })[0].status).toBe('eligible');
  });
});
