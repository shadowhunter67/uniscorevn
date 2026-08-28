import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateAjcThptExamExactAdmission } from './evaluate';
import { ajcThptExamExactGoldenCases } from './__fixtures__/officialExamples2026';

describe('AJC golden/domain-conformance coverage (ajc-thpt-exam-exact-2026)', () => {
  assertGoldenCaseProvenance(ajcThptExamExactGoldenCases);

  it.each(ajcThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateAjcThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.total);
    expect(evaluation.explanation.find((step) => step.id === 'ajc-exact-raw')?.output).toBe(goldenCase.expected.rawScore);
  });
});
