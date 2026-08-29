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

interface FinalCatalogSchool {
  id: string;
  shortName: string;
  name: string;
  location: string;
  ownership: SchoolModule['ownership'];
  region: SchoolModule['region'];
  entityLevel?: SchoolModule['entityLevel'];
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

/**
 * Batch expand-03 (2026-08-24): trường đã có nguồn tuyển sinh chính thức 2026 xác minh được
 * (URL/publisher/note thật), nhưng chưa trích xuất được ngưỡng/công thức đủ cấu trúc để nâng lên
 * eligibility-only/partial. Có mặt ở đây => summary/capabilities/catalogSources đổi từ
 * catalog-only phẳng sang "researched". Copy nguyên mẫu từ remainingCatalog.ts.
 */
const researchedAdmissionSources: Record<string, ResearchedAdmissionSource> = {
  actvn: {
    sourceId: 'actvn-admission-2026',
    title: 'Thông báo Điểm chuẩn trúng tuyển vào đại học hệ chính quy năm 2026 - Học viện Kỹ thuật Mật mã',
    url: 'https://tuyensinh.actvn.edu.vn/thong-bao-diem-chuan-trung-tuyen-vao-dai-hoc-he-chinh-quy-nam-2026/',
    publishedAt: '2026-08-13',
    checkedAt: '2026-08-24',
    note:
      'Batch-expand-04 (2026-08-24): researched from scratch (Học viện Kỹ thuật Mật mã, Bộ Quốc phòng, đào tạo dân sự lẫn quân sự). Official tuyensinh.actvn.edu.vn 2026 cutoff notice fetched live: confirms 3 programs (An toàn thông tin, Công nghệ thông tin, Kỹ thuật Điện tử-Viễn thông), a 2026-new aptitude-assessment intake (HSA/TSA/APT/SPT scores now accepted alongside THPT exam), and that cutoffs are quy đổi tương đương về thang 30 đã gồm điểm ưu tiên/cộng — but the actual score table is embedded as an image and not extractable as text. Note this page publishes điểm chuẩn (competitive admitted-cutoff results), not a floor/eligibility formula, so even with numbers it would not be safe to model as an eligibility threshold. Left at researched; do-not-guess-formula rule applied.',
  },
  aadaa: {
    sourceId: 'aadaa-admission-2026',
    title: 'Phương án tuyển sinh và điểm chuẩn Học viện Phòng không - Không quân năm 2026',
    url: 'https://khoahoc.vietjack.com/school/119/hoc-vien-phong-khong-khong-quan-pkh-de-an-tuyen-sinh-2026-moi-nhat',
    checkedAt: '2026-08-24',
    note:
      'Batch-expand-04 (2026-08-24): researched from scratch (Học viện Phòng không - Không quân, Bộ Quốc phòng, tuyển nam giới, quota theo miền Bắc/Nam/khu vực và tiêu chí phụ sức khỏe/chính trị theo quy định riêng ngành quân sự). No dedicated public .edu.vn admission domain for this academy was located (searches surfaced only third-party aggregators and a JS-heavy vietjack profile page); recruitment is administered centrally through the Ministry of National Defense portal tuyensinhquandoi.com, which candidates must use to register, alongside secondary press coverage confirming 4 methods (direct/priority admission, THPT exam, aptitude-assessment scores from VNU-Hanoi/VNU-HCM, and a Ministry of Defense-specific aptitude test) and a 350-seat 2026 quota. No structured, school-published floor-score table was extractable. Left at researched given the confirmed-but-unstructured official recruitment channel; the restricted/quota-based nature of military-academy admission (gender, khu vực, sức khỏe, chính trị) also makes a plain 30-point eligibility check unsafe to model even if a headline number were found.',
  },
  aoc: {
    sourceId: 'aoc-admission-2026',
    title: 'Chỉ tiêu, phương thức tuyển sinh của Trường Sĩ quan Pháo binh',
    url: 'https://xaydungchinhsach.chinhphu.vn/tuyen-sinh-quan-su-nam-2023-chi-tieu-phuong-thuc-tuyen-sinh-cua-truong-si-quan-phao-binh-119230306110118033.htm',
    checkedAt: '2026-08-24',
    note:
      'Batch-expand-04 (2026-08-24): researched from scratch (Trường Đại học Sĩ quan Pháo binh / Trường Sĩ quan Pháo binh, Bộ Quốc phòng, tuyển nam giới toàn quốc, miễn học phí). No dedicated public .edu.vn admission domain located; the government policy-news portal (xaydungchinhsach.chinhphu.vn) carries the clearest structural admission-method description found (3 methods: direct/priority admission, aptitude-assessment scores from VNU-Hanoi/VNU-HCM, THPT exam results), and centralized registration runs through tuyensinhquandoi.com like other military academies. Secondary press gives only a prior-year (2025) cutoff reference (24,40 Bắc / 22,25 Nam) with no 2026 official floor-score notice located. Left at researched; do-not-guess-formula rule applied, and khu-vực/gender-quota structure makes a plain eligibility model unsafe regardless.',
  },
  bga: {
    sourceId: 'bga-admission-2026',
    title: 'Điểm chuẩn 2026 Học viện Biên phòng, hướng dẫn xác nhận nhập học',
    url: 'https://xaydungchinhsach.chinhphu.vn/diem-chuan-2026-hoc-vien-bien-phong-huong-dan-xac-nhan-nhap-hoc-119260812142531373.htm',
    publishedAt: '2026-08-12',
    checkedAt: '2026-08-24',
    note:
      'Batch-expand-04 (2026-08-24): researched from scratch (Học viện Biên phòng, Bộ Quốc phòng, tuyển 150 chỉ tiêu nam giới năm 2026, tổ hợp C03/C04/D01). Government policy-news portal (xaydungchinhsach.chinhphu.vn) article confirms the 2026 admitted cutoffs are split by quân khu (Quân khu 4: 24,68; miền Bắc: 23,96; Quân khu 7: 22,75; Quân khu 9: 22,50; Quân khu 5: 21,75, kèm tiêu chí phụ ở 2 mức biên) — these are competitive admitted-cutoff results (điểm chuẩn), not a published floor/eligibility formula, and vary by quân khu quota rather than a flat national threshold. The academy\'s own domain (hvbp.edu.vn, referenced by secondary sources) could not be reached in this pass. Left at researched; do-not-guess-formula rule applied — quân-khu-based quota competition is not safely modeled as a flat eligibility check.',
  },
  buv: {
    sourceId: 'buv-admission-2026',
    title: 'British University Vietnam - Tuyển sinh / Admission',
    url: 'https://www.buv.edu.vn/admission/',
    checkedAt: '2026-08-24',
    note:
      'Batch-expand-04 (2026-08-24): researched from scratch (Trường Đại học Anh Quốc Việt Nam, BUV, liên kết đào tạo với các đại học Anh Quốc). Official buv.edu.vn admission page confirmed live: BUV explicitly does NOT use a THPT-graduation-exam cutoff score; admission is holistic (academic transcript review, personal essay, interview) gated by an English-proficiency requirement (IELTS >= 6.0 overall / no skill below 5.5, or equivalent PTE/TOEFL) that varies by specific degree-awarding partner institution and program. There is no single numeric floor-score formula of the kind this codebase models (THPT-exam-total or transcript-average against a school-wide threshold), so eligibility-only support is not a safe fit even though the official source is clear and fully readable. Left at researched; do-not-guess-formula rule applied (no formula exists to guess, but no compatible formula shape to model either).',
  },
  tnut: {
    sourceId: 'tnut-admission-2026',
    title: 'TNUT undergraduate admission guide 2026',
    url: 'https://tnut.edu.vn/huong-dan-xet-tuyen-dai-hoc-nam-2026-tai-truong-dai-hoc-ky-thuat-cong-nghiep-dai-hoc-thai-nguyen-dz22289.html',
    checkedAt: '2026-08-24',
    publishedAt: '2026-07-01',
    note:
      'Batch expand-14 (2026-08-24): official tnut.edu.vn 2026 admission guide (its own domain, Thai Nguyen University member school) confirms method process (THPT exam, transcript, V-SAT, direct admission) and states floor thresholds "will be determined and announced per Ministry regulation" once 2026 exam results are in - no numeric threshold is published in this document itself. The system-level TNU notice (tnu.edu.vn, 08/07/2026) states a general 16,00/30 floor for "most programs" but explicitly differentiates Teacher Education/Medicine/Semiconductor/Law categories without confirming TNUT falls under the general floor; TNUT program-to-category mapping not verified. Left at researched; do not assume the 16/30 system floor applies without confirmation.',
  },
  tqt: {
    sourceId: 'tqt-admission-2026',
    title: 'Truong Dai hoc Tran Quoc Tuan (Si quan Luc quan 1) official site',
    url: 'http://sqlq1.edu.vn/',
    checkedAt: '2026-08-24',
    note:
      'Batch expand-14 (2026-08-24): official domain sqlq1.edu.vn confirmed via search (Facebook-linked, school code LAH). This is a Ministry of Defense military officer school: eligibility is gated by gender (male only for combat-officer training), age (<=31, or 17-21 for candidates with no prior military service), political/health vetting, and a preliminary military screening score (so-tuyen) separate from the THPT exam - none of these map to UniScoreVN\'s applicant-profile fields, and admission also runs through a district/regiment-level military recruitment process rather than the standard national online portal. Left at researched; the THPT/exam-combination floor (reported secondarily as 18-22) is not modeled because the surrounding eligibility gates cannot be represented.',
  },
  tueba: {
    sourceId: 'tueba-admission-2026',
    title: 'TUEBA official site (Truong Dai hoc Kinh te va Quan tri Kinh doanh - Dai hoc Thai Nguyen)',
    url: 'https://tueba.edu.vn/',
    checkedAt: '2026-08-24',
    note:
      'Batch expand-14 (2026-08-24): tueba.edu.vn confirmed as the official Thai Nguyen University member-school domain with an admission-threshold notice pattern (own 2025 notice found: "Thong bao Nguong Dam Bao Chat Luong Dau Vao..."), but the equivalent 2026 notice with numeric thresholds could not be located via search (only a 2025 dated article surfaced: floor ~17/30 most majors, Luat Kinh te 18/30 - not confirmed for 2026). Press coverage cites a 2026 THPT-exam cutoff range of 17.0-19.5 for admitted students, not the floor score. Left at researched; do not reuse 2025 numbers as 2026 thresholds.',
  },
  tump: {
    sourceId: 'tump-admission-2026',
    title: 'TUMP admission portal 2026 (tuyensinh.tump.edu.vn)',
    url: 'https://tuyensinh.tump.edu.vn/',
    checkedAt: '2026-08-24',
    note:
      'Batch expand-14 (2026-08-24): official TUMP (Thai Nguyen University of Medicine and Pharmacy) admission portal tuyensinh.tump.edu.vn confirmed live via search (score-calculation tool page, applicant-document notices for 2026 found), but direct WebFetch failed (TLS certificate verification error) and no numeric floor-score/ngưỡng đảm bảo chất lượng đầu vào table was extracted. Secondary press confirms 2026 admitted cutoffs range 19.75 (Y hoc du phong) to 26.80 (Rang-Ham-Mat) across ~8 health programs, but these are cutoffs (diem chuan), not the input floor, and multi-program THPT/transcript/HSA/V-SAT method scoping is not resolved. Left at researched; do not fabricate the floor table.',
  },
  tuu: {
    sourceId: 'tuu-admission-2026',
    title: 'Truong Dai hoc Cong doan 2026 floor-score press coverage (VietNamNet)',
    url: 'https://vietnamnet.vn/truong-dh-cong-doan-cong-bo-diem-san-xet-tuyen-nam-2026-2534559.html',
    checkedAt: '2026-08-24',
    publishedAt: '2026-07-10',
    note:
      'Batch expand-14 (2026-08-24): VietNamNet (state-run press) confirms Truong Dai hoc Cong doan (TUU) published its 2026 floor-score notice on 10/07/2026 covering 2,989 undergraduate seats across 5 methods, with a stated minimum THPT 3-subject total of 15,00/30 for at least some majors, but the article\'s actual per-major threshold table is embedded as images that failed to load in this pass, and no direct daihoccongdoan.edu.vn/dhcd URL for the primary notice was located. Left at researched; do not assume 15/30 is the uniform floor for every major without the primary table.',
  },
  trungvuong: {
    sourceId: 'trungvuong-admission-2026',
    title: 'Truong Dai hoc Trung Vuong 2026 admission portal (tuyensinh.tv-uni.edu.vn)',
    url: 'https://tuyensinh.tv-uni.edu.vn/',
    checkedAt: '2026-08-24',
    note:
      'Batch expand-14 (2026-08-24): official tv-uni.edu.vn admission portal confirmed live for 2026 (4 methods: transcript, THPT exam, direct admission, aptitude assessment). Transcript method states a common floor of 3-subject total >= 15/30, but the Nursing major requires grade-12 academic ranking "Gioi" (Excellent) AND a 3-subject total >= 19.5/30 - the academic-rank condition has no matching applicant-profile field. THPT-exam-method numeric threshold was not confirmed separately from the transcript-method number in this pass. Left at researched per the academic-rank-gating rule; do not model eligibility without the rank field.',
  },
  tucst: {
    sourceId: 'tucst-admission-2026',
    title: 'TUCST 2026 admission methods announcement (qldt.tucst.edu.vn)',
    url: 'http://qldt.tucst.edu.vn/web/tin-tuc-su-kien/truong-dai-hoc-van-hoa-the-thao-va-du-lich-thanh-hoa-cong-bo-4-phuong-thuc-tuyen-sinh-dai-hoc-chinh-quy-nam-2026.html',
    checkedAt: '2026-08-24',
    note:
      'Batch expand-14 (2026-08-24): official TUCST (Truong Dai hoc Van hoa, The thao va Du lich Thanh Hoa) subdomain qldt.tucst.edu.vn confirms 4 admission methods (code 100 THPT exam, 200 transcript, 301 direct/priority, 402 aptitude assessment) and a registration window (01/04-20/06/2026), but no numeric floor-score/ngưỡng đảm bảo chất lượng đầu vào table was located in this pass - the announcement covers only method identity and equivalent-conversion policy in general terms. Left at researched; do not fabricate threshold numbers.',
  },
  vinuni: {
    sourceId: 'vinuni-admission-2026',
    title: 'VinUniversity Officially Announces the 2026 Undergraduate Admissions Plan',
    url: 'https://admissions.vinuni.edu.vn/vinuniversity-officially-announces-the-2026-undergraduate-admissions-plan/',
    checkedAt: '2026-08-24',
    note:
      'Cổng tuyển sinh chính thức VinUniversity (admissions.vinuni.edu.vn) xác nhận tồn tại qua kết quả tìm kiếm và trích dẫn (kế hoạch tuyển sinh đại học 2026, yêu cầu IELTS 6.5 từ 2026, học bổng/hỗ trợ học phí). WebFetch trực tiếp tới admissions.vinuni.edu.vn và vinuni.edu.vn bị chặn (HTTP 403) trong lượt research này nên KHÔNG trích xuất được ngưỡng điểm THPT/hồ sơ có cấu trúc; cần thử lại từ môi trường mạng khác trước khi nâng lên eligibility-only.',
  },
  ppa: {
    sourceId: 'ppa-admission-2026',
    title: 'Học viện CSND thông báo thông tin tuyển sinh trình độ đại học năm 2026',
    url: 'https://hvcsnd.edu.vn/hoc-vien-csnd-thong-bao-thong-tin-tuyen-sinh-trinh-do-dai-hoc-nam-2026-13781',
    checkedAt: '2026-08-24',
    note:
      'Batch-expand-12 (2026-08-24): official hvcsnd.edu.vn 2026 undergraduate admission notice confirms Ministry of Public Security direct-admission/exam-assessment methods with gender-split regional quotas (nationwide security-tech track plus a North-only combat-police track). Eligibility depends on a political/health/background pre-screening (so tuyen) at the local police office with no matching applicant-profile field in this app, so left at researched rather than guessing an eligibility check.',
  },
  psa: {
    sourceId: 'psa-admission-2026',
    title: 'Thông tin tuyển sinh năm 2026 đào tạo đại học chính quy hệ dân sự - Học viện An ninh nhân dân',
    url: 'https://hvannd.edu.vn/thong-tin-tuyen-sinh-nam-2026-dao-tao-dai-hoc-chinh-quy-he-dan-su',
    checkedAt: '2026-08-24',
    note:
      'Batch-expand-12 (2026-08-24): official hvannd.edu.vn 2026 notice confirms 400 total quota (250 security-operations gender-split North-only, 150 information-security/cybercrime nationwide) plus a September 2026 Ministry-run assessment exam. Same political/health pre-screening barrier as other CAND schools applies, no matching profile field, so left at researched.',
  },
  ppu: {
    sourceId: 'ppu-admission-2026',
    title: 'Thông tin tuyển sinh năm 2026 (Đào tạo trình độ đại học) - Trường Đại học Cảnh sát nhân dân',
    url: 'https://dhcsnd.edu.vn/article/thong-tin-tuyen-sinh-nam-2026-hinh-thuc-dao-tao-dao-tao-trinh-do-dai-hoc',
    checkedAt: '2026-08-24',
    note:
      'Batch-expand-12 (2026-08-24): official dhcsnd.edu.vn 2026 notice confirms 300-quota, 3-method admission (direct admission; foreign-language-certificate + Ministry assessment combined; THPT exam + Ministry assessment combined) restricted to the southern region (Đà Nẵng southward). Same political/health/regional pre-screening barrier applies, no matching profile field, so left at researched.',
  },
  psu: {
    sourceId: 'psu-admission-2026',
    title: 'Thông báo tuyển sinh tuyển mới đào tạo trình độ đại học chính quy năm 2026 - Trường Đại học An ninh nhân dân',
    url: 'https://dhannd.bocongan.gov.vn/thong-bao-tuyen-sinh-tuyen-moi-dao-tao-trinh-do-dai-hoc-chinh-quy-nam-2026-a-4201',
    checkedAt: '2026-08-24',
    note:
      'Batch-expand-12 (2026-08-24): official dhannd.bocongan.gov.vn 2026 regular undergraduate admission notice confirms a Ministry-run entrance exam (180 minutes, held 20-21/6/2026) at the school. Same political/health pre-screening barrier as other CAND schools, no matching profile field, so left at researched.',
  },
  sigo: {
    sourceId: 'sigo-admission-2026',
    title: 'Trường Đại học Thông tin liên lạc (Sĩ quan Thông tin) - trang tuyển sinh chính thức',
    url: 'https://tcu.edu.vn/',
    checkedAt: '2026-08-24',
    note:
      'Batch-expand-12 (2026-08-24): official tcu.edu.vn site confirms separate military-system and civilian-system admission tracks; the 2026 military-system plan (100 quota, 4 methods including a Ministry of Defense assessment exam, registration 10/2-15/4/2026) is announced through dedicated "Tuyển sinh hệ quân sự"/"hệ dân sự" pages. Military-track admission requires Ministry of Defense political/health pre-screening with no matching applicant-profile field, so left at researched; civilian-track threshold table not yet extracted.',
  },
  rmitvn: {
    sourceId: 'rmitvn-admission-2026',
    title: 'RMIT Vietnam — Nhập học RMIT Việt Nam / Quy trình nhập học chương trình cử nhân',
    url: 'https://www.rmit.edu.vn/vi/hoc-tap-tai-rmit/nhap-hoc-rmit-viet-nam',
    checkedAt: '2026-08-24',
    note:
      'Cổng tuyển sinh chính thức RMIT Việt Nam (rmit.edu.vn) fetch được nhưng chỉ là trang portal điều hướng: yêu cầu tiếng Anh chung (IELTS Academic 6.5, không kỹ năng nào dưới 6.0) được nêu rõ, nhưng ngưỡng điểm THPT/học bạ cụ thể được trang này dẫn sang từng trang ngành riêng lẻ (hàng chục ngành, không fetch hết trong 1 lượt). Không đủ cấu trúc để mô hình hoá eligibility trong batch này; do-not-guess-formula áp dụng.',
  },
  cmcu: {
    sourceId: 'cmcu-admission-2026',
    title: 'Điểm chuẩn trúng tuyển theo các phương thức xét tuyển của Trường Đại học CMC năm 2026',
    url: 'https://cmcu.edu.vn/diem-chuan-trung-tuyen-theo-cac-phuong-thuc-xet-tuyen-cua-truong-dai-hoc-cmc-nam-2026/',
    publishedAt: '2026-08-09',
    checkedAt: '2026-08-24',
    note:
      'Batch-expand-05 (2026-08-24): trang tuyển sinh chính thức cmcu.edu.vn fetch được, xác nhận 4 phương thức (CMC-TEST đánh giá năng lực riêng, học bạ THPT, điểm thi TN THPT, xét tuyển thẳng) và phân biệt rõ "ngưỡng đảm bảo chất lượng" (theo quy định Bộ GD&ĐT) với "điểm chuẩn" (do Hội đồng tuyển sinh CMC tự quyết). Điểm chuẩn 2026 công bố trên thang /40 (22,7-26,9 cho phương thức THPT/học bạ), nhưng KHÔNG có ngưỡng đầu vào /30 hoặc /40 cụ thể riêng của trường được nêu bằng text — bảng điểm theo ngành nằm trong ảnh đính kèm không trích xuất được. Do-not-guess-formula áp dụng: chưa đủ cấu trúc để nâng lên eligibility-only.',
  },
  dsu: {
    sourceId: 'dsu-admission-2026',
    title: 'Cổng thông tin chính thức Trường Đại học Thể dục Thể thao Đà Nẵng',
    url: 'https://dsu.edu.vn/',
    checkedAt: '2026-08-24',
    note:
      'Batch expand-06 (2026-08-24): domain chính thức dsu.edu.vn xác nhận qua WebFetch, có 4 phương thức tuyển sinh 2026 (thi TN THPT, học bạ, kết hợp điểm thi/học bạ với điểm thi năng khiếu TDTT, xét tuyển thẳng) cho 3 ngành/900 chỉ tiêu, cùng các thông báo "Ngưỡng đảm bảo chất lượng đầu vào" (đăng 22/07/2026) và "Điểm chuẩn trúng tuyển" (đăng 11/08/2026) đã xác nhận tồn tại, nhưng nội dung số liệu cụ thể không được WebFetch trích xuất trong lượt này (chỉ thấy tiêu đề thông báo). Runtime giữ researched-only; chưa fetch được trang con chứa bảng điểm.',
  },
  eaut: {
    sourceId: 'eaut-admission-2026',
    title: 'Trường ĐH Công nghệ Đông Á công bố 4 phương thức tuyển sinh năm 2026',
    url: 'https://eaut.edu.vn/tin-tuc/truong-dh-cong-nghe-dong-a-cong-bo-phuong-thuc-tuyen-sinh-nam-2026/',
    checkedAt: '2026-08-24',
    note:
      'Superseded (2026-08-25 batch): eligibility-only upgrade shipped for method 1 (xét học bạ: trung bình tổ hợp 3 môn qua 6 học kỳ >=18/30 kèm điều kiện điểm thi TN THPT >=15/30), re-verified via eaut.edu.vn cross-checked with Congluan.vn (21/06/2026). Method 2 (thi TN THPT only) threshold still not published — kept as knowledge gap. See normalized/runtime-source-snapshot/eaut/sources.ts. This entry is unused because eaut is now in explicitRuntimeSchoolIds; kept only as a research trail.',
  },
  hau: {
    sourceId: 'hau-admission-2026',
    title: 'Điểm trúng tuyển và danh sách thí sinh trúng tuyển đại học hình thức chính quy năm 2026 - Trường Đại học Kiến trúc Hà Nội',
    url: 'https://hau.edu.vn/Diem-trung-tuyen-va-danh-sach-thi-sinh-trung-tuyen-dai-hoc-hinh-thuc-chinh-quy-nam-2026-cua-Truong-Dai-hoc-Kien-truc-Ha-Noi_n4798.html',
    checkedAt: '2026-08-24',
    publishedAt: '2026-08-11',
    note:
      'Superseded (2026-08-25 batch): eligibility-only upgrade shipped for the 9/22 majors (2 grouped tiers, 15/30 and 18/30) that use standard cultural subject combinations (A00/A01/C01/C02/D01) — the linked Google Drive PDF (Quyết định 406/QĐ-ĐHKT-ĐT, 03/07/2026) WAS successfully read this batch by downloading it directly and reading the file (not via WebFetch, which cannot see embedded/linked images or Drive content) — full per-program Phụ lục table extracted. The other 13 majors (Kiến trúc, Quy hoạch, Điêu khắc, Thiết kế...) require năng khiếu talent-test scores with no ApplicantProfile field — remain unmodeled. Published floor already includes priority/bonus points; runtime only sums raw 3-subject score (documented knowledge gap). See normalized/runtime-source-snapshot/hau/sources.ts. This entry is unused because hau is now in explicitRuntimeSchoolIds; kept only as a research trail.',
  },
  hbu: {
    sourceId: 'hbu-admission-2026',
    title: 'Trường Đại học Hòa Bình công bố Thông báo tuyển sinh trình độ Đại học chính quy năm 2026',
    url: 'https://tuyensinh.daihochoabinh.edu.vn/truong-dai-hoc-hoa-binh-cong-bo-thong-bao-tuyen-sinh-trinh-do-dai-hoc-chinh-quy-nam-2026/',
    checkedAt: '2026-08-24',
    note:
      'Batch expand-07 (2026-08-24): official HBU 2026 admission notice page confirmed live, listing 4 methods (thi TN THPT, học bạ/tốt nghiệp trung cấp-cao đẳng-đại học cùng nhóm ngành, xét tuyển thẳng, học tập THPT + năng khiếu), but the fetched page text does not itself state a numeric threshold — it points to a linked PDF ("Thông báo tuyển sinh hệ chính quy năm 2026") not extracted in this pass. A generic aggregator claim of "15/30 minimum" could not be confirmed as HBU-specific (it may reflect only the nationwide 2026 MOET floor). Left at researched; do-not-guess-formula rule applied.',
  },
  hca: {
    sourceId: 'hca-admission-2026',
    title: 'Học viện Cán bộ TPHCM công bố điểm chuẩn trúng tuyển năm 2026',
    url: 'https://vietnamnet.vn/hoc-vien-can-bo-tphcm-cong-bo-diem-chuan-trung-tuyen-nam-2026-2544036.html',
    checkedAt: '2026-08-24',
    note:
      'Batch expand-07 (2026-08-24): HCA official admission portal (tuyensinh.hcmca.edu.vn) identified and referenced in secondary coverage, but direct fetch failed (connection refused) in this pass. VietnamNet reports actual 2026 admitted cutoffs (điểm chuẩn, post-result) per major: 22.45-24.8/30 (thi TN THPT), 24.43-26.84/30 (học bạ), 829-937 (ĐGNL ĐHQG TPHCM) — these are realized cutoffs that vary by major/method, not a flat floor score, so they cannot be modeled as a single eligibility threshold without fabricating per-program scope. Left at researched; do-not-guess-formula rule applied.',
  },
  ham: {
    sourceId: 'ham-admission-2026',
    title: 'Thông tin tuyển sinh - Học viện Âm nhạc Huế',
    url: 'https://hocvienamnhachue.edu.vn/vi/dao-tao-tuyen-sinh/tuyen-sinh-dao-tao-tuyen-sinh/thong-tin-tuyen-sinh/',
    checkedAt: '2026-08-24',
    note:
      'Batch expand-07 (2026-08-24): official Học viện Âm nhạc Huế domain confirmed to exist and host a dedicated admission-info section (hocvienamnhachue.edu.vn). Secondary aggregation reports thresholds of 20,0 điểm for performance majors (Thanh nhạc, Biểu diễn nhạc cụ phương Tây, Piano, Biểu diễn nhạc cụ truyền thống) and 30,0 điểm for Âm nhạc học/Sáng tác âm nhạc, but the scale these totals are measured on (culture-subject score vs specialized talent-test score, and whether 30,0 is even the same 30-point scale used elsewhere) is not stated cleanly in this pass, so modeling eligibility risks silently using the wrong scale. Left at researched; do-not-guess-formula rule applied.',
  },
  fuv: {
    sourceId: 'fuv-admission-2026',
    title: 'How To Apply To Us - Fulbright University Vietnam',
    url: 'https://fulbright.edu.vn/apply-to-us/',
    checkedAt: '2026-08-24',
    note:
      'Batch expand-07 (2026-08-24): official Fulbright University Vietnam admission portal confirmed (2026-2030 intake application window 05/01/2026-06/04/2026). FUV explicitly uses holistic, non-numeric-threshold admissions (no THPT-score cutoff or fixed formula by design) — there is no admission formula to model as eligibility/partial without misrepresenting the process. Left at researched; do-not-guess-formula rule applied (not a knowledge gap to close, but a genuinely formula-free admissions process).',
  },
  gass: {
    sourceId: 'gass-admission-2026',
    title: 'Học viện Khoa học xã hội - Cổng thông tin điện tử (Tuyển sinh)',
    url: 'https://gass.edu.vn/',
    checkedAt: '2026-08-24',
    note:
      'Batch expand-07 (2026-08-24): official GASS site (gass.edu.vn) confirmed live; its Tuyển sinh navigation lists only Tiến sĩ (doctoral), Thạc sĩ (master), and short-term/bổ sung kiến thức programs — no đại học chính quy (undergraduate) admission track exists at this institution (cross-checked against Vietnamese Wikipedia, which also states GASS trains only thạc sĩ/tiến sĩ). This is a genuine "no undergraduate program" finding, not a research gap — GASS should not be modeled as an undergraduate eligibility/calculator target. Left at researched to document the finding without fabricating an undergraduate rule.',
  },
  /* Batch expand-08 (2026-08-24): hcmcons, hcmufa, hcmupes, hnmu, hluv, hdiu. */
  hcmcons: {
    sourceId: 'hcmcons-admission-2026',
    title: 'Thông báo Tuyển sinh Đại học chính quy và Hệ vừa làm vừa học ngành Sư phạm âm nhạc - Nhạc viện TP.HCM',
    url: 'https://hcmcons.vn/tin-tuc/thong-bao-tuyen-sinh-dai-hoc-chinh-quy-va-he-vua-lam-vua-hoc-nganh-su-pham-am-nhac-nhac-vien-tp-ho-chi-minh-552.html',
    publishedAt: '2026-04-13',
    checkedAt: '2026-08-24',
    note:
      'Official 2026 HCMCONS (hcmcons.vn) undergraduate admission notice confirmed to exist, with registration window 13/04/2026-16/05/2026 and exam dates 04-05/06/2026. All method/threshold/subject-exam detail is embedded in numbered announcement images (1-7), not readable text. Left at researched; do not fabricate aptitude-exam thresholds from an unreadable image set.',
  },
  hcmufa: {
    sourceId: 'hcmufa-admission-2026',
    title: 'Thông tin tuyển sinh đại học năm 2026 - Trường Đại học Mỹ thuật TP.HCM',
    url: 'https://hcmufa.edu.vn/news_detail/id/620',
    checkedAt: '2026-08-24',
    note:
      'Official HCMUFA (hcmufa.edu.vn) 2026 notice confirms a combined aptitude-exam admission method (vẽ, bố cục, điêu khắc with 2x weighting on some subjects, plus a Ngữ văn condition-check) with a flat 5/10 minimum per exam subject, registered via reg.finearts.vn (30/03-29/05/2026). The aptitude subjects (vẽ, bố cục, điêu khắc) are not modeled fields in the shared ApplicantProfile/subject schema, and Ngữ văn is condition-only (không cộng điểm rõ ràng) rather than summed into a standard 30-point total, so an eligibility module would require new non-standard profile fields UniScoreVN does not have yet. Left at researched to avoid guessing the scoring/weighting mechanics.',
  },
  hnmu: {
    sourceId: 'hnmu-admission-2026',
    title: 'Tuyển sinh - Trường Đại học Thủ đô Hà Nội',
    url: 'https://hnmu.edu.vn/tuyen-sinh',
    checkedAt: '2026-08-24',
    note:
      'Superseded (2026-08-30 batch): verified-calculator upgrade shipped. Batch 2026-08-24 found hnmu.edu.vn/tuyen-sinh exposed no readable threshold text and left this researched-only. This batch could still not locate a primary PDF/page, but found the threshold verbatim, quoted identically, in TWO independent official-citing press outlets fetched directly via curl (HTTP 200 both): giadinh.suckhoedoisong.vn (13/07/2026) and vietnamnet.vn — same cross-checked-not-verified bar already accepted for schools/hmu. Quoted text: ngưỡng đảm bảo chất lượng đầu vào theo kết quả thi TN THPT 2026, thí sinh khu vực 3, tổng thô 3 môn/bài thi thang 30 không nhân hệ số, không tính điểm cộng: chương trình đào tạo giáo viên 20 điểm (riêng Giáo dục Thể chất 19 điểm cho tổ hợp 3 môn văn hóa); chương trình pháp luật 20 điểm (kèm điều kiện phụ Toán hoặc Văn >=6, not modeled); các ngành/chương trình khác 16 điểm. No priority points added when comparing to threshold (KV3-baseline wording near-identical to schools/hmu — followed the same no-priority-display precedent rather than inventing a judgment call). See normalized/runtime-source-snapshot/hnmu/sources.ts. This entry is unused because hnmu is now in explicitRuntimeSchoolIds; kept only as a research trail.',
  },
  hluv: {
    sourceId: 'hluv-admission-2026',
    title: 'Thông tin tuyển sinh đại học chính quy năm 2026 - Trường Đại học Hoa Lư',
    url: 'http://hluv.edu.vn/vi/tuyen-sinh/thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2026/62429',
    checkedAt: '2026-08-24',
    note:
      'Official HLUV (hluv.edu.vn) 2026 admission page confirmed to exist, with a companion "Quy chế tuyển sinh năm 2026" page and 4 named methods (100/200/301 direct-admission, etc.). Secondary press (vietjack/tuyensinh247) reports a flat 15/30 floor for non-pedagogy programs, but the primary hluv.edu.vn pages were not fetchable as clean structured text in this round (news-portal template), so the floor and its program scope were not independently confirmed from the official source. Left at researched pending a direct successful fetch.',
  },
  hdiu: {
    sourceId: 'hdiu-admission-2026',
    title: 'Tuyển sinh 2026 - Trường Đại học Đông Đô',
    url: 'https://tuyensinh.hdiu.edu.vn/',
    publishedAt: '2026-06-01',
    checkedAt: '2026-08-24',
    note:
      'Official HDIU (tuyensinh.hdiu.edu.vn) 2026 admission portal confirms 4 methods (THPT exam floor 15/30, academic-transcript floor 16.5/30, competency-assessment floor 15/30, direct admission), open for applications 01/06-31/08/2026. Secondary press (vietnamnet) reports the THPT floor varies by program group (healthcare 16.5/30, Pharmacy 20.0/30) which conflicts with the primary source describing a single flat 15/30 THPT floor with "no score difference between subject combinations" — the two sources disagree on whether program-specific floors exist. Left at researched per the conflicting-sources rule; do not guess which floor set is authoritative.',
  },
  hupes: {
    sourceId: 'hupes-admission-2026',
    title: 'Trường Đại học Sư phạm Thể dục Thể thao Hà Nội - Cổng tuyển sinh 2026',
    url: 'https://tuyensinhdaihoc.hupes.edu.vn/',
    checkedAt: '2026-08-24',
    note:
      'Batch 11 (2026-08-24): official tuyensinhdaihoc.hupes.edu.vn portal fetched directly, confirming 4 admission methods (direct admission for elite athletes; priority admission for national-tournament medalists; THPT exam + năng khiếu talent test; học bạ + năng khiếu talent test) and two subject combinations (T11: Toán + Năng khiếu 1 + Năng khiếu 2; T12: Ngữ văn + Năng khiếu 1 + Năng khiếu 2), plus non-numeric conditions (lớp-12 hạnh kiểm "khá trở lên" for Sư phạm majors, height minimums for GDTC/GDQPAN). No numeric THPT/học bạ floor score was stated in extractable text, and the năng khiếu talent-test score has no matching applicant-profile field. Left at researched; do not fabricate a floor score or model the talent-test component.',
  },
  huc: {
    sourceId: 'huc-admission-2026',
    title: 'Trường Đại học Văn hóa Hà Nội - Thông tin tuyển sinh đại học chính quy năm 2026',
    url: 'https://huc.edu.vn/a/269351/THONG-TIN-TUYEN-SINH-DAI-HOC-CHINH-QUY-NAM-2026',
    checkedAt: '2026-08-24',
    note:
      'Batch 11 (2026-08-24): official huc.edu.vn domain confirmed live with a 2026 admission-info article and a separate 10/07/2026 "điểm sàn" notice, but WebFetch only returned the page title, not body text, so no numeric threshold could be confirmed from the primary source. A search-engine summary claimed a 17/30 floor for health-related majors (Điều dưỡng, Y tế dự phòng, etc.), but HUC is a văn hóa/nghệ thuật school with no such majors in its catalog entry, so that figure looks like cross-contamination from an unrelated school and was not trusted. Left at researched; do not fabricate numbers.',
  },
  kinhbac: {
    sourceId: 'kinhbac-admission-2026',
    title: 'Trường Đại học Kinh Bắc - Cổng thông tin',
    url: 'https://daihockinhbac.edu.vn/',
    checkedAt: '2026-08-24',
    note:
      'Batch 11 (2026-08-24): official daihockinhbac.edu.vn domain confirmed live, but the homepage only surfaces 2024 admission notices and thresholds ("Ngưỡng đảm bảo đầu vào - Điểm trúng tuyển năm 2024"); no 2026 admission plan or threshold notice was located in this research pass. Left at researched pending a located 2026 notice; do not reuse the 2024 figures as 2026 data.',
  },
  hunre: {
    sourceId: 'hunre-admission-2026',
    title: 'Trường Đại học Tài nguyên và Môi trường Hà Nội - Thông báo nguồn xét tuyển, ngưỡng đảm bảo chất lượng đầu vào và quy tắc quy đổi tương đương các phương thức tuyển sinh đại học chính quy năm 2026',
    url: 'https://hunre.edu.vn/thong-bao-nguon-xet-tuyen-dau-vao-nguong-dam-bao-chat-luong-dau-vao-va-quy-tac-quy-doi-tuong-duong-cac-phuong-thuc-tuyen-sinh-dai-hoc-chinh-quy-nam-2026.html',
    publishedAt: '2026-07-03',
    checkedAt: '2026-08-24',
    note:
      'Batch 11 (2026-08-24): official hunre.edu.vn notice confirmed live (published 03/07/2026) with an attached document titled "Điểm ngưỡng và quy đổi TĐ giữa các PTTS năm 2026", but the per-major/per-method threshold table is delivered as 9 embedded images plus an attached PDF, not text-extractable via WebFetch in this pass. Left at researched; do not fabricate the per-major table.',
  },
  logacademy: {
    sourceId: 'logacademy-admission-2026',
    title: 'Học viện Hậu cần - Một số thông tin tuyển sinh trình độ đại học quân sự và dân sự năm 2026',
    url: 'https://hocvienhaucan.edu.vn/bai-viet/mot-so-thong-tin-tuyen-sinh-trinh-do-dai-hoc-quan-su-va-dan-su-nam-2026',
    checkedAt: '2026-08-24',
    note:
      'Batch expand-10 (2026-08-24): official hocvienhaucan.edu.vn page confirms 4 admission methods (direct/priority, ĐGNL VNU Hà Nội/HCM, THPT exam, Bộ Quốc phòng ĐGNL) for both military and civilian tracks, plus civilian-track program quotas (Tài chính-Ngân hàng, Kế toán, Kỹ thuật xây dựng). Military track requires Ministry of Defense sơ tuyển (age/health/political vetting) with no matching applicant-profile field; the page does not state an explicit 2026 numeric threshold for either track (references separate ngưỡng đảm bảo chất lượng and conversion-table announcements not fetched in this pass). Left at researched; do not fabricate thresholds or model military-only screening as a generic eligibility rule.',
  },
  ltvuni: {
    sourceId: 'ltvuni-admission-2026',
    title: 'Trường Đại học Lương Thế Vinh - Thông báo ngưỡng đảm bảo chất lượng và bảng quy đổi điểm tương đương năm 2026',
    url: 'https://ltvu.edu.vn/',
    checkedAt: '2026-08-24',
    note:
      "Superseded (2026-08-25 batch): eligibility-only upgrade shipped for all 11/11 majors. Downloaded and read the linked PDF directly (Thông báo 269/TB-ĐHLTV, 09/07/2026) — a real text-layer PDF. Full per-major table: Y học cổ truyền 20/30, Kỹ thuật phục hồi chức năng 18/30, 9 remaining majors 15/30. No subject-combination table published (knowledge gap). Threshold already includes priority points; runtime only sums raw score. Note: document letterhead says 'Ninh Bình' not 'Nam Định' (catalog location) — unresolved discrepancy, does not affect eligibility logic. See normalized/runtime-source-snapshot/ltvuni/sources.ts. This entry is unused because ltvuni is now in explicitRuntimeSchoolIds; kept only as a research trail.",
  },
  mdu: {
    sourceId: 'mdu-admission-2026',
    title: 'Trường Đại học Công nghệ Miền Đông (MIT) - Công bố các phương thức xét tuyển năm 2026',
    url: 'https://mit.vn/cong-bo-cac-phuong-thuc-xet-tuyen-nam-2026/',
    checkedAt: '2026-08-24',
    note:
      'Batch expand-10 (2026-08-24): catalog id mdu ("Trường Đại học Miền Đông", Đồng Nai) is the former name of this school; it was renamed Trường Đại học Công nghệ Miền Đông (MIT/MUT) around 2021 and mdu.edu.vn no longer resolves as a distinct admissions portal. Current official domain mit.vn is confirmed via multiple independent secondary sources (search-result snippets citing a >=15.0/30 THPT-exam floor for most majors, >=18 for Luật), but direct WebFetch of mit.vn admission pages returned HTTP 403 (WAF) in this pass, so the numeric floor could not be independently verified from the primary source. Left at researched; do not model the unverified threshold.',
  },
  mpa: {
    sourceId: 'mpa-admission-2026',
    title: 'Trường Đại học Chính trị (trước đây là Học viện Chính trị, Bộ Quốc phòng) - Hướng dẫn xét tuyển đại học quân sự hệ chính quy năm 2026',
    url: 'http://daihocchinhtri.edu.vn/vi/tuyen-sinh-dao-tao/Thong-tin-tuyen-sinh/HUONG-DAN-Cong-tac-xet-tuyen-vao-dao-tao-dai-hoc-quan-su-he-chinh-quy-tai-Truong-Dai-hoc-Chinh-tri-nam-2026-192/',
    checkedAt: '2026-08-24',
    note:
      'Batch expand-10 (2026-08-24): catalog id mpa ("Học viện Chính trị Quân đội Nhân dân Việt Nam") is now Trường Đại học Chính trị (renamed institution), official domain daihocchinhtri.edu.vn, confirmed via search results including a 2026 admission-guidance page and a separate 2026 cutoff-announcement page on the same domain. This school only admits a military track requiring Ministry of Defense sơ tuyển (age/health/political vetting, Feb 10 - Apr 15 2026) with no matching applicant-profile field; do not model as generic eligibility. Left at researched.',
  },
  msa: {
    sourceId: 'msa-admission-2026',
    title: 'Học viện Khoa học Quân sự - Thông báo tuyển sinh đào tạo hệ quân sự và dân sự trình độ đại học năm 2026',
    url: 'https://hvkhqs.edu.vn/thong-bao-tuyen-sinh-dao-tao-he-quan-su-va-dan-su-trinh-do-dai-hoc-nam-2026-tai-hoc-vien-khoa-hoc-quan-su/',
    checkedAt: '2026-08-24',
    note:
      'Batch expand-10 (2026-08-24): official hvkhqs.edu.vn page fetched successfully and confirms 4 admission methods (direct/priority, ĐGNL VNU Hà Nội/HCM, THPT exam, Bộ Quốc phòng ĐGNL for military track only). Civilian track (hệ dân sự) explicitly needs no Ministry sơ tuyển and follows standard MOET registration (Jul 2-14 2026), closer to a normal civilian admission than other military schools, but the page only references 2025 scores and states 2026 thresholds are pending post-exam publication -- no 2026 numeric floor available yet. Left at researched; revisit once the academy publishes its 2026 threshold.',
  },
  mta: {
    sourceId: 'mta-admission-2026',
    title: 'Học viện Kỹ thuật Quân sự (MTA) - official site',
    url: 'http://mta.edu.vn/',
    checkedAt: '2026-08-24',
    note:
      'Batch expand-10 (2026-08-24): official domain mta.edu.vn confirmed via search (236 Hoàng Quốc Việt, Bắc Từ Liêm, Hà Nội) but not directly fetched in this pass. Secondary press (vnexpress, vietnamnet, qdnd) reports already-published 2026 civilian-track (hệ dân sự) cutoff results of 21.75-26.96/30 across majors and a 720 civilian quota, plus a military track requiring Ministry of Defense sơ tuyển. These are final cutoff results, not a checkable input eligibility rule, and the military track has no matching applicant-profile field. Left at researched; do not model published cutoffs as a formula.',
  },
  naem: {
    sourceId: 'naem-admission-2026',
    title: 'Học viện Quản lý giáo dục (NAEM) - Điểm trúng tuyển đại học chính quy năm 2026',
    url: 'https://naem.edu.vn/vi/tin-tuc/diem-trung-tuyen-dai-hoc-chinh-quy-nam-2026-vao-hoc-vien-quan-ly-giao-duc',
    checkedAt: '2026-08-24',
    note:
      "Batch expand-10 (2026-08-24): official naem.edu.vn page fetched successfully and confirms 2026 admission cutoff results were published 2026-08-09 as a linked PDF (not extracted in this pass) and 4 methods (THPT exam, học bạ transcript, tuyển thẳng, ĐGNL/ĐGTD). A separate faculty subdomain (khoaquanly.naem.edu.vn) states a >=15.00/30 THPT-exam-based floor with an M1+M2+M3+ưu tiên+cộng formula, but this is a lower-confidence faculty page rather than the main admissions portal and was not cross-checked against the main site's PDF. Left at researched; do not model the unverified subdomain figure as the school-wide rule.",
  },
  napa: {
    sourceId: 'napa-admission-2026',
    title: 'Học viện Hành chính và Quản trị công (kế thừa Học viện Hành chính Quốc gia / NAPA) - Thông tin tuyển sinh 2026 tại Phân hiệu TP.HCM',
    url: 'https://apaghcm.edu.vn/thong-tin-tuyen-sinh-tai-phan-hieu-hoc-vien-hanh-chinh-va-quan-tri-cong-tai-tp-ho-chi-minh',
    checkedAt: '2026-08-24',
    note:
      'Batch expand-10 (2026-08-24): important identity change -- catalog id napa ("Học viện Hành chính Quốc gia") was merged (Quyết định 214-QĐ/TW, Jan 2025) into Học viện Chính trị Quốc gia Hồ Chí Minh and renamed Học viện Hành chính và Quản trị công; napa.edu.vn no longer resolves (DNS failure confirmed in this pass). Successor domain apaghcm.edu.vn (TP.HCM branch) is reachable and links a 2026 admission-info PDF and a score-calculation tool, but the PDF content itself was not extracted. A secondary aggregator states an unconfirmed >=18.0/30 floor (>=18.00 for Luật/Thanh tra with Toán or Văn >=6.0) not independently verified on the primary site. Left at researched; do not model the unverified threshold, and note the institutional rename for future maintainers.',
  },
  naue: {
    sourceId: 'naue-admission-2026',
    title: 'Trường Đại học Kinh tế Nghệ An - Cổng thông tin tuyển sinh 2026',
    url: 'https://naue.edu.vn/tuyensinh',
    checkedAt: '2026-08-24',
    note:
      'Batch expand-10 (2026-08-24): official naue.edu.vn/tuyensinh page fetched successfully and confirms 3 admission methods (học bạ THPT, kết quả thi THPT, kết hợp) across combinations A00/A01/D01/B00 and programs including CNTT, Kế toán, Kinh tế, Nông nghiệp công nghệ cao, Thú y, Tài chính-Ngân hàng, Fintech. No 2026 numeric minimum score threshold is stated on the fetched page. Left at researched; revisit once the school publishes its 2026 threshold notice.',
  },
  navalacademy: {
    sourceId: 'navalacademy-admission-2026',
    title: 'Điểm chuẩn 2026 Học viện Hải quân (xaydungchinhsach.chinhphu.vn) + ngưỡng đảm bảo chất lượng đầu vào khối trường Quân đội',
    url: 'https://xaydungchinhsach.chinhphu.vn/diem-chuan-2026-hoc-vien-hai-quan-216-thi-sinh-do-den-tu-1-tinh-119260812103240437.htm',
    checkedAt: '2026-08-24',
    publishedAt: '2026-08-12',
    note:
      'Xác nhận qua Cổng thông tin điện tử Chính phủ: Học viện Hải quân tuyển theo 4 phương thức (xét thẳng/ưu tiên, thi TN THPT, ĐGNL ĐHQG HN/TPHCM, ĐGNL Bộ Quốc phòng), ngưỡng sơ tuyển chung 15,00/30 (thi TN THPT). Điểm chuẩn thực tế 2026 đã công bố (24,75 nam miền Bắc, 24,07 nam miền Nam) gate theo GIỚI TÍNH + MIỀN TUYỂN + tiêu chuẩn chính trị/sức khỏe qua sơ tuyển tại địa phương (Bộ Chỉ huy Quân sự tỉnh) — hồ sơ ứng viên hiện không có các trường dữ liệu này nên không mô hình hoá được ngay cả ngưỡng sơ tuyển 15/30 (đạt ngưỡng không đồng nghĩa đủ điều kiện dự tuyển nếu chưa qua sơ tuyển). Do-not-guess-formula: giữ ở researched.',
  },
  nda: {
    sourceId: 'nda-admission-2026',
    title: 'Các trường đại học quân đội năm 2026: Danh sách, chỉ tiêu và phương thức tuyển sinh (Học viện Quốc phòng)',
    url: 'https://huongnghiep.hocmai.vn/cac-truong-dai-hoc-quan-doi-nam-2026-danh-sach-chi-tieu-va-phuong-thuc-tuyen-sinh',
    checkedAt: '2026-08-24',
    note:
      'Học viện Quốc phòng là 1 trong 17 trường Quân đội (10 học viện + 7 trường sĩ quan) tuyển sinh theo Đề án tuyển sinh đại học/cao đẳng quân sự 2023-2030, chung khung 4 phương thức của Bộ Quốc phòng (xét thẳng, thi TN THPT, ĐGNL ĐHQG, ĐGNL Bộ Quốc phòng); mức điểm sơ tuyển tối thiểu 18-22/30 cộng tiêu chuẩn chính trị/sức khỏe/độ tuổi (17-21, hoặc đã qua quân ngũ) qua sơ tuyển địa phương. Không tìm được trang tuyển sinh riêng (không có domain public riêng cho hệ dân sự) và điểm chuẩn/ngưỡng đều gate theo giới tính/miền/đối tượng không có trong hồ sơ ứng viên. Do-not-guess-formula: giữ ở researched.',
  },
  ocp: {
    sourceId: 'ocp-admission-2026',
    title: 'Trường Sĩ quan Chính trị công bố điểm chuẩn 2026, cao nhất gần 25 điểm (xaydungchinhsach.chinhphu.vn)',
    url: 'https://xaydungchinhsach.chinhphu.vn/truong-si-quan-chinh-tri-cong-bo-diem-chuan-2026-cao-nhat-gan-25-diem-119260812162306565.htm',
    checkedAt: '2026-08-24',
    publishedAt: '2026-08-12',
    note:
      'Xác nhận qua Cổng thông tin điện tử Chính phủ: Trường Đại học Sĩ quan Chính trị (Bắc Ninh) công bố điểm chuẩn 2026 theo 4 phương thức (xét thẳng/ưu tiên, thi TN THPT, ĐGNL ĐHQG, ĐGNL Bộ Quốc phòng). Điểm chuẩn thực tế (24,75 nam miền Bắc, 21,50 nam miền Nam) kèm điều kiện phụ (điểm ưu tiên <=0,5, hoặc điểm ĐGNL Bộ Quốc phòng >=78, hoặc điểm Ngữ văn >=6,25) gate theo GIỚI TÍNH + MIỀN TUYỂN + sơ tuyển chính trị/sức khỏe — không có trường dữ liệu tương ứng trong hồ sơ ứng viên. Do-not-guess-formula: giữ ở researched.',
  },
  nuae: {
    sourceId: 'nuae-admission-2026',
    title: 'Trường ĐHSP Nghệ thuật TW công bố điểm sàn xét tuyển đại học chính quy năm 2026',
    url: 'https://spnttw.edu.vn/truong-dhsp-nghe-thuat-tw-cong-bo-diem-san-xet-tuyen-dai-hoc-chinh-quy-nam-2026/',
    checkedAt: '2026-08-24',
    note:
      'Cổng thông tin chính thức NUAE (spnttw.edu.vn) xác nhận có công bố điểm sàn (ngưỡng đảm bảo chất lượng đầu vào) 2026 theo phương thức thi TN THPT, có thay đổi theo ngành, nhưng bảng số liệu cụ thể theo ngành được nhúng dưới dạng hình ảnh (Picture2.png), không trích xuất được bằng văn bản qua WebFetch. Điểm chuẩn thực tế 2026 đã công bố (19,0-24,7/30) là điểm trúng tuyển hồi cứu, không dùng được để mô hình hoá ngưỡng xét tuyển tương lai. Do-not-guess-formula (image-embedded table): giữ ở researched.',
  },
  skda: {
    sourceId: 'skda-admission-2026',
    title: 'Thông báo tuyển sinh đại học chính quy năm 2026 - Trường Đại học Sân khấu - Điện ảnh Hà Nội',
    url: 'https://skda.edu.vn/2026/05/22/thong-bao-tuyen-sinh-dai-hoc-chinh-quy-nam-2026/',
    checkedAt: '2026-08-24',
    note:
      'Batch expand-13 (2026-08-24): trang tuyển sinh chính thức skda.edu.vn tồn tại và xác nhận thông báo 2026 (đăng 22/05/2026), nhưng nội dung điều kiện/công thức chỉ nằm trong các file PDF/ảnh đính kèm (Thong bao tuyen sinh DHCQ 2026.pdf, Phieu 1/2), không trích xuất được thành văn bản. Hai nguồn thứ cấp mâu thuẫn nhau về điều kiện văn hoá (một nói tổng 3 môn thi TN THPT >=15/30, một nói điểm trung bình học bạ >=5,0/10) và không nguồn nào dẫn trực tiếp tới văn bản gốc — theo quy tắc không đoán công thức, giữ ở mức researched thay vì eligibility-only.',
  },
  skdahcm: {
    sourceId: 'skdahcm-admission-2026',
    title: 'Thông báo tuyển sinh đại học chính quy năm 2026 (chính thức) - Trường Đại học Sân khấu - Điện ảnh Thành phố Hồ Chí Minh',
    url: 'https://skdahcm.edu.vn/thong-bao-tuyen-sinh-dai-hoc-chinh-quy-nam-2026/',
    checkedAt: '2026-08-24',
    note:
      'Batch expand-13 (2026-08-24): trang tuyển sinh chính thức skdahcm.edu.vn xác nhận tồn tại thông báo 2026 (thi năng khiếu hệ số 2 kết hợp điểm học bạ môn Ngữ văn), nhưng WebFetch chỉ lấy được khung điều hướng, không lấy được bảng điều kiện/ngưỡng cụ thể (nội dung nằm trong tài liệu đính kèm qua Google Drive). Không tìm được số liệu ngưỡng đầu vào có thể kiểm chứng độc lập; giữ ở mức researched.',
  },
  tbu: {
    sourceId: 'tbu-admission-2026',
    title: 'Thông báo Thông tin tuyển sinh đại học chính quy năm 2026 - Trường Đại học Thái Bình',
    url: 'https://tbu.edu.vn/thong-bao-thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2026.html',
    checkedAt: '2026-08-24',
    note:
      'Superseded (2026-08-25 batch): eligibility-only upgrade shipped. A DIFFERENT official page (tbu.edu.vn "ngưỡng đảm bảo chất lượng đầu vào, điểm trúng tuyển và quy đổi tương đương", 08/07/2026 — not the 565.pdf notice referenced in the prior note) was re-verified directly via WebFetch and states the entrance floor in plain readable text: "Luật: từ 18 điểm trở lên" / "Các ngành còn lại: từ 15 điểm trở lên" (thi TN THPT). This is explicitly the ngưỡng nhận hồ sơ, distinct from the final "điểm trúng tuyển = A+B+C" formula whose A/B/C breakdown is NOT explained on the page — left as a knowledge gap. See normalized/runtime-source-snapshot/tbu/sources.ts. This entry is unused because tbu is now in explicitRuntimeSchoolIds; kept only as a research trail.',
  },
  uad: {
    sourceId: 'uad-admission-2026',
    title: 'Trường Đại học Mỹ thuật Công nghiệp (UAD/MTCN) — thông tin tuyển sinh năm 2026',
    url: 'https://vietjack.com/thong-tin-tuyen-sinh/truong-dai-hoc-my-thuat-cong-nghiep.jsp',
    checkedAt: '2026-08-24',
    note:
      'Batch expand-15 (2026-08-24): UAD tuyển sinh bằng DUY NHẤT 1 phương thức (kết hợp học bạ THPT với điểm thi năng khiếu bắt buộc: Bố cục màu + Hình họa, điểm năng khiếu tối thiểu 5.0/10). ApplicantProfile của UniscoreVN KHÔNG có field điểm năng khiếu (đã kiểm tra core/applicantProfile.ts và các trường talent-test khác như VLU đều để ngoài phạm vi mô hình hoá), nên không thể tính eligibility mà không tự bịa input. WebFetch trực tiếp tới uad.edu.vn/mythuatcongnghiep.edu.vn không lấy được nội dung chi tiết; số liệu trên dựa vào trang tổng hợp vietjack đã index. Để nguyên researched.',
  },
  upes1: {
    sourceId: 'upes1-admission-2026',
    title: 'Trường Đại học Thể dục Thể thao Bắc Ninh — ngưỡng đảm bảo chất lượng đầu vào đại học chính quy năm 2026',
    url: 'https://tuyensinh.upes.edu.vn/2026/07/13/nguong-dam-bao-chat-luong-dau-vao-dai-hoc-chinh-quy-nam-2026/',
    publishedAt: '2026-07-13',
    checkedAt: '2026-08-24',
    note:
      'Batch expand-15 (2026-08-24): official tuyensinh.upes.edu.vn portal confirms 2 admission methods (both requiring a mandatory năng khiếu/talent test, minimum 5.0/10, weighted x2 in the combined score) plus a combined cultural+talent threshold around 15.00/30 for some majors. ApplicantProfile has no talent-test score field (confirmed same gap as UAD/VLU), so eligibility cannot be evaluated without fabricating an input. Left at researched.',
  },
  usth: {
    sourceId: 'usth-admission-2026',
    title: 'USTH (Trường Đại học Khoa học và Công nghệ Hà Nội) — thông báo tuyển sinh trình độ đại học năm 2026',
    url: 'https://tuyensinh.usth.edu.vn/usth-thong-bao-tuyen-sinh-trinh-do-dai-hoc-nam-2026-3717/',
    checkedAt: '2026-08-24',
    note:
      'Batch expand-15 (2026-08-24): official tuyensinh.usth.edu.vn page confirms 4 admission methods (PT1 in-house aptitude test, PT2 academic-record + interview, PT3 talent admission, PT4 THPT exam result), but PT4 has NO published numeric floor score — it defers to "kế hoạch tuyển sinh của Bộ GDĐT" (competitive/ministry-set selection), except Pharmacy (health-group MOET threshold) and Semiconductor Engineering (Quyết định 1314/QĐ-BGDĐT threshold), neither of which has a stated number in this pass. No fixed threshold to model without fabricating a number; left at researched.',
  },
  ulsa: {
    sourceId: 'ulsa-admission-2026',
    title: 'Trường Đại học Lao động - Xã hội — công bố phương thức, chỉ tiêu tuyển sinh năm 2026',
    url: 'https://ldxh.edu.vn/truong-dai-hoc-lao-dong-xa-hoi-cong-bo-phuong-thuc-chi-tieu-tuyen-sinh-nam-2026.html',
    checkedAt: '2026-08-24',
    note:
      'Batch expand-15 (2026-08-24): official ldxh.edu.vn 2026 admission page was fetched directly and confirms 5 admission methods and per-method quotas, but does NOT state numeric floor scores in the fetched content. Secondary aggregators (thi.tuyensinh247.com, khoahoc.vietjack.com) report a 15/30 general baseline with 2 program-code exceptions (7220201 needs English >=5; 7380107/law needs "Khá" academic rank, unmodeled field), but this single-source secondary figure could not be cross-checked against the primary page in this pass. Left at researched; do not fabricate the exact number.',
  },
  // Batch expand-16 (2026-08-24):
  vnam: {
    sourceId: 'vnam-admission-2026',
    title: 'Học viện Âm nhạc Quốc gia Việt Nam thông báo phương án tuyển sinh đại học chính quy năm 2026',
    url: 'https://www.vnam.edu.vn/index.aspx?lang=VN',
    checkedAt: '2026-08-24',
    note:
      'Xác nhận qua tìm kiếm 2 phương thức 2026: (1) xét tuyển thẳng theo đúng chuyên ngành đã tốt nghiệp trung cấp/cao đẳng âm nhạc, (2) xét kết hợp môn Ngữ văn (học bạ hoặc điểm thi TN THPT) với thi các môn năng khiếu chuyên ngành (kiến thức âm nhạc tổng hợp, Piano phổ thông là môn điều kiện một số ngành), chấm bởi hội đồng giám khảo — không có công thức điểm số công khai dạng số có thể mô hình hoá. Khoảng 200 chỉ tiêu, nhận hồ sơ 13/4-16/5/2026. Chưa fetch trực tiếp được trang thông báo chi tiết (chỉ trang chủ vnam.edu.vn); không đủ cấu trúc số liệu để nâng lên eligibility-only.',
  },
  vnad: {
    sourceId: 'vnad-admission-2026',
    title: 'Thông báo tuyển sinh trình độ đại học năm 2026 — Học viện Múa Việt Nam',
    url: 'https://www.vnad.edu.vn/tuy%E1%BB%83n-sinh/%C4%91%E1%BA%A1i-h%E1%BB%8Dc/t%C4%912026/t%C4%912026',
    checkedAt: '2026-08-24',
    note:
      'Trang thông báo tuyển sinh đại học 2026 chính thức tồn tại trên vnad.edu.vn (xác nhận qua tìm kiếm), mô tả 2 vòng thi năng khiếu (sơ tuyển: độ mềm dẻo/dẻo dai cơ thể, cảm âm/tiết tấu; chung tuyển: 2 môn năng khiếu múa và âm nhạc) kết hợp xét học bạ, chấm điểm bởi giám khảo — không công bố thang điểm/ngưỡng số cụ thể để mô hình hoá. Không fetch trực tiếp được nội dung đầy đủ trang thông báo trong lượt research này; để ở researched, tránh suy diễn ngưỡng.',
  },
  vnufa: {
    sourceId: 'vnufa-admission-2026',
    title: 'Tuyển sinh 2026 — Trường Đại học Mỹ thuật Việt Nam',
    url: 'https://mythuatvietnam.edu.vn/tuyen-sinh-2026/',
    checkedAt: '2026-08-24',
    note:
      'Cổng tuyển sinh chính thức (mythuatvietnam.edu.vn) fetch được nhưng chỉ là trang danh sách thông báo/liên kết, không có nội dung ngưỡng điểm chi tiết trong lần fetch này. Các nguồn tổng hợp bên thứ ba (vietjack, tuyensinh247) báo cáo ngưỡng 16,5/30 THPT (hoặc học lực lớp 12 xếp loại giỏi + học bạ tương đương 6,5) và năng khiếu >=6,5, nhưng KHÔNG xác minh được trực tiếp từ trang chính thức trong lượt này — theo nguyên tắc do-not-guess-formula, không nhập số liệu chưa xác minh trực tiếp; cần fetch lại thông báo tuyển sinh gốc (PDF/trang con) trước khi nâng lên eligibility-only.',
  },
  vhs: {
    sourceId: 'vhs-admission-2026',
    title: 'Tuyển sinh — Trường Đại học Văn hóa TP.HCM',
    url: 'https://www.hcmuc.edu.vn/tuyen-sinh/',
    checkedAt: '2026-08-24',
    note:
      'Cổng tuyển sinh chính thức (hcmuc.edu.vn) xác nhận qua tìm kiếm: 1.300 chỉ tiêu, 3 phương thức (điểm thi TN THPT, học bạ THPT, kết hợp thi năng khiếu cho chuyên ngành Tổ chức - dàn dựng chương trình văn hóa nghệ thuật), tổ hợp môn đa dạng theo ngành (Ngữ văn, Lịch sử, Địa lý, Toán, tiếng Anh, tiếng Trung, Tin học, GDKTPL). Không có ngưỡng điểm sàn công khai dạng số duy nhất áp dụng chung; tổ hợp/ngưỡng thay đổi theo từng ngành nên chưa đủ cấu trúc để mô hình hoá trong batch này.',
  },
  vmmu: {
    sourceId: 'vmmu-admission-2026',
    title: 'Tuyển sinh Học viện Quân y 2026 — Chi tiết 4 phương thức xét tuyển và điều kiện sức khỏe đặc thù',
    url: 'https://vmmu.edu.vn/',
    checkedAt: '2026-08-24',
    note:
      'Học viện Quân y (Bộ Quốc phòng, tên dân sự Trường Đại học Y Dược Lê Hữu Trác) có sơ tuyển bắt buộc (tuổi, chiều cao/cân nặng, thị lực, lý lịch chính trị theo tiêu chuẩn quân đội) là điều kiện tiên quyết trước khi được xét theo 4 phương thức (tuyển thẳng, ưu tiên nữ hệ quân đội, ĐGNL ĐHQGHN/ĐHQG TPHCM, thi TN THPT/ĐGNL do Bộ Quốc phòng tổ chức). Điểm chuẩn 2026 công bố theo giới tính/miền/chỉ tiêu quân sự (27,75-29,76/30 ngành Y khoa), không phải điểm sàn chung. `ApplicantProfile` hiện không có trường tuổi/chiều cao/cân nặng/thị lực nên không mô hình hoá được điều kiện sơ tuyển; để ở researched.',
  },
  vmuvinh: {
    sourceId: 'vmuvinh-admission-2026',
    title: 'VMU - Đại học Y Khoa Vinh > Tuyển sinh - Đào tạo > Đại học chính quy > Tuyển sinh',
    url: 'https://www.vmu.edu.vn/tuyen-sinh-dao-tao/dai-hoc-chinh-quy/tuyen-sinh',
    checkedAt: '2026-08-24',
    note:
      'Cổng tuyển sinh chính thức (vmu.edu.vn) xác nhận qua tìm kiếm: 1.060 chỉ tiêu, 4 phương thức (mã 301 tuyển thẳng, 100 thi TN THPT, 200 học bạ THPT, 500 khác). Trường công bố "ngưỡng đảm bảo chất lượng đầu vào" và bảng quy đổi tương đương học bạ/THPT trước 17h00 10/7/2026, nhưng số liệu ngưỡng cụ thể theo ngành (5 ngành: Y khoa, Dược, Y học dự phòng, Điều dưỡng, Kỹ thuật xét nghiệm y học) không trích xuất được có cấu trúc trong lượt research này. Để ở researched, không suy diễn số liệu.',
  },
  vnusis: {
    sourceId: 'vnusis-admission-2026',
    title: 'VNU-SIS (Truong Khoa hoc lien nganh va Nghe thuat, DHQGHN) tuyen sinh dai hoc chinh quy nam 2026',
    url: 'https://sis.vnu.edu.vn/chi-tiet-tin/Tuyen-sinh-dai-hoc-chinh-quy-nam-2026-Phuong-thuc-xet-tuyen-chuong-trinh-dao-tao-chi-tieu-va-to-hop-xet-tuyen-du-kien_1154.html',
    checkedAt: '2026-08-25',
    note:
      'Official 2026 page (fetched directly, text-readable) lists 5 methods (100/301/401/405/409), 1200 chi tieu across 12 programs, and an unusual weighted-subject scoring scheme (subjects ranked 1-7 in the combination weighted x2, subjects 8-12 weighted x1), but does not state an explicit minimum total-score threshold in this pass (a separate "Diem trung tuyen" notice is referenced but not fetched). The non-standard weighting scheme and missing floor make eligibility modeling unsafe without further extraction. Left at researched.',
  },
  vwa: {
    sourceId: 'vwa-admission-2026',
    title: 'Hoc vien Phu nu Viet Nam cong bo nguong diem xet tuyen dai hoc nam 2026',
    url: 'https://tuyensinh.hvpnvn.edu.vn/thong-bao/tuyen-sinh-dai-hoc/hoc-vien-phu-nu-viet-nam-cong-bo-nguong-diem-xet-tuyen-dai-hoc-nam-2026-phu-hop-pho-diem-mo-rong-co-hoi-cho-thi-sinh/',
    checkedAt: '2026-08-25',
    note:
      'Superseded (2026-08-25 batch): eligibility-only upgrade shipped for THPT-exam and transcript methods, grouped by 3 tiers (multimedia 19/23, business-tourism-psychology-social-media 18/21, remaining majors 16/19 — thang 30), re-verified via Thong bao 96/TB-HVPNVN (07/07/2026). Program-to-tier/subject-combination mapping and Luat/Kinh te Luat (deferred to MOET guidance per source) remain knowledge gaps; HSA/SPT aptitude-test methods not modeled (different scale). See normalized/runtime-source-snapshot/vwa/sources.ts. This entry is unused because vwa is now in explicitRuntimeSchoolIds; kept only as a research trail.',
  },
  vya: {
    sourceId: 'vya-admission-2026',
    title: 'Hoc vien Thanh thieu nien Viet Nam thong bao tuyen sinh 2026',
    url: 'https://tuyensinh.vya.edu.vn/thong-bao-tuyen-sinh-2026-vya',
    checkedAt: '2026-08-25',
    note:
      'Official 2026 notice confirms 4 methods (truc tiep, hoc ba, thi TN THPT, ket hop) and a 30-point THPT total-score formula, but the numeric floor scores found (Luat 20/30 THPT, 21/30 hoc ba; Xay dung Dang & Chinh quyen Nha nuoc + Cong tac Thanh thieu nien 16/30 and 19/30) were published by the Phan hieu TP.HCM branch specifically (giaoduc.net.vn), not confirmed for the main Ha Noi campus catalogued here. Applying branch-specific floors to the main-campus schoolId risks inaccuracy. Left at researched pending a main-campus-specific threshold notice.',
  },
  vttu: {
    sourceId: 'vttu-admission-2026',
    title: 'Truong Dai hoc Vo Truong Toan tuyen sinh trinh do dai hoc he chinh quy nam 2026',
    url: 'https://vttu.edu.vn/truong-dai-hoc-vo-truong-toan-tuyen-sinh-trinh-do-dai-hoc-he-chinh-quy-nam-2026/',
    checkedAt: '2026-08-25',
    note:
      'Official 2026 page confirms 5 methods (100 thi TN THPT, 200 hoc ba, 407 ket hop thi+hoc ba for Y khoa/Rang Ham Mat/Duoc hoc/Luat, DGNL, THPT nuoc ngoai) and the general formula (3-subject total + regional/subject priority points), but only a partial subject-combination list surfaced (A00 for Quan tri kinh doanh/Tai chinh-Ngan hang/Ke toan); the full per-major combination table and numeric floor scores were not extractable in this pass. Left at researched; do not fabricate the remaining combos or thresholds.',
  },
  ydlu: {
    sourceId: 'ydlu-admission-2026',
    title: 'YersinUni cong bo thong tin tuyen sinh nam 2026',
    url: 'https://yersin.edu.vn/thong-tin-tuyen-sinh-2026/',
    checkedAt: '2026-08-25',
    note:
      'Official 2026 page publishes 2 hoc-ba (transcript-average) formulas with published per-major floors (18.0 general; 19.0 Dieu duong/Luat kinh te; 22.0 Y khoa/Duoc hoc, all on a 30-point scale derived from 3-year subject GPA averages) plus a Toan/Ngu van >= 1/3 total condition, alongside separate THPT-exam and DGNL (ability assessment) methods. The hoc-ba formula requires 3-year (lop 10/11/12) per-subject GPA averages, which is not a field UniscoreVN currently collects in ApplicantProfile.transcript at per-subject granularity across years in a way cross-checked for this school, and the THPT-exam-only floor was not separately confirmed. Modeling would require either fabricating scope or adding unverified transcript-averaging logic; left at researched.',
  },
};

function getResearchedAdmissionSource(schoolId: string): ResearchedAdmissionSource | undefined {
  return researchedAdmissionSources[schoolId];
}

function finalCatalogCapabilitiesFor(schoolId: string): NonNullable<SchoolModule['capabilities']> {
  return getResearchedAdmissionSource(schoolId) ? researchedCatalogCapabilities : catalogOnlyCapabilities;
}

function finalCatalogSummaryFor(school: FinalCatalogSchool): string {
  const source = getResearchedAdmissionSource(school.id);
  if (!source) {
    return 'Đã đưa vào roster 238 theo catalog toàn quốc; cần research nguồn tuyển sinh chính thức trước khi tính điều kiện hoặc điểm.';
  }
  return `Đã xác minh nguồn tuyển sinh chính thức 2026 (${source.title}); chưa nâng lên eligibility/calculator vì còn thiếu ngưỡng/công thức đủ cấu trúc.`;
}

function finalCatalogSourcesFor(schoolId: string): SchoolModule['catalogSources'] | undefined {
  const source = getResearchedAdmissionSource(schoolId);
  if (!source) return undefined;
  return [{ title: source.title, url: source.url, type: 'official-institution', checkedAt: source.checkedAt }];
}

function finalCatalogEvidenceFor(schoolId: string): RuleEvidence[] {
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

export const finalCatalogSchools: readonly FinalCatalogSchool[] = [
  { id: 'vnusis', shortName: 'VNU-SIS', name: 'Trường Khoa học liên ngành và Nghệ thuật - ĐHQG Hà Nội', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'tnus', shortName: 'TNUS', name: 'Trường Đại học Khoa học - Đại học Thái Nguyên', location: 'Thái Nguyên', ownership: 'public', region: 'other' },
  { id: 'tueba', shortName: 'TUEBA', name: 'Trường Đại học Kinh tế và Quản trị kinh doanh - Đại học Thái Nguyên', location: 'Thái Nguyên', ownership: 'public', region: 'other' },
  { id: 'tnut', shortName: 'TNUT', name: 'Trường Đại học Kỹ thuật Công nghiệp - Đại học Thái Nguyên', location: 'Thái Nguyên', ownership: 'public', region: 'other' },
  { id: 'tuaf', shortName: 'TUAF', name: 'Trường Đại học Nông Lâm - Đại học Thái Nguyên', location: 'Thái Nguyên', ownership: 'public', region: 'other' },
  { id: 'tnue', shortName: 'TNUE', name: 'Trường Đại học Sư phạm - Đại học Thái Nguyên', location: 'Thái Nguyên', ownership: 'public', region: 'other' },
  { id: 'tump', shortName: 'TUMP', name: 'Trường Đại học Y Dược - Đại học Thái Nguyên', location: 'Thái Nguyên', ownership: 'public', region: 'other' },
  { id: 'tnuis', shortName: 'TNU-IS', name: 'Khoa Quốc tế - Đại học Thái Nguyên', location: 'Thái Nguyên', ownership: 'public', region: 'other' },
  { id: 'tnufl', shortName: 'TNUFL', name: 'Trường Ngoại ngữ - Đại học Thái Nguyên', location: 'Thái Nguyên', ownership: 'public', region: 'other' },
  { id: 'soict', shortName: 'SoICT', name: 'Trường Công nghệ Thông tin và Truyền thông - Đại học Bách khoa Hà Nội', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'sms', shortName: 'SMS-HUST', name: 'Trường Vật liệu - Đại học Bách khoa Hà Nội', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'sme', shortName: 'SME-HUST', name: 'Trường Cơ khí - Đại học Bách khoa Hà Nội', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'scls', shortName: 'SCLS', name: 'Trường Hóa và Khoa học sự sống - Đại học Bách khoa Hà Nội', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'seee', shortName: 'SEEE', name: 'Trường Điện - Điện tử - Đại học Bách khoa Hà Nội', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'semhust', shortName: 'SEM-HUST', name: 'Trường Kinh tế - Đại học Bách khoa Hà Nội', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'neucob', shortName: 'NEU-CoB', name: 'Trường Kinh doanh - Đại học Kinh tế Quốc dân', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'ncepa', shortName: 'NCEPA', name: 'Trường Kinh tế và Quản lý công - Đại học Kinh tế Quốc dân', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'nctneu', shortName: 'NCT-NEU', name: 'Trường Công nghệ - Đại học Kinh tế Quốc dân', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'naem', shortName: 'NAEM', name: 'Học viện Quản lý giáo dục', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'uad', shortName: 'UAD', name: 'Trường Đại học Mỹ thuật Công nghiệp', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'nuae', shortName: 'NUAE', name: 'Trường Đại học Sư phạm Nghệ thuật Trung ương', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'hupes', shortName: 'HUPES', name: 'Trường Đại học Sư phạm Thể dục Thể thao Hà Nội', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'hcmupes', shortName: 'HCMUPES', name: 'Trường Đại học Sư phạm Thể dục Thể thao TP.HCM', location: 'TP.HCM', ownership: 'public', region: 'hcm' },
  { id: 'vgu', shortName: 'VGU', name: 'Trường Đại học Việt Đức', location: 'Bình Dương', ownership: 'public', region: 'other' },
  { id: 'hpu2', shortName: 'HPU2', name: 'Trường Đại học Sư phạm Hà Nội 2', location: 'Phú Thọ', ownership: 'public', region: 'other' },
  { id: 'vnam', shortName: 'VNAM', name: 'Học viện Âm nhạc Quốc gia Việt Nam', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'vnad', shortName: 'VNAD', name: 'Học viện Múa Việt Nam', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'huc', shortName: 'HUC', name: 'Trường Đại học Văn hóa Hà Nội', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'vnufa', shortName: 'VNUFA', name: 'Trường Đại học Mỹ thuật Việt Nam', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'skda', shortName: 'SKDA', name: 'Trường Đại học Sân khấu - Điện ảnh Hà Nội', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'hcmcons', shortName: 'HCMCONS', name: 'Nhạc viện Thành phố Hồ Chí Minh', location: 'TP.HCM', ownership: 'public', region: 'hcm' },
  { id: 'skdahcm', shortName: 'SKDAHCM', name: 'Trường Đại học Sân khấu - Điện ảnh TP.HCM', location: 'TP.HCM', ownership: 'public', region: 'hcm' },
  { id: 'hcmufa', shortName: 'HCMUFA', name: 'Trường Đại học Mỹ thuật TP.HCM', location: 'TP.HCM', ownership: 'public', region: 'hcm' },
  { id: 'ush', shortName: 'USH', name: 'Trường Đại học Thể dục Thể thao TP.HCM', location: 'TP.HCM', ownership: 'public', region: 'hcm' },
  { id: 'vhs', shortName: 'VHS', name: 'Trường Đại học Văn hóa TP.HCM', location: 'TP.HCM', ownership: 'public', region: 'hcm' },
  { id: 'ham', shortName: 'HAM', name: 'Học viện Âm nhạc Huế', location: 'Huế', ownership: 'public', region: 'other' },
  { id: 'upes1', shortName: 'UPES1', name: 'Trường Đại học Thể dục Thể thao Bắc Ninh', location: 'Bắc Ninh', ownership: 'public', region: 'other' },
  { id: 'dsu', shortName: 'DSU', name: 'Trường Đại học Thể dục Thể thao Đà Nẵng', location: 'Đà Nẵng', ownership: 'public', region: 'other' },
  { id: 'utt', shortName: 'UTT', name: 'Trường Đại học Công nghệ Giao thông vận tải', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'hau', shortName: 'HAU', name: 'Trường Đại học Kiến trúc Hà Nội', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'hnmu', shortName: 'HNMU', name: 'Trường Đại học Thủ đô Hà Nội', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'hca', shortName: 'HCA', name: 'Học viện Cán bộ Thành phố Hồ Chí Minh', location: 'TP.HCM', ownership: 'public', region: 'hcm' },
  { id: 'uhd', shortName: 'UHD', name: 'Trường Đại học Hải Dương', location: 'Hải Dương', ownership: 'public', region: 'other' },
  { id: 'naue', shortName: 'NAUE', name: 'Trường Đại học Kinh tế Nghệ An', location: 'Nghệ An', ownership: 'public', region: 'other' },
  { id: 'vmuvinh', shortName: 'VMU-Vinh', name: 'Trường Đại học Y khoa Vinh', location: 'Nghệ An', ownership: 'public', region: 'other' },
  { id: 'hluv', shortName: 'HLUV', name: 'Trường Đại học Hoa Lư', location: 'Ninh Bình', ownership: 'public', region: 'other' },
  { id: 'tbu', shortName: 'TBU', name: 'Trường Đại học Thái Bình', location: 'Thái Bình', ownership: 'public', region: 'other' },
  { id: 'tucst', shortName: 'TUCST', name: 'Trường Đại học Văn hóa, Thể thao và Du lịch Thanh Hóa', location: 'Thanh Hóa', ownership: 'public', region: 'other' },
  { id: 'cmcu', shortName: 'CMCU', name: 'Trường Đại học CMC', location: 'Hà Nội', ownership: 'private', region: 'hanoi' },
  { id: 'utm', shortName: 'UTM', name: 'Trường Đại học Công nghệ và Quản lý hữu nghị', location: 'Hà Nội', ownership: 'private', region: 'hanoi' },
  { id: 'hdiu', shortName: 'HDIU', name: 'Trường Đại học Đông Đô', location: 'Hà Nội', ownership: 'private', region: 'hanoi' },
  { id: 'hbu', shortName: 'HBU', name: 'Trường Đại học Hòa Bình', location: 'Hà Nội', ownership: 'private', region: 'hanoi' },
  { id: 'ntuhn', shortName: 'NTU-HN', name: 'Trường Đại học Nguyễn Trãi', location: 'Hà Nội', ownership: 'private', region: 'hanoi' },
  { id: 'fbu', shortName: 'FBU', name: 'Trường Đại học Tài chính - Ngân hàng Hà Nội', location: 'Hà Nội', ownership: 'private', region: 'hanoi' },
  { id: 'thanhdo', shortName: 'ThanhDo', name: 'Trường Đại học Thành Đô', location: 'Hà Nội', ownership: 'private', region: 'hanoi' },
  { id: 'vinuni', shortName: 'VinUni', name: 'Trường Đại học VinUni', location: 'Hà Nội', ownership: 'private', region: 'hanoi' },
  { id: 'dhv', shortName: 'DHV', name: 'Trường Đại học Hùng Vương TP.HCM', location: 'TP.HCM', ownership: 'private', region: 'hcm' },
  { id: 'umt', shortName: 'UMT', name: 'Trường Đại học Quản lý và Công nghệ TP.HCM', location: 'TP.HCM', ownership: 'private', region: 'hcm' },
  { id: 'bhu', shortName: 'BHU', name: 'Trường Đại học Quốc tế Bắc Hà', location: 'Bắc Ninh', ownership: 'private', region: 'other' },
  { id: 'eaut', shortName: 'EAUT', name: 'Trường Đại học Công nghệ Đông Á', location: 'Hà Nội', ownership: 'private', region: 'hanoi' },
  { id: 'cvauni', shortName: 'CVAUni', name: 'Trường Đại học Chu Văn An', location: 'Hưng Yên', ownership: 'private', region: 'other' },
  { id: 'ltvuni', shortName: 'LTVUni', name: 'Trường Đại học Lương Thế Vinh', location: 'Nam Định', ownership: 'private', region: 'other' },
  { id: 'trungvuong', shortName: 'TVUni', name: 'Trường Đại học Trưng Vương', location: 'Vĩnh Phúc', ownership: 'private', region: 'other' },
  { id: 'kinhbac', shortName: 'KBU', name: 'Trường Đại học Kinh Bắc', location: 'Bắc Ninh', ownership: 'private', region: 'other' },
  { id: 'mdu', shortName: 'MDU', name: 'Trường Đại học Miền Đông', location: 'Đồng Nai', ownership: 'private', region: 'other' },
  { id: 'vttu', shortName: 'VTTU', name: 'Trường Đại học Võ Trường Toản', location: 'Hậu Giang', ownership: 'private', region: 'other' },
  { id: 'eiu', shortName: 'EIU', name: 'Trường Đại học Quốc tế Miền Đông', location: 'Bình Dương', ownership: 'private', region: 'other' },
  { id: 'aiu', shortName: 'AIU', name: 'Trường Đại học Quốc tế Á Châu', location: 'TP.HCM', ownership: 'private', region: 'hcm' },
  { id: 'qtu', shortName: 'QTU', name: 'Trường Đại học Quang Trung', location: 'Bình Định', ownership: 'private', region: 'other' },
  { id: 'tbdu', shortName: 'TBDU', name: 'Trường Đại học Thái Bình Dương', location: 'Khánh Hòa', ownership: 'private', region: 'other' },
  { id: 'pxu', shortName: 'PXU', name: 'Trường Đại học Phú Xuân', location: 'Huế', ownership: 'private', region: 'other' },
  { id: 'fuv', shortName: 'FUV', name: 'Trường Đại học Fulbright Việt Nam', location: 'TP.HCM', ownership: 'private', region: 'hcm' },
  { id: 'rmitvn', shortName: 'RMITVN', name: 'Trường Đại học RMIT Việt Nam', location: 'TP.HCM', ownership: 'private', region: 'hcm' },
  { id: 'buv', shortName: 'BUV', name: 'Trường Đại học Anh Quốc Việt Nam', location: 'Hưng Yên', ownership: 'private', region: 'other' },
  { id: 'apd', shortName: 'APD', name: 'Học viện Chính sách và Phát triển', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'napa', shortName: 'NAPA', name: 'Học viện Hành chính Quốc gia', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'gass', shortName: 'GASS', name: 'Học viện Khoa học xã hội', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'usth', shortName: 'USTH', name: 'Trường Đại học Khoa học và Công nghệ Hà Nội', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'vwa', shortName: 'VWA', name: 'Học viện Phụ nữ Việt Nam', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'vya', shortName: 'VYA', name: 'Học viện Thanh thiếu niên Việt Nam', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'tuu', shortName: 'TUU', name: 'Trường Đại học Công đoàn', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'hunre', shortName: 'HUNRE', name: 'Trường Đại học Tài nguyên và Môi trường Hà Nội', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'ulsa', shortName: 'ULSA', name: 'Trường Đại học Lao động - Xã hội', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'mpa', shortName: 'MPA', name: 'Học viện Chính trị Quân đội Nhân dân Việt Nam', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'logacademy', shortName: 'MAL', name: 'Học viện Hậu cần', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'msa', shortName: 'MSA', name: 'Học viện Khoa học Quân sự', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'actvn', shortName: 'ACTVN', name: 'Học viện Kỹ thuật Mật mã', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'mta', shortName: 'MTA', name: 'Học viện Kỹ thuật Quân sự', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'aadaa', shortName: 'AADAA', name: 'Học viện Phòng không - Không quân', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'vmmu', shortName: 'VMMU', name: 'Học viện Quân y', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'nda', shortName: 'NDA', name: 'Học viện Quốc phòng', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'ocp', shortName: 'OCP', name: 'Trường Đại học Sĩ quan Chính trị', location: 'Bắc Ninh', ownership: 'public', region: 'other' },
  { id: 'tqt', shortName: 'TQT', name: 'Trường Đại học Trần Quốc Tuấn - Sĩ quan Lục quân 1', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'sigo', shortName: 'SIGO', name: 'Trường Đại học Sĩ quan Thông tin liên lạc', location: 'Khánh Hòa', ownership: 'public', region: 'other' },
  { id: 'aoc', shortName: 'AOC', name: 'Trường Đại học Sĩ quan Pháo binh', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'cco', shortName: 'CCO', name: 'Trường Đại học Sĩ quan Phòng hóa', location: 'Bắc Giang', ownership: 'public', region: 'other' },
  { id: 'psa', shortName: 'PSA', name: 'Học viện An ninh Nhân dân', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'ppa', shortName: 'PPA', name: 'Học viện Cảnh sát Nhân dân', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'fpfu', shortName: 'FPFU', name: 'Trường Đại học Phòng cháy chữa cháy', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'psu', shortName: 'PSU-CAND', name: 'Trường Đại học An ninh Nhân dân', location: 'TP.HCM', ownership: 'public', region: 'hcm' },
  { id: 'ppu', shortName: 'PPU-CAND', name: 'Trường Đại học Cảnh sát Nhân dân', location: 'TP.HCM', ownership: 'public', region: 'hcm' },
  { id: 'bga', shortName: 'BGA', name: 'Học viện Biên phòng', location: 'Hà Nội', ownership: 'public', region: 'hanoi' },
  { id: 'navalacademy', shortName: 'VNA-Navy', name: 'Học viện Hải quân', location: 'Khánh Hòa', ownership: 'public', region: 'other' },
];

const finalCatalogInternalUnitIds = new Set([
  'tnuis',
  'soict',
  'sms',
  'sme',
  'scls',
  'seee',
  'semhust',
  'neucob',
  'ncepa',
  'nctneu',
]);

function resolveFinalCatalogEntityLevel(school: FinalCatalogSchool): SchoolModule['entityLevel'] {
  if (finalCatalogInternalUnitIds.has(school.id)) return school.id === 'tnuis' ? 'faculty' : 'school';
  if (school.name.startsWith('Học viện')) return 'academy';
  if (school.name.startsWith('Đại học')) return 'university_system';
  return school.entityLevel ?? 'institution';
}

export const finalCatalogKnowledgeGap = {
  id: 'final-catalog-official-admission-rules',
  label: 'Chưa research đủ nguồn tuyển sinh chính thức 2026 cho trường này.',
  status: 'incomplete' as const,
  impact: 'exact-final-score-blocking' as const,
};

// 'vgu', 'hpu2', 'apd', 'eiu', 'fbu', 'fpfu', 'ntuhn', 'tbdu', 'thanhdo', 'tnue', 'tnufl', 'tnus',
// 'tuaf', 'uhd', 'umt', 'utm', 'utt', 'eaut', 'vwa', and 'hau' moved to dedicated runtime modules
// (normalized/runtime-source-snapshot/<id>/) — eligibility-only, excluded here to avoid duplicate
// methodId/comparisonAdapter entries. (Batch-expand-04: apd. Batch-expand-06: eiu. Batch-expand-07:
// fbu, fpfu. Batch-expand-11: ntuhn. Batch-expand-13: tbdu, thanhdo, tnue, tnufl, tnus.
// Batch-expand-14: tuaf. Batch-expand-15: uhd, umt, utm, utt. Batch-expand-18 (2026-08-25): eaut —
// shipped eligibility-only for method 1 (xét học bạ, ngưỡng 18/30 trung bình 6 học kỳ + điều kiện
// điểm thi TN THPT >=15/30), sourced from eaut.edu.vn official 2026 admission post cross-checked
// via Congluan.vn republish (21/06/2026). Methods 2-4 remain knowledge gaps. vwa — shipped
// eligibility-only for THPT-exam + transcript methods, 3-tier group thresholds (19/23, 18/21,
// 16/19 thang 30), sourced from Thông báo 96/TB-HVPNVN (07/07/2026). hau — shipped eligibility-only
// for the 9/22 non-năng-khiếu majors (2 tiers, 15/18 thang 30), sourced from Quyết định
// 406/QĐ-ĐHKT-ĐT (03/07/2026) by downloading the linked Google Drive PDF directly and reading it
// (WebFetch alone cannot see Drive-hosted/embedded-image content). Batch (2026-08-26): dhv —
// shipped eligibility-only, THPT-exam route flat 15/30 (trừ Luật/Tâm lý học chờ Bộ GD&ĐT), nguồn
// đối chiếu qua Báo Tuổi Trẻ (04/07/2026) vì tuyensinh.dhv.edu.vn không trích được số liệu qua
// WebFetch.) They stay listed in `finalCatalogSchools` above for identity/location metadata only.
const explicitRuntimeSchoolIds = new Set(['vgu', 'hpu2', 'apd', 'eiu', 'fbu', 'fpfu', 'ntuhn', 'tbdu', 'thanhdo', 'tnue', 'tnufl', 'tnus', 'tuaf', 'uhd', 'umt', 'utm', 'utt', 'eaut', 'vwa', 'hau', 'tbu', 'ltvuni', 'dhv', 'ush', 'hcmupes', 'hnmu']);
const finalCatalogRuntimeSchools = finalCatalogSchools.filter((school) => !explicitRuntimeSchoolIds.has(school.id));

export const finalCatalogMethods: AdmissionMethodDescriptor[] = finalCatalogRuntimeSchools.map((school) => ({
  id: `${school.id}-catalog-2026`,
  schoolId: school.id,
  name: 'Thông tin tuyển sinh 2026 đang chờ research',
  year: 2026,
  applicantTypes: ['Thí sinh xét tuyển đại học chính quy 2026'],
  capabilities: unsupportedCapabilities,
  knowledgeGaps: [finalCatalogKnowledgeGap],
}));

export const finalCatalogModules: Record<string, SchoolModule> = Object.fromEntries(
  finalCatalogRuntimeSchools.map((school) => [
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
      entityLevel: resolveFinalCatalogEntityLevel(school),
      vnuhcm: false,
      summary: finalCatalogSummaryFor(school),
      capabilities: finalCatalogCapabilitiesFor(school.id),
      catalogSources: finalCatalogSourcesFor(school.id),
    },
  ])
);

function evaluateCatalogOnlySchool(school: FinalCatalogSchool): AdmissionEvaluation {
  return {
    schoolId: school.id,
    year: 2026,
    methodId: `${school.id}-catalog-2026`,
    confidence: 'unavailable',
    eligibility: {
      status: 'unknown',
      reasons: [`${school.shortName} đã có trong roster 238, nhưng UniscoreVN chưa có nguồn chính thức đủ để kiểm tra điều kiện hoặc tính điểm.`],
    },
    missingInputs: [],
    missingRules: [finalCatalogKnowledgeGap.label],
    missingRequirements: [{ kind: 'unsupported', code: finalCatalogKnowledgeGap.id, label: finalCatalogKnowledgeGap.label }],
    explanation: [],
    evidence: finalCatalogEvidenceFor(school.id),
  };
}

export const finalCatalogComparisonAdapters: readonly SchoolComparisonAdapter[] = finalCatalogRuntimeSchools.map((school) => ({
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
