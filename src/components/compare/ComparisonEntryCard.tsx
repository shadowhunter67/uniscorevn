import { ArrowDown, ArrowUp, ExternalLink, Pencil, Trash2 } from 'lucide-react';
import type { MissingRequirement } from '../../core/admissionEvaluation';
import type { SchoolEvaluationSummary } from '../../compare/evaluateApplicantAcrossSchools';
import { withMissingRequirementActions } from '../../compare/missingRequirementActions';
import { assessCompetitiveness } from '../../evaluation/competitiveness/competitiveness';
import { CompetitivenessRow } from '../CompetitivenessRow';
import { CompetitivenessExplanation } from '../CompetitivenessExplanation';
import { ComparisonStatusBadge } from './ComparisonStatusBadge';
import { Disclosure } from '../Disclosure';
import type { ProgramOption } from './types';

/** Nút icon phụ trên đầu card (sửa/di chuyển/xóa) — vùng bấm 32px, có focus ring, chỉ nút Xóa
 * chuyển sang màu đỏ khi hover/focus (destructive không phủ đỏ sẵn). */
const ICON_BUTTON_BASE =
  'inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-border text-muted transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:cursor-not-allowed disabled:opacity-40';
const ICON_BUTTON_CLASS = `${ICON_BUTTON_BASE} hover:bg-surface-soft hover:text-ink`;
const ICON_BUTTON_DANGER_CLASS = `${ICON_BUTTON_BASE} hover:bg-danger/10 hover:text-danger`;

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

