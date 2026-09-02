import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateQnuThptExamExactAdmission } from './evaluate';
import { qnuThptExamExactGoldenCases } from './__fixtures__/officialExamples2025';

describe('QNU golden/domain-conformance coverage (qnu-thpt-exam-exact-2025)', () => {
  assertGoldenCaseProvenance(qnuThptExamExactGoldenCases);

  it.each(qnuThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateQnuThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.finalScore30);
    expect(evaluation.explanation.find((step) => step.id === 'qnu-exact-raw')?.output).toBe(goldenCase.expected.raw30);
  });
});
