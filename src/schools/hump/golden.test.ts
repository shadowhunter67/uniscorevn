import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateHumpThptExamExactAdmission } from './evaluate';
import { humpThptExamExactGoldenCases } from './__fixtures__/officialExamples2025';

describe('HUMP golden/domain-conformance coverage (hump-thpt-exam-exact-2025)', () => {
  assertGoldenCaseProvenance(humpThptExamExactGoldenCases);

  it.each(humpThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateHumpThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.finalScore30);
    expect(evaluation.explanation.find((step) => step.id === 'hump-exact-raw')?.output).toBe(goldenCase.expected.raw30);
  });
});
