/**
 * Minh họa trang trí cho hero (toà nhà trường + cây) — SVG nội tuyến, không tải ảnh ngoài, ẩn khỏi
 * trình đọc màn hình. Chỉ là hình nền, không mang thông tin.
 */
export function HeroIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 260" aria-hidden="true" focusable="false" className={className} fill="none">
      <ellipse cx="210" cy="238" rx="200" ry="14" fill="#cfe0f7" opacity="0.7" />
      {/* khối nhà cao phía sau */}
      <rect x="60" y="70" width="60" height="160" rx="4" fill="#dbe8fa" />
      <rect x="300" y="50" width="70" height="180" rx="4" fill="#d3e3f8" />
      <g fill="#b9d0ef">
        {[0, 1, 2, 3, 4].map((r) => (
          <g key={r}>
            <rect x="70" y={84 + r * 28} width="12" height="14" rx="2" />
            <rect x="98" y={84 + r * 28} width="12" height="14" rx="2" />
            <rect x="312" y={64 + r * 28} width="12" height="14" rx="2" />
            <rect x="338" y={64 + r * 28} width="12" height="14" rx="2" />
          </g>
        ))}
      </g>
      {/* toà nhà chính */}
      <polygon points="210,92 110,126 310,126" fill="#e8f0fc" stroke="#9db9e3" strokeWidth="2" />
      <rect x="110" y="126" width="200" height="104" fill="#f6f9fe" stroke="#9db9e3" strokeWidth="2" />
      <rect x="100" y="224" width="220" height="12" rx="3" fill="#c7d9f2" />
      <g fill="#c5d8f3" stroke="#9db9e3" strokeWidth="1.5">
        {[130, 158, 186, 214, 242, 270].map((x) => (
          <rect key={x} x={x - 6} y="136" width="12" height="84" rx="2" />
        ))}
      </g>
      <rect x="196" y="176" width="28" height="48" rx="3" fill="#2f6bd8" />
      <circle cx="210" cy="112" r="9" fill="#2f6bd8" />
      {/* cờ */}
      <line x1="210" y1="64" x2="210" y2="92" stroke="#7a93bd" strokeWidth="2" />
      <polygon points="210,64 232,70 210,76" fill="#2f6bd8" />
      {/* cây */}
      <g>
        <rect x="26" y="190" width="6" height="46" fill="#8a6a4a" />
        <circle cx="29" cy="176" r="24" fill="#5fb28a" />
        <circle cx="16" cy="190" r="16" fill="#79c49c" />
        <rect x="378" y="196" width="6" height="40" fill="#8a6a4a" />
        <circle cx="381" cy="182" r="22" fill="#5fb28a" />
        <circle cx="394" cy="194" r="14" fill="#79c49c" />
      </g>
    </svg>
  );
}
