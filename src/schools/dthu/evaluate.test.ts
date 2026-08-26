import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateDthuThptExamAdmission } from './evaluate';

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

    expect(evaluateSchool(profile, 'dthu', { context: standard }).status).toBe('eligible');
    expect(evaluateSchools(profile, ['dthu'], { dthu: standard })[0].status).toBe('eligible');
  });
});
