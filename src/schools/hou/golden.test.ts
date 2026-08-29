import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateHouThptExamExactAdmission } from './evaluate';
import { houThptExamExactGoldenCases } from './__fixtures__/officialExamples2026';

describe('HOU golden/domain-conformance coverage (hou-thpt-exam-exact-2026)', () => {
  assertGoldenCaseProvenance(houThptExamExactGoldenCases);

  it.each(houThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateHouThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.finalScore30);
    expect(evaluation.explanation.find((step) => step.id === 'hou-exact-raw')?.output).toBe(goldenCase.expected.raw30);
  });
});
