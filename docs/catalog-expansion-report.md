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

## Recommendation for next batch (superseded by Batch 2 below)

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

---

# Batch 2 (2026-09-04/05)

This batch resolves the 13 needs-review leads from Batch 1, the two specific open questions
(Bắc Ninh Sport University / `upes1`, religious/seminary scope), and cross-references the
`college_pedagogy` tier against a nationwide sweep of provincial Cao đẳng Sư phạm colleges.

## Summary

| Metric | Before (Batch 1 end) | After Batch 2 |
|---|---:|---:|
| Total catalog entries (search/compare) | 273 | 286 |
| Independent education institutions (KPI) | 261 | 274 |
| Internal/non-KPI entries | 12 | 12 |
| University-level entries | 210 | 220 |
| Academies | 22 | 22 |
| Pedagogical colleges | 3 | 6 |
| Vocational colleges | 26 | 26 |
| Catalog-only entries | 47 | 60 |
| Admission data available (researched+) | 226 | 226 (unchanged) |
| Eligibility-only | 22 | 22 (unchanged) |
| Partial calculator | 3 | 3 (unchanged) |
| **Verified calculator** | **134** | **134 (unchanged, as required)** |

New catalog-only institutions added this batch: **13** (10 from the 13 leads + 3 pedagogical
colleges). Vocational colleges (GDNN) tier was not attempted this batch — see recommendation below.

## Part A — Resolution of the 13 needs-review leads

Each lead was checked for (a) a live, institution-controlled `.edu.vn` domain via web search/fetch,
(b) full-text grep across both repos for name/domain collisions, (c) any known
merger/rename/dissolution event that would make it not-independent.

### Added (10)

| ID | Institution | Official website | Notes |
|---|---|---|---|
| `uneti` | Trường Đại học Kinh tế - Kỹ thuật Công nghiệp | https://uneti.edu.vn/ | Public, Bộ Công Thương, Hà Nội (+ Ninh Bình campus) |
| `vui` | Trường Đại học Công nghiệp Việt Trì | https://vui.edu.vn/ | Public, Bộ Công Thương, Phú Thọ |
| `saodo` | Trường Đại học Sao Đỏ | http://saodo.edu.vn/ | Public, Bộ Công Thương, Hải Dương |
| `qui` | Trường Đại học Công nghiệp Quảng Ninh | https://qui.edu.vn/ | Public, Bộ Công Thương, Quảng Ninh — distinct from `qnu` (Quy Nhơn University); already flagged as a distinct entity in an earlier `qnu` research note |
| `viu` | Trường Đại học Công nghiệp Việt-Hung | https://viu.edu.vn/ | Public, Hà Nội |
| `mtu` | Trường Đại học Xây dựng Miền Tây | https://mtu.edu.vn/ | Public, Vĩnh Long — distinct from `muce` (Trường Đại học Xây dựng Miền Trung, Phú Yên) already cataloged |
| `bafu` | Trường Đại học Nông - Lâm Bắc Giang | https://bafu.edu.vn/ | Public, Bắc Giang |
| `hvta` | Học viện Tòa án | https://hocvientoaan.edu.vn/ | Public, trực thuộc TAND Tối cao, Hà Nội |
| `tks` | Trường Đại học Kiểm sát Hà Nội | https://tks.edu.vn/ | Public, trực thuộc VKSND Tối cao, Hà Nội |
| `dntu` | Trường Đại học Công nghệ Đồng Nai | https://dntu.edu.vn/ | Private, Đồng Nai — distinct from `dnu`/`dnpu.edu.vn` (Trường Đại học Đồng Nai, public, verified calculator) |

### Declined (3)

| Institution | Reason |
|---|---|
| Trường Đại học Lao động - Xã hội | Duplicate — already present as `ulsa` (`finalCatalog.ts`), researched status. No action. |
| Trường Đại học Tài chính - Quản trị kinh doanh (UFBA) | **Merged/subsidiary, correctly excluded.** Dissolved into "Phân hiệu Học viện Tài chính tại tỉnh Hưng Yên" — a branch campus of the already-cataloged `aof` (Học viện Tài chính) — per Quyết định 691/QĐ-TTg (16/4/2026). Confirmed independently: `ufba.edu.vn`'s live TLS certificate now covers `*.hvtc.edu.vn` (Học viện Tài chính's own domain), i.e. UFBA's web infrastructure has literally been absorbed into AOF's. Not added as independent. |
| Trường Đại học Kinh tế Nghệ An | **Already present under a different display name**, not a new gap. Same domain (`naue.edu.vn`) as the existing `naue` entry (`finalCatalog.ts`). The institution itself renamed to "Trường Đại học Nghệ An" per Quyết định 1653/QĐ-TTg (26/12/2024), which also merged in the former Nghệ An Pedagogical College. Action taken: corrected the `name` field on the existing `naue` entry to `"Trường Đại học Nghệ An (trước đây là Trường Đại học Kinh tế Nghệ An)"` — id and shortName (`NAUE`) left unchanged for backward compatibility. This is a factual correction to an existing entry, not a new addition, and does not touch any capability. |

### Bắc Ninh Sport University / `upes1` (open question, resolved)

Confirmed identical: `upes1` in the registry is `Trường Đại học Thể dục Thể thao Bắc Ninh`, which is
the exact institution the English Wikipedia lead calls "Bắc Ninh Sport University" — same legal
entity, just a different display-language name. No duplicate risk, no action needed.

### Religious/seminary institutions (open question, scope decision made)

**Decision: out of scope for the UniScoreVN catalog, at least for now — documented explicitly rather
than left as a repeatedly-resurfaced ambiguous lead.**

Rationale: `README.md`'s own scope statement ("UniScoreVN xây dựng danh mục các cơ sở tuyển sinh đại
học và cao đẳng tại Việt Nam") does not explicitly carve out or explicitly include religious
institutions — there is no existing precedent in the registry either way. Vietnamese Buddhist
academies (Học viện Phật giáo Việt Nam, several regional campuses) and Catholic/Protestant
seminaries are degree-issuing under religious-authority recognition, but their admission process is
fundamentally different from every other entry in this catalog: candidates are nominated/endorsed by
their religious order (Giáo hội Phật giáo Việt Nam, a diocese, etc.) rather than applying through the
standard THPT-exam/transcript/national-aptitude-test pathways this app's `ApplicantProfile` and
comparison engine are built around. Since UniScoreVN's core value proposition (score-based
eligibility/calculator comparison) categorically cannot apply to these institutions even in a
catalog-only sense that would ever graduate to eligibility/calculator support, and the project has no
existing framework or precedent for modeling admission-by-religious-nomination, the most conservative
and honest call is to leave them out entirely rather than add them as catalog-only entries that could
never legitimately progress. This is a scope decision, not a data gap — do not re-flag these as
"needs review" in future batches unless the project's admission-modeling scope is deliberately
expanded to cover non-score-based nomination processes.

