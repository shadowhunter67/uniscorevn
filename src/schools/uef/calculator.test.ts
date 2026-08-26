import { describe, expect, it } from 'vitest';
import { calculateUefThptRawScore, calculateUefThptFinalScore } from './calculator';

describe('UEF calculator', () => {
  it('calculateUefThptRawScore sums 3 subjects, no coefficient', () => {
    expect(calculateUefThptRawScore({ subject1Score: 8, subject2Score: 7.5, subject3Score: 6.25 })).toBe(21.75);
  });

  it('calculateUefThptFinalScore adds priority, caps at 30', () => {
    expect(calculateUefThptFinalScore({ raw30: 20, priority30: 0.75 })).toBe(20.75);
    expect(calculateUefThptFinalScore({ raw30: 29.8, priority30: 0.75 })).toBe(30);
  });
});
