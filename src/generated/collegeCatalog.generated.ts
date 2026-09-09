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
import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../compare/schoolComparisonAdapter';

interface CollegeCatalogSchool {
  id: string;
  shortName: string;
  name: string;
  location: string;
  province?: string;
  admissionCode?: string;
  ownership: SchoolModule['ownership'];
  region: SchoolModule['region'];
  entityLevel: 'college_pedagogy' | 'vocational_college';
  aliases?: readonly string[];
  catalogSources?: SchoolModule['catalogSources'];
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

/** Batch-expand-11 (2026-08-24): trường cao đẳng đã có nguồn tuyển sinh chính thức 2026 xác minh
 * được, nhưng chưa trích xuất đủ cấu trúc (ngưỡng/công thức) để nâng lên eligibility-only. Cùng
 * pattern "researched" như `finalCatalog.ts`/`remainingCatalog.ts`/`southernCatalog.ts`. */
const researchedAdmissionSources: Record<string, ResearchedAdmissionSource> = {
  nce: {
    sourceId: 'nce-admission-2026',
    title: 'Thông tin tuyển sinh — Trường Cao đẳng Sư phạm Trung ương (cdsptw.edu.vn)',
    url: 'https://cdsptw.edu.vn/content.aspx?sitepageid=730',
    checkedAt: '2026-08-24',
    note:
      'Cổng thông tin chính thức NCE (cdsptw.edu.vn) xác nhận 2 phương thức tuyển sinh 2026, CẢ HAI đều kết hợp điểm thi năng khiếu do trường tự tổ chức (Phương thức 1: điểm thi TN THPT + năng khiếu; Phương thức 2: điểm trung bình 3 năm THPT môn Văn/Toán + năng khiếu, hạnh kiểm Khá trở lên, điểm năng khiếu >=5,00). Không có tuyến xét tuyển thuần THPT nào không đi kèm điểm năng khiếu, và hồ sơ ứng viên hiện không có trường điểm thi năng khiếu nên không thể mô hình hoá ngưỡng nào một cách an toàn. Do-not-guess-formula (điểm năng khiếu bắt buộc, không đo được): giữ ở researched.',
  },
  ncehcm: {
    sourceId: 'ncehcm-admission-2026',
    title: 'Trường Cao đẳng Sư phạm Trung ương Thành phố Hồ Chí Minh (ncehcm.edu.vn) — thông báo phương án tuyển sinh 2026',
    url: 'https://ncehcm.edu.vn/',
    checkedAt: '2026-08-24',
    note:
      'Cổng thông tin chính thức NCE-HCM (ncehcm.edu.vn, mã trường CM3) xác nhận 4 phương thức tuyển sinh 2026, tất cả đều kết hợp điểm thi/đánh giá năng khiếu do trường tự tổ chức (điểm thi TN THPT hoặc điểm trung bình 3 năm THPT môn Văn/Toán, cộng điểm năng khiếu). Không có tuyến xét tuyển thuần THPT nào không đi kèm điểm năng khiếu, và hồ sơ ứng viên hiện không có trường điểm thi năng khiếu nên không thể mô hình hoá ngưỡng nào một cách an toàn. Do-not-guess-formula (điểm năng khiếu bắt buộc, không đo được): giữ ở researched.',
  },
  ncspnt: {
    sourceId: 'ncspnt-admission-2026',
    title: 'Cổng thông tin tuyển sinh Trường Cao đẳng Sư phạm Trung ương - Nha Trang (tuyensinh.sptwnt.edu.vn)',
    url: 'https://tuyensinh.sptwnt.edu.vn/',
    checkedAt: '2026-08-24',
    note:
      'Cổng tuyển sinh chính thức NCSPNT (tuyensinh.sptwnt.edu.vn) xác nhận 2 phương thức tuyển sinh 2026, cả hai đều kết hợp kết quả văn hoá (thi TN THPT hoặc học bạ THPT môn Văn/Toán) với điểm thi năng khiếu do trường tự tổ chức; trường không tuyển thí sinh có tật nói ngọng/nói lắp. Không có tuyến xét tuyển thuần THPT nào không đi kèm điểm năng khiếu, và hồ sơ ứng viên hiện không có trường điểm thi năng khiếu nên không thể mô hình hoá ngưỡng nào một cách an toàn. Do-not-guess-formula (điểm năng khiếu bắt buộc, không đo được): giữ ở researched.',
  },
  ncc: {
    sourceId: 'ncc-admission-2026',
    title: 'Trường Cao Đẳng Xây Dựng Nam Định — thông tin tuyển sinh (cdxdnd.edu.vn)',
    url: 'https://www.cdxdnd.edu.vn/',
    checkedAt: '2026-08-24',
    note:
      'Cổng thông tin chính thức NCC (cdxdnd.edu.vn, mã trường CDT2502) xác nhận trường tuyển sinh trình độ cao đẳng theo hình thức XÉT TUYỂN THEO NGUYỆN VỌNG, nhận hồ sơ liên tục quanh năm (không có kỳ thi/ngưỡng điểm cạnh tranh công bố) — khác với các trường đại học trong catalog này. Do đó không có công thức/ngưỡng điểm nào để mô hình hoá (không phải do thiếu dữ liệu, mà do bản chất tuyển sinh mở); giữ ở researched thay vì catalog-only phẳng để phản ánh đã xác minh nguồn chính thức.',
  },
};

function getResearchedAdmissionSource(schoolId: string): ResearchedAdmissionSource | undefined {
  return researchedAdmissionSources[schoolId];
}

export const collegeCatalogSources = [
  {
    id: 'moet-admission-regulation-06-2026',
    title: 'Thông tư 06/2026/TT-BGDĐT ban hành Quy chế tuyển sinh đại học và cao đẳng ngành Giáo dục Mầm non',
    url: 'https://tuyensinh.moet.gov.vn/ts/van-ban/thong-tu-06-2026-tt-bgddt-cua-bo-giao-duc-va-dao-tao-ban-hanh-quy-che-tuyen-sinh-cac-nganh-dao-tao-t--9483cd05-0038-4279-8fe7-ea36aa5e67ac',
    type: 'official',
  },
  {
    id: 'gov-decision-1723-2025-moet-public-units',
    title: 'Quyết định 1723/QĐ-TTg ban hành danh sách các đơn vị sự nghiệp công lập trực thuộc Bộ Giáo dục và Đào tạo',
    url: 'https://chinhphu.vn/?classid=2&docid=214915&pageid=27160',
    type: 'official',
  },
  {
    id: 'danang-gdnn-list-2025',
    title: 'Danh sách cơ sở giáo dục nghề nghiệp đến 08/4/2025 - Sở GD&ĐT TP Đà Nẵng',
    url: 'https://www.danang.edu.vn/thong-bao/danh-sach-co-so-giao-duc-nghe-nghiep-den-0842025/ctmb/5/506',
    type: 'official',
  },
  {
    id: 'hcmc-gdnn-directory',
    title: 'Hệ thống quản lý thông tin giáo dục nghề nghiệp TP.HCM',
    url: 'https://gdnn.tphcm.gov.vn/',
    type: 'official',
  },
] as const;

const MOET_PUBLIC_UNIT_SOURCE: NonNullable<CollegeCatalogSchool['catalogSources']>[number] = {
  title: 'Quyết định 1723/QĐ-TTg ban hành danh sách đơn vị sự nghiệp công lập trực thuộc Bộ GD&ĐT',
  url: 'https://chinhphu.vn/?classid=2&docid=214915&pageid=27160',
  type: 'official-document',
  authority: 'Chính phủ',
  checkedAt: '2026-08-22',
};

const DANANG_GDNN_SOURCE: NonNullable<CollegeCatalogSchool['catalogSources']>[number] = {
  title: 'Danh sách cơ sở giáo dục nghề nghiệp đến 08/4/2025',
  url: 'https://www.danang.edu.vn/thong-bao/danh-sach-co-so-giao-duc-nghe-nghiep-den-0842025/ctmb/5/506',
  type: 'official-local-authority',
  authority: 'Sở GD&ĐT TP Đà Nẵng',
  checkedAt: '2026-08-22',
};

const HCMC_GDNN_SOURCE: NonNullable<CollegeCatalogSchool['catalogSources']>[number] = {
  title: 'Hệ thống quản lý thông tin giáo dục nghề nghiệp TP.HCM',
  url: 'https://gdnn.tphcm.gov.vn/',
  type: 'official-local-authority',
  authority: 'Sở GD&ĐT TP.HCM',
  checkedAt: '2026-08-22',
};

export const collegeCatalogSchools: readonly CollegeCatalogSchool[] = [
  {
    id: 'nce',
    shortName: 'NCE',
    name: 'Trường Cao đẳng Sư phạm Trung ương',
    location: 'Hà Nội',
    ownership: 'public',
    region: 'hanoi',
    entityLevel: 'college_pedagogy',
    aliases: ['CĐSP Trung ương', 'Cao đẳng Sư phạm Trung ương'],
  },
  {
    id: 'ncspnt',
    shortName: 'CĐSPTW-NT',
    name: 'Trường Cao đẳng Sư phạm Trung ương - Nha Trang',
    location: 'Khánh Hòa',
    ownership: 'public',
    region: 'other',
    entityLevel: 'college_pedagogy',
    aliases: ['CĐSP Trung ương Nha Trang', 'Cao đẳng Sư phạm Trung ương Nha Trang'],
  },
  {
    id: 'ncehcm',
    shortName: 'CĐSPTW-HCM',
    name: 'Trường Cao đẳng Sư phạm Trung ương Thành phố Hồ Chí Minh',
    location: 'TP.HCM',
    ownership: 'public',
    region: 'hcm',
    entityLevel: 'college_pedagogy',
    aliases: ['CĐSP Trung ương TP.HCM', 'Cao đẳng Sư phạm Trung ương TP.HCM'],
  },
  {
    id: 'vcte',
    shortName: 'VCTE',
    name: 'Trường Cao đẳng nghề Kỹ thuật công nghệ',
    location: 'Hà Nội',
    ownership: 'public',
    region: 'hanoi',
    entityLevel: 'vocational_college',
    aliases: ['Cao đẳng nghề Kỹ thuật công nghệ'],
    catalogSources: [
      MOET_PUBLIC_UNIT_SOURCE,
      {
        title: 'Thông tin tuyển sinh - Trường Cao đẳng Nghề Kỹ Thuật Công Nghệ',
        url: 'http://httc.edu.vn/thong-tin-tuyen-sinh.html',
        type: 'official-institution',
        checkedAt: '2026-08-24',
      },
    ],
  },
  {
    id: 'dungquatcollege',
    shortName: 'DQC',
    name: 'Trường Cao đẳng Kỹ nghệ Dung Quất',
    location: 'Quảng Ngãi',
    province: 'Quảng Ngãi',
    ownership: 'public',
    region: 'other',
    entityLevel: 'vocational_college',
    catalogSources: [
      MOET_PUBLIC_UNIT_SOURCE,
      {
        title: 'Trường Cao đẳng Kỹ nghệ Dung Quất thông báo tuyển sinh năm 2026',
        url: 'https://dungquat.edu.vn/tin-tuc/thong-tin-thong-bao/truong-cao-dang-ky-nghe-dung-quat-thong-bao-tuyen-sinh-nam-2026.html',
        type: 'official-institution',
        checkedAt: '2026-08-24',
      },
    ],
  },
  {
    id: 'hvct',
    shortName: 'HVCT',
    name: 'Trường Cao đẳng Kỹ nghệ II',
    location: 'TP.HCM',
    ownership: 'public',
    region: 'hcm',
    entityLevel: 'vocational_college',
  },
  {
    id: 'cic1',
    shortName: 'CIC1',
    name: 'Trường Cao đẳng Xây dựng số 1',
    location: 'Hà Nội',
    ownership: 'public',
    region: 'hanoi',
    entityLevel: 'vocational_college',
    catalogSources: [
      MOET_PUBLIC_UNIT_SOURCE,
      {
        title: 'Trường Cao đẳng Xây dựng số 1 (CTC1)',
        url: 'https://ctc1.edu.vn/',
        type: 'official-institution',
        checkedAt: '2026-08-24',
      },
    ],
  },
  {
    id: 'hcmcc',
    shortName: 'HCMCC',
    name: 'Trường Cao đẳng Xây dựng Thành phố Hồ Chí Minh',
    location: 'TP.HCM',
    ownership: 'public',
    region: 'hcm',
    entityLevel: 'vocational_college',
  },
  {
    id: 'ncc',
    shortName: 'NCC',
    name: 'Trường Cao đẳng Xây dựng Nam Định',
    location: 'Nam Định',
    ownership: 'public',
    region: 'other',
    entityLevel: 'vocational_college',
  },
  {
    id: 'cuwc',
    shortName: 'CUWC',
    name: 'Trường Cao đẳng Xây dựng Công trình đô thị',
    location: 'Hà Nội',
    ownership: 'public',
    region: 'hanoi',
    entityLevel: 'vocational_college',
    catalogSources: [
      MOET_PUBLIC_UNIT_SOURCE,
      {
        title: 'Trường Cao đẳng Xây dựng Công trình đô thị (CUWC)',
        url: 'https://cuwc.edu.vn/',
        type: 'official-institution',
        checkedAt: '2026-08-24',
      },
    ],
  },
  {
    id: 'vietxo1',
    shortName: 'Việt-Xô 1',
    name: 'Trường Cao đẳng nghề Việt - Xô số 1',
    location: 'Vĩnh Phúc',
    ownership: 'public',
    region: 'other',
    entityLevel: 'vocational_college',
    aliases: ['Cao đẳng nghề Việt Xô số 1'],
    catalogSources: [
      MOET_PUBLIC_UNIT_SOURCE,
      {
        title: 'Trường Cao đẳng nghề Việt - Xô số 1',
        url: 'https://vixo.edu.vn/',
        type: 'official-institution',
        checkedAt: '2026-08-24',
      },
    ],
  },
  {
    id: 'lilama2',
    shortName: 'Lilama 2',
    name: 'Trường Cao đẳng Công nghệ Quốc tế Lilama 2',
    location: 'Đồng Nai',
    ownership: 'public',
    region: 'other',
    entityLevel: 'vocational_college',
  },
  {
    id: 'cmc-college',
    shortName: 'CMC-CĐ',
    name: 'Trường Cao đẳng Cơ giới Xây dựng',
    location: 'Quảng Ninh',
    ownership: 'public',
    region: 'other',
    entityLevel: 'vocational_college',
    catalogSources: [
      MOET_PUBLIC_UNIT_SOURCE,
      {
        title: 'Trường Cao đẳng Cơ giới Xây dựng',
        url: 'https://caodangcogioixaydung.edu.vn/',
        type: 'official-institution',
        checkedAt: '2026-08-24',
      },
    ],
  },
  {
    id: 'ccst',
    shortName: 'CCST',
    name: 'Trường Cao đẳng Xây dựng và Công nghệ - Xã hội',
    location: 'Nghệ An',
    ownership: 'public',
    region: 'other',
    entityLevel: 'vocational_college',
    catalogSources: [
      MOET_PUBLIC_UNIT_SOURCE,
      {
        title: 'Trường Cao đẳng Xây dựng và Công nghệ - Xã hội',
        url: 'https://caodangxaydungvacongnghe-xahoi.edu.vn/',
        type: 'official-institution',
        checkedAt: '2026-08-24',
      },
    ],
  },
  {
    id: 'hctb',
    shortName: 'HCTB',
    name: 'Trường Cao đẳng Kỹ thuật và Nghiệp vụ Hà Nội',
    location: 'Hà Nội',
    ownership: 'public',
    region: 'hanoi',
    entityLevel: 'vocational_college',
  },
  {
    id: 'danangcollege',
    shortName: 'DNC',
    name: 'Trường Cao đẳng Đà Nẵng',
    location: 'Đà Nẵng',
    province: 'Đà Nẵng',
    ownership: 'public',
    region: 'other',
    entityLevel: 'vocational_college',
    aliases: ['Danang College', 'DANAVTC', 'Trường Cao đẳng nghề Đà Nẵng', 'Trường Cao đẳng Văn hóa - Nghệ thuật Đà Nẵng'],
    catalogSources: [
      DANANG_GDNN_SOURCE,
      {
        title: 'Trường Cao đẳng Đà Nẵng - Cổng thông tin điện tử TP Đà Nẵng',
        url: 'https://danang.gov.vn/vi/w/truong-cao-dang-nghe-da-nang-i',
        type: 'official-local-authority',
        authority: 'UBND TP Đà Nẵng',
        checkedAt: '2026-08-22',
      },
      {
        title: 'Trường Cao đẳng Đà Nẵng',
        url: 'https://dnc.edu.vn/',
        type: 'official-institution',
        checkedAt: '2026-08-22',
      },
      // Catalog-expansion batch 5 (2026-09-08): confirms Batch 3's "Trường Cao đẳng Văn hóa - Nghệ
      // thuật Đà Nẵng" needs-review lead (flagged for dead/squatted domain) resolves to THIS
      // already-cataloged entry, not a separate institution — it was merged into the predecessor
      // "Trường Cao đẳng nghề Đà Nẵng" and the combined entity renamed to "Trường Cao đẳng Đà Nẵng"
      // per Quyết định 1867/QĐ-BGDĐT (03/7/2025). No new catalog entry needed; alias added above.
      {
        title: 'Sáp nhập Trường Cao đẳng Văn hóa Nghệ thuật Đà Nẵng vào Trường Cao đẳng nghề Đà Nẵng và đổi tên thành Trường Cao đẳng Đà Nẵng',
        url: 'https://dnc.edu.vn/bai-viet/sap-nhap-truong-cao-dang-van-hoa-nghe-thuat-da-nang-vao-truong-cao-dang-nghe-da-nang-va-doi-ten-thanh-truong-cao-dang-da-nang',
        type: 'official-institution',
        checkedAt: '2026-09-08',
      },
    ],
  },
  // Catalog-expansion batch 6 (2026-09-08): resolves the "Trường Cao đẳng Công nghệ - Ngoại
  // thương" 5+-competing-domain ambiguity flagged since batch 3 (see docs/catalog-expansion-
  // report.md). VNNIC's own WHOIS lookup (whois.vnnic.vn) — not a candidate site's self-
  // description — shows `cnnt.edu.vn`, `ftcollege.edu.vn`, and `ngoaithuongcollege.edu.vn` are
  // ALL registered directly to registrant "TRƯỜNG CAO ĐẲNG CÔNG NGHỆ - NGOẠI THƯƠNG" (exact legal
  // name match) via registrar Công ty TNHH P.A Việt Nam, while `cdcnnt.edu.vn` is registered to
  // an unrelated Hanoi trading company ("CÔNG TY TNHH THƯƠNG MẠI VÀ ĐẦU TƯ QUỐC TẾ DƯỢC MỸ PHẨM
  // HÀ NỘI" — confirms that one is a reseller/lead-gen mirror, NOT the school) and
  // `truongcaodangngoaithuong.edu.vn` is currently unregistered ("chưa cấp phát"). Both `cnnt` and
  // `ftcollege` also independently cite the same Đà Nẵng HQ address (42-44-46 Phan Châu Trinh,
  // Hải Châu) matching the school's tax-registry record (MST 0401342635, masothue.com) and the
  // same rename decision (1279/QĐ-LĐTBXH, 30/8/2023, renamed from Trường Cao đẳng Lạc Việt).
  // `ftcollege.edu.vn` chosen as primary: registered 2023-12-09 (earliest of the 3 school-owned
  // domains, right after the rename decision) and carries the fullest official narrative
  // (founding/rename decision numbers, mission/vision). `cnnt.edu.vn` and `ngoaithuongcollege.
  // edu.vn` kept as aliases/secondary sources since WHOIS confirms the school owns them too.
  {
    id: 'cnnt',
    shortName: 'CNNT',
    name: 'Trường Cao đẳng Công nghệ - Ngoại thương',
    location: 'Đà Nẵng',
    province: 'Đà Nẵng',
    ownership: 'private',
    region: 'other',
    entityLevel: 'vocational_college',
    aliases: ['FT College', 'Trường Cao đẳng Lạc Việt'],
    catalogSources: [
      {
        title: 'Trường Cao Đẳng Công Nghệ - Ngoại Thương (ftcollege.edu.vn) — Giới thiệu',
        url: 'https://ftcollege.edu.vn/gioi-thieu/',
        type: 'official-institution',
        checkedAt: '2026-09-08',
      },
      {
        title: 'TRƯỜNG CAO ĐẲNG CÔNG NGHỆ – NGOẠI THƯƠNG (cnnt.edu.vn)',
        url: 'https://cnnt.edu.vn/',
        type: 'official-institution',
        checkedAt: '2026-09-08',
      },
      {
        title: 'WHOIS ftcollege.edu.vn — registrant "TRƯỜNG CAO ĐẲNG CÔNG NGHỆ - NGOẠI THƯƠNG"',
        url: 'https://whois.vnnic.vn/',
        type: 'official-document',
        authority: 'Trung tâm Internet Việt Nam (VNNIC)',
        checkedAt: '2026-09-08',
      },
      {
        title: 'Mã số thuế 0401342635 — Trường Cao Đẳng Công nghệ - Ngoại thương (42-46 Phan Chu Trinh, Hải Châu, Đà Nẵng)',
        url: 'https://masothue.com/0401342635-truong-cao-dang-cong-nghe-ngoai-thuong',
        type: 'secondary',
        checkedAt: '2026-09-08',
      },
    ],
  },
  {
    id: 'dvtc',
    shortName: 'DVTC',
    name: 'Trường Cao đẳng Du lịch Đà Nẵng',
    location: 'Đà Nẵng',
    province: 'Đà Nẵng',
    ownership: 'public',
    region: 'other',
    entityLevel: 'vocational_college',
    aliases: ['Danang Vocational Tourism College', 'Cao đẳng nghề Du lịch Đà Nẵng'],
    catalogSources: [
      DANANG_GDNN_SOURCE,
      {
        title: 'Trường Cao đẳng Du lịch Đà Nẵng',
        url: 'https://bvhttdl.gov.vn/truong-cao-dang-nghe-du-lich-da-nang-9906.htm',
        type: 'official-ministry',
        authority: 'Bộ Văn hóa, Thể thao và Du lịch',
        checkedAt: '2026-08-22',
      },
    ],
  },
  {
    id: 'cdtm',
    shortName: 'COC',
    name: 'Trường Cao đẳng Thương mại',
    location: 'Đà Nẵng',
    province: 'Đà Nẵng',
    ownership: 'public',
    region: 'other',
    entityLevel: 'vocational_college',
    aliases: ['College of Commerce', 'CĐ Thương mại'],
    catalogSources: [
      DANANG_GDNN_SOURCE,
      {
        title: 'Giới thiệu chung - Trường Cao đẳng Thương mại',
        url: 'https://cdtm.edu.vn/gioi-thieu/gioi-thieu-chung',
        type: 'official-institution',
        checkedAt: '2026-08-22',
      },
      {
        title: 'Trường Cao đẳng Thương mại Đà Nẵng',
        url: 'https://moit.gov.vn/don-vi-su-nghiep/khoi-truong/truong-cao-dang-thuong-mai',
        type: 'official-ministry',
        authority: 'Bộ Công Thương',
        checkedAt: '2026-08-22',
      },
    ],
  },
  {
    id: 'cfi',
    shortName: 'CFI',
    name: 'Trường Cao đẳng Lương thực - Thực phẩm',
    location: 'Đà Nẵng',
    province: 'Đà Nẵng',
    ownership: 'public',
    region: 'other',
    entityLevel: 'vocational_college',
    aliases: ['College of Food Industry', 'CĐ Lương thực - Thực phẩm'],
    catalogSources: [
      DANANG_GDNN_SOURCE,
      {
        title: 'Trường Cao đẳng Lương thực - Thực phẩm',
        url: 'https://www.cfi.edu.vn/',
        type: 'official-institution',
        checkedAt: '2026-08-22',
      },
    ],
  },
  {
    id: 'tdc',
    shortName: 'TDC',
    name: 'Trường Cao đẳng Công nghệ Thủ Đức',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'public',
    region: 'hcm',
    entityLevel: 'vocational_college',
    aliases: ['Thu Duc College of Technology'],
    catalogSources: [
      HCMC_GDNN_SOURCE,
      {
        title: 'Trường Cao đẳng Công nghệ Thủ Đức',
        url: 'https://gdnn.tphcm.gov.vn/truong-cao-dang-cong-nghe-thu-duc',
        type: 'official-local-authority',
        authority: 'Sở GD&ĐT TP.HCM',
        checkedAt: '2026-08-22',
      },
    ],
  },
  {
    id: 'hotec',
    shortName: 'HOTEC',
    name: 'Trường Cao đẳng Kinh tế - Kỹ thuật Thành phố Hồ Chí Minh',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'public',
    region: 'hcm',
    entityLevel: 'vocational_college',
    aliases: ['Trường Cao đẳng Kinh tế Kỹ thuật TP.HCM'],
    catalogSources: [
      HCMC_GDNN_SOURCE,
      {
        title: 'Trường Cao đẳng Kinh tế Kỹ thuật TP.HCM',
        url: 'https://gdnn.tphcm.gov.vn/truong-cao-dang-kinh-te-ky-thuat-tphcm',
        type: 'official-local-authority',
        authority: 'Sở GD&ĐT TP.HCM',
        checkedAt: '2026-08-22',
      },
      {
        title: 'Trường Cao đẳng Kinh tế Kỹ thuật Thành phố Hồ Chí Minh',
        url: 'https://ktkthcm.edu.vn/',
        type: 'official-institution',
        checkedAt: '2026-08-22',
      },
    ],
  },
  {
    id: 'hce-college',
    shortName: 'HCE-CĐ',
    name: 'Trường Cao đẳng Kinh tế Thành phố Hồ Chí Minh',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'public',
    region: 'hcm',
    entityLevel: 'vocational_college',
    aliases: ['HCE', 'Cao đẳng Kinh tế TP.HCM'],
    catalogSources: [
      HCMC_GDNN_SOURCE,
      {
        title: 'Trường Cao đẳng Kinh tế Thành phố Hồ Chí Minh',
        url: 'https://gdnn.tphcm.gov.vn/truong-cao-dang-kinh-te-thanh-pho-ho-chi-minh',
        type: 'official-local-authority',
        authority: 'Sở GD&ĐT TP.HCM',
        checkedAt: '2026-08-22',
      },
      {
        title: 'Trường Cao đẳng Kinh tế Thành phố Hồ Chí Minh',
        url: 'https://tuyensinh-kthcm.edu.vn/',
        type: 'official-institution',
        checkedAt: '2026-08-22',
      },
    ],
  },
  {
    id: 'sgpoly',
    shortName: 'NSPC',
    name: 'Trường Cao đẳng Bách khoa Nam Sài Gòn',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'public',
    region: 'hcm',
    entityLevel: 'vocational_college',
    aliases: ['Nam Sai Gon Polytechnic College', 'Cao đẳng Bách khoa Nam Sài Gòn'],
    catalogSources: [
      HCMC_GDNN_SOURCE,
      {
        title: 'Trường Cao đẳng Bách khoa Nam Sài Gòn',
        url: 'https://gdnn.tphcm.gov.vn/truong-cao-dang-bach-khoa-nam-sai-gon',
        type: 'official-local-authority',
        authority: 'Sở GD&ĐT TP.HCM',
        checkedAt: '2026-08-22',
      },
    ],
  },
  {
    id: 'ttc-hcm',
    shortName: 'TTC',
    name: 'Trường Cao đẳng Thủ Thiêm Thành phố Hồ Chí Minh',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'public',
    region: 'hcm',
    entityLevel: 'vocational_college',
    aliases: ['Trường Cao đẳng Thủ Thiêm TP.HCM'],
    catalogSources: [
      HCMC_GDNN_SOURCE,
      {
        title: 'Trường Cao đẳng Thủ Thiêm TP.HCM',
        url: 'https://gdnn.tphcm.gov.vn/truong-cao-dang-thu-thiem-tphcm',
        type: 'official-local-authority',
        authority: 'Sở GD&ĐT TP.HCM',
        checkedAt: '2026-08-22',
      },
      {
        // Batch expand-14 (2026-08-24): official institution site confirms open, rolling admission
        // (xét học bạ liên tục trong năm + xét điểm thi TN THPT 2026, mã xét tuyển D86); no
        // selective numeric threshold published — vocational colleges are out of scope for the
        // THPT-score calculator formula layer, so this stays catalog-only (enriched sources only).
        title: 'Trường Cao đẳng Thủ Thiêm - Thành phố Hồ Chí Minh (official site, admission info)',
        url: 'https://caodangthuthiem-hcm.edu.vn/tuyen-sinh/',
        type: 'official-institution',
        checkedAt: '2026-08-24',
      },
    ],
  },
  {
    id: 'hcmct',
    shortName: 'HCMCT',
    name: 'Trường Cao đẳng Giao thông Vận tải TP.HCM',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'public',
    region: 'hcm',
    entityLevel: 'vocational_college',
    aliases: ['Trường Cao đẳng Giao thông vận tải', 'The Transportation College'],
    catalogSources: [
      HCMC_GDNN_SOURCE,
      {
        title: 'Trường Cao đẳng Giao thông Vận tải TP. HCM',
        url: 'https://gdnn.tphcm.gov.vn/truong-cao-dang-giao-thong-van-tai-tp-hcm',
        type: 'official-local-authority',
        authority: 'Sở GD&ĐT TP.HCM',
        checkedAt: '2026-08-22',
      },
      {
        title: 'Trường Cao đẳng Giao thông Vận tải TP.HCM',
        url: 'https://www.hcmct.edu.vn',
        type: 'official-institution',
        checkedAt: '2026-08-22',
      },
    ],
  },
  {
    id: 'ktxd-hcm',
    shortName: 'KTXD-HCM',
    name: 'Trường Cao đẳng Kiến trúc - Xây dựng Thành phố Hồ Chí Minh',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'public',
    region: 'hcm',
    entityLevel: 'vocational_college',
    aliases: ['Trường Cao đẳng Kiến trúc - Xây dựng TP.HCM'],
    catalogSources: [
      HCMC_GDNN_SOURCE,
      {
        title: 'Trường Cao đẳng Kiến trúc - Xây dựng Thành phố Hồ Chí Minh',
        url: 'https://gdnn.tphcm.gov.vn/truong-cao-dang-kien-truc-xay-dung-thanh-pho-ho-chi-minh',
        type: 'official-local-authority',
        authority: 'Sở GD&ĐT TP.HCM',
        checkedAt: '2026-08-22',
      },
      {
        title: 'Trường Cao đẳng Kiến trúc - Xây dựng Thành phố Hồ Chí Minh',
        url: 'https://www.ktxd.edu.vn',
        type: 'official-institution',
        checkedAt: '2026-08-22',
      },
    ],
  },
  {
    id: 'lttc',
    shortName: 'LTTC',
    name: 'Trường Cao đẳng Lý Tự Trọng TP.HCM',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'public',
    region: 'hcm',
    entityLevel: 'vocational_college',
    aliases: ['Trường Cao đẳng Lý Tự Trọng Thành phố Hồ Chí Minh', 'LY TU TRONG COLLEGE OF HO CHI MINH CITY'],
    catalogSources: [
      HCMC_GDNN_SOURCE,
      {
        title: 'Trường Cao đẳng Lý Tự Trọng TP.HCM',
        url: 'https://gdnn.tphcm.gov.vn/truong-cao-dang-ly-tu-trong-tphcm',
        type: 'official-local-authority',
        authority: 'Sở GD&ĐT TP.HCM',
        checkedAt: '2026-08-22',
      },
      {
        title: 'Trường Cao đẳng Lý Tự Trọng TP.HCM',
        url: 'https://www.lttc.edu.vn',
        type: 'official-institution',
        checkedAt: '2026-08-22',
      },
    ],
  },
  {
    id: 'hepc',
    shortName: 'HEPC',
    name: 'Trường Cao đẳng Điện lực TP.HCM',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'public',
    region: 'hcm',
    entityLevel: 'vocational_college',
    aliases: ['Trường Cao đẳng Điện lực Thành phố Hồ Chí Minh'],
    catalogSources: [
      HCMC_GDNN_SOURCE,
      {
        title: 'Trường Cao đẳng Điện lực TP.HCM',
        url: 'https://gdnn.tphcm.gov.vn/truong-cao-dang-dien-luc-tphcm',
        type: 'official-local-authority',
        authority: 'Sở GD&ĐT TP.HCM',
        checkedAt: '2026-08-22',
      },
      {
        title: 'Trường Cao đẳng Điện lực TP.HCM',
        url: 'http://www.hepc.edu.vn',
        type: 'official-institution',
        checkedAt: '2026-08-22',
      },
    ],
  },
  {
    id: 'vhnthcm',
    shortName: 'VHNT-HCM',
    name: 'Trường Cao đẳng Văn hóa Nghệ thuật TP.HCM',
    admissionCode: 'CDD0215',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'public',
    region: 'hcm',
    entityLevel: 'vocational_college',
    aliases: ['Trường Cao đẳng Văn hóa Nghệ thuật Thành phố Hồ Chí Minh'],
    catalogSources: [
      HCMC_GDNN_SOURCE,
      {
        title: 'Trường Cao đẳng Văn hóa nghệ thuật TP.HCM',
        url: 'https://gdnn.tphcm.gov.vn/truong-cao-dang-van-hoa-nghe-thuat-tphcm',
        type: 'official-local-authority',
        authority: 'Sở GD&ĐT TP.HCM',
        checkedAt: '2026-08-22',
      },
      {
        title: 'Trường Cao đẳng Văn hóa Nghệ thuật TP.HCM',
        url: 'http://www.vhnthcm.edu.vn',
        type: 'official-institution',
        checkedAt: '2026-08-22',
      },
    ],
  },
  // Catalog-expansion batch 2 (2026-09-04): cross-referenced the existing 3 `college_pedagogy`
  // entries (all under the CĐSP Trung ương umbrella) against provincial "Cao đẳng Sư phạm" schools
  // nationwide. Most provincial CĐSP have already been merged into regional Phân hiệu Đại học
  // branches or multi-disciplinary colleges (confirmed for CĐSP Điện Biên — merged into Phân hiệu
  // Đại học Thái Nguyên tại Điện Biên along with CĐ Y tế Điện Biên — and CĐSP Lạng Sơn — merged into
  // Trường Cao đẳng Lạng Sơn — both correctly NOT added). These 3 were individually verified as
  // still independent, standalone pedagogical colleges with a live official domain and an active
  // 2026 admission notice of their own:
  { id: 'cdspkg', shortName: 'CĐSPKG', name: 'Trường Cao đẳng Sư phạm Kiên Giang', location: 'Kiên Giang', ownership: 'public', region: 'other', entityLevel: 'college_pedagogy', aliases: ['CĐSP Kiên Giang'] },
  { id: 'cdsptb', shortName: 'CĐSPTB', name: 'Trường Cao đẳng Sư phạm Thái Bình', location: 'Thái Bình', ownership: 'public', region: 'other', entityLevel: 'college_pedagogy', aliases: ['CĐSP Thái Bình'] },
  { id: 'cdspbrvt', shortName: 'CĐSPBRVT', name: 'Trường Cao đẳng Sư phạm Bà Rịa - Vũng Tàu', location: 'Bà Rịa - Vũng Tàu', ownership: 'public', region: 'other', entityLevel: 'college_pedagogy', aliases: ['CĐSP Bà Rịa - Vũng Tàu'] },
  // Catalog-expansion batch 3 (2026-09-05) — Part 1: VQA (Cục Quản lý chất lượng, Bộ GD&ĐT)
  // accredited-institutions list (kd-clgd-7_2026, cập nhật 31/7/2026), successfully retrieved this
  // batch (the .rar attachment that blocked batch 2 was downloaded and extracted via a WASM-based
  // unrar library since no system unrar/7z tool was available). Its "2. Các trường cao đẳng sư
  // phạm" section lists exactly 12 accredited CĐSP nationwide. Cross-referencing against the 6
  // already-cataloged (nce/ncspnt/ncehcm/cdspkg/cdspbrvt from batches 1-2, plus this list) found 6
  // more names; batch verification found 3 already merged (CĐSP Nghệ An → Đại học Nghệ An per
  // Quyết định 1653/QĐ-TTg, already documented on the existing `naue` entry since batch 2; CĐSP
  // Thừa Thiên Huế → merged Feb 2024 with 2 other Huế vocational colleges into "Trường Cao đẳng
  // Huế" per Quyết định 147/QĐ-LĐTBXH; CĐSP Đà Lạt → merged Aug 2022 with Đà Lạt's vocational and
  // technical-economic colleges into "Trường Cao đẳng Đà Lạt") and 3 still independent with a live
  // official domain and an active 2026 admission notice:
  { id: 'cdspnd', shortName: 'CĐSPND', name: 'Trường Cao đẳng Sư phạm Nam Định', location: 'Nam Định', ownership: 'public', region: 'other', entityLevel: 'college_pedagogy', aliases: ['CĐSP Nam Định'] },
  { id: 'cdspbn', shortName: 'CĐSPBN', name: 'Trường Cao đẳng Sư phạm Bắc Ninh', location: 'Bắc Ninh', ownership: 'public', region: 'other', entityLevel: 'college_pedagogy', aliases: ['CĐSP Bắc Ninh'] },
  { id: 'cdsphb', shortName: 'CĐSPHB', name: 'Trường Cao đẳng Sư phạm Hòa Bình', location: 'Hòa Bình', ownership: 'public', region: 'other', entityLevel: 'college_pedagogy', aliases: ['CĐSP Hòa Bình'] },
  // Catalog-expansion batch 3 — Part 2: the 3 successor multi-disciplinary colleges formed by the
  // mergers found above/in batch 2 (Trường Cao đẳng Huế, Trường Cao đẳng Đà Lạt) plus the batch-2-
  // documented CĐSP Lạng Sơn merger target (Trường Cao đẳng Lạng Sơn, mentioned only in a comment
  // above until now, never actually added as its own catalog entry) — these are themselves genuine,
  // currently-independent vocational colleges with their own live official domain and active 2026
  // admission content, so they belong in the catalog even though the pedagogical college they
  // absorbed does not get a separate entry:
  {
    id: 'cdhue', shortName: 'CĐ Huế', name: 'Trường Cao đẳng Huế', location: 'Huế', ownership: 'public', region: 'other',
    entityLevel: 'vocational_college', aliases: ['Hue College'],
    catalogSources: [{ title: 'Trường Cao đẳng Huế', url: 'https://cdhue.edu.vn/', type: 'official-institution', checkedAt: '2026-09-05' }],
  },
  {
    id: 'cddl', shortName: 'CĐ Đà Lạt', name: 'Trường Cao đẳng Đà Lạt', location: 'Lâm Đồng', ownership: 'public', region: 'other',
    entityLevel: 'vocational_college', aliases: ['Dalat College'],
    catalogSources: [{ title: 'Trường Cao Đẳng Đà Lạt', url: 'https://cddl.edu.vn/', type: 'official-institution', checkedAt: '2026-09-05' }],
  },
  {
    id: 'lce', shortName: 'CĐ Lạng Sơn', name: 'Trường Cao đẳng Lạng Sơn', location: 'Lạng Sơn', ownership: 'public', region: 'other',
    entityLevel: 'vocational_college',
    catalogSources: [{ title: 'Trường Cao đẳng Lạng Sơn', url: 'https://lce.edu.vn/', type: 'official-institution', checkedAt: '2026-09-05' }],
  },
  // Catalog-expansion batch 3 — Part 3: re-pulled the Đà Nẵng GDNN list already cited in this
  // file's `collegeCatalogSources` (danang.edu.vn, "đến 08/4/2025") — the .xlsx attachment
  // downloaded cleanly this time (unlike the earlier .rar blocker) and was parsed directly
  // (openxml shared-strings + row data), giving an authoritative ownership classification (Công
  // lập/Tư thục/FDI column) per institution rather than guessing from secondary aggregators. Of its
  // 17 "Trường cao đẳng" rows, 4 were already cataloged (Thương mại/`cdtm`, Du lịch Đà Nẵng/`dvtc`,
  // Lương thực-Thực phẩm/`cfi`, nghề Đà Nẵng/`danangcollege`); these 9 are the confirmed-missing,
  // live-domain-verified remainder. "Trường Cao đẳng Văn hóa - Nghệ thuật Đà Nẵng" (also on this
  // list, public) was NOT added — see "Not added / needs review" in the batch 3 report.
  {
    id: 'gtvttw5',
    shortName: 'GTVT TW V',
    name: 'Trường Cao đẳng Giao thông vận tải Trung ương V',
    location: 'Đà Nẵng',
    province: 'Đà Nẵng',
    ownership: 'public',
    region: 'other',
    entityLevel: 'vocational_college',
    aliases: ['Cao đẳng Giao thông vận tải Trung ương V', 'Trường Cao đẳng Giao thông vận tải II'],
    catalogSources: [
      DANANG_GDNN_SOURCE,
      { title: 'Trường Cao đẳng Giao thông vận tải Trung ương V', url: 'http://www.caodanggtvttw5.edu.vn/', type: 'official-institution', checkedAt: '2026-09-05' },
    ],
  },
  {
    id: 'cep',
    shortName: 'CEP',
    name: 'Trường Cao đẳng Kinh tế - Kế hoạch Đà Nẵng',
    location: 'Đà Nẵng',
    province: 'Đà Nẵng',
    ownership: 'public',
    region: 'other',
    entityLevel: 'vocational_college',
    aliases: ['Cao đẳng Kinh tế - Kế hoạch Đà Nẵng'],
    catalogSources: [
      DANANG_GDNN_SOURCE,
      {
        title: 'Trường Cao đẳng Kinh tế Kế hoạch Đà Nẵng (cep.edu.vn) — domain xác nhận qua nhiều nguồn tuyển sinh liên kết; trang chủ trả lỗi 500 tạm thời tại thời điểm kiểm tra 2026-09-05',
        url: 'https://cep.edu.vn/',
        type: 'official-institution',
        checkedAt: '2026-09-05',
      },
    ],
  },
  {
    id: 'hscdn',
    shortName: 'HSC',
    name: 'Trường Cao đẳng nghề Hoa Sen (cơ sở Đà Nẵng)',
    location: 'Đà Nẵng',
    province: 'Đà Nẵng',
    ownership: 'private',
    region: 'other',
    entityLevel: 'vocational_college',
    aliases: ['Hoa Sen College', 'Cao đẳng Hoa Sen'],
    catalogSources: [
      DANANG_GDNN_SOURCE,
      { title: 'Trường Cao Đẳng Nghề Hoa Sen', url: 'https://hsc.edu.vn/', type: 'official-institution', checkedAt: '2026-09-05' },
    ],
  },
  {
    id: 'nvtc',
    shortName: 'NVTC',
    name: 'Trường Cao đẳng Nguyễn Văn Trỗi',
    location: 'Đà Nẵng',
    province: 'Đà Nẵng',
    ownership: 'private',
    region: 'other',
    entityLevel: 'vocational_college',
    aliases: ['Nguyen Van Troi College', 'Cao đẳng nghề Nguyễn Văn Trỗi'],
    catalogSources: [
      DANANG_GDNN_SOURCE,
      { title: 'Trường cao đẳng Nguyễn Văn Trỗi – Đà Nẵng', url: 'https://nguyenvantroicollege.edu.vn/', type: 'official-institution', checkedAt: '2026-09-05' },
    ],
  },
  {
    id: 'cdpd',
    shortName: 'CĐPĐ',
    name: 'Trường Cao đẳng Phương Đông Đà Nẵng',
    location: 'Đà Nẵng',
    province: 'Đà Nẵng',
    ownership: 'private',
    region: 'other',
    entityLevel: 'vocational_college',
    aliases: ['Phuong Dong College Da Nang'],
    catalogSources: [
      DANANG_GDNN_SOURCE,
      { title: 'Trường Cao Đẳng Phương Đông Đà Nẵng', url: 'http://cdpd.edu.vn/', type: 'official-institution', checkedAt: '2026-09-05' },
    ],
  },
  {
    id: 'dpcdn',
    shortName: 'DPC',
    name: 'Trường Cao đẳng Bách khoa Đà Nẵng',
    location: 'Đà Nẵng',
    province: 'Đà Nẵng',
    ownership: 'private',
    region: 'other',
    entityLevel: 'vocational_college',
    aliases: ['Danang Polytechnic College', 'Cao đẳng Bách khoa Đà Nẵng'],
    catalogSources: [
      DANANG_GDNN_SOURCE,
      { title: 'Trường Cao đẳng Bách khoa Đà Nẵng', url: 'https://www.bachkhoadanang.edu.vn/', type: 'official-institution', checkedAt: '2026-09-05' },
    ],
  },
  {
    id: 'vavc',
    shortName: 'VAVC',
    name: 'Trường Cao đẳng nghề Việt - Úc',
    location: 'Đà Nẵng',
    province: 'Đà Nẵng',
    ownership: 'private',
    region: 'other',
    entityLevel: 'vocational_college',
    aliases: ['Vietnam-Australia College', 'Cao đẳng nghề Việt Úc'],
    catalogSources: [
      DANANG_GDNN_SOURCE,
      { title: 'TRƯỜNG CAO ĐẲNG NGHỀ VIỆT - ÚC', url: 'https://vavc.edu.vn/', type: 'official-institution', checkedAt: '2026-09-05' },
    ],
  },
  {
    id: 'dvcdn',
    shortName: 'ĐVC-ĐN',
    name: 'Trường Cao đẳng Đại Việt Đà Nẵng',
    location: 'Đà Nẵng',
    province: 'Đà Nẵng',
    ownership: 'private',
    region: 'other',
    entityLevel: 'vocational_college',
    aliases: ['Da Viet Da Nang College', 'Cao đẳng Đại Việt Đà Nẵng'],
    catalogSources: [
      DANANG_GDNN_SOURCE,
      { title: 'Trường Cao đẳng Đại Việt Đà Nẵng', url: 'https://daivietdanang.edu.vn/', type: 'official-institution', checkedAt: '2026-09-05' },
    ],
  },
  {
    id: 'cdyd-vn',
    shortName: 'CNYD-VN',
    name: 'Trường Cao đẳng Công nghệ Y - Dược Việt Nam',
    location: 'Đà Nẵng',
    province: 'Đà Nẵng',
    ownership: 'private',
    region: 'other',
    entityLevel: 'vocational_college',
    aliases: ['Vietnam Medical Technology College', 'Cao đẳng Công nghệ Y - Dược Việt Nam'],
    catalogSources: [
      DANANG_GDNN_SOURCE,
      { title: 'Trường Cao đẳng Công nghệ Y - Dược Việt Nam', url: 'https://caodangyduocvietnam.edu.vn/', type: 'official-institution', checkedAt: '2026-09-05' },
    ],
  },
  // Catalog-expansion batch 3 — Part 4: re-pulled the HCMC GDNN directory already cited in this
  // file's `collegeCatalogSources` (gdnn.tphcm.gov.vn) — its homepage "cơ sở tiêu biểu" widget
  // (confirmed via raw HTML fetch, excluding unrelated rotating og:title/twitter:title meta noise)
  // lists 10 Cao đẳng institutions; 8 were already cataloged, these 2 are the confirmed-missing
  // remainder (own official .edu.vn domain verified live for both):
  {
    id: 'ctim',
    shortName: 'CTIM',
    name: 'Trường Cao đẳng Bán công Công nghệ và Quản trị doanh nghiệp',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'public',
    region: 'hcm',
    entityLevel: 'vocational_college',
    aliases: ['CTIM', 'College of Technology and Industrial Management'],
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Cao đẳng CTIM', url: 'https://ctim.edu.vn/', type: 'official-institution', checkedAt: '2026-09-05' },
    ],
  },
  {
    id: 'ctdthuduc',
    shortName: 'CTD-TĐ',
    name: 'Trường Cao đẳng Kinh tế - Kỹ thuật Thủ Đức',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'public',
    region: 'hcm',
    entityLevel: 'vocational_college',
    aliases: ['Trường Cao Đẳng Kinh Tế Kỹ Thuật Thủ Đức'],
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Trường Cao Đẳng Kinh Tế Kỹ Thuật Thủ Đức', url: 'https://tuyensinh.ctdthuduc.edu.vn/', type: 'official-institution', checkedAt: '2026-09-05' },
    ],
  },
  // Catalog-expansion batch 4 (2026-09-07): cross-referenced against a secondary-source "mã trường"
  // admission-code roster (vietjack.com, lead-generator only per source-priority rule). Live official
  // admission portal confirmed with active 2026 recruitment notices. Note for a future batch: press
  // coverage (dantri.com.vn, Nov 2025) describes an UNEXECUTED "phương án sắp xếp" (reorganization
  // proposal) to merge this school into Trường Cao đẳng Kinh tế - Kỹ thuật Cần Thơ — not yet enacted
  // as of this batch (the school's own domain still independently publishes 2026 admission content
  // under its own name), so added as still-independent, but this should be re-checked in a later
  // batch in case the merger proceeds.
  {
    id: 'cdct',
    shortName: 'CDCT',
    name: 'Trường Cao đẳng Cần Thơ',
    location: 'Cần Thơ',
    province: 'Cần Thơ',
    ownership: 'public',
    region: 'other',
    entityLevel: 'vocational_college',
    catalogSources: [
      { title: 'Trường Cao đẳng Cần Thơ - Cổng thông tin tuyển sinh', url: 'https://tuyensinh.cdct.edu.vn/', type: 'official-institution', checkedAt: '2026-09-07' },
    ],
  },
  // Catalog-expansion batch 6 (2026-09-08): full HCMC GDNN directory sweep (gdnn.tphcm.gov.vn),
  // driven live via chrome-devtools (blocked in batches 3-5 by a shared/concurrent browser profile —
  // not a blocker this session). The directory's own search-results HTML turned out to be plain
  // server-rendered markup (no AJAX endpoint needed) once fetched with the right pagenumber query
  // param; paginated through all 31 pages (306 listed institutions total). Filtered to `Trường Cao
  // đẳng` (college) tier only — `Trường Trung cấp` (intermediate) and `Trung tâm GDNN-GDTX`
  // (district-level continuing-ed centers) are below this catalog's tertiary scope, and entries
  // suffixed "(địa điểm đào tạo)"/"Phân hiệu" are branch training locations of institutions
  // headquartered elsewhere, not independent entities per the dedup rule. Of 68 unique Cao đẳng-tier
  // names found, most were already cataloged (cross-checked by name AND by each institution's own
  // domain, since some existing entries only cite the GDNN directory URL as source rather than the
  // school's direct domain); a few had stale/dead domains in the registry (`ctd.edu.vn` for the
  // already-cataloged Cao đẳng Kinh tế - Kỹ thuật Thủ Đức doesn't resolve — its real live domain is
  // `tuyensinh.ctdthuduc.edu.vn`, already correctly cataloged as `ctdthuduc`) and were left alone.
  // The 23 entries below are the confirmed-new remainder: each one's own official domain (as listed
  // by the GDNN directory) was independently live-checked (HTTP 200) this batch. Ownership
  // (`public`/`private`) was set only where a reliable signal existed — an explicit supervising
  // ministry/agency (Bộ Công Thương, Bộ GTVT, Cục Hàng hải và Đường thủy VN, UBND TP.HCM, a state
  // corporation) for `public`, or well-established public identity for well-known private brands
  // (iSPACE, Việt Mỹ, Kent, Bách Việt, Aurora/Bình Minh Sài Gòn, BKC, Đồng An) for `private` — cross-
  // checked against independent web search where the GDNN detail page's own "Loại hình" field proved
  // unreliable (it mislabeled the well-documented-private Trường Cao đẳng Viễn Đông as "Công lập";
  // corrected here using the school's own public-facing "ngoài công lập" self-description instead).
  // A further ~14 Cao đẳng-tier names surfaced in the same sweep (Trường Cao đẳng Miền Nam, Sài Gòn,
  // Sài Gòn Gia Định, Đại Việt Sài Gòn, Văn Lang Sài Gòn, Quốc tế TP.HCM/ICH, Kinh tế - Công nghệ
  // TP.HCM/HIAST, Kỹ thuật - Du lịch Sài Gòn/STC, Khoa học - Công nghệ TP.HCM/HCST, Du lịch Sài Gòn,
  // Công nghệ thông tin TP.HCM/ITC, Du lịch Vũng Tàu/VTVC, Cao đẳng quốc tế VABIS, Cao đẳng nghề Kỹ
  // thuật thiết bị y tế miền Nam) with live official-looking domains but NO reliable ownership signal
  // (VABIS's registry-listed domain `caodangtueduc.edu.vn` doesn't match the school's own name/brand
  // at all — needs individual re-check before adding) — left OUT of this batch rather than guess the
  // ownership field; see "Not added / needs review" in docs/catalog-expansion-report.md Batch 6.
  {
    id: 'hcc2',
    shortName: 'HCC2',
    name: 'Trường Cao đẳng Xây dựng TP.HCM',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'public',
    region: 'hcm',
    entityLevel: 'vocational_college',
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Trường Cao đẳng Xây dựng TP.HCM', url: 'http://www.hcc2.edu.vn', type: 'official-institution', checkedAt: '2026-09-08' },
    ],
  },
  {
    id: 'cdnghehcm',
    shortName: 'CĐN TP.HCM',
    name: 'Trường Cao đẳng nghề Thành phố Hồ Chí Minh',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'public',
    region: 'hcm',
    entityLevel: 'vocational_college',
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Trường Cao đẳng nghề Thành phố Hồ Chí Minh', url: 'http://www.caodangnghehcm.edu.vn', type: 'official-institution', checkedAt: '2026-09-08' },
    ],
  },
  {
    id: 'cdntt',
    shortName: 'NTT',
    name: 'Trường Cao đẳng Kỹ thuật Nguyễn Trường Tộ',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'public',
    region: 'hcm',
    entityLevel: 'vocational_college',
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Trường Cao đẳng Kỹ thuật Nguyễn Trường Tộ', url: 'https://www.nguyentruongto.edu.vn', type: 'official-institution', checkedAt: '2026-09-08' },
    ],
  },
  {
    id: 'cdytbd',
    shortName: 'CĐYT BD',
    name: 'Trường Cao đẳng Y tế Bình Dương',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'public',
    region: 'hcm',
    entityLevel: 'vocational_college',
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Trường Cao đẳng Y tế Bình Dương', url: 'https://cdytbinhduong.edu.vn/', type: 'official-institution', checkedAt: '2026-09-08' },
    ],
  },
  {
    id: 'viethanbd',
    shortName: 'VKC',
    name: 'Trường Cao đẳng Việt Nam - Hàn Quốc Bình Dương',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'public',
    region: 'hcm',
    entityLevel: 'vocational_college',
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Trường Cao đẳng Việt Nam - Hàn Quốc Bình Dương', url: 'https://viethanbd.edu.vn/', type: 'official-institution', checkedAt: '2026-09-08' },
    ],
  },
  {
    id: 'bctech',
    shortName: 'BCTECH',
    name: 'Trường Cao đẳng Kỹ thuật Công nghệ Bà Rịa - Vũng Tàu',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'public',
    region: 'hcm',
    entityLevel: 'vocational_college',
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Trường Cao đẳng Kỹ thuật Công nghệ Bà Rịa - Vũng Tàu', url: 'https://bctech.edu.vn', type: 'official-institution', checkedAt: '2026-09-08' },
    ],
  },
  {
    id: 'cdytbrvt',
    shortName: 'CĐYT BRVT',
    name: 'Trường Cao đẳng Y tế tỉnh BRVT',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'public',
    region: 'hcm',
    entityLevel: 'vocational_college',
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Trường Cao đẳng Y tế tỉnh BRVT', url: 'https://hsbrvt.edu.vn', type: 'official-institution', checkedAt: '2026-09-08' },
    ],
  },
  {
    id: 'pvc',
    shortName: 'PVC',
    name: 'Trường Cao đẳng Dầu khí',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'public',
    region: 'hcm',
    entityLevel: 'vocational_college',
    aliases: ['PetroVietnam College'],
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Trường Cao đẳng Dầu khí (Tập đoàn Công nghiệp-Năng lượng Quốc gia Việt Nam)', url: 'https://pvcollege.edu.vn/', type: 'official-institution', checkedAt: '2026-09-08' },
    ],
  },
  {
    id: 'cofer',
    shortName: 'COFER',
    name: 'Trường Cao đẳng Kinh tế đối ngoại',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'public',
    region: 'hcm',
    entityLevel: 'vocational_college',
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Trường Cao đẳng Kinh tế đối ngoại (Bộ Công Thương)', url: 'http://www.cofer.edu.vn/', type: 'official-institution', checkedAt: '2026-09-08' },
    ],
  },
  {
    id: 'vov2',
    shortName: 'PTTH II',
    name: 'Trường Cao đẳng Phát thanh - Truyền hình II',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'public',
    region: 'hcm',
    entityLevel: 'vocational_college',
    aliases: ['Trường Cao đẳng Phát thanh Truyền hình II'],
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Trường Cao đẳng Phát thanh - Truyền hình II', url: 'http://www.vov.edu.vn', type: 'official-institution', checkedAt: '2026-09-08' },
    ],
  },
  {
    id: 'caothang',
    shortName: 'CAO THẮNG',
    name: 'Trường Cao đẳng Kỹ thuật Cao Thắng',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'public',
    region: 'hcm',
    entityLevel: 'vocational_college',
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Trường Cao đẳng Kỹ thuật Cao Thắng (Bộ Công Thương)', url: 'http://www.caothang.edu.vn', type: 'official-institution', checkedAt: '2026-09-08' },
    ],
  },
  {
    id: 'hitu',
    shortName: 'HITU',
    name: 'Trường Cao đẳng Công thương TP.HCM',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'public',
    region: 'hcm',
    entityLevel: 'vocational_college',
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Trường Cao đẳng Công thương TP.HCM', url: 'http://www.hitu.edu.vn', type: 'official-institution', checkedAt: '2026-09-08' },
    ],
  },
  {
    id: 'cdhh2',
    shortName: 'HÀNG HẢI II',
    name: 'Trường Cao đẳng Hàng Hải và Đường thủy II',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'public',
    region: 'hcm',
    entityLevel: 'vocational_college',
    aliases: ['Trường Cao đẳng Hàng Hải II'],
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Trường Cao đẳng Hàng Hải và Đường thủy II (Cục Hàng hải và Đường thủy Việt Nam)', url: 'https://www.cdhanghai.edu.vn', type: 'official-institution', checkedAt: '2026-09-08' },
    ],
  },
  {
    id: 'cvct3',
    shortName: 'GTVT TW3',
    name: 'Trường Cao đẳng Giao thông Vận tải Trung ương III',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'public',
    region: 'hcm',
    entityLevel: 'vocational_college',
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Trường Cao đẳng Giao thông Vận tải Trung ương III (Bộ Giao thông Vận tải)', url: 'http://www.cvct3.edu.vn', type: 'official-institution', checkedAt: '2026-09-08' },
    ],
  },
  {
    id: 'vetc',
    shortName: 'VETC',
    name: 'Trường Cao đẳng Công nghệ TP. Hồ Chí Minh',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'public',
    region: 'hcm',
    entityLevel: 'vocational_college',
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Trường Cao đẳng Công nghệ TP. Hồ Chí Minh (Tập đoàn Dệt May Việt Nam)', url: 'http://vetc.edu.vn', type: 'official-institution', checkedAt: '2026-09-08' },
    ],
  },
  {
    id: 'aurora',
    shortName: 'AURORA',
    name: 'Trường Cao đẳng Bình Minh Sài Gòn',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'private',
    region: 'hcm',
    entityLevel: 'vocational_college',
    aliases: ['Aurora Saigon College'],
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Trường Cao đẳng Bình Minh Sài Gòn', url: 'http://www.aurora.edu.vn', type: 'official-institution', checkedAt: '2026-09-08' },
    ],
  },
  {
    id: 'bkc',
    shortName: 'BKC',
    name: 'Trường Cao đẳng Bách Khoa Sài Gòn',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'private',
    region: 'hcm',
    entityLevel: 'vocational_college',
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Trường Cao đẳng Bách Khoa Sài Gòn', url: 'https://www.bkc.edu.vn', type: 'official-institution', checkedAt: '2026-09-08' },
    ],
  },
  {
    id: 'viendong',
    shortName: 'VIỄN ĐÔNG',
    name: 'Trường Cao đẳng Viễn Đông',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'private',
    region: 'hcm',
    entityLevel: 'vocational_college',
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Trường Cao đẳng Viễn Đông', url: 'http://www.viendong.edu.vn', type: 'official-institution', checkedAt: '2026-09-08' },
      {
        title: 'Trường Cao Đẳng Viễn Đông đạt danh hiệu "Trường Cao đẳng chất lượng cao" (self-description confirms "ngoài công lập")',
        url: 'https://www.viendong.edu.vn/truong-cao-dang-vien-dong-dat-danh-hieu-truong-cao-dang-chat-luong-cao.html',
        type: 'official-institution',
        checkedAt: '2026-09-08',
      },
    ],
  },
  {
    id: 'ispace',
    shortName: 'iSPACE',
    name: 'Trường Cao đẳng An ninh mạng iSPACE',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'private',
    region: 'hcm',
    entityLevel: 'vocational_college',
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Trường Cao đẳng An ninh mạng iSPACE', url: 'http://www.ispace.edu.vn', type: 'official-institution', checkedAt: '2026-09-08' },
    ],
  },
  {
    id: 'vietmy',
    shortName: 'VIỆT MỸ',
    name: 'Trường Cao đẳng Việt Mỹ',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'private',
    region: 'hcm',
    entityLevel: 'vocational_college',
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Trường Cao đẳng Việt Mỹ', url: 'http://www.caodangvietmy.edu.vn', type: 'official-institution', checkedAt: '2026-09-08' },
    ],
  },
  {
    id: 'kentc',
    shortName: 'KENT',
    name: 'Trường Cao đẳng Quốc tế Kent',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'private',
    region: 'hcm',
    entityLevel: 'vocational_college',
    aliases: ['Kent International College'],
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Trường Cao đẳng Quốc tế Kent', url: 'http://www.kent.edu.vn', type: 'official-institution', checkedAt: '2026-09-08' },
    ],
  },
  {
    id: 'bachviet',
    shortName: 'BÁCH VIỆT',
    name: 'Trường Cao đẳng Bách khoa Bách Việt',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'private',
    region: 'hcm',
    entityLevel: 'vocational_college',
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Trường Cao đẳng Bách khoa Bách Việt', url: 'https://www.bachvietpolytechnic.edu.vn/', type: 'official-institution', checkedAt: '2026-09-08' },
    ],
  },
  {
    id: 'dongan',
    shortName: 'ĐỒNG AN',
    name: 'Trường Cao đẳng Công nghệ cao Đồng An',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'private',
    region: 'hcm',
    entityLevel: 'vocational_college',
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Trường Cao đẳng Công nghệ cao Đồng An', url: 'https://dongan.edu.vn/', type: 'official-institution', checkedAt: '2026-09-08' },
    ],
  },
  // Catalog-expansion batch 7 (2026-09-09): resolves 12 of the ~14 Batch-6 "needs review" leftovers
  // using the same WHOIS + tax-registry method that closed the Ngoại thương case in batch 6. For each
  // candidate: (1) VNNIC WHOIS (whois.vnnic.vn, official web lookup form) confirmed the domain is
  // registered directly to the school's own legal name (or a decision-numbered predecessor name — see
  // per-entry note), ruling out reseller/mirror domains; (2) ownership type was NOT taken from the
  // GDNN directory's own unreliable "Loại hình" field, but from an independent structural/documentary
  // signal: masothue.com business-type "Công ty TNHH ... ngoài NN" (non-state LLC) is unambiguous
  // private; a school-published "Hội đồng quản trị" (Board of Directors, with a "Chủ tịch HĐQT") is
  // legally exclusive to trường tư thục under Vietnamese education law (public colleges instead have a
  // "Hội đồng trường") and was used as an equally authoritative private signal where masothue's generic
  // "Các tổ chức kinh tế khác" bucket was ambiguous; an explicit supervising-ministry citation (e.g.
  // "đơn vị sự nghiệp công lập trực thuộc Bộ Văn hóa, Thể thao và Du lịch") was used for public. Each
  // domain was also live-checked (2026 admission content) this batch. Two Batch-6 leftovers remain
  // excluded — HIAST (hiast.edu.vn: domain WHOIS-confirmed school-owned, but no reliable ownership
  // signal found after masothue address-mismatch + no Hội đồng quản trị/trường evidence located; the
  // GDNN "Công lập" field and a web search's own inferred "chịu quản lý hành chính theo lãnh thổ của
  // UBND TP.HCM ⇒ công lập" reasoning were both rejected as unreliable, per the standing rule) and
  // VABIS (caodangtueduc.edu.vn WHOIS-confirmed registered to an unrelated private company, "Công ty
  // cổ phần giáo dục Tuệ Đức Bách Khoa" — domain fails the ownership-signal test, not just unconfirmed
  // ownership). Also re-checked the two dead-domain leftovers: Trường Cao đẳng Y Dược Hồng Đức
  // (hongduccollege.edu.vn — WHOIS confirms registrant "Trường Cao đẳng Y Dược Hồng Đức", exact legal
  // name match, but the site itself still returns `ECONNREFUSED` on a fresh check — content
  // unreachable, so NOT added) and Trường Cao đẳng Văn hóa Nghệ thuật và Du lịch Sài Gòn
  // (daihocdulich.edu.vn — WHOIS now returns "chưa cấp phát", i.e. currently unregistered, confirming
  // the domain is dead rather than merely unresolving — no live official domain found, NOT added). See
  // "Batch 7" in docs/catalog-expansion-report.md for the full per-candidate evidence.
  {
    id: 'cdmiennam',
    shortName: 'CĐ MIỀN NAM',
    name: 'Trường Cao đẳng Miền Nam',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'private',
    region: 'hcm',
    entityLevel: 'vocational_college',
    aliases: ['Trường Cao đẳng Kinh tế - Kỹ thuật Miền Nam'],
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Trường Cao Đẳng Miền Nam (cdmiennam.edu.vn)', url: 'https://cdmiennam.edu.vn/', type: 'official-institution', checkedAt: '2026-09-09' },
    ],
  },
  {
    id: 'saigontech',
    shortName: 'CĐ SÀI GÒN',
    name: 'Trường Cao đẳng Sài Gòn',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'private',
    region: 'hcm',
    entityLevel: 'vocational_college',
    aliases: ['SaigonTech', 'Trường Cao đẳng Nghề Sài Gòn'],
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Cao Đẳng Sài Gòn / SaigonTech (caodangsaigon.edu.vn)', url: 'https://caodangsaigon.edu.vn/', type: 'official-institution', checkedAt: '2026-09-09' },
    ],
  },
  {
    id: 'sgc',
    shortName: 'SGC',
    name: 'Trường Cao đẳng Sài Gòn Gia Định',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'private',
    region: 'hcm',
    entityLevel: 'vocational_college',
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Trường Cao Đẳng Sài Gòn Gia Định (sgc.edu.vn)', url: 'https://sgc.edu.vn/', type: 'official-institution', checkedAt: '2026-09-09' },
    ],
  },
  {
    id: 'daivietsg',
    shortName: 'ĐẠI VIỆT SG',
    name: 'Trường Cao đẳng Đại Việt Sài Gòn',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'private',
    region: 'hcm',
    entityLevel: 'vocational_college',
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Trường Cao đẳng Đại Việt Sài Gòn (daivietsaigon.edu.vn)', url: 'https://daivietsaigon.edu.vn/', type: 'official-institution', checkedAt: '2026-09-09' },
    ],
  },
  {
    id: 'vlsc',
    shortName: 'VLSC',
    name: 'Trường Cao đẳng Văn Lang Sài Gòn',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'private',
    region: 'hcm',
    entityLevel: 'vocational_college',
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Trường Cao Đẳng Văn Lang Sài Gòn (vanlangsaigon.edu.vn)', url: 'https://vanlangsaigon.edu.vn/', type: 'official-institution', checkedAt: '2026-09-09' },
    ],
  },
  {
    id: 'ich',
    shortName: 'ICH',
    name: 'Trường Cao đẳng Quốc tế Thành phố Hồ Chí Minh',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'private',
    region: 'hcm',
    entityLevel: 'vocational_college',
    aliases: ['ICH'],
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Trường Cao Đẳng Quốc Tế TP.HCM (ich.edu.vn)', url: 'https://ich.edu.vn/', type: 'official-institution', checkedAt: '2026-09-09' },
    ],
  },
  {
    id: 'stc',
    shortName: 'STC',
    name: 'Trường Cao đẳng Kỹ thuật - Du lịch Sài Gòn',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'private',
    region: 'hcm',
    entityLevel: 'vocational_college',
    aliases: ['STC'],
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Trường Cao đẳng Kỹ thuật – Du lịch Sài Gòn (stc.edu.vn)', url: 'https://stc.edu.vn/', type: 'official-institution', checkedAt: '2026-09-09' },
    ],
  },
  {
    id: 'hcst',
    shortName: 'HCST',
    name: 'Trường Cao đẳng Khoa học - Công nghệ TP.HCM',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'private',
    region: 'hcm',
    entityLevel: 'vocational_college',
    aliases: ['HCST'],
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Trường Cao đẳng Khoa học – Công nghệ TP.HCM (hcst.edu.vn)', url: 'https://hcst.edu.vn/', type: 'official-institution', checkedAt: '2026-09-09' },
    ],
  },
  {
    id: 'dlsg',
    shortName: 'CĐ DU LỊCH SG',
    name: 'Trường Cao đẳng Du lịch Sài Gòn',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'private',
    region: 'hcm',
    entityLevel: 'vocational_college',
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Trường Cao Đẳng Du Lịch Sài Gòn (dulichsaigon.edu.vn)', url: 'https://dulichsaigon.edu.vn/', type: 'official-institution', checkedAt: '2026-09-09' },
    ],
  },
  {
    id: 'itc',
    shortName: 'ITC',
    name: 'Trường Cao đẳng Công nghệ Thông tin TP.HCM',
    location: 'TP.HCM',
    province: 'TP.HCM',
    ownership: 'private',
    region: 'hcm',
    entityLevel: 'vocational_college',
    aliases: ['ITC', 'Trường Cao Đẳng Dân Lập Công Nghệ Thông Tin TP.HCM'],
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Trường Cao đẳng Công nghệ Thông tin TP.Hồ Chí Minh (itc.edu.vn)', url: 'https://itc.edu.vn/', type: 'official-institution', checkedAt: '2026-09-09' },
    ],
  },
  {
    id: 'vtvc',
    shortName: 'VTVC',
    name: 'Trường Cao đẳng Du lịch Vũng Tàu',
    location: 'Bà Rịa - Vũng Tàu',
    province: 'Bà Rịa - Vũng Tàu',
    ownership: 'public',
    region: 'other',
    entityLevel: 'vocational_college',
    aliases: ['VTVC'],
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Trường Cao đẳng Du lịch Vũng Tàu (vtvc.edu.vn)', url: 'http://vtvc.edu.vn/', type: 'official-institution', checkedAt: '2026-09-09' },
    ],
  },
  {
    id: 'spmet',
    shortName: 'SPMET',
    name: 'Trường Cao đẳng Kỹ thuật Thiết bị Y tế Miền Nam',
    location: 'Bình Dương',
    province: 'Bình Dương',
    ownership: 'public',
    region: 'other',
    entityLevel: 'vocational_college',
    aliases: ['SPMET'],
    catalogSources: [
      HCMC_GDNN_SOURCE,
      { title: 'Trường Cao đẳng Kỹ thuật Thiết bị Y tế Miền Nam (sp.edu.vn)', url: 'https://sp.edu.vn/', type: 'official-institution', checkedAt: '2026-09-09' },
    ],
  },
];

