import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateHcmueAdmission, evaluateHcmueThptExamExactAdmission } from './evaluate';

const profile: ApplicantProfile = {
  thpt: { scores: { math: 8.5, physics: 8, chemistry: 8 } },
};

describe('evaluateHcmueAdmission', () => {
  it('checks threshold eligibility without creating a final admission score', () => {
    const evaluation = evaluateHcmueAdmission(profile, {
      selectedProgramId: 'hcmue-7140209',
      subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] },
    });
    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.eligibility?.status).toBe('eligible');
    expect(evaluation.score).toBeUndefined();
    expect(evaluation.explanation).toContainEqual(expect.objectContaining({ id: 'hcmue-thpt-threshold', output: 24.5, scale: 30 }));
  });

  it('reports missing program, combination, and subject inputs', () => {
    const evaluation = evaluateHcmueAdmission({ thpt: { scores: { math: 8 } } });
    expect(evaluation.eligibility?.status).toBe('unknown');
    expect(evaluation.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'program' }));
    expect(evaluation.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hcmue-subject-combination' }));
  });

  it('does not mutate ApplicantProfile', () => {
    const frozen = structuredClone(profile);
    evaluateHcmueAdmission(profile, {
      selectedProgramId: 'hcmue-7140209',
      subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] },
    });
    expect(profile).toEqual(frozen);
  });
});

describe('evaluateHcmueThptExamExactAdmission (47 ngành trụ sở chính TP.HCM)', () => {
  const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

  it('requires selecting a program', () => {
    const evaluation = evaluateHcmueThptExamExactAdmission({ thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } });

    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'program' }));
  });

  it('reports branch-campus programs without a published threshold as out of scope, not guessed', () => {
    const evaluation = evaluateHcmueThptExamExactAdmission(
      { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } },
      { selectedProgramId: 'hcmue-7140209-longan', ...a00Context }
    );

    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.eligibility?.status).toBe('unknown');
  });

  it('marks totals below the program threshold as ineligible with exact-verified confidence', () => {
    const evaluation = evaluateHcmueThptExamExactAdmission(
      { thpt: { scores: { math: 8, physics: 8, chemistry: 7.98 } } },
      { selectedProgramId: 'hcmue-7140209', ...a00Context }
    );

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe('ineligible');
    expect(evaluation.score?.value).toBe(23.98);
  });

  it('marks totals at or above the program threshold as eligible and adds reference priority to the ĐXT score', () => {
    const evaluation = evaluateHcmueThptExamExactAdmission(
      { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } }, priority: { region: 'KV1', category: 'UT1' } },
      { selectedProgramId: 'hcmue-7140209', ...a00Context }
    );

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe('eligible');
    // Raw 24/30 đủ ngưỡng 24 (>=22.5 nên ưu tiên bị giảm tuyến tính): mức ưu tiên chuẩn 2.75, sau
    // giảm = [(30-24)/7.5] * 2.75 = 2.2 -> ĐXT tham khảo = 24 + 2.2 = 26.2.
    expect(evaluation.score?.value).toBe(26.2);
  });

  it('ignores priority when checking the raw threshold pass/fail (source silent on inclusion)', () => {
    const evaluation = evaluateHcmueThptExamExactAdmission(
      { thpt: { scores: { math: 8, physics: 8, chemistry: 7.98 } }, priority: { region: 'KV1', category: 'UT1' } },
      { selectedProgramId: 'hcmue-7140209', ...a00Context }
    );

    // Tổng thô 23.98 < 24 -> ineligible dù cộng ưu tiên sẽ vượt ngưỡng.
    expect(evaluation.eligibility?.status).toBe('ineligible');
  });
});
