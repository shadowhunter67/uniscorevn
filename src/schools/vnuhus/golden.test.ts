import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateVnuhusThptExamExactAdmission } from './evaluate';
import { vnuhusThptExamExactGoldenCases } from './__fixtures__/officialExamples2025';

describe('VNU-HUS golden/domain-conformance coverage (vnuhus-thpt-exam-exact-2025)', () => {
  assertGoldenCaseProvenance(vnuhusThptExamExactGoldenCases);

  it.each(vnuhusThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateVnuhusThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.finalScore30);
    expect(evaluation.explanation.find((step) => step.id === 'vnuhus-exact-raw')?.output).toBe(goldenCase.expected.raw30);
  });
});
