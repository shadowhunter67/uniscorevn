import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateHunreThptExamExactAdmission } from './evaluate';
import { hunreThptExamExactGoldenCases } from './__fixtures__/officialExamples2025';

describe('HUNRE golden/domain-conformance coverage (hunre-thpt-exam-exact-2025)', () => {
  assertGoldenCaseProvenance(hunreThptExamExactGoldenCases);

  it.each(hunreThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateHunreThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.finalScore30);
    expect(evaluation.explanation.find((step) => step.id === 'hunre-exact-raw')?.output).toBe(goldenCase.expected.raw30);
  });
});
