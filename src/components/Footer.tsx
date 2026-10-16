import { siteConfig } from '../config/site';
import { BrandWordmark } from './BrandLogo';

const LINK_CLASS =
  'inline-flex min-h-9 items-center rounded-sm text-muted underline-offset-2 transition-colors duration-150 hover:text-ink hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40';

export function Footer() {
  return (
    <footer className="mt-8 flex flex-col gap-3 border-t border-border/70 pt-4 pb-8 text-sm text-muted lg:flex-row lg:items-center lg:gap-4">
      <BrandWordmark className="h-7 w-auto shrink-0" />
      <span className="lg:max-w-[16rem]">{siteConfig.tagline}</span>
      <span aria-hidden="true" className="hidden text-border-strong lg:inline">
        |
      </span>
      <span className="flex-1">{siteConfig.name} là công cụ độc lập, không thuộc Bộ GD&ĐT hay bất kỳ cơ sở đào tạo nào.</span>
      <nav aria-label={`Liên kết ${siteConfig.name}`} className="flex flex-wrap items-center gap-x-4">
        <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
          GitHub
        </a>
        <a href={siteConfig.issuesUrl} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
          Báo lỗi &amp; góp ý
        </a>
        <a href="#data-sources" className={LINK_CLASS}>
          Nguồn dữ liệu
        </a>
        <span>© 2026 {siteConfig.name}</span>
      </nav>
    </footer>
  );
}
