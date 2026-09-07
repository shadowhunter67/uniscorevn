interface ScoreInputProps {
  id: string;
  label: string;
  hint?: string;
  value: string;
  error: string | null;
  onChange: (value: string) => void;
  onBlur?: () => void;
  compact?: boolean;
  hideLabel?: boolean;
}

/**
 * Ô nhập điểm dùng chung. Radius/viền theo token chung (`--radius-md`, `--color-border`) — trước
 * đây là rounded-lg (8px) + `border-ink/10` nên lệch nhẹ so với select/nút đứng cạnh.
 */
export function ScoreInput({
  id,
  label,
  hint,
  value,
  error,
  onChange,
  onBlur,
  compact = false,
  hideLabel = false,
}: ScoreInputProps) {
  const errorId = `${id}-error`;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor={id} className={hideLabel ? 'sr-only' : 'text-sm font-medium text-ink'}>
          {label}
        </label>
        {hint && <span className="text-[13px] text-muted">{hint}</span>}
      </div>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        step="any"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={error !== null}
        aria-describedby={error ? errorId : undefined}
        className={`mt-1 w-full rounded-md border bg-surface text-ink outline-none transition-colors duration-150 focus:ring-2 focus:ring-offset-0 ${
          compact ? 'h-10 px-2.5 text-sm' : 'h-11 px-3.5 sm:h-12'
        } ${
          error
            ? 'border-danger/60 focus:border-danger focus:ring-danger/20'
            : 'border-border hover:border-border-strong focus:border-accent focus:ring-accent/25'
        }`}
      />
      {error && (
        <p id={errorId} className="mt-1 text-[13px] text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
