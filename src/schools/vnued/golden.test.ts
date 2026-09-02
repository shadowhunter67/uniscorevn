import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateVnuedThptExamExactAdmission } from './evaluate';
import { vnuedThptExamExactGoldenCases } from './__fixtures__/officialExamples2025';

describe('VNU-UED golden/domain-conformance coverage (vnued-thpt-exam-exact-2025)', () => {
  assertGoldenCaseProvenance(vnuedThptExamExactGoldenCases);

  it.each(vnuedThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateVnuedThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.finalScore30);
    expect(evaluation.explanation.find((step) => step.id === 'vnued-exact-raw')?.output).toBe(goldenCase.expected.raw30);
  });
});
