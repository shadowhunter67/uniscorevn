import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateQnamuThptExamExactAdmission } from './evaluate';
import { qnamuThptExamExactGoldenCases } from './__fixtures__/officialExamples2025';

describe('QNamU golden/domain-conformance coverage (qnamu-thpt-exam-exact-2025)', () => {
  assertGoldenCaseProvenance(qnamuThptExamExactGoldenCases);

  it.each(qnamuThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateQnamuThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.finalScore30);
    expect(evaluation.explanation.find((step) => step.id === 'qnamu-exact-raw')?.output).toBe(goldenCase.expected.raw30);
  });
});
