# Design system

Nguyên tắc thiết kế UI của UniscoreVN, tái tạo lại từ các quyết định đã có trong code (nhiều
component trỏ về file này qua comment nhưng file gốc đã thất lạc khỏi repo — xem `git log` không
tìm được lịch sử, nên đây là bản viết lại dựa trên bằng chứng thật trong code hiện tại, không phải
suy đoán).

## Đối tượng & bối cảnh dùng

Học sinh/phụ huynh tra cứu điểm chuẩn — quét nhanh nhiều dòng (355 mục), trên điện thoại là chính,
nhiều người không rành công nghệ. Vì vậy toàn bộ nguyên tắc dưới đây phục vụ một mục tiêu duy nhất:
**đọc nhanh, không đoán, không lag** — không phải "trông đẹp/hiện đại".

## Nguyên tắc cốt lõi: rõ > đẹp, chữ > icon, danh sách > card

- **Danh sách > card.** Danh sách trường dùng `<li>` + divider/border (`SchoolListItem.tsx`), KHÔNG
  dùng card-grid. Card nổi kiểu "AI dashboard" (bo to + shadow lớn) chỉ tốn không gian và làm chậm
  quét mắt khi có hàng trăm dòng.
- **Chữ > icon, không dùng màu làm tín hiệu duy nhất.** Trạng thái hỗ trợ tính điểm dùng ký hiệu
  kèm chữ (`✓` / `!` / `○` + label, xem `statusMark()` trong `SchoolListItem.tsx`), không chỉ tô
  màu — người mù màu hoặc màn hình kém vẫn phân biệt được.
- **Không nhồi thông tin.** Mỗi dòng trường chỉ hiện: logo/initials, tên, loại + khu vực, field
  chip (tối đa 4), trạng thái, 1 CTA. Xem comment "không nhồi thông tin" trong
  `RankingReferenceSection.tsx` và `SchoolListItem.tsx`.
- **Không tự bịa dữ liệu để lấp khoảng trống.** Trường chưa có logo thật → dùng initials màu ổn
  định (`SchoolLogo.tsx`), KHÔNG generate/vẽ logo giả. Trường chưa có dữ liệu ngành → không hiện
  field chip, không đoán field. Trạng thái thiếu dữ liệu hiển thị đúng là thiếu, không giả vờ đủ.

## Token màu & bo góc (`src/index.css`)

```
--color-bg / --color-surface / --color-surface-soft   nền: xám nhạt → trắng → xám rất nhạt
--color-ink / --color-ink-soft / --color-muted          chữ: đen ấm → xám đậm → xám vừa
--color-border / --color-border-strong                  viền: 2 mức, không dùng shadow để phân vùng
--color-primary   #183153   navy — CTA chính, nút chốt hành động (bg-primary)
--color-accent    #1d4ed8   xanh — CTA phụ, link, focus ring, highlight nhẹ (bg-accent/10)
--color-success / --color-warning / --color-danger       trạng thái, luôn đi kèm chữ
```

Không dùng gradient, không dùng glassmorphism, không dùng nhiều hơn 2 màu nhấn (navy + xanh). Đây
là lựa chọn có chủ đích, không phải thiếu đầu tư — thêm màu/hiệu ứng trang trí đi ngược nguyên tắc
"rõ > đẹp" ở trên.

**Lưu ý accessibility đã từng sai và đã sửa:** `--color-accent` từng là `#2f6bff`, đổi sang
`#1d4ed8` vì Lighthouse a11y audit phát hiện text-accent trên nền `bg-accent/10` chỉ đạt ~3.9:1,
dưới ngưỡng WCAG AA (4.5:1); giá trị mới đạt ~5.9:1. Cùng lý do, `SchoolLogo.tsx` luôn dùng chữ
initials ở độ đậm `-800` (không phải `-600`/`-700` mặc định Tailwind) trên nền pastel `/10`. Khi
thêm màu/nền pastel mới, luôn tự kiểm contrast — đừng tin default Tailwind.

**`--radius-card` (20px) + `--shadow-card` là token legacy**, chỉ dùng cho ~16 trang calculator
"nặng" đã tồn tại trước (HCMUT, UIT, UEH, USSH...). Component/section MỚI dùng `--radius-sm`/
`--radius-md` + border thay vì shadow lớn, để tránh cảm giác "card nổi" kiểu AI dashboard (xem
comment trong `ComparisonEntryCard.tsx`). Đừng dùng `rounded-card`/`shadow-card` cho code mới trừ
khi đang sửa trực tiếp 1 trong 16 trang đó.

## Kích thước chạm & focus

- `--ui-tap-min` = 40px (48px ở chế độ chữ lớn) — mọi control tương tác chính (nút, checkbox row,
  filter chip) đặt `min-h-(--ui-tap-min)`. **Cú pháp Tailwind v4 bắt buộc dùng ngoặc tròn**
  `min-h-(--ui-tap-min)`, ngoặc vuông `min-h-[--ui-tap-min]` là bug thật đã xảy ra (28 chỗ) — nó
  bị hiểu là arbitrary value không hợp lệ nên im lặng không sinh CSS. Có test canh gác việc này
  (`tapTargetUtility.test.ts`).
- Focus ring mặc định qua `:where(a, button, input, select, textarea, summary, [tabindex])
  :focus-visible` trong `index.css`, specificity 0 nên component tự khai `focus-visible:ring-*`
  vẫn thắng — không bao giờ tắt focus ring, không có ngoại lệ "vì không đẹp".

## Cỡ chữ tuỳ chỉnh (A-/A/A+)

`TextSizeContext` ghi `data-text-size` lên `<html>`, `index.css` scale `font-size` gốc theo rem —
toàn app scale theo mà không cần sửa từng component. Cố ý KHÔNG dùng inline `<script>` chống-flash
trong `index.html` vì sẽ buộc CSP phải mở `script-src 'unsafe-inline'`; đánh đổi là 1 lần paint ở
size mặc định trước khi effect chạy — chấp nhận được, ưu tiên CSP chặt hơn là triệt tiêu flash.

## Motion

Chỉ transition nhẹ (`transition-colors duration-150`) cho hover/focus, không animation trang trí.
Tôn trọng `prefers-reduced-motion: reduce` toàn cục (tắt hết animation/transition/scroll-behavior)
trong `index.css`.

## Khi thêm UI mới

1. Đây có phải dữ liệu dạng danh sách lặp (trường, ngành, kỳ so sánh)? → dùng `<li>`/divider theo
   mẫu `SchoolListItem.tsx`, không phải card-grid.
2. Có trạng thái cần truyền đạt (đủ dữ liệu / thiếu / lỗi)? → chữ + ký hiệu, không chỉ màu.
3. Có control tương tác? → `min-h-(--ui-tap-min)` (ngoặc tròn) + `focus-visible:ring-2
   ring-accent/40`, tự kiểm contrast nếu dùng nền pastel mới.
4. Cần "card" bọc nội dung? → `rounded-md border border-border`, KHÔNG `rounded-card`/`shadow-card`
   trừ khi đang sửa 1 trong 16 trang calculator nặng cũ.
5. Muốn thêm màu/gradient/hiệu ứng trang trí mới? → dừng lại, hỏi có phục vụ "đọc nhanh hơn" không.
   Nếu không, đừng thêm.
