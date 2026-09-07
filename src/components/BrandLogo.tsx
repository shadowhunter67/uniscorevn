import { siteConfig } from '../config/site';

/**
 * Logo/nhận diện UniScoreVN — nguồn ảnh duy nhất cho toàn app, mọi nơi cần logo import từ đây
 * (giống `config/site.ts` là nguồn duy nhất cho tên/tagline).
 *
 * 3 file trong `public/brand/` là asset chính thức, KHÔNG tự sinh lại/đổi màu/vector hóa:
 * - `wordmark-color.png` (2172×724, tỉ lệ 3:1) — logo ngang đầy đủ, dùng trên nền sáng (navbar,
 *   footer). Đây là logo chính vì toàn bộ app đang là nền sáng.
 * - `icon.png` (1254×1254, vuông) — chỉ ký hiệu, dùng khi chiều ngang hẹp (navbar mobile) và làm
 *   apple-touch-icon.
 * - `wordmark-white.png` — bản trắng, CHỈ dùng trên nền tối. App hiện không có bề mặt tối nào
 *   (`html { color-scheme: light }`, không có dark mode) nên file này CỐ Ý chưa được dùng ở đâu —
 *   không dựng nền tối chỉ để dùng nó.
 *
 * Ảnh luôn có `width`/`height` thật để trình duyệt giữ chỗ đúng tỉ lệ (không layout shift, không
 * bị bóp méo) — chỉ CSS `h-*` + `w-auto` điều khiển kích thước hiển thị.
 *
 * KÍCH THƯỚC FILE: 3 file gốc là ảnh in (icon 1254px ~576KB, wordmark 2172px ~407KB). UI chỉ hiển
 * thị logo ở chiều cao 28-36px, nên nhúng thẳng file gốc vào navbar/footer là bắt MỌI lượt truy
 * cập tải gần 1MB ảnh. Vì vậy có thêm bản THU NHỎ ĐÚNG TỈ LỆ của chính các file đó (không đổi
 * thiết kế/màu/tên brand, chỉ resize):
 * - `wordmark-color-540.png` (540×180, ~47KB) — dùng cho navbar/footer, vẫn nét ở màn 3x.
 * - `icon-180.png` (180×180, ~23KB) — logo navbar mobile + apple-touch-icon.
 * - `icon-32.png` (32×32, ~1.7KB) — favicon.
 * File gốc GIỮ NGUYÊN và vẫn là bản chuẩn (dùng cho og:image, in ấn, mọi nhu cầu độ phân giải cao).
 */

/** Bản gốc độ phân giải cao — dùng khi cần ảnh lớn (og:image), không nhúng vào UI. */
export const BRAND_WORDMARK_FULL_SRC = '/brand/wordmark-color.png';
export const BRAND_ICON_FULL_SRC = '/brand/icon.png';

export const BRAND_WORDMARK_SRC = '/brand/wordmark-color-540.png';
export const BRAND_ICON_SRC = '/brand/icon-180.png';

export function BrandWordmark({ className = 'h-8 w-auto' }: { className?: string }) {
  return (
    <img src={BRAND_WORDMARK_SRC} alt={siteConfig.name} width={540} height={180} decoding="async" className={`${className} object-contain`} />
  );
}

export function BrandIcon({ className = 'h-8 w-auto' }: { className?: string }) {
  return <img src={BRAND_ICON_SRC} alt={siteConfig.name} width={180} height={180} decoding="async" className={`${className} object-contain`} />;
}

/**
 * Logo cho navbar: wordmark ngang từ ≥640px, icon vuông dưới mức đó. Dùng `<picture>` + `media`
 * chứ KHÔNG render 2 <img> rồi ẩn bớt bằng `hidden` — ảnh bị ẩn bằng CSS vẫn bị tải, ở đây sẽ
 * thành 2 file PNG cho mọi khách truy cập.
 */
export function BrandResponsiveLogo({ className = 'h-8 w-auto' }: { className?: string }) {
  return (
    <picture>
      <source media="(min-width: 640px)" srcSet={BRAND_WORDMARK_SRC} width={540} height={180} />
      <img src={BRAND_ICON_SRC} alt={siteConfig.name} width={180} height={180} decoding="async" className={`${className} object-contain`} />
    </picture>
  );
}
