import { ArrowLeftRight, RotateCcw } from 'lucide-react';
import { SchoolLogo } from './SchoolLogo';
import { ShareButton } from './ShareButton';

interface HeaderProps {
  /** Thông tin trường đang active — Header không tự biết, nhận từ page gọi nó (mỗi trường 1 page riêng). */
  school: { shortName: string; name: string; year: number; /** Có id thì hiện logo trường cạnh tên (nếu đã xác minh nguồn). */ id?: string };
  /** Bỏ trống ở trang không có form/state để lưu (vd trang thông tin) — ẩn hẳn nút thay vì hiện nút không làm gì. */
  onReset?: () => void;
  buildShareUrl: () => string;
  onChangeSchool: () => void;
}

export function Header({ school, onReset, buildShareUrl, onChangeSchool }: HeaderProps) {
  return (
    <header className="relative flex flex-col gap-3 py-6 sm:py-8">
      <button
        type="button"
        onClick={onChangeSchool}
        className="-ml-1.5 inline-flex min-h-9 w-fit cursor-pointer items-center rounded-md px-1.5 text-sm font-medium text-accent underline-offset-2 hover:bg-accent/10 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
      >
        ← Về trang chủ
      </button>
      <div className="flex items-start gap-4">
        {school.id && (
          <span className="card hidden shrink-0 items-center justify-center p-2 sm:flex">
            <SchoolLogo schoolId={school.id} shortName={school.shortName} name={school.name} size="lg" />
          </span>
        )}
        <div className="min-w-0">
          <div className="relative max-w-3xl">
        <h1 className="text-2xl font-extrabold leading-tight text-ink sm:text-3xl">{school.name}</h1>
      </div>
        
              <div className="relative flex flex-wrap items-center gap-2 text-sm text-ink-soft">
                <span className="inline-flex min-h-(--ui-tap-min) items-center rounded-lg border border-accent/30 bg-surface px-3 text-xs font-bold text-accent">
                  {school.shortName}
                </span>
                <span className="inline-flex min-h-(--ui-tap-min) items-center text-sm text-muted">Xét tuyển tổng hợp {school.year}</span>
                <button
                  type="button"
                  onClick={onChangeSchool}
                  className="inline-flex min-h-(--ui-tap-min) items-center rounded-md px-2 text-sm font-medium text-accent underline-offset-2 transition hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                >
                  <ArrowLeftRight size={16} aria-hidden="true" className="mr-1.5" />
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
        </div>
      </div>
    </header>
  );
}
