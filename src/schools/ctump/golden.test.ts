import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateCtumpThptExamExactAdmission } from './evaluate';
import { ctumpThptExamExactGoldenCases } from './__fixtures__/officialExamples2026';

describe('CTUMP golden/domain-conformance coverage (ctump-thpt-exam-exact-2026)', () => {
  assertGoldenCaseProvenance(ctumpThptExamExactGoldenCases);

  it.each(ctumpThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateCtumpThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.total30);
    expect(evaluation.explanation.find((step) => step.id === 'ctump-exact-raw')?.output).toBe(goldenCase.expected.rawScore30);
  });
});
