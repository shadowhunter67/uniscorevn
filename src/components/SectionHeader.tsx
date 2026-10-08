interface SectionHeaderProps {
  index: string;
  title: string;
  subtitle?: string;
  /** Tiến độ nhập của mục: `filled`/`total` ô đã có giá trị. Không truyền thì không hiện trạng thái. */
  progress?: { filled: number; total: number };
}

/** Ký hiệu + chữ (không chỉ màu) — cùng mẫu với statusMark() ở SchoolListItem. */
function progressStatus({ filled, total }: { filled: number; total: number }) {
  if (total > 0 && filled >= total) return { mark: '✓', label: 'Đã nhập đủ', className: 'text-success' };
  if (filled === 0) return { mark: '○', label: 'Chưa nhập', className: 'text-muted' };
  return { mark: '!', label: `Thiếu ${total - filled} ô`, className: 'text-warning' };
}

export function SectionHeader({ index, title, subtitle, progress }: SectionHeaderProps) {
  const status = progress ? progressStatus(progress) : null;
  return (
    <div className="flex items-baseline gap-3">
      <span className="font-display text-3xl font-bold text-ink/50 sm:text-4xl" aria-hidden="true">
        {index}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
          <h2 className="text-lg font-semibold text-ink sm:text-xl">{title}</h2>
          {status && (
            <span className={`text-sm font-medium ${status.className}`}>
              <span aria-hidden="true">{status.mark} </span>
              {status.label}
            </span>
          )}
        </div>
        {subtitle && <p className="mt-0.5 text-sm text-muted">{subtitle}</p>}
      </div>
    </div>
  );
}