export const collegeCatalogKnowledgeGap = {
  id: 'college-catalog-official-admission-rules',
  label: 'Chưa nhập đủ đề án/thông báo tuyển sinh chính thức cho trường cao đẳng này.',
  status: 'incomplete' as const,
  impact: 'exact-final-score-blocking' as const,
};

export const collegeCatalogMethods: AdmissionMethodDescriptor[] = collegeCatalogSchools.map((school) => ({
  id: `${school.id}-catalog-2026`,
  schoolId: school.id,
  name: 'Thông tin tuyển sinh cao đẳng đang chờ research',
  year: 2026,
  applicantTypes: ['Thí sinh xét tuyển cao đẳng 2026'],
  capabilities: unsupportedCapabilities,
  knowledgeGaps: [collegeCatalogKnowledgeGap],
}));

export const collegeCatalogModules: Record<string, SchoolModule> = Object.fromEntries(
  collegeCatalogSchools.map((school) => [
    school.id,
    {
      id: school.id,
      name: school.name,
      shortName: school.shortName,
      admissionCode: school.admissionCode,
      about: `${school.name} (${school.location}).`,
      year: 2026,
      status: 'formula-incomplete',
      ownership: school.ownership,
      region: school.region,
      province: school.province ?? school.location,
      entityLevel: school.entityLevel,
      educationLevels: ['college'],
      aliases: school.aliases,
      catalogSources:
        (getResearchedAdmissionSource(school.id)
          ? [
              {
                title: getResearchedAdmissionSource(school.id)!.title,
                url: getResearchedAdmissionSource(school.id)!.url,
                type: 'official-institution' as const,
                checkedAt: getResearchedAdmissionSource(school.id)!.checkedAt,
              },
            ]
          : undefined) ??
        school.catalogSources ??
        (school.entityLevel === 'college_pedagogy' || ['vcte', 'dungquatcollege', 'hvct', 'cic1', 'hcmcc', 'ncc', 'cuwc', 'vietxo1', 'lilama2', 'cmc-college', 'ccst', 'hctb'].includes(school.id)
          ? [MOET_PUBLIC_UNIT_SOURCE]
          : undefined),
      vnuhcm: false,
      summary: getResearchedAdmissionSource(school.id)
        ? `Đã xác minh nguồn tuyển sinh chính thức 2026 (${getResearchedAdmissionSource(school.id)!.title}); chưa nâng lên eligibility/calculator vì còn thiếu ngưỡng/công thức đủ cấu trúc (hoặc trường không có ngưỡng điểm cạnh tranh).`
        : school.entityLevel === 'college_pedagogy'
          ? 'Có trong catalog cao đẳng sư phạm/Giáo dục Mầm non; cần đề án tuyển sinh chính thức trước khi kiểm tra điều kiện hoặc tính điểm.'
          : 'Có trong catalog cao đẳng giáo dục nghề nghiệp; không dùng chung công thức tuyển sinh đại học và cần nguồn chính thức riêng trước khi tính điểm.',
      capabilities: getResearchedAdmissionSource(school.id) ? researchedCatalogCapabilities : catalogOnlyCapabilities,
    },
  ])
);

