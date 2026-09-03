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

interface SouthernCatalogSchool {
  id: string;
  shortName: string;
  name: string;
  location: string;
  ownership: SchoolModule['ownership'];
  summary: string;
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

/** Batch 10 (2026-08-24): schools with a verified official 2026 admission source but no clean
 * structured numbers extracted yet — same "researched" tier pattern as `remainingCatalog.ts`
 * (`researchedAdmissionSources`), replicated here for the southern roster. */
const researchedAdmissionSources: Record<string, ResearchedAdmissionSource> = {
  blu: {
    sourceId: 'blu-admission-2026',
    title: 'Công bố ngưỡng đảm bảo chất lượng đầu vào năm 2026 - Trường Đại học Bạc Liêu',
    url: 'https://tuyensinh.blu.edu.vn/cong-bo-nguong-dam-bao-chat-luong-dau-vao-nam-2026-11286',
    publishedAt: '2026-07-10',
    checkedAt: '2026-08-24',
    note:
      'Batch-expand-04 (2026-08-24): researched from scratch (Trường Đại học Bạc Liêu). Official tuyensinh.blu.edu.vn 2026 floor-score notice fetched live: confirms scope (all bachelor programs + associate-level Giáo dục Mầm non, khu vực 3, no coefficient/priority-point inflation) and structural rules for 3 method families (THPT exam/transcript on a 30-point scale, V-ACT aptitude test on a 1200-point scale, and one special combined-method formula for the associate Mầm non track: Toán + Ngữ văn + điểm ưu tiên*2/3 >= 11,33). The actual per-program/per-combination numeric floor table is embedded as an image on the official page and could not be extracted as text in this pass. Left at researched; do-not-guess-formula rule applied.',
  },
  tvu: {
    sourceId: 'tvu-admission-2026',
    title: 'TVU official 2026 admission plan announcement',
    url: 'https://tuyensinh.tvu.edu.vn/thong-bao-tuyen-sinh-dai-hoc-he-chinh-quy-dot-1-nam-2026-nguoi-co-bang-tot-nghiep-trung-hoc-pho-thong/',
    checkedAt: '2026-08-24',
    publishedAt: '2026-06-18',
    note:
      'Batch expand-14 (2026-08-24): official tuyensinh.tvu.edu.vn / tvu.edu.vn (Truong Dai hoc Tra Vinh) 2026 Round-1 notice confirms 7,415 seats across 49 programs and 4 methods. Floor thresholds are tiered and academic-rank-gated in parts: Medicine/Dentistry/Pharmacy requires grade-12 rank "Gioi" (Excellent) plus THPT total >= 20/30 (or graduation-exam average >= 8.5); other health-science majors require rank "Kha" (Good) or higher plus THPT total >= 16.5/30 (or average >= 6.5); Law requires rank "Gioi" plus THPT total >= 18/30 with Math/Van >= 6 each; other majors require rank "Trung binh" (Average) or higher, or THPT graduation score >= 5.0. Every tier mixes an academic-rank condition with no matching applicant-profile field alongside a numeric floor. Left at researched per the academic-rank-gating rule; do not model eligibility without the rank field.',
  },
  uth: {
    sourceId: 'uth-admission-2026',
    title: 'UTH undergraduate admission portal 2026',
    url: 'https://tuyensinh.ut.edu.vn/',
    publishedAt: '2026-06-11',
    checkedAt: '2026-08-24',
    note:
      'Official 2026 UTH admission notice confirms 2 methods (priority admission per school rules, and a combined-assessment method using a proprietary "UTH120" 120-point-equivalent scale). The admission portal itself (tuyensinh.ut.edu.vn) returns HTTP 403 on direct fetch; a per-program cutoff table (64 program codes, non-30-point scale, e.g. 600-999) is available via secondary government-portal coverage (xaydungchinhsach.chinhphu.vn), but no official floor-score/ngưỡng đảm bảo chất lượng đầu vào notice or documentation of the UTH120 conversion formula was located. Left at researched: the non-standard scale and blocked primary source make eligibility modeling unsafe without further extraction.',
  },
  ctuet: {
    sourceId: 'ctuet-admission-2026',
    title: 'Điểm sàn xét tuyển vào Trường Đại học Kỹ thuật - Công nghệ Cần Thơ từ 15-20 điểm',
    url: 'https://baocantho.com.vn/diem-san-xet-tuyen-vao-truong-dai-hoc-ky-thuat-cong-nghe-can-tho-tu-15-20-diem-a209350.html',
    publishedAt: '2026-07-10',
    checkedAt: '2026-08-24',
    note:
      'Batch-expand-05 (2026-08-24): official admission portal tuyensinh.ctuet.edu.vn confirmed live (lists 22 programs, 4 methods, and a point-conversion tool at quanlytuyensinh.ctuet.edu.vn/pointconversion). The 2026 điểm sàn notice itself (cross-checked via xaydungchinhsach.chinhphu.vn, 2026-08-11) states a 15-20/30 range with Luật cited as the highest band, but the actual per-program breakdown table is embedded as an image on both the primary and secondary pages and could not be reliably extracted as structured text in this pass. Do-not-guess-formula applied: left at researched rather than eligibility-only.',
  },
  ctump: {
    sourceId: 'ctump-admission-2026',
    title: 'Trường ĐH Y Dược Cần Thơ công bố điểm sàn năm 2026 từ 15 đến 22',
    url: 'https://vietnamnet.vn/truong-dh-y-duoc-can-tho-cong-bo-diem-san-nam-2026-tu-15-den-22-2534143.html',
    publishedAt: '2026-07-09',
    checkedAt: '2026-08-24',
    note:
      'Superseded (2026-08-25 batch): eligibility-only upgrade shipped for all 14 programs (4 tiers: 22/20/18/15 thang 30). The prior "image-embedded" finding was a misread of secondary press coverage — the OFFICIAL notice page (tuyensinh.ctump.edu.vn) links directly to a real text-layer PDF (Thông báo 197/TB-ĐHYDCT, hosted on media.ctump.edu.vn) which was downloaded and read directly as a file (not via WebFetch, which does not follow/render the linked PDF from that page). Full per-major table with mã ngành, tổ hợp, and mức điểm confirmed. Threshold already includes priority points (formula published); runtime only sums raw score. V-SAT conversion method (full table also in the PDF) not modeled. See normalized/runtime-source-snapshot/ctump/sources.ts. This entry is unused because ctump is now in explicitRuntimeSchoolIds; kept only as a research trail.',
  },
  dnu: {
    sourceId: 'dnu-admission-2026',
    title: 'Thông tin tuyển sinh Cao đẳng, Đại học năm 2026 — Trường Đại học Đồng Nai',
    url: 'https://dongnaiuni.edu.vn/thong-tin-tuyen-sinh-nam-2026/',
    checkedAt: '2026-08-24',
    note:
      'Batch expand-06 (2026-08-24): official domain dongnaiuni.edu.vn (also reachable via dnpu.edu.vn, which 301-redirects to it) confirmed to host a dedicated 2026 admission-information page via search-engine indexing, but direct WebFetch to dongnaiuni.edu.vn returns HTTP 403 in this pass, so no numeric threshold could be extracted and verbatim-quoted from the primary source itself. Secondary aggregator search snippets (not independently WebFetch-verified) suggest a THPT-exam floor of 15,0/30 and a transcript-based route requiring lớp 12 "Giỏi" ranking plus either a 18,0/30 THPT-exam total or an 8,50+ graduation-recognition score, but per the do-not-guess-formula rule this is not modeled without a direct fetch confirming the exact wording. Left at researched; retry direct fetch from a different network path before upgrading.',
  },
  dthu: {
    sourceId: 'dthu-admission-2026',
    title: 'Thông báo ngưỡng bảo đảm chất lượng đầu vào đại học, cao đẳng chính quy năm 2026 — Trường Đại học Đồng Tháp',
    url: 'https://tuyensinh.dthu.edu.vn/thong-bao-nguong-bao-dam-chat-luong-dau-vao-dai-hoc-cao-dang-chinh-quy-theo-phuong-thuc-ket-qua-thi-tot-nghiep-thpt-nam-2026-va-cac-dieu-kien-dang-ky-072818.html',
    checkedAt: '2026-08-24',
    note:
      'Superseded (2026-08-25 batch): eligibility-only upgrade shipped. The attached PDF was downloaded directly from its FileManager link and read as a file (not via WebFetch, which only summarized the landing page) — full Phụ lục I table read: all 59 mã ngành, tổ hợp, and NĐV. Modeled 3 clean groups for phương thức 100 (thi TN THPT, no năng khiếu): teacherTraining 20/30 (16 majors), standard 15/30 (36 majors), law 20/30 (Luật, extra rank condition not modeled). 6 năng-khiếu-gated majors (Mầm non/GDTC/SP Âm nhạc/SP Mỹ thuật/Huấn luyện Thể thao) not modeled — no talent-score field. NĐV already includes priority points; runtime only sums raw score. See normalized/runtime-source-snapshot/dthu/sources.ts. This entry is unused because dthu is now in explicitRuntimeSchoolIds; kept only as a research trail.',
  },
  dla: {
    sourceId: 'due-admission-2026',
    title: 'Trường Đại học Kinh tế Công nghiệp Long An (DLA) công bố các phương thức tuyển sinh năm 2026',
    url: 'https://tuyensinh.daihoclongan.edu.vn/tin-tuc-tuyen-sinh/742-truong-dai-hoc-kinh-te-cong-nghiep-long-an-dla-cong-bo-cac-phuong-thuc-tuyen-sinh-nam-2026.html',
    checkedAt: '2026-08-24',
    note:
      'Superseded (2026-09-03 batch): verified-calculator upgrade shipped. Batch expand-06 (2026-08-24) found the announcement text-only (no numeric threshold) and left this researched-only. This batch used chrome-devtools (site is a legacy Joomla-ish template but the threshold/combination tables are embedded Google-Drive-hosted images, not plain text) to read: (1) article #750 "DLA chính thức công bố điểm chuẩn đại học năm 2026" — CHÍNH CHỦ image "CÔNG BỐ ĐIỂM CHUẨN TRÚNG TUYỂN ĐẠI HỌC CHÍNH QUY 2026" (mã trường DLA), full 9-ngành table, cột "Điểm THPT" (thang 30): Kế toán/QTKD/Marketing/TCNH/CNTT/CNKT Xây dựng/Ngôn ngữ Anh/Du lịch = 15,0; Luật Kinh tế = 20,0 (note (*) về điều kiện phụ chỉ áp dụng nhánh học bạ/ĐGNL, không áp dụng nhánh thi TN THPT); (2) article #742 — CHÍNH CHỦ image "NGÀNH / MÃ NGÀNH / TỔ HỢP MÔN" (2026), 2 nhóm tổ hợp: nhóm 7 ngành khối kinh tế/kỹ thuật dùng D01/C03/C04/C01/X02/C14; nhóm Ngôn ngữ Anh + Du lịch dùng D01/D09/C14/D14/D15/C00 — toàn bộ 12 mã tổ hợp đã có sẵn trong subjects.ts, không cần thêm SubjectId/combo mới. Công thức "Điểm xét tuyển = Tổng điểm thi THPT của tổ hợp 3 môn + Điểm ưu tiên" xác nhận qua trang chuyên đề tuyensinh247.com (thứ cấp, không phải chính chủ) + khớp với cách trình bày cột điểm chuẩn thang 30 không hệ số của trường — cùng kỹ thuật cross-check đã chấp nhận cho HAT/HUMP. Điểm ưu tiên dùng khung quốc gia hiện hành (trường chỉ dẫn chiếu quy chế Bộ GD&ĐT trong bài "Điểm cộng chi tiết cho thí sinh đạt 22,5 điểm trở lên", không tự công bố bảng riêng — judgment call, cùng tiền lệ DNU/TUEBA/PVU). Chỉ mô hình hoá nhánh xét kết quả thi TN THPT — DLA còn nhánh học bạ và ĐGNL ĐHQG-HCM đã công bố điểm chuẩn song song, chưa mô hình hoá. Fixed a pre-existing id typo: this catalog entry was keyed "due" (looked like a copy-paste artifact, unrelated to the "dueudn"/DUE-UDN school) — renamed to "dla" to match the mã trường. See normalized/runtime-source-snapshot/dla/sources.ts. This entry is unused because dla is now in explicitRuntimeSchoolIds; kept only as a research trail.',
  },
  hcmunre: {
    sourceId: 'hcmunre-admission-2026',
    title: 'Thông tin tuyển sinh hệ đại học chính quy năm 2026 - Trường Đại học Tài nguyên và Môi trường TP.HCM',
    url: 'https://hcmunre.edu.vn/thong-tin-tuyen-sinh-he-dai-hoc-chinh-quy-nam-2026',
    publishedAt: '2026-01-17',
    checkedAt: '2026-08-24',
    note:
      'Official HCMUNRE (hcmunre.edu.vn) 2026 admission notice confirmed to exist, but the floor-score/method detail is published entirely as two embedded images (TuyenSinhDaiHocChinhQuy202601.jpg, 202602.jpg), not readable text. Secondary press (tuoitre.vn, tuyensinh247) reports 3 methods with floors of 15/30 (16/30 for CNTT) on THPT exam, 18/30 on transcript, and 450-550 on the VNU-HCM aptitude test, but these numbers could not be independently confirmed against the primary source in this round. Left at researched per the image-embedded-table rule; do not fabricate the per-program floor table.',
  },
  lhu: {
    sourceId: 'lhu-admission-2026',
    title: 'Trường Đại học Lạc Hồng - Cổng tuyển sinh 2026',
    url: 'https://tuyensinh.lhu.edu.vn/',
    checkedAt: '2026-08-24',
    note:
      'Superseded (2026-08-30 batch): verified-calculator upgrade shipped. Batch 11 (2026-08-24) found tuyensinh.lhu.edu.vn portal exposed no extractable numeric text and left this researched-only. This batch fetched lhu.edu.vn/640/52289/... (the "năm học 2026-2027" admission-method announcement, distinct from an older lhu.edu.vn/tuyensinh.lhu.edu.vn page confusingly still live under "năm học 2025-2026" — dates cross-checked to avoid picking up last year\'s cycle) directly via curl, HTTP 200, real text (not image-embedded). Confirmed verbatim: "Điểm môn 1 + Điểm môn 2 + Điểm môn 3 ≥ 15 điểm" (thang 30, phương thức thi TN THPT), applying to all ngành except Dược/Luật/Luật kinh tế (their threshold instead follows the MOET-published ngưỡng, announced 08/07/2026 — still not modeled, knowledge gap). Source is silent on priority points either way — standard national judgment call applied (Điều 7 Thông tư 06/2026/TT-BGDĐT), same precedent as schools/utm. See normalized/runtime-source-snapshot/lhu/sources.ts. This entry is unused because lhu is now in explicitRuntimeSchoolIds; kept only as a research trail.',
  },
  mku: {
    sourceId: 'mku-admission-2026',
    title: 'Trường Đại học Cửu Long - Cổng thông tin tuyển sinh 2026',
    url: 'https://tuyensinh.mku.edu.vn/',
    checkedAt: '2026-08-24',
    note:
      'Batch expand-10 (2026-08-24): official tuyensinh.mku.edu.vn portal fetched successfully and confirms 4 admission methods (THPT exam, học bạ transcript, V-SAT, ĐGNL ĐHQG-HCM) plus a results-lookup tool. A secondary aggregator states a >=6.0 three-subject/12-semester transcript average floor for the học bạ method, but the primary portal page fetched in this pass did not itself state that number, so it is not independently confirmed. Left at researched; do not model the unconfirmed threshold.',
  },
  pvu: {
    sourceId: 'pvu-admission-2026',
    title: 'Tuyển sinh 2026 - Trường Đại học Dầu khí Việt Nam',
    url: 'https://pvu.edu.vn/tuyen-sinh/tuyen-sinh-2026',
    checkedAt: '2026-08-24',
    note:
      'Batch-expand-12 (2026-08-24): official pvu.edu.vn 2026 admission section confirms nationwide THPT-exam-based admission for Kỹ thuật Hóa học (Lọc-Hóa dầu) and Kỹ thuật Địa chất (Địa chất - Địa vật lý Dầu khí), and references a "khung quy đổi điểm tương đương" covering THPT transcript, THPT exam, and VNU-HCM aptitude-test routes. Third-party aggregators (vietjack, tuyensinh247) claim a flat 15/30 THPT-exam floor, but the official page itself only shows announcement titles with the numeric conversion table behind a linked article not retrievable in this pass, so the floor is unconfirmed at the primary source. Left at researched rather than modeling an unverified threshold.',
  },
  stu: {
    sourceId: 'stu-admission-2026',
    title: 'Công bố thông tin tuyển sinh đại học năm 2026 của Trường Đại học Công nghệ Sài Gòn',
    url: 'https://www.stu.edu.vn/cong-bo-thong-tin-tuyen-sinh-dai-hoc-nam-2026-cua-truong-dai-hoc-cong-nghe-sai-gon.html',
    publishedAt: '2026-08-10',
    checkedAt: '2026-08-24',
    note:
      'Batch expand-13 (2026-08-24): trang chính thức stu.edu.vn xác nhận 4 phương thức và công thức khung (ĐXT = tổng 3 môn thi TN THPT/30, hoặc TB lớp 10+11+12/30) cùng quy tắc "điểm Toán/Văn >= 1/3 điểm chuẩn chưa ưu tiên" cho nhóm Kinh tế/Luật, nhưng KHÔNG công bố số điểm ngưỡng cụ thể trên trang chính thức. Hai nguồn thứ cấp độc lập đưa ra số khác nhau cho ngành Luật kinh tế (18 điểm và 20 điểm) — mâu thuẫn không giải quyết được trong lượt research này. Giữ ở mức researched theo quy tắc không đoán khi nguồn xung đột.',
  },
  // Batch expand-16 (2026-08-24):
  vnkgu: {
    sourceId: 'vnkgu-admission-2026',
    title: 'Tuyển sinh - Trường Đại học Kiên Giang',
    url: 'https://tuyensinh.vnkgu.edu.vn/',
    checkedAt: '2026-08-24',
    note:
      'Cổng tuyển sinh chính thức (tuyensinh.vnkgu.edu.vn) xác nhận qua tìm kiếm 6 phương thức 2026 (học bạ THPT, kết quả thi TN THPT, tuyển thẳng/ưu tiên, ĐGNL ĐHQG TP.HCM, V-SAT, xét bảng điểm TC/CĐ/ĐH liên thông). Điểm sàn/điểm chuẩn dao động rất rộng theo ngành (thi TN THPT 15-28,55/30, học bạ 16-28,88/30, ĐGNL 500-1131/1200, V-SAT 200-285/450, Sư phạm Toán cao nhất). WebFetch trực tiếp trang chủ tuyensinh.vnkgu.edu.vn không trả về bảng ngưỡng theo ngành có cấu trúc (chỉ điều hướng). Không đủ dữ liệu per-major xác minh để mô hình hoá; để ở researched.',
  },
};

function getResearchedAdmissionSource(schoolId: string): ResearchedAdmissionSource | undefined {
  return researchedAdmissionSources[schoolId];
}

function capabilitiesForSchool(schoolId: string): NonNullable<SchoolModule['capabilities']> {
  return getResearchedAdmissionSource(schoolId) ? researchedCatalogCapabilities : catalogOnlyCapabilities;
}

function summaryForSchool(school: SouthernCatalogSchool): string {
  const source = getResearchedAdmissionSource(school.id);
  if (!source) return school.summary;
  return `Da xac minh nguon tuyen sinh chinh thuc 2026 (${source.title}); chua nang len eligibility/calculator vi con thieu normalized formula, threshold, conversion hoac program-scope rules.`;
}

function catalogSourcesForSchool(schoolId: string): SchoolModule['catalogSources'] | undefined {
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

export const southernCatalogSchools: readonly SouthernCatalogSchool[] = [
  {
    id: 'gdu',
    shortName: 'GDU',
    name: 'Trường Đại học Gia Định',
    location: 'TP.HCM',
    ownership: 'private',
    summary: 'Đã đưa vào roster miền Nam theo backlog; cần research nguồn tuyển sinh chính thức trước khi tính điều kiện hoặc điểm.',
  },
  {
    id: 'stu',
    shortName: 'STU',
    name: 'Trường Đại học Công nghệ Sài Gòn',
    location: 'TP.HCM',
    ownership: 'private',
    summary: 'Đã đưa vào roster miền Nam theo backlog; chưa claim công thức/ngưỡng vì chưa có nguồn chính thức được nhập.',
  },
  {
    id: 'pntu',
    shortName: 'PNTU',
    name: 'Trường Đại học Y khoa Phạm Ngọc Thạch',
    location: 'TP.HCM',
    ownership: 'public',
    summary: 'Đã đưa vào roster miền Nam theo backlog; khối sức khỏe cần đối chiếu ngưỡng Bộ GD&ĐT và thông báo trường trước khi tính.',
  },
  {
    id: 'bdu',
    shortName: 'BDU',
    name: 'Trường Đại học Bình Dương',
    location: 'Bình Dương',
    ownership: 'private',
    summary: 'Đã đưa vào roster miền Nam theo backlog; cần research đề án/điểm sàn chính thức.',
  },
  {
    id: 'lhu',
    shortName: 'LHU',
    name: 'Trường Đại học Lạc Hồng',
    location: 'Đồng Nai',
    ownership: 'private',
    summary: 'Đã đưa vào roster miền Nam theo backlog; cần nhập nguồn tuyển sinh chính thức trước khi hỗ trợ so sánh.',
  },
  {
    id: 'nlu',
    shortName: 'NLU',
    name: 'Trường Đại học Nông Lâm TP.HCM',
    location: 'TP.HCM',
    ownership: 'public',
    summary: 'Đã đưa vào roster miền Nam theo backlog; cần research thông báo ngưỡng và phương thức 2026.',
  },
  {
    id: 'uah',
    shortName: 'UAH',
    name: 'Trường Đại học Kiến trúc TP.HCM',
    location: 'TP.HCM',
    ownership: 'public',
    summary: 'Đã đưa vào roster miền Nam theo backlog; ngành năng khiếu cần bảng điều kiện riêng trước khi tính.',
  },
  {
    id: 'uth',
    shortName: 'UTH',
    name: 'Trường Đại học Giao thông vận tải TP.HCM',
    location: 'TP.HCM',
    ownership: 'public',
    summary: 'Đã đưa vào roster miền Nam theo backlog; chưa nhập nguồn chính thức cho phương thức/ngưỡng 2026.',
  },
  {
    id: 'vaa',
    shortName: 'VAA',
    name: 'Học viện Hàng không Việt Nam',
    location: 'TP.HCM',
    ownership: 'public',
    summary: 'Đã đưa vào roster miền Nam theo backlog; cần research đề án tuyển sinh và bảng ngưỡng.',
  },
  {
    id: 'hcmunre',
    shortName: 'HCMUNRE',
    name: 'Trường Đại học Tài nguyên và Môi trường TP.HCM',
    location: 'TP.HCM',
    ownership: 'public',
    summary: 'Đã đưa vào roster miền Nam theo backlog; cần xác minh nguồn tuyển sinh chính thức.',
  },
  {
    id: 'ctump',
    shortName: 'CTUMP',
    name: 'Trường Đại học Y Dược Cần Thơ',
    location: 'Cần Thơ',
    ownership: 'public',
    summary: 'Đã đưa vào roster miền Nam theo backlog; khối sức khỏe cần đối chiếu ngưỡng chính thức trước khi kết luận.',
  },
  {
    id: 'ctuet',
    shortName: 'CTUET',
    name: 'Trường Đại học Kỹ thuật - Công nghệ Cần Thơ',
    location: 'Cần Thơ',
    ownership: 'public',
    summary: 'Đã đưa vào roster miền Nam theo backlog; chưa nhập phương thức/ngưỡng chính thức.',
  },
  {
    id: 'nctu',
    shortName: 'NCTU',
    name: 'Trường Đại học Nam Cần Thơ',
    location: 'Cần Thơ',
    ownership: 'private',
    summary: 'Đã đưa vào roster miền Nam theo backlog; cần research nguồn chính thức trước khi tính điểm.',
  },
  {
    id: 'tdu',
    shortName: 'TDU',
    name: 'Trường Đại học Tây Đô',
    location: 'Cần Thơ',
    ownership: 'private',
    summary: 'Đã đưa vào roster miền Nam theo backlog; chưa nhập dữ liệu tuyển sinh 2026.',
  },
  {
    id: 'tvu',
    shortName: 'TVU',
    name: 'Trường Đại học Trà Vinh',
    location: 'Trà Vinh',
    ownership: 'public',
    summary: 'Đã đưa vào roster miền Nam theo backlog; cần research đề án/ngưỡng chính thức.',
  },
  {
    id: 'dthu',
    shortName: 'DThU',
    name: 'Trường Đại học Đồng Tháp',
    location: 'Đồng Tháp',
    ownership: 'public',
    summary: 'Đã đưa vào roster miền Nam theo backlog; nhóm sư phạm cần đối chiếu điều kiện riêng trước khi tính.',
  },
  {
    id: 'tgu',
    shortName: 'TGU',
    name: 'Trường Đại học Tiền Giang',
    location: 'Tiền Giang',
    ownership: 'public',
    summary: 'Đã đưa vào roster miền Nam theo backlog; chưa nhập nguồn tuyển sinh chính thức.',
  },
  {
    id: 'vnkgu',
    shortName: 'VNKGU',
    name: 'Trường Đại học Kiên Giang',
    location: 'Kiên Giang',
    ownership: 'public',
    summary: 'Đã đưa vào roster miền Nam theo backlog; cần research ngưỡng/phương thức 2026.',
  },
  {
    id: 'blu',
    shortName: 'BLU',
    name: 'Trường Đại học Bạc Liêu',
    location: 'Bạc Liêu',
    ownership: 'public',
    summary:
      'Đã có calculator verified-exact riêng (`schools/blu`) — placeholder catalog này bị loại trừ khỏi southernCatalog spread trong comparisonRegistry.ts, giữ lại chỉ để hiển thị metadata roster.',
  },
  {
    id: 'dnu',
    shortName: 'DNU',
    name: 'Trường Đại học Đồng Nai',
    location: 'Đồng Nai',
    ownership: 'public',
    summary: 'Đã đưa vào roster miền Nam theo backlog; cần xác minh nguồn tuyển sinh chính thức.',
  },
  {
    id: 'bvu',
    shortName: 'BVU',
    name: 'Trường Đại học Bà Rịa - Vũng Tàu',
    location: 'Bà Rịa - Vũng Tàu',
    ownership: 'private',
    summary: 'Đã đưa vào roster miền Nam theo backlog; cần research thông báo tuyển sinh trước khi hỗ trợ so sánh.',
  },
  {
    id: 'mku',
    shortName: 'MKU',
    name: 'Trường Đại học Cửu Long',
    location: 'Vĩnh Long',
    ownership: 'private',
    summary: 'Verified-exact 2026-09-03: điểm chuẩn trúng tuyển 33/42 ngành đại học chính quy KHÔNG thuộc khối sức khỏe (nhánh thi TN THPT), nguồn CHÍNH CHỦ tuyensinh.mku.edu.vn.',
  },
  {
    id: 'ttu',
    shortName: 'TTU',
    name: 'Trường Đại học Tân Tạo',
    location: 'Long An',
    ownership: 'private',
    summary: 'Đã đưa vào roster miền Nam theo backlog; cần research đề án/ngưỡng chính thức.',
  },
  {
    id: 'dla',
    shortName: 'DLA',
    name: 'Trường Đại học Kinh tế Công nghiệp Long An',
    location: 'Long An',
    ownership: 'private',
    summary: 'Verified-exact 2026-09-03: điểm chuẩn trúng tuyển 9/9 ngành đại học chính quy (nhánh thi TN THPT), nguồn CHÍNH CHỦ tuyensinh.daihoclongan.edu.vn.',
  },
  {
    id: 'pvu',
    shortName: 'PVU',
    name: 'Trường Đại học Dầu khí Việt Nam',
    location: 'Bà Rịa - Vũng Tàu',
    ownership: 'public',
    summary: 'Đã đưa vào roster miền Nam theo backlog; cần research phương thức tuyển sinh chính thức.',
  },
];

export const southernCatalogKnowledgeGap = {
  id: 'southern-catalog-official-admission-rules',
  label: 'Chưa research đủ nguồn tuyển sinh chính thức 2026 cho trường này.',
  status: 'incomplete' as const,
  impact: 'exact-final-score-blocking' as const,
};

/** Batch 10 (2026-08-24): 'pntu' and 'uah' graduated to dedicated eligibility-only runtime modules
 * (`normalized/runtime-source-snapshot/{pntu,uah}/`) — excluded here from the generated method/module/
 * adapter arrays the same way `remainingCatalog.ts` excludes its `explicitRuntimeSchoolIds`. They
 * stay listed in `southernCatalogSchools` above for identity/location metadata only.
 * Batch-expand-04 (2026-08-24): 'bdu' and 'bvu' graduated the same way (dedicated eligibility-only
 * runtime modules at `normalized/runtime-source-snapshot/{bdu,bvu}/`). Batch-expand-07: 'gdu' too.
 * Batch-expand-11: 'nctu' too. Batch expand-13: 'tdu' and 'tgu' too. Batch expand-14: 'ttu' too.
 * Batch expand-16: 'vaa' too. Batch-expand-19 (2026-08-25): 'ctump' too — shipped eligibility-only
 * for all 14 majors (4 tiers, 15/18/20/22 thang 30), sourced by downloading and reading the linked
 * official PDF directly (Thông báo 197/TB-ĐHYDCT, 09/07/2026) — a real text-layer PDF, not a scan.
 * 'dthu' too — shipped eligibility-only for 53/59 majors (3 groups, 15/20/20 thang 30), sourced by
 * downloading and reading the linked official PDF (Phụ lục I, 09/07/2026) directly. */
const explicitRuntimeSchoolIds = new Set(['pntu', 'uah', 'bdu', 'bvu', 'gdu', 'nctu', 'tdu', 'tgu', 'ttu', 'vaa', 'ctump', 'dthu', 'nlu', 'lhu', 'dla']);
const southernCatalogRuntimeSchools = southernCatalogSchools.filter((school) => !explicitRuntimeSchoolIds.has(school.id));

export const southernCatalogMethods: AdmissionMethodDescriptor[] = southernCatalogRuntimeSchools.map((school) => ({
  id: `${school.id}-catalog-2026`,
  schoolId: school.id,
  name: 'Thông tin tuyển sinh 2026 đang chờ research',
  year: 2026,
  applicantTypes: ['Thí sinh xét tuyển đại học chính quy 2026'],
  capabilities: unsupportedCapabilities,
  knowledgeGaps: [southernCatalogKnowledgeGap],
}));

export const southernCatalogModules: Record<string, SchoolModule> = Object.fromEntries(
  southernCatalogRuntimeSchools.map((school) => [
    school.id,
    {
      id: school.id,
      name: school.name,
      shortName: school.shortName,
      about: `${school.name} (${school.location}).`,
      year: 2026,
      status: 'formula-incomplete',
      ownership: school.ownership,
      region: school.location === 'TP.HCM' ? 'hcm' : 'other',
      vnuhcm: false,
      summary: summaryForSchool(school),
      capabilities: capabilitiesForSchool(school.id),
      catalogSources: catalogSourcesForSchool(school.id),
    },
  ])
);

function evidenceForSchool(schoolId: string): RuleEvidence[] {
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

function evaluateCatalogOnlySchool(school: SouthernCatalogSchool): AdmissionEvaluation {
  const methodId = `${school.id}-catalog-2026`;
  return {
    schoolId: school.id,
    year: 2026,
    methodId,
    confidence: 'unavailable',
    eligibility: {
      status: 'unknown',
      reasons: [`${school.shortName} đã có trong roster miền Nam, nhưng UniscoreVN chưa có nguồn chính thức đủ để kiểm tra điều kiện hoặc tính điểm.`],
    },
    missingInputs: [],
    missingRules: [southernCatalogKnowledgeGap.label],
    missingRequirements: [{ kind: 'unsupported', code: southernCatalogKnowledgeGap.id, label: southernCatalogKnowledgeGap.label }],
    explanation: [],
    evidence: evidenceForSchool(school.id),
  };
}

export const southernCatalogComparisonAdapters: readonly SchoolComparisonAdapter[] = southernCatalogRuntimeSchools.map((school) => ({
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
