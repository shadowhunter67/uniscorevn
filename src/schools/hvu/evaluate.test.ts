import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateHvuThptExamAdmission } from './evaluate';

const d01Context = { combinationId: 'D01', subjects: ['literature', 'math', 'english'] as const };
const a00Context = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const };
const c00Context = { combinationId: 'C00', subjects: ['literature', 'history', 'geography'] as const };

describe('HVU exact THPT admission calculator 2026 (theo ngành)', () => {
  it('marks a profile below the field threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 6, history: 6, geography: 6 } } };

    // Tâm lý học (7310401) threshold = 22.63.
    const result = evaluateHvuThptExamAdmission(profile, { fieldCode: '7310401', subjectContext: c00Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(18);
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'hvu-threshold-2026' }));
  });

  it('marks a profile at the lowest field threshold as eligible (Tâm lý học, 22.63/30)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 7.55, history: 7.54, geography: 7.54 } } };

    const result = evaluateHvuThptExamAdmission(profile, { fieldCode: '7310401', subjectContext: c00Context });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(22.63);
  });

  it('applies a different (higher) threshold for Sư phạm Toán học than Tâm lý học', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    // Sư phạm Toán học (7140209) threshold = 26.5 — raw 24 would be eligible for Tâm lý học (22.63) but not here.
    const result = evaluateHvuThptExamAdmission(profile, { fieldCode: '7140209', subjectContext: a00Context });

    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(24);
  });

  it('requires a selected field before computing the score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, math: 8, english: 8 } } };

    const result = evaluateHvuThptExamAdmission(profile, { subjectContext: d01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hvu-field' }));
  });

  it('rejects an unmodeled field code (Công nghệ thông tin — no đợt-1 cutoff yet)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, math: 8, english: 8 } } };

    const result = evaluateHvuThptExamAdmission(profile, { fieldCode: '7480201', subjectContext: d01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hvu-field' }));
  });

  it('rejects a subject combination not officially published for the selected field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, biology: 8 } } };

    // Sư phạm Toán học (7140209) combinations are A00/D01/X06/X25 — no B00.
    const b00Context = { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] as const };
    const result = evaluateHvuThptExamAdmission(profile, { fieldCode: '7140209', subjectContext: b00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hvu-subject-combination' }));
  });

  it('accepts a subject combination officially published for the selected field (X14 for Sư phạm Khoa học tự nhiên)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8.5, biology: 8.5, informatics: 8.76 } } };

    const x14Context = { combinationId: 'X14', subjects: ['math', 'biology', 'informatics'] as const };
    const result = evaluateHvuThptExamAdmission(profile, { fieldCode: '7140247', subjectContext: x14Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(25.76);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, math: 8 } } };

    const result = evaluateHvuThptExamAdmission(profile, { fieldCode: '7140202', subjectContext: d01Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'hvu-thpt-english' }));
  });

  it('applies standard priority points and threshold reduction near the top of the scale', () => {
    // Sư phạm Toán học (7140209) threshold = 26.5, combination A00.
    const highProfile: ApplicantProfile = {
      thpt: { scores: { math: 9, physics: 9, chemistry: 8.5 } },
      priority: { region: 'KV1' },
    };

    const result = evaluateHvuThptExamAdmission(highProfile, { fieldCode: '7140209', subjectContext: a00Context });

    // raw = 26.5 >= 22.5 -> reduced priority = [(30-26.5)/7.5] * 0.75 = 0.35
    expect(result.explanation.find((step) => step.id === 'hvu-exact-priority')?.output).toBe(0.35);
    expect(result.score?.value).toBe(26.85);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8.5, history: 8.5, geography: 8.5 } } };
    const context = { fieldCode: '7310401', subjectContext: c00Context };

    expect(evaluateSchool(profile, 'hvu', { context }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['hvu'], { hvu: context })[0].status).toBe('calculated');
  });
});
