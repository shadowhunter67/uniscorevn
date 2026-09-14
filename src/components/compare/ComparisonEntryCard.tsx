import { ArrowDown, ArrowUp, ExternalLink, Pencil, Trash2 } from 'lucide-react';
import type { MissingRequirement } from '../../core/admissionEvaluation';
import type { SchoolEvaluationSummary } from '../../compare/evaluateApplicantAcrossSchools';
import { withMissingRequirementActions } from '../../compare/missingRequirementActions';
import { assessCompetitiveness } from '../../evaluation/competitiveness/competitiveness';
import { describeMarginSentence, describeReferenceLabel } from '../../evaluation/competitiveness/marginLanguage';
import { CONFIDENCE_LABELS } from '../../evaluation/competitiveness/competitivenessConfidence';
import { COMPETITIVENESS_BAND_LABELS, INSUFFICIENT_DATA_LABEL } from '../../evaluation/competitiveness/competitivenessLanguage';
import { ComparisonStatusBadge } from './ComparisonStatusBadge';
import { DataMissingNotice } from '../DataMissingNotice';
import { Disclosure } from '../Disclosure';
import type { ProgramOption } from './types';

/** Nút icon phụ trên đầu card (sửa/di chuyển/xóa) — vùng bấm 36px, có focus ring, chỉ nút Xóa
 * chuyển sang màu đỏ khi hover/focus (destructive không phủ đỏ sẵn). */
const ICON_BUTTON_BASE =
  'inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-border text-muted transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:cursor-not-allowed disabled:opacity-40';
const ICON_BUTTON_CLASS = `${ICON_BUTTON_BASE} hover:bg-surface-soft hover:text-ink`;
const ICON_BUTTON_DANGER_CLASS = `${ICON_BUTTON_BASE} hover:bg-danger/10 hover:text-danger`;

const BAND_MARK: Record<string, string> = {
  safer: '✓',
  competitive: '✓',
  borderline: '!',
  hard: '!',
  low: '○',
  'insufficient-data': '○',
};

