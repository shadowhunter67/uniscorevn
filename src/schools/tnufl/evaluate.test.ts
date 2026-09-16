import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateTnuflThptExamAdmission } from './evaluate';

const d01Context = { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const };
const ngonNguAnh = { fieldCode: '7220201' as const };
const spTiengAnh = { fieldCode: '7140231' as const };

describe('TNUFL exact THPT admission calculator 2026 (2/5 ngành liên quan Tiếng Anh)', () => {
  it('requires a selected field before computing the score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };

    const result = evaluateTnuflThptExamAdmission(profile, { subjectContext: d01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'tnufl-field' }));
  });

  it('rejects an unmodeled field code (Chinese/Korean-language program not modeled)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };

    const result = evaluateTnuflThptExamAdmission(profile, { fieldCode: '7220204', subjectContext: d01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'tnufl-field' }));
  });

  it('rejects a subject combination not in the accepted list (no English component)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };
    const a00Context = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const };

    const result = evaluateTnuflThptExamAdmission(profile, { ...ngonNguAnh, subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'tnufl-subject-combination' }));
  });

  it('marks ineligible below the Ngôn ngữ Anh 18,20/30 threshold', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };

    const result = evaluateTnuflThptExamAdmission(profile, { ...ngonNguAnh, subjectContext: d01Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(15);
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('marks eligible at or above the Ngôn ngữ Anh 18,20/30 threshold', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6.2, literature: 6, english: 6 } } };

    const result = evaluateTnuflThptExamAdmission(profile, { ...ngonNguAnh, subjectContext: d01Context });

    expect(result.score?.value).toBe(18.2);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('applies the Sư phạm Tiếng Anh threshold (25,60/30), higher than Ngôn ngữ Anh', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8.6, literature: 8.5, english: 8.5 } } };

    const result = evaluateTnuflThptExamAdmission(profile, { ...spTiengAnh, subjectContext: d01Context });

    expect(result.score?.value).toBe(25.6);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('accepts other whitelisted English-component combinations (X78)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 6.2, 'civic-economic-law': 6, english: 6 } } };
    const x78Context = { combinationId: 'X78', subjects: ['literature', 'civic-economic-law', 'english'] as const };

    const result = evaluateTnuflThptExamAdmission(profile, { ...ngonNguAnh, subjectContext: x78Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8 } } };

    const result = evaluateTnuflThptExamAdmission(profile, { ...ngonNguAnh, subjectContext: d01Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'tnufl-thpt-english' }));
  });

  it('applies standard priority points and threshold reduction near the top of the scale', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 8, literature: 8, english: 8.5 } },
      priority: { region: 'KV1' },
    };

    const result = evaluateTnuflThptExamAdmission(profile, { ...ngonNguAnh, subjectContext: d01Context });

    // raw = 24.5 >= 22.5 -> reduced priority = [(30-24.5)/7.5] * 0.75 = 0.55
    expect(result.explanation.find((step) => step.id === 'tnufl-exact-priority')?.output).toBe(0.55);
    expect(result.score?.value).toBe(25.05);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('does not mutate ApplicantProfile', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, literature: 7, english: 7 } } };
    const frozen = structuredClone(profile);
    evaluateTnuflThptExamAdmission(profile, { ...ngonNguAnh, subjectContext: d01Context });
    expect(profile).toEqual(frozen);
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };
    const context = { ...ngonNguAnh, subjectContext: d01Context };

    expect(evaluateSchool(profile, 'tnufl', { context }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['tnufl'], { tnufl: context })[0].status).toBe('calculated');
  });
});
