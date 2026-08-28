import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateVnuaThptExamExactAdmission } from './evaluate';
import { vnuaThptExamExactGoldenCases } from './__fixtures__/officialExamples2026';

describe('VNUA golden/domain-conformance coverage (vnua-thpt-exam-exact-2026)', () => {
  assertGoldenCaseProvenance(vnuaThptExamExactGoldenCases);

  it.each(vnuaThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateVnuaThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.referenceDxt30);
    expect(evaluation.explanation.find((step) => step.id === 'vnua-exact-raw')?.output).toBe(goldenCase.expected.rawScore30);
  });
});
