# UniScoreVN Public Engineering Notes

This repository is the public UniScoreVN app: Vite, React, TypeScript, client-side only.

The public repo should remain useful and buildable on its own. It includes UI, generic runtime contracts, comparison behavior, public tests, public methodology docs, and committed generated runtime artifacts.

Private source-of-truth data, research notes, source reconciliation, normalization decisions, and deep audit/export workflows live outside this repository.

## Commands

```bash
npm install
npm run test
npm run lint
npm run build
npm run audit:data
npm run stats:coverage
```

## Public Runtime Rules

- `src/core/` is generic runtime code: applicant profile, validation, storage migration, evidence types, and shared contracts.
- `src/compare/` is generic comparison infrastructure.
- `src/schools/<id>/` may contain school-specific runtime modules needed by the client app.
- `src/generated/` contains generated runtime artifacts. Do not edit them manually.
- Public builds must not depend on private repo access or private secrets.

## Data Rules

- Formula support requires official evidence in the claimed scope.
- If a source is incomplete or conflicting, keep the method partial or unsupported.
- Keep public source URLs available where runtime results depend on them.
- Do not commit credentials, raw private research, reviewer notes, or source conflict logs.

## Compatibility

Preserve existing localStorage migration chains and shared profile semantics. Missing input must remain missing/`undefined`, not coerced to `0`, except inside calculator-specific tolerant form boundaries.

- 2026-10-01: dùng `npx tsx scripts/_tmp_list.ts` (tsx tải tạm vào npx cache, KHÔNG thêm vào package.json) để liệt kê trường theo `deriveInstitutionSupportStatus`; script tạm đã xoá sau khi chạy. Cần danh sách thật các trường chưa exact thì làm lại cách này vì `docs/school-status.md` từng lệch (VD VNU-LS đã exact nhưng docs vẫn ghi "chỉ kiểm tra điều kiện").

- 2026-10-05: khảo sát độ ổn định/xác thực dữ liệu — 3463 test pass, audit 0 lỗi/35 DATA_GAP, 195 exact. Baseline `check:sources` (repo private, 436 URL) đã commit; thêm `npm run rollover:plan` (private) phân loại trường carry-forward/review từ state. Link VNKGU `vnkgu-priority-2026` đã đổi sang trang mới (cũ 404). BVU `bvu-admission-2026` vẫn 404 nhưng đã ghi chú historical, thay bằng `bvu-diem-trung-tuyen-2026`. Năm sau: chạy lại `check:sources` rồi `rollover:plan` để biết trường nào cần rà.

- 2026-10-07: nâng cấp UI (nhánh `ui-upgrade-2026-10`, chưa commit/merge) — cài `@fontsource/be-vietnam-pro` (tự host, import 6 file css vietnamese/latin 600-800 ở `src/main.tsx`; KHÔNG gọi Google Fonts) chỉ cho tiêu đề h1-h3 + số điểm lớn (`font-display`); `--text-xs` nâng 12→13px; `SiteHeader` hiện ở MỌI trang (kể cả 16 trang trường "nặng", `Header.tsx` giờ là khối định danh trường với h1 = tên trường); trang chủ hero 2 cột; `SectionHeader` có `progress` (✓ Đã nhập đủ / ! Thiếu N ô / ○ Chưa nhập, đếm bằng `components/sectionProgress.ts`). Gỡ font: `npm uninstall @fontsource/be-vietnam-pro` + xoá import trong main.tsx + `--font-display` trong index.css.

- 2026-10-07 (rà soát toàn bộ 355 trang ở 390px): thêm `src/core/userFacingText.ts` (lọc ghi chú kỹ thuật — tên file, mã kebab-case, "batch N" — khỏi chữ hiển thị; áp ở mô tả trường, `gap.label`, `source.title`, `EvidenceLinks`; dữ liệu gốc KHÔNG bị sửa) + `body { overflow-wrap: break-word }` (hết tràn ngang). Khôi phục dấu tiếng Việt cho tên trường/ngành/ghi chú hiển thị (public `src/schools/*` + bản gốc private `uniscorevn-data/normalized/runtime-source-snapshot`, ĐỒNG BỘ 2 nơi — nếu chỉ sửa public thì lần export sau sẽ ghi đè). Còn lại: văn phong ghi chú "Phạm vi chưa tính được" nhiều thuật ngữ lập trình (evaluator, scoreConversion, ApplicantProfile...) cần viết lại thủ công ở repo data.

- 2026-10-08 (a11y/bàn phím/A+): **sửa bug nghiêm trọng** — `SiteHeader` gọi `useFocusTrap` vô điều kiện làm phím Tab bị chặn trên toàn site (có sẵn từ trước, nhưng lộ ra 16 trang nặng khi bật SiteHeader mọi trang); đã tách `MobileMenu` mount có điều kiện + test chống tái phạm `siteHeaderFocusTrap.test.ts`. Khác: `--color-warning` #b54708→#9a3b07 (đạt AA trên nền cảnh báo), bỏ `<main>` lồng (`div`), vùng cuộn ngang có `tabIndex/role=region/aria-label` (nhãn phải duy nhất), CSS `fieldset{min-inline-size:0}` (hết tràn A+), `userFacingText` có bảng thuật ngữ (evaluator→bộ tính điểm, exact→chính xác...). Quét: axe-core 0 lỗi (26 trang × 2 cỡ chữ), Lighthouse mobile 100/100/100 (5 trang), A+ 355 trang 0 tràn ngang. Cách quét hàng loạt: Playwright python trên `vite preview` (KHÔNG dùng dev server).
