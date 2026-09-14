import type { SchoolEvaluationSummary } from './evaluateApplicantAcrossSchools';
import { getEvaluationDisplayStatus, evaluationDisplayLabel, type EvaluationDisplayStatus } from './evaluationDisplay';
import { assessCompetitiveness } from '../evaluation/competitiveness/competitiveness';
import { COMPETITIVENESS_BAND_LABELS, INSUFFICIENT_DATA_LABEL } from '../evaluation/competitiveness/competitivenessLanguage';
import { CONFIDENCE_LABELS } from '../evaluation/competitiveness/competitivenessConfidence';
import { formatMarginShort, describeReferenceLabel } from '../evaluation/competitiveness/marginLanguage';
import { groupMissingRequirements } from './missingRequirementGroups';
import { withMissingRequirementActions } from './missingRequirementActions';
import type { MissingRequirement } from '../core/admissionEvaluation';

/**
 * Dựng dữ liệu cho BẢNG so sánh ngang (`ComparisonSummaryMatrix`). Thuần logic, không React —
 * để test được "đọc một hàng là so được hết các nguyện vọng" mà không cần render.
 *
 * Lý do có bảng này: trước đây trang so sánh chỉ là N card đặt cạnh nhau, muốn so "nguyện vọng nào
 * chênh lệch tốt hơn" phải đọc hết card A rồi cuộn sang card B rồi nhớ lại số của A. Bảng đảo trục:
 * mỗi HÀNG là một tiêu chí, mỗi CỘT là một nguyện vọng.
 *
 * KHÔNG tự tính điểm/chênh lệch: mọi số đều lấy từ `evaluation` và `cutoffComparisons` đã có, hàm
 * này chỉ chọn cái nào hiển thị và định dạng chuỗi.
 */
export interface ComparisonMatrixColumn {
  selectionId?: string;
  schoolId: string;
  /** Thứ tự nguyện vọng bắt đầu từ 1 — "NV1", "NV2"… */
  preferenceRank: number;
  shortName: string;
  programName?: string;
  methodName: string;
  status: EvaluationDisplayStatus;
  statusLabel: string;
  /** Nhãn band cạnh tranh, hoặc `INSUFFICIENT_DATA_LABEL` khi chưa đánh giá được. */
  assessmentLabel: string;
  /** `undefined` khi không có mốc đối chiếu so được. */
  marginLabel?: string;
  marginPositive?: boolean;
  scoreLabel?: string;
  benchmarkLabel?: string;
  confidenceLabel?: string;
  /** Có mục nào thí sinh tự bổ sung được không (để bảng gợi ý bước tiếp theo đúng người). */
  needsUserInput: boolean;
  /** Có phần nào hệ thống chưa số hoá được không. */
  blockedBySystemData: boolean;
}

function collectRequirements(summary: SchoolEvaluationSummary): MissingRequirement[] {
  if ((summary.evaluation.missingRequirements ?? []).length > 0) {
    return withMissingRequirementActions(summary.schoolId, summary.evaluation.missingRequirements ?? []);
  }
  return [
    ...summary.evaluation.missingInputs.map((label, index) => ({ kind: 'profile-input' as const, code: `${summary.schoolId}-input-${index}`, label })),
    ...summary.evaluation.missingRules.map((label, index) => ({ kind: 'official-rule' as const, code: `${summary.schoolId}-rule-${index}`, label })),
  ];
}

export function buildComparisonMatrixColumn(
  summary: SchoolEvaluationSummary,
  index: number,
  programName?: string
): ComparisonMatrixColumn {
  const status = getEvaluationDisplayStatus(summary.evaluation.confidence);
  const competitiveness = assessCompetitiveness({
    evaluation: summary.evaluation,
    comparisons: summary.cutoffComparisons ?? [],
    currentYear: summary.evaluation.year,
  });
  const primaryCutoff = (summary.cutoffComparisons ?? []).find((comparison) => comparison.comparable);
  const grouped = groupMissingRequirements(collectRequirements(summary));
  const score = summary.evaluation.score;

  return {
    selectionId: summary.selectionId,
    schoolId: summary.schoolId,
    preferenceRank: index + 1,
    shortName: summary.shortName,
    programName,
    methodName: summary.methodName,
    status,
    statusLabel: evaluationDisplayLabel(status),
    assessmentLabel:
      competitiveness.band === 'insufficient-data' ? INSUFFICIENT_DATA_LABEL : COMPETITIVENESS_BAND_LABELS[competitiveness.band],
    marginLabel: competitiveness.rawMargin !== undefined ? formatMarginShort(competitiveness.rawMargin) : undefined,
    marginPositive: competitiveness.rawMargin !== undefined ? competitiveness.rawMargin >= 0 : undefined,
    scoreLabel: score ? `${score.value.toFixed(2)} / ${score.scale}` : undefined,
    benchmarkLabel: primaryCutoff
      ? `${primaryCutoff.cutoff.toFixed(2)}${primaryCutoff.cutoffScale ? ` / ${primaryCutoff.cutoffScale}` : ''} · ${describeReferenceLabel(primaryCutoff.referenceType, primaryCutoff.year)}`
      : undefined,
    confidenceLabel: competitiveness.band === 'insufficient-data' ? undefined : CONFIDENCE_LABELS[competitiveness.confidence],
    needsUserInput: grouped.user.length > 0,
    blockedBySystemData: grouped.system.length > 0,
  };
}

/** Các hàng của bảng, theo đúng thứ tự ưu tiên đọc: đánh giá -> chênh lệch -> điểm -> mốc -> tin cậy. */
export const COMPARISON_MATRIX_ROWS = [
  { id: 'assessment', label: 'Đánh giá' },
  { id: 'margin', label: 'Chênh lệch' },
  { id: 'score', label: 'Điểm của bạn' },
  { id: 'benchmark', label: 'Mốc tham khảo' },
  { id: 'confidence', label: 'Độ tin cậy' },
] as const;

export type ComparisonMatrixRowId = (typeof COMPARISON_MATRIX_ROWS)[number]['id'];

/** Ô trống hiển thị bằng "—" chứ không để rỗng (screen reader đọc được, mắt thường thấy có ô). */
export const MATRIX_EMPTY_CELL = '—';

export function getMatrixCellText(column: ComparisonMatrixColumn, rowId: ComparisonMatrixRowId): string {
  switch (rowId) {
    case 'assessment':
      return column.assessmentLabel;
    case 'margin':
      return column.marginLabel ?? MATRIX_EMPTY_CELL;
    case 'score':
      return column.scoreLabel ?? MATRIX_EMPTY_CELL;
    case 'benchmark':
      return column.benchmarkLabel ?? MATRIX_EMPTY_CELL;
    case 'confidence':
      return column.confidenceLabel ?? MATRIX_EMPTY_CELL;
  }
}
