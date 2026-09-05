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
