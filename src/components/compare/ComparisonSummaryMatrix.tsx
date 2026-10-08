import {
  COMPARISON_MATRIX_ROWS,
  getMatrixCellText,
  MATRIX_EMPTY_CELL,
  type ComparisonMatrixColumn,
  type ComparisonMatrixRowId,
} from '../../compare/comparisonMatrix';

function nextActionText(column: ComparisonMatrixColumn): string {
  if (column.needsUserInput) return 'Bổ sung hồ sơ hoặc chọn ngữ cảnh xét tuyển còn thiếu.';
  if (column.blockedBySystemData) return 'Chờ UniScoreVN bổ sung công thức, quy định hoặc mốc đối chiếu.';
  return 'Không cần bổ sung gì.';
}

function CellContent({ column, rowId }: { column: ComparisonMatrixColumn; rowId: ComparisonMatrixRowId }) {
  const text = getMatrixCellText(column, rowId);
  if (text === MATRIX_EMPTY_CELL) {
    return (
      <>
        <span aria-hidden="true" className="text-muted">
          {MATRIX_EMPTY_CELL}
        </span>
        <span className="sr-only">Không có dữ liệu</span>
      </>
    );
  }

  if (rowId === 'status' || rowId === 'assessment') return <span className="font-medium text-ink">{text}</span>;
  if (rowId === 'margin') return <span className={`font-medium ${column.marginPositive ? 'text-success' : 'text-warning'}`}>{text}</span>;
  return <span className="text-ink-soft">{text}</span>;
}

function MobileDecisionCard({ column, onFocusEntry }: { column: ComparisonMatrixColumn; onFocusEntry?: (selectionId: string) => void }) {
  const heading = (
    <>
      <span className="block text-xs font-semibold tracking-wide text-accent">NV{column.preferenceRank}</span>
      <span className="mt-0.5 block font-semibold text-ink">{column.shortName}</span>
      {column.programName && <span className="mt-0.5 block text-xs text-muted">{column.programName}</span>}
    </>
  );

  return (
    <article className="rounded-md border border-border bg-surface p-4">
      {column.selectionId && onFocusEntry ? (
        <button
          type="button"
          onClick={() => onFocusEntry(column.selectionId!)}
          className="block min-h-(--ui-tap-min) w-full rounded-md text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          {heading}
        </button>
      ) : (
        <div>{heading}</div>
      )}
      <dl className="mt-3 divide-y divide-border text-sm">
        {COMPARISON_MATRIX_ROWS.map((row) => (
          <div key={row.id} className="grid grid-cols-[8.5rem_minmax(0,1fr)] gap-3 py-2">
            <dt className="text-muted">{row.label}</dt>
            <dd>
              <CellContent column={column} rowId={row.id} />
            </dd>
          </div>
        ))}
        <div className="grid grid-cols-[8.5rem_minmax(0,1fr)] gap-3 py-2">
          <dt className="text-muted">Việc cần làm</dt>
          <dd className="text-ink-soft">{nextActionText(column)}</dd>
        </div>
      </dl>
    </article>
  );
}

export function ComparisonSummaryMatrix({
  columns,
  onFocusEntry,
}: {
  columns: readonly ComparisonMatrixColumn[];
  /** Bấm tên cột -> cuộn tới card chi tiết tương ứng bên dưới. */
  onFocusEntry?: (selectionId: string) => void;
}) {
  if (columns.length === 0) return null;

  return (
    <section className="mt-5" aria-labelledby="comparison-matrix-title">
      <h2 id="comparison-matrix-title" className="text-lg font-semibold text-ink">
        Bảng quyết định
      </h2>
      <p className="mt-1 text-sm text-muted">
        Mỗi nguyện vọng được đặt cạnh cùng một bộ tiêu chí: trạng thái, điểm của bạn, mốc đối chiếu, chênh lệch và việc cần làm tiếp.
      </p>

      <div className="mt-3 space-y-3 md:hidden">
        {columns.map((column) => (
          <MobileDecisionCard key={column.selectionId ?? column.schoolId} column={column} onFocusEntry={onFocusEntry} />
        ))}
      </div>

      <div className="mt-3 hidden overflow-x-auto rounded-md border border-border md:block" tabIndex={0} role="region" aria-label="Bảng dữ liệu, cuộn ngang để xem hết">
        <table className="w-full min-w-max border-collapse text-sm">
          <caption className="sr-only">Bảng so sánh các nguyện vọng theo trạng thái, điểm, mốc đối chiếu, chênh lệch và việc cần làm</caption>
          <thead>
            <tr className="border-b border-border bg-surface-soft">
              <th scope="col" className="sticky left-0 z-10 min-w-32 bg-surface-soft px-3 py-2.5 text-left font-medium text-muted">
                Tiêu chí
              </th>
              {columns.map((column) => (
                <th key={column.selectionId ?? column.schoolId} scope="col" className="min-w-52 px-3 py-2.5 text-left align-top">
                  <span className="block text-xs font-semibold tracking-wide text-accent">NV{column.preferenceRank}</span>
                  {column.selectionId && onFocusEntry ? (
                    <button
                      type="button"
                      onClick={() => onFocusEntry(column.selectionId!)}
                      className="mt-0.5 inline-flex min-h-9 cursor-pointer items-center text-left font-semibold text-ink underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                    >
                      {column.shortName}
                    </button>
                  ) : (
                    <span className="mt-0.5 block font-semibold text-ink">{column.shortName}</span>
                  )}
                  {column.programName && <span className="mt-0.5 block max-w-64 text-xs font-normal text-muted">{column.programName}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON_MATRIX_ROWS.map((row) => (
              <tr key={row.id} className="border-b border-border last:border-b-0">
                <th scope="row" className="sticky left-0 z-10 bg-surface px-3 py-2.5 text-left font-medium text-muted">
                  {row.label}
                </th>
                {columns.map((column) => (
                  <td key={`${column.selectionId ?? column.schoolId}-${row.id}`} className="px-3 py-2.5 align-top">
                    <CellContent column={column} rowId={row.id} />
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <th scope="row" className="sticky left-0 z-10 bg-surface px-3 py-2.5 text-left font-medium text-muted">
                Việc cần làm
              </th>
              {columns.map((column) => (
                <td key={`${column.selectionId ?? column.schoolId}-next`} className="px-3 py-2.5 align-top text-[13px] text-ink-soft">
                  {nextActionText(column)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
