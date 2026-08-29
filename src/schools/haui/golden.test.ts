import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateHauiThptExamExactAdmission } from './evaluate';
import { hauiThptExamExactGoldenCases } from './__fixtures__/officialExamples2026';

describe('HAUI golden/domain-conformance coverage (haui-thpt-exam-exact-2026)', () => {
  assertGoldenCaseProvenance(hauiThptExamExactGoldenCases);

  it.each(hauiThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateHauiThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.finalScore30);
    expect(evaluation.explanation.find((step) => step.id === 'haui-exact-raw')?.output).toBe(goldenCase.expected.raw30);
  });
});
