import { describe, expect, it } from 'vitest';
import { COMPETITIVENESS_BAND_LABELS, COMPETITIVENESS_DISCLAIMER, INSUFFICIENT_DATA_LABEL } from './competitivenessLanguage';

const FORBIDDEN_PATTERNS = [/chắc chắn/i, /đảm bảo/i, /%/, /xác suất/i];

describe('competitivenessLanguage', () => {
  it('không label nào chứa từ ngữ cấm (chắc chắn/đảm bảo/%/xác suất)', () => {
    const allStrings = [...Object.values(COMPETITIVENESS_BAND_LABELS), INSUFFICIENT_DATA_LABEL, COMPETITIVENESS_DISCLAIMER];
    for (const text of allStrings) {
      for (const pattern of FORBIDDEN_PATTERNS) {
        expect(text, `"${text}" match ${pattern}`).not.toMatch(pattern);
      }
    }
  });

  it('mọi band đều có label', () => {
    for (const band of ['safer', 'competitive', 'borderline', 'hard', 'low'] as const) {
      expect(COMPETITIVENESS_BAND_LABELS[band]).toBeTruthy();
    }
  });
});
