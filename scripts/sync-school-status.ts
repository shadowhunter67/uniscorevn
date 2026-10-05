/**
 * Đồng bộ các danh sách gạch đầu dòng + số đếm trong `docs/school-status.md` với `schoolRegistry`.
 * Chỉ thay các dòng `- **SHORT** — Tên` và số trong tiêu đề `## ... (N)`; giữ nguyên mọi đoạn văn khác.
 *
 * Usage: npm run docs:status          # ghi file
 *        npm run docs:status -- --check   # exit 1 nếu docs đang lệch registry
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { schoolRegistry } from '../src/schools';
import { deriveInstitutionSupportStatus } from '../src/data/institutionCoverage';

const SECTION_TITLES: Record<string, string> = {
  'verified-calculator': 'Calculator đã xác minh',
  'partial-calculator': 'Calculator một phần',
  'eligibility-only': 'Chỉ kiểm tra điều kiện/ngưỡng',
  researched: 'Đã research, chưa đủ để tính',
  'catalog-only': 'Chỉ có trong danh mục',
};

const byStatus: Record<string, string[]> = {};
for (const school of Object.values(schoolRegistry)) {
  (byStatus[deriveInstitutionSupportStatus(school)] ??= []).push(`- **${school.shortName}** — ${school.name}`);
}

const file = new URL('../docs/school-status.md', import.meta.url);
const original = readFileSync(file, 'utf8');
const eol = original.includes('\r\n') ? '\r\n' : '\n';
const lines = original.split(/\r?\n/);
const out: string[] = [];

let i = 0;
while (i < lines.length) {
  const line = lines[i];
  const heading = /^## (.+?) \(\d+\)\s*$/.exec(line);
  const status = heading && Object.entries(SECTION_TITLES).find(([, t]) => t === heading[1])?.[0];
  if (!heading || !status) { out.push(line); i += 1; continue; }

  const items = (byStatus[status] ?? []).sort((a, b) => a.localeCompare(b, 'vi'));
  out.push(`## ${heading[1]} (${items.length})`);
  i += 1;
  const body: string[] = [];
  while (i < lines.length && !lines[i].startsWith('## ')) { body.push(lines[i]); i += 1; }
  const prose = body.filter((l) => !l.startsWith('- **'));
  while (prose.length > 0 && prose[prose.length - 1].trim() === '') prose.pop();
  out.push(...prose, '', ...items, '');
}

const next = out.join(eol);
if (process.argv.includes('--check')) {
  if (next !== original) { console.error('docs/school-status.md lệch registry — chạy `npm run docs:status`.'); process.exit(1); }
  console.log('docs/school-status.md khớp registry.');
} else {
  writeFileSync(file, next, 'utf8');
  console.log('Đã đồng bộ docs/school-status.md');
}
