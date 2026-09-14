import { describe, expect, it } from 'vitest';
import type { FieldMatch } from './fieldRecommendation';
import {
  classifyInsufficientMatch,
  groupInsufficientMatches,
  INSUFFICIENT_REASON_HINTS,
  INSUFFICIENT_REASON_LABELS,
} from './insufficientDataBreakdown';

function match(evaluation: Partial<FieldMatch['evaluation']>): FieldMatch {
  return {
    schoolId: 's',
    schoolName: 'Trường',
    shortName: 'S',
    programId: 'p',
    programName: 'Ngành',
    evaluation: { year: 2026, confidence: 'partial', explanation: [], missingInputs: [], missingRules: [], ...evaluation } as FieldMatch['evaluation'],
    competitiveness: { band: 'insufficient-data', confidence: 'low', reasons: [] },
  };
}

describe('insufficientDataBreakdown', () => {
  it('thiếu điểm hồ sơ -> lý do thí sinh tự xử lý được', () => {
    expect(classifyInsufficientMatch(match({ missingInputs: ['Điểm học bạ lớp 12'] }))).toBe('needs-user-input');
  });

  it('thiếu quy định/công thức -> lý do phía công cụ', () => {
    expect(classifyInsufficientMatch(match({ missingRules: ['Chưa công bố bảng quy đổi'] }))).toBe('missing-system-rule');
  });

  it('không thiếu gì nhưng vẫn không đánh giá được -> thiếu mốc điểm chuẩn', () => {
    expect(classifyInsufficientMatch(match({}))).toBe('no-comparable-cutoff');
  });

  it('vướng cả hai thì ưu tiên lý do thí sinh hành động được', () => {
    expect(classifyInsufficientMatch(match({ missingInputs: ['a'], missingRules: ['b'] }))).toBe('needs-user-input');
  });

  it('group giữ thứ tự ưu tiên, bỏ nhóm rỗng, không mất lựa chọn nào', () => {
    const input = [match({ missingRules: ['b'] }), match({ missingInputs: ['a'] }), match({})];
    const groups = groupInsufficientMatches(input);
    expect(groups.map((group) => group.reason)).toEqual(['needs-user-input', 'missing-system-rule', 'no-comparable-cutoff']);
    expect(groups.reduce((total, group) => total + group.matches.length, 0)).toBe(input.length);
    expect(groupInsufficientMatches([match({ missingInputs: ['a'] })]).map((group) => group.reason)).toEqual(['needs-user-input']);
  });

  it('nhãn lý do phía công cụ nêu đích danh UniScoreVN, không đổ lỗi cho thí sinh', () => {
    expect(INSUFFICIENT_REASON_LABELS['missing-system-rule']).toContain('UniScoreVN');
    expect(INSUFFICIENT_REASON_HINTS['missing-system-rule']).toContain('không phải do hồ sơ của bạn');
  });
});
