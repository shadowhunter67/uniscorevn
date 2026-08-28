import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateTbuThptExamExactAdmission } from './evaluate';
import { tbuThptExamExactGoldenCases } from './__fixtures__/officialExamples2026';

describe('TBU golden/domain-conformance coverage (tbu-thpt-exam-exact-2026)', () => {
  assertGoldenCaseProvenance(tbuThptExamExactGoldenCases);

  it.each(tbuThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateTbuThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.total30);
    expect(evaluation.explanation.find((step) => step.id === 'tbu-exact-raw')?.output).toBe(goldenCase.expected.rawScore30);
  });
});
