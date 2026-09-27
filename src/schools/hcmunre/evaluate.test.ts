import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateHcmunreThptExamAdmission } from './evaluate';

const baseProfile: ApplicantProfile = {
  thpt: { scores: { math: 7, literature: 7, english: 7 } },
  priority: { region: 'KV3' },
};

describe('HCMUNRE Phuong thuc 1 (thi TN THPT) admission evaluation', () => {
  it('passes a published cutoff with raw scores (21/30 == 21/30 for Logictics)', () => {
    const result = evaluateHcmunreThptExamAdmission(baseProfile, {
      fieldCode: '7510605',
      subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] },
    });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(21);
  });

  it('rejects when below the field cutoff', () => {
    const result = evaluateHcmunreThptExamAdmission(
      { thpt: { scores: { math: 5, literature: 5, english: 5 } }, priority: { region: 'KV3' } },
      {
        fieldCode: '7340101',
        subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] },
      }
    );

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(15);
  });

  it('applies priority reduction above 22.5/30', () => {
    const result = evaluateHcmunreThptExamAdmission(
      { thpt: { scores: { math: 8, literature: 8, english: 8 } }, priority: { region: 'KV1', category: 'UT2' } },
      {
        fieldCode: '7340101',
        subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] },
      }
    );

    // raw = 24, standard priority = 0.75 + 1 = 1.75, reduced = ((30-24)/7.5)*1.75 = 1.4 -> final 25.4
    expect(result.score?.value).toBe(25.4);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('rejects an unofficial combination for the selected field (X03 not modeled for QTKD)', () => {
    const result = evaluateHcmunreThptExamAdmission(baseProfile, {
      fieldCode: '7340101',
      subjectContext: { combinationId: 'X03', subjects: ['math', 'literature', 'physics'] },
    });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements?.map((item) => item.code)).toContain('hcmunre-subject-combination');
  });

  it('returns partial when no field is selected', () => {
    const result = evaluateHcmunreThptExamAdmission(baseProfile, {});

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements?.map((item) => item.code)).toContain('hcmunre-field');
  });
});
