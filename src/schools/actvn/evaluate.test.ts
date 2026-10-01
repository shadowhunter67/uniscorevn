import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateActvnThptExamAdmission } from './evaluate';
import { ACTVN_FIELD_THRESHOLDS_2026 } from './thresholds';

const baseProfile: ApplicantProfile = {
  thpt: { scores: { math: 8, physics: 8, chemistry: 8, english: 8 } },
  priority: { region: 'KV3' },
};

describe('ACTVN THPT-exam admission evaluation', () => {
  it('is ineligible below the official cutoff (24/30 vs 25.8 for An toan thong tin phia Bac)', () => {
    const result = evaluateActvnThptExamAdmission(baseProfile, {
      fieldCode: '7480202KA',
      subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] },
    });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(24);
  });

  it('is eligible when the raw total meets the cutoff (Dien tu - Vien thong 23.96)', () => {
    const result = evaluateActvnThptExamAdmission(
      { thpt: { scores: { math: 8, physics: 8, english: 8 } }, priority: { region: 'KV3' } },
      { fieldCode: '7520207KA', subjectContext: { combinationId: 'A01', subjects: ['math', 'physics', 'english'] } }
    );

    expect(result.score?.value).toBe(24);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('applies priority reduction above 22.5/30', () => {
    const result = evaluateActvnThptExamAdmission(
      { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } }, priority: { region: 'KV1', category: 'UT2' } },
      { fieldCode: '7480201KA', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } }
    );

    // raw = 24, standard priority = 1.75, reduced = ((30-24)/7.5)*1.75 = 1.4 -> 25.4
    expect(result.score?.value).toBe(25.4);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('rejects a combination not official for the code (C01 is not allowed for Dien tu - Vien thong)', () => {
    const result = evaluateActvnThptExamAdmission(
      { thpt: { scores: { literature: 8, math: 8, physics: 8 } } },
      { fieldCode: '7520207KA', subjectContext: { combinationId: 'C01', subjects: ['literature', 'math', 'physics'] } }
    );

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements?.map((item) => item.code)).toContain('actvn-subject-combination');
  });

  it('returns partial when no code is selected', () => {
    const result = evaluateActvnThptExamAdmission(baseProfile, {});

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements?.map((item) => item.code)).toContain('actvn-field');
  });

  it('models 4 codes with cutoffs between 23.96 and 25.8', () => {
    expect(ACTVN_FIELD_THRESHOLDS_2026).toHaveLength(4);
    expect(Math.min(...ACTVN_FIELD_THRESHOLDS_2026.map((entry) => entry.threshold30))).toBe(23.96);
    expect(Math.max(...ACTVN_FIELD_THRESHOLDS_2026.map((entry) => entry.threshold30))).toBe(25.8);
  });
});