function formatDifference(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}`;
}

function getRequirements(summary: SchoolEvaluationSummary): MissingRequirement[] {
  if ((summary.evaluation.missingRequirements ?? []).length > 0) {
    return withMissingRequirementActions(summary.schoolId, summary.evaluation.missingRequirements ?? []);
  }
  return [
    ...summary.evaluation.missingInputs.map((label, index) => ({ kind: 'profile-input' as const, code: `${summary.schoolId}-input-${index}`, label })),
    ...summary.evaluation.missingRules.map((label, index) => ({ kind: 'official-rule' as const, code: `${summary.schoolId}-rule-${index}`, label })),
  ];
}

/**
 * Card một nguyện vọng.
 *
 * Thứ tự đọc CỐ Ý (spec UX): (1) đánh giá mức cạnh tranh -> (2) chênh lệch nói bằng chữ ->
 * (3) điểm của bạn -> (4) mốc đối chiếu -> (5) độ tin cậy. "Điểm xét tuyển" trước đây là con số to
 * nhất trên card, nhưng bản thân nó không trả lời được câu hỏi thật của thí sinh ("mình đứng đâu so
 * với trường này?") — nay nó nằm ở lớp số liệu, còn kết luận nằm trên cùng.
 *
 * Toàn bộ phần kỹ thuật dài (các bước tính + công thức + nguồn) chuyển sang panel bên
 * (`CalculationBreakdownPanel`, mở qua `onOpenBreakdown`) để không làm lệch lưới 2 cột.
 */
export function ComparisonEntryCard({
  summary,
  program,
  combinationId,
  preferenceRank,
  canMoveUp,
  canMoveDown,
  onEdit,
  onRemove,
  onMoveUp,
  onMoveDown,
  onOpenSchool,
  onOpenBreakdown,
}: {
  summary: SchoolEvaluationSummary;
  program?: ProgramOption;
  combinationId?: string;
  /** Thứ tự nguyện vọng, bắt đầu từ 1 — hiện thành "NV1", "NV2"… */
  preferenceRank: number;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onEdit: () => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onOpenSchool: (schoolId: string) => void;
  onOpenBreakdown: () => void;
}) {
  const score = summary.evaluation.score;
  const requirements = getRequirements(summary);
  const competitiveness = assessCompetitiveness({
    evaluation: summary.evaluation,
    comparisons: summary.cutoffComparisons ?? [],
    currentYear: summary.evaluation.year,
  });
  const comparisons = summary.cutoffComparisons ?? [];
  const primaryComparison = comparisons.find((comparison) => comparison.comparable) ?? comparisons[0];
  const olderComparisons = comparisons.filter((comparison) => comparison !== primaryComparison);
  const hasAssessment = competitiveness.band !== 'insufficient-data';

  return (
    /* Card so sánh dùng radius/viền của hệ design chung (`--radius-md` + `--color-border`), KHÔNG
       dùng --radius-card/--shadow-card: 2 token đó chỉ dành cho 16 trang calculator "nặng" cũ
       (xem chú thích trong src/index.css). */
    <article aria-labelledby={`entry-title-${summary.selectionId ?? summary.schoolId}`} className="rounded-md border border-border bg-surface p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-wide text-accent">NGUYỆN VỌNG {preferenceRank}</p>
          {program ? (
            <>
              {/* Ngành nổi hơn tên trường: thí sinh chọn NGÀNH, trường là bối cảnh. */}
              <h2 id={`entry-title-${summary.selectionId ?? summary.schoolId}`} className="mt-0.5 text-base font-semibold text-ink">
                {program.code ? `${program.code} - ` : ''}
                {program.name}
              </h2>
              <p className="text-sm text-ink-soft">{summary.shortName}</p>
            </>
          ) : (
            <>
              <h2 id={`entry-title-${summary.selectionId ?? summary.schoolId}`} className="mt-0.5 text-base font-semibold text-ink">
                {summary.shortName}
              </h2>
              <p className="text-[13px] text-muted">{summary.schoolName}</p>
            </>
          )}
          <p className="mt-1 text-[13px] text-muted">
            {summary.methodName}
            {combinationId ? ` · ${combinationId}` : ''}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-1.5">
          <ComparisonStatusBadge confidence={summary.evaluation.confidence} />
          <button type="button" onClick={onEdit} title="Đổi trường/ngành của nguyện vọng này" aria-label="Đổi trường/ngành của nguyện vọng này" className={ICON_BUTTON_CLASS}>
            <Pencil size={15} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onMoveUp}
            disabled={!canMoveUp}
            title="Đưa lên một nguyện vọng"
            aria-label={`Đưa lên một nguyện vọng (hiện là nguyện vọng ${preferenceRank})`}
            className={ICON_BUTTON_CLASS}
          >
            <ArrowUp size={15} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={!canMoveDown}
            title="Đưa xuống một nguyện vọng"
            aria-label={`Đưa xuống một nguyện vọng (hiện là nguyện vọng ${preferenceRank})`}
            className={ICON_BUTTON_CLASS}
          >
            <ArrowDown size={15} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onRemove}
            title="Xóa nguyện vọng này khỏi so sánh"
            aria-label="Xóa nguyện vọng này khỏi so sánh"
            className={ICON_BUTTON_DANGER_CLASS}
          >
            <Trash2 size={15} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-3 text-sm">
        {/* (1) KẾT LUẬN — lớp 1 của mô hình phân tầng, đọc là hiểu, không cần tự tính. */}
        <div className="border-y border-border py-3">
          <p className="flex items-center gap-1.5 text-base">
            <span aria-hidden="true" className="text-muted">
              {BAND_MARK[competitiveness.band]}
            </span>
            <span className="font-semibold text-ink">
              {competitiveness.band === 'insufficient-data' ? INSUFFICIENT_DATA_LABEL : COMPETITIVENESS_BAND_LABELS[competitiveness.band]}
            </span>
          </p>
          {/* (2) Chênh lệch nói bằng chữ TRƯỚC, số kỹ thuật nằm ở lớp số liệu bên dưới. */}
          {competitiveness.rawMargin !== undefined && primaryComparison && (
            <p className="mt-1 text-sm text-ink-soft">
              {describeMarginSentence(competitiveness.rawMargin, primaryComparison.referenceType, primaryComparison.year)}
            </p>
          )}
          {!hasAssessment && (
            <p className="mt-1 text-sm text-muted">Chưa có mốc điểm chuẩn đối chiếu được cho nguyện vọng này.</p>
          )}
        </div>

        {/* (3)(4)(5) LỚP SỐ LIỆU — vẫn đầy đủ, chỉ không còn là thứ nổi nhất trên card. */}
        <dl className="space-y-1.5 text-[13px]">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <dt className="text-muted">Điểm của bạn</dt>
            <dd className="font-semibold text-ink">
              {score ? `${score.value.toFixed(2)} / ${score.scale}` : 'Chưa tính được'}
            </dd>
          </div>
          {primaryComparison && primaryComparison.referenceType !== 'none' && (
            <div className="flex flex-wrap items-baseline gap-x-2">
              <dt className="text-muted">{describeReferenceLabel(primaryComparison.referenceType, primaryComparison.year)}</dt>
              <dd className="font-semibold text-ink">
                {primaryComparison.cutoff.toFixed(2)}
                {primaryComparison.cutoffScale ? ` / ${primaryComparison.cutoffScale}` : ''}
                {primaryComparison.comparable && primaryComparison.difference !== undefined && (
                  <span className="ml-2 font-normal text-muted">(chênh lệch {formatDifference(primaryComparison.difference)})</span>
                )}
              </dd>
            </div>
          )}
          {primaryComparison?.referenceType === 'none' && (
            <p className="text-muted">{primaryComparison.reasonNotComparable}</p>
          )}
          {hasAssessment && (
            <div className="flex flex-wrap items-baseline gap-x-2">
              <dt className="text-muted">Độ tin cậy</dt>
              <dd className="text-ink-soft">{CONFIDENCE_LABELS[competitiveness.confidence]}</dd>
            </div>
          )}
          {competitiveness.source?.url && (
            <div className="flex flex-wrap items-baseline gap-x-2">
              <dt className="text-muted">Nguồn</dt>
              <dd>
                <a
                  href={competitiveness.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  {competitiveness.source.label ?? 'Xem nguồn'}
                </a>
              </dd>
            </div>
          )}
        </dl>

        {/* Mốc các năm cũ KHÔNG đặt ngang hàng với mốc chính — ẩn sau "Xem lịch sử" để không có 2
            con số cùng cỡ mà không nói rõ cái nào đang dùng để đánh giá. */}
        {olderComparisons.length > 0 && (
          <Disclosure summary={`Xem lịch sử điểm chuẩn (${olderComparisons.length} năm)`}>
            <ul className="space-y-1.5 text-[13px] text-muted">
              {olderComparisons.map((comparison) => (
                <li key={comparison.year}>
                  <span className="font-medium text-ink">
                    {describeReferenceLabel(comparison.referenceType, comparison.year)}: {comparison.cutoff.toFixed(2)}
                    {comparison.cutoffScale ? ` / ${comparison.cutoffScale}` : ''}
                  </span>
                  {comparison.comparable && comparison.difference !== undefined
                    ? ` · chênh lệch ${formatDifference(comparison.difference)}`
                    : comparison.reasonNotComparable
                      ? ` · ${comparison.reasonNotComparable}`
                      : ''}
                </li>
              ))}
            </ul>
          </Disclosure>
        )}

        {requirements.length > 0 && <DataMissingNotice requirements={requirements} />}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {summary.evaluation.explanation.length > 0 && (
          <button
            type="button"
            onClick={onOpenBreakdown}
            className="inline-flex min-h-9 cursor-pointer items-center gap-1 rounded-md border border-border px-3 text-[13px] font-medium text-ink-soft transition-colors duration-150 hover:bg-surface-soft hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            {score ? `Cách ra kết quả ${score.value.toFixed(2)}` : 'Xem cách tính'}
          </button>
        )}
        <button
          type="button"
          onClick={() => onOpenSchool(summary.schoolId)}
          className="inline-flex min-h-9 cursor-pointer items-center gap-1 rounded-md border border-accent/30 bg-accent/10 px-3 text-[13px] font-medium text-accent transition-colors duration-150 hover:bg-accent/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          Xem {summary.shortName}
          <ExternalLink size={12} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
