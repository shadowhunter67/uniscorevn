import { siteConfig } from '../config/site';

export interface PageMetaOptions {
  title: string;
  /** Bỏ trống thì dùng `siteConfig.description` mặc định. */
  description?: string;
  /** Đường dẫn route hiện tại (vd '/', '/compare', '/hcmut') — dùng để dựng canonical/og:url tuyệt
   * đối. KHÔNG được luôn luôn là '/' (mỗi route hợp lệ phải có canonical đúng route đó). */
  path: string;
}

function upsertMetaByName(name: string, content: string): void {
  let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertMetaByProperty(property: string, content: string): void {
  let tag = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertLinkCanonical(href: string): void {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

/**
 * Cập nhật title/description/canonical/Open Graph/Twitter card theo route hiện tại (runtime,
 * không dùng thư viện SEO/không SSR). GIỚI HẠN đã biết: đây là SPA client-side, crawler không chạy
 * JS (đa số social-preview bot vẫn chạy JS, nhưng không phải tất cả) sẽ chỉ thấy meta tĩnh trong
 * index.html (trang chủ). Ảnh OG dùng chung 1 icon brand cho mọi route (`/brand/icon.png`, vuông,
 * hợp với Twitter card "summary") — chưa có ảnh preview riêng theo route và KHÔNG tự sinh ảnh giả.
 */
export function setPageMeta({ title, description, path }: PageMetaOptions): void {
  if (typeof document === 'undefined') return;

  const desc = description ?? siteConfig.description;
  const canonicalUrl = `${siteConfig.canonicalUrl}${path}`;
  // Bản gốc độ phân giải cao (1254×1254) — crawler social cần ảnh đủ lớn, không dùng bản thu nhỏ.
  const socialImageUrl = `${siteConfig.canonicalUrl}/brand/icon.png`;

  document.title = title;
  upsertMetaByName('description', desc);
  upsertLinkCanonical(canonicalUrl);

  upsertMetaByProperty('og:site_name', siteConfig.name);
  upsertMetaByProperty('og:type', 'website');
  upsertMetaByProperty('og:title', title);
  upsertMetaByProperty('og:description', desc);
  upsertMetaByProperty('og:url', canonicalUrl);
  upsertMetaByProperty('og:image', socialImageUrl);
  upsertMetaByProperty('og:image:alt', siteConfig.name);

  upsertMetaByName('twitter:card', 'summary');
  upsertMetaByName('twitter:title', title);
  upsertMetaByName('twitter:description', desc);
  upsertMetaByName('twitter:image', socialImageUrl);
}
