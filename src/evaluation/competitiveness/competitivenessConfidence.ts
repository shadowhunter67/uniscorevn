import type { ResultConfidence } from '../../core/admissionEvaluation';
import type { EvidenceConfidence } from '../../core/evidenceConfidence';
import {
  HIGH_VOLATILITY_NORMALIZED_THRESHOLD,
  MAX_CUTOFF_AGE_YEARS_FOR_HIGH_CONFIDENCE,
  MIN_HISTORY_YEARS_FOR_HIGH_CONFIDENCE,
} from './competitivenessConfig';

export type ConfidenceLabel = 'high' | 'medium' | 'low';

interface ConfidenceInput {
  evaluationConfidence: ResultConfidence;
  /** Số năm cutoff CÓ THỂ so sánh (comparable: true) đã dùng để đánh giá. */
  comparableYearCount: number;
  /** Số năm giữa năm hiện tại và năm cutoff gần nhất dùng để so sánh (0 = cùng năm). */
  mostRecentCutoffAgeYears: number;
  /** Chênh lệch margin chuẩn hóa giữa 2 năm gần nhất — undefined nếu chỉ có 1 năm. */
  volatilityNormalized?: number;
  /** EvidenceConfidence yếu nhất trong các evidence liên quan tới cutoff/công thức đang dùng. */
  worstEvidenceConfidence: EvidenceConfidence;
}

const LEVEL_RANK: Record<ConfidenceLabel, number> = { low: 1, medium: 2, high: 3 };
const RANK_TO_LEVEL: ConfidenceLabel[] = ['low', 'low', 'medium', 'high'];

/**
 * Model nội bộ — số điểm 0..1 KHÔNG được export/hiển thị cho end-user (chỉ 3 nhãn Cao/Trung bình/
 * Thấp). Deterministic: bắt đầu ở "high", mỗi tín hiệu yếu chỉ có thể HẠ cấp (cap), không có tín
 * hiệu nào tự nâng cấp lên — an toàn theo hướng thận trọng hơn là lạc quan sai.
 */
export function computeConfidence(input: ConfidenceInput): ConfidenceLabel {
  let rank = LEVEL_RANK.high;
  const cap = (label: ConfidenceLabel) => {
    rank = Math.min(rank, LEVEL_RANK[label]);
  };

  if (input.worstEvidenceConfidence === 'unverified') cap('low');
  if (input.evaluationConfidence !== 'exact-verified') cap('medium');
  if (input.comparableYearCount < MIN_HISTORY_YEARS_FOR_HIGH_CONFIDENCE) cap('medium');
  if (input.mostRecentCutoffAgeYears > MAX_CUTOFF_AGE_YEARS_FOR_HIGH_CONFIDENCE) cap('medium');
  if (input.volatilityNormalized !== undefined && input.volatilityNormalized > HIGH_VOLATILITY_NORMALIZED_THRESHOLD) cap('medium');

  return RANK_TO_LEVEL[rank];
}

export const CONFIDENCE_LABELS: Record<ConfidenceLabel, string> = {
  high: 'Cao',
  medium: 'Trung bình',
  low: 'Thấp',
};
