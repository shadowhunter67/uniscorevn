/** Skip-to-content link — chỉ hiện khi được focus bằng bàn phím (Tab đầu tiên). */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      Bỏ qua, đến nội dung chính
    </a>
  );
}
