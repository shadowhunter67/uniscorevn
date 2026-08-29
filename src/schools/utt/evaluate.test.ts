import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateUttAdmission, evaluateUttThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('UTT THPT threshold eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 5, chemistry: 5 } } };

    const result = evaluateUttAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'utt-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 5 } } };

    const result = evaluateUttAdmission(profile, a00Context);

    expect(result.missingInputs).toHaveLength(1);
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'utt-thpt-chemistry' }));
  });

  it('marks totals below the lowest published threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateUttAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'utt-threshold-2026' }));
  });

  it('keeps totals within the published range unresolved (varies by program)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluateUttAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('unknown');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    // Adapter used for /compare is still the threshold-only branch (confidence 'partial', no
    // score); the school is now 'verified-calculator' at the capability level (exact branch
    // exists), so classifyEvaluation downgrades this route to 'partial' — same as dainam/utm.
    expect(evaluateSchool(profile, 'utt', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['utt'], { utt: a00Context })[0].status).toBe('partial');
  });
});

describe('UTT THPT exact admission 2026 (utt-thpt-exam-exact-2026)', () => {
  it('requires a selected program code', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 5, chemistry: 5 } } };

    const result = evaluateUttThptExamExactAdmission(profile);

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'utt-program-code' }));
  });

  it('rejects an unknown program code', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 5, chemistry: 5 } } };

    const result = evaluateUttThptExamExactAdmission(profile, { programCode: 'NOT-A-CODE', subjectContext: a00Context.subjectContext });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'utt-program-code' }));
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 5, chemistry: 5 } } };

    const result = evaluateUttThptExamExactAdmission(profile, { programCode: 'GTADCKT2' });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'utt-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 5 } } };

    const result = evaluateUttThptExamExactAdmission(profile, { programCode: 'GTADCKT2', subjectContext: a00Context.subjectContext });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'utt-thpt-chemistry' }));
  });

  it('total below the 15/30 program threshold -> ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateUttThptExamExactAdmission(profile, { programCode: 'GTADCKT2', subjectContext: a00Context.subjectContext });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score).toEqual({ value: 12, scale: 30 });
  });

  it('total at the 20/30 threshold for a higher-tier program -> eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 6 } } };

    const result = evaluateUttThptExamExactAdmission(profile, { programCode: 'GTADCTT2', subjectContext: a00Context.subjectContext });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toEqual({ value: 20, scale: 30 });
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'utt-threshold-2026' }));
  });

  it('adds standard national priority points when declared', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } }, priority: { region: 'KV1', category: 'UT2' } };

    const result = evaluateUttThptExamExactAdmission(profile, { programCode: 'GTADCKT2', subjectContext: a00Context.subjectContext });

    expect(result.score).toEqual({ value: 19.75, scale: 30 });
  });
});
