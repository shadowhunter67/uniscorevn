import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateLhuThptExamExactAdmission } from './evaluate';
import { lhuThptExamExactGoldenCases } from './__fixtures__/officialExamples2026';

describe('LHU golden/domain-conformance coverage (lhu-thpt-exam-exact-2026)', () => {
  assertGoldenCaseProvenance(lhuThptExamExactGoldenCases);

  it.each(lhuThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateLhuThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.finalScore30);
    expect(evaluation.explanation.find((step) => step.id === 'lhu-exact-raw')?.output).toBe(goldenCase.expected.raw30);
  });
});
