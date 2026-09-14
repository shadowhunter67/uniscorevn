import { describe, expect, it } from 'vitest';
import type { SchoolEvaluationSummary } from './evaluateApplicantAcrossSchools';
import { buildComparisonMatrixColumn, COMPARISON_MATRIX_ROWS, getMatrixCellText, MATRIX_EMPTY_CELL } from './comparisonMatrix';

function summary(overrides: Partial<SchoolEvaluationSummary> = {}): SchoolEvaluationSummary {
  return {
    selectionId: 'sel-1',
    schoolId: 'hcmut',
    schoolName: 'Trường Đại học Bách khoa',
    shortName: 'HCMUT',
    methodId: 'combined',
    methodName: 'Xét tuyển tổng hợp',
    evaluation: {
      year: 2026,
      confidence: 'exact-verified',
      score: { value: 80.95, scale: 100 },
      explanation: [],
      missingInputs: [],
      missingRules: [],
      ...overrides.evaluation,
    } as SchoolEvaluationSummary['evaluation'],
    ...overrides,
  } as SchoolEvaluationSummary;
}

describe('comparisonMatrix', () => {
  it('đánh số nguyện vọng từ 1 theo thứ tự trong danh sách', () => {
    expect(buildComparisonMatrixColumn(summary(), 0).preferenceRank).toBe(1);
    expect(buildComparisonMatrixColumn(summary(), 2).preferenceRank).toBe(3);
  });

  it('không có mốc đối chiếu: ô chênh lệch/mốc là "—", không bịa số', () => {
    const column = buildComparisonMatrixColumn(summary(), 0);
    expect(getMatrixCellText(column, 'margin')).toBe(MATRIX_EMPTY_CELL);
    expect(getMatrixCellText(column, 'benchmark')).toBe(MATRIX_EMPTY_CELL);
    // Điểm vẫn hiện vì evaluation có score thật.
    expect(getMatrixCellText(column, 'score')).toBe('80.95 / 100');
  });

  it('phân biệt thiếu dữ liệu phía người dùng và phía hệ thống', () => {
    const userMissing = buildComparisonMatrixColumn(
      summary({
        evaluation: {
          year: 2026,
          confidence: 'partial',
          explanation: [],
          missingInputs: ['Điểm học bạ lớp 12'],
          missingRules: [],
        } as unknown as SchoolEvaluationSummary['evaluation'],
      }),
      0
    );
    expect(userMissing.needsUserInput).toBe(true);
    expect(userMissing.blockedBySystemData).toBe(false);

    const systemMissing = buildComparisonMatrixColumn(
      summary({
        evaluation: {
          year: 2026,
          confidence: 'partial',
          explanation: [],
          missingInputs: [],
          missingRules: ['Bảng quy đổi THPT - ĐGNL chưa công bố'],
        } as unknown as SchoolEvaluationSummary['evaluation'],
      }),
      0
    );
    expect(systemMissing.needsUserInput).toBe(false);
    expect(systemMissing.blockedBySystemData).toBe(true);
  });

  it('hàng của bảng theo đúng thứ tự ưu tiên đọc, đánh giá trước điểm số', () => {
    const ids = COMPARISON_MATRIX_ROWS.map((row) => row.id);
    expect(ids).toEqual(['assessment', 'margin', 'score', 'benchmark', 'confidence']);
    expect(ids.indexOf('assessment')).toBeLessThan(ids.indexOf('score'));
  });

  it('mọi hàng đều trả về chuỗi (không bao giờ undefined) cho cột bất kỳ', () => {
    const column = buildComparisonMatrixColumn(summary(), 0);
    for (const row of COMPARISON_MATRIX_ROWS) {
      expect(typeof getMatrixCellText(column, row.id)).toBe('string');
    }
  });
});
