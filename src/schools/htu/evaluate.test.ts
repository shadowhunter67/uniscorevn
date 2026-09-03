import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateHtuThptExamAdmission } from './evaluate';

const b03Context = { combinationId: 'B03', subjects: ['math', 'biology', 'literature'] as const };
const d01Context = { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const };
const a00Context = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const };

describe('HTU exact THPT admission calculator 2025 (theo mã xét tuyển)', () => {
  it('marks a profile below the field threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 3, physics: 3, chemistry: 3 } } };

    const result = evaluateHtuThptExamAdmission(profile, { fieldCode: '7480201', subjectContext: a00Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(9);
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'htu-threshold-2025' }));
  });

  it('marks a profile at the lowest field threshold as eligible (Công nghệ thông tin, 15.00/30)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateHtuThptExamAdmission(profile, { fieldCode: '7480201', subjectContext: a00Context });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(15);
  });

  it('applies a per-combination threshold override for Giáo dục Tiểu học (D01 vs B03)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8.6, literature: 8.6, english: 8.65 } } };
    const d01Result = evaluateHtuThptExamAdmission(profile, { fieldCode: '7140202', subjectContext: d01Context });
    expect(d01Result.score?.value).toBe(25.85);
    expect(d01Result.eligibility?.status).toBe('eligible');

    const b03Profile: ApplicantProfile = { thpt: { scores: { math: 8.6, biology: 8.6, literature: 8.65 } } };
    const b03Result = evaluateHtuThptExamAdmission(b03Profile, { fieldCode: '7140202', subjectContext: b03Context });
    expect(b03Result.score?.value).toBe(25.85);
    // Same raw total (25.85) is below the B03 override threshold (26.35) though it met D01's (25.85).
    expect(b03Result.eligibility?.status).toBe('ineligible');
  });

  it('requires a selected field before computing the score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateHtuThptExamAdmission(profile, { subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'htu-field' }));
  });

  it('rejects an unmodeled field code', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    const result = evaluateHtuThptExamAdmission(profile, { fieldCode: 'ZZZZ', subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'htu-field' }));
  });

  it('rejects a subject combination not officially published for the selected field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    // 7480201 (CNTT) combinations do not include B03.
    const result = evaluateHtuThptExamAdmission(profile, { fieldCode: '7480201', subjectContext: b03Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'htu-subject-combination' }));
  });

  it('accepts a subject combination officially published for the selected field (Luật + D01)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6, english: 6 } } };

    const result = evaluateHtuThptExamAdmission(profile, { fieldCode: '7380101', subjectContext: d01Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(18);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8 } } };

    const result = evaluateHtuThptExamAdmission(profile, { fieldCode: '7480201', subjectContext: a00Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'htu-thpt-chemistry' }));
  });

  it('applies standard priority points and threshold reduction near the top of the scale', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 8, physics: 8, chemistry: 8.5 } },
      priority: { region: 'KV1' },
    };

    const result = evaluateHtuThptExamAdmission(profile, { fieldCode: '7480201', subjectContext: a00Context });

    // raw = 24.5 >= 22.5 -> reduced priority = [(30-24.5)/7.5] * 0.75 = 0.55
    expect(result.explanation.find((step) => step.id === 'htu-exact-priority')?.output).toBe(0.55);
    expect(result.score?.value).toBe(25.05);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };
    const context = { fieldCode: '7480201', subjectContext: a00Context };

    expect(evaluateSchool(profile, 'htu', { context }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['htu'], { htu: context })[0].status).toBe('calculated');
  });
});
