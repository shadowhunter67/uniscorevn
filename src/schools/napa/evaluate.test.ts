import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateNapaThptExamExactAdmission } from './evaluate';

const baseProfile: ApplicantProfile = {
  thpt: { scores: { math: 8, literature: 8, english: 8 } },
  priority: { region: 'KV3' },
};

describe('NAPA exact D01 admission evaluation', () => {
  it('passes a published D01 cutoff with raw scores', () => {
    const result = evaluateNapaThptExamExactAdmission(baseProfile, {
      programCode: '73444HN',
      subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] },
    });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility.status).toBe('ineligible');
    expect(result.score?.value).toBe(24);
  });

  it('applies priority reduction above 22.5/30', () => {
    const result = evaluateNapaThptExamExactAdmission(
      { ...baseProfile, priority: { region: 'KV1', category: 'UT2' } },
      {
        programCode: '73444HN',
        subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] },
      }
    );

    expect(result.score?.value).toBe(25.4);
    expect(result.eligibility.status).toBe('eligible');
  });

  it('rejects law programs when the D01 Math/Literature floor is not met', () => {
    const result = evaluateNapaThptExamExactAdmission(
      { thpt: { scores: { math: 5.5, literature: 9, english: 10 } }, priority: { region: 'KV3' } },
      {
        programCode: '73811HCM',
        subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] },
      }
    );

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility.status).toBe('ineligible');
  });

  it('returns partial for non-D01 combinations', () => {
    const result = evaluateNapaThptExamExactAdmission(baseProfile, {
      programCode: '73444HN',
      subjectContext: { combinationId: 'C00', subjects: ['literature', 'history', 'geography'] },
    });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements.map((item) => item.code)).toContain('napa-combination-not-modeled');
  });
});
