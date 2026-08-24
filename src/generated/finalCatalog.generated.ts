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
  vinuni: {
    sourceId: 'vinuni-admission-2026',
    title: 'VinUniversity Officially Announces the 2026 Undergraduate Admissions Plan',
    url: 'https://admissions.vinuni.edu.vn/vinuniversity-officially-announces-the-2026-undergraduate-admissions-plan/',
    checkedAt: '2026-08-24',
    note:
      'Cổng tuyển sinh chính thức VinUniversity (admissions.vinuni.edu.vn) xác nhận tồn tại qua kết quả tìm kiếm và trích dẫn (kế hoạch tuyển sinh đại học 2026, yêu cầu IELTS 6.5 từ 2026, học bổng/hỗ trợ học phí). WebFetch trực tiếp tới admissions.vinuni.edu.vn và vinuni.edu.vn bị chặn (HTTP 403) trong lượt research này nên KHÔNG trích xuất được ngưỡng điểm THPT/hồ sơ có cấu trúc; cần thử lại từ môi trường mạng khác trước khi nâng lên eligibility-only.',
  },
  rmitvn: {
    sourceId: 'rmitvn-admission-2026',
    title: 'RMIT Vietnam — Nhập học RMIT Việt Nam / Quy trình nhập học chương trình cử nhân',
    url: 'https://www.rmit.edu.vn/vi/hoc-tap-tai-rmit/nhap-hoc-rmit-viet-nam',
    checkedAt: '2026-08-24',
    note:
      'Cổng tuyển sinh chính thức RMIT Việt Nam (rmit.edu.vn) fetch được nhưng chỉ là trang portal điều hướng: yêu cầu tiếng Anh chung (IELTS Academic 6.5, không kỹ năng nào dưới 6.0) được nêu rõ, nhưng ngưỡng điểm THPT/học bạ cụ thể được trang này dẫn sang từng trang ngành riêng lẻ (hàng chục ngành, không fetch hết trong 1 lượt). Không đủ cấu trúc để mô hình hoá eligibility trong batch này; do-not-guess-formula áp dụng.',
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
      "Batch expand-10 (2026-08-24): official domain is ltvu.edu.vn (not ltvuni.edu.vn); homepage links a dedicated 2026 threshold/conversion notice (\"Ngưỡng đảm bảo chất lượng, độ chênh giữa các tổ hợp xét tuyển theo phương thức xét điểm thi THPT và bảng quy đổi điểm tương đương giữa các phương thức xét tuyển năm 2026\"), but the notice's numeric content was not extracted from the primary page in this pass -- only a secondary aggregator states a generic >=15.0/30 floor, unconfirmed on ltvu.edu.vn itself. Left at researched; do not use the unconfirmed secondary figure.",
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

// 'vgu' and 'hpu2' moved to dedicated runtime modules (normalized/runtime-source-snapshot/<id>/) —
// eligibility-only, excluded here to avoid duplicate methodId/comparisonAdapter entries.
const explicitRuntimeSchoolIds = new Set(['vgu', 'hpu2']);
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
