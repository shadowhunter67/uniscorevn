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
  bmtu: {
    sourceId: 'bmtu-admission-2026',
    title: 'Trường Đại học Y Dược Buôn Ma Thuột - Tuyển sinh đại học 2026',
    url: 'https://bmu.edu.vn/ds/tuyen-sinh-dai-hoc',
    publishedAt: '2026-07-08',
    checkedAt: '2026-08-24',
    note:
      'Batch-expand-04 (2026-08-24): researched from scratch (Trường Đại học Y Dược Buôn Ma Thuột, chỉ đào tạo khối sức khỏe: Y khoa, Dược học, Điều dưỡng, Y học cổ truyền, Kỹ thuật xét nghiệm y học). Official domain bmu.edu.vn confirmed (own tuyển sinh section) with the Bộ GD&ĐT 2026 health-sector ngưỡng đảm bảo chất lượng đầu vào (thresholds published 08/07/2026): Y khoa/Y học cổ truyền/Dược học require grade-12 academic rank "Giỏi" AND raw THPT-exam 3-subject total >= 20,00/30 (or assessment score >= 8,50/10) — a dual AND-gate on rank plus score. ApplicantProfile has no academic-rank field (same gap documented for hubt), and since 100% of BMTU programs are health-licensed majors under this gate (unlike hubt which had non-health majors too), there is no safe flat-numeric subset to ship as eligibility-only without silently dropping the rank requirement. Left at researched; do-not-guess/do-not-drop-a-required-condition rule applied.',
  },
  pxu: {
    sourceId: 'pxu-admission-2026',
    title: 'Đăng ký xét tuyển - Trường đại học Phú Xuân',
    url: 'https://pxu.edu.vn/dang-ky-xet-tuyen/',
    checkedAt: '2026-08-24',
    note: 'Batch-expand-12 (2026-08-24): official pxu.edu.vn page confirms 5 admission methods for 2026 (transcript/học bạ average across grades 10-12 plus interview, THPT exam results, combined exam-or-transcript with foreign-language certificate, and university aptitude-test results). No single clean numeric floor or per-major subject-combination table was extracted, so left at researched.',
  },
  qtu: {
    sourceId: 'qtu-admission-2026',
    title: 'Thông tin tuyển sinh Đại học chính quy năm 2026 (Dự kiến) - Trường Đại học Quang Trung',
    url: 'https://qtu.edu.vn/de-an-tuyen-sinh-dai-hoc-chinh-quy-nam-2026/',
    checkedAt: '2026-08-24',
    note: 'Batch-expand-12 (2026-08-24): official qtu.edu.vn 2026 admission plan confirms 1,058-quota, 4-method admission (3-subject transcript combination, 2026 THPT exam results, national-university aptitude-test results, direct admission) across 11 majors with reported cutoffs in the 13-18/30 range. No official per-major floor table was extracted (only third-party cutoff summaries), so left at researched rather than modeling an unverified threshold.',
  },
  pyu: {
    sourceId: 'pyu-admission-2026',
    title: 'Trường Đại học Phú Yên - Cổng thông tin tuyển sinh',
    url: 'https://tuyensinh.pyu.edu.vn/',
    checkedAt: '2026-08-24',
    note: 'Batch-expand-12 (2026-08-24): official tuyensinh.pyu.edu.vn confirms 2026 admission runs 4 methods (direct admission, THPT exam results, transcript-based, combined THPT-exam + aptitude-test for arts/PE majors). Registration flows through the national MOET system. No numeric threshold or per-major subject-combination table was extracted from this pass, so left at researched.',
  },
  qbu: {
    sourceId: 'qbu-admission-2026',
    title: 'Thông tin tuyển sinh đại học chính quy năm 2026 (dự kiến) - QBU: Tuyển sinh',
    url: 'http://tuyensinh.qbu.edu.vn/thong-tin-tuyen-sinh-nam-2026-du-kien/',
    checkedAt: '2026-08-24',
    note: 'Batch-expand-12 (2026-08-24): official tuyensinh.qbu.edu.vn 2026 (projected) admission page confirms 3 methods (direct admission, THPT exam results, THPT transcript results) across pedagogy/language/economics/technology/agriculture/tourism programs; teacher-training majors additionally require permanent residence in Quảng Trị province (post-merger administrative scope, a condition not modeled by this app). No numeric floor score was extracted, so left at researched.',
  },
  qnamu: {
    sourceId: 'qnamu-admission-2026',
    title: 'Thông tin tuyển sinh – Trường Đại học Quảng Nam',
    url: 'http://qnamuni.edu.vn/chuyen-muc/tuyen-sinh/thong-tin-tuyen-sinh/',
    checkedAt: '2026-08-24',
    note: 'Batch-expand-12 (2026-08-24): official qnamuni.edu.vn admissions page confirms 2026 admission covers THPT exam results, 3-year THPT transcript results, direct admission, and aptitude-test results from VNU-HCM/Hanoi Pedagogical University routes; teacher-training majors require permanent residence in Đà Nẵng (post-merger administrative scope, a condition not modeled by this app). No numeric floor score was extracted, so left at researched.',
  },
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
  // Batch expand-16 (2026-08-24):
  vnued: {
    sourceId: 'vnued-admission-2026',
    title: 'Mở cổng đăng ký hồ sơ xét tuyển đại học chính quy năm 2026 — Trường Đại học Giáo dục, ĐHQGHN',
    url: 'https://education.vnu.edu.vn/tuyen-sinh/dai-hoc-chinh-quy/mo-cong-dang-ky-ho-so-xet-tuyen-dai-hoc-chinh-quy-nam-2026/',
    checkedAt: '2026-08-24',
    note:
      'Official 2026 admission page (education.vnu.edu.vn) fetched directly: confirms 2,000 quota across 16 programs and states the portal opened for "Đối tượng Xét tuyển thẳng, ưu tiên xét tuyển, xét tuyển theo HSA, SAT" — direct admission, priority admission, HSA aptitude test, and SAT are the named 2026 pathways; a plain THPT-exam-score route (the only method the shared applicant profile can evaluate, unlike sibling VNU-Hanoi schools such as ULIS) is not prominently listed for this cycle. A separate "Ngưỡng đảm bảo chất lượng đầu vào" (quality-assurance threshold) notice is referenced but its numeric content was not present in the fetched excerpt. Left at researched: no confirmed THPT-exam floor was located, and HSA/SAT routes have no matching ApplicantProfile fields to evaluate.',
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
  vnuhsb: {
    sourceId: 'vnuhsb-admission-2026',
    title: 'HSB (Truong Quan tri va Kinh doanh, DHQGHN) thong tin tuyen sinh dai hoc 2026 (du kien)',
    url: 'https://www.hsb.edu.vn/news/thong-tin-tuyen-sinh-dai-hoc-nam-2026-cua-hsb-du-kien',
    checkedAt: '2026-08-25',
    note:
      'Official HSB 2026 preliminary notice (fetched directly, text-readable) confirms HSB will drop hoc ba as a 2026 method, lists 4 methods (301 truc tiep/uu tien, 100 thi TN THPT + IELTS conversion, 401 HSA, 500 phong van EQ + thi TN THPT), 10 subject combinations, and an EQ-interview bonus, but explicitly defers the numeric quality threshold/score-adjustment formula to a later Ministry-timed announcement ("du kien"). Left at researched; do not fabricate a floor score.',
  },
  vnuis: {
    sourceId: 'vnuis-admission-2026',
    title: 'VNU-IS (Truong Quoc te, DHQGHN) thong tin tuyen sinh dai hoc chinh quy nam 2026',
    url: 'https://www.is.vnu.edu.vn/truong-quoc-te-thong-bao-thong-tin-du-kien-tuyen-sinh-dhcq-nam-2026/',
    checkedAt: '2026-08-25',
    note:
      'Official VNU-IS 2026 notice (fetched directly, text-readable) lists 1350 chi tieu across 15 programs, 4 methods (301/100/409/401), 11 subject combinations, per-program English-score gating conditions (THPT English >=6.0 or >=5.0 for STEM programs, or GPA/HSA/certificate alternatives), the score formula (3-subject total + bonus + priority), and a bonus-point table for national competitions. No overall minimum total-score floor is published; eligibility depends on combined per-program English gating plus an unpublished quality threshold, which is too composite to model without guessing. Left at researched.',
  },
  vnulaw: {
    sourceId: 'vnulaw-superseded-2026',
    title: 'VNU-Luat (Truong Dai hoc Luat, DHQGHN) - superseded by dedicated eligibility-only module',
    url: 'https://law.vnu.edu.vn/thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2026/',
    checkedAt: '2026-08-25',
    note:
      'Superseded (2026-08-25 batch): eligibility-only upgrade shipped using the official 2026 admission page (common 18/30 threshold + Toan/Ngu van >=6/10 condition, THPT-exam method only). See normalized/runtime-source-snapshot/vnulaw/sources.ts. This entry is unused because vnulaw is now in explicitRuntimeSchoolIds; kept only as a research trail.',
  },
  vnuump: {
    sourceId: 'vnuump-superseded-2026',
    title: 'VNU-UMP (Truong Dai hoc Y Duoc, DHQGHN) - superseded by dedicated eligibility-only module',
    url: 'https://ump.vnu.edu.vn/article-thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2026-(hinh-thuc-dao-tao-chinh-quy)-19647-3439.html',
    checkedAt: '2026-08-25',
    note:
      'Superseded (2026-08-25 batch): eligibility-only upgrade shipped using the official 2026 admission page (uniform 15/30 THPT-exam floor across all 6 majors). See normalized/runtime-source-snapshot/vnuump/sources.ts. This entry is unused because vnuump is now in explicitRuntimeSchoolIds; kept only as a research trail.',
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
  hat: {
    sourceId: 'hat-admission-2026',
    title: 'HUHT tuyển sinh 2026 - Trường Du lịch - Đại học Huế',
    url: 'http://huht.hueuni.edu.vn/tuyensinh/index.php/tin-tuc/sinh-vien-huht-thong-tin-tuyen-sinh-2026-277',
    checkedAt: '2026-08-24',
    note:
      'Batch expand-07 (2026-08-24): official HUHT admission subdomain (huht.hueuni.edu.vn, part of the already-trusted Đại học Huế domain family used for hce/hul/husc/huaf/hueedu) identified with a dedicated 2026 admission page, but direct fetch returned "connection refused" twice in this pass. Secondary aggregators (vietjack.com, tuyensinhso.vn) report a >=18/30 THPT-exam floor and a transcript floor of 19/30 (25/30 for Hotel/Tourism Management), but a later search pass found conflicting signal that the 2026-specific numbers "will be updated" and some cited figures trace back to 2022/2024 data rather than a confirmed 2026 notice. Left at researched rather than eligibility-only because the 2026 number is not cleanly confirmed; do-not-guess-formula rule applied.',
  },
  thanglong: {
    sourceId: 'thanglong-admission-2026',
    title: 'Đăng ký xét tuyển Trường Đại học Thăng Long 2026: Hướng dẫn đầy đủ từ A-Z',
    url: 'https://thanglong.edu.vn/dang-ky-xet-tuyen-dai-hoc-thang-long-2026',
    checkedAt: '2026-08-24',
    note:
      'Official thanglong.edu.vn 2026 admission guide (plus the linked official Quyết định ban hành thông tin tuyển sinh 2026, thanglong.edu.vn, dated 2026-02-11) confirms 6 admission methods (THPT exam; THPT exam + international language certificate; HSA/TSA/SPT aptitude tests; THPT exam + grade-12 transcript for Nursing/Tourism/Hotel Management; grade-12 transcript + talent test for Vocal/Graphic Design; direct admission), 37 subject combinations, and 25 programs across 8 faculties, quota 3,000. No 2026 numeric threshold (điểm chuẩn/điểm sàn) had been published as of this research pass — the article only cites 2025 reference scores (16.0-23.75/30) — and the official Quyết định PDF text itself was not extractable via WebFetch (page shell only). Runtime stays researched-only; do not use 2025 cutoffs as 2026 thresholds.',
  },
  dhp: {
    sourceId: 'dhp-admission-2026',
    title: 'Thông tin tuyển sinh Trường Đại học Hải Phòng năm 2026',
    url: 'https://dhhp.edu.vn/post/thong-tin-tuyen-sinh-truong-dai-hoc-hai-phong-nam-2026-62395.html',
    checkedAt: '2026-08-24',
    publishedAt: '2026-02-14',
    note:
      'Batch expand-06 (2026-08-24): official dhhp.edu.vn 2026 admission post confirmed live (accessed via WebFetch, byline Nguyễn Đức Nghĩa, 14/02/2026). Page confirms 3,195-seat 2026 plan across multiple methods (transcript review, THPT exam, international qualifications, HSA/V-SAT, direct admission) and states quality-assurance thresholds/conversion tables exist, but the actual numeric threshold/conversion tables are only reachable via attached files (Tệp tin đính kèm) not extracted by WebFetch in this pass, and the dedicated portal tuyensinh.dhhp.edu.vn was not separately verified. Runtime stays researched-only; do not fabricate the threshold numbers.',
  },
  dumtp: {
    sourceId: 'dumtp-admission-2026',
    title: 'Trường Đại học Kỹ thuật Y - Dược Đà Nẵng — cổng thông tin chính thức',
    url: 'https://ydn.edu.vn/',
    checkedAt: '2026-08-24',
    note:
      'Batch expand-06 (2026-08-24): official domain confirmed via WebFetch (dhktyduocdn.edu.vn 301-redirects to ydn.edu.vn, page title "Trường Đại học Kỹ thuật Y Dược Đà Nẵng"). Site lists 2026 admission activity (6 xét tuyển methods per secondary aggregator corroboration, threshold/conversion notice dated 09/07/2026, official score announcement dated 13/08/2026), but the specific numeric threshold table itself was not extracted via WebFetch in this pass (news list only, no direct fetch of the threshold notice page). Runtime stays researched-only; do not fabricate per-method thresholds.',
  },
  htu: {
    sourceId: 'htu-admission-2026',
    title: 'Trường Đại học Hà Tĩnh - Thông tin tuyển sinh đại học chính quy năm 2026',
    url: 'https://ts.htu.edu.vn/ts-dh/tuyen-sinh-dh-2026',
    checkedAt: '2026-08-24',
    note:
      'Batch 11 (2026-08-24): official ts.htu.edu.vn page fetched directly and text-extractable, confirming 5 admission methods (mã 100 THPT exam, mã 200 học bạ, mã 402 ĐGNL/ĐGTD, mã 411 foreign-THPT graduates, mã 301 direct/priority admission) and two THPT floors: 15,00/30 for most programs vs 18,00/30 (or lớp-12 academic rank "giỏi trở lên") for Sư phạm and Luật programs, plus a 18,0/30 học bạ floor. The page does not list which specific programs fall in the Sư phạm/Luật tier vs the general tier as a structured, extractable table, so a program-to-tier mapping cannot be built without guessing. Left at researched; do not fabricate the program-tier mapping.',
  },
  hvu: {
    sourceId: 'hvu-admission-2026',
    title: 'Trường Đại học Hùng Vương (Phú Thọ) - Trang tin tuyển sinh 2026',
    url: 'https://www.hvu.edu.vn/tin-tuc/tuyen-sinh.hvu',
    checkedAt: '2026-08-24',
    note:
      'Batch 11 (2026-08-24): official hvu.edu.vn admission page confirmed live, but its 2026 admission-information document is only linked as an external Google Drive file, not extractable as page text via WebFetch. Secondary press (baomoi.com, citing an official Trường ĐH Hùng Vương announcement) reports a per-major-group ngưỡng đảm bảo chất lượng đầu vào table (17-21/30: 21 for Tiểu học/Toán/Ngữ văn/Tiếng Anh sư phạm, 20 for KHTN/Lịch sử-Địa lí sư phạm/Mầm non, 19 for GDTC/Âm nhạc/Mỹ thuật sư phạm, 18 for Điều dưỡng, 17 for the remaining majors), but this was not cross-verified against the primary hvu.edu.vn document text in this pass. Left at researched; do not fabricate the per-major table from secondary press alone.',
  },
  hump: {
    sourceId: 'hump-admission-2026',
    title: 'Trường Đại học Y Dược, Đại học Huế - Cổng tuyển sinh 2026',
    url: 'https://tuyensinh.huemed-univ.edu.vn/home/',
    checkedAt: '2026-08-24',
    note:
      'Batch 11 (2026-08-24): official tuyensinh.huemed-univ.edu.vn portal confirmed live, recruiting 11 undergraduate and 6 associate-degree programs for 2026 per Quyết định 979/QĐ-ĐHYD (24/02/2026), but the numeric thresholds/subject combinations sit in separate linked decision documents not text-extractable via WebFetch in this pass. Y Dược majors are additionally gated by MOET-published health-sector floor rules with no matching applicant-profile field yet. Left at researched; do not fabricate numbers.',
  },
  hufl: {
    sourceId: 'hufl-admission-2026',
    title: 'Trường Đại học Ngoại ngữ, Đại học Huế - Thông tin tuyển sinh đại học chính quy 2026',
    url: 'https://tuyensinh.huflis.edu.vn/tin-tuc/thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2026_20251231114356',
    checkedAt: '2026-08-24',
    note:
      'Batch 11 (2026-08-24): official tuyensinh.huflis.edu.vn page fetched directly, confirming 5 admission methods (THPT exam; học bạ; xét tuyển thẳng cho giải Olympic quốc gia/quốc tế; THPT exam + chứng chỉ ngoại ngữ quốc tế; học bạ + chứng chỉ ngoại ngữ) and a 3-subject combination requirement, but it explicitly defers the per-program ngưỡng đảm bảo chất lượng đầu vào to a separate notice ("theo quy định của Bộ GD&ĐT và của Đại học Huế"). That linked threshold notice (huflis.edu.vn, published 2026, same Đại học Huế Phụ lục 1 pattern as the already-finished hce/hul/husc/huaf/hueedu schools) was not text-extractable via WebFetch in this pass (page shell only). Left at researched; do not fabricate the Phụ lục numbers without a successful extraction.',
  },
  muce: {
    sourceId: 'muce-admission-2026',
    title: 'Trường Đại học Xây dựng Miền Trung (MUCE) - Cổng thông tin tuyển sinh',
    url: 'https://tuyensinh.muce.edu.vn/',
    checkedAt: '2026-08-24',
    note:
      'Batch expand-10 (2026-08-24): official domain tuyensinh.muce.edu.vn (and muce.edu.vn) confirmed via search results (Tuy Hòa, Phú Yên campus) but both returned HTTP 403 (WAF) on direct WebFetch in this pass. Secondary aggregators report ~7 admission methods (THPT exam, học bạ, direct admission, ĐGNL, talent-combination exams) for 2025/2026 but no confirmed 2026 numeric threshold. Left at researched; retry direct fetch from a different network path before extracting a formula.',
  },
  pctu: {
    sourceId: 'pctu-admission-2026',
    title: 'Thông tin tuyển sinh đại học năm 2026 — Trường Đại học Phan Châu Trinh',
    url: 'https://pctu.edu.vn/vn/thong-tin-tuyen-sinh-dai-hoc-nam-2026.html',
    checkedAt: '2026-08-24',
    note:
      'Official pctu.edu.vn 2026 admission page fetched directly (own primary domain, readable text): confirms 5 admission methods and a full per-major THPT-exam floor table (Điểm xét tuyển = 3 môn thi + điểm ưu tiên) — Y khoa/Răng-Hàm-Mặt >=20,00/30 (hoặc điểm xét tốt nghiệp >=8,5); Điều dưỡng/Kỹ thuật xét nghiệm y học >=16,5/30 (hoặc >=6,5); Tâm lý học/Quản lý bệnh viện >=15,0/30. Every bucket is ALSO gated by a grade-12 academic-rank condition (Tốt for Y khoa/RHM, Khá for Điều dưỡng/KTXNYH, Đạt for the rest) with no matching applicant-profile field in this runtime, so no bucket can be safely modeled as a plain threshold check. Do-not-guess-formula (academic-rank-gated floors): stays researched.',
  },
  pdu: {
    sourceId: 'pdu-admission-2026',
    title: 'Ngưỡng đảm bảo chất lượng đầu vào — Cổng thông tin tuyển sinh Đại học Phạm Văn Đồng',
    url: 'https://tuyensinh.pdu.edu.vn/nguong-dam-bao-chat-luong-dau/',
    checkedAt: '2026-08-24',
    note:
      'Official tuyensinh.pdu.edu.vn admission-info page confirms the general shape (non-teacher-training majors use a flat combined-3-subject THPT-exam floor around 15,0/30 zone-3; Giáo dục Mầm non teacher-training uses a separate higher floor with a Toán/Văn sub-condition), matching secondary press coverage (baoquangngai.vn 2026 admission-score article) of an existing PDU notice, but the fetched threshold page itself is titled/dated for the 2025 cycle and no distinct primary 2026-dated numeric notice could be located in this pass — reusing its numbers for 2026 risked citing stale data. Do-not-guess-formula (year-of-source ambiguous): stays researched pending a confirmed 2026-dated primary notice.',
  },
  ukh: {
    sourceId: 'ukh-admission-2026',
    title: 'Trường Đại học Khánh Hòa — thông báo tuyển sinh và ngưỡng đảm bảo chất lượng đầu vào năm 2026',
    url: 'https://tuyensinh.ukh.edu.vn/',
    checkedAt: '2026-08-24',
    note:
      'Batch expand-15 (2026-08-24): official admission portal (tuyensinh.ukh.edu.vn) exists and 4 admission methods (THPT exam, transcript, V-ACT, direct admission) are confirmed via secondary press, but two independent search passes returned CONFLICTING numbers for the general THPT-exam floor score — one reports 15.00/30, another reports 18.00/30 (or 8.50 graduation-exam-score alternative) — with the 18.00 figure possibly applying only to the teacher-training group rather than all majors. Neither figure could be confirmed against the primary tuyensinh.ukh.edu.vn page in this pass (WebFetch/WebSearch did not surface the specific notice text). Do-not-guess-formula rule applied: left at researched rather than picking one of the conflicting numbers.',
  },
  upt: {
    sourceId: 'upt-admission-2026',
    title: 'Trường Đại học Phan Thiết — thông tin tuyển sinh năm 2026',
    url: 'https://upt.edu.vn/tuyen-sinh-dai-hoc/thong-tin-tuyen-sinh-nam-2026/',
    checkedAt: '2026-08-24',
    note:
      'Batch expand-15 (2026-08-24): official upt.edu.vn 2026 admission page was fetched directly but explicitly defers all numeric floor scores ("Thí sinh phải đạt điểm đảm bảo chất lượng đầu vào do Nhà trường thông báo sau khi có kết quả Kỳ thi tốt nghiệp THPT 2026") to a later notice not linked/extractable from this page. Secondary aggregators (giaoducthoidai.vn, thi.tuyensinh247.com) report a 15-20/30 range for the THPT-exam and transcript methods, but this could not be cross-checked against a primary source with a specific per-major breakdown in this pass. Riêng Kỹ thuật xét nghiệm y học, Luật, Luật kinh tế follow MOET-set health/law thresholds (unspecified number). Left at researched; do not fabricate the exact band.',
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
  'vnulaw',
  'vnuump',
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
  'dainam',
  'halongu',
  'uda',
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
