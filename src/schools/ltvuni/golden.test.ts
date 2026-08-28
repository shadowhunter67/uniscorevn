import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateLtvuniThptExamExactAdmission } from './evaluate';
import { ltvuniThptExamExactGoldenCases } from './__fixtures__/officialExamples2026';

describe('LTVUni golden/domain-conformance coverage (ltvuni-thpt-exam-exact-2026)', () => {
  assertGoldenCaseProvenance(ltvuniThptExamExactGoldenCases);

  it.each(ltvuniThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateLtvuniThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.total30);
    expect(evaluation.explanation.find((step) => step.id === 'ltvuni-exact-raw')?.output).toBe(goldenCase.expected.rawScore30);
  });
});
