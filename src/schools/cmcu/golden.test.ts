import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateCmcuThptExamExactAdmission } from './evaluate';
import { cmcuThptExamExactGoldenCases } from './__fixtures__/officialExamples2026';

describe('CMCU golden/domain-conformance coverage (cmcu-thpt-exam-exact-2026)', () => {
  assertGoldenCaseProvenance(cmcuThptExamExactGoldenCases);

  it.each(cmcuThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateCmcuThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.finalScore40);
    expect(evaluation.explanation.find((step) => step.id === 'cmcu-exact-raw')?.output).toBe(goldenCase.expected.raw40);
  });
});
