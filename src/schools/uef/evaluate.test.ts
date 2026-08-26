import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateUefThptExamAdmission, evaluateUefTranscriptAdmission, evaluateUefThptExamStandardAdmission } from './evaluate';

const A01_SUBJECTS = ['math', 'physics', 'english'] as const;

function profileWithThpt(scores: Partial<Record<(typeof A01_SUBJECTS)[number], number>>): ApplicantProfile {
  return { thpt: { scores } };
}

const EMPTY_PROFILE: ApplicantProfile = {};

describe('evaluateUefThptExamAdmission', () => {
  it('nhóm standard: 15 pass, 14.99 fail', () => {
    expect(
      evaluateUefThptExamAdmission(profileWithThpt({ math: 5, physics: 5, english: 5 }), {
        subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
        thresholdGroup: 'standard',
      }).eligibility?.status
    ).toBe('eligible');
    expect(
      evaluateUefThptExamAdmission(profileWithThpt({ math: 5, physics: 5, english: 4.99 }), {
        subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
        thresholdGroup: 'standard',
      }).eligibility?.status
    ).toBe('ineligible');
  });

  it('nhóm law: ngưỡng 20, tổng 15 -> ineligible', () => {
    const evaluation = evaluateUefThptExamAdmission(profileWithThpt({ math: 5, physics: 5, english: 5 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
      thresholdGroup: 'law',
    });
    expect(evaluation.eligibility?.status).toBe('ineligible');
  });

  it('confidence luôn partial, không có score', () => {
    const evaluation = evaluateUefThptExamAdmission(profileWithThpt({ math: 9, physics: 9, english: 9 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
    });
    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.score).toBeUndefined();
  });
});

describe('evaluateUefTranscriptAdmission', () => {
  it('nhóm standard: chưa nhập điểm -> unknown', () => {
    const evaluation = evaluateUefTranscriptAdmission(EMPTY_PROFILE, { thresholdGroup: 'standard' });
    expect(evaluation.eligibility?.status).toBe('unknown');
    expect(evaluation.missingRequirements?.some((r) => r.code === 'uef-transcript-total-score')).toBe(true);
  });

  it('nhóm standard: 18 pass, 17.99 fail', () => {
    expect(evaluateUefTranscriptAdmission(EMPTY_PROFILE, { transcriptTotal30: 18, thresholdGroup: 'standard' }).eligibility?.status).toBe('eligible');
    expect(evaluateUefTranscriptAdmission(EMPTY_PROFILE, { transcriptTotal30: 17.99, thresholdGroup: 'standard' }).eligibility?.status).toBe('ineligible');
  });

  it('nhóm law: chưa cung cấp rank -> unknown', () => {
    const evaluation = evaluateUefTranscriptAdmission(EMPTY_PROFILE, { thresholdGroup: 'law' });
    expect(evaluation.eligibility?.status).toBe('unknown');
    expect(evaluation.missingRequirements?.some((r) => r.code === 'uef-academic-rank-12')).toBe(true);
  });

  it('nhóm law: rank tốt-giỏi + điểm xét tốt nghiệp 8.5 -> eligible', () => {
    const evaluation = evaluateUefTranscriptAdmission(EMPTY_PROFILE, { thresholdGroup: 'law', academicRank12: 'tot-gioi', graduationScore10: 8.5 });
    expect(evaluation.eligibility?.status).toBe('eligible');
  });

  it('nhóm law: rank khá (dưới yêu cầu) dù điểm đủ -> ineligible', () => {
    const evaluation = evaluateUefTranscriptAdmission(EMPTY_PROFILE, { thresholdGroup: 'law', academicRank12: 'kha', graduationScore10: 9 });
    expect(evaluation.eligibility?.status).toBe('ineligible');
  });

  it('nhóm law: rank đủ + tổng 3 môn TN THPT 18 -> eligible', () => {
    const evaluation = evaluateUefTranscriptAdmission(EMPTY_PROFILE, { thresholdGroup: 'law', academicRank12: 'tot-gioi', thptExamTotal30: 18 });
    expect(evaluation.eligibility?.status).toBe('eligible');
  });

  it('methodId khớp phương thức học bạ', () => {
    expect(evaluateUefTranscriptAdmission(EMPTY_PROFILE, { transcriptTotal30: 18, thresholdGroup: 'standard' }).methodId).toBe('uef-transcript-2026');
  });
});

const a01Context = { subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS } };

describe('evaluateUefThptExamStandardAdmission (exact calculator, nhóm ngành ngoài Luật)', () => {
  it('requires a selected subject combination', () => {
    const evaluation = evaluateUefThptExamStandardAdmission(profileWithThpt({ math: 5, physics: 5, english: 5 }));

    expect(evaluation.eligibility?.status).toBe('unknown');
    expect(evaluation.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'uef-standard-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const evaluation = evaluateUefThptExamStandardAdmission(profileWithThpt({ math: 5, physics: 5 }), a01Context);

    expect(evaluation.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'uef-standard-thpt-english' }));
  });

  it('marks totals below 15/30 as ineligible, still returns exact score', () => {
    const evaluation = evaluateUefThptExamStandardAdmission(profileWithThpt({ math: 4, physics: 4, english: 4 }), a01Context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe('ineligible');
    expect(evaluation.score?.value).toBe(12);
  });

  it('marks totals at or above 15/30 as eligible with exact final score', () => {
    const evaluation = evaluateUefThptExamStandardAdmission(profileWithThpt({ math: 5, physics: 5, english: 5 }), a01Context);

    expect(evaluation.eligibility?.status).toBe('eligible');
    expect(evaluation.score).toEqual({ value: 15, scale: 30 });
  });

  it('adds region/category priority to the final score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, english: 5 } }, priority: { region: 'KV1', category: 'UT1' } };
    const evaluation = evaluateUefThptExamStandardAdmission(profile, a01Context);

    expect(evaluation.score).toEqual({ value: 17.75, scale: 30 });
  });

  it('caps the final score at 30', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 10, physics: 10, english: 9.9 } }, priority: { region: 'KV1', category: 'UT1' } };
    const evaluation = evaluateUefThptExamStandardAdmission(profile, a01Context);

    expect(evaluation.score!.value).toBeLessThanOrEqual(30);
  });
});
