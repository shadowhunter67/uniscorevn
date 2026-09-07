import { deriveInstitutionSupportStatus, institutionCoverage, SUPPORT_STATUS_HELP, SUPPORT_STATUS_LABELS } from './institutionCoverage';
import { schoolRegistry } from '../schools';

/**
 * Render 2 khối bảng số liệu README.md (KPI + trạng thái hỗ trợ) trực tiếp từ `institutionCoverage`/
 * `schoolRegistry` — tách riêng khỏi `scripts/stats-coverage.ts` (dùng node:fs) để module thuần
 * này import được cả từ script LẪN từ test (`readmeCoverage.test.ts`, chạy trong vitest/browser-like
 * env, không có node:fs). Một nguồn render duy nhất cho cả 2 nơi — không lặp lại logic.
 */
export function renderKpiTableBody(): string {
  const rows: [string, number][] = [
    ['Mục trong danh mục/search/compare', institutionCoverage.totalCatalogEntries],
    ['Cơ sở giáo dục độc lập trong danh mục', institutionCoverage.independentEducationInstitutions],
    ['Đơn vị nội bộ/không tính vào KPI cơ sở', institutionCoverage.internalUnitEntries],
    ['Đại học / cơ sở hệ đại học', institutionCoverage.universityInstitutions],
    ['Học viện', institutionCoverage.academies],
    ['Cao đẳng sư phạm/GDMN', institutionCoverage.pedagogicalColleges],
    ['Cao đẳng giáo dục nghề nghiệp', institutionCoverage.vocationalColleges],
    ['Nhóm độc lập khác', institutionCoverage.otherIndependentInstitutions],
    ['Có dữ liệu tuyển sinh hoặc capability cao hơn', institutionCoverage.admissionDataAvailable],
    ['Chỉ kiểm tra điều kiện/ngưỡng', institutionCoverage.eligibilitySupported],
    ['Có calculator một phần', institutionCoverage.partialCalculator],
    ['Calculator đã xác minh', institutionCoverage.fullyVerified],
    ['Chỉ có trong danh mục', institutionCoverage.catalogOnly],
  ];
  return ['| KPI | Số lượng |', '|---|---:|', ...rows.map(([label, value]) => `| ${label} | ${value} |`)].join('\n');
}

const SUPPORT_STATUS_ROW_ORDER = ['verified-calculator', 'partial-calculator', 'eligibility-only', 'researched', 'catalog-only'] as const;
const SUPPORT_STATUS_MARK: Record<(typeof SUPPORT_STATUS_ROW_ORDER)[number], string> = {
  'verified-calculator': '✅',
  'partial-calculator': '🟡',
  'eligibility-only': '🟡',
  researched: '⚪',
  'catalog-only': '⚪',
};

export function renderSupportStatusTableBody(): string {
  const counts: Record<string, number> = {};
  for (const school of Object.values(schoolRegistry)) {
    const status = deriveInstitutionSupportStatus(school);
    counts[status] = (counts[status] ?? 0) + 1;
  }
  const rows = SUPPORT_STATUS_ROW_ORDER.map(
    (status) => `| ${SUPPORT_STATUS_MARK[status]} ${SUPPORT_STATUS_LABELS[status]} | ${counts[status] ?? 0} | ${SUPPORT_STATUS_HELP[status]} |`
  );
  return ['| Mức hỗ trợ | Số trường | Ý nghĩa |', '|---|---:|---|', ...rows].join('\n');
}

export const README_COVERAGE_MARKERS = {
  kpi: 'coverage:kpi',
  supportStatus: 'coverage:support-status',
} as const;

/** Trích nội dung giữa 2 marker HTML comment trong 1 chuỗi markdown — dùng cả ở test lẫn generator. */
export function extractBetweenMarkers(content: string, marker: string): string | null {
  const pattern = new RegExp(`<!-- ${marker}:start[^>]*-->\\n([\\s\\S]*?)\\n<!-- ${marker}:end -->`);
  return content.match(pattern)?.[1] ?? null;
}
