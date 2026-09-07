import type { AdmissionEvaluation } from '../../core/admissionEvaluation';
import type { CutoffComparison } from '../../core/cutoffComparison';
import { canCompareEvaluationToCutoff } from '../../compare/cutoffEligibility';
import type { EvidenceConfidence } from '../../core/evidenceConfidence';
import { bandFromNormalizedMargin, type CompetitivenessBand } from './competitivenessConfig';
import { computeConfidence, type ConfidenceLabel } from './competitivenessConfidence';

export type CompetitivenessReasonCode =
  | 'evaluation-not-comparable'
  | 'no-comparable-cutoff'
  | 'scale-mismatch';

export interface CompetitivenessAssessment {
  band: CompetitivenessBand | 'insufficient-data';
  normalizedMargin?: number;
  rawMargin?: number;
  scale?: number;
  referenceYear?: number;
  referenceType?: CutoffComparison['referenceType'];
  confidence: ConfidenceLabel;
  reasons: CompetitivenessReasonCode[];
  source?: { label?: string; url?: string };
}

interface AssessCompetitivenessInput {
  evaluation: AdmissionEvaluation;
  /** Kết quả `findRecentCutoffComparisons` — thứ tự năm gần nhất trước (đã đúng theo hàm gốc). */
  comparisons: CutoffComparison[];
  currentYear: number;
  /** EvidenceConfidence yếu nhất trong evidence liên quan tới công thức/cutoff — caller tự chọn
   * (thường là `Math.min` theo mức độ tin cậy của evidence[] của evaluation). Mặc định
   * 'official_primary' nếu không truyền (không hạ confidence oan khi caller chưa có dữ liệu này). */
  worstEvidenceConfidence?: EvidenceConfidence;
}

/**
 * Đánh giá mức độ cạnh tranh — deterministic, evidence-based, KHÔNG BAO GIỜ trả về band giả khi
 * thiếu dữ liệu (luôn `insufficient-data` kèm `reasons[]` máy đọc được). Gate cứng theo thứ tự:
 * 1. `canCompareEvaluationToCutoff` (điểm phải exact-verified/exact-cross-checked, có value+scale).
 * 2. Có ít nhất 1 `CutoffComparison.comparable === true`.
 * 3. Thang điểm cutoff khớp thang điểm ứng viên (đã được `cutoffComparison.ts` đảm bảo qua
 *    `comparable`, kiểm tra lại ở đây cho chắc — không tin ngược một field đã tính từ nơi khác).
 */
export function assessCompetitiveness(input: AssessCompetitivenessInput): CompetitivenessAssessment {
  if (!canCompareEvaluationToCutoff(input.evaluation)) {
    return { band: 'insufficient-data', confidence: 'low', reasons: ['evaluation-not-comparable'] };
  }

  const comparable = input.comparisons.filter((comparison) => comparison.comparable);
  if (comparable.length === 0) {
    return { band: 'insufficient-data', confidence: 'low', reasons: ['no-comparable-cutoff'] };
  }

  const primary = comparable[0];
  const scale = primary.cutoffScale ?? primary.applicantScale;
  if (!Number.isFinite(scale) || scale <= 0 || scale !== primary.applicantScale) {
    return { band: 'insufficient-data', confidence: 'low', reasons: ['scale-mismatch'] };
  }

  const rawMargin = primary.difference ?? primary.applicantScore - primary.cutoff;
  const normalizedMargin = rawMargin / scale;
  const band = bandFromNormalizedMargin(normalizedMargin);

  let volatilityNormalized: number | undefined;
  if (comparable.length >= 2) {
    const secondaryScale = comparable[1].cutoffScale ?? comparable[1].applicantScale;
    if (secondaryScale === scale) {
      const secondaryMargin = (comparable[1].difference ?? comparable[1].applicantScore - comparable[1].cutoff) / secondaryScale;
      volatilityNormalized = Math.abs(normalizedMargin - secondaryMargin);
    }
  }

  const confidence = computeConfidence({
    evaluationConfidence: input.evaluation.confidence,
    comparableYearCount: comparable.length,
    mostRecentCutoffAgeYears: Math.max(0, input.currentYear - primary.year),
    volatilityNormalized,
    worstEvidenceConfidence: input.worstEvidenceConfidence ?? 'official_primary',
  });

  return {
    band,
    normalizedMargin,
    rawMargin,
    scale,
    referenceYear: primary.year,
    referenceType: primary.referenceType,
    confidence,
    reasons: [],
    source: primary.source,
  };
}
