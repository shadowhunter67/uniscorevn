import { RotateCcw } from 'lucide-react';
import { ShareButton } from './ShareButton';

interface HeaderProps {
  /** Thông tin trường đang active — Header không tự biết, nhận từ page gọi nó (mỗi trường 1 page riêng). */
  school: { shortName: string; name: string; year: number };
  /** Bỏ trống ở trang không có form/state để lưu (vd trang thông tin) — ẩn hẳn nút thay vì hiện nút không làm gì. */
  onReset?: () => void;
  buildShareUrl: () => string;
  onChangeSchool: () => void;
}

export function Header({ school, onReset, buildShareUrl, onChangeSchool }: HeaderProps) {
  return (
    <header className="flex flex-col gap-3 py-6 sm:py-8">
      <div className="max-w-4xl">
        <h1 className="text-2xl font-semibold leading-tight text-primary sm:text-3xl">{school.name}</h1>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-sm text-ink-soft">
        <span className="inline-flex min-h-(--ui-tap-min) items-center rounded-full bg-accent/10 px-3 text-xs font-semibold text-accent">
          {school.shortName}
        </span>
        <span className="inline-flex min-h-(--ui-tap-min) items-center text-sm text-muted">Xét tuyển tổng hợp {school.year}</span>
        <button
          type="button"
          onClick={onChangeSchool}
          className="inline-flex min-h-(--ui-tap-min) items-center rounded-md px-2 text-sm font-medium text-accent underline-offset-2 transition hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          Đổi trường
        </button>
        <ShareButton buildShareUrl={buildShareUrl} />
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex min-h-(--ui-tap-min) items-center gap-1.5 rounded-md border border-border px-3 text-sm font-medium text-ink-soft transition hover:bg-surface-soft hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            <RotateCcw size={16} aria-hidden="true" />
            Đặt lại
          </button>
        )}
      </div>
    </header>
  );
}
