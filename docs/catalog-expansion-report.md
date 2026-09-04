# Catalog Expansion Report — Batch 1 (2026-09-04)

This report documents the first batch of a catalog-breadth-expansion effort: growing the
UniScoreVN institution catalog toward completeness for Vietnamese tertiary institutions,
**independent of calculator/admission-data depth**. See the process rules in
[docs/data-methodology.md](data-methodology.md) and [docs/school-status.md](school-status.md).

Core principle applied throughout: **"Missing data is acceptable. Invented data is not."** and
**"Catalog presence does not imply admission support."** Every institution added in this batch is
`catalog-only` — no `exactCalculator`, `eligibility`, `cutoffs`, `scoreConversion`, or
`admissionInfo` capability was set. None was researched for admission rules in this batch.

## Summary

| Metric | Before | After |
|---|---:|---:|
| Total catalog entries (search/compare) | 267 | 273 |
| Independent education institutions (KPI) | 255 | 261 |
| Internal/non-KPI entries | 12 | 12 |
| University-level entries | 204 | 210 |
| Academies | 22 | 22 |
| Pedagogical colleges | 3 | 3 |
| Vocational colleges | 26 | 26 |
| Catalog-only entries | 41 | 47 |
| Admission data available (researched+) | 226 | 226 (unchanged) |
| Eligibility-only | 22 | 22 (unchanged) |
| Partial calculator | 3 | 3 (unchanged) |
| **Verified calculator** | **134** | **134 (unchanged, as required)** |

New catalog-only institutions added: **6**.
Possible duplicates avoided (identified during research, not added): **4** (see below — VNAM,
VNAD, VNUFA/Trường ĐH Mỹ thuật Việt Nam, SKDA, and Học viện Âm nhạc Huế/`ham` were initially
suspected missing but confirmed already present in the registry under existing ids).
Institutions flagged for later-batch triage (not added this batch, not confirmed excludable
either): see "Not added / needs review" table below.
No institutions were found to require exclusion for merger/rename in this batch (no TUCST-style
case encountered among the candidates researched).

## Methodology this batch

1. Read `README.md`, `docs/data-methodology.md`, `docs/school-status.md`, `src/core/schoolModule.ts`
   (schema: `SchoolOwnership`, `SchoolRegion`, `SchoolEntityLevel`, `SchoolCapabilities`), and the
   `RemainingCatalogSchool` shape in `src/generated/remainingCatalog.generated.ts` /
   `uniscorevn-data/normalized/runtime-source-snapshot/remainingCatalog.ts` (the private source of
   truth; `npm run export:runtime` copies it verbatim into the public generated file).
2. Extracted every existing school id across all four catalog files
   (`finalCatalog.ts`/`collegeCatalog.ts`/`southernCatalog.ts`/`remainingCatalog.ts`, 241 unique ids)
   plus the ~150 promoted `src/schools/<id>/` modules, to diff against.
