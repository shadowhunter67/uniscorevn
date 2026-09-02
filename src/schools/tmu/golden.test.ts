import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateTmuThptExamAdmission } from './evaluate';
import { tmuThptExamExactGoldenCases } from './__fixtures__/officialExamples2025';

describe('TMU golden/domain-conformance coverage (tmu-thpt-exam-exact-2025)', () => {
  assertGoldenCaseProvenance(tmuThptExamExactGoldenCases);

  it.each(tmuThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateTmuThptExamAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.finalScore30);
    expect(evaluation.explanation.find((step) => step.id === 'tmu-exact-raw')?.output).toBe(goldenCase.expected.raw30);
  });
});
