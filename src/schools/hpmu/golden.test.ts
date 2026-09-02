import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateHpmuThptExamExactAdmission } from './evaluate';
import { hpmuThptExamExactGoldenCases } from './__fixtures__/officialExamples2025';

describe('HPMU golden/domain-conformance coverage (hpmu-thpt-exam-exact-2025)', () => {
  assertGoldenCaseProvenance(hpmuThptExamExactGoldenCases);

  it.each(hpmuThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateHpmuThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.finalScore30);
    expect(evaluation.explanation.find((step) => step.id === 'hpmu-exact-raw')?.output).toBe(goldenCase.expected.raw30);
  });
});
