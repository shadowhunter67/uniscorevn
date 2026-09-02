import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateTvuThptExamExactAdmission } from './evaluate';
import { tvuThptExamExactGoldenCases } from './__fixtures__/officialExamples2025';

describe('TVU golden/domain-conformance coverage (tvu-thpt-exam-exact-2025)', () => {
  assertGoldenCaseProvenance(tvuThptExamExactGoldenCases);

  it.each(tvuThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateTvuThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.finalScore30);
    expect(evaluation.explanation.find((step) => step.id === 'tvu-exact-raw')?.output).toBe(goldenCase.expected.raw30);
  });
});
