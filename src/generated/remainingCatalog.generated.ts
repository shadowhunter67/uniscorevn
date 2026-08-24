// AUTO-GENERATED.
// DO NOT EDIT MANUALLY.
// Source of truth lives in private UniScoreVN data pipeline.

export const runtimeDataBuild = {
  generatedAt: "2026-08-22T00:00:00.000Z",
  schemaVersion: "runtime-v1",
  admissionYear: 2026,
} as const;

import type { AdmissionEvaluation } from '../core/admissionEvaluation';
import type { AdmissionMethodDescriptor } from '../core/admissionMethod';
import type { ApplicantProfile } from '../core/applicantProfile';
import type { SchoolModule } from '../core/schoolModule';
import type { RuleEvidence } from '../core/evidence';
import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../compare/schoolComparisonAdapter';

interface RemainingCatalogSchool {
  id: string;
  shortName: string;
  name: string;
  location: string;
  ownership: SchoolModule['ownership'];
  region: SchoolModule['region'];
}

interface ResearchedAdmissionSource {
  title: string;
  url: string;
  sourceId: string;
  checkedAt: string;
  publishedAt?: string;
  note: string;
}

const unsupportedCapabilities = {
  eligibility: false,
  scoreConversion: false,
  bonus: false,
  priority: false,
  exactCalculator: false,
} satisfies AdmissionMethodDescriptor['capabilities'];

const catalogOnlyCapabilities = {
  admissionInfo: false,
  programs: false,
  eligibility: false,
  cutoffs: false,
  scoreConversion: false,
  exactCalculator: false,
} satisfies NonNullable<SchoolModule['capabilities']>;

const researchedCatalogCapabilities = {
  admissionInfo: true,
  programs: true,
  eligibility: false,
  cutoffs: false,
  scoreConversion: false,
  exactCalculator: false,
} satisfies NonNullable<SchoolModule['capabilities']>;

