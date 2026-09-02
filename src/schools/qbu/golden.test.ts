import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateQbuThptExamExactAdmission } from './evaluate';
import { qbuThptExamExactGoldenCases } from './__fixtures__/officialExamples2025';

describe('QBU golden/domain-conformance coverage (qbu-thpt-exam-exact-2025)', () => {
  assertGoldenCaseProvenance(qbuThptExamExactGoldenCases);

  it.each(qbuThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateQbuThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.finalScore30);
    expect(evaluation.explanation.find((step) => step.id === 'qbu-exact-raw')?.output).toBe(goldenCase.expected.raw30);
  });
});
