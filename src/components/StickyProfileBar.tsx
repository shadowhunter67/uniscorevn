import { useEffect, useState } from 'react';
import type { ApplicantProfileSummary } from '../core/applicantProfileSummary';

/**
 * Thanh tóm tắt hồ sơ dính đầu màn hình, CHỈ hiện khi đã cuộn qua khỏi panel hồ sơ thật và chỉ
 * trên desktop (>= lg) — ở đó danh sách trường dài hàng chục dòng, cuộn tới giữa danh sách là
 * không còn nhớ mình đang dùng hồ sơ nào để đối chiếu.
 *
 * Cố ý KHÔNG nhồi toàn bộ hồ sơ vào đây (mobile đã có bài học tương tự ở `StickySummaryBar`): chỉ
 * vài con số + một nút quay lại phần chỉnh sửa. Ẩn hoàn toàn trên mobile vì màn hình thấp, một
 * thanh dính chiếm chỗ ở đó gây hại nhiều hơn lợi.
 *
 * `aria-hidden`: nội dung ở đây là bản sao của panel hồ sơ phía trên, không thêm thông tin mới cho
 * người dùng screen reader, nên không đọc lại lần hai.
 */
export function StickyProfileBar({
  summary,
  anchorId,
  onEdit,
}: {
  summary: ApplicantProfileSummary;
  /** Id của panel hồ sơ thật — thanh chỉ hiện khi panel đó đã cuộn ra khỏi màn hình. */
  anchorId: string;
  onEdit: () => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const anchor = document.getElementById(anchorId);
    if (!anchor || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver((entries) => setVisible(!entries[0].isIntersecting), { threshold: 0 });
    observer.observe(anchor);
    return () => observer.disconnect();
  }, [anchorId]);

  if (!summary.hasData || !visible) return null;

  const facts = [
    summary.vactTotal !== undefined ? `ĐGNL ${summary.vactTotal}` : null,
    summary.thptSubjectCount > 0 ? `THPT ${summary.thptSubjectCount} môn` : null,
    summary.transcriptSubjectCount > 0 ? `Học bạ ${summary.transcriptSubjectCount} môn` : null,
    summary.certificateCount > 0 ? `${summary.certificateCount} chứng chỉ` : null,
  ].filter(Boolean);

  return (
    <div aria-hidden="true" className="sticky top-0 z-20 -mx-4 hidden border-b border-border bg-surface/95 px-4 py-2 backdrop-blur lg:block">
      <div className="flex items-center justify-between gap-3 text-sm">
        <p className="truncate text-muted">
          <span className="font-medium text-ink">Hồ sơ của bạn:</span> {facts.join(' · ')}
        </p>
        <button
          type="button"
          onClick={onEdit}
          tabIndex={-1}
          className="shrink-0 cursor-pointer rounded-md px-1.5 py-1 font-medium text-accent underline-offset-2 transition-colors duration-150 hover:bg-accent/10 hover:underline"
        >
          Chỉnh sửa
        </button>
      </div>
    </div>
  );
}
