import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateDsuThptExamAdmission } from './evaluate';

const b03Context = { combinationId: 'B03', subjects: ['math', 'biology', 'literature'] as const };
const c14Context = { combinationId: 'C14', subjects: ['literature', 'math', 'civic-economic-law'] as const };
const a00Context = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const };

describe('DSU exact THPT admission calculator 2025 (Phương thức 100, ngành Quản lý TDTT)', () => {
  it('marks a profile below the field threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, biology: 4, literature: 4 } } };

    const result = evaluateDsuThptExamAdmission(profile, { fieldCode: '7810301', subjectContext: b03Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(12);
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'dsu-qd1088-diemchuan-2025' }));
  });

  it('marks a profile exactly at the field threshold as eligible (21.50/30)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7.5, biology: 7, literature: 7 } } };

    const result = evaluateDsuThptExamAdmission(profile, { fieldCode: '7810301', subjectContext: b03Context });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(21.5);
  });

  it('accepts the C14 combination for the same field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7.5, literature: 7, 'civic-economic-law': 7 } } };

    const result = evaluateDsuThptExamAdmission(profile, { fieldCode: '7810301', subjectContext: c14Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(21.5);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('requires a selected field before computing the score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, biology: 8, literature: 8 } } };

    const result = evaluateDsuThptExamAdmission(profile, { subjectContext: b03Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'dsu-field' }));
  });

  it('rejects an unmodeled field code (Huấn luyện thể thao, requires năng khiếu)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, biology: 8, literature: 8 } } };

    const result = evaluateDsuThptExamAdmission(profile, { fieldCode: '7810302', subjectContext: b03Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'dsu-field' }));
  });

  it('rejects a subject combination not officially published for the field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateDsuThptExamAdmission(profile, { fieldCode: '7810301', subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'dsu-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, biology: 8 } } };

    const result = evaluateDsuThptExamAdmission(profile, { fieldCode: '7810301', subjectContext: b03Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'dsu-thpt-literature' }));
  });

  it('applies standard priority points and threshold reduction near the top of the scale', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 8, biology: 8, literature: 8.5 } },
      priority: { region: 'KV1' },
    };

    const result = evaluateDsuThptExamAdmission(profile, { fieldCode: '7810301', subjectContext: b03Context });

    // raw = 24.5 >= 22.5 -> reduced priority = [(30-24.5)/7.5] * 0.75 = 0.55
    expect(result.explanation.find((step) => step.id === 'dsu-exact-priority')?.output).toBe(0.55);
    expect(result.score?.value).toBe(25.05);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, biology: 8, literature: 8 } } };
    const context = { fieldCode: '7810301', subjectContext: b03Context };

    expect(evaluateSchool(profile, 'dsu', { context }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['dsu'], { dsu: context })[0].status).toBe('calculated');
  });
});
