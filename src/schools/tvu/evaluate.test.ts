import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateTvuThptExamAdmission, evaluateTvuThptExamExactAdmission } from './evaluate';

const b00Context = { subjectContext: { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] as const } };

describe('TVU baseline THPT calculator 2025 (dải điểm chuẩn, không chọn ngành)', () => {
  it('marks a profile below the lowest published threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 3, chemistry: 3, biology: 3 } } };

    const result = evaluateTvuThptExamAdmission(profile, b00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('marks a profile above the highest published threshold as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, chemistry: 8, biology: 8 } } };

    const result = evaluateTvuThptExamAdmission(profile, b00Context);

    expect(result.eligibility?.status).toBe('eligible');
  });

  it('marks a profile in the middle of the range as unknown (needs a chosen field)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6.5, chemistry: 6.5, biology: 6.5 } } };

    const result = evaluateTvuThptExamAdmission(profile, b00Context);

    expect(result.eligibility?.status).toBe('unknown');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6.5, chemistry: 6.5, biology: 6.5 } } };

    const result = evaluateTvuThptExamAdmission(profile);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'tvu-subject-combination' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters (baseline method)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 3, chemistry: 3, biology: 3 } } };

    expect(evaluateSchool(profile, 'tvu', { context: b00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['tvu'], { tvu: b00Context })[0].status).toBe('partial');
  });
});

describe('TVU exact THPT calculator 2025 (theo ngành khối sức khỏe)', () => {
  it('marks a profile below the field threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, chemistry: 4, biology: 4 } } };

    const result = evaluateTvuThptExamExactAdmission(profile, { fieldCode: '7720101', ...b00Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(12);
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'tvu-threshold-2025' }));
  });

  it('marks a profile at the field threshold as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5.75, chemistry: 5.75, biology: 5.75 } } };

    const result = evaluateTvuThptExamExactAdmission(profile, { fieldCode: '7720301', ...b00Context });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(17.25);
  });

  it('requires a selected field before computing the exact score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, chemistry: 6, biology: 6 } } };

    const result = evaluateTvuThptExamExactAdmission(profile, b00Context);

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'tvu-field' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, chemistry: 6 } } };

    const result = evaluateTvuThptExamExactAdmission(profile, { fieldCode: '7720301', ...b00Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'tvu-thpt-biology' }));
  });

  it('rejects an unmodeled field code', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, chemistry: 6, biology: 6 } } };

    const result = evaluateTvuThptExamExactAdmission(profile, { fieldCode: '9999999', ...b00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'tvu-field' }));
  });

  it('rejects a subject combination not published for the chosen field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, chemistry: 6, biology: 6 } } };

    // Dược học (7720201) chỉ nhận A00/B00 — D01 không thuộc danh sách.
    const d01Context = { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };
    const result = evaluateTvuThptExamExactAdmission(profile, { fieldCode: '7720201', ...d01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'tvu-subject-combination-not-in-list' }));
  });
});
