import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateMduThptExamAdmission, evaluateMduThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('MDU/MIT THPT baseline eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };
    const result = evaluateMduThptExamAdmission(profile);
    expect(result.eligibility?.status).toBe('unknown');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };
    expect(evaluateSchool(profile, 'mdu', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['mdu'], { mdu: a00Context })[0].status).toBe('partial');
  });
});

describe('evaluateMduThptExamExactAdmission', () => {
  const p = (scores: Record<string, number>, priority?: { region?: string; category?: string }): ApplicantProfile => ({ thpt: { scores }, ...(priority ? { priority } : {}) });

  it('requires a supported program', () => {
    const result = evaluateMduThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }), a00Context);
    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'mdu-program-code' }));
  });

  it('standard modeled program: raw 15 is eligible', () => {
    const result = evaluateMduThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }), { programCode: '7480201', ...a00Context });
    expect(result.confidence).toBe('exact-verified');
    expect(result.methodId).toBe('mdu-thpt-exam-exact-2026');
    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toEqual({ value: 15, scale: 30 });
  });

  it('standard modeled program: raw 14 is ineligible even if priority is present', () => {
    const result = evaluateMduThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 4 }, { region: 'KV1' }), { programCode: '7480201', ...a00Context });
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score).toEqual({ value: 14.75, scale: 30 });
  });

  it('rejects a combination that is not published for the selected program', () => {
    const result = evaluateMduThptExamExactAdmission(p({ math: 5, history: 5, geography: 5 }), {
      programCode: '7480201',
      subjectContext: { combinationId: 'A07', subjects: ['math', 'history', 'geography'] as const },
    });
    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'mdu-combination-not-modeled' }));
  });

  it('keeps Pharmacy and Economic Law outside exact scope', () => {
    const result = evaluateMduThptExamExactAdmission(p({ math: 9, physics: 9, chemistry: 9 }), { programCode: '7720201', ...a00Context });
    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'mdu-program-out-of-exact-scope' }));
  });
});
