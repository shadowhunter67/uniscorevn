import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateThanglongThptExamAdmission } from './evaluate';

const a00Context = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const };
const a01Context = { combinationId: 'A01', subjects: ['math', 'physics', 'english'] as const };
const d01Context = { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const };
const c00Context = { combinationId: 'C00', subjects: ['literature', 'history', 'geography'] as const };
const b00Context = { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] as const };

describe('TLU-HN exact THPT admission calculator 2025 (theo ngành, phương thức 1)', () => {
  it('marks a profile below the field threshold as ineligible (Khoa học máy tính, A00, threshold 16.00)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateThanglongThptExamAdmission(profile, { fieldCode: '7480101', subjectContext: a00Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(12);
  });

  it('marks a profile at the base-combination threshold as eligible (Khoa học máy tính, A00, 16.00/30)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5.5, physics: 5.5, chemistry: 5 } } };

    const result = evaluateThanglongThptExamAdmission(profile, { fieldCode: '7480101', subjectContext: a00Context });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(16);
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'thanglong-threshold-2025' }));
  });

  it('applies the -1.0 group-1 delta for a non-base combination (Khoa học máy tính, A01: effective threshold 15.00)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, english: 5 } } };

    const result = evaluateThanglongThptExamAdmission(profile, { fieldCode: '7480101', subjectContext: a01Context });

    // raw = 15, effective threshold = 16.00 - 1.0 = 15.00 -> eligible
    expect(result.eligibility?.status).toBe('eligible');
    expect(result.explanation.find((step) => step.id === 'thanglong-exact-threshold')?.output).toBe(15);
  });

  it('applies the +2.0 group-2 delta for a non-base combination (Ngôn ngữ Anh, C00: effective threshold 21.70)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 7, history: 7, geography: 7.5 } } };

    // Ngôn ngữ Anh (7220201) threshold = 19.70 (gốc D01), C00 delta = +2.0 -> effective 21.70.
    const result = evaluateThanglongThptExamAdmission(profile, { fieldCode: '7220201', subjectContext: c00Context });

    expect(result.explanation.find((step) => step.id === 'thanglong-exact-threshold')?.output).toBe(21.7);
    expect(result.score?.value).toBe(21.5);
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('applies the base combination directly for group 3 (Điều dưỡng, B00, threshold 19.55)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6.5, chemistry: 6.5, biology: 6.55 } } };

    const result = evaluateThanglongThptExamAdmission(profile, { fieldCode: '7720301', subjectContext: b00Context });

    expect(result.score?.value).toBe(19.55);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('requires a selected field before computing the score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };

    const result = evaluateThanglongThptExamAdmission(profile, { subjectContext: d01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'thanglong-field' }));
  });

  it('rejects an unmodeled field code (Thanh nhạc — Nhóm 4, not in table)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };

    const result = evaluateThanglongThptExamAdmission(profile, { fieldCode: '7210205', subjectContext: d01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'thanglong-field' }));
  });

  it('rejects a subject combination not in the field group conversion table', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, chemistry: 8, biology: 8 } } };

    // Khoa học máy tính (7480101, group 1) does not accept B00 (that combo belongs to group 3).
    const result = evaluateThanglongThptExamAdmission(profile, { fieldCode: '7480101', subjectContext: b00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'thanglong-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8 } } };

    const result = evaluateThanglongThptExamAdmission(profile, { fieldCode: '7480101', subjectContext: a00Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'thanglong-thpt-chemistry' }));
  });

  it('applies standard priority points and threshold reduction near the top of the scale', () => {
    // Truyền thông đa phương tiện (7320104) threshold = 23.75, group 2 base D01.
    const highProfile: ApplicantProfile = {
      thpt: { scores: { math: 8.5, literature: 9, english: 9 } },
      priority: { region: 'KV1' },
    };

    const result = evaluateThanglongThptExamAdmission(highProfile, { fieldCode: '7320104', subjectContext: d01Context });

    // raw = 26.5 >= 22.5 -> reduced priority = [(30-26.5)/7.5] * 0.75 = 0.35
    expect(result.explanation.find((step) => step.id === 'thanglong-exact-priority')?.output).toBe(0.35);
    expect(result.score?.value).toBe(26.85);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };
    const context = { fieldCode: '7480101', subjectContext: a00Context };

    expect(evaluateSchool(profile, 'thanglong', { context }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['thanglong'], { thanglong: context })[0].status).toBe('calculated');
  });
});
