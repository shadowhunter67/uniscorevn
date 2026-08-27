import { describe, expect, it } from 'vitest';
import { calculateHulThptRawScore, calculateHulThptFinalScore } from './calculator';

describe('HUL calculator', () => {
  it('calculateHulThptRawScore sums 3 subjects, no coefficient', () => {
    expect(calculateHulThptRawScore({ subject1Score: 8, subject2Score: 7.5, subject3Score: 6.25 })).toBe(21.75);
  });

  it('calculateHulThptFinalScore adds bonus + priority, caps at 30', () => {
    expect(calculateHulThptFinalScore({ raw30: 20, priority30: 0.75 })).toBe(20.75);
    expect(calculateHulThptFinalScore({ raw30: 20, priority30: 0.75, bonus30: 1 })).toBe(21.75);
    expect(calculateHulThptFinalScore({ raw30: 29.8, priority30: 0.75, bonus30: 1 })).toBe(30);
  });
});
