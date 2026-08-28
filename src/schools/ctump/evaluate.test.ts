import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateCtumpThptExamAdmission, evaluateCtumpThptExamExactAdmission } from './evaluate';

const combo = { subjectContext: { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] as const } };
const tier22 = { ...combo, group: 'tier22' as const };
const tier15 = { ...combo, group: 'tier15' as const };

describe('CTUMP THPT-exam eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, chemistry: 6, biology: 6 } } };

    const result = evaluateCtumpThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'ctump-subject-combination' }));
  });

  it('applies the 15/30 lowest-tier floor by default', () => {
    const below: ApplicantProfile = { thpt: { scores: { math: 4, chemistry: 5, biology: 5.5 } } };
    const at: ApplicantProfile = { thpt: { scores: { math: 5, chemistry: 5, biology: 5 } } };

    expect(evaluateCtumpThptExamAdmission(below, tier15).eligibility?.status).toBe('ineligible');
    expect(evaluateCtumpThptExamAdmission(at, tier15).eligibility?.status).toBe('eligible');
  });

  it('applies the highest 22/30 tier22 floor (Y khoa/Răng hàm mặt)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, chemistry: 7, biology: 7 } } };

    const result = evaluateCtumpThptExamAdmission(profile, tier22);

    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'ctump-quality-threshold-2026' }));
  });

  it('marks eligible at exactly the 22/30 floor', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, chemistry: 7, biology: 7 } } };

    expect(evaluateCtumpThptExamAdmission(profile, tier22).eligibility?.status).toBe('eligible');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, chemistry: 5, biology: 5 } } };

    // CTUMP đã có phương thức exact → classifyEvaluation phân loại lại kết quả threshold-only này
    // thành 'partial' (cùng tiền lệ FPTU/UDA/TBDU/VinhUni/HUB/CTU/...).
    expect(evaluateSchool(profile, 'ctump', { context: tier15 }).status).toBe('partial');
    expect(evaluateSchools(profile, ['ctump'], { ctump: tier15 })[0].status).toBe('partial');
  });
});

describe('evaluateCtumpThptExamExactAdmission (mức điểm nhận hồ sơ đợt 1, đã gồm ưu tiên)', () => {
  it('requires selecting a program group', () => {
    const evaluation = evaluateCtumpThptExamExactAdmission({ thpt: { scores: { math: 8, chemistry: 8, biology: 8 } } });

    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'ctump-program-group' }));
  });

  it('requires a subject combination', () => {
    const evaluation = evaluateCtumpThptExamExactAdmission({ thpt: { scores: { math: 8, chemistry: 8, biology: 8 } } }, { group: 'tier15' });

    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'ctump-subject-combination' }));
  });

  it('adds effective priority into the total before comparing to the threshold (source states threshold already includes priority)', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 5, chemistry: 5, biology: 5 } },
      priority: { region: 'KV1', category: 'UT1' },
    };
    const context = { group: 'tier15' as const, subjectContext: { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] as const } };

    const evaluation = evaluateCtumpThptExamExactAdmission(profile, context);

    expect(evaluation.confidence).toBe('exact-verified');
    // Raw 15 + priority KV1(0.75)+UT1(2.0)=2.75 (no reduction, raw < 22.5) = 17.75
    expect(evaluation.explanation.find((s) => s.id === 'ctump-exact-raw')?.output).toBe(15);
    expect(evaluation.score?.value).toBe(17.75);
    expect(evaluation.eligibility?.status).toBe('eligible');
  });

  it('does not mutate ApplicantProfile', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, chemistry: 5, biology: 5 } } };
    const frozen = structuredClone(profile);
    evaluateCtumpThptExamExactAdmission(profile, {
      group: 'tier15',
      subjectContext: { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] },
    });
    expect(profile).toEqual(frozen);
  });
});
