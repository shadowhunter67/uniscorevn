import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluatePduThptExamAdmission } from './evaluate';

const d01Context = { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const };
const a00Context = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const };

describe('PDU exact THPT admission calculator 2026 (theo ngành)', () => {
  it('marks a profile below the field threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, literature: 4, english: 4 } } };

    // Công nghệ thông tin (7480201) threshold = 15.00, combinations include D01.
    const result = evaluatePduThptExamAdmission(profile, { fieldCode: '7480201', subjectContext: d01Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(12);
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'pdu-cutoff-2026' }));
  });

  it('marks a profile at the lowest field threshold as eligible (Công nghệ thông tin, 15.00/30)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };

    const result = evaluatePduThptExamAdmission(profile, { fieldCode: '7480201', subjectContext: d01Context });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(15);
  });

  it('applies a different threshold for a different field with the same combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, literature: 7, english: 7 } } };

    // Giáo dục Tiểu học (7140202) threshold = 22.30 vs Công nghệ thông tin (7480201) threshold = 15.00.
    const tieuHocResult = evaluatePduThptExamAdmission(profile, { fieldCode: '7140202', subjectContext: d01Context });
    const cntResult = evaluatePduThptExamAdmission(profile, { fieldCode: '7480201', subjectContext: d01Context });

    expect(tieuHocResult.eligibility?.status).toBe('ineligible');
    expect(cntResult.eligibility?.status).toBe('eligible');
    expect(tieuHocResult.score?.value).toBe(21);
    expect(cntResult.score?.value).toBe(21);
  });

  it('requires a selected field before computing the score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };

    const result = evaluatePduThptExamAdmission(profile, { subjectContext: d01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'pdu-field' }));
  });

  it('rejects an unmodeled field code (Giáo dục Mầm non — cao đẳng, tổ hợp năng khiếu, not in table)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };

    const result = evaluatePduThptExamAdmission(profile, { fieldCode: '51140201', subjectContext: d01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'pdu-field' }));
  });

  it('rejects a subject combination not officially published for the selected field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    // Sư phạm Ngữ văn (7140217) combinations are C00/C03/X74/X70/X01/D14 — no A00.
    const result = evaluatePduThptExamAdmission(profile, { fieldCode: '7140217', subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'pdu-subject-combination' }));
  });

  it('accepts a subject combination officially published for the selected field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 9 } } };

    // Sư phạm Toán học (7140209) threshold = 21.60, combinations include A00.
    const result = evaluatePduThptExamAdmission(profile, { fieldCode: '7140209', subjectContext: a00Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(25);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8 } } };

    const result = evaluatePduThptExamAdmission(profile, { fieldCode: '7480201', subjectContext: d01Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'pdu-thpt-english' }));
  });

  it('applies standard priority points and threshold reduction near the top of the scale', () => {
    // Sư phạm Toán học (7140209) threshold = 21.60, combination A00.
    const highProfile: ApplicantProfile = {
      thpt: { scores: { math: 9, physics: 9, chemistry: 8.5 } },
      priority: { region: 'KV1' },
    };

    const result = evaluatePduThptExamAdmission(highProfile, { fieldCode: '7140209', subjectContext: a00Context });

    // raw = 26.5 >= 22.5 -> reduced priority = [(30-26.5)/7.5] * 0.75 = 0.35
    expect(result.explanation.find((step) => step.id === 'pdu-exact-priority')?.output).toBe(0.35);
    expect(result.score?.value).toBe(26.85);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };
    const context = { fieldCode: '7480201', subjectContext: d01Context };

    expect(evaluateSchool(profile, 'pdu', { context }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['pdu'], { pdu: context })[0].status).toBe('calculated');
  });
});
