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