function evaluateCollegeCatalogOnly(school: CollegeCatalogSchool): AdmissionEvaluation {
  return {
    schoolId: school.id,
    year: 2026,
    methodId: `${school.id}-catalog-2026`,
    confidence: 'unavailable',
    eligibility: {
      status: 'unknown',
      reasons: [`${school.shortName} đã có trong catalog cao đẳng, nhưng UniScoreVN chưa có nguồn chính thức đủ để kiểm tra điều kiện hoặc tính điểm.`],
    },
    missingInputs: [],
    missingRules: [collegeCatalogKnowledgeGap.label],
    missingRequirements: [{ kind: 'unsupported', code: collegeCatalogKnowledgeGap.id, label: collegeCatalogKnowledgeGap.label }],
    explanation: [],
    evidence: [],
  };
}

export const collegeCatalogComparisonAdapters: readonly SchoolComparisonAdapter[] = collegeCatalogSchools.map((school) => ({
  schoolId: school.id,
  methodId: `${school.id}-catalog-2026`,
  methodName: 'Thông tin tuyển sinh cao đẳng đang chờ research',
  buildContext() {
    return {};
  },
  evaluate(_profile: ApplicantProfile): SchoolComparisonResult {
    return { evaluation: evaluateCollegeCatalogOnly(school) };
  },
}));
