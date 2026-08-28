import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateFpfuThptExamExactAdmission } from './evaluate';
import { fpfuThptExamExactGoldenCases } from './__fixtures__/officialExamples2026';

describe('FPFU golden/domain-conformance coverage (fpfu-thpt-exam-exact-2026)', () => {
  assertGoldenCaseProvenance(fpfuThptExamExactGoldenCases);

  it.each(fpfuThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateFpfuThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.total30);
    expect(evaluation.explanation.find((step) => step.id === 'fpfu-exact-raw')?.output).toBe(goldenCase.expected.rawScore30);
  });
});