3. Cross-referenced against a Vietnamese-Wikipedia institution list (used only as a lead generator,
   per the source-priority rule — never as sole evidence) and targeted web searches for individual
   institutions suspected missing (public university/academy tier only, per this session's scope).
4. For every candidate, verified: (a) it is not already present in the registry under a different
   id/abbreviation (full-text grep across both repos for the Vietnamese name substrings), (b) its
   official `.edu.vn` domain via live web search (never Facebook/Wikipedia/third-party admissions
   aggregators as the sole source), (c) that it is a legally independent institution, not a faculty/
   member-school already modeled separately or a renamed/merged entity.
5. Added the confirmed-missing institutions as minimal catalog-only entries in the private repo's
   `normalized/runtime-source-snapshot/remainingCatalog.ts` (same shape/pattern as neighboring
   entries: `id`, `shortName`, `name`, `location`, `ownership`, `region` — no new fields).
6. Ran `npm run validate` and `npm run export:runtime` in the private repo, then in the public repo:
   `tsc --noEmit`, full `npm run test`, `npm run lint`, `npm run build`, `npm run audit:data`,
   `npm run validate:generated`, `npm run stats:coverage`, `npm run coverage:chart`.
7. Updated the 6 hard-coded catalog-count assertions that legitimately changed (see below) — none of
   the verified/partial/eligibility/admission-data-available assertions were touched.

## Added institutions

| ID | Institution | Type | Province | Official website | Status |
|---|---|---|---|---|---|
| `epu` | Trường Đại học Điện lực (Electric Power University) | University (public, Bộ Công Thương) | Hà Nội | https://epu.edu.vn/ | catalog-only |
| `vutm` | Học viện Y Dược học cổ truyền Việt Nam (Vietnam University of Traditional Medicine) | Academy (public, Bộ Y tế) | Hà Nội | https://vutm.edu.vn/ | catalog-only |
| `huph` | Trường Đại học Y tế Công cộng (Hanoi University of Public Health) | University (public, Bộ Y tế) | Hà Nội | https://huph.edu.vn/ | catalog-only |
| `hmtu` | Trường Đại học Kỹ thuật Y tế Hải Dương (Hai Duong Medical Technical University) | University (public, Bộ Y tế) | Hải Dương | https://hmtu.edu.vn/ | catalog-only |
| `ndun` | Trường Đại học Điều dưỡng Nam Định (Nam Dinh University of Nursing) | University (public, Bộ Y tế) | Nam Định | https://ndun.edu.vn/ | catalog-only |
| `huart` | Trường Đại học Nghệ thuật, Đại học Huế (Hue University of Arts) | Member university (public, Đại học Huế cluster) | Huế | https://nghethuathue.edu.vn/ | catalog-only |

Notes on individual entries:
- `epu` — confirmed public, transferred from EVN to Bộ Công Thương in 2015 (Quyết định
  10268/QĐ-BCT); distinct from the already-cataloged `hepc` (Trường Cao đẳng Điện lực TP.HCM, a
  separate vocational college).
- `vutm` — classified `university-level` (not `academy`) in the KPI breakdown despite the "Học
  viện" name, because the flat `RemainingCatalogSchool` catalog shape used for unpromoted
  catalog-only entries has no `entityLevel` field (only schools promoted to a full `src/schools/<id>/`
  module can set `entityLevel: 'academy'`). This is pre-existing project behavior, not something
  introduced by this batch — every other currently-catalog-only "Học viện" is bucketed the same way.
- `huart` — a genuine member university of Đại học Huế, following the exact same modeling
  convention already used for `husc`/`hce`/`hul`/`huaf`/`hueedu`/`hump`/`hufl`/`hat` (all Đại học
  Huế member schools already in the registry). It split from Học viện Âm nhạc Huế (`ham`, already
  in the registry) in 1994 when the fine-arts/pedagogy stream moved to Bộ Giáo dục & Đào tạo /
  Đại học Huế while the music stream stayed under Bộ Văn hoá, Thể thao và Du lịch — confirmed two
  distinct legal entities, not a rename.

## Not added / needs review

| Institution | Reason | Notes |
|---|---|---|
| Học viện Âm nhạc Quốc gia Việt Nam (VNAM) | duplicate | Already in registry as `vnam` (researched status, `finalCatalog.ts`). Initially suspected missing during Wikipedia cross-check; confirmed present before any edit. |
| Học viện Múa Việt Nam (VNAD) | duplicate | Already in registry as `vnad` (researched status). Same false-positive pattern as above. |
| Trường Đại học Mỹ thuật Việt Nam (VNUFA) | duplicate | Already in registry as `vnufa` (researched status). |
| Trường Đại học Sân khấu - Điện ảnh Hà Nội (SKDA) | duplicate | Already in registry as `skda` (researched status). Its HCMC sibling (`skdahcm`) was also already present. |
| Học viện Âm nhạc Huế (HAM) | duplicate | Already in registry as `ham` (researched status). Distinct from newly-added `huart` (Đại học Huế arts member school) — the two split in 1994; verified both are legitimate separate entities rather than assuming a single merged one. |
| Trường Đại học Kinh tế Kỹ thuật Công nghiệp (UNETI), Trường Đại học Công nghiệp Việt Trì, Trường Đại học Sao Đỏ, Trường Đại học Công nghiệp Quảng Ninh, Trường Đại học Công nghiệp Việt-Hung, Trường Đại học Xây dựng Miền Tây, Trường Đại học Tài chính - Quản trị kinh doanh, Trường Đại học Nông Lâm Bắc Giang, Trường Đại học Kinh tế Nghệ An, Học viện Tòa án, Trường Đại học Kiểm sát Hà Nội, Trường Đại học Lao động - Xã hội, Trường Đại học Công nghệ Đồng Nai, Trường Đại học Thể dục Thể thao Bắc Ninh | unclear legal status / not yet verified this batch | Surfaced as leads via the Wikipedia cross-check but NOT independently verified (official domain + independence + no-duplicate check) in this session due to session scope; deferred to a follow-up batch rather than added speculatively. `Trường Đại học Thể dục Thể thao Bắc Ninh` needs an explicit check against the already-cataloged `upes1` (Bắc Ninh Sport University) id before any action — likely already the SAME institution under a different display name, not a gap. |
| Thanh Hóa University of Culture, Sports and Tourism (TUCST) | merged, correctly excluded already | Already documented in `docs/school-status.md` as merged into HDU per Quyết định 1268/QĐ-TTg (14/7/2026) — confirmed still correctly excluded, no action needed. Reconfirmed as a sanity check per this batch's dedup-vigilance requirement, not a new finding. |
| Religious/seminary institutions (Buddhist academies, Catholic/Protestant theological institutes, etc.) surfaced in the Wikipedia list | outside project scope (likely) | These generally do not use standard THPT-exam-score-based national admission; scope determination deferred — not added, not confirmed excluded, flagged for a future scope decision rather than silently dropped or silently added. |
| Assorted small/obscure private universities in the Wikipedia list (Bac Ha International University, Intracom University, Ha Hoa Tien University, Thanh Dong University, Van Xuan University of Technology, etc.) | no reliable source checked this batch | Wikipedia-only leads, not verified against an official domain or checked for duplicate/renamed status in this session — explicitly deferred rather than added on a single secondary source. |

## Test/build status

- `npm run validate` (private): OK.
- `npm run export:runtime` (private): wrote all 4 generated artifacts; public repo diff was
  exactly the intended 9-line addition to `remainingCatalog.generated.ts`.
- `tsc --noEmit`: clean.
- `npm run test`: 355/355 test files, 2707/2707 tests passing (6 tests updated for the legitimate
  catalog-count drift: `src/schools/index.test.ts`, `src/data/institutionCoverage.test.ts`,
  `src/components/landingCatalog.test.ts`, `src/compare/evaluateApplicantAcrossSchools.test.ts`,
  plus the `docs/school-status.md` anti-drift check). No test asserting verified/partial/
  eligibility/admission-data-available counts was touched.
- `npm run lint`: clean.
- `npm run build`: succeeds (pre-existing bundle-size warning on `index-*.js`/`comparisonRegistry-*.js`
  chunks, unrelated to this change).
- `npm run audit:data`: 0 catalog audit errors, 0 catalog audit warnings; confirms 273 catalog
  entries / 261 independent institutions / 134 verified calculators.
- `npm run validate:generated`: OK, 4 runtime artifacts validated.
- `npm run stats:coverage` / `npm run coverage:chart`: regenerated; README KPI table and
  `docs/coverage-chart.svg` updated to match.

## Notable pre-existing issue found (not fixed broadly, per instructions)

`README.md`'s coverage narrative paragraph and KPI table were stale — they displayed **111**
verified calculators and a **267/255** catalog/independent count, while the actual registry
(confirmed by `docs/school-status.md`'s own batch history and `npm run stats:coverage`) already
stood at **134** verified / **267/255** catalog before this batch. This is a pre-existing
documentation-sync gap from a prior session (README wasn't regenerated after later verified-
calculator batches), not something introduced by this catalog-expansion batch. Since this batch
already needed to touch the KPI table for the count increase, the stale 111 was corrected to the
already-true 134 in the same edit — this is a display correction of an existing fact, not new
verification work, and does not change any registry data or capability.

## Recommendation for next batch

- Verify the "unclear legal status / not yet verified" list above (13 leads) individually — this
  is the natural next increment, same tier (universities), before moving to pedagogical/vocational
  colleges.
- Resolve whether `Trường Đại học Thể dục Thể thao Bắc Ninh` is the same institution as the
  already-cataloged `upes1` before treating it as a lead.
- Make an explicit scope decision on religious/seminary institutions (do they belong in
  UniScoreVN's catalog at all, given they don't appear to use standard THPT-score admission?) before
  the next batch touches that list, rather than repeatedly re-surfacing them as ambiguous leads.
- Pedagogical colleges and vocational colleges (GDNN) tier was explicitly out of scope for this
  session per the brief and is a reasonable target for the next batch.
