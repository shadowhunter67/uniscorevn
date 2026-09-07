import { siteConfig } from '../config/site';
import { BrandWordmark } from './BrandLogo';

const LINK_CLASS =
  'inline-flex min-h-9 items-center rounded-sm text-muted underline-offset-2 transition-colors duration-150 hover:text-ink hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40';

export function Footer() {
  return (
    <footer className="mt-10 border-t border-border pt-6 pb-8 text-sm">
      <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
        <div className="max-w-md text-muted">
          {/* Wordmark thay dòng chữ tên brand — nền footer sáng nên dùng bản màu, không phải bản trắng. */}
          <BrandWordmark className="h-7 w-auto" />
          <p className="mt-2 leading-relaxed">{siteConfig.tagline}</p>
          <p className="mt-2 leading-relaxed">
            {siteConfig.name} là công cụ độc lập, không thuộc Bộ GD&ĐT hay bất kỳ cơ sở đào tạo nào.
          </p>
        </div>

        <nav aria-label={`Liên kết ${siteConfig.name}`} className="flex flex-col gap-1 sm:items-end">
          <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
            GitHub
          </a>
          <a href={siteConfig.issuesUrl} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
            Báo lỗi &amp; góp ý
          </a>
          <a href="#data-sources" className={LINK_CLASS}>
            Nguồn dữ liệu
          </a>
        </nav>
      </div>

      <p className="mt-6 border-t border-border pt-4 text-sm text-muted">© 2026 {siteConfig.name}</p>
    </footer>
  );
}