const researchedAdmissionSources: Record<string, ResearchedAdmissionSource> = {
  tqu: {
    sourceId: 'tqu-admission-2026',
    title: 'TQU official admission information page 2026',
    url: 'https://daihoctantrao.edu.vn/thong-tin-tuyen-sinh.html',
    checkedAt: '2026-08-24',
    note:
      'Batch expand-14 (2026-08-24): official daihoctantrao.edu.vn (Truong Dai hoc Tan Trao, Tuyen Quang) admission-information page confirmed live with 2026 notices (4 methods: direct admission, 2026 THPT exam results, prior-year THPT exam results, grade-12 transcript; planned quota 1,300; document deadlines through 20/05/2026 and 30/05/2026). No numeric floor-score/ngưỡng đảm bảo chất lượng đầu vào table was located in this pass. Left at researched; do not fabricate threshold numbers.',
  },
  vnuuet: {
    sourceId: 'vnuuet-admission-2026',
    title: 'VNU-UET admission portal and 2026 admission information',
    url: 'https://uet.vnu.edu.vn/tuyen-sinh',
    publishedAt: '2026-04-01',
    checkedAt: '2026-08-22',
    note: 'Official 2026 admission information lists direct/priority admission, THPT, HSA, and SAT; exact evaluator needs threshold/conversion normalization.',
  },
  vnueb: {
    sourceId: 'vnueb-admission-2026',
    title: 'VNU-UEB undergraduate admission portal 2026',
    url: 'https://tuyensinhdaihoc.ueb.edu.vn/',
    checkedAt: '2026-08-22',
    note: 'Official portal has 2026 undergraduate admission and intake flow; exact method/program tables need extraction before runtime eligibility.',
  },
  vnuhus: {
    sourceId: 'vnuhus-admission-2026',
    title: 'VNU-HUS undergraduate admission 2026',
    url: 'https://tuyensinh.hus.vnu.edu.vn/',
    checkedAt: '2026-08-22',
    note: 'Official 2026 page identifies 28 programs and 6 methods; thresholds/conversions require structured extraction.',
  },
  vnussh: {
    sourceId: 'vnussh-admission-2026',
    title: 'VNU-USSH undergraduate admission 2026',
    url: 'https://www.ussh.vnu.edu.vn/vi/news/dao-tao/thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2026-24126.html',
    publishedAt: '2026-05-31',
    checkedAt: '2026-08-22',
    note: 'Official 2026 admission article is available; method/program details need normalization before executable support.',
  },
  vnuvju: {
    sourceId: 'vnuvju-admission-2026',
    title: 'VJU undergraduate admission 2026',
    url: 'https://vju.vnu.edu.vn/ttts2026/',
    checkedAt: '2026-08-22',
    note: 'Official 2026 page lists programs, HSA/SAT/THPT/interview methods, language conditions, and certificate conversion; needs extraction to decide eligibility/partial scope.',
  },
  hust: {
    sourceId: 'hust-admission-2026',
    title: 'HUST undergraduate admission 2026',
    url: 'https://ts.hust.edu.vn/tin-tuc/thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2026',
    publishedAt: '2026-02-25',
    checkedAt: '2026-08-22',
    note: 'Official 2026 page lists 3 core methods and 68 programs; not upgraded beyond researched until TSA/THPT/XTTN formula and thresholds are normalized.',
  },
  tmu: {
    sourceId: 'tmu-admission-2026',
    title: 'TMU undergraduate admission 2026',
    url: 'https://tmu.edu.vn/tin-tuc/thong-tin-tuyen-sinh-dai-hoc-chinh-quy-2026-27910',
    publishedAt: '2026-03-27',
    checkedAt: '2026-08-22',
    note: 'Official 2026 page lists 5800 seats, 51 programs, and 5 admission methods; scoring details need structured normalization.',
  },
  haui: {
    sourceId: 'haui-admission-2026',
    title: 'HaUI undergraduate admission information 2026',
    url: 'https://www.haui.edu.vn/vn/tin-tuc/thong-tin-tuyen-sinh-trinh-do-dai-hoc-nam-2026/67454',
    publishedAt: '2026-03-14',
    checkedAt: '2026-08-22',
    note: 'Official 2026 decision/page includes methods and conditions; threshold/conversion rules need extraction before eligibility or partial support.',
  },
  aof: {
    sourceId: 'aof-admission-2026',
    title: 'AOF admission portal 2026',
    url: 'https://xettuyen.hvtc.edu.vn/Home/Index',
    checkedAt: '2026-08-22',
    note: 'Official 2026 admission portal lists methods for Hanoi, HCMC, and Hung Yen; campus/program scope and formulas need normalization.',
  },
  bav: {
    sourceId: 'bav-admission-2026',
    title: 'Banking Academy undergraduate admission 2026',
    url: 'https://isba.hvnh.net/thong-tin-tuyen-sinh',
    checkedAt: '2026-08-22',
    note: 'Official 2026 page states four methods and formula skeleton score = input + bonus + priority; exact components still need extraction.',
  },
  hanu: {
    sourceId: 'hanu-admission-2026',
    title: 'HANU regular undergraduate admission 2026',
    url: 'https://hanu.edu.vn/a/254574/Thong-tin-tuyen-sinh-dai-hoc-nam-2026-Hinh-thuc-dao-tao-Chinh-quy',
    checkedAt: '2026-08-22',
    note: 'Official 2026 admission page is available; detailed program/method table requires extraction before executable support.',
  },
  hou: {
    sourceId: 'hou-admission-2026',
    title: 'HOU admission portal 2026',
    url: 'https://tuyensinh.hou.edu.vn/',
    checkedAt: '2026-08-22',
    note: 'Official portal lists 2026 admission information, quality thresholds, and first-round cutoffs; normalization required before eligibility/cutoff comparison.',
  },
  vnuulis: {
    sourceId: 'vnuulis-admission-2026',
    title: 'VNU-ULIS undergraduate admission 2026',
    url: 'https://ulis.vnu.edu.vn/tbtsdh26/',
    publishedAt: '2026-04-15',
    checkedAt: '2026-08-22',
    note: 'Official 2026 announcement identifies programs, quotas, THPT, certificate-combined, HSA, and direct admission methods; language coefficient and certificate appendix need structured extraction before calculator support.',
  },
  huce: {
    sourceId: 'huce-admission-2026',
    title: 'HUCE undergraduate admission information 2026',
    url: 'https://tuyensinh.huce.edu.vn/thong-tin-tuyen-sinh-dai-hoc-chinh-quy',
    checkedAt: '2026-08-22',
    note: 'Official 2026 admission portal lists main admission announcement, threshold, method conversion, bonus, and aptitude-test documents; executable support deferred until linked tables are normalized.',
  },
  humg: {
    sourceId: 'humg-admission-2026',
    title: 'HUMG admission information 2026',
    url: 'https://ts.humg.edu.vn/tuyen-sinh/Pages/Thong-tin-tuyen-sinh.aspx',
    checkedAt: '2026-08-22',
    note: 'Official 2026 portal lists admission information, thresholds, and first-round cutoffs; method conversion and program scope need extraction.',
  },
  dav: {
    sourceId: 'dav-admission-2026',
    title: 'DAV undergraduate admission information 2026',
    url: 'https://www.dav.edu.vn/thong-tin-tuyen-sinh-dai-hoc-he-chinh-quy-nam-2026-cap-nhat-ngay-18-5-2026/',
    publishedAt: '2026-05-20',
    checkedAt: '2026-08-22',
    note: 'Official 2026 page identifies four methods and links threshold/conversion update; certificate-combined and international-test scopes need extraction before executable support.',
  },
  hlu: {
    sourceId: 'hlu-admission-2026',
    title: 'HLU admission portal and 2026 rules',
    url: 'https://tuyensinh.hlu.edu.vn/tsnews/details/30532',
    checkedAt: '2026-08-22',
    note: 'Official admission portal lists 2026 threshold, equivalent conversion, and cutoff notices; use researched-only until the 2026 regulation and conversion documents are extracted.',
  },
  hdu: {
    sourceId: 'hdu-admission-2026',
    title: 'HDU undergraduate admission information 2026',
    url: 'https://tuyensinh.hdu.edu.vn/thong-tin-tuyen-sinh-dao-tao-trinh-do-dai-hoc-nam-2026',
    publishedAt: '2026-01-17',
    checkedAt: '2026-08-22',
    note: 'Official 2026 page gives identity, scope, programs, and four methods; pedagogical residency restrictions and thresholds need structured extraction before eligibility support.',
  },
  vmu: {
    sourceId: 'vmu-admission-2026',
    title: 'VMU undergraduate admission 2026',
    url: 'https://tuyensinh.vimaru.edu.vn/tuyensinh/2026-thong-bao-tuyen-sinh-dai-hoc-he-chinh-quy-nam-2026.vmu',
    publishedAt: '2026-06-04',
    checkedAt: '2026-08-22',
    note: 'Official 2026 announcement lists 55 programs and six independent methods; threshold/conversion announcement and method scopes need extraction before runtime eligibility.',
  },
  ntu: {
    sourceId: 'ntu-admission-2026',
    title: 'NTU undergraduate admission 2026',
    url: 'https://tuyensinh.ntu.edu.vn/',
    checkedAt: '2026-08-24',
    note: 'Batch central-cluster re-check (2026-08-24): tuyensinh.ntu.edu.vn is still a JS-rendered SPA shell on direct fetch. Secondary cutoff coverage (xaydungchinhsach.chinhphu.vn) shows admitted scores like 20.73-27.66 that are consistent with a /30 scale but does not state the scale explicitly, so the scale-30-vs-40 conflict from the earlier attempt is not resolved from a primary source. No official floor-score (nguong dam bao chat luong dau vao) notice with numeric values was located via search. Left at researched; formulas, threshold mapping, and program scope still need extraction from a primary, text-readable source.',
  },
  dlu: {
    sourceId: 'dlu-admission-2026',
    title: 'DLU admission portal 2026',
    url: 'https://tuyensinh.dlu.edu.vn/',
    checkedAt: '2026-08-22',
    note: 'Official 2026 portal lists admission information, threshold, equivalent conversion tool, and cutoffs; conversion table and formula details need normalization before executable support. Superseded by dedicated dlu module (2026-08-24 batch): eligibility-only upgrade shipped using cross-checked press coverage of the official 2026-07-09 floor-score notice, since dlu.edu.vn/tuyensinh.dlu.edu.vn still fail direct fetch (TLS/WAF). See normalized/runtime-source-snapshot/dlu/sources.ts.',
  },
  qnu: {
    sourceId: 'qnu-admission-2026',
    title: 'QNU undergraduate admission 2026',
    url: 'https://www.qnu.edu.vn/vi/dai-hoc-chinh-quy-1764/tb263-thong-bao-tuyen-sinh-dai-hoc-nam-2026',
    checkedAt: '2026-08-24',
    note: 'Batch central-cluster re-check (2026-08-24): TB263 explicitly defers thresholds/conversion to a later Ministry-timed announcement. Confirmed via secondary press (khoahoc.vietjack.com, thuvienphapluat.vn) that QNU published a later notice (referenced as 121/TB-HDTS, dated 2026-07-09) covering the input quality threshold for 4 methods, and that tuyensinh.qnu.edu.vn hosts a TB141 final-cutoff notice for 2026 - but the numeric threshold table itself could not be fetched (thuvienphapluat.vn returned 403; tuyensinh.qnu.edu.vn search did not surface the 121/TB-HDTS notice directly). Note: tuyensinh.qui.edu.vn is a DIFFERENT school (Quang Ninh University of Industry), not used here. Left at researched; numeric thresholds still need extraction from a primary source.',
  },
  ttn: {
    sourceId: 'ttn-admission-2026',
    title: 'TTN undergraduate admission 2026',
    url: 'https://tuyensinh.ttn.edu.vn/2026/04/10/tttsdhcqnam2026/',
    publishedAt: '2026-04-10',
    checkedAt: '2026-08-22',
    note: 'Official 2026 admission page links the formal information file and later registration notice; executable support deferred until method thresholds and program scope are extracted.',
  },
  hueu: {
    sourceId: 'hueu-admission-2026',
    title: 'Hue University undergraduate admission methods 2026',
    url: 'https://tuyensinh.hueuni.edu.vn/News/Detail/cac-phuong-thuc-tuyen-sinh-dai-hoc-he-chinh-quy-cua-dai-hoc-hue-nam-2026_20260226073154',
    publishedAt: '2026-02-27',
    checkedAt: '2026-08-24',
    note: 'Official Hue University system-level page lists 5 shared methods (direct/priority, THPT, transcript for select member schools, ability assessment, combined) and explicitly defers all numeric thresholds/bonus/conversion tables to each member-school page. Đại học Huế also co-signs Thông báo 42/TB-HĐTSĐH ngày 10/7/2026 with a per-program threshold appendix (https://tuyensinh.hueuni.edu.vn/News/Download/10676) covering every member school; HUEU itself has no distinct program catalog or numeric eligibility rule of its own, so runtime eligibility content now lives in the member-school modules (hce, hul, husc, huaf, hueedu), which are exported as dedicated eligibility-only schools rather than through this catalog-only path.',
  },
  hce: {
    sourceId: 'hce-admission-2026',
    title: 'HCE admission portal 2026',
    url: 'https://tuyensinh.hce.edu.vn/',
    checkedAt: '2026-08-22',
    note: 'Official 2026 portal lists schedule, admission news, and cutoff/import instructions; detailed method/program tables need extraction.',
  },
  hul: {
    sourceId: 'hul-admission-2026',
    title: 'Hue University of Law admission methods 2026',
    url: 'https://tuyensinh.hul.edu.vn/News/Detail/cac-phuong-thuc-tuyen-sinh-va-to-hop-xet-tuyen-vao-truong-dai-hoc-luat-dai-hoc-hue-nam-2026_20260227210356',
    publishedAt: '2026-02-27',
    checkedAt: '2026-08-22',
    note: 'Official 2026 page lists three methods and subject combinations, with later threshold and conversion notices on the same portal; normalize those before eligibility or partial support.',
  },
  tnu: {
    sourceId: 'tnu-admission-2026',
    title: 'TNU undergraduate and college admission information 2026',
    url: 'https://tnu.edu.vn/dao-tao/thong-tin-tuyen-sinh/thong-tin-tuyen-sinh-dai-hoc-cao-dang-nam-2026-hinh-thuc-dao-tao-chinh-quy-cap-nhat-ngay-16-6-2026-3.html?categoryId=101886793',
    publishedAt: '2026-06-18',
    checkedAt: '2026-08-22',
    note: 'Official 2026 TNU source identifies updated regular admission scale, member programs, and V-SAT context; member-school scope and conversion tables need extraction.',
  },
  hpmu: {
    sourceId: 'hpmu-admission-2026',
    title: 'HPMU undergraduate admission information 2026',
    url: 'https://hpmu.edu.vn/hpmu/news/Dai-Hoc-32/Truong-Dai-hoc-Y-Duoc-Hai-Phong-thong-bao-Thong-tin-tuyen-sinh-Dai-hoc-nam-2026-4533/',
    publishedAt: '2026-05-06',
    checkedAt: '2026-08-22',
    note: 'Official 2026 page links undergraduate admission information and forms; medical/health program thresholds and method scope need extraction before eligibility support.',
  },
  udn: {
    sourceId: 'udn-admission-2026',
    title: 'University of Danang regular undergraduate admission 2026',
    url: 'https://ts.udn.vn/DHCD/Chinhquy/DHTbao/19360',
    publishedAt: '2026-06-11',
    checkedAt: '2026-08-24',
    note: 'Official 2026 UDN notice re-verified live on 2026-08-24 (full text fetched): it is a system-level umbrella notice pointing to each member school (DUT, DUE, UED, UFLS, UTE, VKU) admission page for methods, thresholds, and scores. UDN itself does not run an independent admission formula, so it stays at researched rather than eligibility-only; the 6 member schools now have dedicated eligibility-only runtime modules under normalized/runtime-source-snapshot/<id>/.',
  },
  // dut/dueudn/uedudn/uflsudn/uteudn/vku moved to dedicated runtime modules
  // (normalized/runtime-source-snapshot/<id>/) — see explicitRuntimeSchoolIds above.
  husc: {
    sourceId: 'husc-admission-2026',
    title: 'Hue University regular undergraduate admission 2026 - HUSC scope',
    url: 'https://tuyensinh.hueuni.edu.vn/News/Detail/thong-bao-dang-ky-xet-tuyen-vao-cac-nganh-dao-tao-cua-dai-hoc-hue-trong-ky-tuyen-sinh-dai-hoc-he-chinh-quy-nam-2026_20260522204005',
    publishedAt: '2026-05-22',
    checkedAt: '2026-08-22',
    note: 'Official Hue University 2026 registration notice links attached member-school admission details; HUSC-specific program thresholds need extraction.',
  },
  huaf: {
    sourceId: 'huaf-admission-2026',
    title: 'HUAF undergraduate admission information 2026',
    url: 'https://tuyensinh.huaf.edu.vn/thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2025-cua-truong-dai-hoc-nong-lam-dai-hoc-hue-chinh-thuc-2/',
    checkedAt: '2026-08-22',
    note: 'Official HUAF 2026 article lists four admission method groups, 19 undergraduate programs with quotas and subject combinations, THPT/transcript/combined formula skeletons, transcript 15/30 threshold, two-decimal rounding, and bonus cap. Runtime remains researched-only until linked conversion, bonus, priority, and threshold details are normalized and evaluator tests are added.',
  },
  hueedu: {
    sourceId: 'hueedu-admission-2026',
    title: 'Hue University of Education undergraduate admission 2026',
    url: 'https://tuyensinh.dhsphue.edu.vn/Modules/Tintuc/front_detail_news.aspx?idmenu=135&idnews=242',
    checkedAt: '2026-08-22',
    note: 'Official 2026 Hue education admission page lists methods and active teacher-training programs; aptitude and pedagogical threshold details need extraction.',
  },
  hmu: {
    sourceId: 'hmu-admission-2026',
    title: 'HMU (Hanoi Medical University) undergraduate admission plan 2026',
    url: 'https://apiwebhmu.hmu.edu.vn/Upload/Images/d4f307a9-4f5c-4dba-817e-f2cccc285844.pdf',
    publishedAt: '2026-01-26',
    checkedAt: '2026-08-24',
    note: 'Batch 10 (2026-08-24): official Kế hoạch tuyển sinh 306/KH-ĐHYHN (26/01/2026, letterhead + signature verified via direct PDF fetch) confirms hmu.edu.vn/tuyensinh.hmu.edu.vn as the live official domain and the full 2026 admission calendar (3 methods: direct admission, THPT exam, HANOI university-of-education aptitude test), but this document only contains dates/process, not numeric thresholds. The actual ngưỡng đảm bảo chất lượng đầu vào table (published 10/07/2026 per this plan) sits on tuyensinh.hmu.edu.vn as a JS-rendered page not text-extractable in this pass; press aggregators only give inconsistent secondary figures (một số nguồn nói 19-24, một số nói 24 là cao nhất). Left at researched; do not fabricate per-program numbers.',
  },
  tlu: {
    sourceId: 'tlu-admission-2026',
    title: 'TLU (Thuyloi University) quality threshold notice 2026',
    url: 'https://ts.tlu.edu.vn/tuy%E1%BB%83n-sinh-%C4%91h/nguong-bao-dam-chat-luong-dau-vao-dai-31502',
    checkedAt: '2026-08-24',
    note: 'Batch 10 (2026-08-24): official ts.tlu.edu.vn/tlu.edu.vn notice page confirmed live with the correct 2026 title ("Ngưỡng bảo đảm chất lượng đầu vào Đại học chính quy năm 2026 tại Hà Nội"), but the page is a DotNetNuke SPA shell that loads its threshold table via an internal AJAX API (CategoryService.getBySettings) not reachable through direct fetch/curl in this pass. Secondary press confirms only an aggregate range (điểm sàn 16-20/30, điểm chuẩn 19-24.64/30 across ~46 programs) without a per-program breakdown matching the primary source. Left at researched; do not fabricate the per-program table.',
  },
  phenikaa: {
    sourceId: 'phenikaa-admission-2026',
    title: 'Đại học Phenikaa công bố ngưỡng điểm nhận hồ sơ xét tuyển đại học hệ chính quy đợt 1 năm 2026',
    url: 'https://phenikaa-uni.edu.vn/vi/post/tuyen-sinh/tin-tuyen-sinh/dai-hoc-phenikaa-cong-bo-nguong-diem-nhan-ho-so-xet-tuyen-dai-hoc-he-chinh-quy-dot-1-nam-2026',
    checkedAt: '2026-08-24',
    publishedAt: '2026-03-17',
    note:
      'Official Phenikaa 2026 threshold notice (cross-checked via secondary reports thuvienphapluat.vn and baolamdong.vn, both citing the same official announcement) lists 5 admission methods with numeric floors per method: HSA (ĐGNL) 57-80/150, HUST thinking test (ĐGTD) 40-56/100, V-SAT 202-240/450, and a special condition for Y khoa/Dược/Luật (THPT exam 3-subject total >= 20,00/30 with Excellent grade-12 academic rank, or graduation score >= 8,50). The general THPT-exam-only floor for non-specialized majors is not stated as a single flat number in this pass; the "Excellent academic rank" condition also has no matching applicant-profile field yet. Runtime stays researched-only until a clean single-method threshold can be isolated without fabricating scope.',
  },
  thanglong: {
    sourceId: 'thanglong-admission-2026',
    title: 'Đăng ký xét tuyển Trường Đại học Thăng Long 2026: Hướng dẫn đầy đủ từ A-Z',
    url: 'https://thanglong.edu.vn/dang-ky-xet-tuyen-dai-hoc-thang-long-2026',
    checkedAt: '2026-08-24',
    note:
      'Official thanglong.edu.vn 2026 admission guide (plus the linked official Quyết định ban hành thông tin tuyển sinh 2026, thanglong.edu.vn, dated 2026-02-11) confirms 6 admission methods (THPT exam; THPT exam + international language certificate; HSA/TSA/SPT aptitude tests; THPT exam + grade-12 transcript for Nursing/Tourism/Hotel Management; grade-12 transcript + talent test for Vocal/Graphic Design; direct admission), 37 subject combinations, and 25 programs across 8 faculties, quota 3,000. No 2026 numeric threshold (điểm chuẩn/điểm sàn) had been published as of this research pass — the article only cites 2025 reference scores (16.0-23.75/30) — and the official Quyết định PDF text itself was not extractable via WebFetch (page shell only). Runtime stays researched-only; do not use 2025 cutoffs as 2026 thresholds.',
  },
};

