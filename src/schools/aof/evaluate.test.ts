import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateAofThptExamAdmission, evaluateAofThptExamExactAdmission2025 } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('AOF THPT baseline eligibility 2026', () => {
  it('marks profiles below the lowest published band as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateAofThptExamAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'aof-threshold-2026' }));
  });

  it('keeps profiles between the lowest and highest published bands unresolved', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluateAofThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('unknown');
  });

  it('keeps profiles above the highest published band unresolved too (band is a range, resolved only by group)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateAofThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('unknown');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };

    const result = evaluateAofThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'aof-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6 } } };

    const result = evaluateAofThptExamAdmission(profile, a00Context);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'aof-thpt-chemistry' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters (reported as partial — AOF now has an exact calculator via method[1] 2025, the comparison adapter still resolves through the threshold-only baseline method[0] 2026)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    expect(evaluateSchool(profile, 'aof', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['aof'], { aof: a00Context })[0].status).toBe('partial');
  });
});

const d01Context2025 = { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };

describe('AOF exact THPT calculator 2025 (theo ngành/chương trình, phương thức 3)', () => {
  it('marks a profile below the field threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 3, literature: 3, english: 3 } } };

    const result = evaluateAofThptExamExactAdmission2025(profile, { fieldCode: '7340302', ...d01Context2025 });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(9);
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'aof-threshold-2025' }));
  });

  it('marks a profile at the field threshold as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, literature: 7, english: 7 } } };

    const result = evaluateAofThptExamExactAdmission2025(profile, { fieldCode: '7340201QT01.15', ...d01Context2025 });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(21);
  });

  it('requires a selected field before computing the exact score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 9, literature: 9, english: 9 } } };

    const result = evaluateAofThptExamExactAdmission2025(profile, d01Context2025);

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'aof-field-2025' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 9, literature: 9 } } };

    const result = evaluateAofThptExamExactAdmission2025(profile, { fieldCode: '7340302', ...d01Context2025 });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'aof-thpt-2025-english' }));
  });

  it('rejects an unmodeled field code', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 9, literature: 9, english: 9 } } };

    const result = evaluateAofThptExamExactAdmission2025(profile, { fieldCode: '9999999', ...d01Context2025 });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'aof-field-2025' }));
  });

  it('rejects a subject combination not published for the chosen international-track program', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 9, physics: 9, chemistry: 9 } } };

    // Ngân hàng ICAEW (7340201QT01.15) chỉ nhận A01/D01/D07 — A00 không thuộc danh sách hỗ trợ.
    const result = evaluateAofThptExamExactAdmission2025(profile, { fieldCode: '7340201QT01.15', ...a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'aof-subject-combination-not-in-list-2025' }));
  });
});