export function ComparisonEntryCard({
  summary,
  program,
  combinationId,
  canMoveUp,
  canMoveDown,
  onEdit,
  onRemove,
  onMoveUp,
  onMoveDown,
  onOpenSchool,
}: {
  summary: SchoolEvaluationSummary;
  program?: ProgramOption;
  combinationId?: string;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onEdit: () => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onOpenSchool: (schoolId: string) => void;
}) {
  const score = summary.evaluation.score;
  const requirements = getRequirements(summary);
  const competitiveness = assessCompetitiveness({
    evaluation: summary.evaluation,
    comparisons: summary.cutoffComparisons ?? [],
    currentYear: summary.evaluation.year,
  });

  return (
    /* Card so sánh dùng radius/viền của hệ design chung (`--radius-md` + `--color-border`), KHÔNG
       dùng --radius-card/--shadow-card: 2 token đó chỉ dành cho 16 trang calculator "nặng" cũ
       (xem chú thích trong src/index.css). */
    <article className="rounded-md border border-border bg-surface p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-ink">{summary.shortName}</h2>
          <p className="text-[13px] text-muted">{summary.schoolName}</p>
          {program && (
            <p className="mt-1.5 text-sm font-medium text-ink">
              {program.code ? `${program.code} - ` : ''}
              {program.name}
            </p>
          )}
          <p className="mt-1 text-[13px] text-muted">
            {summary.methodName}
            {combinationId ? ` · ${combinationId}` : ''}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-1.5">
          <ComparisonStatusBadge confidence={summary.evaluation.confidence} />
          <button type="button" onClick={onEdit} title="Đổi ngành/trường" aria-label="Đổi ngành/trường" className={ICON_BUTTON_CLASS}>
            <Pencil size={15} aria-hidden="true" />
          </button>
          <button type="button" onClick={onMoveUp} disabled={!canMoveUp} title="Lên trên" aria-label="Lên trên" className={ICON_BUTTON_CLASS}>
            <ArrowUp size={15} aria-hidden="true" />
          </button>
          <button type="button" onClick={onMoveDown} disabled={!canMoveDown} title="Xuống dưới" aria-label="Xuống dưới" className={ICON_BUTTON_CLASS}>
            <ArrowDown size={15} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onRemove}
            title="Xóa khỏi so sánh"
            aria-label="Xóa khỏi so sánh"
            className={ICON_BUTTON_DANGER_CLASS}
          >
            <Trash2 size={15} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-3 text-sm">
        {/* Điểm xét tuyển của hồ sơ = số quan trọng nhất trên card, phải đọc được ngay không cần mở
            accordion nào (thứ tự đọc: trường → ngành → phương thức → điểm → điểm chuẩn → chênh lệch). */}
        {score ? (
          <p className="flex items-baseline gap-2 border-y border-border py-2.5">
            <span className="text-[13px] text-muted">Điểm xét tuyển</span>
            <strong className="text-xl font-bold text-primary">{score.value.toFixed(2)}</strong>
            <span className="text-[13px] text-muted">/ {score.scale}</span>
          </p>
        ) : (
          <p className="border-y border-border py-2.5 text-[13px] text-muted">Chưa có điểm xét tuyển cuối cùng để so sánh.</p>
        )}

        {summary.cutoffComparisons && summary.cutoffComparisons.length > 0 && (
          <div className="rounded-md bg-surface-soft p-3 text-[13px]">
            {summary.cutoffComparisons[0].referenceType === 'none' ? (
              <p className="text-muted">{summary.cutoffComparisons[0].reasonNotComparable}</p>
            ) : (
              <div className="space-y-2">
                {summary.cutoffComparisons.map((cutoffComparison) => (
                  <div key={cutoffComparison.year} className={cutoffComparison !== summary.cutoffComparisons![0] ? 'border-t border-border pt-2' : undefined}>
                    <p className="font-medium text-ink">
                      {cutoffComparison.referenceType === 'historical' ? 'Mốc tham khảo' : 'Điểm chuẩn'} {cutoffComparison.year}: {cutoffComparison.cutoff.toFixed(2)}
                      {cutoffComparison.cutoffScale ? ` / ${cutoffComparison.cutoffScale}` : ''}
                    </p>
                    {cutoffComparison.comparable && cutoffComparison.difference !== undefined ? (
                      <p className="mt-1 text-muted">
                        Chênh lệch: <span className="font-semibold text-ink">{formatDifference(cutoffComparison.difference)}</span>
                      </p>
                    ) : (
                      <p className="mt-1 text-muted">{cutoffComparison.reasonNotComparable}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {competitiveness.band !== 'insufficient-data' && (
          <div>
            <CompetitivenessRow assessment={competitiveness} />
            <CompetitivenessExplanation assessment={competitiveness} />
          </div>
        )}

        {/* "Đã tính được" trước đây luôn mở, chiếm nhiều chiều cao trên mọi card và đẩy phần so sánh
            điểm chuẩn của card kế tiếp ra khỏi màn hình. Nay gấp mặc định — KHÔNG bỏ dữ liệu nào. */}
        {summary.evaluation.explanation.length > 0 && (
          <Disclosure summary={`Đã tính được (${summary.evaluation.explanation.length} bước)`}>
            <ul className="space-y-1 text-[13px] text-muted">
              {summary.evaluation.explanation.slice(0, 4).map((step) => (
                <li key={step.id}>
                  {step.label}
                  {step.output !== undefined && (
                    <span className="text-ink">
                      : {step.output.toFixed(2)}
                      {step.scale !== undefined ? ` / ${step.scale}` : ''}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Disclosure>
        )}

        {requirements.length > 0 && (
          <div className="rounded-md bg-surface-soft p-3 text-[13px]">
            <p className="font-medium text-ink">Còn thiếu</p>
            <ul className="mt-1 space-y-1 text-muted">
              {requirements.slice(0, 5).map((requirement) => (
                <li key={requirement.code}>
                  {requirement.label}
                  {requirement.action && (
                    <a
                      href={requirement.action.href}
                      className="ml-2 inline-flex items-center gap-1 font-medium text-accent underline-offset-2 hover:underline"
                    >
                      {requirement.action.label}
                      <ExternalLink size={11} aria-hidden="true" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <Disclosure summary="Xem cách tính và nguồn">
          <ol className="space-y-2 text-[13px] text-muted">
            {summary.evaluation.explanation.map((step, index) => (
              <li key={step.id}>
                <span className="font-medium text-ink">
                  {index + 1}. {step.label}
                </span>
                {step.formula && <p className="mt-0.5 break-words font-mono">{step.formula}</p>}
                {step.description && <p className="mt-0.5">{step.description}</p>}
              </li>
            ))}
          </ol>
        </Disclosure>
      </div>

      <button
        type="button"
        onClick={() => onOpenSchool(summary.schoolId)}
        className="mt-4 inline-flex min-h-9 cursor-pointer items-center gap-1 rounded-md border border-accent/30 bg-accent/10 px-3 text-[13px] font-medium text-accent transition-colors duration-150 hover:bg-accent/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
      >
        Xem {summary.shortName}
        <ExternalLink size={12} aria-hidden="true" />
      </button>
    </article>
  );
}

