import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateDainamThptExamExactAdmission } from './evaluate';
import { dainamThptExamExactGoldenCases } from './__fixtures__/officialExamples2026';

describe('Dai Nam golden/domain-conformance coverage (dainam-thpt-exam-exact-2026)', () => {
  assertGoldenCaseProvenance(dainamThptExamExactGoldenCases);

  it.each(dainamThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateDainamThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.total30);
    expect(evaluation.explanation.find((step) => step.id === 'dainam-exact-raw')?.output).toBe(goldenCase.expected.total30);
  });
});
