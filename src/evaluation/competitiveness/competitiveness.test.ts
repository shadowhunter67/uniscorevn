import { describe, expect, it } from 'vitest';
import type { AdmissionEvaluation } from '../../core/admissionEvaluation';
import type { CutoffComparison } from '../../core/cutoffComparison';
import { assessCompetitiveness } from './competitiveness';
import { COMPETITIVE_MARGIN_RATIO, SAFER_MARGIN_RATIO } from './competitivenessConfig';

function evaluation(overrides: Partial<AdmissionEvaluation> = {}): AdmissionEvaluation {
  return {
    schoolId: 'test',
    year: 2026,
    methodId: 'thpt',
    confidence: 'exact-verified',
    score: { value: 26.5, scale: 30 },
    missingInputs: [],
    missingRules: [],
    explanation: [],
    evidence: [],
    ...overrides,
  };
}

function comparison(overrides: Partial<CutoffComparison> = {}): CutoffComparison {
  return {
    cutoff: 26,
    cutoffScale: 30,
    applicantScore: 26.5,
    applicantScale: 30,
    difference: 0.5,
    year: 2025,
    comparable: true,
    availability: 'published',
    referenceType: 'historical',
    ...overrides,
  };
}

describe('assessCompetitiveness', () => {
  it('confidence partial/unavailable -> insufficient-data (không fabricate band)', () => {
    const result = assessCompetitiveness({
      evaluation: evaluation({ confidence: 'partial', score: undefined }),
      comparisons: [comparison()],
      currentYear: 2026,
    });
    expect(result.band).toBe('insufficient-data');
    expect(result.reasons).toContain('evaluation-not-comparable');
  });

  it('không có comparison nào comparable -> insufficient-data', () => {
    const result = assessCompetitiveness({
      evaluation: evaluation(),
      comparisons: [comparison({ comparable: false, reasonNotComparable: 'x' })],
      currentYear: 2026,
    });
    expect(result.band).toBe('insufficient-data');
    expect(result.reasons).toContain('no-comparable-cutoff');
  });

  it('margin đúng biên +1.5/30 -> safer; ngay dưới biên -> competitive', () => {
    const atBoundary = assessCompetitiveness({
      evaluation: evaluation({ score: { value: 27.5, scale: 30 } }),
      comparisons: [comparison({ difference: 1.5, cutoff: 26 })],
      currentYear: 2026,
    });
    expect(atBoundary.band).toBe('safer');

    const justBelow = assessCompetitiveness({
      evaluation: evaluation({ score: { value: 27.49, scale: 30 } }),
      comparisons: [comparison({ difference: 1.49, cutoff: 26 })],
      currentYear: 2026,
    });
    expect(justBelow.band).toBe('competitive');
  });

  it('margin 0 -> borderline; margin -1.49 -> hard; margin <= -1.5 -> low', () => {
    expect(
      assessCompetitiveness({ evaluation: evaluation(), comparisons: [comparison({ difference: 0 })], currentYear: 2026 }).band
    ).toBe('borderline');
    expect(
      assessCompetitiveness({ evaluation: evaluation(), comparisons: [comparison({ difference: -1.49 })], currentYear: 2026 }).band
    ).toBe('hard');
    // Đúng biên -1.50 rơi vào 'low' (an toàn hơn) vì đề bài để khoảng trống giữa "-1.49..-0.50" và
    // "< -1.50" — chọn diễn giải thận trọng (không lạc quan) cho đúng ranh giới.
    expect(
      assessCompetitiveness({ evaluation: evaluation(), comparisons: [comparison({ difference: -1.5 })], currentYear: 2026 }).band
    ).toBe('low');
    expect(
      assessCompetitiveness({ evaluation: evaluation(), comparisons: [comparison({ difference: -1.51 })], currentYear: 2026 }).band
    ).toBe('low');
  });

  it('thang 1200 tương đương thang 30 phải ra cùng band (chuẩn hóa theo scale)', () => {
    const scale30 = assessCompetitiveness({
      evaluation: evaluation({ score: { value: 27.5, scale: 30 } }),
      comparisons: [comparison({ difference: 1.5, cutoffScale: 30 })],
      currentYear: 2026,
    });
    const scale1200 = assessCompetitiveness({
      evaluation: evaluation({ score: { value: 1100, scale: 1200 } }),
      comparisons: [
        comparison({
          difference: 60,
          cutoff: 1040,
          cutoffScale: 1200,
          applicantScore: 1100,
          applicantScale: 1200,
        }),
      ],
      currentYear: 2026,
    });
    expect(scale1200.band).toBe(scale30.band);
  });

  it('scale không khớp -> insufficient-data thay vì so sánh sai thang', () => {
    const result = assessCompetitiveness({
      evaluation: evaluation({ score: { value: 26.5, scale: 30 } }),
      comparisons: [comparison({ cutoffScale: 100, applicantScale: 30 })],
      currentYear: 2026,
    });
    expect(result.band).toBe('insufficient-data');
    expect(result.reasons).toContain('scale-mismatch');
  });

  it('chỉ 1 năm dữ liệu -> confidence tối đa medium', () => {
    const result = assessCompetitiveness({
      evaluation: evaluation(),
      comparisons: [comparison({ year: 2026, referenceType: 'current' })],
      currentYear: 2026,
    });
    expect(result.confidence).not.toBe('high');
  });

  it('2 năm dữ liệu, năm hiện tại, không biến động, exact-verified -> confidence high', () => {
    const result = assessCompetitiveness({
      evaluation: evaluation(),
      comparisons: [
        comparison({ year: 2026, referenceType: 'current', difference: 0.5 }),
        comparison({ year: 2025, referenceType: 'historical', difference: 0.55 }),
      ],
      currentYear: 2026,
    });
    expect(result.confidence).toBe('high');
  });

  it('biến động lớn giữa 2 năm -> confidence hạ xuống medium dù đủ năm', () => {
    const result = assessCompetitiveness({
      evaluation: evaluation(),
      comparisons: [
        comparison({ year: 2026, referenceType: 'current', difference: 5 }),
        comparison({ year: 2025, referenceType: 'historical', difference: -5 }),
      ],
      currentYear: 2026,
    });
    expect(result.confidence).toBe('medium');
  });

  it('worstEvidenceConfidence unverified -> confidence low bất kể điều kiện khác tốt', () => {
    const result = assessCompetitiveness({
      evaluation: evaluation(),
      comparisons: [
        comparison({ year: 2026, referenceType: 'current' }),
        comparison({ year: 2025, referenceType: 'historical' }),
      ],
      currentYear: 2026,
      worstEvidenceConfidence: 'unverified',
    });
    expect(result.confidence).toBe('low');
  });

  it('boundary ratio đúng bằng hằng số config (đảm bảo không lệch khi đổi neo /30)', () => {
    expect(SAFER_MARGIN_RATIO).toBeCloseTo(0.05, 5);
    expect(COMPETITIVE_MARGIN_RATIO).toBeCloseTo(0.016667, 5);
  });
});
