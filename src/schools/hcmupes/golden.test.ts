import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { evaluateHcmupesAdmission } from './evaluate';
import { hcmupesGdtcExactGoldenCases } from './__fixtures__/officialExamples2026';

describe('HCMUPES golden/domain-conformance coverage (hcmupes-thpt-plus-talent-2026)', () => {
  assertGoldenCaseProvenance(hcmupesGdtcExactGoldenCases);

  it.each(hcmupesGdtcExactGoldenCases)('$id', (goldenCase) => {
    const evaluation = evaluateHcmupesAdmission(goldenCase.input.profile, goldenCase.input.context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe(goldenCase.expected.eligible ? 'eligible' : 'ineligible');
    expect(evaluation.score?.value).toBe(goldenCase.expected.total30);
  });
});
