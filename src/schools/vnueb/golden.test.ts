import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateVnuebThptExamExactAdmission } from './evaluate';
import { vnuebThptExamExactGoldenCases } from './__fixtures__/officialExamples2025';

describe('VNU-UEB golden/domain-conformance coverage (vnueb-thpt-exam-exact-2025)', () => {
  assertGoldenCaseProvenance(vnuebThptExamExactGoldenCases);

  it.each(vnuebThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateVnuebThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.finalScore30);
    expect(evaluation.explanation.find((step) => step.id === 'vnueb-exact-raw')?.output).toBe(goldenCase.expected.raw30);
  });
});
