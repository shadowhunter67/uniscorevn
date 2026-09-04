import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateVhsThptExamAdmission } from './evaluate';

const d01Context = { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const };
const c00Context = { combinationId: 'C00', subjects: ['literature', 'history', 'geography'] as const };

describe('VHS exact THPT admission calculator 2026 (theo ngành/chuyên ngành)', () => {
  it('marks a profile below the field threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 6, history: 6, geography: 6 } } };

    // Du lịch (7810101) threshold = 23.50.
    const result = evaluateVhsThptExamAdmission(profile, { fieldCode: '7810101', subjectContext: c00Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(18);
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'vhs-threshold-2026' }));
  });

  it('marks a profile at the lowest field threshold as eligible (Văn hóa các DTTS VN — Phát triển du lịch vùng dân tộc, 20.30/30)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 6.77, history: 6.77, geography: 6.76 } } };

    const result = evaluateVhsThptExamAdmission(profile, { fieldCode: '7220112B', subjectContext: c00Context });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(20.3);
  });

  it('applies a different (higher) threshold for Quản lý văn hóa (Tổ chức sự kiện) than Du lịch', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };

    // Quản lý văn hóa - Tổ chức sự kiện văn hóa, thể thao, du lịch (7229042D) threshold = 24.40.
    const result = evaluateVhsThptExamAdmission(profile, { fieldCode: '7229042D', subjectContext: d01Context });

    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(24);
  });

  it('requires a selected field before computing the score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, math: 8, english: 8 } } };

    const result = evaluateVhsThptExamAdmission(profile, { subjectContext: d01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vhs-field' }));
  });

  it('rejects an unmodeled field code (7229042C — no mã 100 cutoff, năng khiếu only)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, math: 8, english: 8 } } };

    const result = evaluateVhsThptExamAdmission(profile, { fieldCode: '7229042C', subjectContext: d01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vhs-field' }));
  });

  it('rejects a subject combination not officially published for the selected field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    // Du lịch (7810101) combinations do not include A00.
    const a00Context = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const };
    const result = evaluateVhsThptExamAdmission(profile, { fieldCode: '7810101', subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vhs-subject-combination' }));
  });

  it('accepts a subject combination officially published for the selected field (A06 for Di sản học — Di sản và phát triển du lịch)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7.5, chemistry: 7.3, geography: 7.3 } } };

    const a06Context = { combinationId: 'A06', subjects: ['math', 'chemistry', 'geography'] as const };
    const result = evaluateVhsThptExamAdmission(profile, { fieldCode: '7229047A', subjectContext: a06Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(22.1);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, math: 8 } } };

    const result = evaluateVhsThptExamAdmission(profile, { fieldCode: '7320402', subjectContext: d01Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'vhs-thpt-english' }));
  });

  it('applies standard priority points and threshold reduction near the top of the scale', () => {
    // Quản lý văn hóa - Tổ chức sự kiện (7229042D) threshold = 24.40, combination D01.
    const highProfile: ApplicantProfile = {
      thpt: { scores: { math: 9, literature: 9, english: 8.5 } },
      priority: { region: 'KV1' },
    };

    const result = evaluateVhsThptExamAdmission(highProfile, { fieldCode: '7229042D', subjectContext: d01Context });

    // raw = 26.5 >= 22.5 -> reduced priority = [(30-26.5)/7.5] * 0.75 = 0.35
    expect(result.explanation.find((step) => step.id === 'vhs-exact-priority')?.output).toBe(0.35);
    expect(result.score?.value).toBe(26.85);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8.5, history: 8.5, geography: 8.5 } } };
    const context = { fieldCode: '7810101', subjectContext: c00Context };

    expect(evaluateSchool(profile, 'vhs', { context }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['vhs'], { vhs: context })[0].status).toBe('calculated');
  });
});
