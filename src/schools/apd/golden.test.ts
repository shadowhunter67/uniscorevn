import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateApdThptExamExactAdmission } from './evaluate';
import { apdThptExamExactGoldenCases } from './__fixtures__/officialExamples2026';

describe('APD golden/domain-conformance coverage (apd-thpt-exam-exact-2026)', () => {
  assertGoldenCaseProvenance(apdThptExamExactGoldenCases);

  it.each(apdThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateApdThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.total30);
    expect(evaluation.explanation.find((step) => step.id === 'apd-exact-raw')?.output).toBe(goldenCase.expected.rawScore30);
  });
});
