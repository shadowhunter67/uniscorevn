import { describe, expect, it } from 'vitest';
import { calculateUahThptRawScore, calculateUahThptFinalScore } from './calculator';

describe('UAH calculator', () => {
  it('calculateUahThptRawScore sums 3 subjects, no coefficient', () => {
    expect(calculateUahThptRawScore({ subject1Score: 8, subject2Score: 7.5, subject3Score: 6.25 })).toBe(21.75);
  });

  it('calculateUahThptFinalScore adds priority, caps at 30', () => {
    expect(calculateUahThptFinalScore({ raw30: 20, priority30: 0.75 })).toBe(20.75);
    expect(calculateUahThptFinalScore({ raw30: 29.8, priority30: 0.75 })).toBe(30);
  });
});