## Part B — Pedagogical colleges (`college_pedagogy`) tier

The existing `college_pedagogy` tier only covered the 3 "Trường Cao đẳng Sư phạm Trung ương" (CĐSPTW)
campuses (Hà Nội/`nce`, Nha Trang/`ncspnt`, TP.HCM/`ncehcm`) — a single national institution's 3
campuses, not the wider population of provincial Cao đẳng Sư phạm across Vietnam. This batch searched
for provincial CĐSP schools to cross-reference against this tier.

**Key finding: most provincial CĐSP have already been merged/dissolved**, consistent with a
nationwide teacher-training-system restructuring reported by multiple sources in 2025/2026
("Đề xuất sáp nhập hầu hết cao đẳng sư phạm vào các trường đại học"). Two mergers were confirmed
directly during this batch's research (and correctly NOT added):

- **Trường Cao đẳng Sư phạm Điện Biên** — merged (along with Trường Cao đẳng Y tế Điện Biên) into
  **Phân hiệu Đại học Thái Nguyên tại tỉnh Điện Biên** (a branch of Đại học Thái Nguyên, `tnu` already
  cataloged). Confirmed via a live 301 redirect from `cdspdienbien.edu.vn` to `dienbien.tnu.edu.vn`
  plus corroborating press coverage (tnu.edu.vn, giaoducthoidai.vn, Đảng bộ tỉnh Điện Biên).
- **Trường Cao đẳng Sư phạm Lạng Sơn** — merged into the multi-disciplinary **Trường Cao đẳng Lạng
  Sơn** (`lce.edu.vn`); no longer a standalone pedagogical college.

### Added (3, catalog-only, `entityLevel: 'college_pedagogy'`)

| ID | Institution | Official website | Verification |
|---|---|---|---|
| `cdspkg` | Trường Cao đẳng Sư phạm Kiên Giang | https://www.cdspkg.edu.vn/ | Live official domain with a dedicated, dated 2026 admission notice ("Thông báo tuyển sinh cao đẳng hệ chính quy năm 2026") — confirmed still independently operating, not a duplicate of the already-cataloged `vnkgu` (Trường Đại học Kiên Giang, a separate university). |
| `cdsptb` | Trường Cao đẳng Sư phạm Thái Bình | http://cdsptb.edu.vn/ | Live official domain; independent press coverage of its own 2026 organizational activities confirms it has not been merged (Thái Bình province itself was administratively merged into Hưng Yên in 2025, but the school retains its own identity/domain). |
| `cdspbrvt` | Trường Cao đẳng Sư phạm Bà Rịa - Vũng Tàu | https://www.cdspbrvt.edu.vn/ | Live official domain (found only after a follow-up domain-specific search — most search results surfaced only its Facebook page, which per this project's source-priority rule is never used as the primary identity source). |

### Not exhaustively covered (documented gap, not silently dropped)

The full authoritative list of accredited "cơ sở giáo dục đại học và cao đẳng sư phạm" is published
by Bộ GD&ĐT's Cục Quản lý chất lượng (VQA) at
https://vqa.moet.gov.vn/vi/thong-bao-quan-ly-bao-dam/thong-bao/danh-sach-cac-co-so-giao-duc-chuong-trinh-dao-tao-giao-duc-dai-hoc-va-cao-dang-su-pham-duoc-cong-nhan-dat-tieu-chuan-chat-luong-giao-duc-cap-nhat-den-ngay-31-7-2026-93.html
(updated 31/7/2026), but the actual list is inside a `.rar` attachment not retrievable via the
WebFetch tool available in this session. Without that authoritative source, this batch relied on
targeted web searches for individually-named provincial CĐSP (a non-exhaustive approach), verifying
each candidate's live domain and merger status one at a time rather than guessing at a full list.
Given the high merger rate observed (2 of the first 3 non-CĐSPTW candidates checked had already been
dissolved), a full sweep against the VQA list is recommended as a dedicated next-batch task rather
than continuing ad hoc searches, to avoid both missing genuinely-independent colleges and wasting
research budget re-discovering already-merged ones one at a time.

## Part C — Vocational colleges (GDNN) tier

