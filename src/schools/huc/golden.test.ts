import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateHucThptExamExactAdmission } from './evaluate';
import { hucThptExamExactGoldenCases } from './__fixtures__/officialExamples2025';

describe('HUC golden/domain-conformance coverage (huc-thpt-exam-exact-2025)', () => {
  assertGoldenCaseProvenance(hucThptExamExactGoldenCases);

  it.each(hucThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateHucThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.finalScore30);
    expect(evaluation.explanation.find((step) => step.id === 'huc-exact-raw')?.output).toBe(goldenCase.expected.raw30);
  });
});
