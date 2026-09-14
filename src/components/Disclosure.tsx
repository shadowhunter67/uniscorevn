import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';

/**
 * `<details>` + `<summary>` dùng chung cho các khối "gấp lại được" (giải thích công thức, bộ lọc
 * nâng cao, từng mục hồ sơ...).
 *
 * Lý do có component này: trước đây mỗi chỗ tự viết `<summary>` riêng — chỗ đặt `display:flex`
 * (Chrome tự ẩn mũi tên mặc định), chỗ không, nên cùng một trang có khối hiện tam giác ▶ còn khối
 * khác thì không. Ở đây mũi tên luôn là icon chevron thống nhất, xoay 90° khi mở, vùng bấm cao
 * tối thiểu 36px.
 */
export type DisclosureVariant = 'box' | 'inline';

const VARIANT_CONTAINER: Record<DisclosureVariant, string> = {
  box: 'rounded-md border border-border bg-surface px-3 py-1',
  inline: '',
};

const VARIANT_SUMMARY: Record<DisclosureVariant, string> = {
  box: 'text-ink',
  inline: 'text-accent underline-offset-2 hover:underline',
};

export function Disclosure({
  summary,
  meta,
  defaultOpen = false,
  variant = 'box',
  className = '',
  children,
}: {
  summary: ReactNode;
  /** Chữ phụ căn phải trên cùng hàng với tiêu đề (vd trạng thái "✓ Đã nhập 3 môn"). */
  meta?: ReactNode;
  defaultOpen?: boolean;
  /**
   * 'box' (mặc định) — khối có viền riêng, dùng cho mục cấp trang (bộ lọc nâng cao, từng mục hồ sơ).
   *
   * 'inline' — chỉ là dòng chữ + chevron, KHÔNG viền/nền. Dùng cho khối gấp NẰM TRONG một khối đã
   * có viền (card so sánh, hộp "còn thiếu"): lồng box trong box làm mọi thứ trông cùng một trọng
   * số thị giác, trong khi phân cấp thật phải do khoảng cách + kiểu chữ tạo ra, không phải do
   * thêm viền.
   */
  variant?: DisclosureVariant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <details open={defaultOpen} className={`group ${VARIANT_CONTAINER[variant]} ${className}`}>
      <summary
        className={`flex min-h-9 cursor-pointer list-none flex-wrap items-center gap-x-2 gap-y-0.5 py-1 text-sm [&::-webkit-details-marker]:hidden ${VARIANT_SUMMARY[variant]}`}
      >
        <ChevronRight
          size={15}
          aria-hidden="true"
          className={`shrink-0 transition-transform duration-150 group-open:rotate-90 ${variant === 'inline' ? '' : 'text-muted'}`}
        />
        <span className="font-medium">{summary}</span>
        {meta !== undefined && <span className="ml-auto text-right text-[13px] text-muted">{meta}</span>}
      </summary>
      <div className="mt-1 mb-3">{children}</div>
    </details>
  );
}
