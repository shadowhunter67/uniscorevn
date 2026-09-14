import { X } from 'lucide-react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import type { SchoolEvaluationSummary } from '../../compare/evaluateApplicantAcrossSchools';

/**
 * Panel trượt từ phải hiện TOÀN BỘ các bước tính + công thức + nguồn của một nguyện vọng.
 *
 * Vì sao là panel chứ không phải accordion trong card: lưới so sánh là 2 cột, mở accordion dài
 * trong một card làm hàng đó cao vọt lên và card bên cạnh để lại khoảng trắng bằng đúng chiều cao
 * phần vừa mở. Đưa nội dung kỹ thuật dài ra khỏi dòng chảy layout thì card giữ nguyên chiều cao,
 * mà KHÔNG mất một dòng dữ liệu nào (đây là lớp 3 "công thức/kỹ thuật" của mô hình phân tầng).
 *
 * A11y: role=dialog + aria-modal, focus trap, Escape đóng, focus trả về nút đã mở (useFocusTrap).
 */
export function CalculationBreakdownPanel({ summary, program, onClose }: { summary: SchoolEvaluationSummary; program?: string; onClose: () => void }) {
  const panelRef = useFocusTrap<HTMLDivElement>(onClose);
  const score = summary.evaluation.score;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-ink/40">
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="calculation-breakdown-title"
        className="flex h-full w-full max-w-xl flex-col overflow-hidden border-l border-border bg-surface outline-none"
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-border p-4">
          <div className="min-w-0">
            <h2 id="calculation-breakdown-title" className="text-base font-semibold text-ink">
              {score ? `Cách ra kết quả ${score.value.toFixed(2)}` : 'Cách tính điểm'}
            </h2>
            <p className="mt-0.5 text-[13px] text-muted">
              {summary.shortName}
              {program ? ` · ${program}` : ''} · {summary.methodName}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng bảng cách tính"
            title="Đóng"
            className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md border border-border text-muted transition-colors duration-150 hover:bg-surface-soft hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          {summary.evaluation.explanation.length === 0 ? (
            <p className="text-sm text-muted">Nguyện vọng này chưa có bước tính nào để hiển thị.</p>
          ) : (
            <ol className="space-y-3 text-[13px] text-muted">
              {summary.evaluation.explanation.map((step, index) => (
                <li key={step.id} className="border-b border-border pb-3 last:border-b-0 last:pb-0">
                  <p className="font-medium text-ink">
                    {index + 1}. {step.label}
                    {step.output !== undefined && (
                      <span className="ml-1 font-semibold">
                        = {step.output.toFixed(2)}
                        {step.scale !== undefined ? ` / ${step.scale}` : ''}
                      </span>
                    )}
                  </p>
                  {step.formula && <p className="mt-1 break-words font-mono text-ink-soft">{step.formula}</p>}
                  {step.description && <p className="mt-1 leading-relaxed">{step.description}</p>}
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}
