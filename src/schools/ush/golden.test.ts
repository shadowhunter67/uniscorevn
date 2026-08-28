import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateUshThptExamExactAdmission } from './evaluate';
import { ushThptExamExactGoldenCases } from './__fixtures__/officialExamples2026';

describe('USH golden/domain-conformance coverage (ush-thpt-plus-talent-exact-2026)', () => {
  assertGoldenCaseProvenance(ushThptExamExactGoldenCases);

  it.each(ushThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateUshThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.rawScore30);
    expect(evaluation.explanation.find((step) => step.id === 'ush-exact-dxt')?.output).toBe(goldenCase.expected.dxt30);
  });
});
