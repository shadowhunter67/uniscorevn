import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateVnusshThptExamExactAdmission } from './evaluate';
import { vnusshThptExamExactGoldenCases } from './__fixtures__/officialExamples2025';

describe('VNU-USSH golden/domain-conformance coverage (vnussh-thpt-exam-exact-2025)', () => {
  assertGoldenCaseProvenance(vnusshThptExamExactGoldenCases);

  it.each(vnusshThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateVnusshThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.finalScore30);
    expect(evaluation.explanation.find((step) => step.id === 'vnussh-exact-raw')?.output).toBe(goldenCase.expected.raw30);
  });
});
