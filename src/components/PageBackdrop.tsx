export type PageBackdropVariant = 'home' | 'fields' | 'compare' | 'school';

/** `textSide`: phía đặt chữ — phủ lớp nền sáng dày hơn ở phía đó để chữ luôn đọc rõ (WCAG AA).
 * `flip`: lật ngang ảnh có phần hình ở bên trái để phần hình dồn sang phải, tránh đè lên tiêu đề. */
const SOURCES: Record<PageBackdropVariant, { src: string; position: string; textSide: 'left' | 'right'; flip?: boolean }> = {
  home: { src: '/backgrounds/bg-home.webp', position: 'left bottom', textSide: 'left', flip: true },
  fields: { src: '/backgrounds/bg-fields.webp', position: 'right top', textSide: 'left' },
  compare: { src: '/backgrounds/bg-compare.webp', position: 'left bottom', textSide: 'left', flip: true },
  school: { src: '/backgrounds/bg-school.webp', position: 'right bottom', textSide: 'left' },
};

/**
 * Ảnh nền banner đầu trang (4 ảnh trong public/backgrounds/, mỗi trang một ảnh). Chỉ trang trí:
 * nằm sau nội dung, mờ dần xuống màu nền ở đáy và hai bên để không có đường cắt cứng; trên điện
 * thoại thấp hơn và nhạt hơn để không làm khó đọc chữ.
 */
export function PageBackdrop({ variant }: { variant: PageBackdropVariant }) {
  const { src, position, textSide, flip } = SOURCES[variant];
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[260px] overflow-hidden sm:h-[460px]">
      <img
        src={src}
        alt=""
        width={830}
        height={466}
        decoding="async"
        className="h-full w-full object-cover opacity-60 sm:opacity-100"
        style={{
          objectPosition: position,
          transform: flip ? 'scaleX(-1)' : undefined,
          maskImage: 'linear-gradient(to bottom, #000 0%, #000 55%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 55%, transparent 100%)',
        }}
      />
      <div className={`absolute inset-0 ${textSide === 'left' ? 'bg-linear-to-r from-bg/90 via-bg/60 to-transparent' : 'bg-linear-to-l from-bg/90 via-bg/60 to-transparent'}`} />
    </div>
  );
}
