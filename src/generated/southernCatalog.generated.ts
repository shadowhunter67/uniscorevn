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
  nlu: {
    sourceId: 'nlu-admission-2026',
    title: 'Điểm sàn tuyển sinh Trường Đại học Nông Lâm TPHCM 2026',
    url: 'https://xaydungchinhsach.chinhphu.vn/tuyen-sinh-2026-diem-san-truong-dai-hoc-nong-lam-tphcm-119260701215344015.htm',
    publishedAt: '2026-07-05',
    checkedAt: '2026-08-24',
    note:
      'Official NLU (ts.hcmuaf.edu.vn) 2026 threshold notice confirmed to exist (28/06/2026, "Ngưỡng đảm bảo chất lượng đầu vào (điểm sàn)..."), cross-checked via chinhphu.vn: aggregate ranges only (16-18/30 THPT exam, 18-20/30 transcript, 601-650 ĐGNL), no per-program breakdown extracted — the official per-program table is an embedded image (nguong-dam-bao-chat-luong-2026.jpg), and 4 methods (ĐGNL, THPT, THPT+transcript, transcript-only) apply different scopes per program (Sư phạm kỹ thuật nông nghiệp follows a separate MOET-governed threshold). Left at researched; do not fabricate per-program numbers.',
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
  lhu: {
    sourceId: 'lhu-admission-2026',
    title: 'Trường Đại học Lạc Hồng - Cổng tuyển sinh 2026',
    url: 'https://tuyensinh.lhu.edu.vn/',
    checkedAt: '2026-08-24',
    note:
      'Batch 11 (2026-08-24): official tuyensinh.lhu.edu.vn portal fetched directly, confirming 5 admission methods (THPT exam; học bạ THPT; ĐGNL; V-SAT computer-based test >= 250; direct admission) exist for 2026, but the portal page itself does not expose numeric thresholds or subject combinations in extractable text. Secondary press (search-engine summary) reports a general 15/30 THPT floor with Dược/Luật/Luật kinh tế instead following the MOET-published health/law ngưỡng đảm bảo chất lượng đầu vào (announced 08/07/2026), but this was not cross-verified against lhu.edu.vn primary text, and the MOET-governed floor has no matching runtime rule yet. Left at researched; do not fabricate numbers.',
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
    summary: 'Đã đưa vào roster miền Nam theo backlog; chưa claim công thức/ngưỡng.',
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
    summary: 'Đã đưa vào roster miền Nam theo backlog; chưa nhập dữ liệu chính thức.',
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
    id: 'due',
    shortName: 'DLA',
    name: 'Trường Đại học Kinh tế Công nghiệp Long An',
    location: 'Long An',
    ownership: 'private',
    summary: 'Đã đưa vào roster miền Nam theo backlog; chưa nhập nguồn tuyển sinh chính thức.',
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
 * stay listed in `southernCatalogSchools` above for identity/location metadata only. */
const explicitRuntimeSchoolIds = new Set(['pntu', 'uah']);
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
