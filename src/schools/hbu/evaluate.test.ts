import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateHbuThptExamAdmission } from './evaluate';

const d01Context = { combinationId: 'D01', subjects: ['literature', 'math', 'english'] as const };
const a00Context = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const };

describe('HBU exact THPT admission calculator 2025 (theo ngành)', () => {
  it('marks a profile below the field threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 4, math: 4, english: 4 } } };

    // Ngôn ngữ Anh (7220201) threshold = 15.00.
    const result = evaluateHbuThptExamAdmission(profile, { fieldCode: '7220201', subjectContext: d01Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(12);
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'hbu-threshold-2025' }));
  });

  it('marks a profile at the lowest field threshold as eligible (Ngôn ngữ Anh, 15.00/30)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 5, math: 5, english: 5 } } };

    const result = evaluateHbuThptExamAdmission(profile, { fieldCode: '7220201', subjectContext: d01Context });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(15);
  });

  it('applies a different (higher) threshold for Y khoa than Ngôn ngữ Anh', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    // Y khoa (7720101) threshold = 20.50 — same raw score would be eligible for a flat-15 field.
    const medResult = evaluateHbuThptExamAdmission(profile, { fieldCode: '7720101', subjectContext: a00Context });

    expect(medResult.eligibility?.status).toBe('ineligible');
    expect(medResult.score?.value).toBe(18);
  });

  it('requires a selected field before computing the score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, math: 8, english: 8 } } };

    const result = evaluateHbuThptExamAdmission(profile, { subjectContext: d01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hbu-field' }));
  });

  it('rejects an unmodeled field code (Thiết kế đồ họa, not modeled — needs Vẽ combo)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, math: 8, english: 8 } } };

    const result = evaluateHbuThptExamAdmission(profile, { fieldCode: '7210403', subjectContext: d01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hbu-field' }));
  });

  it('rejects a subject combination not officially published for the selected field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, biology: 8 } } };

    // Y khoa (7720101) combinations are A00/A11/B00/D07 — no A02.
    const a02Context = { combinationId: 'A02', subjects: ['math', 'physics', 'biology'] as const };
    const result = evaluateHbuThptExamAdmission(profile, { fieldCode: '7720101', subjectContext: a02Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hbu-subject-combination' }));
  });

  it('accepts a subject combination officially published for the selected field (D07 for Y khoa)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, chemistry: 7, english: 7.5 } } };

    const d07Context = { combinationId: 'D07', subjects: ['math', 'chemistry', 'english'] as const };
    const result = evaluateHbuThptExamAdmission(profile, { fieldCode: '7720101', subjectContext: d07Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(21.5);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('rejects the unsupported Ngôn ngữ Trung Quốc D65 combination (not modeled — needs Tiếng Trung)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, history: 8, math: 8 } } };

    const result = evaluateHbuThptExamAdmission(profile, {
      fieldCode: '7220204',
      subjectContext: { combinationId: 'D65', subjects: ['literature', 'history', 'english'] as const },
    });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hbu-subject-combination' }));
  });

  it('accepts the supported Ngôn ngữ Trung Quốc C19 combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 6, history: 5, 'civic-economic-law': 5 } } };

    const c19Context = { combinationId: 'C19', subjects: ['literature', 'history', 'civic-economic-law'] as const };
    const result = evaluateHbuThptExamAdmission(profile, { fieldCode: '7220204', subjectContext: c19Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(16);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, math: 8 } } };

    const result = evaluateHbuThptExamAdmission(profile, { fieldCode: '7220201', subjectContext: d01Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'hbu-thpt-english' }));
  });

  it('applies standard priority points and threshold reduction near the top of the scale', () => {
    // Y khoa (7720101) threshold = 20.50, combination D07 (uses D01 subjects here for simplicity — swap to A00 for realism).
    const highProfile: ApplicantProfile = {
      thpt: { scores: { math: 9, physics: 9, chemistry: 8.5 } },
      priority: { region: 'KV1' },
    };

    const result = evaluateHbuThptExamAdmission(highProfile, { fieldCode: '7720101', subjectContext: a00Context });

    // raw = 26.5 >= 22.5 -> reduced priority = [(30-26.5)/7.5] * 0.75 = 0.35
    expect(result.explanation.find((step) => step.id === 'hbu-exact-priority')?.output).toBe(0.35);
    expect(result.score?.value).toBe(26.85);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, math: 8, english: 8 } } };
    const context = { fieldCode: '7220201', subjectContext: d01Context };

    expect(evaluateSchool(profile, 'hbu', { context }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['hbu'], { hbu: context })[0].status).toBe('calculated');
  });
});
