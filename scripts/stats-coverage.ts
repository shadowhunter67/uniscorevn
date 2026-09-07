import { readFileSync, writeFileSync } from 'node:fs';
import { institutionCoverage } from '../src/data/institutionCoverage.ts';
import { extractBetweenMarkers, README_COVERAGE_MARKERS, renderKpiTableBody, renderSupportStatusTableBody } from '../src/data/readmeCoverage.ts';

console.log('=== UniScoreVN Coverage ===');
console.log('');
console.log('Catalog');
console.log('-------');
console.log(`Total entries:                       ${institutionCoverage.totalCatalogEntries}`);
console.log(`Independent education institutions:  ${institutionCoverage.independentEducationInstitutions}`);
console.log(`Internal entities:                   ${institutionCoverage.internalUnitEntries}`);
console.log('');
console.log('By level/type');
console.log('-------------');
console.log(`University / university-level:       ${institutionCoverage.universityInstitutions}`);
console.log(`Academies:                           ${institutionCoverage.academies}`);
console.log(`Pedagogical colleges:                ${institutionCoverage.pedagogicalColleges}`);
console.log(`Vocational colleges:                 ${institutionCoverage.vocationalColleges}`);
console.log(`Other independent types:             ${institutionCoverage.otherIndependentInstitutions}`);
console.log('');
console.log('Calculator coverage');
console.log('-------------------');
console.log(`Admission data available:            ${institutionCoverage.admissionDataAvailable}`);
console.log(`Verified calculators:                ${institutionCoverage.fullyVerified}`);
console.log(`Partial:                             ${institutionCoverage.partialCalculator}`);
console.log(`Eligibility only:                    ${institutionCoverage.eligibilitySupported}`);
console.log(`Catalog only:                        ${institutionCoverage.catalogOnly}`);

/**
 * `--write`/`--check` — README.md có 2 khối bảng số liệu (marker `coverage:kpi:*`/
 * `coverage:support-status:*`) dễ lệch tay khỏi `institutionCoverage` thật (đã xảy ra 1 lần:
 * "307/295" viết nhầm 1 câu, bảng hỗ trợ cũ 111/89/42 không khớp KPI 134). `--write` regenerate 2
 * khối này từ `src/data/readmeCoverage.ts` (nguồn render DUY NHẤT, cùng module test dùng để assert
 * không drift — xem `readmeCoverage.test.ts`); `--check` (dùng cho CI) chỉ so sánh, exit 1 nếu lệch.
 */
const args = process.argv.slice(2);
const mode = args.includes('--write') ? 'write' : args.includes('--check') ? 'check' : null;
if (mode) runReadmeSync(mode);

function replaceBetweenMarkers(content: string, marker: string, body: string): { content: string; changed: boolean } {
  const current = extractBetweenMarkers(content, marker);
  if (current === null) {
    throw new Error(`Không tìm thấy marker <!-- ${marker}:start --> ... <!-- ${marker}:end --> trong README.md`);
  }
  if (current === body) return { content, changed: false };
  const pattern = new RegExp(`(<!-- ${marker}:start[^>]*-->\\n)[\\s\\S]*?(\\n<!-- ${marker}:end -->)`);
  return { content: content.replace(pattern, `$1${body}$2`), changed: true };
}

function runReadmeSync(runMode: 'write' | 'check'): void {
  const readmePath = new URL('../README.md', import.meta.url);
  const original = readFileSync(readmePath, 'utf8');

  let next = original;
  let anyChanged = false;
  for (const [marker, body] of [
    [README_COVERAGE_MARKERS.kpi, renderKpiTableBody()],
    [README_COVERAGE_MARKERS.supportStatus, renderSupportStatusTableBody()],
  ] as const) {
    const result = replaceBetweenMarkers(next, marker, body);
    next = result.content;
    anyChanged = anyChanged || result.changed;
  }

  if (runMode === 'check') {
    if (anyChanged) {
      console.error('\n[stats-coverage --check] README.md ĐANG LỆCH so với institutionCoverage thật — chạy `npm run stats:coverage -- --write` để sửa.');
      process.exitCode = 1;
    } else {
      console.log('\n[stats-coverage --check] README.md khớp institutionCoverage — OK.');
    }
    return;
  }

  writeFileSync(readmePath, next, 'utf8');
  console.log(anyChanged ? '\n[stats-coverage --write] Đã cập nhật README.md.' : '\n[stats-coverage --write] README.md đã khớp sẵn, không có gì thay đổi.');
}
