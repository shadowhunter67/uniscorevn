import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateVnuisThptExamAdmission } from './evaluate';

const baseProfile: ApplicantProfile = {
  thpt: { scores: { math: 6.5, literature: 6.5, english: 6.5 } },
  priority: { region: 'KV3' },
};

describe('VNU-IS THPT-exam admission evaluation', () => {
  it('passes a published cutoff with raw scores (19.5/30 for QHQ01)', () => {
    const result = evaluateVnuisThptExamAdmission(baseProfile, {
      fieldCode: 'QHQ01',
      subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] },
    });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(19.5);
  });

  it('is eligible when the raw total meets the threshold', () => {
    const result = evaluateVnuisThptExamAdmission(
      { thpt: { scores: { math: 7, literature: 7, english: 7 } }, priority: { region: 'KV3' } },
      { fieldCode: 'QHQ01', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } }
    );

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(21);
  });

  it('applies priority reduction above 22.5/30', () => {
    const result = evaluateVnuisThptExamAdmission(
      { thpt: { scores: { math: 8, literature: 8, english: 8 } }, priority: { region: 'KV1', category: 'UT2' } },
      { fieldCode: 'QHQ01', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } }
    );

    // raw = 24, standard priority = 0.75 + 1 = 1.75, reduced = ((30-24)/7.5)*1.75 = 1.4 -> 25.4
    expect(result.score?.value).toBe(25.4);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('rejects QHQ04 via D01 when Math is below the 6.0/10 floor', () => {
    const result = evaluateVnuisThptExamAdmission(
      { thpt: { scores: { math: 5, literature: 9, english: 9 } }, priority: { region: 'KV3' } },
      { fieldCode: 'QHQ04', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } }
    );

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score).toBeUndefined();
  });

  it('allows QHQ04 via D01 when Math meets the 6.0/10 floor', () => {
    const result = evaluateVnuisThptExamAdmission(
      { thpt: { scores: { math: 6, literature: 7, english: 7 } }, priority: { region: 'KV3' } },
      { fieldCode: 'QHQ04', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } }
    );

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(20);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('does not apply the D01 Math floor to a non-D01 combination', () => {
    const result = evaluateVnuisThptExamAdmission(
      { thpt: { scores: { math: 5, physics: 8, chemistry: 8 } }, priority: { region: 'KV3' } },
      { fieldCode: 'QHQ04', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } }
    );

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(21);
  });

  it('rejects an unofficial combination for the selected field', () => {
    const result = evaluateVnuisThptExamAdmission(baseProfile, {
      fieldCode: 'QHQ09',
      subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] },
    });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements?.map((item) => item.code)).toContain('vnuis-subject-combination');
  });

  it('returns partial when no field is selected', () => {
    const result = evaluateVnuisThptExamAdmission(baseProfile, {});

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements?.map((item) => item.code)).toContain('vnuis-field');
  });
});
