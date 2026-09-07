import { describe, expect, it } from 'vitest';
import { DEFAULT_TEXT_SIZE, nextTextSize, parseTextSize, prevTextSize, TEXT_SIZE_LABELS, TEXT_SIZE_ORDER } from './textSize';

describe('textSize', () => {
  it('parseTextSize chỉ nhận đúng 3 giá trị hợp lệ', () => {
    expect(parseTextSize('sm')).toBe('sm');
    expect(parseTextSize('md')).toBe('md');
    expect(parseTextSize('lg')).toBe('lg');
    expect(parseTextSize(null)).toBeUndefined();
    expect(parseTextSize('')).toBeUndefined();
    expect(parseTextSize('xl')).toBeUndefined();
    expect(parseTextSize('"sm"')).toBeUndefined();
  });

  it('nextTextSize/prevTextSize clamp ở hai đầu, không cycle', () => {
    expect(nextTextSize('sm')).toBe('md');
    expect(nextTextSize('md')).toBe('lg');
    expect(nextTextSize('lg')).toBe('lg');
    expect(prevTextSize('lg')).toBe('md');
    expect(prevTextSize('md')).toBe('sm');
    expect(prevTextSize('sm')).toBe('sm');
  });

  it('mọi giá trị trong TEXT_SIZE_ORDER đều có label', () => {
    for (const size of TEXT_SIZE_ORDER) {
      expect(TEXT_SIZE_LABELS[size]).toBeTruthy();
    }
  });

  it('DEFAULT_TEXT_SIZE là "md"', () => {
    expect(DEFAULT_TEXT_SIZE).toBe('md');
  });
});
