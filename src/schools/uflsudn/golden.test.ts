import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateUflsudnTeacherTrainingExactAdmission } from './evaluate';
import { uflsudnTeacherTrainingExactGoldenCases } from './__fixtures__/officialExamples2026';

describe('UFLS golden/domain-conformance coverage (uflsudn-teacher-training-exact-2026)', () => {
  assertGoldenCaseProvenance(uflsudnTeacherTrainingExactGoldenCases);

  it.each(uflsudnTeacherTrainingExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateUflsudnTeacherTrainingExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.total30);
    expect(evaluation.explanation.find((step) => step.id === 'uflsudn-exact-raw')?.output).toBe(goldenCase.expected.rawScore30);
  });
});