export const remainingCatalogSchools: readonly RemainingCatalogSchool[] = [
  { id: 'vnuuet', shortName: 'VNU-UET', name: 'Trường Đại học Công nghệ - ĐHQG Hà Nội', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'vnueb', shortName: 'VNU-UEB', name: 'Trường Đại học Kinh tế - ĐHQG Hà Nội', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'vnuhus', shortName: 'VNU-HUS', name: 'Trường Đại học Khoa học Tự nhiên - ĐHQG Hà Nội', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'vnussh', shortName: 'VNU-USSH', name: 'Trường Đại học Khoa học Xã hội và Nhân văn - ĐHQG Hà Nội', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'vnuulis', shortName: 'VNU-ULIS', name: 'Trường Đại học Ngoại ngữ - ĐHQG Hà Nội', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'vnued', shortName: 'VNU-UED', name: 'Trường Đại học Giáo dục - ĐHQG Hà Nội', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'vnuump', shortName: 'VNU-UMP', name: 'Trường Đại học Y Dược - ĐHQG Hà Nội', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'vnuvju', shortName: 'VJU', name: 'Trường Đại học Việt Nhật - ĐHQG Hà Nội', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'vnulaw', shortName: 'VNU-LS', name: 'Trường Đại học Luật - ĐHQG Hà Nội', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'vnuhsb', shortName: 'VNU-HSB', name: 'Trường Quản trị và Kinh doanh - ĐHQG Hà Nội', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'vnuis', shortName: 'VNU-IS', name: 'Trường Quốc tế - ĐHQG Hà Nội', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'hust', shortName: 'HUST', name: 'Đại học Bách khoa Hà Nội', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'tmu', shortName: 'TMU', name: 'Trường Đại học Thương mại', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'huce', shortName: 'HUCE', name: 'Trường Đại học Xây dựng Hà Nội', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'humg', shortName: 'HUMG', name: 'Trường Đại học Mỏ - Địa chất', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'hou', shortName: 'HOU', name: 'Trường Đại học Mở Hà Nội', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'hanu', shortName: 'HANU', name: 'Trường Đại học Hà Nội', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'haui', shortName: 'HaUI', name: 'Trường Đại học Công nghiệp Hà Nội', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'aof', shortName: 'AOF', name: 'Học viện Tài chính', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'bav', shortName: 'BAV', name: 'Học viện Ngân hàng', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'dav', shortName: 'DAV', name: 'Học viện Ngoại giao', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'ajc', shortName: 'AJC', name: 'Học viện Báo chí và Tuyên truyền', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'hlu', shortName: 'HLU', name: 'Trường Đại học Luật Hà Nội', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'hmu', shortName: 'HMU', name: 'Trường Đại học Y Hà Nội', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'hup', shortName: 'HUP', name: 'Trường Đại học Dược Hà Nội', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'tlu', shortName: 'TLU', name: 'Trường Đại học Thủy lợi', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'vnuf', shortName: 'VNUF', name: 'Trường Đại học Lâm nghiệp', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'thanglong', shortName: 'TLU-HN', name: 'Trường Đại học Thăng Long', location: 'Hà Nội', ownership: 'private', region: 'hanoi' },
  { id: 'fptu', shortName: 'FPTU', name: 'Trường Đại học FPT', location: 'Đa cơ sở', ownership: 'private', region: 'hanoi' },
  { id: 'hubt', shortName: 'HUBT', name: 'Trường Đại học Kinh doanh và Công nghệ Hà Nội', location: 'Hà Nội', ownership: 'private', region: 'hanoi' },
  { id: 'dainam', shortName: 'DNU-HN', name: 'Trường Đại học Đại Nam', location: 'Hà Nội', ownership: 'private', region: 'hanoi' },
  { id: 'phenikaa', shortName: 'Phenikaa', name: 'Trường Đại học Phenikaa', location: 'Hà Nội', ownership: 'private', region: 'hanoi' },
  { id: 'tnu', shortName: 'TNU', name: 'Đại học Thái Nguyên', location: 'Thái Nguyên', ownership: 'public', region: 'other' },
  { id: 'dhp', shortName: 'DHP', name: 'Trường Đại học Hải Phòng', location: 'Hải Phòng', ownership: 'public', region: 'other' },
  { id: 'vmu', shortName: 'VMU', name: 'Trường Đại học Hàng hải Việt Nam', location: 'Hải Phòng', ownership: 'public', region: 'other' },
  { id: 'hpmu', shortName: 'HPMU', name: 'Trường Đại học Y Dược Hải Phòng', location: 'Hải Phòng', ownership: 'public', region: 'other' },
  { id: 'hdu', shortName: 'HDU', name: 'Trường Đại học Hồng Đức', location: 'Thanh Hóa', ownership: 'public', region: 'other' },
  { id: 'htu', shortName: 'HTU', name: 'Trường Đại học Hà Tĩnh', location: 'Hà Tĩnh', ownership: 'public', region: 'other' },
  { id: 'halongu', shortName: 'HALOU', name: 'Trường Đại học Hạ Long', location: 'Quảng Ninh', ownership: 'public', region: 'other' },
  { id: 'tqu', shortName: 'TQU', name: 'Trường Đại học Tân Trào', location: 'Tuyên Quang', ownership: 'public', region: 'other' },
  { id: 'hvu', shortName: 'HVU', name: 'Trường Đại học Hùng Vương', location: 'Phú Thọ', ownership: 'public', region: 'other' },
  { id: 'hueu', shortName: 'HueU', name: 'Đại học Huế', location: 'Huế', ownership: 'public', region: 'other' },
  { id: 'husc', shortName: 'HUSC', name: 'Trường Đại học Khoa học - Đại học Huế', location: 'Huế', ownership: 'public', region: 'other' },
  { id: 'hce', shortName: 'HCE', name: 'Trường Đại học Kinh tế - Đại học Huế', location: 'Huế', ownership: 'public', region: 'other' },
  { id: 'hul', shortName: 'HUL', name: 'Trường Đại học Luật - Đại học Huế', location: 'Huế', ownership: 'public', region: 'other' },
  { id: 'huaf', shortName: 'HUAF', name: 'Trường Đại học Nông Lâm - Đại học Huế', location: 'Huế', ownership: 'public', region: 'other' },
  { id: 'hueedu', shortName: 'HUED', name: 'Trường Đại học Sư phạm - Đại học Huế', location: 'Huế', ownership: 'public', region: 'other' },
  { id: 'hump', shortName: 'HUMP', name: 'Trường Đại học Y Dược - Đại học Huế', location: 'Huế', ownership: 'public', region: 'other' },
  { id: 'hufl', shortName: 'HUFL', name: 'Trường Đại học Ngoại ngữ - Đại học Huế', location: 'Huế', ownership: 'public', region: 'other' },
  { id: 'hat', shortName: 'HAT', name: 'Trường Du lịch - Đại học Huế', location: 'Huế', ownership: 'public', region: 'other' },
  { id: 'udn', shortName: 'UDN', name: 'Đại học Đà Nẵng', location: 'Đà Nẵng', ownership: 'public', region: 'other' },
  { id: 'dut', shortName: 'DUT', name: 'Trường Đại học Bách khoa - Đại học Đà Nẵng', location: 'Đà Nẵng', ownership: 'public', region: 'other' },
  { id: 'dueudn', shortName: 'DUE-UDN', name: 'Trường Đại học Kinh tế - Đại học Đà Nẵng', location: 'Đà Nẵng', ownership: 'public', region: 'other' },
  { id: 'uedudn', shortName: 'UED-UDN', name: 'Trường Đại học Sư phạm - Đại học Đà Nẵng', location: 'Đà Nẵng', ownership: 'public', region: 'other' },
  { id: 'uflsudn', shortName: 'UFLS-UDN', name: 'Trường Đại học Ngoại ngữ - Đại học Đà Nẵng', location: 'Đà Nẵng', ownership: 'public', region: 'other' },
  { id: 'uteudn', shortName: 'UTE-UDN', name: 'Trường Đại học Sư phạm Kỹ thuật - Đại học Đà Nẵng', location: 'Đà Nẵng', ownership: 'public', region: 'other' },
  { id: 'vku', shortName: 'VKU', name: 'Trường Đại học Công nghệ Thông tin và Truyền thông Việt - Hàn', location: 'Đà Nẵng', ownership: 'public', region: 'other' },
  { id: 'dtu', shortName: 'DTU', name: 'Trường Đại học Duy Tân', location: 'Đà Nẵng', ownership: 'private', region: 'other' },
  { id: 'uda', shortName: 'UDA', name: 'Trường Đại học Đông Á', location: 'Đà Nẵng', ownership: 'private', region: 'other' },
  { id: 'ntu', shortName: 'NTU', name: 'Trường Đại học Nha Trang', location: 'Khánh Hòa', ownership: 'public', region: 'other' },
  { id: 'dlu', shortName: 'DLU', name: 'Trường Đại học Đà Lạt', location: 'Lâm Đồng', ownership: 'public', region: 'other' },
  { id: 'qnu', shortName: 'QNU', name: 'Trường Đại học Quy Nhơn', location: 'Bình Định', ownership: 'public', region: 'other' },
  { id: 'ttn', shortName: 'TTN', name: 'Trường Đại học Tây Nguyên', location: 'Đắk Lắk', ownership: 'public', region: 'other' },
  { id: 'qnamu', shortName: 'QNamU', name: 'Trường Đại học Quảng Nam', location: 'Quảng Nam', ownership: 'public', region: 'other' },
  { id: 'qbu', shortName: 'QBU', name: 'Trường Đại học Quảng Bình', location: 'Quảng Bình', ownership: 'public', region: 'other' },
  { id: 'pdu', shortName: 'PDU', name: 'Trường Đại học Phạm Văn Đồng', location: 'Quảng Ngãi', ownership: 'public', region: 'other' },
  { id: 'pyu', shortName: 'PYU', name: 'Trường Đại học Phú Yên', location: 'Phú Yên', ownership: 'public', region: 'other' },
  { id: 'ukh', shortName: 'UKH', name: 'Trường Đại học Khánh Hòa', location: 'Khánh Hòa', ownership: 'public', region: 'other' },
  { id: 'muce', shortName: 'MUCE', name: 'Trường Đại học Xây dựng Miền Trung', location: 'Phú Yên', ownership: 'public', region: 'other' },
  { id: 'bmtu', shortName: 'BMTU', name: 'Trường Đại học Y Dược Buôn Ma Thuột', location: 'Đắk Lắk', ownership: 'private', region: 'other' },
  { id: 'dumtp', shortName: 'DUMTP', name: 'Trường Đại học Kỹ thuật Y Dược Đà Nẵng', location: 'Đà Nẵng', ownership: 'public', region: 'other' },
  { id: 'pctu', shortName: 'PCTU', name: 'Trường Đại học Phan Châu Trinh', location: 'Đà Nẵng', ownership: 'private', region: 'other' },
  { id: 'ydlu', shortName: 'YDLU', name: 'Trường Đại học Yersin Đà Lạt', location: 'Lâm Đồng', ownership: 'private', region: 'other' },
  { id: 'upt', shortName: 'UPT', name: 'Trường Đại học Phan Thiết', location: 'Bình Thuận', ownership: 'private', region: 'other' },
];

