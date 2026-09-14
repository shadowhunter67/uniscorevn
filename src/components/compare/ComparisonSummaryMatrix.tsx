import {
  COMPARISON_MATRIX_ROWS,
  getMatrixCellText,
  MATRIX_EMPTY_CELL,
  type ComparisonMatrixColumn,
  type ComparisonMatrixRowId,
} from '../../compare/comparisonMatrix';

/**
 * Bảng so sánh ngang — MỘT bảng duy nhất ở đầu trang, hàng = tiêu chí, cột = nguyện vọng.
 *
 * Vì sao cần: các card bên dưới đặt cạnh nhau là "nhiều báo cáo cạnh nhau", muốn biết nguyện vọng
 * nào chênh lệch tốt hơn phải đọc hết card A rồi nhớ số để so với card B. Bảng cho đọc một hàng
 * là so được hết.
 *
 * Mobile KHÔNG stack thành từng khối riêng (làm mất luôn khả năng so sánh — chính thứ bảng này
 * sinh ra để giải quyết): giữ nguyên dạng bảng, cột tiêu chí dính trái (`sticky left-0`) và cuộn
 * ngang. Mỗi cột nguyện vọng có bề rộng tối thiểu để không bị bóp thành chữ 1 ký tự/dòng.
 *
 * Thuần trình bày — mọi chuỗi đã được `compare/comparisonMatrix.ts` dựng sẵn.
 */
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

  if (rowId === 'assessment') return <span className="font-medium text-ink">{text}</span>;
  if (rowId === 'margin') {
    // Hướng chênh lệch đã nằm trong chữ ("+3.8 điểm" / "−1.2 điểm" / "ngang mức") — màu chỉ để
    // quét nhanh, không phải tín hiệu duy nhất.
    return <span className={`font-medium ${column.marginPositive ? 'text-success' : 'text-warning'}`}>{text}</span>;
  }
  return <span className="text-ink-soft">{text}</span>;
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
        So sánh nhanh
      </h2>
      <p className="mt-1 text-sm text-muted">
        Đọc theo hàng để so cùng một tiêu chí giữa các nguyện vọng. Chi tiết từng nguyện vọng nằm ở phần bên dưới.
      </p>

      <div className="mt-3 overflow-x-auto rounded-md border border-border">
        <table className="w-full min-w-max border-collapse text-sm">
          <caption className="sr-only">Bảng so sánh các nguyện vọng theo đánh giá, chênh lệch, điểm, mốc tham khảo và độ tin cậy</caption>
          <thead>
            <tr className="border-b border-border bg-surface-soft">
              <th scope="col" className="sticky left-0 z-10 min-w-28 bg-surface-soft px-3 py-2.5 text-left font-medium text-muted">
                Tiêu chí
              </th>
              {columns.map((column) => (
                <th key={column.selectionId ?? column.schoolId} scope="col" className="min-w-44 px-3 py-2.5 text-left align-top">
                  <span className="block text-xs font-semibold tracking-wide text-accent">NV{column.preferenceRank}</span>
                  {column.selectionId && onFocusEntry ? (
                    <button
                      type="button"
                      onClick={() => onFocusEntry(column.selectionId!)}
                      className="mt-0.5 cursor-pointer text-left font-semibold text-ink underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                    >
                      {column.shortName}
                    </button>
                  ) : (
                    <span className="mt-0.5 block font-semibold text-ink">{column.shortName}</span>
                  )}
                  {column.programName && <span className="mt-0.5 block max-w-56 text-xs font-normal text-muted">{column.programName}</span>}
                  <span className="mt-1 block text-xs font-normal text-muted">{column.statusLabel}</span>
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
                Bước tiếp theo
              </th>
              {columns.map((column) => (
                <td key={`${column.selectionId ?? column.schoolId}-next`} className="px-3 py-2.5 align-top text-[13px]">
                  {/* Một nguyện vọng có thể vướng CẢ HAI phía cùng lúc — hiện cả hai dòng, không
                      để dòng nào che dòng kia (đó chính là chỗ dễ nhầm "tôi thiếu" với "công cụ
                      thiếu"). */}
                  {!column.needsUserInput && !column.blockedBySystemData ? (
                    <span className="text-muted">Không cần bổ sung gì</span>
                  ) : (
                    <>
                      {column.needsUserInput && <span className="block text-ink-soft">Bạn cần bổ sung dữ liệu</span>}
                      {column.blockedBySystemData && <span className="block text-muted">UniScoreVN chưa đủ dữ liệu</span>}
                    </>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
