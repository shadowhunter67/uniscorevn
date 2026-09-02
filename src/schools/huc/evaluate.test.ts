import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateHucThptExamAdmission, evaluateHucThptExamExactAdmission } from './evaluate';

const d01Context = { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };

describe('HUC baseline THPT calculator 2025 (dải điểm chuẩn, không chọn ngành)', () => {
  it('marks a profile below the lowest published threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 2, literature: 2, english: 2 } } };

    const result = evaluateHucThptExamAdmission(profile, d01Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('marks a profile above the highest published threshold as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 10, literature: 10, english: 10 } } };

    const result = evaluateHucThptExamAdmission(profile, d01Context);

    expect(result.eligibility?.status).toBe('eligible');
  });

  it('marks a profile in the middle of the range as unknown (needs a chosen field)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };

    const result = evaluateHucThptExamAdmission(profile, d01Context);

    expect(result.eligibility?.status).toBe('unknown');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };

    const result = evaluateHucThptExamAdmission(profile);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'huc-subject-combination' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters (baseline method)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 2, literature: 2, english: 2 } } };

    expect(evaluateSchool(profile, 'huc', { context: d01Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['huc'], { huc: d01Context })[0].status).toBe('partial');
  });
});

describe('HUC exact THPT calculator 2025 (theo ngành và tổ hợp)', () => {
  it('marks a profile below the field/combination threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 3, literature: 3, english: 3 } } };

    const result = evaluateHucThptExamExactAdmission(profile, { fieldCode: '7810101C', ...d01Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(9);
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'huc-threshold-2025' }));
  });

  it('marks a profile at the field/combination threshold as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7.6, literature: 7.6, english: 7.6 } } };

    const result = evaluateHucThptExamExactAdmission(profile, { fieldCode: '7810101C', ...d01Context });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(22.8);
  });

  it('requires a selected field before computing the exact score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };

    const result = evaluateHucThptExamExactAdmission(profile, d01Context);

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'huc-field' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8 } } };

    const result = evaluateHucThptExamExactAdmission(profile, { fieldCode: '7810101C', ...d01Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'huc-thpt-english' }));
  });

  it('rejects an unmodeled field code', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };

    const result = evaluateHucThptExamExactAdmission(profile, { fieldCode: '9999999', ...d01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'huc-field' }));
  });

  it('rejects a subject combination not published for the chosen field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    // Hướng dẫn du lịch quốc tế (7810101C) chỉ nhận D01/D14/D15 — A00 không thuộc danh sách.
    const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };
    const result = evaluateHucThptExamExactAdmission(profile, { fieldCode: '7810101C', ...a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'huc-subject-combination-not-in-list' }));
  });

  it('applies a different threshold for the same field with a different combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, history: 8, geography: 8 } } };

    // Báo chí (7320101) C00 threshold = 27,27, higher than D01's 25,27.
    const c00Context = { subjectContext: { combinationId: 'C00', subjects: ['literature', 'history', 'geography'] as const } };
    const result = evaluateHucThptExamExactAdmission(profile, { fieldCode: '7320101', ...c00Context });

    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.explanation.find((step) => step.id === 'huc-exact-threshold')?.output).toBe(27.27);
  });
});
