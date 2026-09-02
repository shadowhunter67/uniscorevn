import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateTluThptExamExactAdmission } from './evaluate';
import { tluThptExamExactGoldenCases } from './__fixtures__/officialExamples2025';

describe('TLU golden/domain-conformance coverage (tlu-thpt-exam-exact-2025)', () => {
  assertGoldenCaseProvenance(tluThptExamExactGoldenCases);

  it.each(tluThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateTluThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.finalScore30);
    expect(evaluation.explanation.find((step) => step.id === 'tlu-exact-raw')?.output).toBe(goldenCase.expected.raw30);
  });
});
