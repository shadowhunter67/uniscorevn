import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '../config/site';
import { TextSizeControl } from './TextSizeControl';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface SiteHeaderProps {
  pathname: string;
  onNavigate: (path: string) => void;
}

interface NavItem {
  path: string;
  label: string;
}

/**
 * Nav toàn site — trước đây chỉ trang trường "nặng" có `Header.tsx` riêng, landing/compare/trang
 * trường thường không có nav chung nào. Chỉ liệt kê route ĐÃ tồn tại thật (không bịa "Hồ sơ"/
 * "Hướng dẫn" khi chưa có trang) — xem docs/design-system.md mục điều hướng cho danh sách route
 * còn thiếu (P1 backlog).
 */
const NAV_ITEMS: readonly NavItem[] = [
  { path: '/', label: 'Tra cứu trường' },
  { path: '/nganh', label: 'Theo ngành' },
  { path: '/compare', label: 'So sánh' },
];

function NavLink({ item, active, onNavigate }: { item: NavItem; active: boolean; onNavigate: (path: string) => void }) {
  return (
    <a
      href={item.path}
      aria-current={active ? 'page' : undefined}
      onClick={(event) => {
        event.preventDefault();
        onNavigate(item.path);
      }}
      className={`rounded-sm px-1 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
        active ? 'text-accent' : 'text-ink-soft hover:text-ink'
      }`}
    >
      {item.label}
    </a>
  );
}

export function SiteHeader({ pathname, onNavigate }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useFocusTrap<HTMLDivElement>(() => setMobileMenuOpen(false));

  function navigate(path: string) {
    setMobileMenuOpen(false);
    onNavigate(path);
  }

  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            navigate('/');
          }}
          className="rounded-sm text-base font-bold text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          {siteConfig.name}
        </a>

        <nav aria-label="Điều hướng chính" className="hidden items-center gap-5 sm:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.path} item={item} active={pathname === item.path} onNavigate={navigate} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <TextSizeControl />
          </div>
          <button
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="site-mobile-menu"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="flex min-h-[--ui-tap-min] min-w-[--ui-tap-min] items-center justify-center rounded-md border border-border text-ink sm:hidden"
          >
            {mobileMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            <span className="sr-only">{mobileMenuOpen ? 'Đóng menu' : 'Mở menu'}</span>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          id="site-mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu điều hướng"
          className="border-t border-border bg-surface px-4 py-3 sm:hidden"
        >
          <nav aria-label="Điều hướng chính (di động)" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.path}
                href={item.path}
                aria-current={pathname === item.path ? 'page' : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  navigate(item.path);
                }}
                className={`min-h-[--ui-tap-min] rounded-md px-2 py-2.5 text-base font-medium ${
                  pathname === item.path ? 'bg-accent/10 text-accent' : 'text-ink-soft'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 border-t border-border pt-3">
            <TextSizeControl />
          </div>
        </div>
      )}
    </header>
  );
}