export const remainingCatalogKnowledgeGap = {
  id: 'remaining-catalog-official-admission-rules',
  label: 'Chưa research đủ nguồn tuyển sinh chính thức 2026 cho trường này.',
  status: 'incomplete' as const,
  impact: 'exact-final-score-blocking' as const,
};

const explicitRuntimeSchoolIds = new Set([
  'huce',
  'dav',
  'hlu',
  'humg',
  'hdu',
  'vmu',
  'ttn',
  'tnu',
  'dlu',
  'vnuulis',
  'hce',
  'hul',
  'husc',
  'huaf',
  'hueedu',
  'dut',
  'dueudn',
  'uedudn',
  'uflsudn',
  'uteudn',
  'vku',
  'ajc',
  'hup',
  'vnuf',
  'dtu',
  'fptu',
  'hubt',
]);
const remainingCatalogRuntimeSchools = remainingCatalogSchools.filter((school) => !explicitRuntimeSchoolIds.has(school.id));

function getResearchedAdmissionSource(schoolId: string): ResearchedAdmissionSource | undefined {
  return researchedAdmissionSources[schoolId];
}

function capabilitiesFor(schoolId: string): NonNullable<SchoolModule['capabilities']> {
  return getResearchedAdmissionSource(schoolId) ? researchedCatalogCapabilities : catalogOnlyCapabilities;
}

