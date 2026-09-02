import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateVnuhusThptExamAdmission, evaluateVnuhusThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('VNU-HUS baseline THPT calculator 2025 (dải điểm chuẩn, không chọn ngành)', () => {
  it('marks a profile below the lowest published threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateVnuhusThptExamAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('marks a profile above the highest published threshold as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 10, physics: 10, chemistry: 10 } } };

    const result = evaluateVnuhusThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('eligible');
  });

  it('marks a profile in the middle of the range as unknown (needs a chosen field)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateVnuhusThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('unknown');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 9, physics: 9, chemistry: 9 } } };

    const result = evaluateVnuhusThptExamAdmission(profile);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vnuhus-subject-combination' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters (baseline method)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    expect(evaluateSchool(profile, 'vnuhus', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['vnuhus'], { vnuhus: a00Context })[0].status).toBe('partial');
  });
});

describe('VNU-HUS exact THPT calculator 2025 (theo ngành)', () => {
  it('marks a profile below the field threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateVnuhusThptExamExactAdmission(profile, { fieldCode: 'QHT93', ...a00Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(15);
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'vnuhus-threshold-2025' }));
  });

  it('marks a profile at the field threshold as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6.75, physics: 6.65, chemistry: 6.65 } } };

    const result = evaluateVnuhusThptExamExactAdmission(profile, { fieldCode: 'QHT08', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(20.05);
  });

  it('requires a selected field before computing the exact score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 9, physics: 9, chemistry: 9 } } };

    const result = evaluateVnuhusThptExamExactAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vnuhus-field' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 9, physics: 9 } } };

    const result = evaluateVnuhusThptExamExactAdmission(profile, { fieldCode: 'QHT93', ...a00Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'vnuhus-thpt-chemistry' }));
  });

  it('rejects an unmodeled field code', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 9, physics: 9, chemistry: 9 } } };

    const result = evaluateVnuhusThptExamExactAdmission(profile, { fieldCode: 'QHT00', ...a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vnuhus-field' }));
  });

  it('rejects a subject combination not published for the chosen field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 9, literature: 9, english: 9 } } };

    // Toán học (QHT01) chỉ nhận A00/A01/C01/D07/D08 — D01 không thuộc danh sách hỗ trợ.
    const result = evaluateVnuhusThptExamExactAdmission(profile, {
      fieldCode: 'QHT01',
      subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] },
    });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vnuhus-subject-combination-not-in-list' }));
  });
});
