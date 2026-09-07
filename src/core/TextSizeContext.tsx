import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { readStoredTextSize, writeStoredTextSize, type TextSize } from './textSize';

interface TextSizeContextValue {
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
}

const TextSizeContext = createContext<TextSizeContextValue | undefined>(undefined);

/**
 * Mount ở gốc App (ngoài mọi route) — 1 lần, sống suốt phiên SPA. Ghi `data-text-size` lên
 * `<html>` để CSS (`index.css`) scale font-size gốc; KHÔNG dùng inline `<script>` chống flash
 * trong `index.html` vì sẽ buộc CSP phải mở `script-src 'unsafe-inline'` (xem docs/design-system.md)
 * — đánh đổi: 1 lần paint ở font-size mặc định trước khi effect này chạy, chấp nhận được.
 */
export function TextSizeProvider({ children }: { children: ReactNode }) {
  const [textSize, setTextSizeState] = useState<TextSize>(() => readStoredTextSize());

  useEffect(() => {
    document.documentElement.dataset.textSize = textSize;
  }, [textSize]);

  const setTextSize = useCallback((size: TextSize) => {
    setTextSizeState(size);
    writeStoredTextSize(size);
  }, []);

  const value = useMemo(() => ({ textSize, setTextSize }), [textSize, setTextSize]);

  return <TextSizeContext.Provider value={value}>{children}</TextSizeContext.Provider>;
}

export function useTextSize(): TextSizeContextValue {
  const context = useContext(TextSizeContext);
  if (!context) throw new Error('useTextSize phải dùng bên trong TextSizeProvider');
  return context;
}