function summaryFor(school: RemainingCatalogSchool): string {
  const source = getResearchedAdmissionSource(school.id);
  if (!source) {
    return 'Đã đưa vào roster toàn quốc theo backlog; cần research nguồn tuyển sinh chính thức trước khi tính điều kiện hoặc điểm.';
  }
  return `Da xac minh nguon tuyen sinh chinh thuc 2026 (${source.title}); chua nang len eligibility/calculator vi con thieu normalized formula, threshold, conversion hoac program-scope rules.`;
}

function catalogSourcesFor(schoolId: string): SchoolModule['catalogSources'] | undefined {
  const source = getResearchedAdmissionSource(schoolId);
  if (!source) return undefined;
  return [
    {
      title: source.title,
      url: source.url,
      type: 'official-institution',
      checkedAt: source.checkedAt,
    },
  ];
}

function evidenceFor(schoolId: string): RuleEvidence[] {
  const source = getResearchedAdmissionSource(schoolId);
  if (!source) return [];
  return [
    {
      sourceId: source.sourceId,
      sourceUrl: source.url,
      sourceTitle: source.title,
      sourceType: 'official-school',
      verification: 'official-source-available',
      effectiveYear: 2026,
      publishedAt: source.publishedAt,
      criticality: 'informational',
      verifiedAt: source.checkedAt,
      lastReviewedAt: source.checkedAt,
      note: source.note,
    },
  ];
}

