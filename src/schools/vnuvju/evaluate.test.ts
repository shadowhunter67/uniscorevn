import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateVnuvjuThptExamAdmission } from './evaluate';
import { VNUVJU_FIELD_THRESHOLDS_2026 } from './thresholds';
import { convertVnuvjuEnglishCertificate } from './certificate';

const baseProfile: ApplicantProfile = {
  thpt: { scores: { math: 6, literature: 6, english: 6.5 } },
  priority: { region: 'KV3' },
};

describe('VJU THPT-exam admission evaluation', () => {
  it('is ineligible when below the program cutoff (18.5/30 for VJU2 at 20.75)', () => {
    const result = evaluateVnuvjuThptExamAdmission(baseProfile, {
      fieldCode: 'VJU2',
      subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] },
    });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(18.5);
  });

  it('is eligible when the raw total meets the cutoff', () => {
    const result = evaluateVnuvjuThptExamAdmission(
      { thpt: { scores: { math: 7.5, literature: 7, english: 7 } }, priority: { region: 'KV3' } },
      { fieldCode: 'VJU6', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } }
    );

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(21.5);
  });

  it('applies priority reduction above 22.5/30', () => {
    const result = evaluateVnuvjuThptExamAdmission(
      { thpt: { scores: { math: 8, literature: 8, english: 8 } }, priority: { region: 'KV1', category: 'UT2' } },
      { fieldCode: 'VJU1', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } }
    );

    // raw = 24, standard priority = 1.75, reduced = ((30-24)/7.5)*1.75 = 1.4 -> 25.4
    expect(result.score?.value).toBe(25.4);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('rejects a combination that is not official for the program', () => {
    const result = evaluateVnuvjuThptExamAdmission(baseProfile, {
      fieldCode: 'VJU7',
      subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] },
    });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements?.map((item) => item.code)).toContain('vnuvju-subject-combination');
  });

  it('returns partial when no program is selected', () => {
    const result = evaluateVnuvjuThptExamAdmission(baseProfile, {});

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements?.map((item) => item.code)).toContain('vnuvju-field');
  });

  it('models all 9 programs with cutoffs between 20 and 21.25', () => {
    expect(VNUVJU_FIELD_THRESHOLDS_2026).toHaveLength(9);
    expect(Math.min(...VNUVJU_FIELD_THRESHOLDS_2026.map((entry) => entry.threshold30))).toBe(20);
    expect(Math.max(...VNUVJU_FIELD_THRESHOLDS_2026.map((entry) => entry.threshold30))).toBe(21.25);
  });
});

describe('VJU English certificate conversion (Phu luc I)', () => {
  it('maps IELTS and TOEFL iBT to the official 10-point scale', () => {
    expect(convertVnuvjuEnglishCertificate({ ielts: 5.5 })).toBe(8);
    expect(convertVnuvjuEnglishCertificate({ ielts: 6 })).toBe(8.5);
    expect(convertVnuvjuEnglishCertificate({ ielts: 7 })).toBe(9.5);
    expect(convertVnuvjuEnglishCertificate({ ielts: 8 })).toBe(10);
    expect(convertVnuvjuEnglishCertificate({ ielts: 5 })).toBeUndefined();
    expect(convertVnuvjuEnglishCertificate({ toeflIbt: 72 })).toBe(8);
    expect(convertVnuvjuEnglishCertificate({ toeflIbt: 88 })).toBe(9);
    expect(convertVnuvjuEnglishCertificate({ toeflIbt: 102 })).toBe(10);
    expect(convertVnuvjuEnglishCertificate({ toeflIbt: 71 })).toBeUndefined();
  });

  it('uses the converted English score in a combination with English when it is higher', () => {
    const base: ApplicantProfile = { thpt: { scores: { math: 7, literature: 7, english: 5 } }, priority: { region: 'KV3' } };
    const context = { fieldCode: 'VJU6', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };
    const without = evaluateVnuvjuThptExamAdmission(base, context);
    const withCert = evaluateVnuvjuThptExamAdmission({ ...base, certificates: { ielts: 7 } }, context);

    expect(without.score?.value).toBe(19);
    expect(withCert.score?.value).toBe(23.5);
  });

  it('works when the English exam score is missing but a certificate exists', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, literature: 7 } }, certificates: { ielts: 6.5 } };
    const result = evaluateVnuvjuThptExamAdmission(profile, {
      fieldCode: 'VJU6',
      subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] },
    });

    expect(result.score?.value).toBe(23);
  });
});
