import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateVnuuetThptExamExactAdmission } from './evaluate';
import { vnuuetThptExamExactGoldenCases } from './__fixtures__/officialExamples2025';

describe('VNU-UET golden/domain-conformance coverage (vnuuet-thpt-exam-exact-2025)', () => {
  assertGoldenCaseProvenance(vnuuetThptExamExactGoldenCases);

  it.each(vnuuetThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateVnuuetThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.finalScore30);
    expect(evaluation.explanation.find((step) => step.id === 'vnuuet-exact-raw')?.output).toBe(goldenCase.expected.raw30);
  });
});