**Not attempted this batch** — deferred to batch 3 per the task brief's explicit "optional, only if
time permits" framing. The `vocational_college` tier already has 26 entries sourced from Quyết định
1723/QĐ-TTg (public colleges under Bộ GD&ĐT) plus the Đà Nẵng and TP.HCM GDNN directories (see
`collegeCatalogSources` in the private repo / README's "Phạm vi và độ phủ" section). A future batch
should re-pull those same sources (they may have been updated since the original research pass) and
also consider other provincial GDNN management portals the README does not yet cite, applying the
same live-domain-verification and merger-check discipline used in this batch.

## Test/build status (Batch 2)

- `npm run validate` (private): OK, both sub-batches.
- `npm run export:runtime` (private): wrote all 4 generated artifacts for each sub-batch.
- `tsc --noEmit`: clean.
- `npm run test`: 355/355 test files, 2707/2707 tests passing after each sub-batch (count-drift
  assertions updated: `src/schools/index.test.ts`, `src/data/institutionCoverage.test.ts`,
  `src/components/landingCatalog.test.ts`, `src/compare/evaluateApplicantAcrossSchools.test.ts`, plus
  `docs/school-status.md`'s anti-drift bullet list). No verified/partial/eligibility/
  admission-data-available count was touched.
- `npm run lint`: clean.
- `npm run build`: succeeds (same pre-existing bundle-size warning as Batch 1, unrelated).
- `npm run audit:data`: 0 catalog audit errors, 0 catalog audit warnings; confirms final counts
  (286 catalog entries / 274 independent institutions / 134 verified calculators).
- `npm run validate:generated` / `npm run stats:coverage` / `npm run coverage:chart`: regenerated;
  README KPI table and `docs/coverage-chart.svg` updated to match.

## Recommendation for next batch (Batch 3)

1. **Vocational colleges (GDNN) tier** — re-pull Quyết định 1723/QĐ-TTg and the Đà Nẵng/TP.HCM GDNN
   directories already cited in the README for any colleges not yet cataloged, plus look for other
   provincial GDNN management portals; apply the same domain + merger-check discipline.
2. **Full CĐSP sweep against the VQA accredited-institutions list** (see Part B) — the `.rar`
   attachment needs a tool that can download and extract it (or manual retrieval), since WebFetch
   cannot reach its contents; this would let a future batch confirm the complete, current picture
   instead of the ad hoc per-candidate searches used here.
3. The "assorted small/obscure private universities" list flagged in Batch 1 (Bac Ha International
   University, Intracom University, Ha Hoa Tien University, Thanh Dong University, Van Xuan
   University of Technology, etc.) is still unverified and was not part of this batch's 13-lead
   scope — worth a dedicated pass.

---

# Batch 3 (2026-09-05)

This batch tackles all three items Batch 2 deferred: the vocational-college (GDNN) tier (previously
untouched), a full sweep of the VQA accredited-institutions list against the `college_pedagogy` tier
(the `.rar` blocker from Batch 2), and the leftover "assorted small/obscure private universities"
list from Batch 1.

## Summary

| Metric | Before (Batch 2 end) | After Part 1 (GDNN+CĐSP) | After Part 3 (universities) |
|---|---:|---:|---:|
| Total catalog entries (search/compare) | 286 | 303 | **307** |
| Independent education institutions (KPI) | 274 | 291 | **295** |
| Internal/non-KPI entries | 12 | 12 | 12 |
| University-level entries | 220 | 220 | **224** |
| Academies | 22 | 22 | 22 |
| Pedagogical colleges | 6 | 9 | 9 |
| Vocational colleges | 26 | 40 | 40 |
| Catalog-only entries | 60 | 77 | **81** |
| Admission data available (researched+) | 226 | 226 (unchanged) | 226 (unchanged) |
| Eligibility-only | 22 | 22 (unchanged) | 22 (unchanged) |
| Partial calculator | 3 | 3 (unchanged) | 3 (unchanged) |
| **Verified calculator** | **134** | **134 (unchanged)** | **134 (unchanged, as required)** |

New catalog-only institutions added this batch: **21** (14 vocational colleges + 3 pedagogical
colleges + 4 leftover private universities).

## Part 1 — Vocational colleges (GDNN) tier

Re-pulled the exact same official sources already cited for this tier in `README.md`'s "Phạm vi và
độ phủ" section and in `collegeCatalog.ts`'s `collegeCatalogSources`, rather than starting from a
generic web search, per the task brief.

### Quyết định 1723/QĐ-TTg (public colleges under Bộ GD&ĐT) — re-pulled, no new entries

The chinhphu.vn page only exposes a metadata shell; the actual PDF
(`datafiles.chinhphu.vn/cpp/files/vbpq/2025/8/1723-ttg.signed.pdf`, dated 12/8/2025 — a newer,
re-issued version of the decision than whatever was used originally) was downloaded and read via
the `Read` tool's PDF-to-image-vision rendering. Its list of 65 public units includes exactly the
same 12 colleges (items 45-56: `vcte`, `dungquatcollege`, `hvct`, `cic1`, `hcmcc`, `ncc`, `cuwc`,
`vietxo1`, `lilama2`, `cmc-college`, `ccst`, `hctb`) already in the registry, plus the 3 CĐSP Trung
ương campuses (items 42-44: `nce`, `ncspnt`, `ncehcm`). **No new colleges found** — this is a
positive completeness confirmation for this specific source, not a gap.

### Đà Nẵng GDNN list (danang.edu.vn, "đến 08/4/2025") — +9

The `.xlsx` attachment (previously inaccessible in earlier sessions the same way the VQA `.rar` was)
downloaded cleanly via `curl` this time and was parsed directly: unzipped as a zip archive, then the
shared-strings table and row/cell XML were parsed with a small Node script to reconstruct the table
including the "Loại hình sở hữu" (ownership) sub-columns (Công lập/DNNN/Tư thục/FDI), giving an
**authoritative per-institution ownership classification** rather than guessing from secondary
aggregators. Of its 17 "Trường cao đẳng" rows, 4 were already cataloged (`cdtm`, `dvtc`, `cfi`,
`danangcollege`); the other 13 were researched individually.

**Added (9)**, each verified with a live official domain:

| ID | Institution | Ownership (per official list) | Official website |
|---|---|---|---|
| `gtvttw5` | Trường Cao đẳng Giao thông vận tải Trung ương V | Public (Bộ Xây dựng, formerly Bộ GTVT) | caodanggtvttw5.edu.vn |
| `cep` | Trường Cao đẳng Kinh tế - Kế hoạch Đà Nẵng | Public (formerly Bộ KH&ĐT) | cep.edu.vn (returned HTTP 500 at check time; domain ownership/identity independently corroborated via its own linked tuyensinh subpage cached in search results) |
| `hscdn` | Trường Cao đẳng nghề Hoa Sen (cơ sở Đà Nẵng) | Private | hsc.edu.vn |
| `nvtc` | Trường Cao đẳng Nguyễn Văn Trỗi | Private | nguyenvantroicollege.edu.vn |
| `cdpd` | Trường Cao đẳng Phương Đông Đà Nẵng | Private | cdpd.edu.vn |
| `dpcdn` | Trường Cao đẳng Bách khoa Đà Nẵng | Private | bachkhoadanang.edu.vn |
| `vavc` | Trường Cao đẳng nghề Việt - Úc | Private | vavc.edu.vn |
| `dvcdn` | Trường Cao đẳng Đại Việt Đà Nẵng | Private | daivietdanang.edu.vn |
| `cdyd-vn` | Trường Cao đẳng Công nghệ Y - Dược Việt Nam | Private | caodangyduocvietnam.edu.vn |

Notes:
- `hscdn` (Cao đẳng nghề Hoa Sen) was independently confirmed to be a **distinct legal entity** from
  the already-cataloged `hsu` (Đại học Hoa Sen university) — described by its own materials as a
  "strategic partner" of HSU and a member of the separate Nguyễn Hoàng Education System, not a
  renamed/absorbed unit.
- An AI-summarized fetch of some of these sites guessed ownership incorrectly (e.g. called `nvtc`
  and `dpcdn` "public"); the official Đà Nẵng government spreadsheet's own ownership column was
  trusted over those guesses and confirms both are Tư thục (private).

**Declined / needs review (3)**:

| Institution | Ownership | Reason |
|---|---|---|
| Trường Cao đẳng Văn hóa - Nghệ thuật Đà Nẵng | Public | Domain dead/squatted: its `cdvhntdanang.edu.vn` does not resolve (DNS failure), and the alternate domain found in government-portal text (`vhntdng.vn`) now hosts an unrelated third-party fintech lending site (domain squatting), not the school. No live official domain could be confirmed this batch. |
| Trường Cao đẳng Công nghệ - Ngoại thương | Private | 5+ different domains (`cdcnnt.edu.vn`, `cnnt.edu.vn`, `ftcollege.edu.vn`, `truongcaodangngoaithuong.edu.vn`, `ngoaithuongcollege.edu.vn`) each present themselves as this institution's official site — too ambiguous to pick one confidently without risking citing a squatted/wrong domain. |
| Trường Cao đẳng Quốc tế Sài Gòn | Private | No confirmed dedicated `.edu.vn` domain found (only a `.vn` marketing site, a wikidot page, and third-party aggregators) — fails the official-domain-only source rule. |

### HCMC GDNN directory (gdnn.tphcm.gov.vn) — +2

The directory's homepage "cơ sở tiêu biểu" (featured institutions) widget was fetched via raw
`curl` (excluding the page's unrelated rotating `og:title`/`twitter:title` meta tags, which cycle
through random institutions on every request and are NOT part of the actual results list — an early
WebFetch pass was misled by this into treating one such meta-only name, "Trường Cao đẳng Hàng Hải và
Đường thủy II", as a real hit; it was not, once meta tags were excluded from the raw HTML). The
site's full paginated directory (~31 pages spanning every institution type across the post-2025
merged TP.HCM/Bình Dương/Bà Rịa-Vũng Tàu area) is JS/AJAX-driven and did not respond to GET-parameter
filtering (`TrinhDoID=91` for "Cao đẳng") in this session — same class of blocker as the VQA `.rar`
and Đà Nẵng `.xlsx` were before this batch, but not resolved here; a full sweep of that directory is
left for a future batch. Of the 10 Cao đẳng entries in the homepage widget, 8 were already cataloged;
these 2 are the confirmed-missing remainder:

| ID | Institution | Ownership | Official website |
|---|---|---|---|
| `ctim` | Trường Cao đẳng Bán công Công nghệ và Quản trị doanh nghiệp (CTIM) | Public (trực thuộc HEPZA — Ban Quản lý các Khu chế xuất và Công nghiệp TP.HCM) | ctim.edu.vn |
| `ctdthuduc` | Trường Cao đẳng Kinh tế - Kỹ thuật Thủ Đức | Public | tuyensinh.ctdthuduc.edu.vn (main domain ctdthuduc.edu.vn) |

## Part 2 — CĐSP sweep against the VQA accredited list

**The `.rar` blocker from Batch 2 was resolved this batch.** The VQA page
(vqa.moet.gov.vn, "...cập nhật đến ngày 31-7-2026-93.html") itself only exposed a `?download=1&id=0`
link rather than a direct `.rar` URL in its HTML; following that redirect with `curl` (rather than
WebFetch, which cannot follow through to binary downloads) successfully retrieved a 4.8MB RAR
archive. No `unrar`/`7z` binary was available on the machine (and none was installed, per the
project's do-not-install-without-asking norm for anything beyond a lightweight npm package); instead
`node-unrar-js` (a WASM-compiled unrar with no native-binary dependency) was installed via `npm` in a
scratch directory and used to extract the archive, yielding two documents: a list of accredited
institutions (`1__ds-csgd-duoc-cong-nhan-dat-tccl-31-7-2026.docx`/`.pdf`) and a much larger list of
accredited *programs* (`2__ds-ctdt-...`, not needed for this sweep). The `.docx` (a zip archive
itself) was unzipped and its `word/document.xml` parsed to plain text directly — far more reliable
than PDF vision-reading for a text table like this.

The document's "2. Các trường cao đẳng sư phạm" section lists **exactly 12** nationwide accredited
CĐSP as of 31/7/2026 (explicitly stated: "Danh sách có ... 12 trường cao đẳng sư phạm"). Cross-
referencing against the 6 already cataloged (`nce`, `ncspnt`, `ncehcm` from the original registry;
`cdspkg`, `cdsptb`, `cdspbrvt` from Batch 2) left 6 to individually research:

**Added (3)** — confirmed still independent with a live official domain and active 2026 admission
notice:

| ID | Institution | Official website |
|---|---|---|
| `cdspnd` | Trường Cao đẳng Sư phạm Nam Định | cdspnd.edu.vn |
| `cdspbn` | Trường Cao đẳng Sư phạm Bắc Ninh | cdspbacninh.edu.vn |
| `cdsphb` | Trường Cao đẳng Sư phạm Hòa Bình | cdsphoabinh.edu.vn |

**Confirmed merged, correctly NOT added (3)** — the VQA list itself is a historical accreditation
record and can lag org-chart changes, so each was independently cross-checked against current press:

| Institution | Merger | Source |
|---|---|---|
| Trường Cao đẳng Sư phạm Nghệ An | Merged into Trường Đại học Kinh tế Nghệ An, which was simultaneously renamed to Trường Đại học Nghệ An (`naue`, already in the registry) | Quyết định 1653/QĐ-TTg, 26/12/2024 — the exact same merger already documented on the `naue` entry's name-correction note since Batch 2; this is a reconfirmation, not a new finding |
| Trường Cao đẳng Sư phạm Thừa Thiên Huế | Merged (Feb 2024) with Trường Cao đẳng nghề Thừa Thiên Huế and Trường Cao đẳng Giao thông Huế into a single new "Trường Cao đẳng Huế" | Quyết định 147/QĐ-LĐTBXH (05/02/2024); corroborated by giaoduc.net.vn, tienphong.vn, nhandan.vn |
| Trường Cao đẳng Sư phạm Đà Lạt | Merged (Aug 2022) with Đà Lạt's vocational college and the Lâm Đồng Technical-Economic college into a single new "Trường Cao đẳng Đà Lạt" | Multiple corroborating press/reference sources |

**New finding beyond the VQA list**: the 3 merger-successor institutions above are themselves
genuine, currently-independent, multi-disciplinary vocational colleges that were not yet in the
catalog under any name. Along with Batch 2's already-documented CĐSP Lạng Sơn merger target (also
never actually added as its own entry, only mentioned in a code comment), all 3 successor colleges
were added as `vocational_college` entries (not `college_pedagogy`, since none of them is purely a
teacher-training institution anymore):

| ID | Institution | Official website |
|---|---|---|
| `cdhue` | Trường Cao đẳng Huế | cdhue.edu.vn |
| `cddl` | Trường Cao đẳng Đà Lạt | cddl.edu.vn |
| `lce` | Trường Cao đẳng Lạng Sơn | lce.edu.vn |

This closes the loop from Batch 2's CĐSP Điện Biên/Lạng Sơn merger findings — the previous batch
correctly excluded the absorbed CĐSP but didn't add the resulting institution; this batch confirms
the CĐSP Điện Biên merger via a second independent check (still merged into Phân hiệu Đại học Thái
Nguyên tại Điện Biên, which is a branch of the already-cataloged `tnu` — no separate entry needed
since it's modeled as part of Đại học Thái Nguyên, consistent with how other Đại học Thái Nguyên/Đà
Nẵng/Huế member branches are handled) and fully resolves Lạng Sơn's successor college.

## Part 3 — Leftover "assorted small/obscure private universities" (from Batch 1)

Batch 1 flagged 5 unverified Wikipedia-sourced leads: Bac Ha International University, Intracom
University, Ha Hoa Tien University, Thanh Dong University, Van Xuan University of Technology.

- **Bac Ha International University** — found **already present** in the registry as `bhu`
  (`Trường Đại học Quốc tế Bắc Hà`, `finalCatalog.ts`) — not a new addition. Its own site
  (`iubh.edu.vn`) states it has temporarily paused 2025-2026 admissions to focus on quality
  improvements; noted for context only, since the institution itself is already cataloged and this
  doesn't change its catalog-only status.
- The other 4 were confirmed genuinely missing and independent, each with a live official `.edu.vn`
  domain and active 2026 admission content, no id/name collision found:

| ID | Institution | Location | Ownership | Official website |
|---|---|---|---|---|
| `intracom` | Trường Đại học Intracom | Hà Nội | Private | intracomuni.edu.vn |
| `hht` | Trường Đại học Hà Hoa Tiên | Hà Nam | Private | hahoatien.edu.vn |
| `thanhdong` | Trường Đại học Thành Đông | Hải Dương | Private | thanhdong.edu.vn |
| `vxut` | Trường Đại học Công nghệ Vạn Xuân | Nghệ An | Private | vxut.edu.vn |

(Id `tdu` was avoided for Thành Đông because it collides with an existing registry id for a
different, already-cataloged school — used `thanhdong` instead.)

## Test/build status (Batch 3)

- `npm run validate` (private): OK, both sub-batches.
- `npm run export:runtime` (private): wrote all 4 generated artifacts for each sub-batch; public
  repo diffs matched the intended additions exactly (plus a small follow-up re-export after adding
  missing `catalogSources` to `cdhue`/`cddl`/`lce`, caught by
  `institutionCoverage.test.ts`'s "requires catalog source metadata" test).
- `tsc --noEmit`: clean (both repos, both sub-batches).
- `npm run test`: 355/355 test files, 2707/2707 tests passing after each sub-batch (count-drift
  assertions updated: `src/schools/index.test.ts`, `src/data/institutionCoverage.test.ts`,
  `src/components/landingCatalog.test.ts`, `src/compare/evaluateApplicantAcrossSchools.test.ts`,
  plus `docs/school-status.md`'s anti-drift shortName list and header counts). No verified/partial/
  eligibility/admission-data-available count was touched.
- `npm run lint`: clean.
- `npm run build`: succeeds (same pre-existing bundle-size warning as Batches 1-2, unrelated).
- `npm run audit:data`: 0 catalog audit errors, 0 catalog audit warnings; confirms final counts
  (307 catalog entries / 295 independent institutions / 134 verified calculators).
- `npm run validate:generated` / `npm run stats:coverage` / `npm run coverage:chart`: regenerated;
  README KPI table, narrative paragraph, and `docs/coverage-chart.svg` updated to match.

## Recommendation for next batch (Batch 4, if any)

1. **HCMC GDNN directory full sweep** — the site's paginated directory (~31 pages, covering the
   post-2025-merger TP.HCM area including former Bình Dương and Bà Rịa-Vũng Tàu institutions) is
   JS/AJAX-driven and did not yield to GET-parameter filtering in this session; only the homepage's
   10-item "featured" widget was usable. A tool that can drive the actual search form (e.g. a
   browser-automation pass, or reverse-engineering the AJAX endpoint the `TrinhDoID` select posts
   to) would likely surface more genuinely-missing Cao đẳng entries, especially from the merged-in
   Bình Dương/Bà Rịa-Vũng Tàu areas.
2. **Needs-review domain disambiguation**: Trường Cao đẳng Công nghệ - Ngoại thương (5+ competing
   domains) and Trường Cao đẳng Quốc tế Sài Gòn (no `.edu.vn` found) — both still real, named
   institutions per multiple secondary sources, just blocked on confidently identifying/confirming
   an official primary domain.
3. Trường Cao đẳng Văn hóa - Nghệ thuật Đà Nẵng's domain situation (dead + squatted) could be
   rechecked in a future batch in case the school stands up a new official domain.
4. At this point, catalog completeness has reached a reasonable stopping point for the three
   explicitly-scoped source types this campaign has worked through (national university/academy
   tier, CĐSP tier against the authoritative VQA list, and the two vocational-college directories
   the README already cites). Any further catalog growth would mean either expanding into GDNN
   directories the README does NOT yet cite for additional provinces (a scope-widening decision, not
   just "the next batch") or continued incremental leads surfacing organically during future
   admission-data research batches. Recommend treating catalog-breadth-expansion as substantially
   complete for now unless a specific new authoritative source is identified.

---

# Batch 4 (2026-09-07)

The project owner explicitly requested another expansion pass despite Batch 3's "substantially
complete for now" recommendation. This batch used a new lead source not previously tapped
(a nationwide "mã trường"/admission-code roster, third-party but comprehensive) and a targeted
re-sweep of the already-cataloged military/police academy tier for gaps in the same category.

## Summary

| Metric | Before (Batch 3 end) | After Batch 4 |
|---|---:|---:|
| Total catalog entries (search/compare) | 307 | **319** |
| Independent education institutions (KPI) | 295 | **307** |
| Internal/non-KPI entries | 12 | 12 |
| University-level entries | 224 | **235** |
| Academies | 22 | 22 |
| Pedagogical colleges | 9 | 9 |
| Vocational colleges | 40 | **41** |
| Catalog-only entries | 81 | **93** |
| Admission data available (researched+) | 226 | 226 (unchanged) |
| Eligibility-only | 22 | 22 (unchanged) |
| Partial calculator | 3 | 3 (unchanged) |
| **Verified calculator** | **134** | **134 (unchanged, as required)** |

New catalog-only institutions added this batch: **12**. All catalog-only — no `exactCalculator`,
`eligibility`, `cutoffs`, `scoreConversion`, or `admissionInfo` capability was set for any of them.

## Methodology this batch

1. Re-read `README.md`, `docs/data-methodology.md`, `docs/school-status.md`,
   `docs/catalog-expansion-report.md` (batches 1-3), `src/core/schoolModule.ts` (schema unchanged
   since batch 3), and the `RemainingCatalogSchool`/`CollegeCatalogSchool` shapes in
   `uniscorevn-data/normalized/runtime-source-snapshot/{remainingCatalog,collegeCatalog}.ts`.
2. Extracted a working set of ~315 lowercased ids already in the registry (all 4 catalog files'
   generated output + every promoted `src/schools/<id>/` module directory) to diff new candidates
   against.
3. Pulled a nationwide "mã trường" (admission-code) roster from vietjack.com — a secondary
   aggregator, used strictly as a **lead generator** per the source-priority rule, never as sole
   identity/existence evidence — covering every province's universities/academies/CĐSP plus the
   military/police officer-training tier. Cross-referenced every name on that roster against the
   existing registry via full-text grep (case-insensitive, substring match on the Vietnamese
   institution name) to filter out already-cataloged entries before spending any web-research
   budget on a candidate.
4. For every surviving candidate, independently verified via live web search/fetch: (a) it is not
   already present in the registry under a different id/display name/renamed identity, (b) it has a
   live, institution-controlled official domain (never Facebook/Wikipedia/third-party admissions
   aggregator/dead-or-squatted domain), (c) it is a legally independent institution, not a
   faculty/branch-campus/absorbed entity. Two candidates failed step (a) after deeper research
   (confirmed already-merged into an already-cataloged institution — see "Not added" below) and one
   failed step (b) (no live domain found).
5. For the 5 military-academy candidates, applied the same "one legal entity, one catalog entry"
   convention already established for other dual-track (quân sự/dân sự admission code) schools
   already in the registry (e.g. `msa`/Học viện Khoa học Quân sự has one entry despite dual tracks)
   — confirmed via research that each pair of admission codes (e.g. `VPH`+`ZPH` for Trần Đại Nghĩa)
   refers to the same institution's two recruitment tracks, not two institutions, before adding a
   single entry.
6. Added the 11 university/military-tier entries to the private repo's
   `normalized/runtime-source-snapshot/remainingCatalog.ts` (same minimal shape as prior batches:
   `id`, `shortName`, `name`, `location`, `ownership`, `region`) and the 1 vocational-college entry
   (Trường Cao đẳng Cần Thơ) to `collegeCatalog.ts` (`entityLevel: 'vocational_college'`, with a
   `catalogSources` entry, matching that file's existing convention).
7. Ran `npm run validate` and `npm run export:runtime` in the private repo, then in the public repo:
   `tsc --noEmit`, full `npm run test`, `npm run lint`, `npm run build`, `npm run audit:data`,
   `npm run validate:generated`, `npm run stats:coverage`, `npm run coverage:chart`, `npm run
   check:docs`.
8. Updated the hard-coded catalog-count assertions that legitimately changed
   (`src/schools/index.test.ts`, `src/data/institutionCoverage.test.ts`,
   `src/components/landingCatalog.test.ts`, `src/compare/evaluateApplicantAcrossSchools.test.ts`)
   plus `docs/school-status.md`'s anti-drift shortName list/header count and `README.md`'s KPI
   table/narrative/support-status table — none of the verified/partial/eligibility/
   admission-data-available assertions were touched.

## Added institutions

| ID | Institution | Type | Province | Official website | Status |
|---|---|---|---|---|---|
| `iuv` | Trường Đại học Công nghiệp Vinh | University (private) | Nghệ An | https://iuv.edu.vn/ | catalog-only |
| `mit` | Trường Đại học Công nghệ Miền Đông | University (private) | Đồng Nai | https://mit.vn/ | catalog-only |
| `thuv` | Trường Đại học Y khoa Tokyo Việt Nam | University (private/FDI) | Hưng Yên | https://tokyo-human.edu.vn/ | catalog-only |
| `hpu` | Trường Đại học Quản lý và Công nghệ Hải Phòng | University (private) | Hải Phòng | https://hpu.edu.vn/ | catalog-only |
| `dau` | Trường Đại học Kiến trúc Đà Nẵng | University (private) | Đà Nẵng | https://dau.edu.vn/ | catalog-only |
| `siu` | Trường Đại học Quốc tế Sài Gòn | University (private) | TP.HCM | https://siu.edu.vn/ | catalog-only |
| `tsqdc` | Trường Sĩ quan Đặc công | Military academy (public) | Hà Nội | https://tsqdc.edu.vn/ | catalog-only |
| `tgh` | Trường Sĩ quan Tăng - Thiết giáp | Military academy (public) | Vĩnh Phúc | https://siquantangthietgiap.vn/ | catalog-only |
| `nguyenhue` | Trường Đại học Nguyễn Huệ (Trường Sĩ quan Lục quân 2) | Military academy (public) | Đồng Nai | https://daihocnguyenhue.edu.vn/ | catalog-only |
| `tdnu` | Trường Đại học Trần Đại Nghĩa (Trường Sĩ quan Kỹ thuật Quân sự) | Military academy (public) | TP.HCM | https://tdnu.edu.vn/ | catalog-only |
| `ngoquyen` | Trường Sĩ quan Công binh - Đại học Ngô Quyền | Military academy (public) | Bình Dương | https://tsqcb.edu.vn/ | catalog-only |
| `cdct` | Trường Cao đẳng Cần Thơ | Vocational college (public) | Cần Thơ | https://tuyensinh.cdct.edu.vn/ | catalog-only |

Notes on individual entries:
- `iuv` — verified private (Wikipedia + press corroboration: "cơ sở giáo dục đại học tư thục, có tư
  cách pháp nhân"), distinct from the already-cataloged public `vinhuni`/Trường Đại học Vinh.
- `hpu` — id chosen to avoid collision with the already-cataloged `hpu2`
  (Trường Đại học Sư phạm Hà Nội 2, an unrelated school whose id predates this batch and was NOT
  renamed, per the no-rename rule); the vietjack roster happens to reuse "HPU"/"DHP"-style codes
  loosely and should not be read as evidence these are the same institution.
- `siu` (Trường Đại học Quốc tế Sài Gòn) — this exact institution was flagged in Batch 3's
  "needs review" table for lacking a confirmed `.edu.vn` domain. This batch found a live
  `siu.edu.vn` with active 2026 admission content, resolving that open item.
- `tdnu` / `ngoquyen` / `nguyenhue` — each is one legal institution with two admission-code tracks
  (quân sự/dân sự); modeled as a single catalog entry, consistent with how every other
  already-cataloged military academy with a civil admission track is modeled (e.g. `msa`, `mta`,
  `vmmu`). `nguyenhue` (Sĩ quan Lục quân 2) is confirmed distinct from the already-cataloged `tqt`
  (Sĩ quan Lục quân 1) — two separate officer-training schools, not a duplicate.
- `cdct` — press coverage (dantri.com.vn, Nov 2025) describes an unexecuted "phương án sắp xếp"
  (reorganization proposal) to merge this school into Trường Cao đẳng Kinh tế - Kỹ thuật Cần Thơ.
  As of this batch the school's own domain still independently publishes 2026 admission content
  under its own name/identity, so it was added as still-independent — flagged here for a future
  batch to re-check in case the merger proceeds.

## Not added / needs review

| Institution | Reason | Notes |
|---|---|---|
| Trường Đại học Nội vụ Hà Nội | merged | Merged into Học viện Hành chính Quốc gia (`napa`, already cataloged) on 15/9/2022. Confirmed via multiple independent sources; not a new gap. |
| Trường Đại học Tài chính - Kế toán (Quảng Ngãi, UFA) | merged/subsidiary | Merged into Trường Đại học Tài chính – Marketing (`ufm`, already cataloged, note the en-dash in its stored `name` — a grep for a plain hyphen falsely suggested it was missing until this was caught) as a branch campus ("Phân hiệu ... tại Quảng Ngãi"), per a Deputy PM decision signed 24/12/2025. Confirmed via tuoitre.vn/vnexpress.net/thanhnien.vn corroborating coverage. |
| Trường Đại học Mỹ thuật Công nghiệp Á Châu (AUAD) | no reliable source / dead domain | Private, established 2011, actively admitting per secondary sources, but its only known domains (`auad.edu.vn`, `tuyensinh.auad.edu.vn`) both fail DNS resolution at verification time. Not to be confused with the already-cataloged public `uad`/Trường Đại học Mỹ thuật Công nghiệp (est. 1949) — a different, older institution whose own domain (`uad.edu.vn`) initially caused confusion during this batch's research before the two were correctly disambiguated. Left unadded per the no-invented-URL rule; worth rechecking in a future batch in case AUAD stands up a new live domain. |

No other candidates surfaced by the vietjack roster warranted action this batch: the roster's
extensive military/police-academy and CĐSP sections were cross-checked and found either
already-cataloged (under the same or a corrected display name) or already covered by Batch 2/3's
merger findings (e.g. CĐSP Điện Biên, CĐSP Lạng Sơn, CĐSP Nghệ An, CĐSP Thừa Thiên Huế, CĐSP Đà Lạt
— all previously confirmed merged, reconfirmed present-as-merged here, no new action taken).

## Test/build status (Batch 4)

- `npm run validate` (private): OK.
- `npm run export:runtime` (private): wrote all 4 generated artifacts; public repo diff was exactly
  the intended 12-entry addition (11 to `remainingCatalog.generated.ts`, 1 to
  `collegeCatalog.generated.ts`).
- `tsc --noEmit`: clean.
- `npm run test`: 368/368 test files, 2771/2771 tests passing (count-drift assertions updated:
  `src/schools/index.test.ts`, `src/data/institutionCoverage.test.ts`,
  `src/components/landingCatalog.test.ts`, `src/compare/evaluateApplicantAcrossSchools.test.ts`,
  plus `docs/school-status.md`'s anti-drift shortName list and header count). No verified/partial/
  eligibility/admission-data-available count was touched.
- `npm run lint`: clean (one pre-existing, unrelated `react/only-export-components` warning in
  `src/core/TextSizeContext.tsx`, not touched by this batch).
- `npm run build`: succeeds.
- `npm run audit:data`: 0 catalog audit errors, 0 catalog audit warnings; confirms final counts
  (319 catalog entries / 307 independent institutions / 134 verified calculators).
- `npm run validate:generated` / `npm run stats:coverage` / `npm run coverage:chart` /
  `npm run check:docs`: regenerated; README KPI table, narrative paragraph, support-status table,
  and `docs/coverage-chart.svg` updated to match; `check:docs` confirms no README/institutionCoverage
  drift.

## Recommendation for next batch (Batch 5, if any)

1. Re-check `cdct` (Trường Cao đẳng Cần Thơ) for the proposed merger into Trường Cao đẳng Kinh tế -
   Kỹ thuật Cần Thơ mentioned in Nov-2025 press — not yet enacted at this batch's verification time.
2. Re-check `auad` (Trường Đại học Mỹ thuật Công nghiệp Á Châu) for a live official domain.
3. The HCMC GDNN directory's full paginated sweep (flagged since Batch 3) is still not done — its
   JS/AJAX-driven search form has not yielded to any tool available in these sessions so far.
4. Trường Cao đẳng Công nghệ - Ngoại thương (5+ competing domains) and Trường Cao đẳng Văn hóa -
   Nghệ thuật Đà Nẵng (dead/squatted domain) — both still open from Batch 3, unchanged this batch.
5. No other systematic gap was identified this batch beyond the vietjack-roster sweep and the
   military-tier re-check; a further batch would likely need a new authoritative source (e.g. a
   fresh MOET/MOHA institutional list) rather than re-mining already-exhausted leads.

---

# Batch 5 (2026-09-08)

This batch worked through Batch 4's specific leftover leads rather than mining a new source. Net
result: **0 new catalog entries** — every lead either resolved to "no change needed" (merger still
unexecuted, domain still dead, disambiguation still unresolved) or turned out to already be covered
by an existing entry once traced carefully. One existing entry was enriched with a missing alias and
a corroborating source.

## Summary

| Metric | Before (Batch 4 end) | After Batch 5 |
|---|---:|---:|
| Total catalog entries (search/compare) | 319 | **319 (unchanged)** |
| Independent education institutions (KPI) | 307 | **307 (unchanged)** |
| Vocational colleges | 41 | 41 (unchanged) |
| **Verified calculator** | **134** | **134 (unchanged)** |

## Leads worked (from Batch 4's "Recommendation for next batch")

1. **`cdct` (Trường Cao đẳng Cần Thơ) merger re-check** — press (dantri.com.vn, Nov 2025) described
   an unexecuted reorganization proposal to merge this school into Trường Cao đẳng Kinh tế - Kỹ
   thuật Cần Thơ. Re-verified this batch: a corroborating thanhnien.vn article (13/11/2025) confirms
   Cần Thơ's city government approved transferring `cdct`'s land/facilities as part of a broader
   local restructuring, but `cdct`'s own domain (`tuyensinh.cdct.edu.vn`) is still live, still
   publishing under its own independent name, with active "tuyển sinh ... năm học 2026-2027"
   content as of this check. No Prime Minister/MOET decision confirming the merger as *executed*
   was found (unlike the confirmed, decision-numbered mergers found elsewhere this batch — see
   below). Per the no-change-unless-confirmed-executed rule: **left unchanged**, still flagged for a
   future re-check.
2. **AUAD (Trường Đại học Mỹ thuật Công nghiệp Á Châu) domain re-check** — re-tested both
   `auad.edu.vn` and a newly-surfaced alternate `mythuatcongnghiepachau.edu.vn` (cited by a
   secondary aggregator as AUAD's site): both fail DNS resolution (`ENOTFOUND`) at verification
   time. **Left unchanged**, not added, per the no-invented-URL rule.
3. **Trường Cao đẳng Công nghệ - Ngoại thương domain disambiguation** — re-searched; the competing
   domains identified in Batch 3 are still all live and none stands out as clearly canonical over
   the others. One (`ngoaithuongcollege.edu.vn`) does carry live 2026 admission content and a
   consistent institution name/address, making it the most plausible candidate, but a 5th mirror
   (`cnnteduvn.webflow.io`) also surfaced this batch, reinforcing the original ambiguity rather than
   resolving it. **Left unchanged / still needs review** rather than guessing.
4. **Trường Cao đẳng Văn hóa - Nghệ thuật Đà Nẵng domain re-check** — found that this institution
   was merged (confirmed executed: Quyết định 1867/QĐ-BGDĐT, 03/7/2025) into "Trường Cao đẳng nghề
   Đà Nẵng", with the combined entity renamed "Trường Cao đẳng Đà Nẵng" (live official domain
   `dnc.edu.vn`, confirmed via the school's own site and giaoduc.net.vn coverage of the same
   decision). This merger successor turned out to **already be cataloged** as `danangcollege`
   (added in an earlier batch, sourced from the Đà Nẵng GDNN directory) — its `name`, `location`,
   and `dnc.edu.vn` source were already correct, but it was missing the "Trường Cao đẳng Văn hóa -
   Nghệ thuật Đà Nẵng" alias and a source documenting the merger explicitly. **No new entry added**
   (an initial attempt to add one as a separate `cddn` id was caught by `npm run audit:data`'s
   `DUPLICATE_CANONICAL_NAME` check before being committed, and reverted); instead the existing
   `danangcollege` entry in `uniscorevn-data/normalized/runtime-source-snapshot/collegeCatalog.ts`
   was enriched with the missing alias and the merger-confirmation source.
5. **HCMC GDNN AJAX directory sweep** — attempted again via `chrome-devtools`, but the shared browser
   profile was already in use by a concurrent process this session (`Failed to attach: browser
   already running for this profile`), and starting a second isolated instance was avoided to not
   risk interfering with a concurrent agent working in the same workspace. A plain `WebFetch` re-check
   of `gdnn.tphcm.gov.vn` confirms the directory page still exists at `/co-so-giao-duc-nghe-nghiep`
   but exposes no discoverable AJAX endpoint in static HTML. **Still not done** — carried forward
   again for a future batch with a free browser-automation session.
6. No new authoritative source (fresh MOET/MOHA list) was identified this batch; no further
   candidates were pursued beyond the four specific leads above, per this batch's scope.

## Not added / needs review (carried forward, unchanged)

| Institution | Reason | Notes |
|---|---|---|
| Trường Cao đẳng Cần Thơ (`cdct`, already cataloged) | merger proposed, not executed | Re-check again in a future batch; watch for a Prime Minister/MOET decision number. |
| Trường Đại học Mỹ thuật Công nghiệp Á Châu (AUAD) | dead domain | Both known domains still fail DNS. |
| Trường Cao đẳng Công nghệ - Ngoại thương | 5+ competing domains | Still unresolved; `ngoaithuongcollege.edu.vn` is the most plausible single candidate but not confidently sole-official. |
| Trường Cao đẳng Quốc tế Sài Gòn | no confirmed `.edu.vn` | Unchanged from Batch 3 (not in this batch's explicit scope). |

## Test/build status (Batch 5)

- `npm run validate` (private): OK.
- `npm run export:runtime` (private): wrote all 4 generated artifacts; public repo diff was exactly
  the intended alias/source enrichment to the existing `danangcollege` entry in
  `collegeCatalog.generated.ts` (no entry count change).
- `npm run audit:data`: 0 catalog audit errors, 0 catalog audit warnings after the fix (the
  transient `DUPLICATE_CANONICAL_NAME` error from the reverted `cddn` duplicate was caught and
  fixed before committing); counts unchanged at 319 catalog entries / 307 independent institutions /
  134 verified calculators.
- Full `tsc -b` / `npm run test` / `npm run lint` / `npm run build` / `npm run validate:generated` /
  `npm run stats:coverage` / `npm run check:docs` deferred to the end-of-session combined quality
  gate (run once after workstreams A, B, and C were all complete — see final report).

## Recommendation for next batch (Batch 6, if any)

1. Re-check `cdct` again for an executed (decision-numbered) merger.
2. Re-check AUAD for a live domain.
3. Trường Cao đẳng Công nghệ - Ngoại thương's domain ambiguity is now a 3-batch-old open item;
   consider treating it as permanently unresolved unless a Bộ GD-ĐT/Bộ LĐTBXH primary list turns up.
4. The HCMC GDNN AJAX sweep is now open across 4 batches; needs a session with an exclusively-owned
   browser-automation instance to make progress.
5. This batch's experience (a "needs-review" lead resolving to an already-cataloged entry, not a
   gap) is a reminder to grep the *actual content* of candidate source files, not just check
   file-level `grep -l` hits, before concluding an institution is missing.
