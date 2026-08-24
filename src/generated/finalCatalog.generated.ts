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
  hcmupes: {
    sourceId: 'hcmupes-admission-2026',
    title: 'Thông tin tuyển sinh đại học chính quy năm 2026 - Trường Đại học Sư phạm Thể dục Thể thao TP.HCM',
    url: 'https://upes.edu.vn/thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2026/',
    checkedAt: '2026-08-24',
    note:
      'Official UPES (upes.edu.vn) 2026 notice confirms 3 programs (7140206, 7810301, 7810302) admitted via a combined score of a Thể dục Thể thao aptitude test (thể hình, chạy 30m, bật xa tại chỗ, fee 400,000 VND, exam 15/06/2026) plus 2 cultural subjects from 7 named combinations (T00/T01/T02/T05/T08/T09/T10). Secondary press (chinhphu.vn) reports 2026 cut-offs of 22.30-25.37, but the aptitude test score is not a field in the shared ApplicantProfile schema and no official floor/conversion table was located on the primary source. Left at researched: modeling would require guessing the aptitude-to-30-point conversion.',
  },
  hnmu: {
    sourceId: 'hnmu-admission-2026',
    title: 'Tuyển sinh - Trường Đại học Thủ đô Hà Nội',
    url: 'https://hnmu.edu.vn/tuyen-sinh',
    checkedAt: '2026-08-24',
    note:
      'Official HNMU (hnmu.edu.vn) admission portal confirmed reachable, listing regular undergraduate, liên thông, and văn bằng 2 admission tracks and referencing a 2026 "Quyết định phê duyệt điểm trúng tuyển" decision, but no floor score, subject-combination table, or per-program threshold is present as readable text on the fetched page (detail lives in linked announcement documents not retrieved this round). Left at researched; do not fabricate thresholds.',
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
