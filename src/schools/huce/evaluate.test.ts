import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateHuceAdmission, evaluateHuceThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('HUCE 2026 threshold eligibility', () => {
  it('requires a program/campus before applying thresholds', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };

    const result = evaluateHuceAdmission(profile, { methodId: 'huce-thpt-exam-2026', ...a00Context });

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'huce-program' }));
  });

  it('marks THPT profiles below a selected program threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };

    const result = evaluateHuceAdmission(profile, { methodId: 'huce-thpt-exam-2026', programId: 'hanoi-XDA23', ...a00Context });

    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.eligibility?.reasons.join(' ')).toContain('22/30');
  });

  it('marks THPT profiles meeting a selected program threshold as eligible threshold-only', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 7, chemistry: 7 } } };

    const result = evaluateHuceAdmission(profile, { methodId: 'huce-thpt-exam-2026', programId: 'hanoi-XDA23', ...a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toBeUndefined();
    expect(result.eligibility?.reasons.join(' ')).toContain('threshold eligibility');
  });

  it('evaluates transcript thresholds from grade 10/11/12 yearly averages', () => {
    const profile: ApplicantProfile = {
      transcript: {
        grade10: { math: 8, physics: 8, chemistry: 8 },
        grade11: { math: 8, physics: 8, chemistry: 8 },
        grade12: { math: 8, physics: 8, chemistry: 8 },
      },
    };

    const result = evaluateHuceAdmission(profile, { methodId: 'huce-transcript-2026', programId: 'hanoi-XDA23', ...a00Context });

    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.eligibility?.reasons.join(' ')).toContain('24.9/30');
  });

  it('keeps methods not open for a program unresolved', () => {
    const result = evaluateHuceAdmission({}, { methodId: 'huce-transcript-2026', programId: 'hanoi-XDA01', ...a00Context });

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'unsupported', code: 'huce-method-not-open-for-program' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };
    const context = { methodId: 'huce-thpt-exam-2026' as const, programId: 'hanoi-XDA23', ...a00Context };

    // HUCE now has an exact method → classifyEvaluation reclassifies this threshold-only result
    // to 'partial' (same precedent as VinhUni/HUB/HLU/CTU/TGU/.../OU/...).
    expect(evaluateSchool(profile, 'huce', { context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['huce'], { huce: context })[0].status).toBe('partial');
  });
});

describe('evaluateHuceThptExamExactAdmission', () => {
  it('raw total meets the program threshold -> eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };
    const evaluation = evaluateHuceThptExamExactAdmission(profile, { programId: 'hanoi-XDA23', ...a00Context });

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe('eligible');
    expect(evaluation.score?.value).toBe(24);
  });

  it('raw total below the program threshold -> ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };
    const evaluation = evaluateHuceThptExamExactAdmission(profile, { programId: 'hanoi-XDA23', ...a00Context });

    expect(evaluation.eligibility?.status).toBe('ineligible');
  });

  it('priority points affect only the reference score, not eligibility', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 7, physics: 7, chemistry: 7 } },
      priority: { region: 'KV1', category: 'UT1' },
    };
    const evaluation = evaluateHuceThptExamExactAdmission(profile, { programId: 'hanoi-XDA23', ...a00Context });

    expect(evaluation.eligibility?.status).toBe('ineligible');
    expect(evaluation.score?.value).toBe(23.75);
  });

  it('unknown program id -> partial (out of scope)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 9, physics: 9, chemistry: 9 } } };
    const evaluation = evaluateHuceThptExamExactAdmission(profile, { programId: 'does-not-exist', ...a00Context });

    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.missingRequirements).toContainEqual(expect.objectContaining({ code: 'huce-program-out-of-scope' }));
  });

  it('missing subject scores are reported', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7 } } };
    const evaluation = evaluateHuceThptExamExactAdmission(profile, { programId: 'hanoi-XDA23', ...a00Context });

    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'huce-thpt-exact-chemistry' }));
  });

  it('requires a subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };
    const evaluation = evaluateHuceThptExamExactAdmission(profile, { programId: 'hanoi-XDA23' });

    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'huce-subject-combination' }));
  });
});
