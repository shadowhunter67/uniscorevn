import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateHnmuThptExamExactAdmission } from './evaluate';
import { hnmuThptExamExactGoldenCases } from './__fixtures__/officialExamples2026';

describe('HNMU golden/domain-conformance coverage (hnmu-thpt-exam-exact-2026)', () => {
  assertGoldenCaseProvenance(hnmuThptExamExactGoldenCases);

  it.each(hnmuThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateHnmuThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.explanation.find((step) => step.id === 'hnmu-exact-raw')?.output).toBe(goldenCase.expected.raw30);
  });
});
