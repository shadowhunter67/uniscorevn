import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateHmuThptExamExactAdmission } from './evaluate';
import { hmuThptExamExactGoldenCases } from './__fixtures__/officialExamples2026';

describe('HMU golden/domain-conformance coverage (hmu-thpt-exam-exact-2026)', () => {
  assertGoldenCaseProvenance(hmuThptExamExactGoldenCases);

  it.each(hmuThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateHmuThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.raw30);
    expect(evaluation.explanation.find((step) => step.id === 'hmu-exact-raw')?.output).toBe(goldenCase.expected.raw30);
  });
});
