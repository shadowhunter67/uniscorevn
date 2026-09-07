import { useTextSize } from '../core/TextSizeContext';
import { TEXT_SIZE_LABELS, TEXT_SIZE_ORDER } from '../core/textSize';

/** Text over icon: "A− A A+" hiển thị chữ thật, không phải icon trang trí. */
export function TextSizeControl() {
  const { textSize, setTextSize } = useTextSize();

  return (
    <div role="group" aria-label="Cỡ chữ" className="flex items-center gap-0.5 rounded-md border border-border bg-surface p-0.5">
      {TEXT_SIZE_ORDER.map((size) => (
        <button
          key={size}
          type="button"
          aria-pressed={textSize === size}
          onClick={() => setTextSize(size)}
          className={`min-h-[--ui-tap-min] min-w-[--ui-tap-min] rounded px-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
            textSize === size ? 'bg-accent/10 text-accent' : 'text-muted hover:text-ink'
          }`}
        >
          {TEXT_SIZE_LABELS[size]}
          <span className="sr-only"> — {size === 'sm' ? 'chữ nhỏ' : size === 'md' ? 'chữ vừa (mặc định)' : 'chữ lớn, chế độ dễ đọc'}</span>
        </button>
      ))}
    </div>
  );
}
