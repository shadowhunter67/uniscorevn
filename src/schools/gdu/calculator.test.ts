import { describe, expect, it } from 'vitest';
import { calculateGduThptRawScore, calculateGduThptFinalScore } from './calculator';

describe('GDU calculator', () => {
  it('calculateGduThptRawScore sums 3 subjects, no coefficient', () => {
    expect(calculateGduThptRawScore({ subject1Score: 8, subject2Score: 7.5, subject3Score: 6.25 })).toBe(21.75);
  });

  it('calculateGduThptFinalScore adds priority, caps at 30', () => {
    expect(calculateGduThptFinalScore({ raw30: 20, priority30: 0.75 })).toBe(20.75);
    expect(calculateGduThptFinalScore({ raw30: 29.8, priority30: 0.75 })).toBe(30);
  });
});
