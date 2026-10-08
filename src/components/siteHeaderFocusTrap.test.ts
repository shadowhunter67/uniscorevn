import { describe, expect, it } from 'vitest';
import source from './SiteHeader.tsx?raw';

/**
 * Regression: `useFocusTrap` gắn bộ bắt phím Tab lên `document`. Gọi nó vô điều kiện trong SiteHeader
 * (hiện ở mọi trang) từng làm phím Tab bị chặn trên toàn site kể cả khi menu mobile đang đóng.
 * Hook chỉ được dùng trong component CHỈ mount lúc dialog mở (MobileMenu).
 */
describe('SiteHeader focus trap', () => {
  it('không gọi useFocusTrap trực tiếp trong SiteHeader', () => {
    const siteHeaderBody = source.slice(source.indexOf('export function SiteHeader'));
    expect(siteHeaderBody).not.toContain('useFocusTrap(');
  });

  it('useFocusTrap chỉ được gọi bên trong MobileMenu (mount có điều kiện)', () => {
    const mobileMenuBody = source.slice(source.indexOf('function MobileMenu'), source.indexOf('export function SiteHeader'));
    expect(mobileMenuBody).toContain('useFocusTrap<HTMLDivElement>(');
    expect(source).toMatch(/mobileMenuOpen && \(\s*<MobileMenu/);
  });
});
