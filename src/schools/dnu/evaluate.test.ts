import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateDnuThptExamAdmission } from './evaluate';

const a00Context = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const };
const d01Context = { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const };

describe('DNU exact THPT admission calculator 2025 (theo ngành)', () => {
  it('marks a profile below the field threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateDnuThptExamAdmission(profile, { fieldCode: '7340101', subjectContext: a00Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(12);
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'dnu-threshold-2025' }));
  });

  it('marks a profile at the lowest field threshold as eligible (Quản trị kinh doanh / Kế toán, 16.00/30)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5.4, physics: 5.3, chemistry: 5.3 } } };

    const result = evaluateDnuThptExamAdmission(profile, { fieldCode: '7340101', subjectContext: a00Context });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(16);
  });

  it('applies a different threshold for a different field with the same combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6.5, physics: 6, chemistry: 5.5 } } };

    // Kỹ thuật cơ khí (7520103) threshold = 18.00, Công nghệ kỹ thuật điện, điện tử (7510301) threshold = 22.00.
    const mechResult = evaluateDnuThptExamAdmission(profile, { fieldCode: '7520103', subjectContext: a00Context });
    const electricalResult = evaluateDnuThptExamAdmission(profile, { fieldCode: '7510301', subjectContext: a00Context });

    expect(mechResult.eligibility?.status).toBe('eligible');
    expect(electricalResult.eligibility?.status).toBe('ineligible');
  });

  it('requires a selected field before computing the score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateDnuThptExamAdmission(profile, { subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'dnu-field' }));
  });

  it('rejects an unmodeled field code', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateDnuThptExamAdmission(profile, { fieldCode: '9999999', subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'dnu-field' }));
  });

  it('rejects a subject combination not officially published for the selected field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    // Sư phạm Ngữ văn (7140217) combinations are C00/D01/D14/D15 — A00 is not among them.
    const result = evaluateDnuThptExamAdmission(profile, { fieldCode: '7140217', subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'dnu-subject-combination' }));
  });

  it('accepts a subject combination officially published for the selected field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 9, literature: 9, english: 8.51 } } };

    const result = evaluateDnuThptExamAdmission(profile, { fieldCode: '7140217', subjectContext: d01Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(26.51);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8 } } };

    const result = evaluateDnuThptExamAdmission(profile, { fieldCode: '7340101', subjectContext: a00Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'dnu-thpt-chemistry' }));
  });

  it('applies standard priority points and threshold reduction near the top of the scale', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 8, physics: 8, chemistry: 8.5 } },
      priority: { region: 'KV1' },
    };

    const result = evaluateDnuThptExamAdmission(profile, { fieldCode: '7510301', subjectContext: a00Context });

    // raw = 24.5 >= 22.5 -> reduced priority = [(30-24.5)/7.5] * 0.75 = 0.55
    expect(result.explanation.find((step) => step.id === 'dnu-exact-priority')?.output).toBe(0.55);
    expect(result.score?.value).toBe(25.05);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('enforces the minimum English subject score condition for Ngôn ngữ Anh', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 7, english: 6.9 } } };

    const result = evaluateDnuThptExamAdmission(profile, { fieldCode: '7220201', subjectContext: d01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'dnu-min-english' }));
  });

  it('passes the minimum English subject score condition when it is met', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 7 } } };

    const result = evaluateDnuThptExamAdmission(profile, { fieldCode: '7220201', subjectContext: d01Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(17);
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('flags the Đồng Nai residency requirement for Sư phạm fields without blocking calculation', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 9, literature: 9, english: 8.51 } } };

    const result = evaluateDnuThptExamAdmission(profile, { fieldCode: '7140217', subjectContext: d01Context });

    expect(result.eligibility?.reasons.some((reason) => reason.includes('hộ khẩu/thường trú'))).toBe(true);
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };
    const context = { fieldCode: '7340101', subjectContext: a00Context };

    expect(evaluateSchool(profile, 'dnu', { context }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['dnu'], { dnu: context })[0].status).toBe('calculated');
  });
});
