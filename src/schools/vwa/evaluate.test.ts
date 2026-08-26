import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateVwaThptExamAdmission, evaluateVwaTranscriptAdmission } from './evaluate';

const combo = { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };
const multimedia = { ...combo, group: 'multimedia' as const };
const standard = { ...combo, group: 'standard' as const };

function transcriptProfile(perSubject: Record<'math' | 'literature' | 'english', number>): ApplicantProfile['transcript'] {
  const grades: NonNullable<ApplicantProfile['transcript']> = { grade10: {}, grade11: {}, grade12: {} };
  for (const [subject, score] of Object.entries(perSubject)) {
    (grades.grade10 as Record<string, number>)[subject] = score;
    (grades.grade11 as Record<string, number>)[subject] = score;
    (grades.grade12 as Record<string, number>)[subject] = score;
  }
  return grades;
}

describe('VWA THPT-exam eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6, english: 6 } } };

    const result = evaluateVwaThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vwa-subject-combination' }));
  });

  it('applies the 16/30 standard-group floor by default', () => {
    const belowFloor: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5.5 } } };
    const atFloor: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 6 } } };

    expect(evaluateVwaThptExamAdmission(belowFloor, standard).eligibility?.status).toBe('ineligible');
    expect(evaluateVwaThptExamAdmission(atFloor, standard).eligibility?.status).toBe('eligible');
  });

  it('applies the higher 19/30 multimedia-group floor', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6, english: 6.5 } } };

    const result = evaluateVwaThptExamAdmission(profile, multimedia);

    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'vwa-quality-threshold-2026' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6, english: 6 } } };

    expect(evaluateSchool(profile, 'vwa', { context: standard }).status).toBe('eligible');
    expect(evaluateSchools(profile, ['vwa'], { vwa: standard })[0].status).toBe('eligible');
  });
});

describe('VWA transcript eligibility 2026', () => {
  it('applies the 19/30 standard-group transcript floor', () => {
    const below: ApplicantProfile = { transcript: transcriptProfile({ math: 6, literature: 6, english: 6 }) };
    const at: ApplicantProfile = { transcript: transcriptProfile({ math: 6, literature: 6, english: 7 }) };

    expect(evaluateVwaTranscriptAdmission(below, standard).eligibility?.status).toBe('ineligible');
    expect(evaluateVwaTranscriptAdmission(at, standard).eligibility?.status).toBe('eligible');
  });

  it('applies the higher 23/30 multimedia-group transcript floor', () => {
    const profile: ApplicantProfile = { transcript: transcriptProfile({ math: 7, literature: 7, english: 7 }) };

    expect(evaluateVwaTranscriptAdmission(profile, multimedia).eligibility?.status).toBe('ineligible');
  });
});
