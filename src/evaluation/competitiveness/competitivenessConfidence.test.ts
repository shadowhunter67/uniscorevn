import { describe, expect, it } from 'vitest';
import { computeConfidence } from './competitivenessConfidence';

const BASE = {
  evaluationConfidence: 'exact-verified' as const,
  comparableYearCount: 2,
  mostRecentCutoffAgeYears: 0,
  volatilityNormalized: 0.001,
  worstEvidenceConfidence: 'official_primary' as const,
};

describe('computeConfidence', () => {
  it('mọi tín hiệu tốt -> high', () => {
    expect(computeConfidence(BASE)).toBe('high');
  });

  it('exact-cross-checked (không phải exact-verified) -> tối đa medium', () => {
    expect(computeConfidence({ ...BASE, evaluationConfidence: 'exact-cross-checked' })).toBe('medium');
  });

  it('chỉ 1 năm -> tối đa medium', () => {
    expect(computeConfidence({ ...BASE, comparableYearCount: 1 })).toBe('medium');
  });

  it('cutoff quá cũ -> tối đa medium', () => {
    expect(computeConfidence({ ...BASE, mostRecentCutoffAgeYears: 3 })).toBe('medium');
  });

  it('biến động cao -> tối đa medium', () => {
    expect(computeConfidence({ ...BASE, volatilityNormalized: 1 })).toBe('medium');
  });

  it('evidence unverified -> luôn low bất kể tín hiệu khác', () => {
    expect(computeConfidence({ ...BASE, worstEvidenceConfidence: 'unverified' })).toBe('low');
  });

  it('không có tín hiệu nào tự nâng cấp — chỉ hạ (monotonic cap)', () => {
    const worseInput = { ...BASE, comparableYearCount: 1, mostRecentCutoffAgeYears: 3 };
    expect(computeConfidence(worseInput)).toBe('medium');
    expect(computeConfidence({ ...worseInput, worstEvidenceConfidence: 'unverified' })).toBe('low');
  });
});
