import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateEautTranscriptAdmission } from './evaluate';

const combo = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

const passingTranscript = { math: 6, physics: 6, chemistry: 6 };
const passingThpt = { math: 5, physics: 5, chemistry: 5 };

function transcriptProfile(perSubject: Partial<Record<'math' | 'physics' | 'chemistry', number>>): ApplicantProfile['transcript'] {
  const grades: NonNullable<ApplicantProfile['transcript']> = { grade10: {}, grade11: {}, grade12: {} };
  for (const [subject, score] of Object.entries(perSubject)) {
    (grades.grade10 as Record<string, number>)[subject] = score!;
    (grades.grade11 as Record<string, number>)[subject] = score!;
    (grades.grade12 as Record<string, number>)[subject] = score!;
  }
  return grades;
}

describe('EAUT transcript eligibility 2026 (method 1)', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { transcript: transcriptProfile(passingTranscript), thpt: { scores: passingThpt } };

    const result = evaluateEautTranscriptAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'eaut-subject-combination' }));
  });

  it('reports missing transcript years and missing THPT scores separately', () => {
    const profile: ApplicantProfile = { transcript: { grade12: passingTranscript }, thpt: { scores: { math: 5, physics: 5 } } };

    const result = evaluateEautTranscriptAdmission(profile, combo);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'eaut-transcript-math' }));
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'eaut-thpt-chemistry' }));
    expect(result.eligibility?.status).toBe('unknown');
  });

  it('marks ineligible when transcript average is below 18/30 even if THPT floor passes', () => {
    const profile: ApplicantProfile = { transcript: transcriptProfile({ math: 5, physics: 5, chemistry: 5 }), thpt: { scores: passingThpt } };

    const result = evaluateEautTranscriptAdmission(profile, combo);

    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('marks ineligible when THPT floor (15/30) fails even if transcript average passes', () => {
    const profile: ApplicantProfile = { transcript: transcriptProfile(passingTranscript), thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateEautTranscriptAdmission(profile, combo);

    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('marks eligible when both transcript average >= 18/30 and THPT total >= 15/30', () => {
    const profile: ApplicantProfile = { transcript: transcriptProfile(passingTranscript), thpt: { scores: passingThpt } };

    const result = evaluateEautTranscriptAdmission(profile, combo);

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'eaut-admission-methods-2026' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { transcript: transcriptProfile(passingTranscript), thpt: { scores: passingThpt } };

    expect(evaluateSchool(profile, 'eaut', { context: combo }).status).toBe('eligible');
    expect(evaluateSchools(profile, ['eaut'], { eaut: combo })[0].status).toBe('eligible');
  });
});
