import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { institutionCoverage } from '../src/data/institutionCoverage.ts';

/**
 * Sinh `docs/coverage-chart.svg` — biểu đồ thanh ngang độ phủ calculator, dùng để nhúng trực tiếp
 * vào README (GitHub render SVG tĩnh, không chạy được HTML/JS tương tác). Số liệu lấy thẳng từ
 * `institutionCoverage` (cùng nguồn với `npm run stats:coverage`) — không hardcode, chạy lại script
 * này sau mỗi lần coverage đổi để ảnh không bị lệch (`npm run coverage:chart`).
 *
 * Màu và bố cục theo palette categorical mặc định của dataviz skill (slot 1-5, đã validate CVD),
 * cùng thứ tự/màu với bản artifact tương tác đã publish cho user.
 */

const researched =
  institutionCoverage.admissionDataAvailable -
  institutionCoverage.eligibilitySupported -
  institutionCoverage.partialCalculator -
  institutionCoverage.fullyVerified;

const rows = [
  { label: 'Calculator đã xác minh', count: institutionCoverage.fullyVerified, color: '#2a78d6' },
  { label: 'Calculator một phần', count: institutionCoverage.partialCalculator, color: '#eb6834' },
  { label: 'Chỉ kiểm tra điều kiện/ngưỡng', count: institutionCoverage.eligibilitySupported, color: '#1baf7a' },
  { label: 'Đã research, chưa đủ để tính', count: researched, color: '#eda100' },
  { label: 'Chỉ có trong danh mục', count: institutionCoverage.catalogOnly, color: '#e87ba4' },
];

const total = institutionCoverage.totalCatalogEntries;

const WIDTH = 680;
const PAD = 20;
const INNER_W = WIDTH - PAD * 2;
const LABEL_W = 240;
const VALUE_W = 90;
const TRACK_W = INNER_W - LABEL_W - VALUE_W;
const ROW_H = 34;
const BAR_H = 20;
const TOP_PAD = 62;
const BOTTOM_PAD = 30;
const HEIGHT = TOP_PAD + rows.length * ROW_H + BOTTOM_PAD;

const max = Math.max(...rows.map((r) => r.count));

const SURFACE = '#fcfcfb';
const BORDER = 'rgba(11,11,11,0.10)';
const TEXT_PRIMARY = '#0b0b0b';
const TEXT_SECONDARY = '#52514e';
const TEXT_MUTED = '#898781';
const GRID = '#e1e0d9';
const BASELINE = '#c3c2b7';

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

let rowsSvg = '';
rows.forEach((r, i) => {
  const y = TOP_PAD + i * ROW_H;
  const barW = Math.max((r.count / max) * TRACK_W, 3);
  const pct = ((r.count / total) * 100).toFixed(1);
  rowsSvg += `
    <text x="0" y="${y + BAR_H / 2 + 4}" font-size="13" font-weight="600" fill="${TEXT_PRIMARY}">${esc(r.label)}</text>
    <line x1="${LABEL_W}" y1="${y + BAR_H + 2}" x2="${LABEL_W + TRACK_W}" y2="${y + BAR_H + 2}" stroke="${GRID}" stroke-width="1" />
    <rect x="${LABEL_W}" y="${y}" width="${barW}" height="${BAR_H}" rx="4" fill="${r.color}" />
    <text x="${LABEL_W + TRACK_W + 10}" y="${y + BAR_H / 2 + 4}" font-size="13" font-weight="600" fill="${TEXT_PRIMARY}" text-anchor="start">${r.count}</text>
    <text x="${INNER_W}" y="${y + BAR_H / 2 + 4}" font-size="11" fill="${TEXT_MUTED}" text-anchor="end">${pct}%</text>
  `;
});

const svg = `<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg" font-family="system-ui, -apple-system, Segoe UI, sans-serif">
  <rect x="0.5" y="0.5" width="${WIDTH - 1}" height="${HEIGHT - 1}" rx="12" fill="${SURFACE}" stroke="${BORDER}" />
  <text x="20" y="30" font-size="15" font-weight="600" fill="${TEXT_PRIMARY}">Độ phủ calculator UniScoreVN</text>
  <text x="20" y="48" font-size="11.5" fill="${TEXT_SECONDARY}">${total} cơ sở trong danh mục — snapshot npm run stats:coverage</text>
  <g transform="translate(20, 10)">
    ${rowsSvg}
    <line x1="${LABEL_W}" y1="${TOP_PAD - 10}" x2="${LABEL_W}" y2="${TOP_PAD + rows.length * ROW_H - ROW_H + BAR_H + 4}" stroke="${BASELINE}" stroke-width="1" />
  </g>
</svg>`;

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const outPath = join(projectRoot, 'docs', 'coverage-chart.svg');
writeFileSync(outPath, svg, 'utf8');
console.log(`[generate-coverage-chart] Wrote ${outPath}`);