export const remainingCatalogMethods: AdmissionMethodDescriptor[] = remainingCatalogRuntimeSchools.map((school) => ({
  id: `${school.id}-catalog-2026`,
  schoolId: school.id,
  name: 'Thông tin tuyển sinh 2026 đang chờ research',
  year: 2026,
  applicantTypes: ['Thí sinh xét tuyển đại học chính quy 2026'],
  capabilities: unsupportedCapabilities,
  knowledgeGaps: [remainingCatalogKnowledgeGap],
}));

export const remainingCatalogModules: Record<string, SchoolModule> = Object.fromEntries(
  remainingCatalogRuntimeSchools.map((school) => [
    school.id,
    {
      id: school.id,
      name: school.name,
      shortName: school.shortName,
      about: `${school.name} (${school.location}).`,
      year: 2026,
      status: 'formula-incomplete',
      ownership: school.ownership,
      region: school.region,
      vnuhcm: false,
      summary: summaryFor(school),
      capabilities: capabilitiesFor(school.id),
      catalogSources: catalogSourcesFor(school.id),
    },
  ])
);

function evaluateCatalogOnlySchool(school: RemainingCatalogSchool): AdmissionEvaluation {
  return {
    schoolId: school.id,
    year: 2026,
    methodId: `${school.id}-catalog-2026`,
    confidence: 'unavailable',
    eligibility: {
      status: 'unknown',
      reasons: [`${school.shortName} đã có trong roster toàn quốc, nhưng UniscoreVN chưa có nguồn chính thức đủ để kiểm tra điều kiện hoặc tính điểm.`],
    },
    missingInputs: [],
    missingRules: [remainingCatalogKnowledgeGap.label],
    missingRequirements: [{ kind: 'unsupported', code: remainingCatalogKnowledgeGap.id, label: remainingCatalogKnowledgeGap.label }],
    explanation: [],
    evidence: evidenceFor(school.id),
  };
}

export const remainingCatalogComparisonAdapters: readonly SchoolComparisonAdapter[] = remainingCatalogRuntimeSchools.map((school) => ({
  schoolId: school.id,
  methodId: `${school.id}-catalog-2026`,
  methodName: 'Thông tin tuyển sinh 2026 đang chờ research',
  buildContext() {
    return {};
  },
  evaluate(_profile: ApplicantProfile): SchoolComparisonResult {
    return { evaluation: evaluateCatalogOnlySchool(school) };
  },
}));
