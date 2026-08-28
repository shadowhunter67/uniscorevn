import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateVnuumpThptExamExactAdmission } from './evaluate';
import { vnuumpThptExamExactGoldenCases } from './__fixtures__/officialExamples2026';

describe('VNU-UMP golden/domain-conformance coverage (vnuump-thpt-exam-exact-2026)', () => {
  assertGoldenCaseProvenance(vnuumpThptExamExactGoldenCases);

  it.each(vnuumpThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateVnuumpThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.total30);
    expect(evaluation.explanation.find((step) => step.id === 'vnuump-exact-raw')?.output).toBe(goldenCase.expected.rawScore30);
  });
});
