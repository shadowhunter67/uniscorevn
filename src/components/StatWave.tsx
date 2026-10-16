/** Đường lượn trang trí ở góc ô thống kê — không mang dữ liệu, chỉ để ô bớt trống (aria-hidden). */
export function StatWave({ color }: { color: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 120 40" className="pointer-events-none absolute bottom-0 right-3 h-10 w-28" fill="none">
      <path d="M0 36 C20 34 30 22 48 24 C66 26 78 8 96 14 C106 17 114 8 120 4 V40 H0 Z" fill={color} opacity="0.14" />
      <path d="M0 36 C20 34 30 22 48 24 C66 26 78 8 96 14 C106 17 114 8 120 4" stroke={color} strokeWidth="1.5" opacity="0.35" />
    </svg>
  );
}
