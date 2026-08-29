import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateUttThptExamExactAdmission } from './evaluate';
import { uttThptExamExactGoldenCases } from './__fixtures__/officialExamples2026';

describe('UTT golden/domain-conformance coverage (utt-thpt-exam-exact-2026)', () => {
  assertGoldenCaseProvenance(uttThptExamExactGoldenCases);

  it.each(uttThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateUttThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.finalScore30);
    expect(evaluation.explanation.find((step) => step.id === 'utt-exact-raw')?.output).toBe(goldenCase.expected.raw30);
  });
});
