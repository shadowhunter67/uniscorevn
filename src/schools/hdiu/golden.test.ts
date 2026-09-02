import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateHdiuThptExamExactAdmission } from './evaluate';
import { hdiuThptExamExactGoldenCases } from './__fixtures__/officialExamples2025';

describe('HDIU golden/domain-conformance coverage (hdiu-thpt-exam-exact-2025)', () => {
  assertGoldenCaseProvenance(hdiuThptExamExactGoldenCases);

  it.each(hdiuThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateHdiuThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.finalScore30);
    expect(evaluation.explanation.find((step) => step.id === 'hdiu-exact-raw')?.output).toBe(goldenCase.expected.raw30);
  });
});
