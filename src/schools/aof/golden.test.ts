import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateAofThptExamExactAdmission2025 } from './evaluate';
import { aofThptExamExactGoldenCases2025 } from './__fixtures__/officialExamples2025';

describe('AOF golden/domain-conformance coverage (aof-thpt-exam-exact-2025)', () => {
  assertGoldenCaseProvenance(aofThptExamExactGoldenCases2025);

  it.each(aofThptExamExactGoldenCases2025)('$id', (goldenCase) => {
    const evaluation = evaluateAofThptExamExactAdmission2025(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.finalScore30);
    expect(evaluation.explanation.find((step) => step.id === 'aof-exact-raw-2025')?.output).toBe(goldenCase.expected.raw30);
  });
});
