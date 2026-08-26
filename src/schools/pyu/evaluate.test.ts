import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluatePyuThptExamAdmission } from './evaluate';

const d01Context = { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };

describe('PYU THPT threshold eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };

    const result = evaluatePyuThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'pyu-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5 } } };

    const result = evaluatePyuThptExamAdmission(profile, d01Context);

    expect(result.missingInputs).toHaveLength(1);
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'pyu-thpt-english' }));
  });

  it('marks totals below the common-tier 15/30 threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, literature: 4, english: 4 } } };

    const result = evaluatePyuThptExamAdmission(profile, { ...d01Context, group: 'tierChung' });

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'pyu-admission-score-2026' }));
  });

  it('marks totals at the common-tier 15/30 threshold as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };

    const result = evaluatePyuThptExamAdmission(profile, { ...d01Context, group: 'tierChung' });

    expect(result.eligibility?.status).toBe('eligible');
  });

  it('applies the higher sư phạm-tier 20/30 threshold when group is tierSuPham', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };

    const result = evaluatePyuThptExamAdmission(profile, { ...d01Context, group: 'tierSuPham' });

    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };

    expect(evaluateSchool(profile, 'pyu', { context: { ...d01Context, group: 'tierChung' } }).status).toBe('eligible');
    expect(evaluateSchools(profile, ['pyu'], { pyu: { ...d01Context, group: 'tierChung' } })[0].status).toBe('eligible');
  });
});
