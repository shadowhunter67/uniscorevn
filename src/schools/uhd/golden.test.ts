import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateUhdThptExamExactAdmission } from './evaluate';
import { uhdThptExamExactGoldenCases } from './__fixtures__/officialExamples2026';

describe('UHD golden/domain-conformance coverage (uhd-thpt-exam-exact-2026)', () => {
  assertGoldenCaseProvenance(uhdThptExamExactGoldenCases);

  it.each(uhdThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateUhdThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.total30);
    expect(evaluation.explanation.find((step) => step.id === 'uhd-exact-raw')?.output).toBe(goldenCase.expected.rawScore30);
  });
});
