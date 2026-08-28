import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluatePntuThptExamExactAdmission } from './evaluate';
import { pntuThptExamExactGoldenCases } from './__fixtures__/officialExamples2026';

describe('PNTU golden/domain-conformance coverage (pntu-thpt-exam-exact-2026)', () => {
  assertGoldenCaseProvenance(pntuThptExamExactGoldenCases);

  it.each(pntuThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluatePntuThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.total30);
    expect(evaluation.explanation.find((step) => step.id === 'pntu-exact-raw')?.output).toBe(goldenCase.expected.rawScore30);
  });
});
