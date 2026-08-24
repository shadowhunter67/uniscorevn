import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateVnuulisAdmission } from './evaluate';

const d01Context = { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };

describe('VNU-ULIS 2026 threshold eligibility evaluator', () => {
  it('converts the language-subject-coefficient-2 exam score from /40 to /30', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };
    const result = evaluateVnuulisAdmission(profile, { methodId: 'vnuulis-thpt-exam-2026', ...d01Context });

    // total40 = 8 + 8 + 8*2 = 32; total30 = 32 * 0.75 = 24
    expect(result.explanation[0]?.output).toBe(24);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('marks a regular-track score below 19/30 as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };
    const result = evaluateVnuulisAdmission(profile, { methodId: 'vnuulis-thpt-exam-2026', ...d01Context });

    // total40 = 5+5+10=20; total30=15
    expect(result.explanation[0]?.output).toBe(15);
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('applies the lower international-partnership exam threshold', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };
    const result = evaluateVnuulisAdmission(profile, {
      methodId: 'vnuulis-thpt-exam-2026',
      programTrack: 'international-partnership',
      ...d01Context,
    });

    expect(result.eligibility?.status).toBe('eligible');
  });

  it('rejects non-English combinations as unsupported', () => {
    const result = evaluateVnuulisAdmission(
      { thpt: { scores: { math: 8, literature: 8, history: 8 } } },
      { methodId: 'vnuulis-thpt-exam-2026', subjectContext: { combinationId: 'C00', subjects: ['literature', 'history', 'geography'] as const } }
    );

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'vnuulis-non-english-language-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const result = evaluateVnuulisAdmission({ thpt: { scores: { math: 8, literature: 8 } } }, { methodId: 'vnuulis-thpt-exam-2026', ...d01Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'vnuulis-thpt-english' }));
  });

  it('checks the transcript route for international-partnership programs', () => {
    const profile: ApplicantProfile = {
      transcript: {
        grade10: { math: 7, literature: 7, english: 7 },
        grade11: { math: 7, literature: 7, english: 7 },
        grade12: { math: 7, literature: 7, english: 7 },
      },
    };
    const result = evaluateVnuulisAdmission(profile, { methodId: 'vnuulis-transcript-2026', programTrack: 'international-partnership', ...d01Context });

    expect(result.explanation[0]?.output).toBe(21);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('rejects the transcript route for the regular track', () => {
    const result = evaluateVnuulisAdmission({}, { methodId: 'vnuulis-transcript-2026', programTrack: 'regular', ...d01Context });

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'vnuulis-program-track' }));
  });

  it('marks the HSA route as unsupported', () => {
    const result = evaluateVnuulisAdmission({}, { methodId: 'vnuulis-hsa-2026' });

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'vnuulis-hsa-route-not-modeled' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };
    const context = { methodId: 'vnuulis-thpt-exam-2026' as const, ...d01Context };

    expect(evaluateSchool(profile, 'vnuulis', { context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['vnuulis'], { vnuulis: context })[0].status).toBe('partial');
  });
});
