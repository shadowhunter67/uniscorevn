import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateDueudnThptExamAdmission } from './evaluate';

const a00Context = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const };
const quanLyNhaNuoc = { fieldCode: '7310205ST' as const }; // 19.00
const kinhDoanhQuocTe = { fieldCode: '7340120ST' as const }; // 25.00

describe('DUE exact THPT admission calculator 2026 (19/36 mã, chương trình ST - Tiêu chuẩn)', () => {
  it('requires a selected field before computing the score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateDueudnThptExamAdmission(profile, { subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'dueudn-field' }));
  });

  it('rejects an unmodeled field code (PR/GB/EL combined-method program not modeled)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateDueudnThptExamAdmission(profile, { fieldCode: '7340120PR', subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'dueudn-field' }));
  });

  it('marks ineligible below the Quản lý nhà nước 19,00/30 threshold', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateDueudnThptExamAdmission(profile, { ...quanLyNhaNuoc, subjectContext: a00Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(15);
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('marks eligible at or above the Quản lý nhà nước 19,00/30 threshold', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6.34, physics: 6.33, chemistry: 6.33 } } };

    const result = evaluateDueudnThptExamAdmission(profile, { ...quanLyNhaNuoc, subjectContext: a00Context });

    expect(result.score?.value).toBe(19);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('applies the Kinh doanh quốc tế threshold (25,00/30), higher than Quản lý nhà nước', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8.4, physics: 8.3, chemistry: 8.3 } } };

    const result = evaluateDueudnThptExamAdmission(profile, { ...kinhDoanhQuocTe, subjectContext: a00Context });

    expect(result.score?.value).toBe(25);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('accepts any subject combination (DUE does not restrict combos per field)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };
    const d01Context = { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const };

    const result = evaluateDueudnThptExamAdmission(profile, { ...quanLyNhaNuoc, subjectContext: d01Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8 } } };

    const result = evaluateDueudnThptExamAdmission(profile, { ...quanLyNhaNuoc, subjectContext: a00Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'dueudn-thpt-chemistry' }));
  });

  it('applies standard priority points and threshold reduction near the top of the scale', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 8, physics: 8, chemistry: 8.5 } },
      priority: { region: 'KV1' },
    };

    const result = evaluateDueudnThptExamAdmission(profile, { ...quanLyNhaNuoc, subjectContext: a00Context });

    // raw = 24.5 >= 22.5 -> reduced priority = [(30-24.5)/7.5] * 0.75 = 0.55
    expect(result.explanation.find((step) => step.id === 'dueudn-exact-priority')?.output).toBe(0.55);
    expect(result.score?.value).toBe(25.05);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('does not mutate ApplicantProfile', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };
    const frozen = structuredClone(profile);
    evaluateDueudnThptExamAdmission(profile, { ...quanLyNhaNuoc, subjectContext: a00Context });
    expect(profile).toEqual(frozen);
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };
    const context = { ...quanLyNhaNuoc, subjectContext: a00Context };

    expect(evaluateSchool(profile, 'dueudn', { context }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['dueudn'], { dueudn: context })[0].status).toBe('calculated');
  });
});
