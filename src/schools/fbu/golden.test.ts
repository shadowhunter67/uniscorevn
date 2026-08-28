import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateFbuThptExamExactAdmission } from './evaluate';
import { fbuThptExamExactGoldenCases } from './__fixtures__/officialExamples2026';

describe('FBU golden/domain-conformance coverage (fbu-thpt-exam-exact-2026)', () => {
  assertGoldenCaseProvenance(fbuThptExamExactGoldenCases);

  it.each(fbuThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateFbuThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.total30);
    expect(evaluation.explanation.find((step) => step.id === 'fbu-exact-raw')?.output).toBe(goldenCase.expected.rawScore30);
  });
});
