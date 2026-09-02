import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateHunreThptExamAdmission, evaluateHunreThptExamExactAdmission } from './evaluate';

const d01Context = { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };

describe('HUNRE baseline THPT calculator 2025 (dải điểm chuẩn, không chọn ngành)', () => {
  it('marks a profile below the lowest published threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 3, literature: 3, english: 3 } } };

    const result = evaluateHunreThptExamAdmission(profile, d01Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('marks a profile above the highest published threshold as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 10, literature: 10, english: 10 } } };

    const result = evaluateHunreThptExamAdmission(profile, d01Context);

    expect(result.eligibility?.status).toBe('eligible');
  });

  it('marks a profile in the middle of the range as unknown (needs a chosen field)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, literature: 7, english: 7 } } };

    const result = evaluateHunreThptExamAdmission(profile, d01Context);

    expect(result.eligibility?.status).toBe('unknown');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 9, literature: 9, english: 9 } } };

    const result = evaluateHunreThptExamAdmission(profile);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hunre-subject-combination' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters (baseline method)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 3, literature: 3, english: 3 } } };

    expect(evaluateSchool(profile, 'hunre', { context: d01Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['hunre'], { hunre: d01Context })[0].status).toBe('partial');
  });
});

describe('HUNRE exact THPT calculator 2025 (theo ngành)', () => {
  it('marks a profile below the field threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };

    const result = evaluateHunreThptExamExactAdmission(profile, { fieldCode: '7340115', ...d01Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(15);
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'hunre-threshold-2025' }));
  });

  it('marks a profile at the field threshold as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };

    const result = evaluateHunreThptExamExactAdmission(profile, { fieldCode: '7850198', ...d01Context });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(15);
  });

  it('requires a selected field before computing the exact score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 9, literature: 9, english: 9 } } };

    const result = evaluateHunreThptExamExactAdmission(profile, d01Context);

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hunre-field' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 9, literature: 9 } } };

    const result = evaluateHunreThptExamExactAdmission(profile, { fieldCode: '7340115', ...d01Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'hunre-thpt-english' }));
  });

  it('rejects an unmodeled field code', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 9, literature: 9, english: 9 } } };

    const result = evaluateHunreThptExamExactAdmission(profile, { fieldCode: '9999999', ...d01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hunre-field' }));
  });

  it('rejects a subject combination not published for the chosen field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 9, physics: 9, chemistry: 9 } } };

    // Marketing (7340115) chỉ modeled tổ hợp D01 — A00 không thuộc danh sách hỗ trợ.
    const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };
    const result = evaluateHunreThptExamExactAdmission(profile, { fieldCode: '7340115', ...a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hunre-subject-combination-not-in-list' }));
  });
});
