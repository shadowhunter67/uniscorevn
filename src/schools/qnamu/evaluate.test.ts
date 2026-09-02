import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateQnamuThptExamAdmission, evaluateQnamuThptExamExactAdmission } from './evaluate';

const d01Context = { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };

describe('QNamU baseline THPT calculator 2025 (dải điểm chuẩn, không chọn ngành)', () => {
  it('marks a profile below the lowest published threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 2, literature: 2, english: 2 } } };

    const result = evaluateQnamuThptExamAdmission(profile, d01Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('marks a profile above the highest published threshold as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 10, literature: 10, english: 10 } } };

    const result = evaluateQnamuThptExamAdmission(profile, d01Context);

    expect(result.eligibility?.status).toBe('eligible');
  });

  it('marks a profile in the middle of the range as unknown (needs a chosen field)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };

    const result = evaluateQnamuThptExamAdmission(profile, d01Context);

    expect(result.eligibility?.status).toBe('unknown');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };

    const result = evaluateQnamuThptExamAdmission(profile);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'qnamu-subject-combination' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters (baseline method)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 2, literature: 2, english: 2 } } };

    expect(evaluateSchool(profile, 'qnamu', { context: d01Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['qnamu'], { qnamu: d01Context })[0].status).toBe('partial');
  });
});

describe('QNamU exact THPT calculator 2025 (theo ngành và tổ hợp)', () => {
  it('marks a profile below the field/combination threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 3, literature: 3, english: 3 } } };

    const result = evaluateQnamuThptExamExactAdmission(profile, { fieldCode: '7140202', ...d01Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(9);
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'qnamu-threshold-2025' }));
  });

  it('marks a profile at the field/combination threshold as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8.26, literature: 8.26, english: 8.25 } } };

    const result = evaluateQnamuThptExamExactAdmission(profile, { fieldCode: '7140202', ...d01Context });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(24.77);
  });

  it('requires a selected field before computing the exact score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };

    const result = evaluateQnamuThptExamExactAdmission(profile, d01Context);

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'qnamu-field' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8 } } };

    const result = evaluateQnamuThptExamExactAdmission(profile, { fieldCode: '7140202', ...d01Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'qnamu-thpt-english' }));
  });

  it('rejects an unmodeled field code', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };

    const result = evaluateQnamuThptExamExactAdmission(profile, { fieldCode: '9999999', ...d01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'qnamu-field' }));
  });

  it('rejects a subject combination not published for the chosen field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, biology: 8 } } };

    // Giáo dục Tiểu học (7140202) chỉ nhận D01/A00/C03/X01/C00 — A02 không thuộc danh sách.
    const a02Context = { subjectContext: { combinationId: 'A02', subjects: ['math', 'physics', 'biology'] as const } };
    const result = evaluateQnamuThptExamExactAdmission(profile, { fieldCode: '7140202', ...a02Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'qnamu-subject-combination-not-in-list' }));
  });

  it('applies a different threshold for the same field with a different combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8.76, history: 8.75, geography: 8.76 } } };

    // Giáo dục Tiểu học C00 threshold = 26.27, higher than D01's 24.77.
    const c00Context = { subjectContext: { combinationId: 'C00', subjects: ['literature', 'history', 'geography'] as const } };
    const result = evaluateQnamuThptExamExactAdmission(profile, { fieldCode: '7140202', ...c00Context });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.explanation.find((step) => step.id === 'qnamu-exact-threshold')?.output).toBe(26.27);
  });
});
