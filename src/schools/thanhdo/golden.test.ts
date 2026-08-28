import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateThanhdoThptExamExactAdmission } from './evaluate';
import { thanhdoThptExamExactGoldenCases } from './__fixtures__/officialExamples2026';

describe('ThanhDo golden/domain-conformance coverage (thanhdo-thpt-exam-exact-2026)', () => {
  assertGoldenCaseProvenance(thanhdoThptExamExactGoldenCases);

  it.each(thanhdoThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateThanhdoThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.total30);
    expect(evaluation.explanation.find((step) => step.id === 'thanhdo-exact-raw')?.output).toBe(goldenCase.expected.rawScore30);
  });
});
