import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateHustThptExamExactAdmission2025 } from './evaluate';
import { hustThptExamExactGoldenCases2025 } from './__fixtures__/officialExamples2025';

describe('HUST golden/domain-conformance coverage (hust-thpt-exam-exact-2025)', () => {
  assertGoldenCaseProvenance(hustThptExamExactGoldenCases2025);

  it.each(hustThptExamExactGoldenCases2025)('$id', (goldenCase) => {
    const evaluation = evaluateHustThptExamExactAdmission2025(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.finalScore30);
    expect(evaluation.explanation.find((step) => step.id === 'hust-exact-raw-2025')?.output).toBe(goldenCase.expected.raw30);
  });
});
