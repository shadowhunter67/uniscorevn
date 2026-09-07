import { safeGetItem, safeSetItem } from './safeStorage';

/**
 * "Chế độ dễ đọc" (A-/A/A+) — chỉ scale root font-size (xem `html[data-text-size]` trong
 * `index.css`); mọi utility Tailwind dùng rem nên toàn app scale theo, không cần sửa từng
 * component. Đây là pref hiển thị thuần túy, KHÔNG liên quan gì tới `applicantProfile` — dùng
 * key localStorage riêng, không đụng chain migration `uniscorevn:applicant-profile:v1`.
 */
export type TextSize = 'sm' | 'md' | 'lg';

export const TEXT_SIZE_STORAGE_KEY = 'uniscorevn:text-size:v1';

export const TEXT_SIZE_ORDER: readonly TextSize[] = ['sm', 'md', 'lg'];

export const TEXT_SIZE_LABELS: Record<TextSize, string> = {
  sm: 'A−',
  md: 'A',
  lg: 'A+',
};

export const DEFAULT_TEXT_SIZE: TextSize = 'md';

export function parseTextSize(raw: string | null): TextSize | undefined {
  if (raw === 'sm' || raw === 'md' || raw === 'lg') return raw;
  return undefined;
}

export function nextTextSize(current: TextSize): TextSize {
  const index = TEXT_SIZE_ORDER.indexOf(current);
  return TEXT_SIZE_ORDER[Math.min(index + 1, TEXT_SIZE_ORDER.length - 1)];
}

export function prevTextSize(current: TextSize): TextSize {
  const index = TEXT_SIZE_ORDER.indexOf(current);
  return TEXT_SIZE_ORDER[Math.max(index - 1, 0)];
}

export function readStoredTextSize(): TextSize {
  return parseTextSize(safeGetItem(TEXT_SIZE_STORAGE_KEY)) ?? DEFAULT_TEXT_SIZE;
}

export function writeStoredTextSize(size: TextSize): void {
  safeSetItem(TEXT_SIZE_STORAGE_KEY, size);
}
