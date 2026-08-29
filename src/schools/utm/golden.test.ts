import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateUtmThptExamExactAdmission } from './evaluate';
import { utmThptExamExactGoldenCases } from './__fixtures__/officialExamples2026';

describe('UTM golden/domain-conformance coverage (utm-thpt-exam-exact-2026)', () => {
  assertGoldenCaseProvenance(utmThptExamExactGoldenCases);

  it.each(utmThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateUtmThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.finalScore30);
    expect(evaluation.explanation.find((step) => step.id === 'utm-exact-raw')?.output).toBe(goldenCase.expected.raw30);
  });
});
