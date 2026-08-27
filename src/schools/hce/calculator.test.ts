import { describe, expect, it } from 'vitest';
import { calculateHceThptRawScore, calculateHceThptFinalScore } from './calculator';

describe('HCE calculator', () => {
  it('calculateHceThptRawScore sums 3 subjects, no coefficient', () => {
    expect(calculateHceThptRawScore({ subject1Score: 8, subject2Score: 7.5, subject3Score: 6.25 })).toBe(21.75);
  });

  it('calculateHceThptFinalScore adds bonus + priority, caps at 30', () => {
    expect(calculateHceThptFinalScore({ raw30: 20, priority30: 0.75 })).toBe(20.75);
    expect(calculateHceThptFinalScore({ raw30: 20, priority30: 0.75, bonus30: 1 })).toBe(21.75);
    expect(calculateHceThptFinalScore({ raw30: 29.8, priority30: 0.75, bonus30: 1 })).toBe(30);
  });
});
