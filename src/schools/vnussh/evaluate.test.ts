import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateVnusshThptExamAdmission, evaluateVnusshThptExamExactAdmission } from './evaluate';

const d01Context = { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };

describe('VNU-USSH baseline THPT calculator 2025 (dải điểm chuẩn, không chọn ngành)', () => {
  it('marks a profile below the lowest published threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 2, literature: 2, english: 2 } } };

    const result = evaluateVnusshThptExamAdmission(profile, d01Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('marks a profile above the highest published threshold as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 10, literature: 10, english: 10 } } };

    const result = evaluateVnusshThptExamAdmission(profile, d01Context);

    expect(result.eligibility?.status).toBe('eligible');
  });

  it('marks a profile in the middle of the range as unknown (needs a chosen field)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };

    const result = evaluateVnusshThptExamAdmission(profile, d01Context);

    expect(result.eligibility?.status).toBe('unknown');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };

    const result = evaluateVnusshThptExamAdmission(profile);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vnussh-subject-combination' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters (baseline method)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 2, literature: 2, english: 2 } } };

    expect(evaluateSchool(profile, 'vnussh', { context: d01Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['vnussh'], { vnussh: d01Context })[0].status).toBe('partial');
  });
});

describe('VNU-USSH exact THPT calculator 2025 (theo ngành và tổ hợp)', () => {
  it('marks a profile below the field/combination threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 3, literature: 3, english: 3 } } };

    const result = evaluateVnusshThptExamExactAdmission(profile, { fieldCode: 'QHX14', ...d01Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(9);
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'vnussh-threshold-2025' }));
  });

  it('marks a profile at the field/combination threshold as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7.25, literature: 7.25, english: 7.25 } } };

    const result = evaluateVnusshThptExamExactAdmission(profile, { fieldCode: 'QHX14', ...d01Context });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(21.75);
  });

  it('requires a selected field before computing the exact score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };

    const result = evaluateVnusshThptExamExactAdmission(profile, d01Context);

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vnussh-field' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8 } } };

    const result = evaluateVnusshThptExamExactAdmission(profile, { fieldCode: 'QHX14', ...d01Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'vnussh-thpt-english' }));
  });

  it('rejects an unmodeled field code', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };

    const result = evaluateVnusshThptExamExactAdmission(profile, { fieldCode: 'QHX99', ...d01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vnussh-field' }));
  });

  it('rejects a subject combination not published for the chosen field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    // Nhật Bản học (QHX14) chỉ nhận D01 — A00 không thuộc danh sách.
    const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };
    const result = evaluateVnusshThptExamExactAdmission(profile, { fieldCode: 'QHX14', ...a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vnussh-subject-combination-not-in-list' }));
  });

  it('applies a different threshold for the same field with a different combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8.5, history: 8.5, geography: 8.5 } } };

    // Báo chí (QHX01) C00 threshold = 28,2, higher than D01's 24,7.
    const c00Context = { subjectContext: { combinationId: 'C00', subjects: ['literature', 'history', 'geography'] as const } };
    const result = evaluateVnusshThptExamExactAdmission(profile, { fieldCode: 'QHX01', ...c00Context });

    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.explanation.find((step) => step.id === 'vnussh-exact-threshold')?.output).toBe(28.2);
  });
});
