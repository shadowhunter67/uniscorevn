import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateBmtuThptExamAdmission } from './evaluate';

const b00Context = { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] as const };
const yKhoa = { fieldCode: '7720101' as const };
const duoc = { fieldCode: '7720201' as const };

describe('BMTU exact THPT admission calculator 2026 (Y khoa, Dược học)', () => {
  it('requires a selected field before computing the score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, chemistry: 8, biology: 8 } } };

    const result = evaluateBmtuThptExamAdmission(profile, { subjectContext: b00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'bmtu-field' }));
  });

  it('rejects an unmodeled field code (only Y khoa/Dược học supported)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, chemistry: 8, biology: 8 } } };

    const result = evaluateBmtuThptExamAdmission(profile, { fieldCode: '7720301', subjectContext: b00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'bmtu-field' }));
  });

  it('marks ineligible below the Y khoa threshold (22/30)', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 6, chemistry: 6, biology: 6 } },
      transcript: { grade12: { biology: 7 } },
    };

    const result = evaluateBmtuThptExamAdmission(profile, { ...yKhoa, subjectContext: b00Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(18);
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('marks eligible at exactly the Y khoa threshold when the biology gate is met', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 7.5, chemistry: 7.5, biology: 7 } },
      transcript: { grade12: { biology: 6.5 } },
    };

    const result = evaluateBmtuThptExamAdmission(profile, { ...yKhoa, subjectContext: b00Context });

    expect(result.score?.value).toBe(22);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('marks ineligible when the biology gate (>= 6.5, grade 12) is not met even if the score threshold is reached', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 7.5, chemistry: 7.5, biology: 7 } },
      transcript: { grade12: { biology: 6 } },
    };

    const result = evaluateBmtuThptExamAdmission(profile, { ...yKhoa, subjectContext: b00Context });

    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.eligibility?.reasons.join(' ')).toContain('Không đạt điều kiện phụ');
  });

  it('reports the biology gate as missing input when transcript is not provided (status unknown, not falsely eligible)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7.5, chemistry: 7.5, biology: 7 } } };

    const result = evaluateBmtuThptExamAdmission(profile, { ...yKhoa, subjectContext: b00Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'bmtu-gate-biology' }));
    expect(result.eligibility?.status).toBe('unknown');
  });

  it('applies the Dược học threshold (20/30) with its own chemistry gate', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 7, chemistry: 6.5, biology: 6.5 } },
      transcript: { grade12: { chemistry: 6.5 } },
    };

    const result = evaluateBmtuThptExamAdmission(profile, { ...duoc, subjectContext: b00Context });

    expect(result.score?.value).toBe(20);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('adds the national-tier HSG bonus when hsgAwardLevel is supplied', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 6, chemistry: 6, biology: 6 } },
      transcript: { grade12: { biology: 6.5 } },
    };

    const result = evaluateBmtuThptExamAdmission(profile, { ...yKhoa, subjectContext: b00Context, hsgAwardLevel: 'national-1-2-3' });

    expect(result.explanation.find((s) => s.id === 'bmtu-exact-hsg-bonus')?.output).toBe(3);
    expect(result.score?.value).toBe(21);
  });

  it('applies standard priority points and threshold reduction near the top of the scale', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 8, chemistry: 8, biology: 8.5 } },
      transcript: { grade12: { biology: 7 } },
      priority: { region: 'KV1' },
    };

    const result = evaluateBmtuThptExamAdmission(profile, { ...yKhoa, subjectContext: b00Context });

    // raw = 24.5 >= 22.5 -> reduced priority = [(30-24.5)/7.5] * 0.75 = 0.55
    expect(result.explanation.find((step) => step.id === 'bmtu-exact-priority')?.output).toBe(0.55);
    expect(result.score?.value).toBe(25.05);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('rejects a subject combination not among the 5 modeled combinations', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };
    const d01Context = { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const };

    const result = evaluateBmtuThptExamAdmission(profile, { ...yKhoa, subjectContext: d01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'bmtu-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, chemistry: 8 } } };

    const result = evaluateBmtuThptExamAdmission(profile, { ...yKhoa, subjectContext: b00Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'bmtu-thpt-biology' }));
  });

  it('does not mutate ApplicantProfile', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 7, chemistry: 7, biology: 7 } },
      transcript: { grade12: { biology: 6.5 } },
    };
    const frozen = structuredClone(profile);
    evaluateBmtuThptExamAdmission(profile, { ...yKhoa, subjectContext: b00Context });
    expect(profile).toEqual(frozen);
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 8, chemistry: 8, biology: 8 } },
      transcript: { grade12: { biology: 6.5 } },
    };
    const context = { ...yKhoa, subjectContext: b00Context };

    expect(evaluateSchool(profile, 'bmtu', { context }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['bmtu'], { bmtu: context })[0].status).toBe('calculated');
  });
});
