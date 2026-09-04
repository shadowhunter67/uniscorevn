import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateTrungVuongThptExamAdmission } from './evaluate';

const a00Context = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const };
const d01Context = { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const };

describe('TVUni exact THPT admission calculator 2025 (theo ngành)', () => {
  it('marks a profile below the field threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateTrungVuongThptExamAdmission(profile, { fieldCode: '7340101', subjectContext: a00Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(12);
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'trungvuong-diemchuan-2025-crosscheck' }));
  });

  it('marks a profile at the lowest field threshold as eligible (Luật kinh tế/Logistics/Ngôn ngữ Anh/Kế toán/Kinh tế quốc tế/Truyền thông đa phương tiện, 15.00/30)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateTrungVuongThptExamAdmission(profile, { fieldCode: '7380107', subjectContext: a00Context });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(15);
  });

  it('applies a different threshold for a different field with the same combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6.5, physics: 5.5, chemistry: 5 } } };

    // Kế toán (7340301) threshold = 15.00, Dược học (7720201, tổ hợp A00) threshold = 19.00.
    const ketoanResult = evaluateTrungVuongThptExamAdmission(profile, { fieldCode: '7340301', subjectContext: a00Context });
    const duocResult = evaluateTrungVuongThptExamAdmission(profile, { fieldCode: '7720201', subjectContext: a00Context });

    expect(ketoanResult.eligibility?.status).toBe('eligible');
    expect(duocResult.eligibility?.status).toBe('ineligible');
  });

  it('requires a selected field before computing the score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateTrungVuongThptExamAdmission(profile, { subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'trungvuong-field' }));
  });

  it('rejects an unmodeled field code', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateTrungVuongThptExamAdmission(profile, { fieldCode: '9999999', subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'trungvuong-field' }));
  });

  it('rejects a subject combination not officially published for the selected field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    // Điều dưỡng (7720301) combinations do not include D01.
    const result = evaluateTrungVuongThptExamAdmission(profile, { fieldCode: '7720301', subjectContext: d01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'trungvuong-subject-combination' }));
  });

  it('accepts a subject combination officially published for the selected field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6, english: 6 } } };

    const result = evaluateTrungVuongThptExamAdmission(profile, { fieldCode: '7480201', subjectContext: d01Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(18);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8 } } };

    const result = evaluateTrungVuongThptExamAdmission(profile, { fieldCode: '7340101', subjectContext: a00Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'trungvuong-thpt-chemistry' }));
  });

  it('applies standard priority points and threshold reduction near the top of the scale', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 8, physics: 8, chemistry: 8.5 } },
      priority: { region: 'KV1' },
    };

    const result = evaluateTrungVuongThptExamAdmission(profile, { fieldCode: '7720201', subjectContext: a00Context });

    // raw = 24.5 >= 22.5 -> reduced priority = [(30-24.5)/7.5] * 0.75 = 0.55
    expect(result.explanation.find((step) => step.id === 'trungvuong-exact-priority')?.output).toBe(0.55);
    expect(result.score?.value).toBe(25.05);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('rejects a foreign-language combination excluded for missing SubjectId (D04 for Ngôn ngữ Trung Quốc)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateTrungVuongThptExamAdmission(profile, { fieldCode: '7220204', subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'trungvuong-subject-combination' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };
    const context = { fieldCode: '7340101', subjectContext: a00Context };

    expect(evaluateSchool(profile, 'trungvuong', { context }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['trungvuong'], { trungvuong: context })[0].status).toBe('calculated');
  });
});
