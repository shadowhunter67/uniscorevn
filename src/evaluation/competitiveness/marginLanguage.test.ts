import { describe, expect, it } from 'vitest';
import { describeMarginSentence, describeReferenceLabel, formatMarginShort } from './marginLanguage';

const FORBIDDEN_PATTERNS = [/chắc chắn/i, /đảm bảo/i, /%/, /xác suất/i, /trúng tuyển/i, /đỗ\b/i];

describe('marginLanguage', () => {
  it('không câu nào chứa từ ngữ cấm (xác suất/cam kết đỗ)', () => {
    const samples = [
      describeMarginSentence(3.81, 'current', 2026),
      describeMarginSentence(-1.2, 'historical', 2025),
      describeMarginSentence(0, 'current', 2026),
      formatMarginShort(2.5),
      formatMarginShort(-2.5),
      formatMarginShort(0),
      describeReferenceLabel('historical', 2025),
      describeReferenceLabel('current', 2026),
    ];
    for (const text of samples) {
      for (const pattern of FORBIDDEN_PATTERNS) {
        expect(text, `"${text}" match ${pattern}`).not.toMatch(pattern);
      }
    }
  });

  it('điểm chuẩn năm hiện tại vs mốc tham khảo lịch sử gọi tên khác nhau', () => {
    expect(describeReferenceLabel('current', 2026)).toBe('điểm chuẩn 2026');
    expect(describeReferenceLabel('historical', 2025)).toBe('mức tham khảo 2025');
  });

  it('nói hướng cao/thấp bằng chữ, số làm tròn 1 chữ số', () => {
    expect(describeMarginSentence(3.81, 'current', 2026)).toBe('Bạn đang cao hơn điểm chuẩn 2026 khoảng 3.8 điểm.');
    expect(describeMarginSentence(-1.24, 'historical', 2025)).toBe('Bạn đang thấp hơn mức tham khảo 2025 khoảng 1.2 điểm.');
  });

  it('chênh lệch không đáng kể thì nói "ngang", không nói cao hơn', () => {
    expect(describeMarginSentence(0.02, 'current', 2026)).toBe('Bạn đang ngang điểm chuẩn 2026.');
    expect(formatMarginShort(0.01)).toBe('ngang mức');
  });

  it('bỏ đuôi .0 thừa', () => {
    expect(formatMarginShort(2)).toBe('+2 điểm');
    expect(describeMarginSentence(2, 'current')).toBe('Bạn đang cao hơn điểm chuẩn khoảng 2 điểm.');
  });
});
