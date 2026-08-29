import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateBavThptExamExactAdmission } from './evaluate';
import { bavThptExamExactGoldenCases } from './__fixtures__/officialExamples2026';

describe('BAV golden/domain-conformance coverage (bav-thpt-exam-exact-2026)', () => {
  assertGoldenCaseProvenance(bavThptExamExactGoldenCases);

  it.each(bavThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateBavThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.finalScore30);
    expect(evaluation.explanation.find((step) => step.id === 'bav-exact-raw')?.output).toBe(goldenCase.expected.weighted30);
  });
});
