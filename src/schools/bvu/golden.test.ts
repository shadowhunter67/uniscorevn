import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateBvuThptExamExactAdmission } from './evaluate';
import { bvuThptExamExactGoldenCases } from './__fixtures__/officialExamples2026';

describe('BVU golden/domain-conformance coverage (bvu-thpt-exam-exact-2026)', () => {
  assertGoldenCaseProvenance(bvuThptExamExactGoldenCases);

  it.each(bvuThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateBvuThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.total30);
    expect(evaluation.explanation.find((step) => step.id === 'bvu-exact-raw')?.output).toBe(goldenCase.expected.rawScore30);
  });
});
