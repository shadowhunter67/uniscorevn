import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateUedudnThptExamExactAdmission } from './evaluate';
import { uedudnThptExamExactGoldenCases } from './__fixtures__/officialExamples2026';

describe('UED golden/domain-conformance coverage (uedudn-thpt-exam-exact-2026)', () => {
  assertGoldenCaseProvenance(uedudnThptExamExactGoldenCases);

  it.each(uedudnThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateUedudnThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.total30);
    expect(evaluation.explanation.find((step) => step.id === 'uedudn-exact-raw')?.output).toBe(goldenCase.expected.rawScore30);
  });
});
