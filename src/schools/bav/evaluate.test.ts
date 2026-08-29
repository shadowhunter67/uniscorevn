import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateBavThptExamAdmission, evaluateBavThptExamExactAdmission } from './evaluate';

const a01Context = { subjectContext: { combinationId: 'A01', subjects: ['math', 'physics', 'english'] as const } };

describe('BAV THPT baseline eligibility 2026', () => {
  it('marks profiles below the lowest published band as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, english: 4 } } };

    const result = evaluateBavThptExamAdmission(profile, a01Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'bav-threshold-2026' }));
  });

  it('keeps profiles between the two published bands unresolved', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 6, english: 6.5 } } };

    const result = evaluateBavThptExamAdmission(profile, a01Context);

    expect(result.eligibility?.status).toBe('unknown');
  });

  it('marks profiles at/above the highest published band as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 9, physics: 8, english: 8 } } };

    const result = evaluateBavThptExamAdmission(profile, a01Context);

    expect(result.eligibility?.status).toBe('eligible');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, english: 7 } } };

    const result = evaluateBavThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'bav-subject-combination' }));
  });

  it('rejects a subject combination without math (Luật field, out of scope)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 7, history: 7, english: 7 } } };

    const result = evaluateBavThptExamAdmission(profile, { subjectContext: { combinationId: 'D14', subjects: ['literature', 'history', 'english'] } });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'bav-subject-combination-requires-math' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, english: 4 } } };

    // Adapter used for /compare is still the threshold-only branch (confidence 'partial', no
    // score); the school is 'verified-calculator' at the capability level (exact branch exists),
    // so classifyEvaluation downgrades this route to 'partial' — same as haui/utm/utt.
    expect(evaluateSchool(profile, 'bav', { context: a01Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['bav'], { bav: a01Context })[0].status).toBe('partial');
  });
});

describe('BAV THPT exact per-program calculator 2026', () => {
  const exactContext = { programCode: 'BANK01', subjectContext: { combinationId: 'A01', subjects: ['math', 'physics', 'english'] as const } };

  it('marks a profile at or above the program threshold as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 9, physics: 8, english: 8.5 } } };

    const result = evaluateBavThptExamExactAdmission(profile, exactContext);

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(25.88);
  });

  it('marks a profile below the program threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, english: 5 } } };

    const result = evaluateBavThptExamExactAdmission(profile, exactContext);

    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('applies the lower joint-degree threshold for a joint-degree program code', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6, english: 6.5 } } };

    const result = evaluateBavThptExamExactAdmission(profile, {
      programCode: 'BANK04',
      subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] },
    });

    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(18.38);
  });

  it('requires a selected program code', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, english: 7 } } };

    const result = evaluateBavThptExamExactAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'bav-program-code' }));
  });

  it('rejects a Luật program code (not in the published-threshold table)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 7, history: 7, english: 7 } } };

    const result = evaluateBavThptExamExactAdmission(profile, {
      programCode: 'LAW01',
      subjectContext: { combinationId: 'D14', subjects: ['literature', 'history', 'english'] },
    });

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'bav-program-code' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7 } } };

    const result = evaluateBavThptExamExactAdmission(profile, exactContext);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'bav-thpt-english' }));
  });

  it('rejects a subject combination not published for the chosen program code', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, history: 8, english: 8 } } };

    const result = evaluateBavThptExamExactAdmission(profile, {
      programCode: 'BANK01',
      subjectContext: { combinationId: 'C00', subjects: ['literature', 'history', 'geography'] },
    });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'bav-subject-combination-not-in-list' }));
  });
});
