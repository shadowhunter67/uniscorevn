import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateBvuTranscriptAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('BVU transcript baseline eligibility 2026', () => {
  it('marks profiles below the common 18/30 baseline as ineligible', () => {
    const profile: ApplicantProfile = { transcript: { grade12: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateBvuTranscriptAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'bvu-admission-2026' }));
  });

  it('keeps profiles between the baseline and the highest published group floor unresolved', () => {
    const profile: ApplicantProfile = { transcript: { grade12: { math: 7, physics: 7, chemistry: 7 } } };

    const result = evaluateBvuTranscriptAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.eligibility?.reasons.join(' ')).toContain('18');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { transcript: { grade12: { math: 7, physics: 7, chemistry: 7 } } };

    const result = evaluateBvuTranscriptAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'bvu-subject-combination' }));
  });

  it('reports missing grade-12 transcript subject scores', () => {
    const profile: ApplicantProfile = { transcript: { grade12: { math: 7, physics: 7 } } };

    const result = evaluateBvuTranscriptAdmission(profile, a00Context);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'bvu-transcript-chemistry' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { transcript: { grade12: { math: 4, physics: 4, chemistry: 4 } } };

    expect(evaluateSchool(profile, 'bvu', { context: a00Context }).status).toBe('ineligible');
    expect(evaluateSchools(profile, ['bvu'], { bvu: a00Context })[0].status).toBe('ineligible');
  });
});
