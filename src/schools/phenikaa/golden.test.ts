import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluatePhenikaaThptExamExactAdmission } from './evaluate';
import { phenikaaThptExamExactGoldenCases } from './__fixtures__/officialExamples2026';

describe('Phenikaa golden/domain-conformance coverage (phenikaa-thpt-exam-exact-2026)', () => {
  assertGoldenCaseProvenance(phenikaaThptExamExactGoldenCases);

  it.each(phenikaaThptExamExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluatePhenikaaThptExamExactAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.finalScore30);
    expect(evaluation.explanation.find((step) => step.id === 'phenikaa-exact-raw')?.output).toBe(goldenCase.expected.raw30);
  });
});
