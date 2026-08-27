import { describe, expect, it } from 'vitest';
import { lookupHulStandardPriority30, calculateHulPriority30 } from './priority';

describe('HUL priority', () => {
  it('lookupHulStandardPriority30 sums region + category, 0 when neither set', () => {
    expect(lookupHulStandardPriority30(undefined, undefined)).toBe(0);
    expect(lookupHulStandardPriority30('KV2', undefined)).toBe(0.25);
    expect(lookupHulStandardPriority30('KV1', 'UT1')).toBe(2.75);
  });

  it('lookupHulStandardPriority30 returns 0 for unknown codes (fail-safe, not throw)', () => {
    expect(lookupHulStandardPriority30('unknown-region', 'unknown-category')).toBe(0);
  });

  it('no reduction below 22.5/30', () => {
    const result = calculateHulPriority30({ academicScore30: 22.4, standardPriority30: 0.75 });
    expect(result).toEqual({ effectivePriority30: 0.75, reduced: false });
  });

  it('reduction applies at/above 22.5/30', () => {
    const result = calculateHulPriority30({ academicScore30: 23, standardPriority30: 0.75 });
    expect(result.reduced).toBe(true);
    expect(result.effectivePriority30).toBe(0.7);
  });

  it('zero standard priority short-circuits to 0, not reduced', () => {
    expect(calculateHulPriority30({ academicScore30: 29, standardPriority30: 0 })).toEqual({ effectivePriority30: 0, reduced: false });
  });
});
