import { describe, expect, it } from 'vitest';

/**
 * Khóa cú pháp custom property của Tailwind v4 cho token `--ui-tap-min`.
 *
 * BUG ĐÃ XẢY RA THẬT: 28 chỗ viết `min-h-[--ui-tap-min]`. Ở Tailwind v4, dấu ngoặc vuông là
 * "arbitrary VALUE", nên `[--ui-tap-min]` được hiểu là giá trị `--ui-tap-min` (không hợp lệ) chứ
 * KHÔNG phải `var(--ui-tap-min)` — utility im lặng không sinh ra CSS nào, `min-height` giữ nguyên
 * `auto`, và mọi nút "đã đặt vùng bấm tối thiểu 40px" thực tế chỉ cao ~20px. Không có lỗi build,
 * không có cảnh báo lint; chỉ phát hiện được khi đo `getBoundingClientRect` trên trình duyệt thật.
 *
 * Cú pháp đúng là dấu ngoặc tròn: `min-h-(--ui-tap-min)` (viết tắt của `min-h-[var(--ui-tap-min)]`).
 *
 * Dùng `import.meta.glob` (Vite-native) thay vì `node:fs` — cùng lý do như `rankingIsolation.test.ts`:
 * tsconfig.app không có @types/node.
 */
const COMPONENT_SOURCES = import.meta.glob(['../**/*.tsx'], { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

describe('tap target utility', () => {
  it('tìm thấy file .tsx để quét (test không tự vô hiệu hoá)', () => {
    expect(Object.keys(COMPONENT_SOURCES).length).toBeGreaterThan(10);
  });

  it('không nơi nào dùng cú pháp ngoặc vuông cho custom property (utility sẽ không sinh CSS)', () => {
    const offenders = Object.entries(COMPONENT_SOURCES)
      .filter(([, content]) => /\[--[a-z-]+\]/.test(content))
      .map(([path]) => path);
    expect(offenders, `Dùng ngoặc tròn: min-h-(--ui-tap-min). File lỗi:\n${offenders.join('\n')}`).toEqual([]);
  });

  it('vẫn còn dùng token --ui-tap-min (không bị xoá mất khi refactor)', () => {
    const users = Object.values(COMPONENT_SOURCES).filter((content) => content.includes('(--ui-tap-min)'));
    expect(users.length).toBeGreaterThan(0);
  });
});
