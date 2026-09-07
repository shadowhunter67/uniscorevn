import { getSchoolLogo } from '../data/schoolLogos';
import { getStableBadgePaletteIndex } from './landingCatalog';

/* Text luôn -800 (không phải -600/-700 mặc định Tailwind) trên nền /10 — Lighthouse a11y audit
 * phát hiện -600/-700 trên nền pastel /10 chỉ đạt ~3.3-4.4:1, dưới ngưỡng WCAG AA 4.5:1. -800 đạt
 * ~4.8-6.6:1 tùy màu, giữ được sắc thái pastel khác nhau cho từng trường mà vẫn đọc rõ. */
const BADGE_PALETTE = [
  'bg-accent/10 text-accent',
  'bg-teal-500/10 text-teal-800',
  'bg-amber-500/10 text-amber-800',
  'bg-rose-500/10 text-rose-800',
  'bg-sky-500/10 text-sky-800',
  'bg-emerald-500/10 text-emerald-800',
];

const SIZE_CLASS = {
  sm: 'h-10 w-10 text-[11px]',
  md: 'h-12 w-12 text-xs sm:h-14 sm:w-14',
  lg: 'h-20 w-20 text-sm',
} as const;

interface SchoolLogoProps {
  schoolId: string;
  shortName: string;
  /** Tên đầy đủ dùng cho alt text khi có ảnh thật — logo không mang thông tin ngoài tên trường,
   * tên đã hiển thị dạng chữ ngay cạnh nên alt để rỗng (decorative) khi có text đi kèm; truyền
   * `name` để tự quyết alt khi component đứng một mình (không có text tên bên cạnh). */
  name?: string;
  size?: keyof typeof SIZE_CLASS;
}

/**
 * Logo trường nếu có bản ghi đã xác minh nguồn (`SCHOOL_LOGOS`), ngược lại initials màu ổn định
 * theo id — KHÔNG tự tạo logo giả. Xem `src/data/schoolLogos.ts`.
 */
export function SchoolLogo({ schoolId, shortName, name, size = 'md' }: SchoolLogoProps) {
  const logo = getSchoolLogo(schoolId);
  const sizeClass = SIZE_CLASS[size];

  if (logo) {
    return (
      <img
        src={`/schools/logos/${logo.file}`}
        alt={name ? `Logo ${name}` : ''}
        loading="lazy"
        width={logo.width}
        height={logo.height}
        className={`shrink-0 rounded-md object-contain ${sizeClass}`}
      />
    );
  }

  const badgeColor = BADGE_PALETTE[getStableBadgePaletteIndex(schoolId, BADGE_PALETTE.length)];
  return (
    <div
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-md font-bold leading-none ${sizeClass} ${badgeColor}`}
    >
      {shortName.slice(0, 5)}
    </div>
  );
}
