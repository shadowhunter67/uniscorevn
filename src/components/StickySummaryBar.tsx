import type { AdmissionResult } from '../schools/hcmut/types/admission';
import type { HcmutProgram } from '../schools/hcmut/types/programs';

interface StickySummaryBarProps {
  result: AdmissionResult | null;
  selectedProgram: HcmutProgram | null;
  gap: number | null;
}

/**
 * Thanh tóm tắt dính đầu màn hình chỉ dùng cho mobile/tablet (< lg) — desktop đã có
 * sticky sidebar đầy đủ (DashboardHero). Cố tình rút gọn thay vì nhồi nguyên 2 card Hero
 * (~650px) vào một thanh dính: trên màn hình mobile ~800px cao, ghim cả Hero chi tiết sẽ
 * chiếm gần hết viewport, không còn chỗ xem input — phản tác dụng so với mục đích "tiện
 * theo dõi khi cuộn". Bấm vào thanh để cuộn về Hero đầy đủ ở đầu trang.
 */
export function StickySummaryBar({ result, selectedProgram, gap }: StickySummaryBarProps) {
  if (result === null) return null;

  const statusText = gap === null ? null : gap >= 0 ? 'đạt mức tham khảo' : `còn thiếu ${Math.abs(gap).toFixed(2)} điểm`;

  return (
    <div className="sticky top-0 z-10 border-b border-border bg-surface lg:hidden">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="mx-auto flex min-h-(--ui-tap-min) w-full max-w-5xl items-center gap-3 px-4 py-2 text-left"
      >
        <span className="shrink-0 font-display text-lg font-bold leading-none text-primary">
          {result.finalScore.toFixed(2)}
          <span className="ml-0.5 align-baseline text-xs font-medium text-muted">/100</span>
        </span>
        {selectedProgram && statusText && (
          <span className="min-w-0 text-sm leading-tight text-ink-soft">
            <span className="block truncate">{selectedProgram.name}</span>
            <span className={gap !== null && gap >= 0 ? 'text-success' : 'text-warning'}>{statusText}</span>
          </span>
        )}
      </button>
    </div>
  );
}
