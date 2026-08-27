import { describe, expect, it } from 'vitest';
import { calculateNctuThptRawScore, calculateNctuThptFinalScore } from './calculator';

describe('NCTU calculator', () => {
  it('calculateNctuThptRawScore sums 3 subjects, no coefficient', () => {
    expect(calculateNctuThptRawScore({ subject1Score: 8, subject2Score: 7.5, subject3Score: 6.25 })).toBe(21.75);
  });

  it('calculateNctuThptFinalScore adds priority, caps at 30', () => {
    expect(calculateNctuThptFinalScore({ raw30: 20, priority30: 0.75 })).toBe(20.75);
    expect(calculateNctuThptFinalScore({ raw30: 29.8, priority30: 0.75 })).toBe(30);
  });
});
